import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Crown, X, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_oewfa1e";
const EMAILJS_TEMPLATE_ID = "template_faf5tjh";
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

function ContactModal({ onClose }: { onClose: () => void }) {
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
      alert("隢‵撖思?璆剖?蝔晞??mail ?閰?);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
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
              ?舐窗?箏澈
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
              <p className="text-white font-serif text-lg">閮撌脫??</p>
              <p className="text-zinc-400 mt-1" style={{ fontSize: "13px" }}>
                ??蝧?憯怠????∪翰??舐鼠??              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 border border-[#e6c84c]/40 text-[#e6c84c] rounded-lg hover:bg-[#e6c84c]/10 transition-all cursor-pointer bg-transparent outline-none"
                style={{ fontSize: "13px" }}
              >
                ??
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>隡平?迂 *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="company_name" value={form.company_name} onChange={handleChange} placeholder="鞎游?詨?蝔? />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>憪? *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_name" value={form.from_name} onChange={handleChange} placeholder="?函?憪?" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Email *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_email" type="email" value={form.from_email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>?餉店 *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="phone" value={form.phone} onChange={handleChange} placeholder="0912-345-678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Line ID</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="line_id" value={form.line_id} onChange={handleChange} placeholder="?函? Line ID" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>????</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="appointment_time" value={form.appointment_time} onChange={handleChange} placeholder="靘?2026/07/01 銝? 2 暺? />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontSize: "8px" }}>閮?批捆</label>
                <textarea
                  className={inputClass}
                  style={{ fontSize: "13px", resize: "none" }}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="隢陛餈唳??瘙???..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-center" style={{ fontSize: "12px" }}>
                  ?憭望?嚗?蝔??岫??亙?靽∟ pc5888@gmail.com
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
                  <><Loader2 className="w-4 h-4 animate-spin" />?銝?..</>
                ) : (
                  <><Send className="w-4 h-4" />??唾?</>
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
    { id: "sovereignty", labelZh: "銝餅?脫?", labelEn: "SOVEREIGNTY" },
    { id: "positions",   labelZh: "?曆遙?瑕?", labelEn: "POSITIONS"   },
    { id: "scholarship", labelZh: "摮貉??祕??, labelEn: "SCHOLARSHIP" },
    { id: "credentials", labelZh: "撠平隤?",  labelEn: "CREDENTIALS" },
    { id: "services",    labelZh: "???",  labelEn: "SERVICES"    },
    { id: "contact",     labelZh: "瘝餌?憪?",  labelEn: "CONTACT"     },
  ];

  const selectSlide = (index: number) => setCurrentSlide(index);

  const Portrait = ({ src, alt }: { src: string; alt: string }) => (
    <div className="hidden lg:flex lg:w-[42%] flex-col items-end justify-end relative overflow-hidden flex-shrink-0" style={{ height: '100%' }}>
      <img src={src} alt={alt} className="w-auto object-contain object-bottom" style={{ height: '100%', maxHeight: '100%', filter: 'contrast(1.05)' }} referrerPolicy="no-referrer" />
      <div className="absolute bottom-5 right-5 z-20 pointer-events-none select-none">
        <img src="/images/signature-eric001.png" alt="Signature" className="h-auto opacity-95" style={{ width: 'clamp(120px, 11vw, 200px)', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.95))' }} referrerPolicy="no-referrer" />
      </div>
    </div>
  );

  const SectionLabel = ({ en, zh }: { en: string; zh: string }) => (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-px bg-[#e6c84c] flex-shrink-0"></div>
      <span className="text-[#e6c84c] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ fontSize: 'clamp(9px, 0.7vw, 11px)' }}>{en} 嚚?{zh}</span>
    </div>
  );

  const Card = ({ label, title, children }: { label: string; title: string; children: React.ReactNode }) => (
    <div className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c84c]/60"></div>
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
        {/* 撌血鋆ˇ */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-none">
          <div className="w-px h-12 bg-[#e6c84c]/15"></div>
          <span className="font-mono text-white/20 uppercase [writing-mode:vertical-lr]" style={{ fontSize: '8px', letterSpacing: '0.4em' }}>STT PRESS THINK TANK PLATFORM</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/25"></div>
        </div>

        {/* 獢甈∪?閬?*/}
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

        {/* ??甈∪?閬?*/}
        <div className="w-full bg-[#050505] border-b border-white/[0.02] overflow-x-auto scrollbar-none flex md:hidden gap-2 px-4 py-2 flex-shrink-0">
          {slides.map((slide, index) => (
            <button key={slide.id} type="button" onClick={() => selectSlide(index)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer border-0 outline-none transition-all ${currentSlide === index ? 'bg-[#e6c84c] text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>
              {slide.labelZh}
            </button>
          ))}
        </div>

        {/* 銝餃摰孵? */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ height: '100%' }}>
              <div className="container mx-auto px-6 max-w-7xl font-sans" style={{ height: '100%' }}>

                {/* SLIDE 0 */}
                {currentSlide === 0 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="SOVEREIGNTY OF THOUGHT" zh="?銝餅?" />
                      <h1 className="font-serif text-[#e6c84c] tracking-wider leading-tight whitespace-nowrap flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.5vw, 38px)', margin: 'clamp(4px, 0.8vh, 12px) 0' }}>撖西??函??銝餅?</h1>
                      <div className="flex-shrink-0" style={{ marginBottom: 'clamp(6px, 1.2vh, 16px)' }}>
                        <p className="text-white font-light tracking-wider whitespace-nowrap" style={{ fontSize: 'clamp(10px, 0.9vw, 14px)' }}>隡平蝑??豢祥???菟“??| 摮貉??弦?祕??/p>
                        <p className="text-[#e6c84c] font-serif tracking-widest whitespace-nowrap" style={{ fontSize: 'clamp(12px, 1.3vw, 22px)', marginTop: '4px' }}>??蝧?憯?CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(6px, 1.2vh, 14px)' }}>
                        <p className="font-sans text-[#EBE7DF]/90 tracking-wider italic" style={{ fontSize: 'clamp(10px, 0.95vw, 14px)', lineHeight: '1.7' }}>
                          ??銝?瑚遙雿??寧?撱箄降嚗????箇?甇??閬璆剛?蝘拙???鋡?撱箇??⊥??舀?????怎???                        </p>
                      </div>
                      <ul className="list-disc flex-shrink-0" style={{ paddingLeft: 'clamp(14px, 1.5vw, 22px)', marginBottom: 'clamp(6px, 1.5vh, 18px)', fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: '1.65' }}>
                        <li className="text-stone-300 font-light" style={{ marginBottom: 'clamp(4px, 0.6vh, 8px)' }}>??憯思誑瘜?箸敹?亥?閮嚗??拐?璆剖遣蝡摨行抒奎?剖?ｇ?霈?敺???銝剖?嚗??皞Ｗ??皞?/li>
                        <li className="text-stone-300 font-light">??憯急楛靽∩?璆剔??瑟??孵潘?撱箇??刻?靽∟??嗅漲???喃?銝????剜??脣??瘝?/li>
                      </ul>
                      <p className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        ?箔??敹???摨找??臭噩?舐??唾??<span className="border-b border-[#e6c84c]/50 pb-0.5 ml-1">--- ??nternal Compliance?????ㄚ??/span>
                      </p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-15.png" alt="??蝧?憯? />
                  </div>
                )}

                {/* SLIDE 1 */}
                {currentSlide === 1 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="AFFILIATIONS & ROLES" zh="?曆遙?瑕?" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>?曆遙?瑕?銝閬?/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>隡平蝑??豢祥???菟“??| 頝典??游???撠犖</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        <Card label="NGO CO-REGULATION" title="銝剛隡平蝑瘞貊??澆?摮豢? GCSDA ?菜?????>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">靘?閮剔? NGO 瘜犖嚗誑?嗅漲?扳??嗆??璆剜偶蝥祥??剖?輯?瘜????/p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>??撟游漲?賜?貉?瘝餌?隢?銝餉齒璈?</p>
                            <p>??摮?漲????嚗?璆凋蜓?亦???萄?閰?/p>
                            <p>???僑?祇?隢?嚗振?祥??鞈??</p>
                          </div>
                        </Card>
                        <Card label="DIGITAL PUBLICATION" title="蝑?箏澈?訾??? STT Group ?菔齒鈭箸?瑁???>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">?游?摮貉??弦???仿“???訾??箇?嚗遣瑽?璆剜祥?霅???/p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>??STT Press 蝑?箏澈?箇?蝷?/p>
                            <p>??STT News 蝑?箏澈?啗?蝬?/p>
                            <p>??STT Intelligence 蝑?箏澈?</p>
                            <p>??STT Legal Insights 瘜?箏澈</p>
                          </div>
                        </Card>
                        <Card label="MEDIA COLUMNIST" title="M?喳? 瘜?箏澈撠?嚗?敺??砍瘝餌?蝑閫暺?>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">摰??潸”瘜?祥?振??剛?隡平蝑?楛摨血???瘛勗漲靽∩遙?芣撱??????/p>
                        </Card>
                        <Card label="ACADEMIC APPOINTMENT" title="?Ｙ憭批飛?飛?Ｗ隞餃????>
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">?Ｙ憭批飛?飛?Ｗ隞餃?????身隡平瘝餌????菔玨蝔?蝯? AI 瘝餌???ESG 撖血???/p>
                        </Card>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-17.png" alt="??蝧?憯? />
                  </div>
                )}

                {/* SLIDE 2 */}
                {currentSlide === 2 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="ACADEMIC FOUNDATION" zh="摮貉??祕?? />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>摮貉?憟?祕?楓??/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>摮貉??渲牲?扯??Ｘ平撖西?銝阡?嚗??亙?蝝?隢?蝝?撽蜓蝢?/p>
                      <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <Card label="ACADEMIC FOUNDATION" title="摮豢風?">
                          <div className="mt-1.5 space-y-2 text-zinc-300">
                            <div><span className="font-semibold text-white">??蝞∠?摮詨?憯?Ph.D. in Business Administration</span><p className="text-zinc-400 pl-2 mt-0.5">?Ｙ憭批飛蝞∠?摮賊 (2024)嚗?蝛園????砍瘝餌????萇???/p></div>
                            <div><span className="font-semibold text-white">??撊箸蝘?憭批飛蝞∠??弦? EMBA</span><p className="text-zinc-400 pl-2 mt-0.5">頝其?隞??璆剖振鈭箸?寡釭??啗??隡平蝬?蝮暹??弦</p></div>
                          </div>
                        </Card>
                        <Card label="EMPIRICAL RIGOR" title="隞?”??">
                          <div className="mt-2 space-y-1.5 text-zinc-300">
                            <p className="text-white font-semibold">?詻?冽???Internal Compliance?TT Press ?箇?</p>
                            <p className="text-white font-semibold">?詻?025 瘞貊?摰嗆?瘝餌?撖血?撖阡??僑摨血??/p>
                            <p className="text-white font-semibold">?詻???璆剜?凋犖??撅閬???踹振??潦?????/p>
                          </div>
                        </Card>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        <p className="text-[#dbd7cf] font-light italic leading-relaxed">摮貉??舀??摨行鞈芰??嚗祕???霅?隢?閰衣??氬?撩銝嚗?銝??氬?- CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-14.png" alt="??蝧?憯? />
                  </div>
                )}

                {/* SLIDE 3 */}
                {currentSlide === 3 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="REGULATORY ACCREDITATIONS" zh="撠平隤?" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.4vw, 36px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>AI 瘝餌?隤???ESG 瘞貊?閰摯撣怨???/h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>頝典?璈?隤??璆剛???| 瘝餌?撖血????菜??/p>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(10px, 0.9vw, 14px)' }}>
                        <p className="text-[#EBE7DF]/95 tracking-wider italic leading-relaxed">隤?銝鋆ˇ嚗撠摨血雓寞抒??輯姥??銝撘菔??貉?敺??臬? AI 瘝餌???ESG 撖西??楛摨衣?閫??鞎砌遙?踵???/p>
                      </div>
                      <div className="space-y-2 flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <p className="text-[#dbd7cf] leading-relaxed">??<strong className="text-white">Anthropic ??Google ?貊 AI 撠平隤?</strong>嚗項??Anthropic ??HEA?CC 隤?嚗I Fluency 蝟餃?嚗laude 101/Code in Action嚗mazon Bedrock?emini AI 隤???Agent ?隤???/p>
                        <p className="text-[#dbd7cf] leading-relaxed">??<strong className="text-white">??璅?璈? T?V ???瘞貊??澆?隤?</strong>嚗項?４頞唾楚?仿??偶蝥??仿??EO 瘞貊??瑁?霅SG 瘞貊?閰摯撣怒?V ???隤閮毀撣怨??潦?/p>
                      </div>
                      <p className="text-[#e6c84c]/90 font-serif italic flex-shrink-0 mt-auto" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>?嗅漲?雓孵漲嚗?銝?閮梯撌勗?閬?見?隤日?憪?-- ?nternal Compliance??/p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-18.png" alt="??蝧?憯? />
                  </div>
                )}

                {/* SLIDE 4 */}
                {currentSlide === 4 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="PROFESSIONAL DOMAIN AREAS" zh="???" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>?之瘝餌?閫?</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>THE FOUR PILLARS OF GOVERNANCE & COMPLIANCE SOLUTIONS</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        {[
                          { title: '蝑閬? STRATEGIC PLAN', roman: '敺?仿?摨阡?瑽祥?撅', points: ['隡平蝑瘜?憸券??摨血遣蝡?, '摰嗆?隡平?亦璇舫?閮剛???輯???, '隡平蝑撠瘝餌?瘜蝎曄?'] },
                          { title: '蝛拙?? STEADY RUNNING', roman: '瘜?舀??祕?風?眾', points: ['?折?批?嗅漲撱箇????萄閮?, '隡平?折瘜???寡????, '隡平???嗆?閮剛???隞嗅?'] },
                          { title: '?詨?瘝餌? CORE GOVERNANCE', roman: '?嗅漲?單嚗璆剝??, points: ['????祥??瑽???瑁痊?極', '摰嗆??脩?閮剛??甈瑽???, '隡平瘞貊?瘝餌?蝑??ESG ?游?'] },
                          { title: '鞈?單 ACCOMODATION', roman: '隞亙摨血?霅瑕振?瓷撖?, points: ['擃??Ｗ振?楊憓???????, '2026 蝣唾祥?僑銝??萄摨血???, '隡平銝餃犖鞈靽風??輯身閮?] },
                        ].map((pillar, idx) => (
                          <div key={idx} className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden">
                            <span className="text-[#e6c84c]/60 font-mono font-bold block" style={{ fontSize: '8px' }}>PILLAR 0{idx+1} 嚚?{pillar.title}</span>
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
                    <Portrait src="/images/Eric-Chuang-19.png" alt="??蝧?憯? />
                  </div>
                )}

                {/* SLIDE 5 */}
                {currentSlide === 5 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="INITIATE COREGULATION" zh="瘝餌?憪?" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(22px, 3vw, 46px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>撖西??函??銝餅?</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>GOVERNANCE DELEGATION & INTELLECTUAL ALLIANCE</p>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(11px, 1vw, 15px)' }}>
                        <p className="text-zinc-300 italic leading-relaxed">??銝?瑚遙雿??寧?撱箄降嚗??箇?甇??閬璆剛?蝘拙???鋡????嗅漲?批?霅瑯?/p>
                      </div>
                      <p className="text-zinc-400 font-light leading-relaxed flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        憒??券?閬隡平????釣?亙祕鞈芰?瘙箇?獢?戎??霅瑕犖?箸鞎∠??璆剔?撖???脰?蝟餌絞??摰嗆??亦鈭箄??Ｚ???隤?隢?????ㄚ撠惇?箏澈颲血摰文???閰晞?                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0" style={{ marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        <a href="https://lin.ee/yJrCTeo" target="_blank" rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-br from-[#e6c84c] via-yellow-500 to-[#b89530] text-black rounded-xl flex flex-col items-start gap-1 hover:brightness-110 transition-all no-underline"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-black" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>瘝餌?憪? ENGAGEMENT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>??暺?銝?菟???LINE 蝘犖憪?隢株岷</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowContact(true)}
                          className="flex-1 border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 rounded-xl flex flex-col items-start gap-1 transition-all cursor-pointer bg-transparent outline-none"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#e6c84c]" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>?舐窗?箏澈 CONNECT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>??憛怠神?舐窗銵典嚗????∪翰??</span>
                        </button>
                      </div>
                      <button type="button" onClick={() => selectSlide(0)}
                        className="bg-transparent border border-white/5 hover:border-[#e6c84c]/30 p-2 rounded-full flex items-center text-white/30 hover:text-[#e6c84c] transition-all cursor-pointer outline-none self-start"
                        style={{ fontSize: '10px' }}>
                        <span className="px-2">???蝚砌???START OVER</span>
                      </button>
                    </div>
                    <Portrait src="/images/Eric-Chuang-20.png" alt="??蝧?憯? />
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.02] bg-[#000] flex-shrink-0" style={{ padding: '10px 0' }}>
          <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left font-mono text-zinc-500" style={{ fontSize: '10px' }}>
            <p>穢 {new Date().getFullYear()} STT Press 蝑?箏澈?箇?蝷?????蝧?憯?(Founder: Eric Chuang, Ph.D.) ??ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4"><span>TRUST FOUNDATION</span><span>??/span><span>INSTITUTIONAL LOGIC</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}

