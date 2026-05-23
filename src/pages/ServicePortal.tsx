import { motion } from "motion/react";
import { MessageCircle, Mail, ShieldAlert, FileText, CheckCircle2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicePortal() {
  return (
    <div 
      className="service-portal-container bg-black text-[#F8F7F4] pt-0 pb-[2vh]"
    >
      <div className="container mx-auto px-6 max-w-4xl space-y-10">
        
         {/* Header */}
        <div className="text-center space-y-2">
          <Landmark className="h-11 w-11 mx-auto text-gold-400/20" style={{ marginBottom: "2px" }} />
          <h1 className="text-5xl font-display font-light text-gold-metallic">服務正則與合規政策</h1>
          <p className="text-gold-200/40 font-display font-light tracking-widest uppercase text-sm" style={{ marginTop: "2px" }}>Customer Service & Refund Policy</p>
        </div>

        {/* Payment Confirmation Simulation (Image 1 Style) */}
        <section className="ornate-frame bg-gold-400/5 p-8 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/5 -rotate-45 translate-x-24 -translate-y-24"></div>
          
          <div className="text-center space-y-1.5">
            <span className="text-gold-400 font-sans font-black text-xs uppercase tracking-[0.5em]">Payment Confirmed</span>
            <h2 className="text-5xl font-display font-light text-gold-metallic" style={{ marginTop: "2px", marginBottom: "2px" }}>付款完成</h2>
          </div>

          <div className="space-y-2.5 text-center text-base font-display font-light text-gold-200/80 leading-relaxed">
            <p className="text-gold-400 py-3 border-y border-gold-400/10">
              本產品為數位正典授權內容，採 LINE 閉環交付系統，依法排除 7 日鑑賞期。
            </p>
            <p>
              感謝您購買《內在法遵 Internal Compliance》數位閱讀完整版 ； 
              請使用付款時填寫之 <span className="text-gold-metallic"> [ 姓名、Email ] </span> 進行身分驗證與版本授權。
            </p>
          </div>

          <div className="flex justify-center pt-3">
            <a 
              href="https://line.me/R/ti/p/@stt-group"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 flex items-center justify-center bg-[#44C000] hover:bg-[#3bad00] text-white text-base animate-pulse no-underline font-bold"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              請務必加入官方 LINE 進行授權確認
            </a>
          </div>
        </section>

        {/* Refund Policy (Image 2 Style) */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-8 w-8 text-gold-400/40" />
            <h3 className="text-2xl font-display font-light text-gold-metallic">客服與退換貨政策</h3>
          </div>

          <div className="space-y-4 font-display font-light">
            <div className="space-y-2">
              <h4 className="text-gold-400 text-xs uppercase tracking-widest py-1 border-b border-gold-400/10 w-fit">產品性質</h4>
              <p className="text-lg leading-relaxed text-gold-200/90">
                本站販售之【 內在法遵 Internal Compliance《 為你的內心，打造一座不可侵犯的至聖所 》數位閱讀完整版 | Digital Canonical Edition 】，為「非以有形媒介提供之數位內容」，一經提供即履行完畢。
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-gold-400 text-xs uppercase tracking-widest py-1 border-b border-gold-400/10 w-fit">退換貨說明</h4>
              <p className="text-base leading-relaxed text-gold-200/70">
                依據《通訊交易解除權合理例外情事適用準則》第2條第5款規定，若通訊交易之商品或服務屬於「非以有形媒介提供之數位內容或一經提供即為完成之線上服務，經消費者事先同意始提供」。此款規定需經業者告知消費者排除 7 日解除權，才具合法效力。
              </p>
              <div className="bg-gold-400/5 p-4 border-l-2 border-gold-400/30">
                <p className="text-gold-400/80 font-light text-sm">
                  屬合理例外情事。為此，數位內容不適用於 7 天鑑賞期，購買後恕不退費。
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gold-400/10">
              <div className="flex items-center gap-2.5">
                <Mail className="h-6 w-6 text-gold-400/40" />
                <h4 className="text-xl text-gold-metallic">客服與社群聯繫</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <p className="text-[10px] text-gold-400/50 uppercase tracking-widest">數位交付與商務支援</p>
                  <a 
                    href="https://line.me/R/ti/p/@stt-group"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 px-4 flex items-center border border-gold-400/20 text-gold-200 hover:bg-gold-400/5 no-underline text-sm"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 text-[#44C000]" />
                    STT 智慧治理 Line
                  </a>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-gold-400/50 uppercase tracking-widest">學術研究與永續發展</p>
                  <a 
                    href="https://line.me/R/ti/p/@387nbnjs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 px-4 flex items-center border border-gold-400/20 text-gold-200 hover:bg-gold-400/5 no-underline text-sm"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 text-[#44C000]" />
                    GCSDA 學會 Line
                  </a>
                </div>
              </div>
              <p className="text-lg text-gold-200/80 pt-2.5">
                客服信箱： <span className="text-gold-400 select-all">pc5888@gmail.com</span>
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
         <section className="space-y-5 pt-8 border-t border-gold-400/10">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-8 w-8 text-gold-400/40" />
            <h3 className="text-2xl font-display font-light text-gold-metallic">隱私權保護聲明</h3>
          </div>
          <div className="space-y-3 font-display font-light text-gold-200/70 text-base leading-relaxed">
            <p>
              STT | Press 策略智庫極為重視您的個人隱私。當您購買本站數位產品時，我們所收集之 [姓名、Email、支付資訊]，僅用於以下用途：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>進行交易的身分核對與版本授權驗證。</li>
              <li>數位產品（EPUB/PDF）檔案的閉環交付與服務。</li>
              <li>提供產品更新通知或後續讀者支援服務。</li>
            </ul>
            <p className="text-sm">
              我們承諾除法律規定或配合金流服務商（如綠界科技）之必要審核外，絕不將您的個人資料洩漏、出售或提供給任何第三方機構。您的資料將受到加密保護，並僅由授權之管理人員進行處理。
            </p>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="p-6 text-[11px] text-gold-200/30 font-display leading-relaxed font-light border border-gold-400/10">
          註 1：依據中華民國《通訊交易解除權合理例外情事適用準則》第2條第5款規定，通訊交易之商品或服務有下列情形之一，並經企業經營者告知消費者將排除消保法第十九條第一項規定解除權之適用者，屬排除七日解除權之合理例外情事：...五、非以有形媒介提供之數位內容或一經提供即為完成之線上服務，經消費者事先同意始提供。
        </section>

        <div className="text-center pt-8">
          <p className="text-gold-metallic font-display font-light text-xl">Strategic Think Tank Digital Publishing</p>
          <p className="text-gold-400/40 text-xs mt-3 tracking-[0.3em]">STT | Press 策略智庫數位出版</p>
        </div>
      </div>
    </div>
  );
}
