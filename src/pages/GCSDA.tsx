import { ArrowRight, Landmark, Network, Users } from "lucide-react";

const GCSDA_OFFICIAL_URL = "https://stt-003-git-gcsda-independent-site-v1-pc5888pc5888s-projects.vercel.app";

interface GCSDAPProps { onContactOpen?: () => void; }

export default function GCSDA(_: GCSDAPProps) {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#29251f]">
      <style>{`
        .gcsda-gateway{--gold:#a9793e;--line:#dccdb8;--muted:#70675d}.gcsda-gateway *{box-sizing:border-box}.gg-wrap{max-width:1180px;margin:auto;padding:0 28px}.gg-hero{min-height:72vh;display:flex;align-items:center;position:relative;overflow:hidden;border-bottom:1px solid var(--line)}.gg-hero:after{content:"";position:absolute;right:-5%;top:-15%;width:52vw;height:52vw;border:1px solid rgba(169,121,62,.18);border-radius:50%;box-shadow:0 0 0 80px rgba(169,121,62,.025),0 0 0 160px rgba(169,121,62,.018)}.gg-copy{position:relative;z-index:2;max-width:760px;padding:95px 0}.gg-kicker{font-size:10px;letter-spacing:.28em;color:var(--gold)}.gg-copy h1{font:400 clamp(42px,5vw,70px)/1.32 "Noto Serif TC",Georgia,serif;margin:22px 0 0}.gg-copy p{max-width:720px;color:var(--muted);font-size:16px;line-height:2;margin:26px 0 0}.gg-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}.gg-actions a{display:inline-flex;align-items:center;gap:9px;border:1px solid #b98d55;padding:13px 18px;color:#815b30;text-decoration:none;font-size:13px}.gg-actions a:first-child{background:#a9793e;color:white}.gg-section{padding:82px 0}.gg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);margin-top:40px}.gg-card{background:#fffdf9;padding:30px;min-height:200px}.gg-card svg{color:var(--gold);stroke-width:1.25}.gg-card span{display:block;margin-top:18px;color:#946b38;font-size:10px;letter-spacing:.17em}.gg-card h3{font:400 23px/1.5 "Noto Serif TC",Georgia,serif;margin:13px 0}.gg-card p{color:var(--muted);font-size:14px;line-height:1.85}.gg-note{margin-top:40px;border-left:2px solid #b98d55;padding:4px 0 4px 22px;color:var(--muted);line-height:1.9;max-width:840px}@media(max-width:800px){.gg-grid{grid-template-columns:1fr}.gg-copy{padding:75px 0}.gg-hero{min-height:68vh}}
      `}</style>
      <div className="gcsda-gateway">
        <section className="gg-hero">
          <div className="gg-wrap">
            <div className="gg-copy">
              <div className="gg-kicker">INSTITUTIONAL ECOSYSTEM · GCSDA</div>
              <h1>中華企業策略永續發展學會</h1>
              <p>GCSDA 是依法成立、具有自身會員、理監事、章程與會務責任的全國性專業社團。它與 STT Governance 共享對企業策略、治理、法遵與永續的長期關注，但不是 STT 的內部部門。</p>
              <div className="gg-actions">
                <a href={GCSDA_OFFICIAL_URL} target="_blank" rel="noreferrer">進入 GCSDA 官方網站 <ArrowRight className="h-4 w-4" /></a>
                <a href="https://line.me/R/ti/p/@387nbnjs" target="_blank" rel="noreferrer">學會會員與聯絡</a>
              </div>
            </div>
          </div>
        </section>
        <section className="gg-section">
          <div className="gg-wrap">
            <div className="gg-kicker">RELATIONSHIP</div>
            <h2 className="mt-4 max-w-[850px] font-serif text-3xl leading-[1.55] lg:text-5xl">同一治理生態系，兩個清楚而獨立的制度身分。</h2>
            <div className="gg-grid">
              <div className="gg-card"><Landmark/><span>GCSDA · INSTITUTION</span><h3>正式學會與會員共同體</h3><p>承接會員大會、理監事治理、章程、會務、活動、入會、產學研交流與公共專業責任。</p></div>
              <div className="gg-card"><Network/><span>STT GOVERNANCE · PLATFORM</span><h3>治理智庫與判讀平台</h3><p>處理企業、家族與重大決策的問題辨識、策略判讀、制度設計、專業路由與可執行結果。</p></div>
              <div className="gg-card"><Users/><span>SHARED ECOSYSTEM</span><h3>專業可以合作，責任不混同</h3><p>法律、會計、策略與學術可以跨平台協作，但學會的正式會務與 STT 的治理委任保持清楚邊界。</p></div>
            </div>
            <p className="gg-note">正式發布後，本頁將持續作為 STT Governance 對 GCSDA 的制度介紹與官方入口；GCSDA 的會員、理監事、活動、章程與公告內容則以其獨立官方網站為準。</p>
          </div>
        </section>
      </div>
    </div>
  );
}
