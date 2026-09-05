import { useState, type ChangeEvent } from "react";
import { ArrowRight, BookOpen, GraduationCap, Landmark, Loader2, Scale, Send, ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type ContactFormData = {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  lineId: string;
  appointmentTime: string;
  message: string;
};

export function ContactModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const [form, setForm] = useState<ContactFormData>({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    lineId: "",
    appointmentTime: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.companyName.trim() || !form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClassName = "w-full border bg-white px-3 py-2.5 text-sm outline-none";
  const inputStyle = { borderColor: "var(--stt-line-strong)", borderRadius: "var(--stt-radius-md)", color: "var(--stt-ink)" } as const;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-[620px] overflow-y-auto border bg-white p-6 md:p-8" style={{ maxHeight: "90vh", borderColor: "var(--stt-gold-line)", boxShadow: "var(--stt-shadow-panel)" }}>
        <button type="button" onClick={onClose} className="absolute right-4 top-4 bg-transparent border-0 p-2 cursor-pointer" aria-label={t("common.close")}>
          <X className="w-5 h-5" strokeWidth={1.2} style={{ color: "var(--stt-ink-muted)" }} />
        </button>

        <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--stt-gold-deep)" }}>Governance Engagement</p>
        <h2 className="mt-3 font-serif text-2xl font-light" style={{ color: "var(--stt-ink)" }}>{t("navigation.engagement")}</h2>
        <p className="mt-4 max-w-[520px] text-sm leading-7" style={{ color: "var(--stt-ink-muted)" }}>{t("home.engagement.description")}</p>

        {status === "success" ? (
          <div className="mt-8 border p-6 text-center" style={{ borderColor: "var(--stt-gold-line)", background: "var(--stt-ivory)" }}>
            <ShieldCheck className="mx-auto w-7 h-7" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
            <p className="mt-4 font-serif text-xl">已收到治理需求</p>
            <p className="mt-2 text-sm leading-7" style={{ color: "var(--stt-ink-muted)" }}>STT 將依您提供的資訊進行初步分流與聯繫。</p>
            <button type="button" onClick={onClose} className="mt-5 border bg-white px-5 py-2.5 text-sm cursor-pointer" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>{t("common.close")}</button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="text-xs" style={{ color: "var(--stt-ink-soft)" }}>
              公司／機構名稱 *
              <input name="companyName" value={form.companyName} onChange={updateField} className={`${inputClassName} mt-1.5`} style={inputStyle} />
            </label>
            <label className="text-xs" style={{ color: "var(--stt-ink-soft)" }}>
              姓名 *
              <input name="name" value={form.name} onChange={updateField} className={`${inputClassName} mt-1.5`} style={inputStyle} />
            </label>
            <label className="text-xs" style={{ color: "var(--stt-ink-soft)" }}>
              Email *
              <input type="email" name="email" value={form.email} onChange={updateField} className={`${inputClassName} mt-1.5`} style={inputStyle} />
            </label>
            <label className="text-xs" style={{ color: "var(--stt-ink-soft)" }}>
              聯絡電話 *
              <input name="phone" value={form.phone} onChange={updateField} className={`${inputClassName} mt-1.5`} style={inputStyle} />
            </label>
            <label className="text-xs" style={{ color: "var(--stt-ink-soft)" }}>
              LINE ID
              <input name="lineId" value={form.lineId} onChange={updateField} className={`${inputClassName} mt-1.5`} style={inputStyle} />
            </label>
            <label className="text-xs" style={{ color: "var(--stt-ink-soft)" }}>
              希望聯繫時間
              <input name="appointmentTime" value={form.appointmentTime} onChange={updateField} className={`${inputClassName} mt-1.5`} style={inputStyle} />
            </label>
            <label className="text-xs md:col-span-2" style={{ color: "var(--stt-ink-soft)" }}>
              治理需求說明
              <textarea name="message" value={form.message} onChange={updateField} rows={5} className={`${inputClassName} mt-1.5 resize-y`} style={inputStyle} />
            </label>

            {status === "error" && (
              <p className="md:col-span-2 text-xs" style={{ color: "var(--stt-danger)" }}>請確認必填欄位，或稍後重新送出。</p>
            )}

            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={status === "sending"}
              className="md:col-span-2 inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: "var(--stt-gold-line)", background: "var(--stt-ivory)", color: "var(--stt-gold-deep)" }}
            >
              {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" strokeWidth={1.3} />}
              {status === "sending" ? "正在送出" : "送出治理需求"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useI18n();
  const [showContact, setShowContact] = useState(false);

  const positions = [
    "STT Governance 策略智庫 創辦人暨執行長",
    "中華企業策略永續發展學會 創會理事長",
    "臺灣厝買賣文化發展協會 永續長",
    "逢甲大學商學院 兼任助理教授",
    "M傳媒 法律策略專欄 特約評論",
  ];

  const researchDomains = [
    "企業治理與策略判讀",
    "家族治理、企業接班與世代價值",
    "內在法遵與公司治理法遵精神",
    "專業服務信任、關係治理與永續",
    "領導風格、創新能力與經營績效",
    "AI Governance 與治理型工作流程",
  ];

  const publications = [
    "內在法遵 Internal Compliance《為你的內心，打造一座不可侵犯的至聖所》",
    "內在法遵 Family Governance《為你的家族，留下比財富更能穿越世代的秩序》",
    "2026 永續家族治理實務錄",
    "臺灣企業接班人的佈局規劃與傳承家族價值",
    "企業策略導入公司治理法遵精神：以外部法律顧問團隊協助為例",
    "顧客關係管理對服務永續之探討：以 A 國際法律事務所為例",
    "不同世代企業家人格特質、創新能力對企業經營績效之影響：以領導風格為中介變數",
  ];

  return (
    <div data-stt-theme="platinum" style={{ background: "var(--stt-canvas)", color: "var(--stt-ink)" }}>
      <section data-stt-readable="true" className="border-b px-6 py-20 lg:px-10 lg:py-28" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.24em]" style={{ color: "var(--stt-gold-deep)" }}>Sovereignty of Thought</p>
            <h1 className="mt-6 font-serif text-4xl font-light leading-[1.45] md:text-6xl">莊鈞翔 博士</h1>
            <p className="mt-3 text-sm tracking-[0.16em]" style={{ color: "var(--stt-gold-deep)" }}>Eric Chuang, Ph.D. · Governance Strategist</p>
            <div className="my-8 h-px w-16" style={{ background: "var(--stt-gold)" }} />
            <p className="max-w-[680px] text-lg leading-9" style={{ color: "var(--stt-ink-soft)" }}>
              STT 的核心不是提供大量意見，而是建立能承受時間、權力、風險與世代變動的治理秩序。制度先於工具，判讀高於輸出，治理主權始終由人類決策者掌握。
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[t("home.authority.role1"), t("home.authority.role2"), t("home.authority.role3")].map((role) => (
                <span key={role} className="border px-3 py-2 text-xs" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>{role}</span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden border bg-white" style={{ borderColor: "var(--stt-line)" }}>
            <div className="absolute inset-[10%] rounded-full border" style={{ borderColor: "var(--stt-gold-line)" }} />
            <div className="absolute inset-[24%] rounded-full border" style={{ borderColor: "var(--stt-gold-line)" }} />
            <div className="absolute left-1/2 top-0 h-full w-px" style={{ background: "var(--stt-gold-line)" }} />
            <div className="absolute left-0 top-1/2 h-px w-full" style={{ background: "var(--stt-gold-line)" }} />
            <div className="absolute left-1/2 top-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, #fff8df, #b78a45 55%, #76511f)" }} />
          </div>
        </div>
      </section>

      <section data-stt-readable="true" className="border-b bg-white px-6 py-20 lg:px-10 lg:py-24" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--stt-gold-deep)" }}>Current Positions</p>
              </div>
              <div className="mt-7 divide-y" style={{ borderColor: "var(--stt-line)" }}>
                {positions.map((position, index) => (
                  <div key={position} className="flex gap-4 py-4 border-b" style={{ borderColor: "var(--stt-line)" }}>
                    <span className="text-xs" style={{ color: "var(--stt-gold-deep)" }}>0{index + 1}</span>
                    <p className="text-sm leading-7" style={{ color: "var(--stt-ink-soft)" }}>{position}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--stt-gold-deep)" }}>Governance & Research Domains</p>
              </div>
              <div className="mt-7 grid gap-px border bg-[var(--stt-line)] sm:grid-cols-2" style={{ borderColor: "var(--stt-line)" }}>
                {researchDomains.map((domain) => (
                  <div key={domain} className="min-h-[110px] bg-white p-5 text-sm leading-7" style={{ color: "var(--stt-ink-soft)" }}>{domain}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-stt-readable="true" className="border-b px-6 py-20 lg:px-10 lg:py-24" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--stt-gold-deep)" }}>Scholarship & Publications</p>
          </div>
          <h2 className="mt-5 max-w-[820px] font-serif text-3xl font-light leading-[1.5] md:text-4xl">研究與出版不是履歷裝飾，而是治理判讀可以被檢驗與累積的知識基礎。</h2>

          <div className="mt-10 divide-y border-t" style={{ borderColor: "var(--stt-line)" }}>
            {publications.map((publication, index) => (
              <div key={publication} className="grid gap-3 border-b py-5 md:grid-cols-[70px_1fr]" style={{ borderColor: "var(--stt-line)" }}>
                <span className="text-xs" style={{ color: "var(--stt-gold-deep)" }}>{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-7" style={{ color: "var(--stt-ink-soft)" }}>{publication}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-stt-readable="true" className="bg-white px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-10 border p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end" style={{ borderColor: "var(--stt-gold-line)" }}>
          <div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--stt-gold-deep)" }}>Governance Engagement</p>
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light">需要的不是更多資訊，而是更精準的治理判讀。</h2>
            <p className="mt-4 max-w-[760px] text-sm leading-7" style={{ color: "var(--stt-ink-muted)" }}>{t("home.engagement.description")}</p>
          </div>
          <button type="button" onClick={() => setShowContact(true)} className="inline-flex items-center gap-3 border bg-[var(--stt-ivory)] px-5 py-3 text-sm cursor-pointer" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>
            {t("navigation.engagement")}
            <ArrowRight className="w-4 h-4" strokeWidth={1.2} />
          </button>
        </div>
      </section>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>
  );
}
