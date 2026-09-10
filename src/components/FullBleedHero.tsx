import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "../styles/stt-fullbleed.css";

export type PrimaryTheme = "problems" | "method" | "columns" | "publications" | "stt";
type Action = { text: string; to: string };
const ROOT = "/visual-bank/stt/hero-hires/";
export const PRIMARY_THEMES: Record<PrimaryTheme, { label: string; image: string; title: string; lead: string; actions: Action[] }> = {
  problems: {
    label: "你正在面對什麼", image: "problems.png",
    title: "不是先選服務；先從你正在面對的真實問題開始。",
    lead: "不用先知道自己需要哪一種顧問。先從正在發生的事情開始，再把症狀、真正問題、證據與可執行結果分開。",
    actions: [{ text: "找到我正在面對的問題", to: "#problem-index" }, { text: "理解 STT 如何判讀", to: "/how-stt-works" }],
  },
  method: {
    label: "如何判讀", image: "stt.png",
    title: "先把問題判斷對，再談怎麼做。",
    lead: "STT 不從服務分類開始，而是把事件、真正問題、證據、反方、不可承擔結果、專業責任與執行條件放回同一個判讀程序。",
    actions: [{ text: "理解判讀的起點", to: "#judgment-foundations" }, { text: "從我的問題開始", to: "/start" }],
  },
  columns: {
    label: "專欄判讀", image: "columns.png",
    title: "莊鈞翔博士｜專欄判讀",
    lead: "從法律新聞、人文地景產與新聞採訪出發，看見事件背後的制度、人的選擇與長期影響。",
    actions: [{ text: "選擇專欄系列", to: "#column-series" }, { text: "瀏覽全部專欄", to: "#column-list" }],
  },
  publications: {
    label: "出版研究", image: "publications.png",
    title: "思想被留下，才可能被理解、被檢驗、被承接。",
    lead: "專欄用來辨識問題；著作用來建立完整思想；研究則必須回到原始論文、方法與可驗證資料。三者不混為同一種內容。",
    actions: [{ text: "閱讀著作", to: "/books" }, { text: "查看研究論文", to: "/research" }],
  },
  stt: {
    label: "關於 STT", image: "stt-portrait.png",
    title: "策略為先，治理為本，管理為終。",
    lead: "STT Governance 是以治理判讀與制度設計為核心的高位階治理文明平台，從人的真實問題出發，統合證據、專業與決策，讓權力與責任有清楚的歸屬。",
    actions: [{ text: "認識莊鈞翔博士", to: "/institution/eric-chuang" }, { text: "合作洽詢", to: "/start" }],
  },
};

const TITLE_LINES: Record<PrimaryTheme, string[]> = {"problems": ["不是先選服務；", "先從你正在面對的", "真實問題開始。"], "method": ["先把問題判斷對，", "再談怎麼做。"], "columns": ["莊鈞翔博士｜專欄判讀"], "publications": ["思想被留下，", "才可能被理解、", "被檢驗、被承接。"], "stt": ["策略為先，", "治理為本，", "管理為終。"]};
const HERO_DIMENSIONS: Record<PrimaryTheme, [number, number]> = { problems:[6250,4419], method:[6250,4419], columns:[3509,1975], publications:[6250,4419], stt:[4096,5120] };

export default function FullBleedHero({ theme, children }: { theme: PrimaryTheme; children?: ReactNode }) {
  const item = PRIMARY_THEMES[theme];
  const [imageWidth, imageHeight] = HERO_DIMENSIONS[theme];
  return <section key={theme} className="stt-full-hero" data-stt-primary-hero={theme} aria-labelledby={`hero-title-${theme}`}>
    <div className="stt-full-hero__media" aria-hidden="true">
      <img src={ROOT + item.image} alt="" width={imageWidth} height={imageHeight} decoding="async" fetchPriority="high" />
    </div>
    <div className="stt-full-hero__veil" aria-hidden="true" />
    <div className="stt-full-hero__inner">
      <div className="stt-full-hero__copy">
        <p className="stt-full-hero__label">{item.label}</p>
        <h1 id={`hero-title-${theme}`} aria-label={item.title}>{TITLE_LINES[theme].map((line, index) => <span key={index} style={{ display: "block" }}>{line}</span>)}</h1>
        <p className="stt-full-hero__lead" data-stt-title-sentence>{item.lead}</p>
        <div className="stt-full-hero__actions">
          {item.actions.map((action, index) => action.to.startsWith("#")
            ? <a key={action.to} className={index === 0 ? "is-primary" : undefined} href={action.to}>{action.text}<span aria-hidden="true">↓</span></a>
            : <Link key={action.to} className={index === 0 ? "is-primary" : undefined} to={action.to}>{action.text}<span aria-hidden="true">→</span></Link>)}
        </div>
        {children && <div className="stt-full-hero__meta">{children}</div>}
      </div>
    </div>
  </section>;
}

export function JudgmentFoundations() {
  const foundations = [
    ["Problem", "先辨識真正問題", "事件本身，不等於問題。先看清需要處理的是什麼，不讓表面症狀替我們決定答案。"],
    ["Evidence", "確認判斷的根據", "把事實、說法、假設與未知分開，確認哪些資料能支持判斷，哪些資料可能推翻它。"],
    ["Judgment", "先否決不可承擔的錯誤", "選項再多，仍需要人作出取捨。先確認不能承擔的代價，再談策略與執行。"],
    ["Governance", "讓決定回到權責制度", "誰能授權、誰須覆核、何時停止、如何修正，都必須有明確安排與責任歸屬。"],
  ];
  return <section className="stt-foundations" id="judgment-foundations" aria-labelledby="foundations-title">
    <div className="stt-editorial-wrap">
      <p className="stt-editorial-label">判讀關注什麼</p>
      <h2 id="foundations-title">四個面向，讓重要判斷站得住。</h2>
      <p className="stt-editorial-lead">問題、證據、取捨與權責，是判讀時需要同時關注的面向；不是四項服務，也不是另一套四步流程。</p>
      <div className="stt-foundations__grid">{foundations.map(([en, title, body], index) => <article key={en}>
        <p className="stt-foundations__eyebrow">{String(index + 1).padStart(2, "0")} · {en}</p><h3>{title}</h3><p>{body}</p>
      </article>)}</div>
      <div className="stt-method-intro" id="judgment-path">
        <p className="stt-editorial-label">判讀如何展開</p>
        <h2>從看見問題，到留下可承接的制度。</h2>
        <nav aria-label="七步判讀" className="stt-golden-path"><ol>{["看見", "反推", "舉證", "理解", "架構", "執行", "留下"].map((step, index) => <li key={step}><a href={`#judgment-step-${index + 1}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</a></li>)}</ol></nav>
      </div>
    </div>
  </section>;
}

export function STTRoles() {
  return <section className="stt-roles" id="stt-roles" aria-labelledby="stt-roles-title"><div className="stt-editorial-wrap">
    <p className="stt-editorial-label">治理主體與專業分工</p><h2 id="stt-roles-title">能力可以擴充，判斷主權不能外包。</h2>
    <div className="stt-roles__grid"><article><h3>莊鈞翔博士｜治理總控者</h3><p>作為制度設計者與決策判讀者，莊博士統合問題形成、證據判讀、專業協作與決策責任，讓重大選擇有依據、有邊界，也有可以承接的安排。</p></article><article><h3>AI｜治理幕僚與作業輔助</h3><p>AI 協助整理資料、核對來源、形成工作底稿與執行已授權的作業；不自行擴張權限，不取代人類的價值取捨、最終授權與責任。</p></article></div>
  </div></section>;
}
