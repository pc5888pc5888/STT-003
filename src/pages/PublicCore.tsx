import { useNavigate } from "react-router-dom";

type HubKind = "method" | "publications" | "projects" | "stt";

type HubConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  statement: string;
  kind: HubKind;
  sections: { title: string; body: string; action?: string; path?: string }[];
};

const hubs: Record<HubKind, HubConfig> = {
  method: {
    eyebrow: "HOW WE JUDGE",
    title: "先把問題判斷對，再談怎麼做。",
    subtitle: "不是把更多意見堆在一起，而是把事件、誤判、證據、選項、最大損失與執行條件放回同一個判斷程序。",
    statement: "看見 → 反推 → 舉證 → 理解 → 架構 → 執行 → 留下",
    kind: "method",
    sections: [
      { title: "01｜看見真正的問題", body: "事件名稱不等於真正問題。先拆開症狀、當事人的擔憂、不可接受結果，以及目前仍然不知道的事。" },
      { title: "02｜從不希望發生的結果反推", body: "不是等結果發生才補救，而是先看最不希望走到哪裡，再往回辨識今天已經存在的斷點。" },
      { title: "03｜讓主張重新取得證據資格", body: "把事實、主張、證據、假設與未知分開；重要判斷必須知道什麼資料會支持它，也要知道什麼資料會推翻它。" },
      { title: "04｜形成可以執行的架構", body: "把判斷轉成權責、SOP、停止條件、驗收節點、契約、會議紀錄或其他可以真正落地的制度。" },
      { title: "05｜必要時讓專業者進場", body: "法律、會計、稅務、信託與其他專業不是被 AI 取代，而是在適當的問題、資料與責任邊界下進入案件。" },
      { title: "06｜結果不是終點", body: "案件結束後重新檢查哪些假設錯了、哪些證據不足、哪些制度需要更新，讓下一次不從同一個錯誤開始。", action: "開始說明你的情況", path: "/start" },
    ],
  },
  publications: {
    eyebrow: "CANON & RESEARCH",
    title: "出版不是商品陳列，而是治理思想的深度入口。",
    subtitle: "專欄讓人看見一個問題；書籍讓人建立完整判斷；研究則讓方法可以被檢驗、討論與延伸。",
    statement: "思想被留下，才有可能被理解、被研究、被承接。",
    kind: "publications",
    sections: [
      { title: "治理文明著作體系", body: "從內在法遵、人機治理、家族、決策、企業、接班、資本、信任、永續到治理文明，建立可以長期延伸的思想正典。", action: "進入書籍", path: "/books" },
      { title: "研究與論文", body: "企業策略、公司治理、接班傳承、組織決策、法遵與 AI 治理研究，作為制度設計與方法發展的學術基礎。", action: "進入研究", path: "/papers" },
      { title: "內在法遵", body: "不是外部規範的堆疊，而是把判斷、節制、責任與不可跨越的底線轉化為可以長期運作的內在治理。", action: "進入內在法遵", path: "/internal-compliance" },
    ],
  },
  projects: {
    eyebrow: "HUMANISTIC & LEGACY PROJECTS",
    title: "趁一個人還能說，把只有他知道的事情留下來。",
    subtitle: "企業史、Founder Legacy、家族記憶與人文採訪，不只是內容製作，而是把不可見的經驗轉成下一代仍然能理解的知識資產。",
    statement: "事件人人看得見；事件對一個人的意義，往往只有當事人知道。",
    kind: "projects",
    sections: [
      { title: "Humanistic Landscape", body: "以正式網站先完成信任說明，再進入邀請、採訪、核對、影像授權、編輯與典藏流程。" },
      { title: "Founder Legacy", body: "保存創辦人的判斷、價值、重大轉折、企業文化與那些不能只靠財務報表留下來的經驗。", action: "從 Founder Legacy 開始", path: "/problems/founder-legacy" },
      { title: "Interview & Publishing", body: "委託／合作專案與獨立編輯內容分開標示，維持受訪者權益、讀者信任與出版責任。", action: "說明專案需求", path: "/start?route=founder-legacy" },
    ],
  },
  stt: {
    eyebrow: "STT GOVERNANCE",
    title: "一個讓複雜問題可以被判斷、被執行、被留下的治理平台。",
    subtitle: "前台從人的真實問題開始；後台再以案件母檔、戰略判讀、專業協作、人機權限與最終治理判讀承接。",
    statement: "外界看的是入口；系統承接的是複雜度；最終責任仍然必須回到人。",
    kind: "stt",
    sections: [
      { title: "Problem Framing", body: "先決定真正需要被回答的問題，而不是讓既有分類、部門或工具替當事人預設答案。" },
      { title: "Strategic & Professional Intelligence", body: "把戰略、法律、會計、稅務、信託與其他必要專業放進同一個案件視野，但不混淆各自責任。" },
      { title: "Human–AI Constitutional Gate", body: "先決定資料能不能進 AI、AI 可以做到哪裡、誰能覆核、誰能停止，再讓模型參與分析。" },
      { title: "Final Governance Judgment", body: "STT 的最終價值不是假裝一個人取代全部專業，而是有人負責問題定義、證據門檻、專業進場、衝突仲裁與最後判讀。", action: "治理責任與莊鈞翔博士", path: "/institution/eric-chuang" },
    ],
  },
};

