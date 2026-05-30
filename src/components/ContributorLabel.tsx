import { motion } from "motion/react";

interface Props {
  title?: string;
  name?: string;
  className?: string;
}

export const ContributorLabel = ({ className = "" }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`z-20 flex flex-col items-start bg-transparent pointer-events-none select-none ${className}`}
    >
      <div className="relative">
        <img 
          src="/signature-eric001.png" 
          alt="Dr. Eric Chuang Signature" 
          className="w-40 sm:w-48 lg:w-56 xl:w-64 h-auto drop-shadow-[0_4px_18px_rgba(0,0,0,0.92)] opacity-95 transition-all filter contrast-[1.1] brightness-[1.1]"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
};
