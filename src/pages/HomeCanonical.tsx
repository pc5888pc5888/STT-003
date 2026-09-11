import { useNavigate } from "react-router-dom";
import STTPageHero from "../components/STTPageHero";

type HomeProps = { onNavigate?: (page: string) => void };

const focusAreas = [
  ["重大決策", "先確認問題、證據、反方與不可承擔的結果。", "/problems/major-decision"],
  ["企業承接與決策權", "把個人權威轉成組織可以承接的決策制度。", "/problems/owner-dependence"],
  ["接班與權力交接", "讓權力、資訊、責任與關係真正跨過世代。", "/problems/succession"],
  ["家族與所有權", "讓所有權、控制權、照護責任、異議與退出有共同規則。", "/problems/family-ownership"],
  ["策略＋法務", "把法律位置與商業價值放進同一張決策地圖。", "/problems/strategic-legal"],
  ["AI Governance", "能力不等於權力；先界定授權、覆核、停止、退出與責任。", "/problems/ai-governance"],
  ["制度失效", "找出制度文件與真實運作之間的責任斷點。", "/problems/system-failure"],
  ["Founder Legacy", "把創辦人的判斷與治理記憶轉成可被傳承的知識資產。", "/problems/founder-legacy"],
] as const;

export default function HomeCanonical(_: HomeProps) {
  const navigate = useNavigate();
  return <div className="stt-home-gateway">
    <STTPageHero
      primary
      visual="home"
      eyebrow="STT GOVERNANCE · STRATEGY · GOVERNANCE · JUDGMENT"
      title="讓重要的事，走得更遠。"
      lead="STT Governance 協助企業、家族與重大決策者，在事件變成不可逆結果之前，先把真正的問題、證據、權力、責任與選項看清楚，再進入執行。"
      actions={[
        { text: "看看我正在面對的問題", to: "/problems", primary: true },
        { text: "理解 STT 如何判讀", to: "/how-stt-works" },
      ]}
    />

    <section className="stt-home-problems" aria-labelledby="home-problems-title">
      <div className="stt-master-shell">
        <div className="stt-home-problems__head">
          <p className="stt-master-kicker">START FROM THE REAL PROBLEM</p>
          <h2 id="home-problems-title">不用先知道自己需要哪一種顧問。</h2>
          <p>先從正在發生的事情開始，再把症狀、真正問題、證據與可執行結果分開。</p>
        </div>
        <div className="stt-home-problem-grid">
          {focusAreas.map(([title, body, path], index) => <button key={path} type="button" onClick={() => navigate(path)}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <h3>{title}</h3><p>{body}</p><span>進入問題 →</span>
          </button>)}
        </div>
      </div>
    </section>

    <section className="stt-home-final">
      <div className="stt-master-shell">
        <p className="stt-master-kicker">GOVERNANCE JUDGMENT</p>
        <h2>真正的治理，不是給更多答案，而是先避免以錯誤問題、錯誤證據與不可承擔的代價，推動一個看似合理的決定。</h2>
        <p>如果你正在面對一個重大事件，先把現在發生了什麼，以及最不希望接下來發生什麼說清楚。</p>
        <a href="/start">開始治理判讀 →</a>
      </div>
    </section>
  </div>;
}
