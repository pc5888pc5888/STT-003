import { motion } from "motion/react";
import { MessageCircle, CheckCircle2, Landmark, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("ISBN 已複製到剪貼簿");
  };

  return (
    <div className="min-h-screen bg-black text-[#F8F7F4] pt-32 pb-20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-400/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ornate-frame bg-gold-400/5 p-12 md:p-20 space-y-12 text-center"
        >
          {/* Header - Image 1 Style Replication */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gold-400/20 blur-2xl rounded-full"></div>
              <img 
                src="/images/STT-Press-Seal.png" 
                alt="STT Seal" 
                className="h-32 w-32 relative z-10 mx-auto brightness-125 hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-7xl md:text-8xl font-display font-light text-gold-metallic tracking-tighter">付款完成</h1>
              <p className="text-gold-400 font-sans font-black text-xs uppercase tracking-[0.6em]">Payment Confirmed</p>
            </div>
          </div>

          {/* Core Content Box */}
          <div className="space-y-8 py-10 border-y border-gold-400/10">
            <p className="text-2xl md:text-3xl font-display font-light leading-relaxed text-gold-200/90">
              本產品為數位正典授權內容，採 LINE 閉環交付系統；
              依法排除 7 日鑑賞期。
            </p>
            <div className="space-y-4">
              <p className="text-gold-50/60 font-display font-light text-xl">
                感謝您購買【 內在法遵 Internal Compliance《 為你的內心，打造一座不可侵犯的至聖所 》數位閱讀完整版 】
              </p>
              <p className="text-gold-400/80 font-display font-light">
                請使用付款時填寫之 <span className="underline underline-offset-8">姓名、Email</span> 進行身分驗證與版本授權。
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-10">
            <div className="space-y-4">
              <a 
                href="https://line.me/R/ti/p/@stt-group"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-shimmer h-20 px-12 flex items-center justify-center bg-[#44C000] hover:bg-[#3bad00] text-white text-2xl font-bold transition-all no-underline"
              >
                <MessageCircle className="mr-4 h-8 w-8" />
                請務必加入官方 LINE 進行授權確認
              </a>
              <p className="text-gold-400/40 text-sm font-light">點擊上方按鈕，即刻與策略智庫交付專員連線</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-white/5 border border-gold-400/10 space-y-2">
                <p className="text-xs text-gold-400/50 uppercase tracking-widest">Digital Asset Info</p>
                <p className="text-gold-200 font-display font-light">EPUB: 9786264470544</p>
                <p className="text-gold-200 font-display font-light">PDF: 9786264470551</p>
              </div>
              <div className="p-6 bg-white/5 border border-gold-400/10 flex flex-col justify-center items-center gap-4">
                <span className="text-xs text-gold-400/50 uppercase tracking-widest">Transaction Statement</span>
                <p className="text-gold-200/40 text-[10px] font-light text-center">本數位內容一經交付即完成履約，不適用7天鑑賞期，恕不退貨。</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Link to Academic Society */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center space-y-6"
        >
          <p className="text-gold-200/40 font-display font-light">—— 同步加入學術社群，深耕永續治理 ——</p>
          <a 
            href="https://line.me/R/ti/p/@387nbnjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gold-400 hover:text-gold-200 hover:bg-gold-400/5 transition-all py-6 px-8 no-underline"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            加入「中華企業策略永續發展學會 GCSDA」Line 官帳
          </a>
        </motion.div>

        <div className="text-center pt-20">
          <Landmark className="h-12 w-12 mx-auto text-gold-400/10 mb-4" />
          <p className="text-gold-400/30 text-[10px] tracking-[0.4em] uppercase">Strategic Think Tank Digital Publishing</p>
        </div>
      </div>
    </div>
  );
}
