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
      alert("請填寫企業名稱、姓名、Email 及電話");
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
              CONTACT STT — INITIATE COREGULATION
            </p>
            <h3 className="text-white font-serif font-bold mt-0.5" style={{ fontSize: "18px" }}>
              聯絡智庫
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
              <div className="text-[#e6c84c] text-4xl mb-3">✓</div>
              <p className="text-white font-serif text-lg">訊息已成功送出</p>
              <p className="text-zinc-400 mt-1" style={{ fontSize: "13px" }}>
                莊鈞翔博士團隊將盡快與您聯繫。
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 border border-[#e6c84c]/40 text-[#e6c84c] rounded-lg hover:bg-[#e6c84c]/10 transition-all cursor-pointer bg-transparent outline-none"
                style={{ fontSize: "13px" }}
              >
                關閉
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>企業名稱 *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="company_name" value={form.company_name} onChange={handleChange} placeholder="貴公司名稱" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>姓名 *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_name" value={form.from_name} onChange={handleChange} placeholder="您的姓名" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Email *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="from_email" type="email" value={form.from_email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>電話 *</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="phone" value={form.phone} onChange={handleChange} placeholder="0912-345-678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>Line ID</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="line_id" value={form.line_id} onChange={handleChange} placeholder="您的 Line ID" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: "8px" }}>預約時間</label>
                  <input className={inputClass} style={{ fontSize: "13px" }} name="appointment_time" value={form.appointment_time} onChange={handleChange} placeholder="例：2026/07/01 下午 2 點" />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontSize: "8px" }}>訊息內容</label>
                <textarea
                  className={inputClass}
                  style={{ fontSize: "13px", resize: "none" }}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="請簡述您的需求或問題..."
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-center" style={{ fontSize: "12px" }}>
                  送出失敗，請稍後再試或直接寄信至 pc5888@gmail.com
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
                  <><Loader2 className="w-4 h-4 animate-spin" />送出中...</>
                ) : (
                  <><Send className="w-4 h-4" />送出申請</>
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
    { id: "sovereignty", labelZh: "主旨聲明", labelEn: "SOVEREIGNTY" },
    { id: "positions",   labelZh: "現任職務", labelEn: "POSITIONS"   },
    { id: "scholarship", labelZh: "學術與實務", labelEn: "SCHOLARSHIP" },
    { id: "credentials", labelZh: "專業認證",  labelEn: "CREDENTIALS" },
    { id: "services",    labelZh: "服務項目",  labelEn: "SERVICES"    },
    { id: "contact",     labelZh: "治理委託",  labelEn: "CONTACT"     },
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
      <span className="text-[#e6c84c] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ fontSize: 'clamp(9px, 0.7vw, 11px)' }}>{en} ｜ {zh}</span>
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
        {/* 左側裝飾 */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-none">
          <div className="w-px h-12 bg-[#e6c84c]/15"></div>
          <span className="font-mono text-white/20 uppercase [writing-mode:vertical-lr]" style={{ fontSize: '8px', letterSpacing: '0.4em' }}>STT PRESS THINK TANK PLATFORM</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#e6c84c]/25"></div>
        </div>

        {/* 桌面次導覽 */}
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

        {/* 手機次導覽 */}
        <div className="w-full bg-[#050505] border-b border-white/[0.02] overflow-x-auto scrollbar-none flex md:hidden gap-2 px-4 py-2 flex-shrink-0">
          {slides.map((slide, index) => (
            <button key={slide.id} type="button" onClick={() => selectSlide(index)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer border-0 outline-none transition-all ${currentSlide === index ? 'bg-[#e6c84c] text-black' : 'bg-white/[0.03] text-zinc-400 hover:text-white'}`}>
              {slide.labelZh}
            </button>
          ))}
        </div>

        {/* 主內容區 */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ height: '100%' }}>
              <div className="container mx-auto px-6 max-w-7xl font-sans" style={{ height: '100%' }}>

                {/* SLIDE 0 */}
                {currentSlide === 0 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="SOVEREIGNTY OF THOUGHT" zh="思想主權" />
                      <h1 className="font-serif text-[#e6c84c] tracking-wider leading-tight whitespace-nowrap flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.5vw, 38px)', margin: 'clamp(4px, 0.8vh, 12px) 0' }}>實踐您的思想主權</h1>
                      <div className="flex-shrink-0" style={{ marginBottom: 'clamp(6px, 1.2vh, 16px)' }}>
                        <p className="text-white font-light tracking-wider whitespace-nowrap" style={{ fontSize: 'clamp(10px, 0.9vw, 14px)' }}>企業策略與公司治理法遵顧問 | 學術研究與實務</p>
                        <p className="text-[#e6c84c] font-serif tracking-widest whitespace-nowrap" style={{ fontSize: 'clamp(12px, 1.3vw, 22px)', marginTop: '4px' }}>莊鈞翔博士 CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(6px, 1.2vh, 14px)' }}>
                        <p className="font-sans text-[#EBE7DF]/90 tracking-wider italic" style={{ fontSize: 'clamp(10px, 0.95vw, 14px)', lineHeight: '1.7' }}>
                          我們絕不推銷任何廉價的建議，我們僅為真正珍視基業與秩序的領袖，建立無懈可擊的法商防火牆。
                        </p>
                      </div>
                      <ul className="list-disc flex-shrink-0" style={{ paddingLeft: 'clamp(14px, 1.5vw, 22px)', marginBottom: 'clamp(6px, 1.5vh, 18px)', fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: '1.65' }}>
                        <li className="text-stone-300 font-light" style={{ marginBottom: 'clamp(4px, 0.6vh, 8px)' }}>莊博士以法遵為核心戰略語言，協助企業建立制度性競爭優勢，讓法律不再是成本中心，而是品牌溢價的來源。</li>
                        <li className="text-stone-300 font-light">莊博士深信企業的長期價值，建立在誠信與制度的磐石之上，而非短期獲利的流沙。</li>
                      </ul>
                      <p className="text-[#e6c84c] font-serif italic tracking-wide flex-shrink-0 mt-auto" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        為你的內心，打造一座不可侵犯的至聖所<span className="border-b border-[#e6c84c]/50 pb-0.5 ml-1">--- 摘自《Internal Compliance》莊鈞翔博士著</span>
                      </p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-15.png" alt="莊鈞翔博士" />
                  </div>
                )}

                {/* SLIDE 1 */}
                {currentSlide === 1 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="AFFILIATIONS & ROLES" zh="現任職務" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>現任職務一覽</h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>企業策略與公司治理法遵顧問 | 跨域整合型領導人</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        <Card label="NGO CO-REGULATION" title="中華企業策略永續發展學會 GCSDA 創會理事長">
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">依法設立 NGO 法人，以制度性框架推動企業永續治理、接班傳承與法遵文化。</p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>▸ 年度白皮書與治理論壇主辦機構</p>
                            <p>▸ 季度閉門圓桌：企業主接班與法遵對話</p>
                            <p>▸ 雙年公開論壇：家族治理與資本效率</p>
                          </div>
                        </Card>
                        <Card label="DIGITAL PUBLICATION" title="策略智庫數位集團 STT Group 創辦人暨執行長">
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">整合學術研究、策略顧問與數位出版，建構企業治理知識生態。</p>
                          <div className="text-zinc-400 mt-1.5 space-y-0.5 border-t border-white/[0.02] pt-1 leading-relaxed">
                            <p>▸ STT Press 策略智庫出版社</p>
                            <p>▸ STT News 策略智庫新聞網</p>
                            <p>▸ STT Intelligence 策略智庫情報</p>
                            <p>▸ STT Legal Insights 法遵智庫</p>
                          </div>
                        </Card>
                        <Card label="MEDIA COLUMNIST" title="M傳媒 法遵智庫專欄：法律與公司治理策略觀點">
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">定期發表法遵、治理、家族接班與企業策略的深度分析，深度信任優於廣泛曝光。</p>
                        </Card>
                        <Card label="ACADEMIC APPOINTMENT" title="逢甲大學商學院兼任助理教授">
                          <p className="text-zinc-300 font-light leading-relaxed mt-1">逢甲大學商學院兼任助理教授，開設企業治理與法遵課程，結合 AI 治理與 ESG 實務。</p>
                        </Card>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-17.png" alt="莊鈞翔博士" />
                  </div>
                )}

                {/* SLIDE 2 */}
                {currentSlide === 2 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="ACADEMIC FOUNDATION" zh="學術與實務" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>學術奠基、實務淬鍊</h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>學術嚴謹性與產業實踐並重，不接受純理論或純經驗主義</p>
                      <div className="grid grid-cols-2 gap-2 flex-shrink-0" style={{ marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <Card label="ACADEMIC FOUNDATION" title="學歷背景">
                          <div className="mt-1.5 space-y-2 text-zinc-300">
                            <div><span className="font-semibold text-white">▸ 管理學博士 Ph.D. in Business Administration</span><p className="text-zinc-400 pl-2 mt-0.5">逢甲大學管理學院 (2024)，研究領域：公司治理與法遵策略</p></div>
                            <div><span className="font-semibold text-white">▸ 嶺東科技大學管理研究所 EMBA</span><p className="text-zinc-400 pl-2 mt-0.5">跨世代企業家人格特質、創新能力與企業經營績效研究</p></div>
                          </div>
                        </Card>
                        <Card label="EMPIRICAL RIGOR" title="代表著作">
                          <div className="mt-2 space-y-1.5 text-zinc-300">
                            <p className="text-white font-semibold">▸《內在法遵 Internal Compliance》STT Press 出版</p>
                            <p className="text-white font-semibold">▸《2025 永續家族治理實務實錄》年度報告</p>
                            <p className="text-white font-semibold">▸《臺灣企業接班人的佈局規劃與傳承家族價值》期刊論文</p>
                          </div>
                        </Card>
                      </div>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', fontSize: 'clamp(10px, 0.9vw, 13px)' }}>
                        <p className="text-[#dbd7cf] font-light italic leading-relaxed">學術是我看透制度本質的透鏡，實務是我驗證理論的試煉場。兩者缺一，皆不完整。-- CHUANG CHUN HSIANG Ph.D.</p>
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-14.png" alt="莊鈞翔博士" />
                  </div>
                )}

                {/* SLIDE 3 */}
                {currentSlide === 3 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="REGULATORY ACCREDITATIONS" zh="專業認證" />
                      <h2 className="font-serif font-black text-[#e6c84c] leading-tight flex-shrink-0" style={{ fontSize: 'clamp(18px, 2.4vw, 36px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>AI 治理認證與 ESG 永續評估師資格</h2>
                      <p className="text-stone-300 tracking-wide flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>跨國機構認可的專業資格 | 治理實務與法遵整合</p>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(10px, 0.9vw, 14px)' }}>
                        <p className="text-[#EBE7DF]/95 tracking-wider italic leading-relaxed">認證不是裝飾，而是對制度嚴謹性的承諾。每一張證書背後，是對 AI 治理與 ESG 實踐的深度理解與責任承擔。</p>
                      </div>
                      <div className="space-y-2 flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>
                        <p className="text-[#dbd7cf] leading-relaxed">▸ <strong className="text-white">Anthropic 與 Google 核發 AI 專業認證</strong>：涵蓋 Anthropic 的 HEA、UCC 認證，AI Fluency 系列（Claude 101/Code in Action）、Amazon Bedrock、Gemini AI 認證及 Agent 開發認證。</p>
                        <p className="text-[#dbd7cf] leading-relaxed">▸ <strong className="text-white">國際標準機構 TÜV 萊茵集團永續發展認證</strong>：涵蓋碳足跡查驗、永續報告書查驗、CEO 永續長認證、ESG 永續評估師、TÜV 萊茵集團認可訓練師資格。</p>
                      </div>
                      <p className="text-[#e6c84c]/90 font-serif italic flex-shrink-0 mt-auto" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)' }}>制度的嚴謹度，從不允許自己反覆犯同樣的錯誤開始。--- 《Internal Compliance》</p>
                    </div>
                    <Portrait src="/images/Eric-Chuang-18.png" alt="莊鈞翔博士" />
                  </div>
                )}

                {/* SLIDE 4 */}
                {currentSlide === 4 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="PROFESSIONAL DOMAIN AREAS" zh="服務項目" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(20px, 2.8vw, 42px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>四大治理解方</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>THE FOUR PILLARS OF GOVERNANCE & COMPLIANCE SOLUTIONS</p>
                      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                        {[
                          { title: '策略規劃 STRATEGIC PLAN', roman: '從戰略高度重構治理格局', points: ['企業策略法律風險預防與制度建立', '家族企業接班梯隊設計與傳承規劃', '企業策略導入治理法遵精神'] },
                          { title: '穩健運營 STEADY RUNNING', roman: '法遵是最堅實的護城河', points: ['內部控制制度建立與法遵健診', '企業內部法遵文化培訓與落地', '企業合規架構設計與文件化'] },
                          { title: '核心治理 CORE GOVERNANCE', roman: '制度傳承，基業長青', points: ['董事會治理結構優化與職責分工', '家族憲章設計與股權架構規劃', '企業永續治理策略與 ESG 整合'] },
                          { title: '資產傳承 ACCOMODATION', roman: '以制度守護家族財富', points: ['高資產家族跨境稅務規劃框架', '2026 碳費元年下法遵制度因應', '企業主個人資產保護與傳承設計'] },
                        ].map((pillar, idx) => (
                          <div key={idx} className="p-3 bg-zinc-950/80 border border-white/[0.03] hover:border-[#e6c84c]/20 transition-all rounded-lg overflow-hidden">
                            <span className="text-[#e6c84c]/60 font-mono font-bold block" style={{ fontSize: '8px' }}>PILLAR 0{idx+1} ｜ {pillar.title}</span>
                            <h3 className="font-serif font-bold text-white mt-0.5" style={{ fontSize: 'clamp(10px, 0.85vw, 13px)' }}>{pillar.roman}</h3>
                            <ul className="mt-1.5 border-t border-white/[0.02] pt-1.5 space-y-1" style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}>
                              {pillar.points.map((p, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-zinc-400 leading-relaxed">
                                  <span className="text-[#e6c84c] font-black shrink-0">▸</span><span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Portrait src="/images/Eric-Chuang-19.png" alt="莊鈞翔博士" />
                  </div>
                )}

                {/* SLIDE 5 */}
                {currentSlide === 5 && (
                  <div className="flex flex-row" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-full lg:w-[58%] flex flex-col overflow-hidden flex-shrink-0" style={{ padding: 'clamp(8px, 1.5vh, 24px) 0', paddingRight: 'clamp(16px, 2vw, 40px)' }}>
                      <SectionLabel en="INITIATE COREGULATION" zh="治理委託" />
                      <h2 className="font-serif text-white leading-tight flex-shrink-0" style={{ fontSize: 'clamp(22px, 3vw, 46px)', margin: 'clamp(4px, 0.8vh, 10px) 0' }}>實踐您的思想主權</h2>
                      <p className="text-zinc-400 font-mono tracking-widest uppercase font-semibold flex-shrink-0" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)', marginBottom: 'clamp(8px, 1.2vh, 16px)' }}>GOVERNANCE DELEGATION & INTELLECTUAL ALLIANCE</p>
                      <div className="border-l-2 border-[#e6c84c]/75 bg-zinc-950/45 flex-shrink-0" style={{ padding: 'clamp(8px, 1vh, 14px)', marginBottom: 'clamp(8px, 1.2vh, 16px)', fontSize: 'clamp(11px, 1vw, 15px)' }}>
                        <p className="text-zinc-300 italic leading-relaxed">我們絕不推銷任何廉價的建議，僅為真正珍視基業與秩序的領袖，提供制度性守護。</p>
                      </div>
                      <p className="text-zinc-400 font-light leading-relaxed flex-shrink-0" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        如果您需要為企業董事會注入實質的決策框架、妥善保護個人智慧財產或營業秘密，或是進行系統化的家族接班人資產規劃，誠摯邀請您與莊鈞翔博士專屬智庫辦公室展開對話。
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0" style={{ marginBottom: 'clamp(12px, 2vh, 24px)' }}>
                        <a href="https://lin.ee/yJrCTeo" target="_blank" rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-br from-[#e6c84c] via-yellow-500 to-[#b89530] text-black rounded-xl flex flex-col items-start gap-1 hover:brightness-110 transition-all no-underline"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-black" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>治理委託 ENGAGEMENT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>▸ 點擊一鍵開啟 LINE 私人委託諮詢</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowContact(true)}
                          className="flex-1 border border-[#e6c84c]/40 text-[#e6c84c] hover:bg-[#e6c84c]/5 rounded-xl flex flex-col items-start gap-1 transition-all cursor-pointer bg-transparent outline-none"
                          style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(16px, 1.5vw, 24px)' }}>
                          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#e6c84c]" /><span className="font-bold tracking-wider" style={{ fontSize: 'clamp(11px, 1vw, 15px)' }}>聯絡智庫 CONNECT</span></div>
                          <span className="font-mono font-black tracking-widest opacity-80 uppercase" style={{ fontSize: '9px' }}>▸ 填寫聯絡表單，我們將盡快回覆</span>
                        </button>
                      </div>
                      <button type="button" onClick={() => selectSlide(0)}
                        className="bg-transparent border border-white/5 hover:border-[#e6c84c]/30 p-2 rounded-full flex items-center text-white/30 hover:text-[#e6c84c] transition-all cursor-pointer outline-none self-start"
                        style={{ fontSize: '10px' }}>
                        <span className="px-2">▲ 回到第一頁 START OVER</span>
                      </button>
                    </div>
                    <Portrait src="/images/Eric-Chuang-20.png" alt="莊鈞翔博士" />
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.02] bg-[#000] flex-shrink-0" style={{ padding: '10px 0' }}>
          <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left font-mono text-zinc-500" style={{ fontSize: '10px' }}>
            <p>© {new Date().getFullYear()} STT Press 策略智庫出版社 ‧ 莊鈞翔博士 (Founder: Eric Chuang, Ph.D.) ‧ ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4"><span>TRUST FOUNDATION</span><span>‧</span><span>INSTITUTIONAL LOGIC</span></div>
          </div>
        </footer>
      </div>
    </>
  );
}
