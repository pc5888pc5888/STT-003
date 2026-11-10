export const normalizeTranslationText = (value: string) => value.replace(/\s+/g, " ").trim();
export const hasChineseText = (value: string) => /[\u3400-\u9fff]/u.test(value);

const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ensp: " ", emsp: " ", ndash: "–", mdash: "—", hellip: "…", copy: "©", reg: "®", trade: "™", middot: "·", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", bull: "•" };
export function sourceTextFromHtml(html: string): string[] {
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .split(/<[^>]*>/g).map(text => normalizeTranslationText(text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
      if (code.startsWith("#")) {
        const point = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
        return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
      }
      return entities[code] ?? entity;
    }))).filter(text => text && hasChineseText(text));
}
