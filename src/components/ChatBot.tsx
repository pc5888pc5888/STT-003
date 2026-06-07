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

function generateLocalReply(query: string, articles: Article[]): string {
  const relevant = findRelevantArticles(query, articles, 3);
  
  if (relevant.length === 0) {
    return `感謝您的提問。莊鈞翔博士在企業治理、法律合規（法遵）、家族企業接班、ESG與AI治理等領域擁有豐富的學術研究與實務經驗。如需進一步了解，歡迎參閱博士於M傳媒發表的專欄文章，或直接聯繫STT Group。`;
  }

  const articleLinks = relevant.map(a => 
    `• 【${a.title}】\n  ${a.url}`
  ).join("\n\n");

  return `根據莊鈞翔博士的研究與著作，以下專欄文章與您的問題高度相關：\n\n${articleLinks}\n\n如需深入諮詢企業治理或法遵相關議題，歡迎透過「聯絡智庫」與莊博士團隊聯繫。`;
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

    await new Promise(r => setTimeout(r, 800));
    const reply = generateLocalReply(query, articles);
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
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
            策略智庫數位領航員
          </div>
          <div style={{ color: "#888", fontSize: "11px", marginTop: "2px" }}>
            莊鈞翔博士 · STT Group
          </div>
        </div>
        <button onClick={onClose} style={{ color: "#888", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>✕</button>
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
              分析中⋯
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
