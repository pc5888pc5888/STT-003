import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Copy } from 'lucide-react';
import { STT_CANONICAL_ORIGIN } from '../seo';

const labels = {
  zh: { copy: '複製本文網址', copied: '已複製本文網址', manual: '請複製下方網址', url: '本文網址' },
  en: { copy: 'Copy article link', copied: 'Article link copied', manual: 'Copy the link below', url: 'Article link' },
  ja: { copy: '記事のURLをコピー', copied: '記事のURLをコピーしました', manual: '下のURLをコピーしてください', url: '記事のURL' },
  ko: { copy: '기사 링크 복사', copied: '기사 링크를 복사했습니다', manual: '아래 링크를 복사하세요', url: '기사 링크' },
};

export default function ArticleShare({ path }: { path: string }) {
  const { search } = useLocation();
  const selected = new URLSearchParams(search).get('lang');
  const language = selected === 'en' || selected === 'ja' || selected === 'ko' ? selected : 'zh';
  const url = STT_CANONICAL_ORIGIN + path + (language === 'zh' ? '' : '?lang=' + language);
  const text = labels[language];
  const [result, setResult] = useState<{ url: string; copied: boolean } | null>(null);
  const manualInput = useRef<HTMLInputElement>(null);
  const current = result?.url === url ? result : null;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setResult({ url, copied: true });
    } catch {
      setResult({ url, copied: false });
      requestAnimationFrame(() => {
        manualInput.current?.focus();
        manualInput.current?.select();
      });
    }
  }

  return <div className="stt-article-share" data-stt-no-translate>
    <button type="button" onClick={copyLink}><Copy size={17} aria-hidden="true" />{text.copy}</button>
    <span role="status">{current && (current.copied ? text.copied : text.manual)}</span>
    {current && !current.copied && <input type="url" ref={manualInput} aria-label={text.url}
      readOnly value={url} onFocus={event => event.currentTarget.select()} />}
  </div>;
}
