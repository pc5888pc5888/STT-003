import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type IntakeData = {
  situation: string;
  undesired: string;
  desired: string;
  evidence: string;
  deadline: string;
  contact: string;
};

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

const emptyData: IntakeData = {
  situation: "",
  undesired: "",
  desired: "",
  evidence: "",
  deadline: "",
  contact: "",
};

export default function Start() {
  const [searchParams] = useSearchParams();
  const route = searchParams.get("route") ?? "";
  const [data, setData] = useState<IntakeData>(emptyData);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const routeLabel = routeLabels[route] ?? "一般治理議題";

  const summary = useMemo(() => {
    return [
      `STT Governance｜初步治理摘要`,
      `議題入口：${routeLabel}`,
      ``,
      `1. 現在發生了什麼？`,
      data.situation || "（未填）",
      ``,
      `2. 最不希望接下來發生什麼？`,
      data.undesired || "（未填）",
      ``,
      `3. 希望事情最後變成什麼？`,
      data.desired || "（未填）",
      ``,
      `4. 目前有哪些資料或證據？`,
      data.evidence || "（未填）",
      ``,
      `5. 是否有期限或不可逆日期？`,
      data.deadline || "（未填）",
      ``,
      `6. 聯絡方式`,
      data.contact || "（未填）",
    ].join("\n");
  }, [data, routeLabel]);

  const update = (key: keyof IntakeData, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="bg-[#fbfaf7] px-6 py-20 text-[#26231f] lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[900px]">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#a37a43]">Governance Intake</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight lg:text-5xl">初步治理摘要已形成。</h1>
          <p className="mt-6 max-w-[700px] text-base leading-8 text-[#6d675f]">這一步不是自動法律判斷，也不是 AI 直接替你下結論。它先把事件、不可接受結果與希望達到的狀態整理清楚，再決定是否需要進一步資料、策略或專業路由。</p>

          <pre className="mt-10 whitespace-pre-wrap border border-[#d8c8ad] bg-white p-6 font-sans text-sm leading-7 text-[#514b43] lg:p-8">{summary}</pre>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={copySummary} className="border border-[#a37a43] bg-transparent px-5 py-3 text-sm text-[#875f2f]">{copied ? "已複製" : "複製治理摘要"}</button>
            <button type="button" onClick={openContact} className="border border-[#b8925d] bg-[#b8925d] px-5 py-3 text-sm text-white">進入正式聯繫</button>
            <button type="button" onClick={() => setSubmitted(false)} className="border-0 bg-transparent px-2 py-3 text-sm text-[#6d675f]">返回修改</button>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#8a8278]">提醒：正式受理前，不建議在一般表單一次提交大量機密、完整訴訟卷證、個資或未公開商業資訊；確認進場後，再建立資料分級與 AI 使用邊界。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfaf7] text-[#26231f]">
      <section className="border-b border-[#d8c8ad] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#a37a43]">Governance Engagement</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight lg:text-6xl">不用先知道自己需要哪一種顧問。</h1>
          <p className="mt-6 max-w-[760px] text-base leading-8 text-[#6d675f] lg:text-lg">先告訴 STT：現在發生了什麼、你最不希望接下來發生什麼，以及希望事情最後變成什麼。</p>
          <div className="mt-7 inline-flex border border-[#d8c8ad] bg-white px-4 py-2 text-xs text-[#7b6d59]">目前入口｜{routeLabel}</div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-10 lg:py-16">
        <form onSubmit={submit} className="mx-auto max-w-[980px] space-y-5">
          <Field number="01" title="現在發生了什麼？" hint="請用自己的話描述事件，不必先替問題分類。" value={data.situation} onChange={(value) => update("situation", value)} required />
          <Field number="02" title="你最不希望接下來發生什麼？" hint="這通常比『我要什麼服務』更接近真正風險。" value={data.undesired} onChange={(value) => update("undesired", value)} required />
          <Field number="03" title="你希望事情最後變成什麼？" hint="盡量描述可以被確認的結果，而不只是『想諮詢』。" value={data.desired} onChange={(value) => update("desired", value)} required />
          <Field number="04" title="目前有哪些資料、文件或證據？" hint="例如契約、通知、時間軸、財務、股權、會議紀錄、判決或其他。初步只要說明有哪些，不需一次上傳完整機密資料。" value={data.evidence} onChange={(value) => update("evidence", value)} />
          <Field number="05" title="目前是否有期限或不可逆日期？" hint="例如法院／行政機關期限、簽約、付款、股東會、董事會、交割、離職、接班或其他。" value={data.deadline} onChange={(value) => update("deadline", value)} />
          <Field number="06" title="聯絡方式" hint="可填姓名、公司、Email、LINE 或方便後續聯繫的方式。" value={data.contact} onChange={(value) => update("contact", value)} />

          <div className="border-t border-[#d8c8ad] pt-8">
            <button type="submit" className="border border-[#b8925d] bg-[#b8925d] px-7 py-3.5 text-sm text-white">建立初步治理摘要</button>
            <p className="mt-5 max-w-[760px] text-xs leading-6 text-[#8a8278]">本頁第一階段只整理問題與下一步，不提供即時法律結論，也不要求第一次提交大量敏感資訊。正式受理後，才依案件建立資料與 AI 使用邊界。</p>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({ number, title, hint, value, onChange, required = false }: { number: string; title: string; hint: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-4 border-b border-[#ded4c4] bg-white p-6 lg:grid-cols-[70px_1fr] lg:p-8">
      <span className="font-serif text-xl text-[#b18a54]">{number}</span>
      <span>
        <span className="block font-serif text-xl lg:text-2xl">{title}{required ? " *" : ""}</span>
        <span className="mt-2 block text-xs leading-6 text-[#8a8278]">{hint}</span>
        <textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="mt-5 w-full resize-y border border-[#d8c8ad] bg-[#fbfaf7] px-4 py-3 text-sm leading-7 text-[#3b3732] outline-none focus:border-[#a37a43]" />
      </span>
    </label>
  );
}
