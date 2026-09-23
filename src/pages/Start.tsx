import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";

type IntakeField = {
  key: string;
  number: string;
  title: string;
  hint: string;
  required?: boolean;
  rows?: number;
};

type IntakeSchema = {
  label: string;
  eyebrow: string;
  title: string;
  titleLines: readonly string[];
  intro: string;
  fields: IntakeField[];
  cooperation?: boolean;
};

const genericFields: IntakeField[] = [
  { key: "situation", number: "01", title: "現在發生了什麼？", hint: "請用自己的話描述事件，不必先替問題分類。", required: true },
  { key: "undesired", number: "02", title: "你最不希望接下來發生什麼？", hint: "這通常比「我要什麼服務」更接近真正風險。", required: true },
  { key: "desired", number: "03", title: "你希望事情最後變成什麼？", hint: "盡量描述可以被確認的結果，而不只是「想諮詢」。", required: true },
  { key: "evidence", number: "04", title: "目前有哪些資料、文件或證據？", hint: "例如契約、通知、時間軸、財務、股權、會議紀錄、判決或其他。初步只要說明有哪些，不需一次上傳完整機密資料。" },
  { key: "deadline", number: "05", title: "目前是否有期限或不可逆日期？", hint: "例如法院／行政機關期限、簽約、付款、股東會、董事會、交割、離職、接班或其他。" },
  { key: "contact", number: "06", title: "聯絡方式", hint: "可填姓名、公司、Email、LINE 或方便後續聯繫的方式。", rows: 3 },
];

const routeLabels: Record<string, string> = {
  "major-decision": "重大決策",
  "owner-dependence": "企業依賴老闆",
  succession: "接班與權力交接",
  "family-ownership": "家族與所有權",
  "strategic-legal": "策略＋法務判讀",
  "ai-governance": "AI Governance",
  "system-failure": "制度失效",
  "founder-legacy": "Founder Legacy",
};

const enterpriseFields: IntakeField[] = [
  { key: "organization", number: "01", title: "企業／組織目前處於什麼階段？", hint: "可簡要說明產業、主要業務、組織規模、成長／轉型／承接狀態，以及目前最重要的經營背景。", required: true },
  { key: "core_issue", number: "02", title: "目前最需要判讀的經營問題是什麼？", hint: "請描述實際情況，不必先把它包裝成策略、法務、財務或人事問題。", required: true },
  { key: "decision", number: "03", title: "現在有哪些重大決策正在形成？", hint: "例如投資、轉型、組織調整、合作、退出、接班、融資、重大客戶或其他不可輕率處理的決定。", required: true },
  { key: "signals", number: "04", title: "你目前依據哪些資料判斷經營狀況？", hint: "可說明財務、營運、客戶、組織、契約、市場或其他資料來源；初步不需一次提交完整機密文件。" },
  { key: "unacceptable", number: "05", title: "最不能承擔的結果是什麼？", hint: "例如現金流斷裂、失去控制權、重大客戶流失、聲譽損害、關係破裂、不可逆承諾或其他。" },
  { key: "timing", number: "06", title: "目前有哪些時間節點或決策期限？", hint: "例如董事會、股東會、投資決策、融資、合約、交割、年度預算或其他關鍵日期。" },
  { key: "contact", number: "07", title: "聯絡方式", hint: "請留下姓名、企業／組織、Email、LINE 或方便後續正式聯繫的方式。", required: true, rows: 3 },
];

