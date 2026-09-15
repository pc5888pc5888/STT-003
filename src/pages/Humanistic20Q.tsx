import { Link } from "react-router-dom";

export default function Humanistic20Q() {
  return (
    <div className="stt-humanistic-shell">
      <div className="stt-humanistic-returnbar" role="navigation" aria-label="人文地景產採訪導覽">
        <Link to="/" className="stt-humanistic-home-link">← 返回 STT Governance 首頁</Link>
        <span>人文地景產｜20 Questions Journey</span>
      </div>
      <iframe
        className="stt-humanistic-frame"
        src="/humanistic-interview/"
        title="人文地景產｜20 Questions Journey"
        allow="clipboard-write"
      />
    </div>
  );
}
