"""Generate audited display edits; the imported source documents stay unchanged.

Run from the repository root after importing articles. Offsets are JavaScript
UTF-16 offsets, not Python code-point offsets. No rewriting of article prose.
"""
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from article_intro import extract_intro

VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
BLOCK = set('p div section article table h1 h2 h3 h4 h5 h6 header footer blockquote'.split())
MARKER = re.compile(r'企業策略軍師介紹|法律專欄作者介紹|作者介紹|關於作者|About\s+(?:The\s+)?Author|Corporate Governance Strategist|著作權聲明與權利保障|版權所有\s*©|企業策略軍師智慧錦囊', re.I)
BANNERS = {
    '/article-images/8c8e3228fa2f2af8.jpg', '/article-images/dfeef4805eb401b9.jpg',
    '/article-images/da68e3e6d7f58be9.jpg', '/article-images/92d14e2c280d82c1.png',
    '/article-images/d6a09d1eb675a5c0.png', '/article-images/43a7e3d671a53feb.png',
}
INTRO_CLASSES = {'article-intro', 'stt-hl-intro', 'stt-hl-article-head', 'cover', 'stt-cover',
                 'stt-hl-title', 'stt-hl-subtitle', 'stt-hl-byline'}

class Node:
    def __init__(self, tag, attrs, start, open_end, parent):
        self.tag, self.attrs, self.start, self.open_end = tag, dict(attrs), start, open_end
        self.parent, self.children, self.end = parent, [], None
        self.text = ''

