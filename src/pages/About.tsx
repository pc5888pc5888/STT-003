import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Crown, X, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
const EMAILJS_SERVICE_ID = "service_oewfa1e";
const EMAILJS_TEMPLATE_ID = "template_y0yk0gj";
const EMAILJS_PUBLIC_KEY = "x7FRu_LgWbUiDozNh";


interface ContactFormData {
  company_name: string;
  from_name: string;
  from_email: string;
  phone: string;
  line_id: string;
  appointment_time: string;
  message: string;
}

export function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ContactFormData>({
    company_name: "",
    from_name: "",
    from_email: "",
    phone: "",
    line_id: "",
    appointment_time: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.company_name || !form.from_name || !form.from_email || !form.phone) {
      alert("è«‹å¡«å¯«ä?æ¥­å?ç¨±ã€å??ã€Email ?Šé›»è©?);
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...form }, EMAILJS_PUBLIC_KEY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#e6c84c]/60 transition-all";
  const labelClass = "block text-zinc-400 font-mono tracking-widest uppercase mb-1" ;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <p className="text-[#e6c84c] font-mono tracking-widest uppercase font-bold" style={{ fontSize: "9px" }}>
              CONTACT STT ??INITIATE COREGULATION
            </p>
            <h3 className="text-white font-serif font-bold mt-0.5" style={{ fontSize: "18px" }}>
              ?¯çµ¡?ºåº«
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="text-[#e6c84c] text-4xl mb-3">??/div>
              <p className="text-white font-serif text-lg">è¨Šæ¯å·²æ??Ÿé€å‡º</p>
              <p className="text-zinc-400 mt-1" style={{ fontSize: "13px" }}>
                ?Šé?ç¿”å?å£«å??Šå??¡å¿«?‡æ‚¨?¯ç¹«??
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 border border-[#e6c84c]/40 text-[#e6c84c] rounded-lg hover:bg-[#e6c84c]/10 transition-all cursor-pointer bg-transparent outline-none"
                style={{ fontSize: "13px" }}
              >
                ?œé?
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>ä¼æ¥­?ç¨± *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="company_name" value={form.company_name} onChange={handleChange} placeholder="è²´å…¬?¸å?ç¨? />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>å§“å? *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_name" value={form.from_name} onChange={handleChange} placeholder="?¨ç?å§“å?" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Email *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_email" type="email" value={form.from_email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>?»è©± *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="phone" value={form.phone} onChange={handleChange} placeholder="0912-345-678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Line ID</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="line_id" value={form.line_id} onChange={handleChange} placeholder="?¨ç? Line ID" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>?ç??‚é?</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="appointment_time" value={form.appointment_time} onChange={handleChange} placeholder="ä¾‹ï?2026/07/01 ä¸‹å? 2 é»? />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontSize: "8px" }}>è¨Šæ¯?§å®¹</label>
                <textarea
                  className={inputClass}
                  style={{ fontSize: "13px", resize: "none" }}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="è«‹ç°¡è¿°æ‚¨?„é?æ±‚æ??é?..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-center" style={{ fontSize: "12px" }}>
                  ?å‡ºå¤±æ?ï¼Œè?ç¨å??è©¦?–ç›´?¥å?ä¿¡è‡³ pc5888@gmail.com
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#e6c84c] via-yellow-500 to-[#b89530] text-black font-bold rounded-xl py-3 hover:brightness-110 transition-all cursor-pointer border-0 outline-none disabled:opacity-60"
                style={{ fontSize: "14px" }}
              >
                {status === "sending" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />?å‡ºä¸?..</>
                ) : (
                  <><Send className="w-4 h-4" />?å‡º?³è?</>
                )}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const slides = [
    { id: "sovereignty", labelZh: "ä¸»æ—¨?²æ?", labelEn: "SOVEREIGNTY" },
    { id: "positions",   labelZh: "?¾ä»»?·å?", labelEn: "POSITIONS"   },
    { id: "scholarship", labelZh: "å­¸è??‡å¯¦??, labelEn: "SCHOLARSHIP" },
    { id: "credentials", labelZh: "å°ˆæ¥­èªè?",  labelEn: "CREDENTIALS" },
    { id: "services",    labelZh: "?å??…ç›®",  labelEn: "SERVICES"    },
    { id: "contact",     labelZh: "æ²»ç?å§”è?",  labelEn: "CONTACT"     },
  ];

  const selectSlide = (index: number) => setCurrentSlide(index);

  const Portrait = ({ src, alt }: { src: string; alt: string }) => (
    <div className=flex md:w-[40%] lg:w-[42%] flex-col items-end justify-end relative overflow-hidden flex-shrink-0 h-48 md:h-full" style={{ height: '100%' }}>
      <img src={src} alt={alt} className="w-auto object-contain object-bottom" style={{ height: '100%', maxHeight: '100%', filter: 'contrast(1.05)' }} referrerPolicy="no-referrer" />
      <div className="absolute bottom-5 right-5 z-20 pointer-events-none select-none">
        <img src="/images/signature-eric001.png" alt="Signature" className="h-auto opacity-95" style={{ width: 'clamp(120px, 11vw, 200px)', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.95))' }} referrerPolicy="no-referrer" />
      </div>
    </div>
  );

  const SectionLabel = ({ en, zh }: { en: string; zh: string }) => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-px bg-[#e6c84c] flex-shrink-0"></div>
      <span className="text-[#e6c84c] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ fontSize: 'clamp(9px, 0.7vw, 11px)' }}>{en} ï½?{zh}</span>
    </div>
  );

  const Card = ({ label, title, children }: { label: string; title: string; children: React.ReactNode }) => (
    <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] transition-all rounded-lg overflow-hidden">
      <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>{label}</span>
      <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>{title}</h3>
      <div style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>{children}</div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      </AnimatePresence>

      <div className="bg-[#050505] text-white selection:bg-gold-400/30 selection:text-white flex flex-col" id="about-viewport-container" style={{ height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
        {/* å·¦å´è£é£¾ */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-none">
          <div className="w-px h-12 bg-[#e6c84c]/15"></div>
          <span className="font-mono text-white/20 uppercase [writing-mode:vertical-lr]" style={{ fontSize: '8px', letterSpacing: '0.4em' }}>STT PRESS THINK TANK PLATFORM</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/25"></div>
        </div>

        {/* æ¡Œé¢æ¬¡å?è¦?*/}
        <div className="w-full bg-[#050505] border-b border-white/[0.02] flex-shrink-0 select-none hidden md:block" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center gap-1.5">
            {slides.map((slide, index) => (
              <button key={slide.id} type="button" onClick={() => selectSlide(index)}
                className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition-all cursor-pointer border-0 bg-transparent outline-none flex-1 max-w-[180px] ${currentSlide === index ? 'bg-white/[0.04] text-[#e6c84c]' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <span className={`font-sans font-bold tracking-wider ${currentSlide === index ? 'text-[#e6c84c]' : 'text-zinc-400'}`} style={{ fontSize: '11px' }}>{slide.labelZh}</span>
                <span className="font-mono tracking-widest mt-0.5 opacity-60" style={{ fontSize: '7.5px' }}>{slide.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ?‹æ?æ¬¡å?è¦?*/}
        <div className="w-full bg-[#050505] border-b border-white/[0.02] overflow-x-auto scrollbar-none flex md:hidden gap-2 px-4 py-2 flex-shrink-0">
          {slides.map((slide, index) => (
            <button key={slide.id} type="button" onClick={() => selectSlide(index)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer border-0 outline-none transition-all ${currentSlide === index ? 'bg-[#e6c84c] text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>
              {slide.labelZh}
            </button>
          ))}
        </div>

        {/* ä¸»å…§å®¹å? */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ height: '100%' }}>
              <div className="container mx-auto px-6 max-w-7xl font-sans" style={{ height: '100%' }}>

                {/* SLIDE 0 */}
                {currentSlide === 0 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="SOVEREIGNTY OF THOUGHT" zh="?æƒ³ä¸»æ?" />
                      <h1 className="font-serif text-[#e6c84c] tracking-wider leading-tight whitespace-nowrap flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.5vw, 38px)', margin: 'clamp(4px, 0.8vh, 12px) 0' }}>å¯¦è??¨ç??æƒ³ä¸»æ?</h1>
                      <div className="flex-shrink-0" style={{ marginBottom: 'clamp(6px, 1.2vh, 16px)' }}>
                        <p className="text-white font-light tracking-wider whitespace-nowrap" style={{ fontSize: 'clamp(10px, 0.9vw, 14px)' }}>ä¼æ¥­ç­–ç•¥?‡å…¬?¸æ²»?†æ??µé¡§??| å­¸è??”ç©¶?‡å¯¦??/p>
                        <p className="text-[#e6c84c] font-serif tracking-widest whitespace-nowrap" style={{ fontSize: 'clamp(12px, 1.3vw, 22px)', marginTop: '4px' }}>?Šé?ç¿”å?å£?CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(6px, 1.2vh, 14px)' }}>
                        <p className="font-sans text-[#EBE7DF]/90 tracking-wider italic" style={{ fontSize: 'clamp(10px, 0.95vw, 14px)', lineHeight: '1.7' }}>
                          ?‘å€‘ç?ä¸æ¨?·ä»»ä½•å??¹ç?å»ºè­°ï¼Œæ??‘å??ºç?æ­??è¦–åŸºæ¥­è?ç§©å??„é?è¢–ï?å»ºç??¡æ??¯æ??„æ??†é˜²?«ç???
                        </p>
                      </div>
                      <ul className="list-disc flex-shrink-0" style={{ paddingLeft: 'clamp(14px, 1.5vw, 22px)', marginBottom: 'clamp(6px, 1.5vh, 18px)', fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: '1.65' }}>
                        <li className="text-stone-300 font-light" style={{ marginBottom: 'clamp(4px, 0.6vh, 8px)' }}>?Šå?å£«ä»¥æ³•éµ?ºæ ¸å¿ƒæˆ°?¥è?è¨€ï¼Œå??©ä?æ¥­å»ºç«‹åˆ¶åº¦æ€§ç«¶?­å„ª?¢ï?è®“æ?å¾‹ä??æ˜¯?æœ¬ä¸­å?ï¼Œè€Œæ˜¯?ç?æº¢åƒ¹?„ä?æºã€?/li>
                        <li className="text-stone-300 font-light">?Šå?å£«æ·±ä¿¡ä?æ¥­ç??·æ??¹å€¼ï?å»ºç??¨è?ä¿¡è??¶åº¦?„ç??³ä?ä¸Šï??Œé??­æ??²åˆ©?„æ?æ²™ã€?/li>
                      </ul>
                      <p className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto border border-[#e6c84c]/60 rounded-lg px-3 py-2" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        ?ºä??„å…§å¿ƒï??“é€ ä?åº§ä??¯ä¾µ?¯ç??³è??€<span className="border-b border-[#e6c84c]/50 pb-0.5 ml-1">--- ?˜è‡ª?ŠInternal Compliance?‹è??ç??šå£«??/span>
                      </p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-15.png" alt="?Šé?ç¿”å?å£? />
                  </div>
                )}

                {/* SLIDE 1 */}
                {currentSlide === 1 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="AFFILIATIONS & ROLES" zh="?¾ä»»?·å?" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>?¾ä»»?·å?ä¸€è¦?/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>ä¼æ¥­ç­–ç•¥?‡å…¬?¸æ²»?†æ??µé¡§??| è·¨å??´å??‹é?å°äºº</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        <Card label="NGO CO-REGULATION" title="ä¸­è¯ä¼æ¥­ç­–ç•¥æ°¸ç??¼å?å­¸æ? GCSDA ?µæ??†ä???>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">ä¾æ?è¨­ç? NGO æ³•äººï¼Œä»¥?¶åº¦?§æ??¶æ¨?•ä?æ¥­æ°¸çºŒæ²»?†ã€æ¥?­å‚³?¿è?æ³•éµ?‡å???/p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>??å¹´åº¦?½çš®?¸è?æ²»ç?è«–å?ä¸»è¾¦æ©Ÿæ?</p>
                            <p>??å­?º¦?‰é??“æ?ï¼šä?æ¥­ä¸»?¥ç­?‡æ??µå?è©?/p>
                            <p>???™å¹´?¬é?è«–å?ï¼šå®¶?æ²»?†è?è³‡æœ¬?ˆç?</p>
                          </div>
                        </Card>
                        <Card label="DIGITAL PUBLICATION" title="ç­–ç•¥?ºåº«?¸ä??†å? STT Group ?µè¾¦äººæš¨?·è???>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">?´å?å­¸è??”ç©¶?ç??¥é¡§?è??¸ä??ºç?ï¼Œå»ºæ§‹ä?æ¥­æ²»?†çŸ¥è­˜ç??‹ã€?/p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>??STT Press ç­–ç•¥?ºåº«?ºç?ç¤?/p>
                            <p>??STT News ç­–ç•¥?ºåº«?°è?ç¶?/p>
                            <p>??STT Intelligence ç­–ç•¥?ºåº«?…å ±</p>
                            <p>??STT Legal Insights æ³•éµ?ºåº«</p>
                          </div>
                        </Card>
                        <Card label="MEDIA COLUMNIST" title="M?³å? æ³•éµ?ºåº«å°ˆæ?ï¼šæ?å¾‹è??¬å¸æ²»ç?ç­–ç•¥è§€é»?>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">å®šæ??¼è¡¨æ³•éµ?æ²»?†ã€å®¶?æ¥?­è?ä¼æ¥­ç­–ç•¥?„æ·±åº¦å??ï?æ·±åº¦ä¿¡ä»»?ªæ–¼å»???å???/p>
                        </Card>
                        <Card label="ACADEMIC APPOINTMENT" title="?¢ç”²å¤§å­¸?†å­¸?¢å…¼ä»»åŠ©?†æ???>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">?¢ç”²å¤§å­¸?†å­¸?¢å…¼ä»»åŠ©?†æ??ˆï??‹è¨­ä¼æ¥­æ²»ç??‡æ??µèª²ç¨‹ï?çµå? AI æ²»ç???ESG å¯¦å???/p>
                        </Card>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-17.png" alt="?Šé?ç¿”å?å£? />
                  </div>
                )}

                {/* SLIDE 2 */}
                {currentSlide === 2 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="ACADEMIC FOUNDATION" zh="å­¸è??‡å¯¦?? />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>å­¸è?å¥ åŸº?å¯¦?™æ·¬??/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>å­¸è??´è¬¹?§è??¢æ¥­å¯¦è?ä¸¦é?ï¼Œä??¥å?ç´”ç?è«–æ?ç´”ç?é©—ä¸»ç¾?/p>
                      <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <Card label="ACADEMIC FOUNDATION" title="å­¸æ­·?Œæ™¯">
                          <div className="mt-1.5 space-y-2 text-zinc-300">
                            <div><span className="font-semibold text-white">??ç®¡ç?å­¸å?å£?Ph.D. in Business Administration</span><p className="text-zinc-400 pl-2 mt-0.5">?¢ç”²å¤§å­¸ç®¡ç?å­¸é™¢ (2024)ï¼Œç?ç©¶é??Ÿï??¬å¸æ²»ç??‡æ??µç???/p></div>
                            <div><span className="font-semibold text-white">??å¶ºæ±ç§‘æ?å¤§å­¸ç®¡ç??”ç©¶?€ EMBA</span><p className="text-zinc-400 pl-2 mt-0.5">è·¨ä?ä»??æ¥­å®¶äººæ ¼?¹è³ª?å‰µ?°èƒ½?›è?ä¼æ¥­ç¶“ç?ç¸¾æ??”ç©¶</p></div>
                          </div>
                        </Card>
                        <Card label="EMPIRICAL RIGOR" title="ä»?¡¨?—ä?">
                          <div className="mt-2 space-y-1.5 text-zinc-300">
                            <p className="text-white font-semibold">?¸ã€Šå…§?¨æ???Internal Compliance?‹STT Press ?ºç?</p>
                            <p className="text-white font-semibold">?¸ã€?025 æ°¸ç?å®¶æ?æ²»ç?å¯¦å?å¯¦é??‹å¹´åº¦å ±??/p>
                            <p className="text-white font-semibold">?¸ã€Šè‡º???æ¥­æ¥?­äºº?„ä?å±€è¦å??‡å‚³?¿å®¶?åƒ¹?¼ã€‹æ??Šè???/p>
                          </div>
                        </Card>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        <p className="text-[#dbd7cf] font-light italic leading-relaxed">å­¸è??¯æ??‹é€åˆ¶åº¦æœ¬è³ªç??é¡ï¼Œå¯¦?™æ˜¯?‘é?è­‰ç?è«–ç?è©¦ç??´ã€‚å…©?…ç¼ºä¸€ï¼Œç?ä¸å??´ã€?- CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-14.png" alt="?Šé?ç¿”å?å£? />
                  </div>
                )}

                {/* SLIDE 3 */}
                {currentSlide === 3 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="REGULATORY ACCREDITATIONS" zh="å°ˆæ¥­èªè?" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.4vw, 36px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>AI æ²»ç?èªè???ESG æ°¸ç?è©•ä¼°å¸«è???/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>è·¨å?æ©Ÿæ?èªå¯?„å?æ¥­è???| æ²»ç?å¯¦å??‡æ??µæ•´??/p>
                      <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] rounded-lg overflow-hidden">
                          <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>ANTHROPIC</span>
                          <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>AI æ²»ç†èªè­‰</h3>
                          <div className="mt-1.5 space-y-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                            <p className="text-zinc-300">â–¸ HEA èªè­‰</p>
                            <p className="text-zinc-300">â–¸ UCC èªè­‰</p>
                            <p className="text-zinc-300">â–¸ AI Fluency ç³»åˆ—</p>
                            <p className="text-zinc-300">â–¸ Claude 101 / Code in Action</p>
                          </div>
                        </div>
                        <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] rounded-lg overflow-hidden">
                          <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>GOOGLE / AWS</span>
                          <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>AI å°ˆæ¥­èªè­‰</h3>
                          <div className="mt-1.5 space-y-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                            <p className="text-zinc-300">â–¸ Gemini AI èªè­‰</p>
                            <p className="text-zinc-300">â–¸ Amazon Bedrock èªè­‰</p>
                            <p className="text-zinc-300">â–¸ Agent é–‹ç™¼èªè­‰</p>
                          </div>
                        </div>
                        <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] rounded-lg overflow-hidden col-span-2">
                          <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>TÃœV RHEINLAND</span>
                          <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>åœ‹éš›æ¨™æº–æ©Ÿæ§‹æ°¸çºŒç™¼å±•èªè­‰</h3>
                          <div className="mt-1.5 grid grid-cols-3 gap-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                            <p className="text-zinc-300">â–¸ ç¢³è¶³è·¡æŸ¥é©—</p>
                            <p className="text-zinc-300">â–¸ æ°¸çºŒå ±å‘Šæ›¸æŸ¥é©—</p>
                            <p className="text-zinc-300">â–¸ CEO æ°¸çºŒé•·èªè­‰</p>
                            <p className="text-zinc-300">â–¸ ESG æ°¸çºŒè©•ä¼°å¸«</p>
                            <p className="text-zinc-300">â–¸ TÃœV èªå¯è¨“ç·´å¸«è³‡æ ¼</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#e6c84c] font-serif italic flex-shrink-0 mt-auto border border-[#e6c84c]/60 rounded-lg px-3 py-2" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>?¶åº¦?„åš´è¬¹åº¦ï¼Œå?ä¸å?è¨±è‡ªå·±å?è¦†çŠ¯?Œæ¨£?„éŒ¯èª¤é?å§‹ã€?-- ?ŠInternal Compliance??/p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-18.png" alt="?Šé?ç¿”å?å£? />
                  </div>
                )}

                {/* SLIDE 4 */}
                {currentSlide === 4 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="PROFESSIONAL DOMAIN AREAS" zh="?å??…ç›®" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>?›å¤§æ²»ç?è§?–¹</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>THE FOUR PILLARS OF GOVERNANCE & COMPLIANCE SOLUTIONS</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        {[
                          { title: 'ç­–ç•¥è¦å? STRATEGIC PLAN', roman: 'å¾æˆ°?¥é?åº¦é?æ§‹æ²»?†æ ¼å±€', points: ['ä¼æ¥­ç­–ç•¥æ³•å?é¢¨éšª?é˜²?‡åˆ¶åº¦å»ºç«?, 'å®¶æ?ä¼æ¥­?¥ç­æ¢¯é?è¨­è??‡å‚³?¿è???, 'ä¼æ¥­ç­–ç•¥å°å…¥æ²»ç?æ³•éµç²¾ç?'] },
                          { title: 'ç©©å¥?‹ç? STEADY RUNNING', roman: 'æ³•éµ?¯æ??…å¯¦?„è­·?æ²³', points: ['?§éƒ¨?§åˆ¶?¶åº¦å»ºç??‡æ??µå¥è¨?, 'ä¼æ¥­?§éƒ¨æ³•éµ?‡å??¹è??‡è½??, 'ä¼æ¥­?ˆè??¶æ?è¨­è??‡æ?ä»¶å?'] },
                          { title: '?¸å?æ²»ç? CORE GOVERNANCE', roman: '?¶åº¦?³æ‰¿ï¼ŒåŸºæ¥­é•·??, points: ['????ƒæ²»?†ç?æ§‹å„ª?–è??·è²¬?†å·¥', 'å®¶æ??²ç?è¨­è??‡è‚¡æ¬Šæ¶æ§‹è???, 'ä¼æ¥­æ°¸ç?æ²»ç?ç­–ç•¥??ESG ?´å?'] },
                          { title: 'è³‡ç”¢?³æ‰¿ ACCOMODATION', roman: 'ä»¥åˆ¶åº¦å?è­·å®¶?è²¡å¯?, points: ['é«˜è??¢å®¶?è·¨å¢ƒç??™è??ƒæ???, '2026 ç¢³è²»?ƒå¹´ä¸‹æ??µåˆ¶åº¦å???, 'ä¼æ¥­ä¸»å€‹äººè³‡ç”¢ä¿è­·?‡å‚³?¿è¨­è¨?] },
                        ].map((pillar, idx) => (
                          <div key={idx} className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] transition-all rounded-lg overflow-hidden">
                            <span className="text-[#e6c84c]/60 font-mono font-bold block" style={{ fontSize: '8px' }}>PILLAR 0{idx+1} ï½?{pillar.title}</span>
                            <h3 className="font-serif font-bold text-white mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>{pillar.roman}</h3>
                            <ul className="mt-1.5 border-t border-white/[0.02] pt-1.5 space-y-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                              {pillar.points.map((p, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-zinc-400 leading-relaxed">
                                  <span className="text-[#e6c84c] font-black shrink-0">??/span><span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-19.png" alt="?Šé?ç¿”å?å£? />
                  </div>
                )}

                {/* SLIDE 5 */}
                {currentSlide === 5 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="INITIATE COREGULATION" zh="æ²»ç?å§”è?" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(22px, 3vw, 46px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>å¯¦è??¨ç??æƒ³ä¸»æ?</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>GOVERNANCE DELEGATION & INTELLECTUAL ALLIANCE</p>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(11px, 1vw, 15px)' }}>
                        <p className="text-zinc-300 italic leading-relaxed">?‘å€‘ç?ä¸æ¨?·ä»»ä½•å??¹ç?å»ºè­°ï¼Œå??ºç?æ­??è¦–åŸºæ¥­è?ç§©å??„é?è¢–ï??ä??¶åº¦?§å?è­·ã€?/p>
                      </div>
                      <p className="text-zinc-400 font-light leading-relaxed flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        å¦‚æ??¨é?è¦ç‚ºä¼æ¥­????ƒæ³¨?¥å¯¦è³ªç?æ±ºç?æ¡†æ¶?å¦¥?„ä?è­·å€‹äºº?ºæ…§è²¡ç”¢?–ç?æ¥­ç?å¯†ï??–æ˜¯?²è?ç³»çµ±?–ç?å®¶æ??¥ç­äººè??¢è??ƒï?èª æ‘¯?€è«‹æ‚¨?‡è??ç??šå£«å°ˆå±¬?ºåº«è¾¦å…¬å®¤å??‹å?è©±ã€?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0" style={{ marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        <a href="https://lin.ee/yJrCTeo" target="_blank" rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-br from-[#e6c84c] via-yellow-500 to-[#b89530] text-black rounded-xl flex flex-col items-start gap-1 hover:brightness-110 transition-all no-underline"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-black" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>æ²»ç?å§”è? ENGAGEMENT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>??é»æ?ä¸€?µé???LINE ç§äººå§”è?è«®è©¢</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowContact(true)}
                          className="flex-1 border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 rounded-xl flex flex-col items-start gap-1 transition-all cursor-pointer bg-transparent outline-none"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#e6c84c]" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>?¯çµ¡?ºåº« CONNECT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>å¡«å¯«?¯çµ¡è¡¨å–®ï¼Œæ??‘å??¡å¿«?è???/span>
                        </button>
                      </div>
                      <button type="button" onClick={() => selectSlide(0)}
                        className="bg-transparent border border-white/5 hover:border-[#e6c84c]/30 p-2 rounded-full flex items-center text-white/30 hover:text-[#e6c84c] transition-all cursor-pointer outline-none self-start"
                        style={{ fontSize: '10px' }}>
                        <span className="px-2">???åˆ°ç¬¬ä???START OVER</span>
                      </button>
                    </div>
                    <Portrait src="/images/Eric-Chuang-20.png" alt="?Šé?ç¿”å?å£? />
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.02] bg-[#000] flex-shrink-0" style={{ padding: '10px 0' }}>
          <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left font-mono text-zinc-500" style={{ fontSize: '10px' }}>
            <p>Â© {new Date().getFullYear()} STT Press ç­–ç•¥?ºåº«?ºç?ç¤????Šé?ç¿”å?å£?(Founder: Eric Chuang, Ph.D.) ??ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4"><span>TRUST FOUNDATION</span><span>??/span><span>INSTITUTIONAL LOGIC</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}



