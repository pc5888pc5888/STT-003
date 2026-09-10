import { useEffect, useRef, useState } from "react";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

interface AccessibilityWidgetProps {
  onChatOpen?: () => void;
  isChatOpen?: boolean;
}

function collectReadableText() {
  const explicitNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-stt-readable='true']"));
  if (explicitNodes.length > 0) {
    return explicitNodes
      .map((node) => node.innerText.trim())
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 5000);
  }

  const main = document.querySelector<HTMLElement>("main");
  return (main?.innerText || document.body.innerText).trim().slice(0, 5000);
}

export function AccessibilityWidget({ onChatOpen, isChatOpen }: AccessibilityWidgetProps) {
  const { locale, t } = useI18n();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const releaseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const toggleSpeech = async () => {
    setVoiceError(false);

    if (isSpeaking) {
      releaseAudio();
      return;
    }

    const text = collectReadableText();
    if (!text) {
      setVoiceError(true);
      return;
    }

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
      });

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const audio = new Audio(objectUrl);

      objectUrlRef.current = objectUrl;
      audioRef.current = audio;
      audio.onended = releaseAudio;
      audio.onerror = () => {
        releaseAudio();
        setVoiceError(true);
      };

      setIsSpeaking(true);
      await audio.play();
    } catch {
      releaseAudio();
      setVoiceError(true);
    }
  };

  const baseButtonStyle = {
    borderColor: "var(--stt-gold-line)",
    color: "var(--stt-gold-deep)",
    boxShadow: "0 12px 36px rgba(36,34,31,0.08)",
  } as const;

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-2 pointer-events-auto">
      {voiceError && (
        <div
          className="max-w-[240px] px-3 py-2 bg-white border text-xs leading-relaxed"
          style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-ink-muted)" }}
          role="status"
        >
          {t("accessibility.voiceUnavailable")}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onChatOpen}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white border cursor-pointer transition-transform hover:scale-[1.03]"
          style={{
            ...baseButtonStyle,
            background: isChatOpen ? "var(--stt-ivory)" : "var(--stt-surface)",
          }}
          title={t("accessibility.aiAssistant")}
          aria-label={t("accessibility.aiAssistant")}
          aria-pressed={isChatOpen}
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.4} />
        </button>

        <LanguageSwitcher />

        <button
          type="button"
          onClick={toggleSpeech}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white border cursor-pointer transition-transform hover:scale-[1.03]"
          style={{
            ...baseButtonStyle,
            background: isSpeaking ? "var(--stt-ivory)" : "var(--stt-surface)",
          }}
          title={isSpeaking ? t("accessibility.stopVoice") : t("accessibility.startVoice")}
          aria-label={isSpeaking ? t("accessibility.stopVoice") : t("accessibility.startVoice")}
          aria-pressed={isSpeaking}
        >
          {isSpeaking ? <VolumeX className="w-5 h-5" strokeWidth={1.4} /> : <Volume2 className="w-5 h-5" strokeWidth={1.4} />}
        </button>
      </div>
    </div>
  );
}
