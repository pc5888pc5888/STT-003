import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Article {
  code: string;
  url: string;
  title: string;
  excerpt: string;
  status: string;
}

interface ColumnsData {
  articles: Article[];
}

function findRelevantArticles(query: string, articles: Article[], topN = 5): Article[] {
  const keywords = query.replace(/[ï¼Œã€‚ï?ï¼ã€]/g, " ").split(/\s+/).filter(k => k.length > 1);
  const scored = articles
    .filter(a => a.status === "ok" && a.title)
    .map(a => {
      const text = a.title + " " + a.excerpt;
      const score = keywords.reduce((acc, kw) => {
        const re = new RegExp(kw, "gi");
        const matches = text.match(re);
        return acc + (matches ? matches.length : 0);
      }, 0);
      return { ...a, score };
    })
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
  return scored;
}

interface ChatBotProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatBot({ open, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "?¨å¥½ï¼Œæ??¯ç??¥æ™ºåº«æ•¸ä½é??ªå“¡ï¼Œç”±?Šé?ç¿”å?å£«ç?å­¸è??—ä??‡å?æ¬„æ?ç« è?ç·´è€Œæ??‚è??æ‚¨?³ä?è§??æ¥­æ²»?†ã€æ??µç??¥ã€å®¶?å‚³?¿æ??¥ç­ä½ˆå??ªæ–¹?¢ç?è­°é?ï¼?,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/columns.json")
      .then(r => r.json())
      .then((data: ColumnsData) => setArticles(data.articles))
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const query = input.trim();
    if (!query || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setLoading(true);

    const relevant = findRelevantArticles(query, articles);
    const context = relevant.length > 0
      ? relevant.map(a => `??{a.title}?‘\n${a.excerpt.slice(0, 600)}`).join("\n\n---\n\n")
      : "";

    const systemPrompt = `ä½ æ˜¯?Œç??¥æ™ºåº«æ•¸ä½é??ªå“¡?ï??¯è??ç??šå£«ï¼ˆChuang Chun-Hsiang, Ph.D.ï¼‰ç??¸ä??©ç????Šå?å£«æ˜¯ç­–ç•¥?ºåº«?¸ä??†å?ï¼ˆSTT Groupï¼‰åŸ·è¡Œé•·?é€¢ç”²å¤§å­¸?†å­¸?¢å…¼ä»»åŠ©?†æ??ˆã€M?³å?å°ˆæ?ä½œå®¶ï¼Œå??·ç‚ºä¼æ¥­æ²»ç??æ?å¾‹å?è¦ï?æ³•éµï¼‰ã€å®¶?ä?æ¥­æ¥?­ã€ESG?‡AIæ²»ç????¶æ ¸å¿ƒè?ä½œã€Šå…§?¨æ???Internal Compliance?‹ä¸»å¼µï?æ³•éµ?‰æ˜¯ä¼æ¥­?¸å??¹å€¼ç??§åœ¨å»¶ä¼¸ï¼Œè€Œé?å¤–éƒ¨è¦ç??„è¢«?•éµå®ˆã€?
?ç??Ÿå?ï¼?1. ä»¥ç?é«”ä¸­?‡å?ç­”ï?èªæ°£å°ˆæ¥­?ç²¾æº–ã€å…·å­¸è??šåº¦
2. ?ªå?å¼•ç”¨ä¸‹æ–¹?¥è?åº«å…§å®¹ï?ä¸¦èªª?å‡º?ªå“ªç¯‡å?æ¬?3. æ¶‰å??·é?æ³•å?æ¢æ?ï¼Œå?å°è‡³ laws.moj.gov.tw ??lawsnote.com ?¥è©¢
4. ä¸æ?ä¾›å…·é«”æ?å¾‹å»ºè­°ï?å»ºè­°è«®è©¢å°ˆæ¥­å¾‹å¸«
5. ?ç?çµå°¾?¯æ?ç¤ºç›¸?œå?æ¬„æ?ç« é€??

${context ? `ä»¥ä??¯è??é??¸é??„å?æ¬„çŸ¥è­˜åº«?§å®¹ï¼š\n\n${context}` : ""}`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: newMessages.map(m => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            tools: [{ googleSearch: {} }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ||
        (data.error ? "API?¯èª¤ï¼? + data.error.message : "?±æ?ï¼Œæš«?‚ç„¡æ³•å??‰ï?è«‹ç?å¾Œå?è©¦ã€?);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "assistant", content: "?¯èª¤ï¼? + (err?.message || String(err)) }]);
    }
    setLoading(false);
  }

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "5.5rem",
      right: "2rem",
      width: "380px",
      height: "520px",
      background: "#0A0A0A",
      border: "1px solid #C9A84C",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      zIndex: 9998,
      boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
      overflow: "hidden",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0F2236, #1a3a5c)",
        padding: "14px 18px",
        borderBottom: "1px solid #C9A84C",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ color: "#C9A84C", fontWeight: "bold", fontSize: "15px" }}>
            ç­–ç•¥?ºåº«?¸ä??˜èˆª??          </div>
          <div style={{ color: "#888", fontSize: "11px", marginTop: "2px" }}>
            ?Šé?ç¿”å?å£?Â· STT Group
          </div>
        </div>
        <button onClick={onClose} style={{ color: "#888", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>??/button>
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              background: m.role === "user" ? "#C9A84C" : "#1a1a1a",
              color: m.role === "user" ? "#0A0A0A" : "#E0E0E0",
              fontSize: "13px",
              lineHeight: "1.6",
              border: m.role === "assistant" ? "1px solid #333" : "none",
              whiteSpace: "pre-wrap",
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "10px 14px",
              borderRadius: "12px 12px 12px 2px",
              background: "#1a1a1a",
              border: "1px solid #333",
              color: "#C9A84C",
              fontSize: "13px",
            }}>
              ?†æ?ä¸­â‹¯
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{
        padding: "12px 16px",
        borderTop: "1px solid #222",
        display: "flex",
        gap: "8px",
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="è«‹è¼¸?¥æ‚¨?„å?é¡Œâ‹¯"
          style={{
            flex: 1,
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#fff",
            fontSize: "13px",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? "#333" : "#C9A84C",
            border: "none",
            borderRadius: "8px",
            padding: "8px 14px",
            color: loading || !input.trim() ? "#666" : "#0A0A0A",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "13px",
          }}
        >
          ?å‡º
        </button>
      </div>
    </div>
  );
}
