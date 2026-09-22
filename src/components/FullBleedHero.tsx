import type { ReactNode } from "react";
import STTPageHero from "./STTPageHero";
import type { STTVisualKey } from "../sttVisuals";

export type PrimaryTheme = "problems" | "method" | "columns" | "publications" | "stt";
type Action = { text: string; to: string; primary?: boolean };

type PrimaryItem = { label: string; visual: STTVisualKey; title: string; titleLines: readonly string[]; lead: string; actions: Action[] };
export const PRIMARY_THEMES: Record<PrimaryTheme, PrimaryItem> = {
  problems: {
    label: "你正在面對什麼", visual: "problems",
    title: "先釐清你正在面對的是什麼，再決定怎麼處理。",
    titleLines: ["先釐清你正在面對的是什麼，", "再決定怎麼處理。"],
    lead: "企業重大決策、家族治理、接班安排、信任摩擦、法遵壓力、數位轉型與 AI 使用，表面看似不同，底層往往都指向問題定義、權責配置、證據判讀與風險承擔。",
    actions: [{ text: "展開問題盤點", to: "#problem-index", primary: true }, { text: "進入治理入口", to: "/start" }],
  },
  method: {
    label: "如何判讀", visual: "method",
    title: "在採取行動之前，先完成判讀。",
    titleLines: ["在採取行動之前，", "先完成判讀。"],
    lead: "STT 的判讀，不是快速給答案，而是先回到事件結構：問題是否被正確定義、證據是否足夠、權力是否越界、責任如何承擔、風險是否可逆，然後才決定是否進入下一步。",
    actions: [{ text: "理解判讀方法", to: "#judgment-foundations", primary: true }, { text: "檢視治理流程", to: "#judgment-path" }],
  },
  columns: {
    label: "專欄判讀", visual: "columns",
    title: "把事件的表面，還原成可判讀的結構。",
    titleLines: ["把事件的表面，", "還原成可判讀的結構。"],
    lead: "透過莊博士的人文地景產專欄與治理評論，STT 將複雜事件拆解為制度、風險、信任、法遵與策略之間的結構關係，讓閱讀不只是吸收資訊，而是學會判讀。",
    actions: [{ text: "閱讀專欄", to: "#column-list", primary: true }, { text: "進入判讀", to: "/how-stt-works" }],
  },
  publications: {
    label: "出版研究", visual: "publications",
    title: "出版，不只是內容；而是治理知識的長期載體。",
    titleLines: ["出版，", "不只是內容；而是治理知識的長期載體。"],
    lead: "STT Press 將治理、法遵、接班、家族、數位治理與制度文明轉化為可閱讀、可累積、可流通的研究文本，讓知識不只被發表，更能被持續使用。",
    actions: [{ text: "查看出版研究", to: "/books", primary: true }, { text: "進入 STT Press", to: "/books" }],
  },
  stt: {
    label: "關於 STT", visual: "aboutStt",
    title: "STT Governance 不是一般顧問公司，而是高位階治理文明平台。",
    titleLines: ["STT Governance 不是一般顧問公司，", "而是高位階治理文明平台。"],
    lead: "在 STT，治理不是口號，而是一套面對現實、判讀局勢、設計制度、協助決策與建立長期信任的工作方法。莊鈞翔博士主導判讀與制度設計，AI 作為治理幕僚與作業系統輔助。",
    actions: [{ text: "認識 STT", to: "/institution/eric-chuang", primary: true }, { text: "理解治理定位", to: "/problems" }],
  },
};

export default function FullBleedHero({ theme, children }: { theme: PrimaryTheme; children?: ReactNode }) {
  const item = PRIMARY_THEMES[theme];
  return <STTPageHero primary visual={item.visual} eyebrow={item.label} title={item.title} titleLines={item.titleLines} lead={item.lead} actions={item.actions}>{children}</STTPageHero>;
}

export function JudgmentFoundations() {
  const foundations = [
    ["Problem", "先辨識真正問題", "事件本身，不等於問題。先看清需要處理的是什麼，不讓表面症狀替我們決定答案。"],
    ["Evidence", "確認判斷的根據", "把事實、說法、假設與未知分開，確認哪些資料能支持判斷，哪些資料可能推翻它。"],
    ["Judgment", "先否決不可承擔的錯誤", "選項再多，仍需要人作出取捨。先確認不能承擔的代價，再談策略與執行。"],
    ["Governance", "讓決定回到權責制度", "誰能授權、誰須覆核、何時停止、如何修正，都必須有明確安排與責任歸屬。"],
  ];
  return <section className="stt-foundations" id="judgment-foundations" aria-labelledby="foundations-title"><div className="stt-editorial-wrap">
    <p className="stt-editorial-label">判讀關注什麼</p><h2 id="foundations-title">四個面向，讓重要判斷站得住。</h2>
    <p className="stt-editorial-lead">問題、證據、取捨與權責，是判讀時需要同時關注的面向；不是四項服務，也不是另一套四步流程。</p>
    <div className="stt-foundations__grid">{foundations.map(([en, title, body], index) => <article key={en}><p className="stt-foundations__eyebrow">{String(index + 1).padStart(2, "0")} · {en}</p><h3>{title}</h3><p>{body}</p></article>)}</div>
    <div className="stt-method-intro" id="judgment-path"><p className="stt-editorial-label">判讀如何展開</p><h2>從看見問題，到留下可承接的制度。</h2><nav aria-label="七步判讀" className="stt-golden-path"><ol>{["看見", "反推", "舉證", "理解", "架構", "執行", "留下"].map((step, index) => <li key={step}><a href={`#judgment-step-${index + 1}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</a></li>)}</ol></nav></div>
  </div></section>;
}

export function STTRoles() {
  return <section className="stt-roles" id="stt-roles" aria-labelledby="stt-roles-title"><div className="stt-editorial-wrap">
    <p className="stt-editorial-label">治理主體與專業分工</p><h2 id="stt-roles-title">能力可以擴充，判斷主權不能外包。</h2>
    <div className="stt-roles__grid"><article><h3>莊鈞翔博士｜治理總控者</h3><p>作為制度設計者與決策判讀者，莊博士統合問題形成、證據判讀、專業協作與決策責任，讓重大選擇有依據、有邊界，也有可以承接的安排。</p></article><article><h3>AI｜治理幕僚與作業輔助</h3><p>AI 協助整理資料、核對來源、形成工作底稿與執行已授權的作業；不自行擴張權限，不取代人類的價值取捨、最終授權與責任。</p></article></div>
  </div></section>;
}
