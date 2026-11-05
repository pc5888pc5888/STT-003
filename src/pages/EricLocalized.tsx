import { useEffect } from "react";
import { Link } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";
import AUTHOR_PROFILE from "../data/authorProfile.json";

type Language = "en" | "ja" | "ko";
const data = {
  en: {
    title:"Founder & CEO | Chuang Chun-Hsiang, Ph.D.", subtitle:"Founder and Chief Executive Officer, STT Governance",
    role:"Governance interpretation and institutional design", roleText:"Dr. Chuang Chun-Hsiang is the founder and CEO of STT Governance. His work focuses on enterprise strategy, corporate governance and compliance, family business succession, organizational decision-making and AI governance. The priority is to identify the real issue, evidence, decision authority, accountability, available options and unacceptable risks before decisions become irreversible.",
    principle:"Governance interpretation begins by defining the decision correctly", principleText:"When business strategy, equity, family succession, legal risks, financial compliance, organizational change and AI intersect, the central question is not which professional should respond first. It is who has decision authority, which evidence supports the choice, who remains responsible and which outcomes cannot be accepted. Legal, financial, trust and technology professionals enter at the appropriate governance stage, without transferring ultimate responsibility.",
    domains:"Core governance domains", areas:[["Enterprise governance and major decisions","Authority, evidence, responsibility and unacceptable consequences."],["Family governance and succession","Family values, succession arrangements and intergenerational roles."],["Corporate governance and internal compliance","Operational and traceable structures for governance and compliance."],["Operating risk and contract governance","Transactional and contractual risks within governance objectives."],["Organizational decisions and executive management","Clear authority, delegation, procedures and accountability."],["AI governance and digital governance","Capabilities, limitations and non-delegable human decision authority."]],
    technical:"AI governance and technical practice", technicalText:"AI supports research, comparison, analysis and decision workflows. The original profile records 21 Anthropic AI / Claude technical learning programs and a Google Gemini education credential; technical learning and certifications are presented as distinct categories, not as substitutes for governance authority.",
    human:"Human decision authority", humanText:"AI may improve research and decision support, but the ultimate decision, delegation of authority and consequences remain the responsibility of human decision-makers. Models serve as governance staff, not autonomous governing authorities.",
    positions:"Current positions", positionNote:"These positions belong to their respective organizations. Listing them does not imply common ownership or founding responsibility. M Media is an independent third-party publisher.",
    publications:"Research and publications", publicationText:"Research interests include family business succession, corporate governance, compliance, professional-service sustainability, AI governance and the relationship between human judgment and decision sovereignty.",
    more:"Explore research and publications", intake:"Governance engagement", intakeText:"Before acting, establish the true question, unacceptable risks, competent decision-maker and person ultimately accountable.", action:"Start a governance review"
  },
  ja: {
    title:"創設者・CEO｜莊鈞翔博士",subtitle:"STT Governance 創設者・最高経営責任者",
    role:"ガバナンス判断と制度設計",roleText:"莊鈞翔博士はSTT Governanceの創設者兼CEOです。企業戦略、コーポレートガバナンスとコンプライアンス、ファミリー企業の事業承継、組織の意思決定、AIガバナンスを中心に活動しています。重大な決定が不可逆的な結果を招く前に、問題の本質、証拠、権限、責任、選択肢および許容できないリスクを明確にします。",
    principle:"ガバナンス判断とは、意思決定の問題を正しく定義すること",principleText:"経営戦略、株式構造、家族承継、法的リスク、財務コンプライアンス、組織変革、AIが交差する場合、まず誰に最終決定権があり、どの証拠が判断を支え、誰が責任を負うかを確認します。そのうえで法務、財務、信託、技術の専門家を適切な段階に配置します。",
    domains:"中核となるガバナンス領域",areas:[["企業統治と重大な意思決定","権限、証拠、責任と許容できない結果。"],["ファミリーガバナンスと事業承継","家族の価値、承継計画、世代間の役割。"],["コーポレートガバナンスと内部コンプライアンス","実行・検証可能な制度構造。"],["事業リスクと契約ガバナンス","取引や契約のリスクを統治目的から判断。"],["組織の意思決定と経営管理","決定権、委任、手続、説明責任。"],["AIガバナンスとデジタル統治","AIの限界と人間に帰属する最終決定権。"]],
    technical:"AIガバナンスと技術実務",technicalText:"AIは調査、文献比較、分析、意思決定支援を担います。中国語の正式プロフィールにはAnthropic AI／Claudeの技術学習21課程およびGoogle Geminiの教育関連資格が記載されています。学習成果と資格は、その性質を区別して提示します。",
    human:"最終決定の主権は人間にある",humanText:"AIの支援範囲が広がっても、重大な統治判断、権限委任、実行の可否、結果に対する最終責任は人間が負います。AIは統治の幕僚であり、意思決定主体の代替ではありません。",
    positions:"現任職務",positionNote:"各職務はそれぞれ独立した機関に属し、同一の所有関係や創設関係を意味しません。Mメディアは外部の第三者媒体です。",
    publications:"研究・出版",publicationText:"企業承継、家族価値、会社統治、法令遵守、専門サービスの持続可能性、AIガバナンス、人間の判断と意思決定主権を主な研究テーマとしています。",
    more:"研究・出版を見る",intake:"ガバナンスの相談",intakeText:"行動の前に、問題、許容できないリスク、意思決定権限、最終責任者を明確にします。",action:"ガバナンス判断を始める"
  },
  ko: {
    title:"창립자 겸 CEO | 좡쥔샹 박사",subtitle:"STT Governance 창립자 겸 최고경영자",
    role:"거버넌스 판단과 제도 설계",roleText:"좡쥔샹 박사는 STT Governance의 창립자 겸 CEO입니다. 기업 전략, 기업지배구조와 준법, 가족기업 승계, 조직 의사결정, AI 거버넌스를 주요 영역으로 삼습니다. 중대한 결정이 되돌릴 수 없는 결과로 이어지기 전에 문제의 본질, 증거, 권한, 책임, 대안 및 수용할 수 없는 위험을 명확히 합니다.",
    principle:"거버넌스 판단은 의사결정의 문제를 올바르게 정의하는 일",principleText:"사업 전략, 지분 구조, 가족 승계, 법적 위험, 재무 준법, 조직 변화, AI가 교차할 때 먼저 최종 결정권자, 판단을 뒷받침하는 증거, 책임 주체 및 감당할 수 없는 결과를 확인합니다. 이후 법률, 재무, 신탁 및 기술 전문가를 적절한 단계에 배치하되 최종 책임은 이전하지 않습니다.",
    domains:"핵심 거버넌스 영역",areas:[["기업지배구조와 중대한 결정","권한, 증거, 책임 및 수용할 수 없는 결과."],["가족 거버넌스와 기업 승계","가족 가치, 승계 계획 및 세대 간 역할."],["기업지배구조와 내부 준법","실행 가능하고 추적 가능한 제도적 구조."],["운영 위험과 계약 거버넌스","거래와 계약 위험을 거버넌스 목적에 따라 판단."],["조직 의사결정과 최고경영","결정권, 위임, 절차 및 책임 소재."],["AI 거버넌스와 디지털 거버넌스","AI의 능력과 한계, 인간의 최종 결정권."]],
    technical:"AI 거버넌스와 기술 실무",technicalText:"AI는 연구, 자료 비교, 분석 및 의사결정 지원을 수행합니다. 중국어 공식 소개에는 Anthropic AI / Claude 기술 학습 21개 과정과 Google Gemini 교육 관련 자격이 기재되어 있으며, 교육 이수와 자격은 성격을 구분해 제시합니다.",
    human:"최종 결정의 주권은 인간에게 있습니다",humanText:"AI가 정보 처리와 판단 지원을 강화하더라도 중대한 거버넌스 판단, 권한 위임, 실행 여부 및 결과에 대한 최종 책임은 인간 의사결정자에게 있습니다. AI는 거버넌스 참모이지 독립된 결정권자가 아닙니다.",
    positions:"현재 직책",positionNote:"각 직책은 별개 기관에 속하며 동일한 소유관계나 창립 관계를 뜻하지 않습니다. M 미디어는 외부 제3자 매체입니다.",
    publications:"연구와 출판",publicationText:"기업 승계, 가족 가치, 기업지배구조, 준법, 전문 서비스 지속가능성, AI 거버넌스, 인간의 판단과 의사결정 주권을 다룹니다.",
    more:"연구와 출판 보기",intake:"거버넌스 의뢰",intakeText:"실행에 앞서 문제의 본질, 수용할 수 없는 위험, 결정권자 및 최종 책임자를 확인합니다.",action:"거버넌스 판단 시작"
  }
} as const;

