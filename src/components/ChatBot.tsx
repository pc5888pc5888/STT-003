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
  const keywords = query.replace(/[，。？！、]/g, " ").split(/\s+/).filter(k => k.length > 1);
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
      content: "您好，我是策略智庫數位領航員，由莊鈞翔博士的學術著作與專欄文章訓練而成。請問您想了解企業治理、法遵策略、家族傳承或接班佈局哪方面的議題？",
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
      ? relevant.map(a => `【${a.title}】\n${a.excerpt.slice(0, 600)}`).join("\n\n---\n\n")
      : "";

    const systemPrompt = `你是「策略智庫數位領航員」，是莊鈞翔博士（Chuang Chun-Hsiang, Ph.D.）的數位助理。
莊博士是策略智庫數位集團（STT Group）執行長、逢甲大學商學院兼任助理教授、M傳媒專欄作家，專長為企業治理、法律合規（法遵）、家族企業接班、ESG與AI治理。
其核心著作《內在法遵 Internal Compliance》主張：法遵應是企業核心價值的內在延伸，而非外部規範的被動遵守。

回答原則：
1. 以繁體中文回答，語氣專業、精準、具學術厚度
2. 優先引用下方知識庫內容，並說明出自哪篇專欄
3. 涉及具體法律條文，引導至 laws.moj.gov.tw 或 lawsnote.com 查詢
4. 不提供具體法律建議，建議諮詢專業律師
5. 回答結尾可提示相關專欄文章連結

${context ? `以下是與問題相關的專欄知識庫內容：\n\n${context}` : ""}`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: newMessages.map(m => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "抱歉，暫時無法回應，請稍後再試。";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "連線異常，請稍後再試。" }]);
    }
    setLoading(false);
  }

  if (!open) return null;

  return (
    <div
      style={{
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
      }}
    >
      {/* 標題列 */}
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
            策略智庫數位領航員
          </div>
          <div style={{ color: "#888", fontSize: "11px", marginTop: "2px" }}>
            莊鈞翔博士 · STT Group
          </div>
        </div>
        <button onClick={onClose} style={{ color: "#888", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>✕</button>
      </div>

      {/* 訊息區 */}
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
              分析中⋯
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 輸入區 */}
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
          placeholder="請輸入您的問題⋯"
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
          送出
        </button>
      </div>
    </div>
  );
}
