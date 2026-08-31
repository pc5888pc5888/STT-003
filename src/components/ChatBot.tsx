import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, Send, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface DifyStreamPayload {
  event?: string;
  answer?: string;
  conversation_id?: string;
  message_id?: string;
}

interface ChatBotProps {
  open: boolean;
  onClose: () => void;
  onContactOpen?: () => void;
}

const CONSULTATION_MARKER = "[STT_ACTION:CONSULTATION]";
const VISITOR_STORAGE_KEY = "stt-governance-ai-user";

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getVisitorId() {
  const existing = window.localStorage.getItem(VISITOR_STORAGE_KEY);
  if (existing) {
    return existing;
  }
  const created = createId("visitor");
  window.localStorage.setItem(VISITOR_STORAGE_KEY, created);
  return created;
}

function stripConsultationMarker(value: string) {
  return value.replaceAll(CONSULTATION_MARKER, "").trim();
}

export default function ChatBot({ open, onClose, onContactOpen }: ChatBotProps) {
  const { locale, t } = useI18n();
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: createId("assistant"), role: "assistant", content: t("ai.welcome") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [consultationSuggested, setConsultationSuggested] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const requestControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages((current) => {
      if (current.length === 1 && current[0].role === "assistant") {
        return [{ ...current[0], content: t("ai.welcome") }];
      }
      return current;
    });
  }, [locale, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, consultationSuggested]);

  useEffect(() => {
    return () => requestControllerRef.current?.abort();
  }, []);

  const updateAssistantMessage = (messageId: string, content: string) => {
    setMessages((current) =>
      current.map((message) => (message.id === messageId ? { ...message, content } : message))
    );
  };

  const processSseBlock = (
    block: string,
    onAnswer: (answer: string) => void,
    onConversation: (id: string) => void
  ) => {
    const dataLines = block
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .filter(Boolean);

    for (const dataLine of dataLines) {
      try {
        const payload = JSON.parse(dataLine) as DifyStreamPayload;
        if (payload.conversation_id) {
          onConversation(payload.conversation_id);
        }
        if (typeof payload.answer === "string" && payload.answer.length > 0) {
          onAnswer(payload.answer);
        }
      } catch {
        continue;
      }
    }
  };

  const sendMessage = async () => {
    const query = input.trim();
    if (!query || loading) {
      return;
    }

    const userMessage: Message = { id: createId("user"), role: "user", content: query };
    const assistantMessageId = createId("assistant");
    const assistantMessage: Message = { id: assistantMessageId, role: "assistant", content: "" };

    setInput("");
    setConsultationSuggested(false);
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setLoading(true);

    const controller = new AbortController();
    requestControllerRef.current = controller;

    let fullAnswer = "";

    try {
      const response = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          conversationId,
          userId: getVisitorId(),
          inputs: { locale },
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("AI stream unavailable");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          processSseBlock(
            block,
            (answer) => {
              fullAnswer += answer;
              updateAssistantMessage(assistantMessageId, stripConsultationMarker(fullAnswer));
            },
            (id) => setConversationId(id)
          );
        }
      }

      if (buffer.trim()) {
        processSseBlock(
          buffer,
          (answer) => {
            fullAnswer += answer;
            updateAssistantMessage(assistantMessageId, stripConsultationMarker(fullAnswer));
          },
          (id) => setConversationId(id)
        );
      }

      if (fullAnswer.includes(CONSULTATION_MARKER)) {
        setConsultationSuggested(true);
      }

      if (!stripConsultationMarker(fullAnswer)) {
        updateAssistantMessage(assistantMessageId, t("ai.unavailable"));
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        updateAssistantMessage(assistantMessageId, t("ai.unavailable"));
      }
    } finally {
      requestControllerRef.current = null;
      setLoading(false);
    }
  };

  const handleClose = () => {
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    setLoading(false);
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <section
      className="fixed z-[90] flex flex-col overflow-hidden bg-white border"
      style={{
        bottom: "5.75rem",
        right: "1.5rem",
        width: "min(390px, calc(100vw - 2rem))",
        height: "min(560px, calc(100vh - 8rem))",
        borderColor: "var(--stt-gold-line)",
        borderRadius: "var(--stt-radius-lg)",
        boxShadow: "var(--stt-shadow-panel)",
        color: "var(--stt-ink)",
      }}
      aria-label={t("ai.assistantTitle")}
    >
      <header className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--stt-line)" }}>
        <div>
          <p className="text-sm font-semibold tracking-[0.08em]" style={{ color: "var(--stt-ink)" }}>
            {t("ai.assistantTitle")}
          </p>
          <p className="text-[10px] mt-1 tracking-[0.14em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>
            {t("ai.assistantSubtitle")}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="p-2 bg-transparent border-0 cursor-pointer"
          aria-label={t("common.close")}
        >
          <X className="w-4 h-4" strokeWidth={1.5} style={{ color: "var(--stt-ink-muted)" }} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
        {messages.map((message) => {
          const isUser = message.role === "user";
          const visibleContent = message.content || (loading && !isUser ? t("ai.thinking") : "");

          return (
            <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[86%] px-3.5 py-2.5 text-[13px] leading-6 whitespace-pre-wrap border"
                style={{
                  borderColor: isUser ? "var(--stt-gold-line)" : "var(--stt-line)",
                  background: isUser ? "var(--stt-ivory)" : "var(--stt-surface)",
                  borderRadius: "var(--stt-radius-md)",
                  color: "var(--stt-ink)",
                }}
              >
                {visibleContent}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--stt-ink-muted)" }}>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{t("ai.streaming")}</span>
          </div>
        )}

        {consultationSuggested && (
          <div className="border px-4 py-3" style={{ borderColor: "var(--stt-gold-line)", background: "var(--stt-ivory)" }}>
            <p className="text-xs leading-5" style={{ color: "var(--stt-ink-soft)" }}>
              {t("ai.consultationSuggested")}
            </p>
            <button
              type="button"
              onClick={onContactOpen}
              className="mt-3 inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer text-xs font-semibold"
              style={{ color: "var(--stt-gold-deep)" }}
            >
              {t("ai.consultationAction")}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <footer className="p-3 border-t" style={{ borderColor: "var(--stt-line)" }}>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void sendMessage();
              }
            }}
            placeholder={t("ai.placeholder")}
            className="flex-1 min-w-0 bg-white border px-3 py-2.5 text-[13px] outline-none"
            style={{ borderColor: "var(--stt-line-strong)", borderRadius: "var(--stt-radius-md)", color: "var(--stt-ink)" }}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => void sendMessage()}
            disabled={loading || !input.trim()}
            className="w-10 h-10 flex items-center justify-center border cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              borderColor: "var(--stt-gold-line)",
              background: "var(--stt-ivory)",
              borderRadius: "var(--stt-radius-md)",
              color: "var(--stt-gold-deep)",
            }}
            aria-label={t("ai.send")}
          >
            <Send className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </footer>
    </section>
  );
}
