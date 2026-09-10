import { useMemo, useState, type FormEvent } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export type EventRegistrationFormData = {
  eventName: string;
  attendanceMode: "onsite" | "online" | "hybrid";
  organization: string;
  department: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  lineId: string;
  dietary: "regularMeal" | "vegetarian" | "noMeal";
  governanceTopic: "corporateGovernance" | "familyGovernance" | "internalCompliance" | "aiGovernance" | "strategy" | "other";
  message: string;
  invoiceTitle: string;
  taxId: string;
  consent: boolean;
};

export type EventRegistrationFormProps = {
  eventName: string;
  onSubmit: (data: EventRegistrationFormData) => Promise<void>;
};

type Status = "idle" | "submitting" | "success" | "error";

type ErrorMap = Partial<Record<keyof EventRegistrationFormData, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{7,20}$/;

export function EventRegistrationForm({ eventName, onSubmit }: EventRegistrationFormProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ErrorMap>({});
  const [form, setForm] = useState<EventRegistrationFormData>({
    eventName,
    attendanceMode: "onsite",
    organization: "",
    department: "",
    jobTitle: "",
    name: "",
    email: "",
    phone: "",
    lineId: "",
    dietary: "regularMeal",
    governanceTopic: "corporateGovernance",
    message: "",
    invoiceTitle: "",
    taxId: "",
    consent: false,
  });

  const fieldClassName = "w-full border bg-white px-3 py-2.5 text-sm outline-none transition-colors";
  const fieldStyle = useMemo(
    () => ({
      borderColor: "var(--stt-line-strong)",
      borderRadius: "var(--stt-radius-md)",
      color: "var(--stt-ink)",
    }),
    []
  );

  const setValue = <K extends keyof EventRegistrationFormData>(key: K, value: EventRegistrationFormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors: ErrorMap = {};

    if (!form.organization.trim()) {
      nextErrors.organization = t("events.registration.validation.required");
    }
    if (!form.name.trim()) {
      nextErrors.name = t("events.registration.validation.required");
    }
    if (!form.email.trim()) {
      nextErrors.email = t("events.registration.validation.required");
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = t("events.registration.validation.invalidEmail");
    }
    if (!form.phone.trim()) {
      nextErrors.phone = t("events.registration.validation.required");
    } else if (!phonePattern.test(form.phone.trim())) {
      nextErrors.phone = t("events.registration.validation.invalidPhone");
    }
    if (!form.consent) {
      nextErrors.consent = t("events.registration.validation.consentRequired");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setStatus("submitting");
    try {
      await onSubmit({ ...form, eventName });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const errorText = (key: keyof EventRegistrationFormData) =>
    errors[key] ? <p className="mt-1 text-xs" style={{ color: "var(--stt-danger)" }}>{errors[key]}</p> : null;

  if (status === "success") {
    return (
      <div className="border bg-white p-8 text-center" style={{ borderColor: "var(--stt-gold-line)" }}>
        <h3 className="text-xl font-serif" style={{ color: "var(--stt-ink)" }}>
          {t("events.registration.actions.success")}
        </h3>
        <p className="mt-3 text-sm leading-7" style={{ color: "var(--stt-ink-muted)" }}>
          {t("events.registration.actions.successDescription")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <section className="space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--stt-gold-deep)" }}>
            {t("events.registration.organizationInformation")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.organization")} *
            <input
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.organization}
              onChange={(event) => setValue("organization", event.target.value)}
            />
            {errorText("organization")}
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.department")}
            <input
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.department}
              onChange={(event) => setValue("department", event.target.value)}
            />
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.jobTitle")}
            <input
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.jobTitle}
              onChange={(event) => setValue("jobTitle", event.target.value)}
            />
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.name")} *
            <input
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.name}
              onChange={(event) => setValue("name", event.target.value)}
            />
            {errorText("name")}
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.email")} *
            <input
              type="email"
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.email}
              onChange={(event) => setValue("email", event.target.value)}
            />
            {errorText("email")}
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.phone")} *
            <input
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.phone}
              onChange={(event) => setValue("phone", event.target.value)}
            />
            {errorText("phone")}
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.lineId")}
            <input
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.lineId}
              onChange={(event) => setValue("lineId", event.target.value)}
            />
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.attendanceMode")}
            <select
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.attendanceMode}
              onChange={(event) => setValue("attendanceMode", event.target.value as EventRegistrationFormData["attendanceMode"])}
            >
              <option value="onsite">{t("events.registration.options.onsite")}</option>
              <option value="online">{t("events.registration.options.online")}</option>
              <option value="hybrid">{t("events.registration.options.hybrid")}</option>
            </select>
          </label>

          <label className="text-sm" style={{ color: "var(--stt-ink-soft)" }}>
            {t("events.registration.fields.dietary")}
            <select
              className={`${fieldClassName} mt-1.5`}
              style={fieldStyle}
              value={form.dietary}
              onChange={(event) => setValue("dietary", event.target.value as EventRegistrationFormData["dietary"])}
            >
              <option value="regularMeal">{t("events.registration.options.regularMeal")}</option>
              <option value="vegetarian">{t("events.registration.options.vegetarian")}</option>
              <option value="noMeal">{t("events.registration.options.noMeal")}</option>
            </select>
          </label>
        </div>
      </section>

      <section className="space-y-4 border-t pt-6" style={{ borderColor: "var(--stt-line)" }}>
        <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--stt-gold-deep)" }}>
          {t("events.registration.governanceNeeds")}
        </p>

        <label className="block text-sm" style={{ color: "var(--stt-ink-soft)" }}>
          {t("events.registration.fields.governanceTopic")}
          <select
            className={`${fieldClassName} mt-1.5`}
            style={fieldStyle}
            value={form.governanceTopic}
            onChange={(event) => setValue("governanceTopic", event.target.value as EventRegistrationFormData["governanceTopic"])}
          >
            <option value="corporateGovernance">{t("events.registration.options.corporateGovernance")}</option>
            <option value="familyGovernance">{t("events.registration.options.familyGovernance")}</option>
            <option value="internalCompliance">{t("events.registration.options.internalCompliance")}</option>
            <option value="aiGovernance">{t("events.registration.options.aiGovernance")}</option>
            <option value="strategy">{t("events.registration.options.strategy")}</option>
            <option value="other">{t("events.registration.options.other")}</option>
          </select>
        </label>

        <label className="block text-sm" style={{ color: "var(--stt-ink-soft)" }}>
          {t("events.registration.fields.message")}
          <textarea
            rows={4}
            className={`${fieldClassName} mt-1.5 resize-y`}
            style={fieldStyle}
            value={form.message}
            onChange={(event) => setValue("message", event.target.value)}
          />
        </label>
      </section>

      <section className="space-y-4 border-t pt-6" style={{ borderColor: "var(--stt-line)" }}>
        <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--stt-gold-deep)" }}>
          {t("events.registration.privacy")}
        </p>

        <label className="flex items-start gap-3 text-sm leading-6" style={{ color: "var(--stt-ink-soft)" }}>
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setValue("consent", event.target.checked)}
            className="mt-1"
          />
          <span>{t("events.registration.fields.consent")}</span>
        </label>
        {errorText("consent")}
      </section>

      {status === "error" && (
        <div className="border px-4 py-3 text-sm" style={{ borderColor: "rgba(138,77,69,0.35)", color: "var(--stt-danger)" }}>
          {t("events.registration.actions.errorDescription")}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full border px-5 py-3.5 text-sm font-semibold tracking-[0.08em] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          borderColor: "var(--stt-gold-line)",
          background: "var(--stt-ivory)",
          color: "var(--stt-gold-deep)",
          borderRadius: "var(--stt-radius-md)",
        }}
      >
        {status === "submitting" ? t("events.registration.actions.submitting") : t("events.registration.actions.submit")}
      </button>
    </form>
  );
}
