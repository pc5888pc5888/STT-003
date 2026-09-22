const TITLE_BREAK_MARKS = ["，", "；", "：", "！", "？", "｜", ",", ";", ":", "!", "?", "|"] as const;

type Candidate = {
  index: number;
  firstLength: number;
  secondLength: number;
  balance: number;
};

export function splitTitleAtBalancedPunctuation(title: string): string[] {
  const text = title.trim();
  if (!text) return [text];

  const midpoint = text.length / 2;
  const candidates: Candidate[] = [];

  for (let index = 0; index < text.length - 1; index += 1) {
    const char = text[index];
    if (!TITLE_BREAK_MARKS.includes(char as (typeof TITLE_BREAK_MARKS)[number])) continue;

    const first = text.slice(0, index + 1).trim();
    const second = text.slice(index + 1).trim();
    if (!first || !second) continue;

    const firstLength = first.length;
    const secondLength = second.length;
    const shortestRatio = Math.min(firstLength, secondLength) / Math.max(firstLength, secondLength);

    candidates.push({
      index,
      firstLength,
      secondLength,
      // Prefer punctuation nearest the visual midpoint, while strongly avoiding
      // a very short first or second line.
      balance: Math.abs(index + 1 - midpoint) + (shortestRatio < 0.45 ? 10 : 0),
    });
  }

  if (!candidates.length) return [text];

  candidates.sort((a, b) => {
    if (a.balance !== b.balance) return a.balance - b.balance;
    // If two punctuation marks are equally balanced, prefer the later one so
    // the first line remains semantically complete rather than fragmentary.
    return b.index - a.index;
  });

  const breakIndex = candidates[0].index;
  return [
    text.slice(0, breakIndex + 1).trim(),
    text.slice(breakIndex + 1).trim(),
  ];
}
