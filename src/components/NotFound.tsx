import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(()=>{document.title="找不到頁面｜STT Governance";},[]);
  return (
    <section className="stt-g0-gate" aria-labelledby="not-found-title">
      <div className="stt-g0-gate__inner">
        <p className="stt-g0-kicker">404</p>
        <h1 id="not-found-title">找不到這個頁面。</h1>
        <p>這個網址不在目前的 STT Governance 正式路由中。</p>
        <div className="stt-g0-gate__actions">
          <Link to="/">回到首頁</Link>
          <Link to="/start">開始治理判讀</Link>
        </div>
      </div>
    </section>
  );
}

