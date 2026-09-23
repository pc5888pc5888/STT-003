import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UnifiedTitleHero from "../components/UnifiedTitleHero";

type IntakeData = {
  name: string;
  contact: string;
  role: string;
  situation: string;
  undesired: string;
  desired: string;
  deadline_status: "" | "無" | "有";
  deadline_date: string;
  event_type: string;
  "bot-field": string;
};

const EMPTY_DATA: IntakeData = {
  name: "",
  contact: "",
  role: "",
  situation: "",
  undesired: "",
  desired: "",
  deadline_status: "",
  deadline_date: "",
  event_type: "",
  "bot-field": "",
};

const EVENT_TYPES = ["重大決策", "家族接班", "股權治理", "AI 治理", "機構合作", "其他"] as const;
const ROLES = ["企業主", "家族成員", "董事", "經理人", "專業顧問", "其他"] as const;

const routeDefaults: Record<string, string> = {
  "major-decision": "重大決策",
  "owner-dependence": "重大決策",
  succession: "家族接班",
  "family-ownership": "股權治理",
  "strategic-legal": "重大決策",
  "ai-governance": "AI 治理",
  "system-failure": "重大決策",
  "founder-legacy": "家族接班",
};

function setMeta() {
  document.title = "開始治理判讀｜STT Governance";
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = "先告訴 STT 現在發生了什麼、最不希望接下來發生什麼，以及希望事情最後變成什麼。第一次只整理問題與下一步，不要求大量敏感資料。";
}

