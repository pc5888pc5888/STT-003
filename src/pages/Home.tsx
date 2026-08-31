import { useEffect, useRef, useState } from "react";
import { useI18n, type SupportedLocale } from "@/i18n/I18nProvider";

type HomeSection = "hero" | "governance" | "positioning" | "strategist" | "insights";

type HomeProps = {
  onNavigate: (page: string) => void;
  currentPage?: string;
  activeSection?: HomeSection;
  setActiveSection?: (section: HomeSection) => void;
};

type PillarKey = "governance" | "compliance" | "digital" | "insights";

type PillarContent = {
  eyebrow: string;
  title: string;
  capabilityTitle: string;
  capability: string;
  challengeTitle: string;
  challenge: string;
  actionLabel: string;
  action: () => void;
};

const APPROVED_VISUAL = "/images/stt-home-approved-8k.webp";

export default function Home({ onNavigate, currentPage, activeSection = "hero" }: HomeProps) {
  const { locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<PillarKey | null>(null);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);

  const pillars: Record<PillarKey, PillarContent> = {
    governance: {
      eyebrow: "01 Governance",
      title: "策略治理",
      capabilityTitle: "公司治理策略、組織決策與高階管理",
      capability: "建立企業重大決策的權責邊界、制度接口與核心決策圈秩序，使重大轉型不再依賴個人權威，而能由組織穩定承接。",
      challengeTitle: "全球市場與地緣政治重組下的決策秩序",
      challenge: "企業主在面對重大轉型、跨域投資與市場秩序重組時，真正危險的往往不是資訊不足，而是核心決策圈失序、權責重疊，以及重大選擇缺乏可承擔後果的治理程序。",
      actionLabel: "進入策略治理",
      action: () => onNavigate("corporate-governance"),
    },
    compliance: {
      eyebrow: "02 Internal Compliance",
      title: "內在法遵",
      capabilityTitle: "企業內部合規架構、契約治理、資本籌措與跨國防禦",
      capability: "將法遵前置進入交易、投資、資金、契約與跨境營運流程，使合規不只是事件發生後的檢查，而成為重大決策本身的制度門控。",
      challengeTitle: "跨國佈局與 Clean Supply Chain 法遵防護",
      challenge: "台資企業走向跨國與海外佈局時，同時承受地緣風險、跨國供應鏈審查、契約責任、勞資制度與交易相對人治理要求，需要一套可跨市場延伸的內在法遵架構。",
      actionLabel: "進入內在法遵",
      action: () => onNavigate("internal-compliance"),
    },
    digital: {
      eyebrow: "03 Digital Governance",
      title: "數位（AI）治理",
      capabilityTitle: "Agentic AI、MCP、API 與企業級模型整合治理",
      capability: "以 Anthropic AI／Claude 專業技術訓練與 Google Gemini 認證知識為技術底層，將模型使用、工具調用、權限、資料流與人類最終決策權納入同一套治理架構。",
      challengeTitle: "企業 AI 工作流的模型安全閘門與數位協議法遵",
      challenge: "當企業部署生成式與代理式 AI 工作流時，若缺乏模型安全閘門政策、資料責任、MCP 協議治理與數位法遵程序，技術效率將直接轉化為新的治理暴露。",
      actionLabel: "進入數位治理",
      action: () => onNavigate("esgai"),
    },
    insights: {
      eyebrow: "04 Press & Insights",
      title: "出版與觀點",
      capabilityTitle: "法務、營運風險、出版與高信任知識資產",
      capability: "整合法務管理、營運風險防控、《內在法遵》系列著作與商學研究視角，把複雜治理問題轉化為企業主可以直接判讀的高信任知識入口。",
      challengeTitle: "在資訊過量時代建立可信賴的判讀入口",
      challenge: "企業真正需要的不是更多零碎資訊，而是一個能快速辨識問題層級、判斷風險、理解制度邊界並建立下一步行動秩序的高信任入口。",
      actionLabel: "進入出版與觀點",
      action: () => onNavigate("columns"),
    },
  };

  useEffect(() => {
    if (currentPage === "governance" || activeSection === "governance") {
      setActivePillar("governance");
      window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      return;
    }

    if (activeSection === "insights") {
      setActivePillar("insights");
      window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  }, [activeSection, currentPage]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  const openPillar = (pillar: PillarKey) => {
    setActivePillar(pillar);
    setMenuOpen(false);
    window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const closeDetail = () => {
    setActivePillar(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAi = () => {
    window.dispatchEvent(new CustomEvent("stt:open-ai"));
  };

  const changeLanguage = (nextLocale: SupportedLocale) => {
    setLocale(nextLocale);
    setLanguageOpen(false);
  };

  const releaseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }

    setVoicePlaying(false);
  };

  const readableText = () => {
    const baseText = [
      "秩序，讓價值穿越時間。",
      "Strategic Think Tank",
      "Governance 策略治理",
      "Internal Compliance 內在法遵",
      "Digital Governance 數位 AI 治理",
      "Press and Insights 出版與觀點",
    ];

    if (activePillar) {
      const item = pillars[activePillar];
      baseText.push(item.title, item.capabilityTitle, item.capability, item.challengeTitle, item.challenge);
    }

    return baseText.join("。 ").slice(0, 5200);
  };

  const toggleVoice = async () => {
    if (voicePlaying) {
      releaseAudio();
      setVoiceStatus("語音導讀已停止");
      window.setTimeout(() => setVoiceStatus(""), 1800);
      return;
    }

    setVoiceStatus("正在建立語音導讀");

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: readableText(), locale }),
      });

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const audio = new Audio(objectUrl);

      audioRef.current = audio;
      audioUrlRef.current = objectUrl;
      audio.onended = () => {
        releaseAudio();
        setVoiceStatus("語音導讀已完成");
        window.setTimeout(() => setVoiceStatus(""), 1800);
      };
      audio.onerror = () => {
        releaseAudio();
        setVoiceStatus("語音服務目前暫時無法使用");
      };

      setVoicePlaying(true);
      setVoiceStatus("語音導讀中");
      await audio.play();
    } catch {
      releaseAudio();
      setVoiceStatus("語音服務目前暫時無法使用");
    }
  };

  return (
    <div className="stt-approved-home" data-stt-theme="platinum">
      <style>{`
        .stt-approved-home {
          min-height: 100svh;
          background: #fbfbfa;
          color: #1a1a1a;
        }
        .stt-approved-stage {
          min-height: 100svh;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #fbfbfa;
        }
        .stt-approved-frame {
          position: relative;
          width: min(100vw, 150svh);
          aspect-ratio: 3 / 2;
          max-width: 100vw;
          max-height: 100svh;
          overflow: hidden;
          background: #fbfbfa;
        }
        .stt-approved-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          user-select: none;
          pointer-events: none;
        }
        .stt-approved-hotspot {
          position: absolute;
          z-index: 4;
          border: 0;
          background: transparent;
          cursor: pointer;
          outline: none;
        }
        .stt-approved-hotspot:focus-visible {
          box-shadow: inset 0 0 0 1px rgba(181, 137, 75, 0.58);
          background: rgba(197, 168, 128, 0.05);
        }
        .stt-approved-menu-hit { top: 0.7%; right: 1.7%; width: 5.2%; height: 6.2%; }
        .stt-approved-pillar-01 { left: 10.4%; top: 67.2%; width: 12.2%; height: 25.4%; }
        .stt-approved-pillar-02 { left: 31.1%; top: 67.2%; width: 12.4%; height: 25.4%; }
        .stt-approved-pillar-03 { left: 52.0%; top: 67.2%; width: 12.5%; height: 25.4%; }
        .stt-approved-pillar-04 { left: 73.0%; top: 67.2%; width: 12.6%; height: 25.4%; }
        .stt-approved-tool-ai { left: 81.5%; top: 92.4%; width: 4.8%; height: 6.2%; border-radius: 999px; }
        .stt-approved-tool-language { left: 86.5%; top: 92.4%; width: 4.8%; height: 6.2%; border-radius: 999px; }
        .stt-approved-tool-voice { left: 91.5%; top: 92.4%; width: 4.8%; height: 6.2%; border-radius: 999px; }
        .stt-approved-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: flex;
          justify-content: flex-end;
          background: rgba(31, 28, 24, 0.10);
          backdrop-filter: blur(8px);
        }
        .stt-approved-menu-panel {
          width: min(430px, 92vw);
          min-height: 100svh;
          padding: 92px 38px 44px;
          background: rgba(251, 251, 250, 0.98);
          border-left: 1px solid rgba(197, 168, 128, 0.22);
          box-shadow: -24px 0 80px rgba(36, 34, 31, 0.08);
        }
        .stt-approved-menu-label {
          margin: 0 0 28px;
          color: #a9895e;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }
        .stt-approved-menu-link {
          width: 100%;
          padding: 18px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 0;
          border-bottom: 1px solid rgba(197, 168, 128, 0.18);
          background: transparent;
          color: #1a1a1a;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: 20px;
          text-align: left;
          cursor: pointer;
        }
        .stt-approved-private-link {
          margin-top: 38px;
          padding-top: 22px;
          border-top: 1px solid rgba(197, 168, 128, 0.18);
          color: #a9895e;
          font-size: 12px;
          line-height: 1.8;
        }
        .stt-approved-language-panel {
          position: fixed;
          z-index: 130;
          right: 26px;
          bottom: 86px;
          min-width: 190px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(197, 168, 128, 0.24);
          box-shadow: 0 20px 60px rgba(36, 34, 31, 0.10);
        }
        .stt-approved-language-option {
          width: 100%;
          padding: 11px 12px;
          border: 0;
          background: transparent;
          color: #4b463f;
          font-size: 12px;
          text-align: left;
          cursor: pointer;
        }
        .stt-approved-language-option[data-active="true"] {
          color: #a9895e;
          background: rgba(197, 168, 128, 0.09);
        }
        .stt-approved-voice-status {
          position: fixed;
          right: 26px;
          bottom: 86px;
          z-index: 125;
          max-width: 260px;
          padding: 10px 12px;
          border: 1px solid rgba(197, 168, 128, 0.20);
          background: rgba(255, 255, 255, 0.96);
          color: #6e675e;
          font-size: 11px;
          line-height: 1.7;
          box-shadow: 0 18px 55px rgba(36, 34, 31, 0.08);
        }
        .stt-approved-detail {
          scroll-margin-top: 22px;
          border-top: 1px solid rgba(197, 168, 128, 0.18);
          background: linear-gradient(180deg, #fbfbfa 0%, #f7f4ef 100%);
        }
        .stt-approved-detail-inner {
          width: min(calc(100% - 48px), 1240px);
          margin: 0 auto;
          padding: 76px 0 88px;
          display: grid;
          grid-template-columns: minmax(250px, 0.76fr) minmax(0, 1.24fr);
          gap: 72px;
        }
        .stt-approved-detail-eyebrow {
          margin: 0 0 14px;
          color: #a9895e;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .stt-approved-detail-title {
          margin: 0;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 400;
          line-height: 1.35;
          letter-spacing: 0.04em;
        }
        .stt-approved-detail-rule {
          width: 52px;
          height: 1px;
          margin: 22px 0 24px;
          background: #c5a880;
        }
        .stt-approved-detail-summary {
          margin: 0;
          color: #6e675e;
          font-size: 14px;
          line-height: 2;
        }
        .stt-approved-detail-body { display: grid; gap: 20px; }
        .stt-approved-detail-card {
          padding: 26px 28px;
          border: 1px solid rgba(197, 168, 128, 0.18);
          background: rgba(255, 255, 255, 0.76);
        }
        .stt-approved-detail-card h3 {
          margin: 0 0 12px;
          font-family: "Noto Serif TC", "Noto Serif JP", Georgia, serif;
          font-size: 21px;
          font-weight: 400;
        }
        .stt-approved-detail-card p {
          margin: 0;
          color: #4b463f;
          font-size: 14px;
          line-height: 2;
        }
        .stt-approved-detail-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .stt-approved-detail-button {
          min-height: 48px;
          padding: 0 22px;
          border: 1px solid #c5a880;
          background: transparent;
          color: #1a1a1a;
          font-size: 12px;
          cursor: pointer;
        }
        .stt-approved-detail-button:hover { background: #a9895e; border-color: #a9895e; color: #ffffff; }
        @media (max-width: 900px) {
          .stt-approved-detail-inner { grid-template-columns: 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .stt-approved-stage { min-height: auto; padding: 0; }
          .stt-approved-frame { width: 100vw; max-height: none; }
          .stt-approved-detail-inner { width: calc(100% - 28px); padding: 54px 0 66px; }
        }
      `}</style>

      <section className="stt-approved-stage" aria-label="STT Governance approved homepage visual">
        <div className="stt-approved-frame">
          <img
            className="stt-approved-image"
            src={APPROVED_VISUAL}
            alt="STT Governance 白金極簡古典幾何首頁，秩序，讓價值穿越時間。"
            width={7680}
            height={5120}
            decoding="async"
            fetchPriority="high"
          />
          <button className="stt-approved-hotspot stt-approved-menu-hit" type="button" aria-label="開啟選單" onClick={() => setMenuOpen(true)} />
          <button className="stt-approved-hotspot stt-approved-pillar-01" type="button" aria-label="開啟策略治理" onClick={() => openPillar("governance")} />
          <button className="stt-approved-hotspot stt-approved-pillar-02" type="button" aria-label="開啟內在法遵" onClick={() => openPillar("compliance")} />
          <button className="stt-approved-hotspot stt-approved-pillar-03" type="button" aria-label="開啟數位 AI 治理" onClick={() => openPillar("digital")} />
          <button className="stt-approved-hotspot stt-approved-pillar-04" type="button" aria-label="開啟出版與觀點" onClick={() => openPillar("insights")} />
          <button className="stt-approved-hotspot stt-approved-tool-ai" type="button" aria-label="開啟 AI 小幫手" onClick={openAi} />
          <button className="stt-approved-hotspot stt-approved-tool-language" type="button" aria-label="切換語言" onClick={() => setLanguageOpen((value) => !value)} />
          <button className="stt-approved-hotspot stt-approved-tool-voice" type="button" aria-label={voicePlaying ? "停止語音導讀" : "開始語音導讀"} onClick={toggleVoice} />
        </div>
      </section>

      {menuOpen && (
        <div className="stt-approved-menu-overlay" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setMenuOpen(false); }}>
          <nav className="stt-approved-menu-panel" aria-label="STT Governance 導覽">
            <p className="stt-approved-menu-label">Strategic Think Tank</p>
            <button className="stt-approved-menu-link" type="button" onClick={() => openPillar("governance")}><span>Governance 策略治理</span><span>→</span></button>
            <button className="stt-approved-menu-link" type="button" onClick={() => openPillar("compliance")}><span>Internal Compliance 內在法遵</span><span>→</span></button>
            <button className="stt-approved-menu-link" type="button" onClick={() => openPillar("digital")}><span>Digital Governance 數位（AI）治理</span><span>→</span></button>
            <button className="stt-approved-menu-link" type="button" onClick={() => openPillar("insights")}><span>Press & Insights 出版與觀點</span><span>→</span></button>
            <button className="stt-approved-menu-link" type="button" onClick={() => onNavigate("about")}><span>STT Governance</span><span>→</span></button>
            <div className="stt-approved-private-link">
              <button type="button" onClick={() => onNavigate("gcsda")} className="border-0 bg-transparent p-0 text-left cursor-pointer" style={{ color: "inherit" }}>
                中華企業策略永續發展學會（GCSDA）活動專區 →
              </button>
            </div>
          </nav>
        </div>
      )}

      {languageOpen && (
        <div className="stt-approved-language-panel" role="dialog" aria-label="語言切換">
          <button className="stt-approved-language-option" data-active={locale === "zh-TW"} type="button" onClick={() => changeLanguage("zh-TW")}>繁體中文</button>
          <button className="stt-approved-language-option" data-active={locale === "en"} type="button" onClick={() => changeLanguage("en")}>English</button>
          <button className="stt-approved-language-option" data-active={locale === "ja"} type="button" onClick={() => changeLanguage("ja")}>日本語</button>
        </div>
      )}

      {voiceStatus && <div className="stt-approved-voice-status" role="status">{voiceStatus}</div>}

      {activePillar && (
        <section ref={detailRef} className="stt-approved-detail" aria-label={pillars[activePillar].title}>
          <div className="stt-approved-detail-inner">
            <div>
              <p className="stt-approved-detail-eyebrow">{pillars[activePillar].eyebrow}</p>
              <h2 className="stt-approved-detail-title">{pillars[activePillar].title}</h2>
              <div className="stt-approved-detail-rule" />
              <p className="stt-approved-detail-summary">{pillars[activePillar].challengeTitle}</p>
            </div>
            <div className="stt-approved-detail-body">
              <article className="stt-approved-detail-card">
                <h3>{pillars[activePillar].capabilityTitle}</h3>
                <p>{pillars[activePillar].capability}</p>
              </article>
              <article className="stt-approved-detail-card">
                <h3>{pillars[activePillar].challengeTitle}</h3>
                <p>{pillars[activePillar].challenge}</p>
              </article>
              <div className="stt-approved-detail-actions">
                <button className="stt-approved-detail-button" type="button" onClick={pillars[activePillar].action}>{pillars[activePillar].actionLabel} →</button>
                <button className="stt-approved-detail-button" type="button" onClick={closeDetail}>返回首頁視覺</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
