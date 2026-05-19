import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, FileText, Calendar, ExternalLink } from 'lucide-react';
import { fullArticleIndex } from '../data/fullIndex';

const ArticleIndex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndex = fullArticleIndex.map(section => ({
    ...section,
    articles: section.articles.filter(article => 
      article.id.includes(searchQuery) || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  return (
    <div id="article-index-page" className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm mb-6">
            <FileText className="w-4 h-4" />
            <span className="tracking-widest uppercase">Content Archive</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white mb-6 tracking-tight leading-[1.2] md:leading-tight px-2">
            <span className="inline-block">莊博士策略判讀</span> <span className="text-gold-metallic inline-block">專欄精選索引目錄</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            持續收錄莊博士專業策略專欄，涵蓋企業策略、公司治理、法律法遵與數位轉型等核心深研領域。
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-white/40" />
          </div>
          <input
            type="text"
            placeholder="搜尋文章標題或編號 (例如: 001 或 數位治理)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all text-lg"
          />
        </div>

        {/* Index List */}
        <div className="space-y-12">
          {filteredIndex.length > 0 ? (
            filteredIndex.map((section, sIdx) => (
              <motion.div
                key={section.period}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sIdx * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10"></div>
                  <h2 className="text-gold-400/60 font-display text-sm tracking-widest uppercase flex items-center gap-3">
                    <Calendar className="w-4 h-4" />
                    {section.period}
                  </h2>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <div className="grid gap-3">
                  {section.articles.map((article) => {
                    const articleLink = article.url || `https://www.google.com/search?q=site:94m.com.tw+"${encodeURIComponent(article.title)}"`;
                    
                    return (
                      <a
                        key={article.id}
                        href={articleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                      >
                        <span className="text-gold-400 font-mono text-sm mt-1 flex-shrink-0 w-8">
                          {article.id}
                        </span>
                        <h3 className="text-white/80 group-hover:text-white transition-colors text-lg leading-snug flex-1">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] text-gold-400/50 uppercase tracking-tighter">Read Content</span>
                          <ExternalLink className="w-4 h-4 text-gold-400" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
              <p className="text-white/40 italic">未找到相符的文章。請嘗試不同的關鍵字。</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm font-light italic">
            © 2026 莊鈞翔博士 Chuang Chun-Hsiang, Ph.D. | 點擊標題即可連結至原始專欄頁面
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleIndex;
