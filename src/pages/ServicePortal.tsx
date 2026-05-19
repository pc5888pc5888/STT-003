import { motion } from "motion/react";
import { MessageCircle, Mail, ShieldAlert, FileText, CheckCircle2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicePortal() {
  return (
    <div className="min-h-screen bg-black text-[#F8F7F4] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl space-y-24">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <Landmark className="h-16 w-16 mx-auto text-gold-400/20" />
          <h1 className="text-5xl font-display font-light text-gold-metallic">服務正則與合規政策</h1>
          <p className="text-gold-200/40 font-display font-light tracking-widest uppercase text-sm">Customer Service & Refund Policy</p>
        </div>

        {/* Payment Confirmation Simulation (Image 1 Style) */}
        <section className="ornate-frame bg-gold-400/5 p-12 space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 -rotate-45 translate-x-32 -translate-y-32"></div>
          
          <div className="text-center space-y-4">
            <span className="text-gold-400 font-sans font-black text-xs uppercase tracking-[0.5em]">Payment Confirmed</span>
            <h2 className="text-6xl font-display font-light text-gold-metallic">付款完成</h2>
          </div>

          <div className="space-y-6 text-center text-lg font-display font-light text-gold-200/80 leading-relaxed">
            <p className="text-gold-400 py-4 border-y border-gold-400/10">
              本產品為數位正典授權內容，採 LINE 閉環交付系統，依法排除 7 日鑑賞期。
            </p>
            <p>
              感謝您購買《內在法遵 Internal Compliance》數位閱讀完整版 ； 
              請使用付款時填寫之 <span className="text-gold-metallic"> [ 姓名、Email ] </span> 進行身分驗證與版本授權。
            </p>
          </div>

          <div className="flex justify-center pt-8">
            <a 
              href="https://line.me/R/ti/p/@stt-group"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 px-12 flex items-center justify-center bg-[#44C000] hover:bg-[#3bad00] text-white text-xl animate-pulse no-underline font-bold"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              請務必加入官方 LINE 進行授權確認
            </a>
          </div>
        </section>

        {/* Refund Policy (Image 2 Style) */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <ShieldAlert className="h-10 w-10 text-gold-400/40" />
            <h3 className="text-3xl font-display font-light text-gold-metallic">客服與退換貨政策</h3>
          </div>

          <div className="space-y-10 font-display font-light">
            <div className="space-y-4">
              <h4 className="text-gold-400 text-sm uppercase tracking-widest py-2 border-b border-gold-400/10 w-fit">產品性質</h4>
              <p className="text-xl leading-relaxed text-gold-200/90">
                本站販售之【 內在法遵 Internal Compliance《 為你的內心，打造一座不可侵犯的至聖所 》數位閱讀完整版 | Digital Canonical Edition 】，為「非以有形媒介提供之數位內容」，一經提供即履行完畢。
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-gold-400 text-sm uppercase tracking-widest py-2 border-b border-gold-400/10 w-fit">退換貨說明</h4>
              <p className="text-lg leading-relaxed text-gold-200/70">
                依據《通訊交易解除權合理例外情事適用準則》第2條第5款規定，若通訊交易之商品或服務屬於「非以有形媒介提供之數位內容或一經提供即為完成之線上服務，經消費者事先同意始提供」。此款規定需經業者告知消費者排除 7 日解除權，才具合法效力。
              </p>
              <div className="bg-gold-400/5 p-6 border-l-2 border-gold-400/30">
                <p className="text-gold-400/80 font-light">
                  屬合理例外情事。為此，數位內容不適用於 7 天鑑賞期，購買後恕不退費。
                </p>
              </div>
            </div>

            <div className="space-y-8 pt-10 border-t border-gold-400/10">
              <div className="flex items-center gap-6">
                <Mail className="h-8 w-8 text-gold-400/40" />
                <h4 className="text-2xl text-gold-metallic">客服與社群聯繫</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-xs text-gold-400/50 uppercase tracking-widest">數位交付與商務支援</p>
                  <a 
                    href="https://line.me/R/ti/p/@stt-group"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-16 px-6 flex items-center border border-gold-400/20 text-gold-200 hover:bg-gold-400/5 no-underline"
                  >
                    <MessageCircle className="mr-3 h-5 w-5 text-[#44C000]" />
                    STT 智慧治理 Line
                  </a>
                </div>
                <div className="space-y-4">
                  <p className="text-xs text-gold-400/50 uppercase tracking-widest">學術研究與永續發展</p>
                  <a 
                    href="https://line.me/R/ti/p/@387nbnjs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-16 px-6 flex items-center border border-gold-400/20 text-gold-200 hover:bg-gold-400/5 no-underline"
                  >
                    <MessageCircle className="mr-3 h-5 w-5 text-[#44C000]" />
                    GCSDA 學會 Line
                  </a>
                </div>
              </div>
              <p className="text-xl text-gold-200/80 pt-6">
                客服信箱： <span className="text-gold-400 select-all">pc5888@gmail.com</span>
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="space-y-12 pt-20 border-t border-gold-400/10">
          <div className="flex items-center gap-6">
            <ShieldAlert className="h-10 w-10 text-gold-400/40" />
            <h3 className="text-3xl font-display font-light text-gold-metallic">隱私權保護聲明</h3>
          </div>
          <div className="space-y-8 font-display font-light text-gold-200/70 text-lg leading-relaxed">
            <p>
              STT | Press 策略智庫極為重視您的個人隱私。當您購買本站數位產品時，我們所收集之 [姓名、Email、支付資訊]，僅用於以下用途：
            </p>
            <ul className="list-disc pl-8 space-y-4">
              <li>進行交易的身分核對與版本授權驗證。</li>
              <li>數位產品（EPUB/PDF）檔案的閉環交付與服務。</li>
              <li>提供產品更新通知或後續讀者支援服務。</li>
            </ul>
            <p>
              我們承諾除法律規定或配合金流服務商（如綠界科技）之必要審核外，絕不將您的個人資料洩漏、出售或提供給任何第三方機構。您的資料將受到加密保護，並僅由授權之管理人員進行處理。
            </p>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="p-8 text-xs text-gold-200/30 font-display leading-relaxed font-light border border-gold-400/10">
          註 1：依據中華民國《通訊交易解除權合理例外情事適用準則》第2條第5款規定，通訊交易之商品或服務有下列情形之一，並經企業經營者告知消費者將排除消保法第十九條第一項規定解除權之適用者，屬排除七日解除權之合理例外情事：...五、非以有形媒介提供之數位內容或一經提供即為完成之線上服務，經消費者事先同意始提供。
        </section>

        <div className="text-center pt-20">
          <p className="text-gold-metallic font-display font-light text-2xl">Strategic Think Tank Digital Publishing</p>
          <p className="text-gold-400/40 text-sm mt-4 tracking-[0.3em]">STT | Press 策略智庫數位出版</p>
        </div>
      </div>
    </div>
  );
}
