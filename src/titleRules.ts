import { splitTitleAtFirstPunctuation } from "./utils/titleBreak";

const TITLE_SELECTORS = ["main h1", "main h2", "[data-stt-title-auto]"].join(",");

function naturalLineCount(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  const fontSize = parseFloat(style.fontSize) || 16;
  const rawLineHeight = parseFloat(style.lineHeight);
  const lineHeight = Number.isFinite(rawLineHeight) ? rawLineHeight : fontSize * 1.2;
  const height = el.getBoundingClientRect().height;
  return Math.max(1, Math.round(height / lineHeight));
}

function isReactGovernedTitle(el: HTMLElement) {
  return Boolean(
    el.querySelector(".stt-editorial-title-line, .stt-intake-title-line")
  );
}

function applyTitleBreak(el: HTMLElement) {
  if (isReactGovernedTitle(el)) return;

  const currentText = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (!currentText) return;

  let original = el.dataset.sttOriginalTitle || currentText;
  if (currentText !== original) {
    original = currentText;
    el.dataset.sttOriginalTitle = original;
    el.dataset.sttTitleState = "single";
    delete el.dataset.sttTitleSignature;
  } else if (!el.dataset.sttOriginalTitle) {
    el.dataset.sttOriginalTitle = original;
  }

  const width = Math.round(el.getBoundingClientRect().width);
  const signature = `${width}|${original}`;
  if (el.dataset.sttTitleSignature === signature) return;

  if (el.dataset.sttTitleState === "split") {
    el.textContent = original;
  }

  const shouldSplit =
    el.hasAttribute("data-stt-force-title-break") || naturalLineCount(el) > 1;
  const governedLines = splitTitleAtFirstPunctuation(original);

  if (shouldSplit && governedLines.length === 2) {
    const firstLine = document.createElement("span");
    firstLine.className = "stt-title-line";
    firstLine.textContent = governedLines[0];

    const secondLine = document.createElement("span");
    secondLine.className = "stt-title-line";
    secondLine.textContent = governedLines[1];

    el.replaceChildren(firstLine, secondLine);
    el.dataset.sttTitleState = "split";
  } else {
    el.textContent = original;
    el.dataset.sttTitleState = "single";
  }

  el.dataset.sttTitleSignature = signature;
}

function applyTitleRules() {
  document.querySelectorAll<HTMLElement>(TITLE_SELECTORS).forEach(applyTitleBreak);
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
  window.addEventListener("resize", () => {
    document
      .querySelectorAll<HTMLElement>(TITLE_SELECTORS)
      .forEach((el) => delete el.dataset.sttTitleSignature);
    scheduleTitleRules();
  });

  new MutationObserver(scheduleTitleRules).observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
  });

  scheduleTitleRules();
}
