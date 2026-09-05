import { useNavigate } from "react-router-dom";

type HomeSection = "hero" | "governance" | "positioning" | "strategist" | "insights";

type HomeProps = {
  onNavigate: (page: string) => void;
  currentPage?: string;
  activeSection?: HomeSection;
  setActiveSection?: (section: HomeSection) => void;
};

const problemEntries = [
  ["重大決策", "一個重大決定，大家都說可以做，我卻不知道真正的風險在哪裡。", "major-decision"],
  ["企業承接", "公司愈來愈大，但所有重要事情還是在等老闆決定。", "owner-dependence"],
  ["接班", "二代已經進公司，職位交了，權力卻一直交不出去。", "succession"],
  ["家族與所有權", "家族有資產，但沒有人真正知道誰有最後決定權。", "family-ownership"],
  ["策略＋法務", "律師說法律上可以做，但我不知道商業上值不值得。", "strategic-legal"],
  ["AI Governance", "公司已經在使用 AI，但沒有人說得清楚它可以決定到哪裡。", "ai-governance"],
  ["制度失效", "制度、SOP 都有，真正出事時卻沒有人照制度走。", "system-failure"],
  ["Founder Legacy", "我希望把創辦人的思想、企業故事與價值留下來。", "founder-legacy"],
];

const misjudgments = [
  "問題一開始就定錯，把症狀當成真正要解決的事情。",
  "把主張當成事實，把『大家都知道』當成證據。",
  "法律上可以主張，就誤認為策略上值得執行。",
  "只看成功機率，沒有先看最大損失與不可逆性。",
  "提出方案的人同時壟斷審查權，缺少真正反方。",
  "危機結束就以為問題解決，沒有把一次經驗留下成制度。",
];

const methods = [
  ["01", "看見", "先讓真正正在發生的事情被看見。"],
  ["02", "反推", "先看最不希望發生的結果，再往回找今天的斷點。"],
  ["03", "舉證", "區分事實、主張、證據、假設與未知。"],
  ["04", "理解", "讓當事人自己看懂為什麼會誤判，而不是只被告知不能做。"],
  ["05", "架構", "把正確判斷轉成權責、程序、門檻、契約與紀錄。"],
  ["06", "執行", "形成 SOP、Workflow、責任人、時間表與驗收。"],
  ["07", "留下", "把結果與教訓沉澱成下一次可以直接使用的治理記憶。"],
];

const outcomes = [
  "重大決策判讀與 Decision Brief",
  "GO／CONDITIONAL GO／HOLD／NO-GO",
  "權責矩陣與 Reserved Matters",
  "策略＋法務雙視角 Decision Review",
  "接班與家族治理路線圖",
  "AI 權限、覆核、停止與回滾 SOP",
  "90 日治理啟動計畫與驗收",
  "Founder Legacy／治理記憶與知識資產",
];

