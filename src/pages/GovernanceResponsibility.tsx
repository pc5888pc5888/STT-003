import { useNavigate } from "react-router-dom";
import STTPageHero from "../components/STTPageHero";

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
  return <div className="gr-root">
    <STTPageHero visual="governanceResponsibility" eyebrow="GOVERNANCE RESPONSIBILITY" title="莊鈞翔 博士" lead="STT 的最終價值不是由一個人取代所有專業，而是確保重大問題有人負責形成、證據有人要求、專業在必要時進場、AI 權力有邊界，而最後的治理判讀仍然有一個可以被追問的人。">
      <p className="gr-hero-note">ERIC CHUANG, PH.D. · GOVERNANCE STRATEGIST</p>
    </STTPageHero>
    <section className="gr-section"><div className="gr-wrap"><p className="stt-master-kicker">ROLE OF FINAL JUDGMENT</p><h2>治理責任不是「永遠知道答案」，而是對判斷程序與最後決定負責。</h2><p className="gr-desc">能力可以外包，資訊可以由工具協助，專業可以分工；但最後的授權、否決、停止與責任，不能因此消失。</p><div className="gr-grid">{[["01","問題形成","在比較方案之前，先確認真正需要被回答的是什麼。"],["02","證據門檻","要求重要主張能回到來源、假設、未知與可能推翻結論的證據。"],["03","專業路由","辨識法律、會計、稅務、信託、產業或技術專業何時必須正式進場。"],["04","人機權力邊界","AI 可以檢索、分析與支援流程，但不能自然取得無邊界的決策權。"],["05","不可逆風險","重大行動先確認最大損失、退出能力、停止條件與再驗證機制。"],["06","最終說明責任","重要判讀必須能說明依據、限制與不確定性，不以模型或團隊名義稀釋責任。"]].map(([n,t,b])=><article className="gr-card" key={n}><small>{n}</small><h3>{t}</h3><p>{b}</p></article>)}</div></div></section>
    <section className="gr-section"><div className="gr-wrap"><p className="stt-master-kicker">CURRENT POSITIONS</p><h2>公開職務與專業角色</h2><div className="gr-list">{positions.map((p,i)=><div className="gr-row" key={p}><span>{String(i+1).padStart(2,'0')}</span><p>{p}</p></div>)}</div><p className="gr-desc">職務資訊以本人及相關機構最新公開資料為準；如有職務或機構名稱更新，網站同步調整，避免沿用過時版本。</p></div></section>
    <section className="gr-section"><div className="gr-wrap"><p className="stt-master-kicker">AUTHORSHIP & PUBLIC WRITING</p><h2>著作與專欄，是治理判斷被留下、被閱讀與被檢驗的另一條路徑。</h2><p className="gr-desc">莊鈞翔博士除治理實務與研究工作外，也持續以著作與法律策略專欄整理制度、法律、企業決策與人的選擇。網站將著作、專欄與研究分開呈現，讓讀者知道哪些是完整著作、哪些是公共評論、哪些屬研究資料。</p><div className="gr-cta"><button onClick={()=>navigate('/books')}>著作正典 →</button><button onClick={()=>navigate('/insights')}>專欄判讀 →</button><button onClick={()=>navigate('/research')}>研究與論文 →</button></div></div></section>
    <section className="gr-section"><div className="gr-wrap"><p className="stt-master-kicker">GOVERNANCE & RESEARCH DOMAINS</p><h2>研究與治理關注領域</h2><div className="gr-grid">{domains.map((d,i)=><article className="gr-card" key={d}><small>{String(i+1).padStart(2,'0')}</small><h3>{d}</h3></article>)}</div><div className="gr-cta"><button onClick={()=>navigate('/research')}>研究與論文 →</button><button onClick={()=>navigate('/publications')}>出版與研究 →</button></div></div></section>
    <section className="gr-section"><div className="gr-wrap"><p className="stt-master-kicker">AI ASSISTANCE</p><h2>AI 協助不等於作者權、論證主權或責任移轉。</h2><p className="gr-desc">在研究整理、文字校對、結構整理、資訊檢索、格式處理與工作流程中，可以使用 AI 提供輔助；但核心觀點、正式判讀與最終內容責任仍由具名作者或治理責任人確認。高影響專業事項仍依需要讓具相應資格者正式進場。</p><div className="gr-cta"><button onClick={()=>navigate('/legal/ai-disclosure')}>完整 AI 使用揭露 →</button><button className="primary" onClick={()=>navigate('/start')}>開始治理判讀 →</button></div></div></section>
  </div>;
}