export default function Start() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IntakeData>(EMPTY_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    setMeta();
    const type = searchParams.get("type");
    const route = searchParams.get("route");
    const eventType = type === "institution" ? "機構合作" : route ? (routeDefaults[route] ?? "") : "";
    setData({ ...EMPTY_DATA, event_type: eventType });
    setSubmitted(false);
    setReceiptId("");
    setSendError("");
  }, [searchParams]);

  const update = <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendError("");

    if (data.deadline_status === "有" && !data.deadline_date) {
      setSendError("若存在明確決策期限，請填寫日期。");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/cooperation-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route: "governance-intake",
          route_label: "治理判讀受理",
          ...data,
        }),
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

  if (submitted) {
    return (
      <div className="stt-intake-page bg-[#fbfaf7] text-[#26231f]">
        <UnifiedTitleHero
          kicker="GOVERNANCE ENGAGEMENT"
          title="提交後"
          lead="STT 將先判斷事件是否適合進入治理程序，以及需要補充哪些非敏感資訊。正式受理之前，不進行完整個案判斷，也不要求提交不必要的機敏資料。"
          id="start-success-title"
        />
        <section className="px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[900px] border-t border-[#d8c8ad] pt-8">
            {receiptId && <p className="text-sm text-[#8f693d]">收件編號｜{receiptId}</p>}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-7 border border-[#b8925d] bg-transparent px-5 py-3 text-sm text-[#8f693d]"
            >
              返回受理表
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="stt-intake-page bg-[#fbfaf7] text-[#26231f]">
      <UnifiedTitleHero
        kicker="GOVERNANCE ENGAGEMENT"
        title="先把正在發生的事情說清楚。"
        lead="先告訴 STT：現在發生了什麼、你最不希望接下來發生什麼，以及希望事情最後變成什麼。"
        id="start-title"
      />

      <section className="border-b border-[#d8c8ad] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#8f693d]">DATA MINIMIZATION</p>
          <h2 className="mt-4 font-serif text-3xl leading-snug lg:text-4xl">第一次提交，只整理問題與下一步。</h2>
          <p className="mt-5 max-w-[850px] text-sm leading-8 text-[#70685f] lg:text-base">
            本頁第一階段只整理問題與下一步，不提供即時法律結論，也不要求第一次提交大量敏感資訊。正式受理後，才依案件建立資料與 AI 使用邊界。請不要在此階段提供不必要的身分證件、金融帳戶、醫療資料、完整營業秘密或其他高度敏感資訊。
          </p>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10 lg:py-18">
        <form onSubmit={submit} className="mx-auto max-w-[980px]" noValidate={false}>
          <div className="border-t border-[#d8c8ad]">
            <TextField number="01" label="姓名或稱謂" value={data.name} onChange={(value) => update("name", value)} required />
            <TextField number="02" label="Email 或可回覆之聯絡方式" value={data.contact} onChange={(value) => update("contact", value)} required />
            <SelectField number="03" label="你在此事件中的角色" value={data.role} onChange={(value) => update("role", value)} options={ROLES} required />
            <TextAreaField number="04" label="現在發生了什麼？" value={data.situation} onChange={(value) => update("situation", value)} required />
            <TextAreaField number="05" label="你最不希望接下來發生什麼？" value={data.undesired} onChange={(value) => update("undesired", value)} required />
            <TextAreaField number="06" label="如果事情被妥善處理，你希望最後形成什麼狀態？" value={data.desired} onChange={(value) => update("desired", value)} required />

            <fieldset className="grid gap-5 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8">
              <legend className="sr-only">是否存在明確決策期限？</legend>
              <span className="font-serif text-xl text-[#b18a54]">07</span>
              <div>
                <p className="font-serif text-xl leading-snug lg:text-2xl">是否存在明確決策期限？（無／有，日期）</p>
                <div className="mt-5 flex flex-wrap items-center gap-6">
                  {(["無", "有"] as const).map((option) => (
                    <label key={option} className="inline-flex items-center gap-2 text-sm text-[#514b43]">
                      <input
                        type="radio"
                        name="deadline_status"
                        value={option}
                        checked={data.deadline_status === option}
                        onChange={() => {
                          update("deadline_status", option);
                          if (option === "無") update("deadline_date", "");
                        }}
                        required
                      />
                      {option}
                    </label>
                  ))}
                  {data.deadline_status === "有" && (
                    <input
                      type="date"
                      aria-label="明確決策期限日期"
                      value={data.deadline_date}
                      onChange={(event) => update("deadline_date", event.target.value)}
                      required
                      className="border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm text-[#3b3732] outline-none focus:border-[#8f693d]"
                    />
                  )}
                </div>
              </div>
            </fieldset>

            <SelectField number="08" label="事件類型" value={data.event_type} onChange={(value) => update("event_type", value)} options={EVENT_TYPES} required />
          </div>

          <input
            type="text"
            name="bot-field"
            value={data["bot-field"]}
            onChange={(event) => update("bot-field", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="border-t border-[#d8c8ad] pt-8">
            <button
              type="submit"
              disabled={sending}
              className="border border-[#b8925d] bg-[#b8925d] px-7 py-3.5 text-sm text-white disabled:opacity-60"
            >
              {sending ? "正在送出…" : "提交治理情境"}
            </button>
            {sendError && <p role="alert" className="mt-4 text-sm leading-7 text-[#8a4f3d]">{sendError}</p>}
          </div>
        </form>
      </section>
    </div>
  );
}

function TextField({ number, label, value, onChange, required = false }: { number: string; label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8">
      <span className="font-serif text-xl text-[#b18a54]">{number}</span>
      <span>
        <span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span>
        <input
          type="text"
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"
        />
      </span>
    </label>
  );
}

function TextAreaField({ number, label, value, onChange, required = false }: { number: string; label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8">
      <span className="font-serif text-xl text-[#b18a54]">{number}</span>
      <span>
        <span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span>
        <textarea
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
          className="mt-5 w-full resize-y border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"
        />
      </span>
    </label>
  );
}

function SelectField<T extends readonly string[]>({ number, label, value, onChange, options, required = false }: { number: string; label: string; value: string; onChange: (value: string) => void; options: T; required?: boolean }) {
  return (
    <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8">
      <span className="font-serif text-xl text-[#b18a54]">{number}</span>
      <span>
        <span className="block font-serif text-xl leading-snug lg:text-2xl">{label}</span>
        <select
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-5 w-full border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#8f693d]"
        >
          <option value="">請選擇</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </span>
    </label>
  );
}
