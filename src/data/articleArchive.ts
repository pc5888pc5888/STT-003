import index from '../../public/data/article-index.json';

export type ArticleRecord = typeof index[number] & {
  sourcePublisher?: string;
  sourceRelation?: 'external' | 'stt';
};
export const ARTICLE_INDEX = index as ArticleRecord[];
export type ArticleDocument = ArticleRecord & {
  html: string;
  css: string;
  toc: Array<{ id: string; title: string; level: number }>;
};
export const ARTICLE_BY_PATH = Object.fromEntries(ARTICLE_INDEX.map(article => [article.path, article]));
export function articleSchema(article: ArticleRecord) {
  const origin = 'https://stt-003.vercel.app';
  const datePublished = /^\d{4}[/-]\d{2}[/-]\d{2}$/.test(article.date)
    ? article.date.replaceAll('/', '-')
    : article.date.replaceAll('/', '-').replace(' ', 'T') + ':00+08:00';
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, author: { '@type': 'Person', name: article.author, url: origin + '/eric-chuang' },
    datePublished,
    inLanguage: 'zh-Hant-TW', url: origin + article.path,
    mainEntityOfPage: origin + article.path,
    image: origin + article.cover.src,
    publisher: { '@type': 'Organization', name: 'STT Governance｜策略智庫智慧治理', url: origin },
    ...(article.sourceRelation !== 'stt' ? {
      isBasedOn: { '@type': 'Article', url: article.sourceUrl, publisher: { '@type': 'Organization', name: article.sourcePublisher || 'M 傳媒' } },
    } : {}),
    isPartOf: { '@type': 'CollectionPage', name: '專欄與報導', url: origin + '/columns' },
  };
}
