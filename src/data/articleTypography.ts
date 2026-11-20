// Work with the original markup, so imported links, emphasis and image assets
// remain byte-for-byte intact. This is applied only to the reading display.
const attributes = String.raw`(?:"[^"]*"|'[^']*'|[^'">])*`;
const paragraph = new RegExp(`(<p(?=\\s|>)${attributes}>)([\\s\\S]*?)(<\\/p\\s*>)`, 'gi');
const inlineOpeningTag = new RegExp(`^<(?:span|strong|b|em|i|a|font|u)(?=\\s|/?>)${attributes}>`, 'i');
const leadingSpace = /^(?:[\t\n\r\f \u00a0\u3000]|&nbsp;|&#0*(?:9|10|12|13|32|160|12288);|&#x0*(?:9|a|c|d|20|a0|3000);)+/i;
const entities: Record<string, string> = { '&quot;': '"', '&apos;': "'", '&amp;': '&', '&lt;': '<', '&gt;': '>' };

function plainText(text: string): string {
  return text.replace(/&#(x[\da-f]+|\d+);/gi, (entity, code: string) => {
    const point = code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : parseInt(code, 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
  }).replace(/&(nbsp|ensp|emsp|thinsp);/gi, ' ')
    .replace(/&(?:quot|apos|amp|lt|gt);/gi, entity => entities[entity.toLowerCase()] ?? entity);
}

/** Recognize only fully bold, explicitly labelled short editorial headings. */
function isEditorialHeading(body: string): boolean {
  const tags = new RegExp(`<(/?)([a-z][\\w-]*)${attributes}>`, 'gi');
  const stack: string[] = [];
  let cursor = 0;
  let text = '';
  let valid = true;
  const readText = (value: string) => {
    const decoded = plainText(value);
    if (decoded.trim() && !stack.some(tag => tag === 'strong' || tag === 'b')) valid = false;
    text += decoded;
  };
  for (const tag of body.matchAll(tags)) {
    readText(body.slice(cursor, tag.index));
    const name = tag[2].toLowerCase();
    if (!['span', 'font', 'strong', 'b'].includes(name)) return false;
    if (tag[1]) {
      if (stack.pop() !== name) return false;
    } else stack.push(name);
    cursor = tag.index! + tag[0].length;
  }
  readText(body.slice(cursor));
  text = text.trim();
  if (!valid || stack.length || !text || [...text].length > 70) return false;
  // Sentences, quotations and multi-line bold passages remain prose.
  if (/[。；;！？!?「」『』“”\n\r]/u.test(text)) return false;
  return /^(?:[一二三四五六七八九十百]+|[0-9０-９]{1,2})[、．.]\s*\S/u.test(text)
    || /^[（(](?:[一二三四五六七八九十百]+|[0-9０-９]{1,2})[)）]\s*\S/u.test(text)
    || /^第[一二三四五六七八九十百〇零0-9０-９]+(?:章|節|部分)(?:[：:、．.]\s*|\s+)\S/u.test(text)
    || /^實務挑戰[一二三四五六七八九十0-9０-９]+\s*[：:]\s*\S/u.test(text)
    || /^(?:前言|引言|摘要|結語|結論|導言|後記|小結|總結)(?:[：:]\s*\S|$)/u.test(text);
}

function hasExplicitAlignment(openingTag: string): boolean {
  const attribute = /([^\s=<>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of openingTag.matchAll(attribute)) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    if (name === 'align' && /^(?:center|right|end)$/i.test(value.trim())) return true;
    if (name === 'style' && /(?:^|;)\s*text-align\s*:\s*(?:center|right|end)\s*(?:!important\s*)?(?:;|$)/i.test(value)) return true;
  }
  return false;
}

/**
 * Remove hand-entered paragraph indentation before CSS supplies the indent.
 * Only leading whitespace is removed, including whitespace inside initial
 * inline wrappers. Explicitly labelled, fully bold short headings receive a
 * display-only role marker. Original attributes, element order and intentional
 * paragraph alignment are preserved. Archived sources and rules are unchanged.
 */
export function normalizeArticleParagraphIndentation(html: string): string {
  return html.replace(paragraph, (_match, opening: string, body: string, closing: string) => {
    if (hasExplicitAlignment(opening)) return opening + body + closing;
    if (!/\bdata-stt-prose-role\s*=/i.test(opening) && isEditorialHeading(body)) {
      opening = opening.replace(/>$/, ' data-stt-prose-role="heading">');
    }
    let offset = 0;
    let wrappers = '';
    while (offset < body.length) {
      const remaining = body.slice(offset);
      const space = remaining.match(leadingSpace);
      if (space) {
        offset += space[0].length;
        continue;
      }
      const tag = remaining.match(inlineOpeningTag);
      if (!tag) break;
      wrappers += tag[0];
      offset += tag[0].length;
    }
    return opening + wrappers + body.slice(offset) + closing;
  });
}