class Parser(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.lines = [0]
        self.lines.extend(m.end() for m in re.finditer('\n', source))
        self.root = Node('root', [], 0, 0, None)
        self.stack, self.nodes = [self.root], []
        self.feed(source)
        assert len(self.stack) == 1, 'Unbalanced source HTML'
        self.root.end = len(source)
    def cursor(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column
    def handle_starttag(self, tag, attrs):
        start = self.cursor()
        node = Node(tag, attrs, start, start + len(self.get_starttag_text()), self.stack[-1])
        self.stack[-1].children.append(node)
        self.nodes.append(node)
        if tag in VOID:
            node.end = node.open_end
        else:
            self.stack.append(node)
    def handle_endtag(self, tag):
        assert self.stack[-1].tag == tag, (tag, self.stack[-1].tag)
        self.stack.pop().end = self.source.index('>', self.cursor()) + 1
    def handle_data(self, data):
        for node in self.stack:
            node.text += data

def normalized(text):
    return ' '.join(text.split())

def visible(source):
    return normalized(html.unescape(re.sub(r'<[^>]+>', '', re.sub(r'<!--.*?-->', '', source, flags=re.S))))

def outer_blank_parent(node, source):
    while node.parent.tag != 'root' and not visible(source[node.parent.open_end:node.start]):
        node = node.parent
    return node

rules, review, intro_review = {}, [], []
for file in sorted(Path('public/data/articles').glob('*.json')):
    article = json.loads(file.read_text())
    source = article['html']
    parsed = Parser(source)
    edits = []
    candidates = [n for n in parsed.nodes if MARKER.search(n.text) and not any(MARKER.search(c.text) for c in n.children)]
    # This template uses a portrait/signature footer without an author-heading label.
    # Its responsibility notes precede this shell and must remain in the article.
    candidates.extend(n for n in parsed.nodes if 'author-shell' in n.attrs.get('class', '').split())
    # Match the historical promotional footer of this book announcement.
    if article['id'] == '3fba5a':
        candidates.extend(n for n in parsed.nodes if n.tag == 'p' and ''.join(n.text.split()) == '延伸閱讀')
    # Remove only the three audited legacy promotional footers.
    if article['id'] in {'8754db', 'c9e732', '678767'}:
        candidates.extend(n for n in parsed.nodes if n.tag == 'p' and ''.join(n.text.split()).startswith('中華企業永續策略續發展學會'))
    cutoff = len(source)
    if candidates:
        # One historical article repeats an English role label in its introduction.
        candidates = [n for n in candidates if not (article['id'] == '87a4b7' and n.start < len(source) // 2)]
        first = min(candidates, key=lambda n: n.start)
        while first.tag not in BLOCK:
            first = first.parent
        first = outer_blank_parent(first, source)
        cutoff = first.start
        assert len(visible(source[:cutoff])) > 200, article['id']
        parent, closing = first.parent, ''
        while parent.tag != 'root':
            closing += '</' + parent.tag + '>'
            parent = parent.parent
        # This source places its author-responsibility note after the biography.
        # Retain the note, moving it immediately after the article body.
        if article['id'] == '4ae15d':
            note = next(n for n in parsed.nodes if n.tag == 'p' and n.start > cutoff and '本文由作者構思指導、AI' in n.text)
            closing = re.sub(r'<br>\s*©[^<]*', '', source[note.start:note.end]) + closing
        edits.append((cutoff, len(source), closing))
        review.append({'id': article['id'], 'cutTag': first.tag, 'cutClass': first.attrs.get('class', ''),
                       'before': visible(source[:cutoff])[-160:], 'removedStart': visible(source[cutoff:])[:170],
                       'bodyChars': len(visible(source[:cutoff])), 'removedChars': len(visible(source[cutoff:]))})
    for node in parsed.nodes:
        if node.start >= cutoff:
            continue
        if node.tag == 'img' and node.attrs.get('src') in BANNERS:
            container = node
            while container.parent.tag != 'root' and not normalized(container.parent.text) and container.parent.end <= cutoff:
                container = container.parent
            edits.append((container.start, container.end, ''))
        if INTRO_CLASSES.intersection(node.attrs.get('class', '').split()):
            # Give the source introduction a stable hook without changing its text.
            edits.append((node.open_end - 1, node.open_end - 1, ' data-stt-intro="true"'))
        if node.tag == 'p' and normalized(node.text).startswith('©'):
            edits.append((node.start, node.end, ''))
    # Older templates append a copyright sentence to an otherwise necessary AI note.
    # Replace only that sentence; keep the entire responsibility statement.
    for match in re.finditer(r'([。，])著作權100%歸屬於莊鈞翔博士，版權所有，轉載必究。', source[:cutoff]):
        edits.append((match.start(), match.end(), '。'))
    # Word-era articles have flat title/byline paragraphs instead of an intro wrapper.
    if not any(INTRO_CLASSES.intersection(n.attrs.get('class', '').split()) for n in parsed.nodes):
        prefix = []
        for node in parsed.nodes:
            if node.tag not in {'p', 'h2', 'h3', 'h4', 'h5'}:
                continue
            text = normalized(node.text)
            if not text:
                continue
            if len(text) > 110 or re.match(r'^[▍【\s]*(?:引\s*言|摘\s*要)', text):
                break
            prefix.append(node)
            if len(prefix) == 12:
                break
        bylines = [i for i, n in enumerate(prefix) if re.search(r'撰稿|採訪|專欄作者|莊\s*鈞\s*翔|本文由作者|Eric Chuang', n.text, re.I)]
        for node in prefix[:(max(bylines) + 1 if bylines else 1)]:
            edits.append((node.open_end - 1, node.open_end - 1, ' data-stt-intro="true"'))
    # Replace the source's many incompatible heading templates with one shared header.
    starts = {a for a, b, value in edits if value == ' data-stt-intro="true"'}
    intro_nodes = [n for n in parsed.nodes if n.open_end - 1 in starts]
    if article['id'] == '678767':
        intro_nodes = [next(n for n in parsed.nodes if n.tag == 'p')]
    if article['id'] == '4ae15d':
        body_start = next(n.start for n in parsed.nodes if n.tag == 'h3' and n.text.startswith('序言'))
        intro_nodes = [n for n in parsed.nodes if n.start < body_start and n.tag in {'p', 'h2', 'h3', 'hr'}]
    intro_nodes = [n for n in intro_nodes if not any(other.start < n.start and other.end >= n.end for other in intro_nodes)]
    intro = extract_intro(article, intro_nodes, source)
    edits = [edit for edit in edits if edit[2] != ' data-stt-intro="true"']
    for node in intro_nodes:
        edits.append((node.start, node.end, ''))
    for node in parsed.nodes:
        if node.attrs.get('class') == 'stt-source-document-title':
            edits.append((node.start, node.end, ''))
        if node.tag == 'p' and node.attrs.get('class') == 'byline' and normalized(node.text).upper() == 'CORPORATE GOVERNANCE STRATEGIST & ARCHITECT OF INTERNAL COMPLIANCE':
            edits.append((node.start, node.end, ''))
    edits.sort()
    for a, b in zip(edits, edits[1:]):
        assert a[1] <= b[0], (article['id'], a, b)
    result = source
    for start, end, replacement in reversed(edits):
        result = result[:start] + replacement + result[end:]
    Parser(result)
    # The existing endnotes often already contain the introduction's AI disclosure.
    # Keep those original endnotes and append a disclosure only when it is absent.
    if re.search(r'本文(?:由|以)[^。]{0,160}AI[^。]{0,160}(?:審|輔助|作者)', visible(result)):
        intro['editorialNotes'] = []
    intro_review.append({'id': article['id'], **intro, 'removedBlocks': len(intro_nodes)})
    removed_ids = [t['id'] for t in article['toc'] if not re.search(r'\bid="' + re.escape(t['id']) + '"', result)]
    def units(index):
        return len(source[:index].encode('utf-16-le')) // 2
    rules[article['id']] = {'sourceSha256': hashlib.sha256(source.encode()).hexdigest(),
                            'sourceLength': units(len(source)), 'resultSha256': hashlib.sha256(result.encode()).hexdigest(),
                            'edits': [[units(a), units(b), text] for a, b, text in edits], 'removedTocIds': removed_ids,
                            'intro': intro}

Path('src/data/articleReadingRules.json').write_text(json.dumps(rules, ensure_ascii=False, separators=(',', ':')) + '\n')
Path('/tmp/stt-reading-review.json').write_text(json.dumps(review, ensure_ascii=False, indent=2))
Path('/tmp/stt-intro-review.json').write_text(json.dumps(intro_review, ensure_ascii=False, indent=2))
print(f'Generated reading rules for {len(rules)} articles; removed author tails in {len(review)} articles.')

