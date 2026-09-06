import { useNavigate } from "react-router-dom";

const positions = [
  "STT Governance 策略智庫 創辦人暨執行長",
  "中華企業策略永續發展學會 創會理事長",
  "臺灣厝買賣文化發展協會 永續長",
  "逢甲大學商學院 兼任助理教授",
  "M傳媒 法律策略專欄 特約評論",
];

const domains = [
  "企業治理與策略判讀",
  "家族治理、企業接班與世代價值",
  "內在法遵與公司治理法遵精神",
  "專業服務信任、關係治理與永續",
  "領導風格、創新能力與經營績效",
  "AI Governance 與人機權力邊界",
];

export default function GovernanceResponsibility(){
  const navigate=useNavigate();
  return <div className="gr-root"><style>{`
    .gr-root{min-height:100vh;background:#fbfaf7;color:#2b261f}.gr-root *{box-sizing:border-box}.gr-wrap{max-width:1180px;margin:0 auto;padding:0 28px}.gr-hero{padding:92px 0 76px;border-bottom:1px solid #ddcfba}.gr-kicker{font-size:10px;letter-spacing:.27em;color:#8b642f}.gr-hero h1{margin:20px 0 0;font:400 clamp(46px,5.4vw,72px)/1.3 'Noto Serif TC',Georgia,serif}.gr-name{margin-top:12px;color:#9a6f3b;font-size:13px;letter-spacing:.13em}.gr-lead{max-width:850px;margin-top:28px;color:#6f675e;font-size:17px;line-height:2}.gr-statement{max-width:900px;margin-top:34px;padding-top:22px;border-top:1px solid #ddcfba;color:#805b31;font:400 19px/1.85 'Noto Serif TC',Georgia,serif}.gr-section{padding:76px 0;border-bottom:1px solid #ddcfba}.gr-section h2{max-width:900px;margin:14px 0 0;font:400 clamp(31px,3.6vw,48px)/1.45 'Noto Serif TC',Georgia,serif}.gr-desc{max-width:830px;margin-top:18px;color:#6f675e;line-height:2}.gr-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));margin-top:36px;border-top:1px solid #ddcfba;border-left:1px solid #ddcfba}.gr-card{padding:26px;border-right:1px solid #ddcfba;border-bottom:1px solid #ddcfba;background:#fffdf9}.gr-card small{color:#9a6f3b;letter-spacing:.12em}.gr-card h3{margin:14px 0 0;font:400 22px/1.5 'Noto Serif TC',Georgia,serif}.gr-card p{margin:10px 0 0;color:#6f675e;line-height:1.85}.gr-list{margin-top:34px;border-top:1px solid #ddcfba}.gr-row{display:grid;grid-template-columns:70px 1fr;gap:22px;padding:21px 0;border-bottom:1px solid #ddcfba}.gr-row span{color:#b1874c;font:400 13px Georgia,serif}.gr-row p{margin:0;color:#5f584f;line-height:1.85}.gr-cta{margin-top:38px;display:flex;gap:12px;flex-wrap:wrap}.gr-cta button{border:1px solid #a9793e;background:transparent;color:#805a30;padding:12px 17px;cursor:pointer}.gr-cta .primary{background:#9f7138;color:#fff;border-color:#9f7138}@media(max-width:760px){.gr-grid{grid-template-columns:1fr}.gr-hero{padding:68px 0 54px}}
  `}</style><section className="gr-hero"><div className="gr-wrap"><div className="gr-kicker">GOVERNANCE RESPONSIBILITY</div><h1>莊鈞翔 博士</h1><div className="gr-name">ERIC CHUANG, PH.D. · GOVERNANCE STRATEGIST</div><p className="gr-lead">STT 的最終價值不是由一個人取代所有專業，而是確保重大問題有人負責形成、證據有人要求、專業在必要時進場、AI 權力有邊界，而最後的治理判讀仍然有一個可以被追問的人。</p><div className="gr-statement">能力可以外包，資訊可以由工具協助，專業可以分工；但最後的授權、否決、停止與責任，不能因此消失。</div></div></section><section className="gr-section"><div className="gr-wrap"><div className="gr-kicker">ROLE OF FINAL JUDGMENT</div><h2>治理責任不是「永遠知道答案」，而是對判斷程序與最後決定負責。</h2><div className="gr-grid">{[["01","問題形成","在比較方案之前，先確認真正需要被回答的是什麼。"],["02","證據門檻","要求重要主張能回到來源、假設、未知與可能推翻結論的證據。"],["03","專業路由","辨識法律、會計、稅務、信託、產業或技術專業何時必須正式進場。"],["04","人機權力邊界","AI 可以檢索、分析與支援流程，但不能自然取得無邊界的決策權。"],["05","不可逆風險","重大行動先確認最大損失、退出能力、停止條件與再驗證機制。"],["06","最終說明責任","重要判讀必須能說明依據、限制與不確定性，不以模型或團隊名義稀釋責任。"]].map(([n,t,b])=><article className="gr-card" key={n}><small>{n}</small><h3>{t}</h3><p>{b}</p></article>)}</div></div></section><section className="gr-section"><div className="gr-wrap"><div className="gr-kicker">CURRENT POSITIONS</div><h2>目前公開職務</h2><div className="gr-list">{positions.map((p,i)=><div className="gr-row" key={p}><span>{String(i+1).padStart(2,'0')}</span><p>{p}</p></div>)}</div><p className="gr-desc">網站正式上線前，公開職務與外部機構名稱仍應逐項對照最新任職資料；若職務變動，網站同步更新，不以舊版簡歷永久固定。</p></div></section><section className="gr-section"><div className="gr-wrap"><div className="gr-kicker">GOVERNANCE & RESEARCH DOMAINS</div><h2>研究與治理關注領域</h2><div className="gr-grid">{domains.map((d,i)=><article className="gr-card" key={d}><small>{String(i+1).padStart(2,'0')}</small><h3>{d}</h3></article>)}</div><div className="gr-cta"><button onClick={()=>navigate('/research')}>研究與論文 →</button><button onClick={()=>navigate('/publications')}>出版與研究 →</button></div></div></section><section className="gr-section"><div className="gr-wrap"><div className="gr-kicker">AI ASSISTANCE</div><h2>AI 協助不等於作者權、論證主權或責任移轉。</h2><p className="gr-desc">在研究整理、文字校對、結構整理、資訊檢索、格式處理與工作流程中，可以使用 AI 提供輔助；但核心觀點、正式判讀與最終內容責任仍由具名作者或治理責任人確認。高影響專業事項仍依需要讓具相應資格者正式進場。</p><div className="gr-cta"><button onClick={()=>navigate('/legal/ai-disclosure')}>完整 AI 使用揭露 →</button><button className="primary" onClick={()=>navigate('/start')}>開始治理判讀 →</button></div></div></section></div>;
}