const speakingFields: IntakeField[] = [
  { key: "organizer", number: "01", title: "主辦單位與活動名稱", hint: "請說明主辦單位、活動／論壇／企業內部場合名稱，以及邀約窗口。", required: true },
  { key: "purpose", number: "02", title: "這次邀約最希望達成什麼？", hint: "例如高階論壇觀點、企業治理共識、策略研討、內部決策教育、特定議題引導或其他目的。", required: true },
  { key: "audience", number: "03", title: "主要參與者是誰？", hint: "例如董事、高階主管、家族成員、專業人士、企業團隊、學生或其他受眾；可補充預估人數。" },
  { key: "topic", number: "04", title: "希望莊博士處理的主題或問題", hint: "請描述真正希望被談清楚的問題；如果題目尚未定案，也可先說明活動情境與核心關注。" , required: true},
  { key: "schedule", number: "05", title: "日期、地點與進行形式", hint: "請提供預定日期／時段、城市或場地，以及實體、線上或混合形式。" },
  { key: "format", number: "06", title: "預計時長與流程", hint: "例如 60 分鐘演講、主題對談、論壇與談、工作坊、企業內訓，或是否另有 QA／座談安排。" },
  { key: "rights", number: "07", title: "是否涉及錄影、直播或公開刊載？", hint: "如需錄影、直播、媒體引用、簡報公開或後續內容使用，請先說明預計用途與範圍。" },
  { key: "contact", number: "08", title: "聯絡方式", hint: "請留下姓名、主辦單位、職務、Email、電話／LINE 或其他方便聯繫的方式。", required: true, rows: 3 },
];

const schemas: Record<string, IntakeSchema> = {
  "enterprise-evaluation": {
    label: "企業經營診斷與策略評估",
    eyebrow: "ENTERPRISE GOVERNANCE INTAKE",
    title: "企業經營診斷，先把決策情境說清楚。",
    titleLines: ["企業經營診斷，", "先把決策情境說清楚。"],
    intro: "這份受理表不要求先選服務名稱，而是先釐清企業目前的位置、正在形成的決策、可用資料與不可承擔結果。",
    fields: enterpriseFields,
    cooperation: true,
  },
  "speaking-invitation": {
    label: "主題演講與論壇邀約",
    eyebrow: "SPEAKING & FORUM INVITATION",
    title: "演講與論壇邀約，先確認場域、對象與目的。",
    titleLines: ["演講與論壇邀約，", "先確認場域、對象與目的。"],
    intro: "不同場合需要不同深度、語言與責任邊界。先確認受眾、主題、時間、形式與內容使用方式，再進入正式安排。",
    fields: speakingFields,
    cooperation: true,
  },
};

function genericSchema(route: string): IntakeSchema {
  return {
    label: routeLabels[route] ?? "一般治理議題",
    eyebrow: "GOVERNANCE ENGAGEMENT",
    title: "不用先知道自己需要哪一種顧問。",
    titleLines: ["不用先知道自己需要哪一種顧問。"],
    intro: "先告訴 STT：現在發生了什麼、你最不希望接下來發生什麼，以及希望事情最後變成什麼。",
    fields: genericFields,
  };
}

