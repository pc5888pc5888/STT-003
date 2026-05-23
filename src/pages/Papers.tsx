import { motion } from "motion/react";
import { phdPapers, masterPapers } from "../data/mockData";
import { ContributorLabel } from "../components/ContributorLabel";
import { PaperCard } from "../components/PaperCard";
import { FileText, GraduationCap, Award } from "lucide-react";

export default function Papers() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-gold-500 selection:text-black">
      {/* Header - Academic Excellence */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-gold-900/10 mb-32 pt-24 lg:pt-0">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-400/5 skew-x-12 translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center relative z-10">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-12 py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <span className="h-[2px] w-16 bg-gold-600"></span>
                <span className="text-gold-500 font-sans font-black text-xs uppercase tracking-[0.6em]">Academic Excellence</span>
              </div>
              
              <div className="relative w-full max-w-4xl py-4 lg:py-6">
                <img 
                  src="/images/stt-word-003.png.png" 
                  alt="學術研究：卓越引領策略新典範" 
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)] filter brightness-110 contrast-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="space-y-10 max-w-2xl"
            >
              <p className="text-gold-200/40 text-xl md:text-2xl font-serif leading-relaxed font-light border-l border-gold-400/20 pl-10 py-2">
                莊鈞翔 博士學術成就累積超過十二萬字的商管博士及企業管理碩士論文，研究聚焦於公司治理法遵及服務永續，引領策略新典範。
              </p>
            </motion.div>
          </div>

          {/* Right: The Portrait */}
          <div className="lg:col-span-5 h-full relative flex items-end justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full flex items-end justify-center lg:justify-end"
            >
              <div className="relative h-full w-full max-w-[500px] lg:max-w-none flex items-end justify-end">
                <img 
                  src="/images/portrait-005.png.png" 
                  alt="莊鈞翔 博士" 
                  className="w-full h-auto max-h-[75vh] lg:max-h-[85vh] object-contain object-bottom filter drop-shadow-[0_0_60px_rgba(212,175,55,0.15)] contrast-[1.1] brightness-[1.1]"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
                
                <ContributorLabel 
                  title="商學博士︱PHD IN BUSINESS" 
                  name="莊鈞翔 博士"
                  className="absolute bottom-20 right-6" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-40 space-y-32">

      {/* PhD Theses Section */}
      <div className="space-y-16">
        <div className="flex items-center gap-6">
          <Award className="h-10 w-10 text-gold-400" />
          <div className="space-y-1">
            <span className="micro-label">Doctoral Dissertation</span>
            <h2 className="text-4xl font-display font-light text-gold-200">博士學位論文</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-16">
          {phdPapers.map((paper, index) => (
            <PaperCard key={paper.id} paper={paper} index={index} />
          ))}
        </div>
      </div>

      {/* Master Thesis Section */}
      <div className="space-y-16">
        <div className="flex items-center gap-6">
          <FileText className="h-10 w-10 text-gold-400" />
          <div className="space-y-1">
            <span className="micro-label">Master's Thesis</span>
            <h2 className="text-4xl font-display font-light text-gold-200">碩士學位論文</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-16">
          {masterPapers.map((paper, index) => (
            <PaperCard key={paper.id} paper={paper} index={index} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
