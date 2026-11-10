"""Extract the existing article heading into a shared, presentation-only model."""
import html
import re

TITLE_CLASSES = {'cover-title', 'stt-cover-title', 'stt-hl-title'}
SUBTITLE_CLASSES = {'article-subtitle', 'cover-h1-sub', 'subtitle', 'cover-sub',
    'cover-subtitle1', 'cover-sub-desc', 'stt-cover-subtitle', 'stt-cover-title2',
    'stt-cover-topic2', 'stt-hl-subtitle'}
BRANDING = re.compile(r'LEGAL COLUMN|法律專欄[:：｜|]|本法律專欄|M\s*傳媒|撰稿\s*[/／｜]|採訪撰文|專題報導|本文(?:由|以)|^莊\s*鈞\s*翔|^Corporate |^Eric Chuang|^企業法律(?:戰略|策略)[、・].*(?:治理|重構)|^【產業報導】', re.I)
CREDIT = re.compile(r'特約採訪|特約.*評論|^[《【\s]*台中(?:採訪報導|訊)|^文\s*[/／]|^(?:中華企業.+?創會理事長|公司治理法律專欄作家)\s*莊\s*鈞\s*翔|^[\[［].*莊鈞翔博士親自領航|^【焦點新聞】|^Chuang Chun|^中華企業.+?創會理事長$|^STT Group|^發布日期', re.I)

def text(source):
    return ' '.join(html.unescape(re.sub(r'<[^>]+>', '', source)).split())

def lines(node, source):
    return [value for chunk in re.split(r'<br\s*/?>', source[node.open_end:node.end], flags=re.I) if (value := text(chunk))]

def extract_intro(article, nodes, source):
    titles, subtitles, subjects, notes = [], [], [], []
    title_node = None
    all_nodes = []
    def visit(node):
        all_nodes.append(node)
        for child in node.children:
            visit(child)
    for node in nodes:
        visit(node)
    structured = len(nodes) == 1 and nodes[0].tag in {'section', 'header', 'div'}
    for node in all_nodes if structured else []:
        classes = set(node.attrs.get('class', '').split())
        if not title_node and (TITLE_CLASSES & classes or node.tag in {'h1','h2','h3','h4','h5'}):
            title_node = node
    if title_node:
        parts = lines(title_node, source)
        titles = parts[:1]
        subtitles += parts[1:]
        for node in all_nodes:
            if SUBTITLE_CLASSES & set(node.attrs.get('class', '').split()):
                for value in lines(node, source):
                    if value.startswith('〖') and '專訪' in value:
                        subjects.append(value)
                    elif not BRANDING.search(value):
                        subtitles.append(value)
    else:
        for node in nodes:
            # Structured cover titles are handled above; these are flat Word headings.
            for value in lines(node, source):
                if not BRANDING.search(value) and not CREDIT.search(value):
                    if not titles:
                        titles.append(value)
                    else:
                        subtitles.append(value)
    if not titles:
        fallback = re.sub(r'^【\s*法律專欄[^】]*】\s*(?:莊博士策略判讀\s*[|｜]\s*)?', '', article['title'])
        titles = [fallback]
    subtitles = [value for value in subtitles if not BRANDING.search(value) and not CREDIT.search(value)]
    if article['series'] == 'humanistic':
        for value in subtitles[:]:
            if value.startswith(('【', '〖')) and '專訪' in value:
                subjects.append(value)
                subtitles.remove(value)
    for node in all_nodes:
        if any('本文' in child.text and 'AI' in child.text for child in node.children):
            continue
        value = ' '.join(node.text.split())
        if '本文' in value and 'AI' in value:
            note = value[value.index('本文'):]
            if note not in notes:
                notes.append(note)
    return {'title': titles[0], 'subtitles': list(dict.fromkeys(subtitles)),
            'subjects': list(dict.fromkeys(subjects)), 'editorialNotes': notes}
