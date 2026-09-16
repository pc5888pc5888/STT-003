import { useNavigate } from "react-router-dom";
import { COOPERATION_HERO_SRC } from "../assets/generated/cooperationHero";

const HUMANISTIC_INTERVIEW_URL = "/humanistic-20q/";
const SIGNATURE_SRC = "/images/signature-eric001.png";

const channels = [
  {
    number: "01",
    title: "專欄寫作與媒體專訪",
    subtitle: "接受莊博士採訪（獨立人文地景產專區）",
    body: <>透視尋常產業的商業性格，透過深度訪談與文字沉澱，為企業提煉出在市場浪潮中守住分寸、走向長青的<strong>品牌核心資產</strong>。</>,
    action: "進入專區 ➔ 提煉企業故事",
    external: HUMANISTIC_INTERVIEW_URL,
  },
  {
    number: "02",
    title: "企業經營診斷與策略評估",
    subtitle: "邀請莊博士企業評估",
    body: <>直擊組織痛點，針對經營績效、戰略路徑與合規治理進行實質診斷，協助經營者在面臨轉型與競爭壓力時，校準決策、<strong>排除存續風險</strong>。</>,
    action: "立即預約 ➔ 開啟戰略診斷",
    path: "/start?route=enterprise-evaluation",
  },
  {
    number: "03",
    title: "主題演講與論壇邀約",
    subtitle: "邀請莊博士演講",
    body: <>拒絕空泛的口號灌輸，以嚴謹的商學底蘊、治理思維與實戰案例為核心，面向高階論壇與企業內訓，<strong>為組織注入破局發展的經略遠見</strong>。</>,
    action: "送出邀約 ➔ 引進智庫思維",
    path: "/start?route=speaking-invitation",
  },
] as const;

export default function Cooperation() {
  const navigate = useNavigate();

  const open = (channel: typeof channels[number]) => {
    if ("external" in channel && channel.external) {
      window.location.href = channel.external;
      return;
    }
    if ("path" in channel && channel.path) navigate(channel.path);
  };

  return (
    <div className="stt-coop-page">
      <style>{`
        .stt-coop-hero-bg {
          background-size: auto 100% !important;
          background-position: right center !important;
          background-repeat: no-repeat !important;
          filter: none !important;
        }

        @media (max-width: 900px) {
          .stt-coop-hero-bg {
            background-size: cover !important;
            background-position: 72% top !important;
          }
        }
      `}</style>

      <section className="stt-coop-hero" aria-labelledby="stt-coop-title">
        <div
          className="stt-coop-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url("${COOPERATION_HERO_SRC}")` }}
        />
        <div className="stt-coop-copy">
          <h1 id="stt-coop-title">企業在市場的終局賽道能走多遠，<br />取決於經營者在資本，<br />利潤與變局交織時的決策序列。</h1>
          <p className="stt-coop-intro"><strong>STT Governance 策略智庫</strong>由莊鈞翔博士主導，我們不談懸空的理論，只專注於<strong>「拆解商業本質」</strong>與<strong>「建構治理護城河」</strong>，透過嚴謹的商學實戰邏輯，協助企業在龐大生存壓力下精準破局；歡迎依據您的發展策略，選擇相對應的合作通道。</p>
          <div className="stt-coop-actions">
            <button type="button" className="is-primary" onClick={() => navigate("/start")}>立即預約諮詢 <span>→</span></button>
            <button type="button" onClick={() => document.getElementById("stt-coop-channels-title")?.scrollIntoView({ behavior: "smooth" })}>了解合作通道</button>
          </div>
          <div className="stt-coop-caption">
            <strong>STRATEGIC COOPERATION &amp; GROWTH｜預約與合作</strong>
            <span>一起思考更好的決策，讓重要的事，走得更遠。</span>
          </div>
        </div>
        <div className="stt-coop-portrait" aria-label="莊鈞翔博士">
          <div className="stt-coop-signature">
            <img src={SIGNATURE_SRC} alt="莊鈞翔博士簽名" draggable={false} />
            <strong>莊鈞翔 博士</strong>
            <span>CHUANG CHUN-HSIANG, Ph.D.</span>
            <small>人文戰略推文者｜企業治理策略顧問｜內在法遵推動者</small>
          </div>
        </div>
      </section>

      <section className="stt-coop-channels" aria-labelledby="stt-coop-channels-title">
        <div className="stt-coop-section-head">
          <p className="stt-master-kicker">THREE COOPERATION CHANNELS</p>
          <h2 id="stt-coop-channels-title">三大合作通道</h2>
        </div>
        <div className="stt-coop-grid">
          {channels.map((channel) => (
            <article className="stt-coop-card" key={channel.number}>
              <p className="stt-coop-number">{channel.number}</p>
              <h3>{channel.title}</h3>
              <p className="stt-coop-subtitle">{channel.subtitle}</p>
              <p className="stt-coop-body">{channel.body}</p>
              <button type="button" onClick={() => open(channel)}>{channel.action}</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
