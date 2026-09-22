const TITLE_BREAK_MARKS = ["，", "。", "；", "：", "！", "？", "｜", ",", ";", ":", "!", "?", "|"] as const;

export function splitTitleAtFirstPunctuation(title: string): string[] {
  const text = title.trim();
  if (!text) return [text];

  let firstIndex = -1;
  for (const mark of TITLE_BREAK_MARKS) {
    const index = text.indexOf(mark);
    if (index >= 0 && (firstIndex < 0 || index < firstIndex)) firstIndex = index;
  }

  if (firstIndex < 0 || firstIndex >= text.length - 1) return [text];

  const first = text.slice(0, firstIndex + 1).trim();
  const second = text.slice(firstIndex + 1).trim();
  return second ? [first, second] : [text];
}