export default function Start() {
  const [searchParams] = useSearchParams();
  const route = searchParams.get("route") ?? "";
  const schema = schemas[route] ?? genericSchema(route);
  const initial = useMemo(() => Object.fromEntries(schema.fields.map((field) => [field.key, ""])) as Record<string, string>, [route]);
  const [data, setData] = useState<Record<string, string>>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [sendError, setSendError] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setData(initial);
    setSubmitted(false);
    setReceiptId("");
    setSendError("");
    setCopied(false);
  }, [route, initial]);

  const summary = useMemo(() => {
    const rows = [
      "STT Governance｜初步受理摘要",
      `議題入口：${schema.label}`,
      "",
    ];
    schema.fields.forEach((field, index) => {
      rows.push(`${index + 1}. ${field.title}`);
      rows.push(data[field.key] || "（未填）");
      rows.push("");
    });
    return rows.join("\n");
  }, [data, schema]);

  const update = (key: string, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSendError("");

    if (!schema.cooperation) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/cooperation-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route, route_label: schema.label, ...data }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok || result.delivery !== "resend-email") {
        throw new Error("delivery_failed");
      }
      setReceiptId(String(result.receiptId || ""));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSendError("送出未完成。你填寫的內容仍保留在本頁，請稍後再試。");
    } finally {
      setSending(false);
    }
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("stt:open-contact"));
  };

  if (submitted) {
    return (
      <div className="stt-intake-page bg-[#fbfaf7] px-6 py-20 text-[#26231f] lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[900px]">
          <p className="stt-intake-kicker text-[11px] uppercase tracking-[0.26em] text-[#a37a43]">{schema.eyebrow}</p>
          <h1 className="stt-intake-title mt-5 font-serif text-4xl leading-tight lg:text-5xl">{schema.cooperation ? "合作受理資料已送出。" : "初步治理摘要已形成。"}</h1>
          <p className="stt-intake-lead mt-6 max-w-[700px] text-base leading-8 text-[#6d675f]">
            {schema.cooperation
              ? `STT 已收到「${schema.label}」的填寫內容。正式安排前，仍會依實際情境確認資料邊界、責任與下一步。`
              : "這一步不是自動法律判斷，也不是 AI 直接替你下結論。它先把事件、不可接受結果與希望達到的狀態整理清楚，再決定是否需要進一步資料、策略或專業路由。"}
          </p>
          {receiptId && <p className="stt-intake-receipt mt-4 text-sm text-[#8b642f]">收件編號｜{receiptId}</p>}

          <pre className="stt-intake-summary mt-10 whitespace-pre-wrap border border-[#d8c8ad] bg-white p-6 font-sans text-sm leading-7 text-[#514b43] lg:p-8">{summary}</pre>

          <div className="stt-intake-actions mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={copySummary} className="border border-[#a37a43] bg-transparent px-5 py-3 text-sm text-[#875f2f]">{copied ? "已複製" : "複製受理摘要"}</button>
            {!schema.cooperation && <button type="button" onClick={openContact} className="border border-[#b8925d] bg-[#b8925d] px-5 py-3 text-sm text-white">進入正式聯繫</button>}
            <button type="button" onClick={() => setSubmitted(false)} className="border-0 bg-transparent px-2 py-3 text-sm text-[#6d675f]">返回修改</button>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#8a8278]">正式受理前，不建議在一般表單一次提交大量機密、完整訴訟卷證、敏感個資或未公開商業資訊；確認進場後，再建立資料分級與 AI 使用邊界。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stt-intake-page bg-[#fbfaf7] text-[#26231f]">
      <UnifiedTitleHero
        kicker={schema.eyebrow}
        title={schema.title}
        lead={schema.intro}
        id="start-title"
      >
        <div className="stt-intake-route">目前入口｜{schema.label}</div>
      </UnifiedTitleHero>

      <section className="stt-intake-body px-6 py-10 lg:px-10 lg:py-16">
        <form onSubmit={submit} className="stt-intake-form mx-auto max-w-[980px] space-y-5">
          {schema.fields.map((field) => (
            <Field
              key={field.key}
              number={field.number}
              title={field.title}
              hint={field.hint}
              value={data[field.key] || ""}
              onChange={(value) => update(field.key, value)}
              required={field.required}
              rows={field.rows}
            />
          ))}

          <div className="stt-intake-submit border-t border-[#d8c8ad] pt-8">
            <button type="submit" disabled={sending} className="border border-[#b8925d] bg-[#b8925d] px-7 py-3.5 text-sm text-white disabled:opacity-60">
              {sending ? "正在送出…" : schema.cooperation ? "送出合作受理資料" : "建立初步治理摘要"}
            </button>
            {sendError && <p role="alert" className="mt-4 text-sm leading-7 text-[#8a4f3d]">{sendError}</p>}
            <p className="mt-5 max-w-[760px] text-xs leading-6 text-[#8a8278]">本頁第一階段只整理必要資訊與下一步，不提供即時法律結論，也不要求第一次提交大量敏感資訊。正式受理後，才依案件建立資料與 AI 使用邊界。</p>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({ number, title, hint, value, onChange, required = false, rows = 4 }: { number: string; title: string; hint: string; value: string; onChange: (value: string) => void; required?: boolean; rows?: number }) {
  return (
    <label className="stt-intake-field grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8">
      <span className="stt-intake-number font-serif text-xl text-[#b18a54]">{number}</span>
      <span>
        <span className="stt-intake-question block font-serif text-xl lg:text-2xl">{title}</span>
        <span className="stt-intake-hint mt-2 block text-xs leading-6 text-[#8a8278]">{hint}</span>
        <textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="stt-intake-textarea mt-5 w-full resize-y border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#a37a43]" />
      </span>
    </label>
  );
}
