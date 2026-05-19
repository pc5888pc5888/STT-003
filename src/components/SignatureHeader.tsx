import { motion } from "motion/react";

interface SignatureHeaderProps {
  microLabel: string;
  name: string;
  subtitle: string;
  description?: string;
  className?: string;
}

export const SignatureHeader = ({ 
  microLabel, 
  name, 
  subtitle, 
  description, 
  className = "" 
}: SignatureHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`relative inline-flex flex-col items-start ${className}`}
    >
      <span className="text-gold-500/60 text-[10px] font-black tracking-[0.5em] uppercase mb-4">{microLabel}</span>
      <div className="space-y-2">
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-gold-metallic leading-[1.2] md:leading-none tracking-tighter drop-shadow-2xl">
          {name}
        </h1>
        <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/40 font-display font-light italic whitespace-nowrap">
          {subtitle}
        </p>
      </div>
      {description && (
        <p className="mt-8 text-lg font-sans font-light text-stone-400 tracking-wide border-t border-white/5 pt-6">
          {description}
        </p>
      )}
    </motion.div>
  );
};
