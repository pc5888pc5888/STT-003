import { motion } from "motion/react";

interface Props {
  title?: string;
  name?: string;
  className?: string;
}

export const ContributorLabel = ({ 
  title = "MAIN CONTRIBUTOR", 
  name = "莊鈞翔 博士", 
  className = "" 
}: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`z-20 text-left select-none pointer-events-auto ${className}`}
    >
      <div className="relative w-[260px] xs:w-[280px] sm:w-[320px] bg-black/85 backdrop-blur-md border border-[#D4AF37]/20 p-5 sm:p-6 md:p-7 rounded shadow-[0_24px_50px_rgba(0,0,0,0.92)] transition-all duration-300 hover:border-[#D4AF37]/40">
        
        {/* Title Header */}
        <div className="text-[10px] md:text-xs font-sans font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
          {title}
        </div>
        
        {/* Top Divider */}
        <div className="w-full border-t border-[#D4AF37]/15 my-3 sm:my-4"></div>
        
        {/* Signature & Name Section */}
        <div className="relative flex flex-col items-start gap-1 pb-1">
          {/* Golden Handwriting Signature overlaying beautifully */}
          <div className="absolute right-0 -top-4 w-32 xs:w-36 sm:w-44 h-auto pointer-events-none opacity-90 mix-blend-screen filter brightness-[1.1] contrast-[1.15]">
            <img 
              src="/signature-eric001.png" 
              alt="Dr. Eric Chuang Signature" 
              className="w-full h-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Chinese Name */}
          <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-extrabold text-stone-100 tracking-wide z-10">
            {name}
          </h4>
          
          {/* English Name with Honorific */}
          <span className="text-[9px] md:text-[10px] font-mono font-medium text-stone-400 tracking-widest z-10 uppercase mt-0.5">
            DR. ERIC CHUANG, PH.D.
          </span>
        </div>
        
        {/* Bottom Divider */}
        <div className="w-full border-t border-[#D4AF37]/15 my-3 sm:my-4"></div>
        
        {/* Role Credentials */}
        <div className="space-y-1.5 text-[10px] sm:text-[11px] md:text-xs text-stone-300 font-sans tracking-wide leading-relaxed font-light">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full"></span>
            企業策略資深顧問
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full"></span>
            治理制度設計者 // 策略智庫創辦人
          </p>
        </div>
        
      </div>
    </motion.div>
  );
};

