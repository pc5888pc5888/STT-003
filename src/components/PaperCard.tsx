import { motion } from "motion/react";
import { Eye } from "lucide-react";

interface Paper {
  id: string;
  title: string;
  enTitle: string;
  description: string;
  cover: string;
  type?: string;
  previewUrl?: string;
  downloadUrl?: string;
}

interface PaperCardProps {
  paper: Paper;
  index: number;
  key?: string | number;
}

export function PaperCard({ paper, index }: PaperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group ornate-frame p-8 md:p-12 hover:bg-gold-400/[0.02] transition-colors border border-gold-400/5 hover:border-gold-400/20"
      id={`paper-card-${paper.id}`}
    >
      <div className="flex flex-col xl:flex-row gap-12">
        {/* Paper Image */}
        <div className="xl:w-1/4 shrink-0 flex justify-center xl:justify-start">
          <div className="relative w-48 xl:w-full aspect-[3/4] group/image overflow-hidden shadow-2xl">
            <img 
              src={paper.cover} 
              alt={paper.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-12">
          <div className="space-y-8 max-w-4xl">
            <div className="space-y-4">
              <h3 className="text-3xl font-display font-light text-[#F8F7F4] group-hover:text-gold-metallic transition-colors leading-tight">
                {paper.title}
              </h3>
              <p className="text-gold-400/30 font-mono text-[10px] tracking-widest uppercase font-light">{paper.enTitle}</p>
            </div>
            <p className="text-gold-200/40 text-lg font-display font-light leading-relaxed border-l border-gold-400/10 pl-8">
              {paper.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {paper.previewUrl && (
              <a 
                href={paper.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="prestige-button flex items-center gap-3 py-4 px-8 text-[10px] bg-gold-400 text-black hover:bg-gold-500 transition-all font-black tracking-[0.2em] uppercase no-underline"
                id={`read-online-${paper.id}`}
              >
                <Eye className="h-4 w-4" /> 線上閱讀
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
