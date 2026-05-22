import { motion } from "motion/react";

interface Props {
  title: string;
  name?: string;
  className?: string;
}

export const ContributorLabel = ({ title, name = "莊鈞翔 博士", className = "" }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`bg-zinc-950/95 backdrop-blur-xl border-r-[6px] border-gold-400 py-6 px-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 ${className}`}
    >
       <div className="flex flex-col items-end text-right">
          <span className="text-gold-500 text-[10px] font-black tracking-[0.5em] uppercase mb-1 whitespace-nowrap">{title}</span>
          <span className="text-white text-3xl font-display font-light whitespace-nowrap">{name}</span>
       </div>
    </motion.div>
  );
};
