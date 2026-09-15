import { useNavigate } from "react-router-dom";

export default function HumanisticInterview() {
  const navigate = useNavigate();

  return (
    <div className="stt-humanistic-shell" style={{ minHeight: "100vh", background: "#fbfaf7" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 90, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "10px 18px", borderBottom: "1px solid #e7dccb", background: "rgba(255,255,255,.97)", backdropFilter: "blur(12px)" }}>
        <button
          type="button"
          onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "auto" }); }}
          style={{ border: "1px solid #b8925d", borderRadius: 999, background: "#fff", color: "#8b6536", padding: "9px 16px", cursor: "pointer", fontSize: 14, letterSpacing: ".04em" }}
          aria-label="回到 STT Governance 首頁"
        >
          ← 回 STT Governance 首頁
        </button>
        <div style={{ color: "#655d52", fontSize: 12, letterSpacing: ".08em", textAlign: "right" }}>
          人文地景產採訪｜20 Questions Journey
        </div>
      </div>
      <iframe
        src="/humanistic-interview/"
        title="人文地景產採訪｜20 Questions Journey"
        style={{ display: "block", width: "100%", height: "calc(100vh - 57px)", border: 0, background: "#fff" }}
      />
    </div>
  );
}
