import { useEffect } from "react";
import { ArrowRight, BookOpen, Brain, Building2, Landmark, Map, Scale, ShieldCheck, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type HomeSection = "hero" | "governance" | "positioning" | "strategist" | "insights";

type HomeProps = {
  onNavigate: (page: string) => void;
  currentPage?: string;
  activeSection?: HomeSection;
  setActiveSection?: (section: HomeSection) => void;
};

type RuntimeLenis = {
  scrollTo: (target: HTMLElement, options?: { offset?: number }) => void;
};

const sectionMap: Record<HomeSection, string> = {
  hero: "hero",
  governance: "governance",
  positioning: "architecture",
  strategist: "authority",
  insights: "intelligence",
};

export default function Home({ onNavigate, currentPage, activeSection = "hero" }: HomeProps) {
  const { t } = useI18n();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const runtimeWindow = window as unknown as { lenis?: RuntimeLenis };
    if (runtimeWindow.lenis) {
      runtimeWindow.lenis.scrollTo(element, { offset: -76 });
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const target = currentPage === "governance" ? "governance" : sectionMap[activeSection];
    const timer = window.setTimeout(() => scrollToSection(target), 120);
    return () => window.clearTimeout(timer);
  }, [activeSection, currentPage]);

  const gateways = [
    {
      key: "governance",
      icon: Landmark,
      action: () => scrollToSection("governance"),
    },
    {
      key: "internalCompliance",
      icon: ShieldCheck,
      action: () => onNavigate("internal-compliance"),
    },
    {
      key: "humanisticLandscape",
      icon: Map,
      action: () => scrollToSection("humanistic"),
    },
    {
      key: "pressInsights",
      icon: BookOpen,
      action: () => onNavigate("columns"),
    },
  ];

  const architectureItems = [
    {
      label: t("home.architecture.corporateGovernance"),
      icon: Building2,
      action: () => onNavigate("corporate-governance"),
    },
    {
      label: t("home.architecture.familyGovernance"),
      icon: Users,
      action: () => onNavigate("family-governance"),
    },
    {
      label: t("home.architecture.internalCompliance"),
      icon: Scale,
      action: () => onNavigate("internal-compliance"),
    },
    {
      label: t("home.architecture.esgai"),
      icon: Brain,
      action: () => onNavigate("esgai"),
    },
  ];

  return (
    <div data-stt-theme="platinum" className="min-h-screen" style={{ background: "var(--stt-canvas)", color: "var(--stt-ink)" }}>
      <section id="hero" data-stt-readable="true" className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b" style={{ borderColor: "var(--stt-line)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute right-[-7vw] top-[-16vh] w-[68vw] h-[68vw] rounded-full border" style={{ borderColor: "rgba(183,138,69,0.22)" }} />
          <div className="absolute right-[4vw] top-[7vh] w-[46vw] h-[46vw] rounded-full border" style={{ borderColor: "rgba(183,138,69,0.20)" }} />
          <div className="absolute right-[14vw] top-[20vh] w-[28vw] h-[28vw] rounded-full border" style={{ borderColor: "rgba(183,138,69,0.18)" }} />
          <div className="absolute right-[34vw] top-0 h-full w-px" style={{ background: "rgba(183,138,69,0.18)" }} />
          <div className="absolute right-0 top-[33%] h-px w-[64%]" style={{ background: "rgba(183,138,69,0.16)" }} />
          <div className="absolute right-[8vw] bottom-0 w-[27vw] h-[62vh] border-l border-t bg-white/50" style={{ borderColor: "rgba(183,138,69,0.20)" }}>
            <div className="absolute left-0 right-0 top-0 h-10 border-b" style={{ borderColor: "rgba(36,34,31,0.08)" }} />
            <div className="absolute left-[12%] top-10 bottom-0 w-[13%] border-x" style={{ borderColor: "rgba(36,34,31,0.08)" }} />
            <div className="absolute left-[36%] top-10 bottom-0 w-[13%] border-x" style={{ borderColor: "rgba(36,34,31,0.08)" }} />
            <div className="absolute left-[60%] top-10 bottom-0 w-[13%] border-x" style={{ borderColor: "rgba(36,34,31,0.08)" }} />
            <div className="absolute left-[84%] top-10 bottom-0 w-[13%] border-x" style={{ borderColor: "rgba(36,34,31,0.08)" }} />
          </div>
          <div
            className="absolute right-[29vw] bottom-[23vh] w-14 h-14 rounded-full"
            style={{ background: "radial-gradient(circle at 32% 28%, #fff8df 0%, #d9b777 28%, #b0823a 58%, #76511f 100%)", boxShadow: "0 16px 34px rgba(118,81,31,0.18)" }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1280px] items-center px-6 py-16 lg:px-10">
          <div className="max-w-[680px] lg:pb-20">
            <p className="mb-7 text-xs tracking-[0.24em]" style={{ color: "var(--stt-gold-deep)" }}>
              {t("home.hero.eyebrow")}
            </p>
            <h1 className="font-serif text-[clamp(2.9rem,6vw,5.8rem)] font-light leading-[1.22] tracking-[0.04em]">
              <span className="block">{t("home.hero.titleLine1")}</span>
              <span className="block">{t("home.hero.titleLine2")}</span>
            </h1>
            <div className="my-8 h-px w-16" style={{ background: "var(--stt-gold)" }} />
            <p className="text-sm tracking-[0.16em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>
              {t("home.hero.subtitle")}
            </p>
            <p className="mt-5 max-w-[600px] text-base leading-8" style={{ color: "var(--stt-ink-muted)" }}>
              {t("home.hero.description")}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("governance")}
                className="inline-flex items-center gap-3 border bg-transparent px-5 py-3 text-sm cursor-pointer transition-all hover:translate-x-0.5"
                style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}
              >
                {t("home.hero.primaryAction")}
                <ArrowRight className="w-4 h-4" strokeWidth={1.3} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("about")}
                className="inline-flex items-center gap-3 border bg-white/60 px-5 py-3 text-sm cursor-pointer"
                style={{ borderColor: "var(--stt-line)", color: "var(--stt-ink-soft)" }}
              >
                {t("home.hero.secondaryAction")}
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto grid max-w-[1280px] grid-cols-1 border-t md:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--stt-line)" }}>
          {gateways.map((gateway) => {
            const Icon = gateway.icon;
            const key = `home.gateways.${gateway.key}`;
            return (
              <button
                key={gateway.key}
                type="button"
                onClick={gateway.action}
                className="group min-h-[190px] border-b bg-white/45 px-7 py-6 text-left cursor-pointer transition-colors hover:bg-white md:border-r lg:border-b-0"
                style={{ borderColor: "var(--stt-line)" }}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-6 h-6" strokeWidth={1.15} style={{ color: "var(--stt-gold-deep)" }} />
                  <span className="text-xs tracking-[0.18em]" style={{ color: "var(--stt-gold-deep)" }}>
                    {t(`${key}.number`)}
                  </span>
                </div>
                <p className="mt-6 font-serif text-lg tracking-[0.04em]">{t(`${key}.title`)}</p>
                <p className="mt-2 text-sm" style={{ color: "var(--stt-gold-deep)" }}>{t(`${key}.subtitle`)}</p>
                <p className="mt-3 text-xs leading-6 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--stt-ink-muted)" }}>
                  {t(`${key}.description`)}
                </p>
                <ArrowRight className="mt-4 w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
              </button>
            );
          })}
        </div>
      </section>

      <section id="governance" data-stt-readable="true" className="border-b px-6 py-24 lg:px-10 lg:py-32" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[820px]">
            <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>{t("home.architecture.eyebrow")}</p>
            <h2 className="mt-5 font-serif text-3xl font-light leading-[1.5] md:text-5xl">{t("home.architecture.title")}</h2>
            <p className="mt-6 max-w-[760px] text-base leading-8" style={{ color: "var(--stt-ink-muted)" }}>{t("home.architecture.description")}</p>
          </div>

          <div id="architecture" className="mt-14 grid gap-px border bg-[var(--stt-line)] md:grid-cols-2" style={{ borderColor: "var(--stt-line)" }}>
            {architectureItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button key={item.label} type="button" onClick={item.action} className="group flex min-h-[180px] items-center justify-between bg-[var(--stt-canvas)] p-7 text-left cursor-pointer transition-colors hover:bg-white">
                  <div>
                    <span className="text-xs tracking-[0.18em]" style={{ color: "var(--stt-gold-deep)" }}>0{index + 1}</span>
                    <h3 className="mt-5 font-serif text-xl font-normal leading-8 md:text-2xl">{item.label}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-8">
                    <Icon className="w-7 h-7" strokeWidth={1.1} style={{ color: "var(--stt-gold-deep)" }} />
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="authority" data-stt-readable="true" className="border-b bg-white px-6 py-24 lg:px-10 lg:py-32" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden border" style={{ borderColor: "var(--stt-line)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(243,239,231,0.96), rgba(255,255,255,0.8))" }} />
            <div className="absolute left-[14%] top-[12%] w-[72%] aspect-square rounded-full border" style={{ borderColor: "var(--stt-gold-line)" }} />
            <div className="absolute left-[29%] top-[27%] w-[42%] aspect-square rounded-full border" style={{ borderColor: "var(--stt-gold-line)" }} />
            <div className="absolute left-1/2 top-0 h-full w-px" style={{ background: "var(--stt-gold-line)" }} />
            <div className="absolute top-1/2 left-0 h-px w-full" style={{ background: "var(--stt-gold-line)" }} />
            <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "var(--stt-gold)" }} />
          </div>

          <div>
            <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>{t("home.authority.eyebrow")}</p>
            <h2 className="mt-5 font-serif text-3xl font-light leading-[1.5] md:text-5xl">{t("home.authority.title")}</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {["role1", "role2", "role3"].map((role) => (
                <span key={role} className="border px-3 py-2 text-xs" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>
                  {t(`home.authority.${role}`)}
                </span>
              ))}
            </div>
            <p className="mt-7 text-base leading-8" style={{ color: "var(--stt-ink-muted)" }}>{t("home.authority.description")}</p>
            <button type="button" onClick={() => onNavigate("about")} className="mt-8 inline-flex items-center gap-3 bg-transparent border-0 p-0 text-sm cursor-pointer" style={{ color: "var(--stt-gold-deep)" }}>
              {t("home.authority.action")}
              <ArrowRight className="w-4 h-4" strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </section>

      <section id="humanistic" data-stt-readable="true" className="border-b px-6 py-24 lg:px-10 lg:py-32" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>{t("home.gateways.humanisticLandscape.title")}</p>
            <h2 className="mt-5 font-serif text-3xl font-light md:text-5xl">{t("home.gateways.humanisticLandscape.subtitle")}</h2>
            <p className="mt-6 max-w-[620px] text-base leading-8" style={{ color: "var(--stt-ink-muted)" }}>{t("home.gateways.humanisticLandscape.description")}</p>
          </div>
          <div className="grid grid-cols-3 gap-px border bg-[var(--stt-line)]" style={{ borderColor: "var(--stt-line)" }}>
            {["People", "Place", "Industry"].map((label, index) => (
              <div key={label} className="min-h-[160px] bg-white p-5">
                <span className="text-xs" style={{ color: "var(--stt-gold-deep)" }}>0{index + 1}</span>
                <p className="mt-16 font-serif text-lg">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="intelligence" data-stt-readable="true" className="border-b bg-white px-6 py-24 lg:px-10 lg:py-32" style={{ borderColor: "var(--stt-line)" }}>
        <div className="mx-auto max-w-[1180px]">
          <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>{t("home.intelligence.eyebrow")}</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h2 className="font-serif text-3xl font-light leading-[1.5] md:text-5xl">{t("home.intelligence.title")}</h2>
            <p className="text-base leading-8" style={{ color: "var(--stt-ink-muted)" }}>{t("home.intelligence.description")}</p>
          </div>

          <div className="mt-14 grid gap-px border bg-[var(--stt-line)] md:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--stt-line)" }}>
            {[
              ["latest", "columns"],
              ["editorial", "article-index"],
              ["publications", "books"],
              ["research", "papers"],
            ].map(([key, route]) => (
              <button key={key} type="button" onClick={() => onNavigate(route)} className="group min-h-[150px] bg-white p-6 text-left cursor-pointer">
                <p className="font-serif text-lg">{t(`home.intelligence.${key}`)}</p>
                <ArrowRight className="mt-12 w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.2} style={{ color: "var(--stt-gold-deep)" }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section data-stt-readable="true" className="px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1180px] border px-7 py-12 md:px-12" style={{ borderColor: "var(--stt-gold-line)", background: "var(--stt-ivory)" }}>
          <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--stt-gold-deep)" }}>{t("home.engagement.eyebrow")}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-serif text-3xl font-light md:text-4xl">{t("home.engagement.title")}</h2>
              <p className="mt-5 max-w-[720px] text-base leading-8" style={{ color: "var(--stt-ink-muted)" }}>{t("home.engagement.description")}</p>
            </div>
            <button type="button" onClick={() => onNavigate("about")} className="inline-flex items-center justify-center gap-3 border bg-white px-5 py-3 text-sm cursor-pointer" style={{ borderColor: "var(--stt-gold-line)", color: "var(--stt-gold-deep)" }}>
              {t("home.engagement.primaryAction")}
              <ArrowRight className="w-4 h-4" strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
