import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { hasChineseText, normalizeTranslationText } from "./translationText";
import { nativeLanguagePath, type PageLanguage } from "./pageLanguage";
import { isPublicationPage, publicationCopyEntries } from "./publicationCopy";
import { columnCopy } from "./columnCopy";

type ForeignLanguage = "en" | "ja" | "ko";
type State = { language: ForeignLanguage | null; status: "idle" | "loading" | "ready" | "error"; progress: number };
const names = { en: "English", ja: "日本語", ko: "한국어" };
const empty: State = { language: null, status: "idle", progress: 0 };
const Context = createContext({ ...empty, select: (_language: PageLanguage) => {} });
export const usePageTranslation = () => useContext(Context);
const cache = new Map<string, string>();
let cacheLoaded = false;
const isForeign = (value: unknown): value is ForeignLanguage => value === "en" || value === "ja" || value === "ko";

function loadCache() {
  if (cacheLoaded) return;
  cacheLoaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem("stt-public-translations-v1") ?? "[]");
    for (const [key, value] of saved) if (typeof key === "string" && typeof value === "string") cache.set(key, value);
  } catch { /* Persistent storage is optional. */ }
}
function saveCache() {
  try { localStorage.setItem("stt-public-translations-v1", JSON.stringify([...cache].slice(-2000))); } catch { /* Storage may be unavailable. */ }
}
function segments(text: string, limit: number) {
  const result: string[] = [];
  for (let start = 0; start < text.length; start += limit) result.push(text.slice(start, start + limit));
  return result;
}

