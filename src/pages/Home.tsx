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

const HOME_MOTHER_VISUAL = "/images/homepage-design.png";

const pillarRoute: Record<PillarKey, string> = {
  governance: "corporate-governance",
  compliance: "internal-compliance",
  digital: "esgai",
  insights: "columns",
};

export default function Home({ onNavigate }: HomeProps) {
  const { locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  const openPillar = (pillar: PillarKey) => {
    setMenuOpen(false);
    onNavigate(pillarRoute[pillar]);
  };

  const openAi = () => window.dispatchEvent(new CustomEvent("stt:open-ai"));

  const changeLanguage = (nextLocale: SupportedLocale) => {
    setLocale(nextLocale);
    setLanguageOpen(false);
  };

  const releaseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    setVoicePlaying(false);
  };

  const toggleVoice = async () => {
    if (voicePlaying) {
      releaseAudio();
      setVoiceStatus("語音導讀已停止");
      window.setTimeout(() => setVoiceStatus(""), 1800);
      return;
    }

    const text = [
      "秩序，讓價值穿越時間。",
      "Governance 策略治理。",
      "Internal Compliance 內在法遵。",
      "Digital Governance 數位 AI 治理。",
      "Press and Insights 出版與觀點。",
    ].join("\n\n");

    setVoiceStatus("正在建立語音導讀");
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
      });
      if (!response.ok) throw new Error("TTS unavailable");

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const audio = new Audio(objectUrl);
      audioRef.current = audio;
      audioUrlRef.current = objectUrl;
      audio.onended = () => {
        releaseAudio();
        setVoiceStatus("");
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
    <div className="stt-home-step01">
      <style>{`
        .stt-home-step01 {
          min-height: 100vh;
          background: #fbfbfa;
          color: #1a1a1a;
        }
        .stt-home-stage {
          min-height: 100svh;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #fbfbfa;
        }
        .stt-home-frame {
          position: relative;
          width: min(100vw, 1600px);
          aspect-ratio: 1.5 / 1;
          overflow: hidden;
          background: #fbfbfa;
        }
        .stt-home-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          user-select: none;
          pointer-events: none;
        }
        .stt-home-hit {
          position: absolute;
          z-index: 5;
          border: 0;
          background: transparent;
          cursor: pointer;
          outline: none;
        }
        .stt-home-hit:focus-visible {
          box-shadow: inset 0 0 0 1px rgba(181,137,75,.60);
          background: rgba(197,168,128,.04);
        }
        .stt-home-menu-hit { top: .7%; right: 1.7%; width: 5.2%; height: 6.2%; }
        .stt-home-pillar-01 { left: 10.4%; top: 67.2%; width: 12.2%; height: 25.4%; }
        .stt-home-pillar-02 { left: 31.1%; top: 67.2%; width: 12.4%; height: 25.4%; }
        .stt-home-pillar-03 { left: 51.0%; top: 67.2%; width: 12.4%; height: 25.4%; }
        .stt-home-pillar-04 { left: 73.0%; top: 67.2%; width: 12.6%; height: 25.4%; }
        .stt-home-tool-ai { left: 81.5%; top: 92.4%; width: 4.8%; height: 6.2%; border-radius: 999px; }
        .stt-home-tool-language { left: 86.5%; top: 92.4%; width: 4.8%; height: 6.2%; border-radius: 999px; }
        .stt-home-tool-voice { left: 91.5%; top: 92.4%; width: 4.8%; height: 6.2%; border-radius: 999px; }
        .stt-home-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: flex;
          justify-content: flex-end;
          background: rgba(31,28,24,.10);
          backdrop-filter: blur(8px);
        }
        .stt-home-menu-panel {
          width: min(430px,92vw);
          min-height: 100svh;
          padding: 92px 38px 44px;
          background: rgba(251,251,250,.985);
          border-left: 1px solid rgba(197,168,128,.22);
          box-shadow: -24px 0 80px rgba(36,34,31,.08);
        }
        .stt-home-menu-brand {
          margin: 0 0 8px;
          color: #1a1a1a;
          font-family: "Noto Serif TC", Georgia, serif;
          font-size: 22px;
          letter-spacing: .04em;
        }
        .stt-home-menu-label {
          margin: 0 0 28px;
          color: #a9895e;
          font-size: 9px;
          letter-spacing: .22em;
          text-transform: uppercase;
        }
        .stt-home-menu-link {
          width: 100%;
          padding: 18px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 0;
          border-bottom: 1px solid rgba(197,168,128,.18);
          background: transparent;
          color: #1a1a1a;
          font-family: "Noto Serif TC", Georgia, serif;
          font-size: 18px;
          text-align: left;
          cursor: pointer;
        }
        .stt-home-menu-secondary {
          margin-top: 34px;
          padding-top: 20px;
          border-top: 1px solid rgba(197,168,128,.18);
          display: grid;
          gap: 14px;
        }
        .stt-home-menu-secondary button {
          border: 0;
          background: transparent;
          padding: 0;
          color: #776b5d;
          font-size: 12px;
          text-align: left;
          cursor: pointer;
        }
        .stt-home-language-panel,
        .stt-home-voice-status {
          position: fixed;
          right: 26px;
          bottom: 86px;
          z-index: 130;
          border: 1px solid rgba(197,168,128,.24);
          background: rgba(255,255,255,.97);
          box-shadow: 0 20px 60px rgba(36,34,31,.10);
        }
        .stt-home-language-panel { min-width: 190px; padding: 10px; }
        .stt-home-language-option {
          width: 100%;
          padding: 11px 12px;
          border: 0;
          background: transparent;
          color: #4b463f;
          font-size: 12px;
          text-align: left;
          cursor: pointer;
        }
        .stt-home-language-option[data-active="true"] {
          color: #a9895e;
          background: rgba(197,168,128,.09);
        }
        .stt-home-voice-status {
          max-width: 260px;
          padding: 10px 12px;
          color: #6e675e;
          font-size: 11px;
          line-height: 1.7;
        }
        @media (max-width: 640px) {
          .stt-home-stage { min-height: auto; }
          .stt-home-frame { width: 100vw; }
        }
      `}</style>

      <section className="stt-home-stage" aria-label="STT Governance 首頁">
        <div className="stt-home-frame">
          <img
            className="stt-home-image"
            src={HOME_MOTHER_VISUAL}
            alt="STT Governance 首頁母視覺"
            decoding="async"
            fetchPriority="high"
          />

          <button className="stt-home-hit stt-home-menu-hit" type="button" aria-label="開啟選單" onClick={() => setMenuOpen(true)} />
          <button className="stt-home-hit stt-home-pillar-01" type="button" aria-label="進入策略治理" onClick={() => openPillar("governance")} />
          <button className="stt-home-hit stt-home-pillar-02" type="button" aria-label="進入內在法遵" onClick={() => openPillar("compliance")} />
          <button className="stt-home-hit stt-home-pillar-03" type="button" aria-label="進入數位 AI 治理" onClick={() => openPillar("digital")} />
          <button className="stt-home-hit stt-home-pillar-04" type="button" aria-label="進入出版與觀點" onClick={() => openPillar("insights")} />
          <button className="stt-home-hit stt-home-tool-ai" type="button" aria-label="開啟 AI 小幫手" onClick={openAi} />
          <button className="stt-home-hit stt-home-tool-language" type="button" aria-label="切換語言" onClick={() => setLanguageOpen((value) => !value)} />
          <button className="stt-home-hit stt-home-tool-voice" type="button" aria-label={voicePlaying ? "停止語音導讀" : "開始語音導讀"} onClick={toggleVoice} />
        </div>
      </section>

      {menuOpen && (
        <div className="stt-home-menu-overlay" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setMenuOpen(false); }}>
          <nav className="stt-home-menu-panel" aria-label="STT Governance 導覽">
            <p className="stt-home-menu-brand">STT Governance</p>
            <p className="stt-home-menu-label">Strategic Think Tank Governance</p>
            <button className="stt-home-menu-link" type="button" onClick={() => openPillar("governance")}><span>Governance 策略治理</span><span>→</span></button>
            <button className="stt-home-menu-link" type="button" onClick={() => openPillar("compliance")}><span>Internal Compliance 內在法遵</span><span>→</span></button>
            <button className="stt-home-menu-link" type="button" onClick={() => openPillar("digital")}><span>Digital Governance 數位（AI）治理</span><span>→</span></button>
            <button className="stt-home-menu-link" type="button" onClick={() => openPillar("insights")}><span>Press &amp; Insights 出版與觀點</span><span>→</span></button>
            <div className="stt-home-menu-secondary">
              <button type="button" onClick={() => onNavigate("about")}>STT Governance 機構資訊 →</button>
              <button type="button" onClick={() => onNavigate("gcsda")}>GCSDA 活動專區 →</button>
            </div>
          </nav>
        </div>
      )}

      {languageOpen && (
        <div className="stt-home-language-panel" role="dialog" aria-label="語言切換">
          <button className="stt-home-language-option" data-active={locale === "zh-TW"} type="button" onClick={() => changeLanguage("zh-TW")}>繁體中文</button>
          <button className="stt-home-language-option" data-active={locale === "en"} type="button" onClick={() => changeLanguage("en")}>English</button>
          <button className="stt-home-language-option" data-active={locale === "ja"} type="button" onClick={() => changeLanguage("ja")}>日本語</button>
        </div>
      )}

      {voiceStatus && <div className="stt-home-voice-status" role="status">{voiceStatus}</div>}
    </div>
  );
}