export default function EricLocalized({lang}:{lang:Language}) {
  const t = data[lang];
  useEffect(() => {
    document.title = t.title + " | STT Governance";
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = t.roleText;
  },[lang,t]);
  return <div className="stt-inst-page stt-eric-page" lang={lang}>
    <UnifiedTitleHero kicker="STT GOVERNANCE" title={t.title} subtitle={t.subtitle}
      image="/visual-approved/portrait-stt-20261102-hd.webp"
      imageFit="contain" imagePosition="right bottom" id={lang+"-eric-title"} />
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">GOVERNANCE ROLE</p><h2>{t.role}</h2><div className="stt-inst-body"><p>{t.roleText}</p></div></div></section>
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">DECISION AUTHORITY</p><h2>{t.principle}</h2><div className="stt-inst-body"><p>{t.principleText}</p></div></div></section>
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">CORE GOVERNANCE DOMAINS</p><h2>{t.domains}</h2><div className="stt-inst-body"><div className="stt-inst-grid stt-eric-domain-grid">{t.areas.map(([name,detail],i)=><article key={name}><span className="stt-eric-domain-number">{String(i+1).padStart(2,"0")}</span><h3>{name}</h3><p>{detail}</p></article>)}</div></div></div></section>
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">AI GOVERNANCE & TECHNICAL PRACTICE</p><h2>{t.technical}</h2><div className="stt-inst-body"><p>{t.technicalText}</p></div></div></section>
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">HUMAN AUTHORITY</p><h2>{t.human}</h2><div className="stt-inst-body"><p>{t.humanText}</p></div></div></section>
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">CURRENT POSITIONS</p><h2>{t.positions}</h2><div className="stt-inst-body"><div className="stt-eric-position-list">{AUTHOR_PROFILE.positions.map(position=><div className="stt-eric-position-row" key={position}><b>POSITION</b><div lang="zh-Hant">{position}</div></div>)}</div><p className="stt-eric-position-note">{t.positionNote}</p></div></div></section>
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">RESEARCH & PUBLICATIONS</p><h2>{t.publications}</h2><div className="stt-inst-body"><p>{t.publicationText}</p><div className="stt-eric-publication-list">{AUTHOR_PROFILE.publications.map(title=><div className="stt-eric-publication-row" key={title}><b>PUBLICATION</b><div lang="zh-Hant">{title}</div></div>)}</div><Link to={"/"+lang+"/insights"}>{t.more} →</Link></div></div></section>
    <section className="stt-inst-section"><div className="stt-inst-shell"><p className="stt-inst-kicker">GOVERNANCE INTAKE</p><h2>{t.intake}</h2><div className="stt-inst-body"><p>{t.intakeText}</p><Link to={"/"+lang+"/start"}>{t.action} →</Link></div></div></section>
  </div>;
}