export function PageTranslationProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState<State>(empty);
  const [retry, setRetry] = useState(0);
  const records = useRef(new Map<Text, { original: string; translated?: string }>());
  const active = useRef(0);
  const selected = new URLSearchParams(location.search).get("lang");
  const language = isForeign(selected) && !/^\/(en|ja|ko)(\/|$)/.test(location.pathname) ? selected : null;

  function restore() {
    for (const [node, value] of records.current) if (node.isConnected && node.nodeValue === value.translated) node.nodeValue = value.original;
    records.current.clear();
  }
  function select(next: PageLanguage) {
    if (next === language) { setRetry(value => value + 1); return; }
    const params = new URLSearchParams(location.search);
    if (next === "zh-Hant-TW") params.delete("lang"); else params.set("lang", next);
    navigate({ pathname: location.pathname, search: params.toString(), hash: location.hash }, { replace: true });
  }

  useEffect(() => {
    const job = ++active.current;
    restore();
    if (!language) { setState(empty); document.documentElement.lang = /^\/(en|ja|ko)(\/|$)/.exec(location.pathname)?.[1] ?? "zh-Hant-TW"; return; }
    loadCache();
    const fixedPublication = isPublicationPage(location.pathname);
    // Reviewed publication copy takes precedence over any older machine-translation cache.
    for (const [source, translated] of publicationCopyEntries(language)) cache.set(language + ":" + source, translated);
    for (const [source, translated] of Object.entries(columnCopy[language])) cache.set(language + ":" + source, translated);
    const root = document.getElementById("root");
    if (!root) return;
    const controller = new AbortController();
    let running = false;
    let rerun = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver((mutations) => {
      if (!mutations.some(mutation => {
        const target = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
        if (target?.closest("[data-stt-no-translate]")) return false;
        if (mutation.type === "childList" && [...mutation.addedNodes, ...mutation.removedNodes].every(node => node instanceof Element && node.matches("[data-stt-no-translate]"))) return false;
        return true;
      })) return;
      if (running) { rerun = true; return; }
      clearTimeout(timer);
      timer = setTimeout(() => void translate(), 180);
    });

    async function translate() {
      if (running || active.current !== job || controller.signal.aborted) return;
      running = true; rerun = false; observer.disconnect();
      const nodes: Array<{ node: Text; original: string; parts: string[] }> = [];
      const walker = document.createTreeWalker(root!, NodeFilter.SHOW_TEXT);
      let current: Node | null;
      while ((current = walker.nextNode())) {
        const node = current as Text;
        const parent = node.parentElement;
        if (!parent || parent.closest("script,style,noscript,textarea,input,code,pre,[contenteditable],[translate=no],[data-stt-no-translate],.stt-archive-copyright")) continue;
        const previous = records.current.get(node);
        const original = previous && node.nodeValue === previous.translated ? previous.original : node.nodeValue ?? "";
        if (!hasChineseText(original)) continue;
        records.current.set(node, { original, translated: previous?.translated });
        nodes.push({ node, original, parts: segments(normalizeTranslationText(original), 2500) });
      }
      const unique = [...new Set(nodes.flatMap(item => item.parts))];
      const missing = unique.filter(text => !cache.has(language + ":" + text));
      if (!nodes.length) { running = false; observer.observe(root!, { childList: true, subtree: true, characterData: true }); return; }
      observer.observe(root!, { childList: true, subtree: true, characterData: true });
      function applyAvailable() {
        if (active.current !== job || controller.signal.aborted) return;
        observer.disconnect();
        for (const { node, original, parts } of nodes) {
          if (!node.isConnected || parts.some(part => !cache.has(language + ":" + part))) continue;
          const previous = records.current.get(node);
          if (node.nodeValue !== original && node.nodeValue !== previous?.translated) { rerun = true; continue; }
          const gap = language === "en" || language === "ko" ? " " : "";
          const text = (original.match(/^\s*/)?.[0] || gap) + parts.map(part => cache.get(language + ":" + part)).join(" ") + (original.match(/\s*$/)?.[0] || gap);
          node.nodeValue = text;
          records.current.set(node, { original, translated: text });
        }
        observer.observe(root!, { childList: true, subtree: true, characterData: true });
      }
      const progress = () => Math.round(unique.filter(text => cache.has(language + ":" + text)).length * 100 / unique.length);
      try {
        if (fixedPublication && missing.length) {
          console.error("Missing publication translations", missing);
          throw new Error("Publication translation coverage is incomplete");
        }
        // The reader can start with completed paragraphs immediately. A later
        // footer or provider failure must never discard the translated article.
        applyAvailable();
        if (missing.length) setState({ language, status: "loading", progress: progress() });
        const batches: string[][] = [];
        for (let i = 0; i < missing.length;) {
          const batch: string[] = []; let count = 0;
          while (i < missing.length && batch.length < 80 && count + missing[i].length <= 3000) { count += missing[i].length; batch.push(missing[i++]); }
          batches.push(batch);
        }
        let cursor = 0;
        const failures: unknown[] = [];
        async function worker() {
          while (cursor < batches.length && active.current === job && !controller.signal.aborted) {
            const batch = batches[cursor++];
            for (let attempt = 0; attempt < 3; attempt++) {
            try {
              const response = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.any([controller.signal, AbortSignal.timeout(105000)]), body: JSON.stringify({ language, texts: batch }) });
              const result = await response.json();
              if (!response.ok) throw Object.assign(new Error(result.error || "Translation incomplete"), {
                retryAfterMs: response.status === 429 ? Math.max(60, Number(result.retryAfterSeconds) || 60) * 1000 : 15000 * (attempt + 1),
                permanent: response.status >= 400 && response.status < 500 && response.status !== 429,
              });
              if (!Array.isArray(result.translations) || result.translations.length !== batch.length || result.translations.some((value: unknown) => typeof value !== "string" || !value)) throw new Error("Translation incomplete");
              if (active.current !== job || controller.signal.aborted) return;
              batch.forEach((text, index) => cache.set(language + ":" + text, result.translations[index]));
              applyAvailable();
              // Preserve each successful batch even if a later paragraph fails.
              saveCache();
              setState({ language, status: "loading", progress: progress() });
              break;
            } catch (error) {
              if (controller.signal.aborted || active.current !== job) return;
              const failure = error as { permanent?: boolean; retryAfterMs?: number };
              if (attempt === 2 || failure.permanent) { failures.push(error); break; }
              await new Promise(resolve => setTimeout(resolve, failure.retryAfterMs || 15000 * (attempt + 1)));
            }
            }
          }
        }
        // Serial requests avoid exhausting the provider quota while reading a long column.
        await worker();
        if (failures.length) throw failures[0];
        if (active.current !== job || controller.signal.aborted) return;
        applyAvailable();
        document.documentElement.lang = language!;
        // Keep the current page most recent so reloading a long article does not
        // evict its own translations from the bounded persistent cache.
        for (const source of unique) {
          const key = language + ":" + source;
          const value = cache.get(key);
          if (value !== undefined) { cache.delete(key); cache.set(key, value); }
        }
        saveCache();
        setState({ language, status: "ready", progress: 100 });
      } catch {
        if (!controller.signal.aborted && active.current === job) { applyAvailable(); saveCache(); setState({ language, status: "error", progress: progress() }); }
      } finally {
        running = false;
        if (!controller.signal.aborted && active.current === job) { observer.observe(root!, { childList: true, subtree: true, characterData: true }); if (rerun) timer = setTimeout(() => void translate(), 180); }
      }
    }
    timer = setTimeout(() => void translate(), 50);
    const continueLanguage = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download") || anchor.closest("[data-stt-no-translate]")) return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || url.pathname.startsWith("/humanistic-interview") || /\.[a-z\d]+$/i.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.hash) return;
      event.preventDefault(); event.stopPropagation();
      const native = nativeLanguagePath(url.pathname, language);
      if (native) { url.pathname = native; url.searchParams.delete("lang"); } else url.searchParams.set("lang", language);
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", continueLanguage, true);
    return () => { active.current++; controller.abort(); clearTimeout(timer); observer.disconnect(); document.removeEventListener("click", continueLanguage, true); restore(); };
  }, [location.pathname, location.search, language, navigate, retry]);
  return <Context.Provider value={{ ...state, select }}>{children}</Context.Provider>;
}

export function PageTranslationStatus() {
  const state = usePageTranslation();
  if (!state.language) return null;
  return <div className="stt-translation-status" data-stt-no-translate="true" translate="no" role="status" aria-live="polite">
    <span>{state.status === "loading" ? `正在翻譯為 ${names[state.language]}… ${state.progress}%` : state.status === "error" ? `翻譯已完成 ${state.progress}%；其餘段落暫保留原文。` : `${names[state.language]} · AI 翻譯｜以繁體中文原文為準`}</span>
    {state.status === "error" && <button type="button" onClick={() => state.select(state.language!)}>繼續翻譯</button>}
    <button type="button" onClick={() => state.select("zh-Hant-TW")}>繁體中文</button>
  </div>;
}
