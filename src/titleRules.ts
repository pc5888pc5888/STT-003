const TITLE_SELECTORS = [
  "h1",
  "h2",
  ".stt-canon-sub",
  "[data-stt-title-sentence]",
].join(",");

function sentenceCount(text: string) {
  return (text.match(/。/g) || []).length;
}

function applySentenceBreak(el: HTMLElement) {
  if (el.dataset.sttSentenceBreak === "1") return;
  if (el.children.length > 0 && !el.hasAttribute("data-stt-title-sentence")) return;

  const text = (el.textContent || "").trim();
  if (!text || sentenceCount(text) < 2) return;

  const firstStop = text.indexOf("。");
  if (firstStop < 0 || firstStop >= text.length - 1) return;

  const first = text.slice(0, firstStop + 1).trim();
  const second = text.slice(firstStop + 1).trim();
  if (!second) return;

  const firstLine = document.createElement("span");
  firstLine.className = "stt-title-line";
  firstLine.textContent = first;

  const secondLine = document.createElement("span");
  secondLine.className = "stt-title-line";
  secondLine.textContent = second;

  el.dataset.sttSentenceBreak = "1";
  el.replaceChildren(firstLine, secondLine);
}

function applyTitleRules() {
  document.querySelectorAll<HTMLElement>(TITLE_SELECTORS).forEach(applySentenceBreak);
}

let queued = false;
function scheduleTitleRules() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    applyTitleRules();
  });
}

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", scheduleTitleRules, { once: true });
  new MutationObserver(scheduleTitleRules).observe(document.documentElement, {
    subtree: true,
    childList: true,
  });
  scheduleTitleRules();
}
