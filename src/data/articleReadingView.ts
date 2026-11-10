import rulesData from './articleReadingRules.json';
import type { ArticleDocument } from './articleArchive';

type ReadingRule = {
  sourceSha256: string;
  sourceLength: number;
  resultSha256: string;
  edits: Array<[number, number, string]>;
  removedTocIds: string[];
  intro: {
    title: string;
    subtitles: string[];
    subjects: string[];
    editorialNotes: string[];
  };
};
export const ARTICLE_READING_RULES = rulesData as unknown as Record<string, ReadingRule>;
type ReadingDocument = ArticleDocument & { readingView?: true; intro?: ReadingRule['intro'] };

/** Display-only projection: source prose and the original import stay intact. */
export function articleReadingView(article: ReadingDocument): ReadingDocument {
  if (article.readingView) return article;
  const rule = ARTICLE_READING_RULES[article.id];
  if (!rule || article.html.length !== rule.sourceLength) throw new Error(`Article reading rules need review: ${article.id}`);
  let html = article.html;
  for (const [start, end, replacement] of [...rule.edits].reverse()) {
    html = html.slice(0, start) + replacement + html.slice(end);
  }
  return { ...article, html, intro: rule.intro, toc: article.toc.filter(item => !rule.removedTocIds.includes(item.id)), readingView: true };
}

export const ARTICLE_COPYRIGHT = '© 2026 莊鈞翔博士 CHUANG CHUN HSIANG Ph.D.｜STT Group Strategic Think Tank 策略智庫數位集團｜版權所有 Strategy・Governance・Compliance';
export const COLUMN_ARTWORK = {
  legal: { src: '/article-images/8c8e3228fa2f2af8.jpg', width: 1024, height: 736, alt: '莊鈞翔博士法律專欄｜以法律專業為基礎，以治理思維為高度' },
  humanistic: { src: '/article-images/43a7e3d671a53feb.png', width: 1672, height: 941, alt: '莊鈞翔博士人文地景產專欄｜人物 × 地方 × 產業 × 治理' },
};
