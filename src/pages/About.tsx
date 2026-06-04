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
      alert("Ë´ãÂ°´ÂØ´‰?Ê•≠Â?Á®±„ÄÅÂ??ç„ÄÅEmail ?äÈõªË©?);
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
              ?ØÁµ°?∫Â∫´
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
              <p className="text-white font-serif text-lg">Ë®äÊÅØÂ∑≤Ê??üÈÄÅÂá∫</p>
              <p className="text-zinc-400 mt-1" style={{ fontSize: "13px" }}>
                ?äÈ?ÁøîÂ?Â£´Â??äÂ??°Âø´?áÊÇ®?ØÁπ´??
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 border border-[#e6c84c]/40 text-[#e6c84c] rounded-lg hover:bg-[#e6c84c]/10 transition-all cursor-pointer bg-transparent outline-none"
                style={{ fontSize: "13px" }}
              >
                ?úÈ?
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>‰ºÅÊ•≠?çÁ®± *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="company_name" value={form.company_name} onChange={handleChange} placeholder="Ë≤¥ÂÖ¨?∏Â?Á®? />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>ÂßìÂ? *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_name" value={form.from_name} onChange={handleChange} placeholder="?®Á?ÂßìÂ?" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Email *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_email" type="email" value={form.from_email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>?ªË©± *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="phone" value={form.phone} onChange={handleChange} placeholder="0912-345-678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Line ID</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="line_id" value={form.line_id} onChange={handleChange} placeholder="?®Á? Line ID" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>?êÁ??ÇÈ?</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="appointment_time" value={form.appointment_time} onChange={handleChange} placeholder="‰æãÔ?2026/07/01 ‰∏ãÂ? 2 Èª? />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontSize: "8px" }}>Ë®äÊÅØ?ßÂÆπ</label>
                <textarea
                  className={inputClass}
                  style={{ fontSize: "13px", resize: "none" }}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ë´ãÁ∞°Ëø∞ÊÇ®?ÑÈ?Ê±ÇÊ??èÈ?..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-center" style={{ fontSize: "12px" }}>
                  ?ÅÂá∫Â§±Ê?ÔºåË?Á®çÂ??çË©¶?ñÁõ¥?•Â?‰ø°Ëá≥ pc5888@gmail.com
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
                  <><Loader2 className="w-4 h-4 animate-spin" />?ÅÂá∫‰∏?..</>
                ) : (
                  <><Send className="w-4 h-4" />?ÅÂá∫?≥Ë?</>
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
    { id: "sovereignty", labelZh: "‰∏ªÊó®?≤Ê?", labelEn: "SOVEREIGNTY" },
    { id: "positions",   labelZh: "?æ‰ªª?∑Â?", labelEn: "POSITIONS"   },
    { id: "scholarship", labelZh: "Â≠∏Ë??áÂØ¶??, labelEn: "SCHOLARSHIP" },
    { id: "credentials", labelZh: "Â∞àÊ•≠Ë™çË?",  labelEn: "CREDENTIALS" },
    { id: "services",    labelZh: "?çÂ??ÖÁõÆ",  labelEn: "SERVICES"    },
    { id: "contact",     labelZh: "Ê≤ªÁ?ÂßîË?",  labelEn: "CONTACT"     },
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
      <span className="text-[#e6c84c] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ fontSize: 'clamp(9px, 0.7vw, 11px)' }}>{en} ÔΩ?{zh}</span>
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
        {/* Â∑¶ÂÅ¥Ë£ùÈ£æ */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-none">
          <div className="w-px h-12 bg-[#e6c84c]/15"></div>
          <span className="font-mono text-white/20 uppercase [writing-mode:vertical-lr]" style={{ fontSize: '8px', letterSpacing: '0.4em' }}>STT PRESS THINK TANK PLATFORM</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/25"></div>
        </div>

        {/* Ê°åÈù¢Ê¨°Â?Ë¶?*/}
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

        {/* ?ãÊ?Ê¨°Â?Ë¶?*/}
        <div className="w-full bg-[#050505] border-b border-white/[0.02] overflow-x-auto scrollbar-none flex md:hidden gap-2 px-4 py-2 flex-shrink-0">
          {slides.map((slide, index) => (
            <button key={slide.id} type="button" onClick={() => selectSlide(index)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer border-0 outline-none transition-all ${currentSlide === index ? 'bg-[#e6c84c] text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>
              {slide.labelZh}
            </button>
          ))}
        </div>

        {/* ‰∏ªÂÖßÂÆπÂ? */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ height: '100%' }}>
              <div className="container mx-auto px-6 max-w-7xl font-sans" style={{ height: '100%' }}>

                {/* SLIDE 0 */}
                {currentSlide === 0 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="SOVEREIGNTY OF THOUGHT" zh="?ùÊÉ≥‰∏ªÊ?" />
                      <h1 className="font-serif text-[#e6c84c] tracking-wider leading-tight whitespace-nowrap flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.5vw, 38px)', margin: 'clamp(4px, 0.8vh, 12px) 0' }}>ÂØ¶Ë??®Á??ùÊÉ≥‰∏ªÊ?</h1>
                      <div className="flex-shrink-0" style={{ marginBottom: 'clamp(6px, 1.2vh, 16px)' }}>
                        <p className="text-white font-light tracking-wider whitespace-nowrap" style={{ fontSize: 'clamp(10px, 0.9vw, 14px)' }}>‰ºÅÊ•≠Á≠ñÁï•?áÂÖ¨?∏Ê≤ª?ÜÊ??µÈ°ß??| Â≠∏Ë??îÁ©∂?áÂØ¶??/p>
                        <p className="text-[#e6c84c] font-serif tracking-widest whitespace-nowrap" style={{ fontSize: 'clamp(12px, 1.3vw, 22px)', marginTop: '4px' }}>?äÈ?ÁøîÂ?Â£?CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(6px, 1.2vh, 14px)' }}>
                        <p className="font-sans text-[#EBE7DF]/90 tracking-wider italic" style={{ fontSize: 'clamp(10px, 0.95vw, 14px)', lineHeight: '1.7' }}>
                          ?ëÂÄëÁ?‰∏çÊé®?∑‰ªª‰ΩïÂ??πÁ?Âª∫Ë≠∞ÔºåÊ??ëÂ??∫Á?Ê≠??Ë¶ñÂü∫Ê•≠Ë?Áß©Â??ÑÈ?Ë¢ñÔ?Âª∫Á??°Ê??ØÊ??ÑÊ??ÜÈò≤?´Á???
                        </p>
                      </div>
                      <ul className="list-disc flex-shrink-0" style={{ paddingLeft: 'clamp(14px, 1.5vw, 22px)', marginBottom: 'clamp(6px, 1.5vh, 18px)', fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: '1.65' }}>
                        <li className="text-stone-300 font-light" style={{ marginBottom: 'clamp(4px, 0.6vh, 8px)' }}>?äÂ?Â£´‰ª•Ê≥ïÈÅµ?∫Ê†∏ÂøÉÊà∞?•Ë?Ë®ÄÔºåÂ??©‰?Ê•≠Âª∫Á´ãÂà∂Â∫¶ÊÄßÁ´∂?≠ÂÑ™?¢Ô?ËÆìÊ?Âæã‰??çÊòØ?êÊú¨‰∏≠Â?ÔºåËÄåÊòØ?ÅÁ?Ê∫¢ÂÉπ?Ñ‰?Ê∫ê„Ä?/li>
                        <li className="text-stone-300 font-light">?äÂ?Â£´Ê∑±‰ø°‰?Ê•≠Á??∑Ê??πÂÄºÔ?Âª∫Á??®Ë?‰ø°Ë??∂Â∫¶?ÑÁ??≥‰?‰∏äÔ??åÈ??≠Ê??≤Âà©?ÑÊ?Ê≤ô„Ä?/li>
                      </ul>
                      <p className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto border border-[#e6c84c]/60 rounded-lg px-3 py-2" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        ?∫‰??ÑÂÖßÂøÉÔ??ìÈÄ†‰?Â∫ß‰??Ø‰æµ?ØÁ??≥Ë??Ä<span className="border-b border-[#e6c84c]/50 pb-0.5 ml-1">--- ?òËá™?äInternal Compliance?ãË??ûÁ??öÂ£´??/span>
                      </p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-15.png" alt="?äÈ?ÁøîÂ?Â£? />
                  </div>
                )}

                {/* SLIDE 1 */}
                {currentSlide === 1 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="AFFILIATIONS & ROLES" zh="?æ‰ªª?∑Â?" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>?æ‰ªª?∑Â?‰∏ÄË¶?/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>‰ºÅÊ•≠Á≠ñÁï•?áÂÖ¨?∏Ê≤ª?ÜÊ??µÈ°ß??| Ë∑®Â??¥Â??ãÈ?Â∞é‰∫∫</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        <Card label="NGO CO-REGULATION" title="‰∏≠ËèØ‰ºÅÊ•≠Á≠ñÁï•Ê∞∏Á??ºÂ?Â≠∏Ê? GCSDA ?µÊ??Ü‰???>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">‰æùÊ?Ë®≠Á? NGO Ê≥ï‰∫∫Ôºå‰ª•?∂Â∫¶?ßÊ??∂Êé®?ï‰?Ê•≠Ê∞∏Á∫åÊ≤ª?Ü„ÄÅÊé•?≠ÂÇ≥?øË?Ê≥ïÈÅµ?áÂ???/p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>??Âπ¥Â∫¶?ΩÁöÆ?∏Ë?Ê≤ªÁ?Ë´ñÂ?‰∏ªËæ¶Ê©üÊ?</p>
                            <p>??Â≠?∫¶?âÈ??ìÊ?Ôºö‰?Ê•≠‰∏ª?•Áè≠?áÊ??µÂ?Ë©?/p>
                            <p>???ôÂπ¥?¨È?Ë´ñÂ?ÔºöÂÆ∂?èÊ≤ª?ÜË?Ë≥áÊú¨?àÁ?</p>
                          </div>
                        </Card>
                        <Card label="DIGITAL PUBLICATION" title="Á≠ñÁï•?∫Â∫´?∏‰??ÜÂ? STT Group ?µËæ¶‰∫∫Êö®?∑Ë???>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">?¥Â?Â≠∏Ë??îÁ©∂?ÅÁ??•È°ß?èË??∏‰??∫Á?ÔºåÂª∫Êßã‰?Ê•≠Ê≤ª?ÜÁü•Ë≠òÁ??ã„Ä?/p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>??STT Press Á≠ñÁï•?∫Â∫´?∫Á?Á§?/p>
                            <p>??STT News Á≠ñÁï•?∫Â∫´?∞Ë?Á∂?/p>
                            <p>??STT Intelligence Á≠ñÁï•?∫Â∫´?ÖÂ†±</p>
                            <p>??STT Legal Insights Ê≥ïÈÅµ?∫Â∫´</p>
                          </div>
                        </Card>
                        <Card label="MEDIA COLUMNIST" title="M?≥Â? Ê≥ïÈÅµ?∫Â∫´Â∞àÊ?ÔºöÊ?ÂæãË??¨Âè∏Ê≤ªÁ?Á≠ñÁï•ËßÄÈª?>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">ÂÆöÊ??ºË°®Ê≥ïÈÅµ?ÅÊ≤ª?Ü„ÄÅÂÆ∂?èÊé•?≠Ë?‰ºÅÊ•≠Á≠ñÁï•?ÑÊ∑±Â∫¶Â??êÔ?Ê∑±Â∫¶‰ø°‰ªª?™ÊñºÂª???ùÂ???/p>
                        </Card>
                        <Card label="ACADEMIC APPOINTMENT" title="?¢Áî≤Â§ßÂ≠∏?ÜÂ≠∏?¢ÂÖº‰ªªÂä©?ÜÊ???>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">?¢Áî≤Â§ßÂ≠∏?ÜÂ≠∏?¢ÂÖº‰ªªÂä©?ÜÊ??àÔ??ãË®≠‰ºÅÊ•≠Ê≤ªÁ??áÊ??µË™≤Á®ãÔ?ÁµêÂ? AI Ê≤ªÁ???ESG ÂØ¶Â???/p>
                        </Card>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-17.png" alt="?äÈ?ÁøîÂ?Â£? />
                  </div>
                )}

                {/* SLIDE 2 */}
                {currentSlide === 2 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="ACADEMIC FOUNDATION" zh="Â≠∏Ë??áÂØ¶?? />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>Â≠∏Ë?Â•†Âü∫?ÅÂØ¶?ôÊ∑¨??/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>Â≠∏Ë??¥Ë¨π?ßË??¢Ê•≠ÂØ¶Ë?‰∏¶È?Ôºå‰??•Â?Á¥îÁ?Ë´ñÊ?Á¥îÁ?È©ó‰∏ªÁæ?/p>
                      <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <Card label="ACADEMIC FOUNDATION" title="Â≠∏Ê≠∑?åÊôØ">
                          <div className="mt-1.5 space-y-2 text-zinc-300">
                            <div><span className="font-semibold text-white">??ÁÆ°Á?Â≠∏Â?Â£?Ph.D. in Business Administration</span><p className="text-zinc-400 pl-2 mt-0.5">?¢Áî≤Â§ßÂ≠∏ÁÆ°Á?Â≠∏Èô¢ (2024)ÔºåÁ?Á©∂È??üÔ??¨Âè∏Ê≤ªÁ??áÊ??µÁ???/p></div>
                            <div><span className="font-semibold text-white">??Â∂∫Êù±ÁßëÊ?Â§ßÂ≠∏ÁÆ°Á??îÁ©∂?Ä EMBA</span><p className="text-zinc-400 pl-2 mt-0.5">Ë∑®‰?‰ª??Ê•≠ÂÆ∂‰∫∫Ê†º?πË≥™?ÅÂâµ?∞ËÉΩ?õË?‰ºÅÊ•≠Á∂ìÁ?Á∏æÊ??îÁ©∂</p></div>
                          </div>
                        </Card>
                        <Card label="EMPIRICAL RIGOR" title="‰ª?°®?ó‰?">
                          <div className="mt-2 space-y-1.5 text-zinc-300">
                            <p className="text-white font-semibold">?∏„ÄäÂÖß?®Ê???Internal Compliance?ãSTT Press ?∫Á?</p>
                            <p className="text-white font-semibold">?∏„Ä?025 Ê∞∏Á?ÂÆ∂Ê?Ê≤ªÁ?ÂØ¶Â?ÂØ¶È??ãÂπ¥Â∫¶Â†±??/p>
                            <p className="text-white font-semibold">?∏„ÄäËá∫???Ê•≠Êé•?≠‰∫∫?Ñ‰?Â±ÄË¶èÂ??áÂÇ≥?øÂÆ∂?èÂÉπ?º„ÄãÊ??äË???/p>
                          </div>
                        </Card>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        <p className="text-[#dbd7cf] font-light italic leading-relaxed">Â≠∏Ë??ØÊ??ãÈÄèÂà∂Â∫¶Êú¨Ë≥™Á??èÈè°ÔºåÂØ¶?ôÊòØ?ëÈ?Ë≠âÁ?Ë´ñÁ?Ë©¶Á??¥„ÄÇÂÖ©?ÖÁº∫‰∏ÄÔºåÁ?‰∏çÂ??¥„Ä?- CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-14.png" alt="?äÈ?ÁøîÂ?Â£? />
                  </div>
                )}

                {/* SLIDE 3 */}
                {currentSlide === 3 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="REGULATORY ACCREDITATIONS" zh="Â∞àÊ•≠Ë™çË?" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.4vw, 36px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>AI Ê≤ªÁ?Ë™çË???ESG Ê∞∏Á?Ë©ï‰º∞Â∏´Ë???/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>Ë∑®Â?Ê©üÊ?Ë™çÂèØ?ÑÂ?Ê•≠Ë???| Ê≤ªÁ?ÂØ¶Â??áÊ??µÊï¥??/p>
                      <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] rounded-lg overflow-hidden">
                          <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>ANTHROPIC</span>
                          <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>AI Ê≤ªÁ?Ë™çË?</h3>
                          <div className="mt-1.5 space-y-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                            <p className="text-zinc-300">??HEA Ë™çË?</p>
                            <p className="text-zinc-300">??UCC Ë™çË?</p>
                            <p className="text-zinc-300">??AI Fluency Á≥ªÂ?</p>
                            <p className="text-zinc-300">??Claude 101 / Code in Action</p>
                          </div>
                        </div>
                        <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] rounded-lg overflow-hidden">
                          <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>GOOGLE</span>
                          <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>AI Â∞àÊ•≠Ë™çË?</h3>
                          <div className="mt-1.5 space-y-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                            <p className="text-zinc-300">??Amazon Bedrock Ë™çË?</p>
                            <p className="text-zinc-300">??Gemini AI Ë™çË?</p>
                            <p className="text-zinc-300">??Agent ?ãÁôºË™çË?</p>
                          </div>
                        </div>
                        <div className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] rounded-lg overflow-hidden col-span-2">
                          <span className="text-[#e6c84c]/80 font-mono tracking-widest block uppercase font-bold" style={{ fontSize: '9px' }}>T?V RHEINLAND</span>
                          <h3 className="font-serif font-black text-[#e6c84c] mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>?ãÈ?Ê®ôÊ?Ê©üÊ?Ê∞∏Á??ºÂ?Ë™çË?</h3>
                          <div className="mt-1.5 grid grid-cols-2 gap-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                            <p className="text-zinc-300">??Á¢≥Ë∂≥Ë∑°Êü•È©?/p>
                            <p className="text-zinc-300">??Ê∞∏Á??±Â??∏Êü•È©?/p>
                            <p className="text-zinc-300">??CEO Ê∞∏Á??∑Ë?Ë≠?/p>
                            <p className="text-zinc-300">??ESG Ê∞∏Á?Ë©ï‰º∞Â∏?/p>
                            <p className="text-zinc-300">??T?V Ë™çÂèØË®ìÁ∑¥Â∏´Ë???/p>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#e6c84c] font-serif italic flex-shrink-0 mt-auto border border-[#e6c84c]/60 rounded-lg px-3 py-2" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>?∂Â∫¶?ÑÂö¥Ë¨πÂ∫¶ÔºåÂ?‰∏çÂ?Ë®±Ëá™Â∑±Â?Ë¶ÜÁäØ?åÊ®£?ÑÈåØË™§È?Âßã„Ä?-- ?äInternal Compliance??/p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-18.png" alt="?äÈ?ÁøîÂ?Â£? />
                  </div>
                )}

                {/* SLIDE 4 */}
                {currentSlide === 4 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="PROFESSIONAL DOMAIN AREAS" zh="?çÂ??ÖÁõÆ" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>?õÂ§ßÊ≤ªÁ?Ëß?ñπ</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>THE FOUR PILLARS OF GOVERNANCE & COMPLIANCE SOLUTIONS</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        {[
                          { title: 'Á≠ñÁï•Ë¶èÂ? STRATEGIC PLAN', roman: 'ÂæûÊà∞?•È?Â∫¶È?ÊßãÊ≤ª?ÜÊ†ºÂ±Ä', points: ['‰ºÅÊ•≠Á≠ñÁï•Ê≥ïÂ?È¢®Èö™?êÈò≤?áÂà∂Â∫¶Âª∫Á´?, 'ÂÆ∂Ê?‰ºÅÊ•≠?•Áè≠Ê¢ØÈ?Ë®≠Ë??áÂÇ≥?øË???, '‰ºÅÊ•≠Á≠ñÁï•Â∞éÂÖ•Ê≤ªÁ?Ê≥ïÈÅµÁ≤æÁ?'] },
                          { title: 'Á©©ÂÅ•?ãÁ? STEADY RUNNING', roman: 'Ê≥ïÈÅµ?ØÊ??ÖÂØ¶?ÑË≠∑?éÊ≤≥', points: ['?ßÈÉ®?ßÂà∂?∂Â∫¶Âª∫Á??áÊ??µÂÅ•Ë®?, '‰ºÅÊ•≠?ßÈÉ®Ê≥ïÈÅµ?áÂ??πË??áËêΩ??, '‰ºÅÊ•≠?àË??∂Ê?Ë®≠Ë??áÊ?‰ª∂Â?'] },
                          { title: '?∏Â?Ê≤ªÁ? CORE GOVERNANCE', roman: '?∂Â∫¶?≥ÊâøÔºåÂü∫Ê•≠Èï∑??, points: ['????ÉÊ≤ª?ÜÁ?ÊßãÂÑ™?ñË??∑Ë≤¨?ÜÂ∑•', 'ÂÆ∂Ê??≤Á?Ë®≠Ë??áËÇ°Ê¨äÊû∂ÊßãË???, '‰ºÅÊ•≠Ê∞∏Á?Ê≤ªÁ?Á≠ñÁï•??ESG ?¥Â?'] },
                          { title: 'Ë≥áÁî¢?≥Êâø ACCOMODATION', roman: '‰ª•Âà∂Â∫¶Â?Ë≠∑ÂÆ∂?èË≤°ÂØ?, points: ['È´òË??¢ÂÆ∂?èË∑®Â¢ÉÁ??ôË??ÉÊ???, '2026 Á¢≥Ë≤ª?ÉÂπ¥‰∏ãÊ??µÂà∂Â∫¶Â???, '‰ºÅÊ•≠‰∏ªÂÄã‰∫∫Ë≥áÁî¢‰øùË≠∑?áÂÇ≥?øË®≠Ë®?] },
                        ].map((pillar, idx) => (
                          <div key={idx} className="p-3 bg-zinc-950/80 border-l-4 border-l-[#e6c84c]/70 border-t border-t-white/[0.03] border-r border-r-white/[0.03] border-b border-b-white/[0.03] transition-all rounded-lg overflow-hidden">
                            <span className="text-[#e6c84c]/60 font-mono font-bold block" style={{ fontSize: '8px' }}>PILLAR 0{idx+1} ÔΩ?{pillar.title}</span>
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
                    <Portrait src="/images/Eric-Chuang-19.png" alt="?äÈ?ÁøîÂ?Â£? />
                  </div>
                )}

                {/* SLIDE 5 */}
                {currentSlide === 5 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="INITIATE COREGULATION" zh="Ê≤ªÁ?ÂßîË?" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(22px, 3vw, 46px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>ÂØ¶Ë??®Á??ùÊÉ≥‰∏ªÊ?</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>GOVERNANCE DELEGATION & INTELLECTUAL ALLIANCE</p>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(11px, 1vw, 15px)' }}>
                        <p className="text-zinc-300 italic leading-relaxed">?ëÂÄëÁ?‰∏çÊé®?∑‰ªª‰ΩïÂ??πÁ?Âª∫Ë≠∞ÔºåÂ??∫Á?Ê≠??Ë¶ñÂü∫Ê•≠Ë?Áß©Â??ÑÈ?Ë¢ñÔ??ê‰??∂Â∫¶?ßÂ?Ë≠∑„Ä?/p>
                      </div>
                      <p className="text-zinc-400 font-light leading-relaxed flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        Â¶ÇÊ??®È?Ë¶ÅÁÇ∫‰ºÅÊ•≠????ÉÊ≥®?•ÂØ¶Ë≥™Á?Ê±∫Á?Ê°ÜÊû∂?ÅÂ¶•?Ñ‰?Ë≠∑ÂÄã‰∫∫?∫ÊÖßË≤°Áî¢?ñÁ?Ê•≠Á?ÂØÜÔ??ñÊòØ?≤Ë?Á≥ªÁµ±?ñÁ?ÂÆ∂Ê??•Áè≠‰∫∫Ë??¢Ë??ÉÔ?Ë™†ÊëØ?ÄË´ãÊÇ®?áË??ûÁ??öÂ£´Â∞àÂ±¨?∫Â∫´Ëæ¶ÂÖ¨ÂÆ§Â??ãÂ?Ë©±„Ä?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0" style={{ marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        <a href="https://lin.ee/yJrCTeo" target="_blank" rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-br from-[#e6c84c] via-yellow-500 to-[#b89530] text-black rounded-xl flex flex-col items-start gap-1 hover:brightness-110 transition-all no-underline"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-black" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>Ê≤ªÁ?ÂßîË? ENGAGEMENT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>??ÈªûÊ?‰∏Ä?µÈ???LINE ÁßÅ‰∫∫ÂßîË?Ë´ÆË©¢</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowContact(true)}
                          className="flex-1 border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 rounded-xl flex flex-col items-start gap-1 transition-all cursor-pointer bg-transparent outline-none"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#e6c84c]" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>?ØÁµ°?∫Â∫´ CONNECT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>Â°´ÂØ´?ØÁµ°Ë°®ÂñÆÔºåÊ??ëÂ??°Âø´?ûË???/span>
                        </button>
                      </div>
                      <button type="button" onClick={() => selectSlide(0)}
                        className="bg-transparent border border-white/5 hover:border-[#e6c84c]/30 p-2 rounded-full flex items-center text-white/30 hover:text-[#e6c84c] transition-all cursor-pointer outline-none self-start"
                        style={{ fontSize: '10px' }}>
                        <span className="px-2">???ûÂà∞Á¨¨‰???START OVER</span>
                      </button>
                    </div>
                    <Portrait src="/images/Eric-Chuang-20.png" alt="?äÈ?ÁøîÂ?Â£? />
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.02] bg-[#000] flex-shrink-0" style={{ padding: '10px 0' }}>
          <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left font-mono text-zinc-500" style={{ fontSize: '10px' }}>
            <p>¬© {new Date().getFullYear()} STT Press Á≠ñÁï•?∫Â∫´?∫Á?Á§????äÈ?ÁøîÂ?Â£?(Founder: Eric Chuang, Ph.D.) ??ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4"><span>TRUST FOUNDATION</span><span>??/span><span>INSTITUTIONAL LOGIC</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}