export default function Home({ onNavigate }: HomeProps) {
  const navigate = useNavigate();

  const goToProblem = (id: string) => navigate(`/problems#${id}`);

  return (
    <div className="stt-rs-home">
      <style>{`
        .stt-rs-home{--ink:#27231f;--muted:#726b61;--gold:#a87a40;--line:#d9cab1;--paper:#fbfaf7;--paper2:#f2eee7;min-height:100vh;background:var(--paper);color:var(--ink);font-family:Inter,system-ui,sans-serif}
        .stt-rs-home *{box-sizing:border-box}
        .stt-rs-shell{max-width:1260px;margin:0 auto;padding:0 28px}
        .stt-rs-header{position:absolute;z-index:10;top:0;left:0;right:0;border-bottom:1px solid rgba(164,128,81,.22);background:rgba(251,250,247,.76);backdrop-filter:blur(16px)}
        .stt-rs-header-inner{height:80px;display:flex;align-items:center;gap:30px}
        .stt-rs-brand{margin-right:auto;border:0;background:transparent;text-align:left;cursor:pointer;color:var(--ink)}
        .stt-rs-brand strong{display:block;font-family:'Noto Serif TC',Georgia,serif;font-size:18px;letter-spacing:.05em;font-weight:500}
        .stt-rs-brand span{display:block;margin-top:5px;color:var(--gold);font-size:8px;letter-spacing:.26em;text-transform:uppercase}
        .stt-rs-nav{display:flex;align-items:center;gap:24px}
        .stt-rs-nav button{border:0;background:transparent;color:#625b52;font-size:12px;cursor:pointer}
        .stt-rs-start{border:1px solid #b68b54!important;padding:10px 16px!important;color:#885f31!important}
        .stt-rs-hero{position:relative;min-height:100svh;display:flex;align-items:center;overflow:hidden;background:linear-gradient(118deg,#fbfaf7 0%,#fbfaf7 48%,#f3efe8 48%,#ece6dc 100%)}
        .stt-rs-hero:before{content:'';position:absolute;right:-7vw;top:8vh;width:54vw;height:80vh;border-left:1px solid rgba(170,132,82,.30);border-radius:50% 0 0 50%;transform:rotate(-5deg)}
        .stt-rs-hero:after{content:'';position:absolute;right:11vw;top:17vh;width:29vw;height:62vh;border:1px solid rgba(170,132,82,.18);border-bottom:0;box-shadow:inset 18px 0 40px rgba(255,255,255,.72)}
        .stt-rs-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.04fr) minmax(340px,.96fr);gap:8vw;align-items:center;padding-top:120px;padding-bottom:80px}
        .stt-rs-eyebrow{color:var(--gold);font-size:10px;letter-spacing:.28em;text-transform:uppercase}
        .stt-rs-hero h1{max-width:760px;margin:24px 0 0;font-family:'Noto Serif TC',Georgia,serif;font-size:clamp(42px,5.5vw,76px);font-weight:400;line-height:1.25;letter-spacing:-.02em}
        .stt-rs-hero-copy{max-width:700px;margin:28px 0 0;color:var(--muted);font-size:17px;line-height:2}
        .stt-rs-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
        .stt-rs-actions button{padding:13px 20px;border:1px solid #b68b54;background:transparent;color:#80572b;font-size:13px;cursor:pointer}
        .stt-rs-actions button:first-child{background:#b68b54;color:white}
        .stt-rs-object{position:relative;min-height:560px}
        .stt-rs-plinth{position:absolute;right:7%;bottom:8%;width:70%;height:18%;background:linear-gradient(180deg,#eee8de,#d9d0c3);box-shadow:0 25px 55px rgba(76,62,44,.13);border-top:1px solid rgba(255,255,255,.8)}
        .stt-rs-column{position:absolute;right:17%;bottom:24%;width:23%;height:58%;background:linear-gradient(90deg,#ddd5c8,#f8f5ef 30%,#d9d0c2 72%,#c9bdae);box-shadow:12px 20px 45px rgba(65,52,37,.13)}
        .stt-rs-column:before,.stt-rs-column:after{content:'';position:absolute;left:-18%;width:136%;height:8%;background:linear-gradient(180deg,#eee8de,#cfc4b5)}
        .stt-rs-column:before{top:-8%}.stt-rs-column:after{bottom:-8%}
        .stt-rs-orb{position:absolute;right:48%;bottom:31%;width:82px;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 32% 28%,#f6dfb8 0%,#c69757 28%,#9a6a31 62%,#6e4824 100%);box-shadow:0 18px 40px rgba(118,83,41,.25)}
        .stt-rs-axis{position:absolute;right:42%;bottom:44%;width:43%;height:1px;background:linear-gradient(90deg,transparent,rgba(166,125,72,.48),transparent);transform:rotate(-17deg);transform-origin:right center}
        .stt-rs-section{padding:110px 0;border-top:1px solid var(--line)}
        .stt-rs-heading{max-width:860px;font-family:'Noto Serif TC',Georgia,serif;font-size:clamp(34px,4vw,54px);font-weight:400;line-height:1.35;margin:16px 0 0}
        .stt-rs-lead{max-width:760px;margin-top:18px;color:var(--muted);font-size:15px;line-height:2}
        .stt-rs-problem-list{margin-top:50px;border-top:1px solid var(--line)}
        .stt-rs-problem{display:grid;grid-template-columns:82px 1fr auto;gap:22px;align-items:center;padding:27px 0;border-bottom:1px solid var(--line);cursor:pointer}
        .stt-rs-problem .n{font-family:Georgia,serif;color:#b18a55;font-size:19px}.stt-rs-problem .t{font-family:'Noto Serif TC',Georgia,serif;font-size:20px;line-height:1.7}.stt-rs-problem .tag{color:#8a6b43;font-size:11px;white-space:nowrap}
        .stt-rs-dark{background:#27231f;color:#f6f1e8}.stt-rs-dark .stt-rs-eyebrow{color:#d1ad78}.stt-rs-dark .stt-rs-heading{color:#fffaf1}.stt-rs-dark .stt-rs-lead{color:#c8c0b6}
        .stt-rs-misgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;margin-top:48px;background:#4b443c;border:1px solid #4b443c}
        .stt-rs-mis{min-height:160px;padding:28px;background:#2f2a25;font-family:'Noto Serif TC',Georgia,serif;font-size:20px;line-height:1.7}.stt-rs-mis span{display:block;margin-bottom:16px;color:#d1ad78;font:10px Inter,sans-serif;letter-spacing:.22em}
        .stt-rs-methods{margin-top:48px;border-top:1px solid var(--line)}
        .stt-rs-method{display:grid;grid-template-columns:74px 130px 1fr;gap:20px;padding:25px 0;border-bottom:1px solid var(--line);align-items:start}.stt-rs-method .n{color:#b18a55;font-family:Georgia,serif}.stt-rs-method .name{font-family:'Noto Serif TC',Georgia,serif;font-size:21px}.stt-rs-method .desc{color:var(--muted);line-height:1.8}
        .stt-rs-outcomes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;margin-top:48px;border:1px solid var(--line)}
        .stt-rs-outcome{min-height:120px;padding:26px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:white;font-family:'Noto Serif TC',Georgia,serif;font-size:19px;line-height:1.6}.stt-rs-outcome:nth-child(2n){border-right:0}
        .stt-rs-proof-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:24px;margin-top:48px}.stt-rs-proof{min-height:320px;padding:38px;border:1px solid var(--line);background:white}.stt-rs-proof h3{font-family:'Noto Serif TC',Georgia,serif;font-size:29px;font-weight:400;line-height:1.45}.stt-rs-proof p{margin-top:18px;color:var(--muted);line-height:1.9}.stt-rs-proof button{margin-top:28px;border:0;border-bottom:1px solid #a87a40;background:transparent;padding:0 0 5px;color:#81592d;cursor:pointer}
        .stt-rs-legacy{background:linear-gradient(135deg,#eee8df,#fbfaf7)}.stt-rs-legacy-wrap{display:grid;grid-template-columns:.9fr 1.1fr;gap:9vw;align-items:center}.stt-rs-archive{position:relative;min-height:470px}.stt-rs-folder{position:absolute;left:8%;top:11%;width:72%;height:69%;border:1px solid #bfa984;background:linear-gradient(145deg,#e8dfd0,#f8f3ea);box-shadow:0 24px 52px rgba(80,66,49,.10);transform:rotate(-4deg)}.stt-rs-folder:before{content:'';position:absolute;left:8%;top:9%;width:82%;height:78%;border:1px solid rgba(152,116,70,.35);background:#fbfaf7}.stt-rs-folder:after{content:'';position:absolute;right:10%;bottom:10%;width:44px;height:44px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#d8b779,#a5743d 60%,#79502c)}
        .stt-rs-authority{display:grid;grid-template-columns:1fr 1fr;gap:8vw;align-items:end}.stt-rs-authority-roles{border-top:1px solid var(--line)}.stt-rs-role{display:grid;grid-template-columns:160px 1fr;gap:20px;padding:20px 0;border-bottom:1px solid var(--line)}.stt-rs-role strong{font-family:Georgia,serif;font-weight:400;color:#8f6738}.stt-rs-role span{color:var(--muted);line-height:1.7}
        .stt-rs-final{padding:120px 0;background:#f0ebe3;border-top:1px solid var(--line)}.stt-rs-final-card{max-width:1100px;margin:0 auto;padding:56px;border:1px solid #bea77e;background:#fbfaf7}.stt-rs-final-card h2{font-family:'Noto Serif TC',Georgia,serif;font-size:clamp(34px,4vw,52px);font-weight:400;line-height:1.35}.stt-rs-final-card p{max-width:760px;margin-top:20px;color:var(--muted);line-height:2}.stt-rs-final-card button{margin-top:28px;border:1px solid #b68b54;background:#b68b54;color:white;padding:14px 22px;cursor:pointer}
        @media(max-width:900px){.stt-rs-nav{display:none}.stt-rs-shell{padding:0 20px}.stt-rs-hero-grid,.stt-rs-legacy-wrap,.stt-rs-authority,.stt-rs-proof-grid{grid-template-columns:1fr}.stt-rs-object{min-height:390px}.stt-rs-hero{padding-top:40px}.stt-rs-problem{grid-template-columns:54px 1fr}.stt-rs-problem .tag{display:none}.stt-rs-misgrid,.stt-rs-outcomes{grid-template-columns:1fr}.stt-rs-outcome{border-right:0}.stt-rs-method{grid-template-columns:46px 90px 1fr}.stt-rs-section{padding:82px 0}.stt-rs-authority{gap:45px}.stt-rs-final-card{padding:34px 26px}}
        @media(max-width:620px){.stt-rs-hero-grid{padding-top:120px}.stt-rs-hero h1{font-size:42px}.stt-rs-object{min-height:310px}.stt-rs-orb{width:62px}.stt-rs-method{grid-template-columns:40px 1fr}.stt-rs-method .desc{grid-column:2}.stt-rs-problem .t{font-size:18px}.stt-rs-header-inner{height:70px}.stt-rs-section{padding:70px 0}}
      `}</style>

      <header className="stt-rs-header">
        <div className="stt-rs-shell stt-rs-header-inner">
          <button className="stt-rs-brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <strong>STT Governance</strong><span>Strategic Think Tank</span>
          </button>
          <nav className="stt-rs-nav" aria-label="Primary">
            <button type="button" onClick={() => navigate("/problems")}>你正在面對什麼</button>
            <button type="button" onClick={() => document.getElementById("how-stt-works")?.scrollIntoView({ behavior: "smooth" })}>莊博士怎麼處理</button>
            <button type="button" onClick={() => onNavigate("columns")}>專欄判讀</button>
            <button type="button" onClick={() => onNavigate("books")}>出版研究</button>
            <button type="button" onClick={() => onNavigate("about")}>莊鈞翔博士</button>
            <button type="button" className="stt-rs-start" onClick={() => navigate("/start")}>開始</button>
          </nav>
        </div>
      </header>

      <section className="stt-rs-hero" id="hero">
        <div className="stt-rs-shell stt-rs-hero-grid">
          <div>
            <p className="stt-rs-eyebrow">STT Governance</p>
            <h1>很多事情，不是無法處理；而是往往等到太晚才開始處理。</h1>
            <p className="stt-rs-hero-copy">協助企業、家族與重大決策者，把未來可能後悔的事情，提前帶到今天理解、判斷、安排與執行。</p>
            <div className="stt-rs-actions">
              <button type="button" onClick={() => navigate("/problems")}>看看我正在面對的問題</button>
              <button type="button" onClick={() => document.getElementById("how-stt-works")?.scrollIntoView({ behavior: "smooth" })}>莊博士怎麼處理</button>
            </div>
          </div>
          <div className="stt-rs-object" aria-hidden="true">
            <div className="stt-rs-axis" /><div className="stt-rs-plinth" /><div className="stt-rs-column" /><div className="stt-rs-orb" />
          </div>
        </div>
      </section>

      <section className="stt-rs-section" id="problems">
        <div className="stt-rs-shell">
          <p className="stt-rs-eyebrow">Where Governance Begins</p>
          <h2 className="stt-rs-heading">現在發生了什麼，而你最不希望接下來發生什麼？</h2>
          <p className="stt-rs-lead">使用者不需要先理解 Governance、Compliance 或 Decision Intelligence。先從自己真正正在發生的事情開始。</p>
          <div className="stt-rs-problem-list">
            {problemEntries.map(([tag, title, id], index) => (
              <div className="stt-rs-problem" key={id} role="button" tabIndex={0} onClick={() => goToProblem(id)} onKeyDown={(event) => event.key === "Enter" && goToProblem(id)}>
                <span className="n">{String(index + 1).padStart(2, "0")}</span><span className="t">{title}</span><span className="tag">{tag} →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stt-rs-section stt-rs-dark" id="misjudgment">
        <div className="stt-rs-shell">
          <p className="stt-rs-eyebrow">Why We Misjudge</p>
          <h2 className="stt-rs-heading">企業真正危險的，通常不是沒有答案，而是在錯誤的問題上得到一個非常完整的答案。</h2>
          <p className="stt-rs-lead">STT 不把「更多分析」直接等同「更好的決策」。先找出誤判如何形成，才有資格談後面的最佳方案。</p>
          <div className="stt-rs-misgrid">
            {misjudgments.map((item, index) => <div className="stt-rs-mis" key={item}><span>MISJUDGMENT {String(index + 1).padStart(2, "0")}</span>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="stt-rs-section" id="how-stt-works">
        <div className="stt-rs-shell">
          <p className="stt-rs-eyebrow">How STT Works</p>
          <h2 className="stt-rs-heading">不是把抽象治理交給客戶，而是把問題變成可以判斷、可以執行、可以驗收的結果。</h2>
          <div className="stt-rs-methods">
            {methods.map(([n, name, desc]) => <div className="stt-rs-method" key={n}><span className="n">{n}</span><span className="name">{name}</span><span className="desc">{desc}</span></div>)}
          </div>
        </div>
      </section>

      <section className="stt-rs-section" id="outcomes">
        <div className="stt-rs-shell">
          <p className="stt-rs-eyebrow">What You Can Get</p>
          <h2 className="stt-rs-heading">最後拿到的，不應只是「一份建議」。</h2>
          <p className="stt-rs-lead">每一個治理議題都必須能落成具體交付，才有資格進入企業日常與真正的決策現場。</p>
          <div className="stt-rs-outcomes">{outcomes.map((item) => <div className="stt-rs-outcome" key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section className="stt-rs-section" id="intelligence">
        <div className="stt-rs-shell">
          <p className="stt-rs-eyebrow">Judgment Library</p>
          <h2 className="stt-rs-heading">專欄不是內容倉庫，而是讓人先認出「原來我可能一直把問題想錯了」。</h2>
          <div className="stt-rs-proof-grid">
            <article className="stt-rs-proof"><p className="stt-rs-eyebrow">STT Intelligence</p><h3>從錯誤直覺切入，再把法律、策略、證據與治理重新接回現實。</h3><p>文章未來會以 Problem Node 管理：它正在處理什麼問題、常見誤判是什麼、需要哪些證據、可能形成什麼結果，以及讀者下一步應走哪一條治理路徑。</p><button type="button" onClick={() => onNavigate("columns")}>進入專欄判讀 →</button></article>
            <article className="stt-rs-proof"><p className="stt-rs-eyebrow">Canon & Research</p><h3>文章先讓人看見問題；書籍與研究讓人把問題真正想深。</h3><p>《內在法遵》系列、家族治理、決策治理、企業治理與 AI Governance，不作為商城分類，而作為更深的判斷入口。</p><button type="button" onClick={() => onNavigate("books")}>進入出版研究 →</button></article>
          </div>
        </div>
      </section>

      <section className="stt-rs-section stt-rs-legacy" id="legacy">
        <div className="stt-rs-shell stt-rs-legacy-wrap">
          <div className="stt-rs-archive" aria-hidden="true"><div className="stt-rs-folder" /></div>
          <div><p className="stt-rs-eyebrow">Humanistic Landscape · Founder Legacy</p><h2 className="stt-rs-heading">趁一個人還能說、還能修正的時候，把只有他知道的東西留下來。</h2><p className="stt-rs-lead">人物採訪、企業史、創辦人判斷、家族記憶與企業文化，不只是內容。它們可以成為下一代仍有機會理解的治理記憶與知識資產。</p><div className="stt-rs-actions"><button type="button" onClick={() => navigate("/start?route=founder-legacy")}>了解人文／傳承專案</button></div></div>
        </div>
      </section>

      <section className="stt-rs-section" id="authority">
        <div className="stt-rs-shell stt-rs-authority">
          <div><p className="stt-rs-eyebrow">Governance Authority</p><h2 className="stt-rs-heading">莊鈞翔博士，不是網站裡的一張 Founder 履歷卡，而是最終治理判讀者。</h2><p className="stt-rs-lead">AI 可以整理、比較、搜尋、模擬與提出反方；律師、會計師及其他專業者在必要時承擔各自專業責任。STT 的差異，是有人負責把問題定義、證據門檻、專業衝突、風險承擔與最終決定放在同一張桌上。</p><div className="stt-rs-actions"><button type="button" onClick={() => onNavigate("about")}>認識莊鈞翔博士</button></div></div>
          <div className="stt-rs-authority-roles"><div className="stt-rs-role"><strong>Problem Framing</strong><span>決定真正需要被回答的問題是什麼。</span></div><div className="stt-rs-role"><strong>Authority Allocation</strong><span>決定 AI、律師、會計師、當事人各自處理哪一段。</span></div><div className="stt-rs-role"><strong>Conflict Arbitration</strong><span>不同事實或專業意見衝突時，要求重新驗證。</span></div><div className="stt-rs-role"><strong>Risk Acceptance</strong><span>判斷哪些風險可以承擔、哪些不可逆風險不應被交換。</span></div><div className="stt-rs-role"><strong>Final Judgment</strong><span>形成最後可以執行、可以說明、可以承擔的治理判讀。</span></div></div>
        </div>
      </section>

      <section className="stt-rs-final" id="start">
        <div className="stt-rs-shell"><div className="stt-rs-final-card"><p className="stt-rs-eyebrow">Governance Engagement</p><h2>不用先知道自己需要哪一種顧問。先把真正發生的事情說清楚。</h2><p>告訴 STT：現在發生了什麼、最不希望發生什麼，以及希望事情最後變成什麼。先形成問題與結果，再決定是否需要策略、法務、家族、AI 或其他專業進場。</p><button type="button" onClick={() => navigate("/start")}>開始治理判斷</button></div></div>
      </section>
    </div>
  );
}
