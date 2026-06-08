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
  const keywords = query.replace(/[，。�?！、]/g, " ").split(/\s+/).filter(k => k.length > 1);
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
      content: "?�好，�??��??�智庫數位�??�員，由?��?翔�?士�?學�??��??��?欄�?章�?練而�??��??�您?��?�??業治?�、�??��??�、家?�傳?��??�班佈�??�方?��?議�?�?,
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
      ? relevant.map(a => `??{a.title}?�\n${a.excerpt.slice(0, 600)}`).join("\n\n---\n\n")
      : "";

    const systemPrompt = `你是?��??�智庫數位�??�員?��??��??��??�士（Chuang Chun-Hsiang, Ph.D.）�??��??��????��?士是策略?�庫?��??��?（STT Group）執行長?�逢甲大學?�學?�兼任助?��??�、M?��?專�?作家，�??�為企業治�??��?律�?規�?法遵）、家?��?業接?�、ESG?�AI治�????�核心�?作《內?��???Internal Compliance?�主張�?法遵?�是企業?��??�值�??�在延伸，而�?外部規�??�被?�遵守�?
?��??��?�?1. 以�?體中?��?答�?語氣專業?�精準、具學�??�度
2. ?��?引用下方?��?庫內容�?並說?�出?�哪篇�?�?3. 涉�??��?法�?條�?，�?導至 laws.moj.gov.tw ??lawsnote.com ?�詢
4. 不�?供具體�?律建議�?建議諮詢專業律師
5. ?��?結尾?��?示相?��?欄�?章�??

${context ? `以�??��??��??��??��?欄知識庫?�容：\n\n${context}` : ""}`;

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

            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ||
        (data.error ? "API?�誤�? + data.error.message : "?��?，暫?�無法�??��?請�?後�?試�?);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "assistant", content: "?�誤�? + (err?.message || String(err)) }]);
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
            策略?�庫?��??�航??          </div>
          <div style={{ color: "#888", fontSize: "11px", marginTop: "2px" }}>
            ?��?翔�?�?· STT Group
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
              ?��?中⋯
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
          placeholder="請輸?�您?��?題⋯"
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
          ?�出
        </button>
      </div>
    </div>
  );
}