function Artifact({ kind }: { kind: HubKind }) {
  return (
    <div className={`pc-artifact pc-artifact-${kind}`} aria-hidden="true">
      <div className="pc-axis pc-axis-a" />
      <div className="pc-axis pc-axis-b" />
      {kind === "method" && <><div className="pc-paper pc-paper-a"/><div className="pc-paper pc-paper-b"/><div className="pc-seal">✓</div></>}
      {kind === "publications" && <><div className="pc-book pc-book-a"/><div className="pc-book pc-book-b"/><div className="pc-book pc-book-c"/></>}
      {kind === "projects" && <><div className="pc-folio"/><div className="pc-note pc-note-a"/><div className="pc-note pc-note-b"/><div className="pc-wax"/></>}
      {kind === "stt" && <><div className="pc-arch"><span/><span/><span/></div><div className="pc-core"/></>}
    </div>
  );
}

function HubPage({ type }: { type: HubKind }) {
  const navigate = useNavigate();
  const cfg = hubs[type];
  return (
    <div className="pc-root">
      <style>{`
        .pc-root{--ink:#27231f;--muted:#716a61;--gold:#aa7c42;--line:#ddd0bb;--paper:#fbfaf7;min-height:100vh;background:var(--paper);color:var(--ink)}
        .pc-wrap{max-width:1180px;margin:0 auto;padding:0 28px}.pc-hero{min-height:680px;display:grid;grid-template-columns:1.02fr .98fr;gap:8vw;align-items:center;padding:90px 0 70px}.pc-eyebrow{font-size:10px;letter-spacing:.27em;color:var(--gold)}.pc-title{margin:20px 0 0;font-family:'Noto Serif TC',Georgia,serif;font-size:clamp(42px,5vw,70px);font-weight:400;line-height:1.3}.pc-sub{max-width:720px;margin-top:28px;color:var(--muted);font-size:16px;line-height:2}.pc-statement{margin-top:30px;padding-top:20px;border-top:1px solid var(--line);font-family:'Noto Serif TC',Georgia,serif;color:#805b31;font-size:18px;line-height:1.8}.pc-artifact{position:relative;min-height:470px;background:radial-gradient(circle at 58% 40%,#fff 0,#f5f0e7 55%,#eee6da 100%);border:1px solid #e4d8c6;overflow:hidden}.pc-axis{position:absolute;border-color:rgba(164,121,66,.28);border-style:solid}.pc-axis-a{width:340px;height:340px;border-width:1px;border-radius:50%;right:-30px;top:-30px}.pc-axis-b{width:270px;height:1px;border-width:1px 0 0;left:15%;top:54%;transform:rotate(-13deg)}
        .pc-paper{position:absolute;width:54%;height:54%;left:23%;top:21%;background:#fffdf9;border:1px solid #cdb48d;box-shadow:0 22px 45px rgba(77,60,39,.12)}.pc-paper-a{transform:rotate(-4deg)}.pc-paper-b{transform:rotate(3deg);left:27%;top:25%}.pc-seal{position:absolute;right:20%;bottom:18%;width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#d7b277,#a9783f 62%,#76502b);color:#fff6e8;font-family:Georgia,serif;font-size:24px;box-shadow:0 12px 28px rgba(112,75,36,.22)}
        .pc-book{position:absolute;bottom:16%;width:23%;height:57%;background:linear-gradient(90deg,#e9dfcf,#fffaf1 35%,#d8c8b0 100%);border:1px solid #b99a6d;box-shadow:8px 18px 28px rgba(75,57,38,.12)}.pc-book:after{content:'';position:absolute;left:12%;right:12%;top:13%;height:1px;background:#b98b4e;box-shadow:0 22px 0 #b98b4e,0 44px 0 #b98b4e}.pc-book-a{left:13%;transform:rotate(-5deg)}.pc-book-b{left:39%;height:63%}.pc-book-c{right:12%;transform:rotate(5deg)}
        .pc-folio{position:absolute;left:18%;top:20%;width:62%;height:58%;background:linear-gradient(145deg,#e4d6c1,#faf5eb);border:1px solid #b99a6d;box-shadow:0 24px 48px rgba(72,54,35,.13);transform:rotate(-3deg)}.pc-folio:before{content:'';position:absolute;inset:9%;border:1px solid rgba(161,123,70,.3);background:#fffdf9}.pc-note{position:absolute;width:26%;height:25%;background:#fffdf9;border:1px solid #d8c6aa;box-shadow:0 16px 26px rgba(70,52,33,.10)}.pc-note-a{left:12%;bottom:13%;transform:rotate(5deg)}.pc-note-b{right:10%;top:15%;transform:rotate(4deg)}.pc-wax{position:absolute;right:24%;bottom:18%;width:48px;height:48px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#cfaa71,#9b6737 65%,#704728)}
        .pc-arch{position:absolute;right:14%;bottom:8%;width:65%;height:76%;border-top:18px solid #e8dfd1;border-bottom:22px solid #d7c9b7;display:flex;align-items:stretch;justify-content:space-evenly;padding:50px 30px 20px;box-shadow:0 28px 50px rgba(74,57,40,.10)}.pc-arch span{width:14%;background:linear-gradient(90deg,#d9cdbd,#fffaf1 45%,#cdbdaa);border-top:10px solid #d4c5b2;border-bottom:12px solid #c7b69f}.pc-core{position:absolute;left:20%;top:25%;width:78px;height:78px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#f5dfb9,#c59251 35%,#90612e 68%,#684322);box-shadow:0 16px 36px rgba(115,78,37,.25)}
        .pc-body{border-top:1px solid var(--line);padding:90px 0 120px}.pc-grid{border-top:1px solid var(--line)}.pc-section{display:grid;grid-template-columns:70px 1fr 180px;gap:28px;padding:34px 0;border-bottom:1px solid var(--line);align-items:start}.pc-num{font-family:Georgia,serif;color:#a87b43;font-size:18px}.pc-section h2{font-family:'Noto Serif TC',Georgia,serif;font-size:27px;font-weight:400;margin:0 0 12px}.pc-section p{color:var(--muted);line-height:1.9;margin:0}.pc-action{justify-self:end;border:0;border-bottom:1px solid #9c713e;background:transparent;padding:4px 0;color:#815b30;cursor:pointer}.pc-footer-cta{margin-top:60px;padding:42px;border:1px solid var(--line);background:white;display:flex;justify-content:space-between;gap:30px;align-items:center}.pc-footer-cta h3{font-family:'Noto Serif TC',Georgia,serif;font-size:28px;font-weight:400;margin:0}.pc-footer-cta button{border:1px solid #a97a40;background:#a97a40;color:white;padding:13px 20px;cursor:pointer}
        @media(max-width:900px){.pc-hero{grid-template-columns:1fr;padding-top:60px}.pc-artifact{min-height:360px}.pc-section{grid-template-columns:50px 1fr}.pc-action{grid-column:2;justify-self:start}.pc-footer-cta{display:block}.pc-footer-cta button{margin-top:22px}}
      `}</style>
      <section><div className="pc-wrap pc-hero"><div><div className="pc-eyebrow">{cfg.eyebrow}</div><h1 className="pc-title">{cfg.title}</h1><p className="pc-sub">{cfg.subtitle}</p><div className="pc-statement">{cfg.statement}</div></div><Artifact kind={cfg.kind}/></div></section>
      <section className="pc-body"><div className="pc-wrap"><div className="pc-grid">{cfg.sections.map((section,index)=><article className="pc-section" key={section.title}><div className="pc-num">{String(index+1).padStart(2,'0')}</div><div><h2>{section.title}</h2><p>{section.body}</p></div>{section.path&&<button className="pc-action" onClick={()=>navigate(section.path!)}>{section.action ?? '進一步了解'} →</button>}</article>)}</div><div className="pc-footer-cta"><div><div className="pc-eyebrow">GOVERNANCE ENTRY</div><h3>不用先替問題分類，先把情況說清楚。</h3></div><button onClick={()=>navigate('/start')}>開始治理判讀</button></div></div></section>
    </div>
  );
}

export function HowWeJudge(){return <HubPage type="method"/>}
export function PublicationsHub(){return <HubPage type="publications"/>}
export function ProjectsHub(){return <HubPage type="projects"/>}
export function STTPlatform(){return <HubPage type="stt"/>}
