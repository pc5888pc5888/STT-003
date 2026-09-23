from pathlib import Path
from bs4 import BeautifulSoup, Comment
import re, json, hashlib, base64, html, sys, difflib
ROOT=Path(sys.argv[1]) if len(sys.argv)>1 else Path('.')
oldsite=ROOT/'public/legal-mortgage-preview/index.html'
template=ROOT/'legal-mortgage-preview/evidence/example.html'
bodyfile=ROOT/'legal-mortgage-preview/editorial-body.md'
out=ROOT/'legal-mortgage-preview/editorial-proof'
out.mkdir(parents=True,exist_ok=True)
oldsite_text=oldsite.read_text(encoding='utf-8')
olddata=json.loads(BeautifulSoup(oldsite_text,'html.parser').select_one('#article-data').string)
old=BeautifulSoup(olddata['fragment'],'html.parser')
original=BeautifulSoup(template.read_text(encoding='utf-8'),'html.parser')
soup=BeautifulSoup(olddata['fragment'],'html.parser')
body=soup.select_one('.article-body');body.clear()
paras=[];heading_map=[];quote_map=[]
byline='———　莊鈞翔博士，企業治理策略師・內在法遵架構者'
quotes={2:'房屋可以屬於自己，購屋所需的信用卻不能由自己決定；把銀行過去願意提供的條件理解為未來不變的權利，風險便開始累積。',38:'財富最深的防禦，並非使制度無法觸及自己，而是當制度與市場改變時，仍有能力履約、調整並保護家人的生活。'}
for raw in bodyfile.read_text(encoding='utf-8').splitlines():
 text=raw.strip()
 if not text:continue
 if text.startswith('### '):tag='h3';text=text[4:]
 elif text.startswith('## '):tag='h2';text=text[3:]
 else:tag='p';paras.append(text)
 if tag=='h2' and len(heading_map)>0:body.append(soup.new_tag('hr'))
 node=soup.new_tag(tag);node.string=text;body.append(node);body.append('\n')
 if tag in ('h2','h3'):heading_map.append({'tag':tag,'title':text})
 if tag=='p' and len(paras) in quotes:
  q=soup.new_tag('blockquote',attrs={'class':'pq'})
  qp=soup.new_tag('p');em=soup.new_tag('strong');em.string='「'+quotes[len(paras)]+'」';qp.append(em);q.append(qp)
  sig=soup.new_tag('p',attrs={'align':'right'});sig.string=byline;q.append(sig);body.append(q);body.append('\n')
  quote_map.append({'after_body_paragraph':len(paras),'text':quotes[len(paras)],'signature':byline})
assert len(paras)==38
newauthor=BeautifulSoup(str(original.select_one('.author-shell')),'html.parser').select_one('.author-shell')
newauthor.select_one('.tags').string='相關主題｜信用管制　中央銀行　高資產家庭　預售屋　房屋貸款　流動性風險　契約治理　內在法遵'
soup.select_one('.author-shell').replace_with(newauthor)
soup.select_one('.cover-meta').replace_with(BeautifulSoup(str(original.select_one('.cover-meta')),'html.parser').select_one('.cover-meta'))
soup.select_one('.abstract p').string='高資產不等於交屋時有足夠現金，銀行過去願意提供的貸款條件，也不會自然成為未來不變的權利；中華企業策略永續發展學會 創會理事長 莊鈞翔 博士從中央銀行的法定任務、信用管制與私人契約出發，辨明家庭資產、授信上限與實際撥款之間的距離。預售屋價款到期以前，房屋數與房貸戶數如何核認、鑑價如何影響額度、公司與家庭資金如何分開，以及融資未能成立時保留哪些調整選擇，都應回到具體文件與付款日期，而不是由財富總額代替履約準備。'
legal=soup.select_one('.legal-zone')
qa=legal.select_one('#law4')
qa_next=qa.find_next_sibling('div',class_='section-label')
for x in list(qa.next_siblings):
 if x==qa_next:break
 x.extract()
qa.string='▌中央銀行住宅與房貸戶數認定說明'
qa_parts=[
'依央行二〇二六年九月十八日生效的官方認定說明整理，以下為制度要旨，並非逐字問答引文。',
'房屋數依「全國財產稅總歸戶財產查詢清單」所列建物核認，包括建物權狀未含「住」字樣者，繼承取得的建物不計入；名下無房貸而有非繼承取得的持分房屋，仍受相關第一戶購屋貸款限制，房屋均已出售者，須經承貸金融機構查證屬實，始依說明排除適用。',
'房貸認定須透過聯徵歸戶查詢，以房屋抵押擔保且用途代號為「1」的放款，或經銀行確認實際資金用途為購置不動產者，納入核認；戶數依擔保品數量判斷，一筆擔保品認定為一戶，繼承承受的房貸不計入，並應於個案撥款前再次查詢確認。',
'同時申辦二戶以上購屋貸款，包括具複數產權的連戶打通或透天厝等情形，須按名下房屋及本次擔保品戶數，由承貸銀行核實認定並分別適用規定；原房貸已取得清償證明或已塗銷抵押權，且經銀行查證屬實者，可排除房貸戶數計算，不能只憑借款人口頭表示已清償便直接排除。',
'制度實務說明：房屋數、房貸戶數與借款契約筆數並非同一計算方式，繼承、出售、清償及同時申貸均有具體核認條件，應由資料及銀行查證結果決定，不能只用「首購」「第二棟」等市場稱呼推定成數。'
]
prev=qa
for text in qa_parts:
 node=soup.new_tag('p');node.string=text;prev.insert_after(node);prev=node
node=soup.new_tag('p');link=soup.new_tag('a',href='https://www.cbc.gov.tw/dl-227702-d82559a407814bb8b6797e6d81215f4e.html',target='_blank',rel='noopener noreferrer');link.string='中央銀行官方認定說明（2026年9月18日生效版本）';node.append(link);prev.insert_after(node)
for label in legal.select('.section-label'):
 txt=label.get_text();txt=re.sub(r'^▌\d+\s*','▌',txt)
 label.string=txt
 label.attrs.pop('id',None)
intro=legal.find('p')
intro.string='法源核對基準日：2026年9月23日，所引臺灣法條與規定依條號列示，保留原文並僅調整排版換行；央行戶數認定、外國法中譯及制度說明分別標明性質，個別案件仍須核對事實、契約及適用的歷史或過渡規定，不能由一般性解說推定已取得授信、解除契約或其他確定權利。'
fixed_label=soup.new_tag('div',attrs={'class':'section-label'});fixed_label.string='▍固定聲明段'
notice=soup.new_tag('p');notice.string='本文不構成對特定個案之法律意見、投資建議或稅務諮詢，讀者如有個案需求，應諮詢具備相關專業資格之法律、財務或稅務顧問。'
legal.insert(0,notice);legal.insert(0,fixed_label)
gov_label=soup.new_tag('div',attrs={'class':'section-label'});gov_label.string='▍治理思想依據 GOVERNANCE REFERENCE';legal.append(gov_label)
book='莊鈞翔（2026）《內在法遵 Internal Compliance：為你的內心，打造一座不可侵犯的至聖所》；STT Press｜ISBN 978-626-447-054-4 EPUB；ISBN 978-626-447-055-1 PDF。'
b=soup.new_tag('p');strong=soup.new_tag('strong');strong.string=book;b.append(strong);legal.append(b)
g=soup.new_tag('p');g.string='本篇將「內在法遵」所強調的核心價值與自我節制，置於家庭的融資承諾與財產安排之中；對外辨明銀行授信與法規界線，對內確認可用資金、責任分工及退出條件，讓家庭在尚有選擇時拒絕不能承受的槓桿，並使財富持續服務家人的生活。';legal.append(g)
for el in soup.find_all(string=lambda t:isinstance(t,Comment)):el.extract()
fragment=str(soup)
assert soup.style.get_text()==original.style.get_text()
assert len(soup.select('.publication-card'))==8
assert len(soup.select('.article-body a, .article-body sup'))==0
assert 'legal-mortgage-preview' not in fragment
assert not soup.select('script,iframe,base')
assert not re.search(r'Q\s*&?\s*A|Q[0-9]+|〔\d+〕',soup.select_one('#stt-legal-v2').get_text())
assert 'GOVERNANCE REFERENCE' in fragment
assert all(150<=len(re.sub(r'\s','',p))<=350 for p in paras)
assert all(1<=p.count('。')<=3 for p in paras)
assert all(p.endswith('。') for p in paras)
assert soup.select_one('.ai-full').get_text()==old.select_one('.ai-full').get_text()
statutory=[]
for heading in old.select('.legal-zone p > strong'):
 if re.match(r'^(第\d+條|第\d+點|十八、貸款)',heading.get_text()):
  quote=heading.parent.find_next_sibling('p')
  if quote:statutory.append(quote.get_text())
assert all(q in legal.get_text() for q in statutory)
oldaudit=BeautifulSoup(olddata['audit'],'html.parser')
original_ps=[]
for label in oldaudit.find_all(['h4']):
 if label.get_text()=='使用者原稿':original_ps.append(label.find_next_sibling('p').get_text())
assert len(original_ps)==38
oldbody=[]
for e in old.select('.article-body > p'):
 for sup in e.select('sup'):sup.decompose()
 oldbody.append(e.get_text())
assert len(oldbody)==38
han=lambda t:len(re.findall(r'[\u4e00-\u9fff]',t))
effective=lambda t:len(re.sub(r'\s','',t))
counts={'body_paragraphs':len(paras),'body_han':sum(map(han,paras)),'body_nonspace':sum(map(effective,paras)),'intro_nonspace':sum(map(effective,paras[:2])),'conclusion_nonspace':sum(map(effective,paras[-2:])),'body_min_paragraph':min(map(effective,paras)),'body_max_paragraph':max(map(effective,paras)),'legal_notes_nonspace':effective(legal.get_text()),'pull_quotes':len(quote_map),'original_han':sum(map(han,original_ps)),'previous_han':sum(map(han,oldbody))}
sha=lambda s:hashlib.sha256(s.encode('utf-8')).hexdigest()
def author_content(s):
 a=BeautifulSoup(str(s.select_one('.author-shell')),'html.parser');a.select_one('.tags').string='ARTICLE_TAGS';return str(a)
assert author_content(soup)==author_content(original)
assets=[]
for a,b in zip(soup.select('#stt-legal-v2 img'),original.select('#stt-legal-v2 img')):
 assert a['src']==b['src']
 assets.append({'alt':a.get('alt'),'sha256':hashlib.sha256(base64.b64decode(a['src'].split(',',1)[1])).hexdigest()})
record={'revision':'2026-09-23-editorial-and-fixed-layout-repair','fragment_sha256':sha(fragment),'counts':counts,'css_sha256':sha(soup.style.get_text()),'original_author_dom_match_except_tags':True,'fixed_image_bytes':assets,'inline_reference_links':0,'qa_blocks':0,'governance_reference':book,'statutory_paragraphs_unchanged':len(statutory),'full_ai_disclosure_unchanged':True,'original_source':'本次上傳《已貼上文字 (1).txt》；固定區外觀另對照使用者指定007816刊登頁','doc2_author_exception':'依本次最新指示恢復指定原始碼8項著作及版位；不以舊Doc2的2項著作覆蓋，也不宣稱本次AUTHOR-INFO與舊母本完全一致','cms':'PENDING','devices':'PENDING','author_approval':'PENDING'}
comparison=[]
for i,(o,b,n) in enumerate(zip(original_ps,oldbody,paras),1):
 comparison.append({'paragraph':i,'original':o,'previous_delivery':b,'revision':n,'before_periods':b.count('。'),'after_periods':n.count('。'),'chars':effective(n),'changes':[{'operation':tag,'before':b[a:c],'after':n[d:e]} for tag,a,c,d,e in difflib.SequenceMatcher(None,b,n,autojunk=False).get_opcodes() if tag!='equal']})
record['paragraph_comparison']=comparison
esc=html.escape
audit=['<h2>版面與文體更正紀錄</h2>',f'<p>正文{counts["body_han"]:,}個漢字；包含標點、數字及外文而不含空白，共{counts["body_nonspace"]:,}字元；38段、每段{counts["body_min_paragraph"]}至{counts["body_max_paragraph"]}字元，每段句號二至三個；引言{counts["intro_nonspace"]}字元，結語{counts["conclusion_nonspace"]}字元。標題、摘要、引文框、法源、治理思想依據與固定模組不納入上述正文字數。</p>',
'<p>本次依使用者最新指示回復上傳原碼中的八項著作、平台卡片分行及治理入口英文版位，固定影像與CSS逐一比對；原碼作者區與舊Doc2兩項著作存在差異，本次依已指定原碼恢復，不冒稱兩者相同，也未修改任何Project母本文檔。</p>',
'<p>原稿38段的問題順序保持可對位，調整句法、段內銜接及實務說明，不以短句拆散論述；下列逐段記載原稿、上一版與本次文字，新增文字及實際替換均可直接查閱，不把修辭改寫當成已取得作者最終審定。</p>',
'<p>移除所有文內數字註號及跳轉連結，法源仍集中於文末並連到官方來源；央行六則問答改為三段認定要旨，保留繼承、持分、出售、清償、同時申貸及撥款前再次查詢等條件，未把摘要冒充逐字官方引文。</p>',
'<p>法律附錄依本次先前明確要求保留已引用的臺灣法條原文，因此不以一般4500字附錄建議刪除條文；其字數另計，不納入正文。本次未新增外部法規或個案資料，前次已核對的30段臺灣法條及規定原文保持不變；本次工作不冒稱再次完成全部現行法覆核。</p>',
'<p>「治理思想依據」書名與ISBN取自本次指定007816頁面，只就原稿既有的自我節制、真實揭露與責任分工說明關聯，未臆造書中章節或頁碼。</p>',
'<p>保留既定作者、版權及AI使用揭露；改善文風不等於抹除AI參與事實，也不等於自動取得著作權認定。未取得本篇作者最終確認，未變更M Media後台或STT正式站。</p>',
'<p class="note">CMS-PENDING／DEVICE-PENDING：線上預覽與自動化視窗測試不等於M Media後台貼入驗收或iOS、Android實機驗收。</p>',
'<h3>固定區與技術比對</h3>',f'<p>CSS SHA-256：{record["css_sha256"]}<br>本文HTML SHA-256：{record["fragment_sha256"]}<br>原始碼作者DOM比對：除可變Tags外一致；圖片3張原始資料一致；正文超連結0，註號0，問答區塊0。</p>',
'<h3>正文逐段對照</h3>']
audit=[x.replace('30段臺灣法條及規定原文',str(len(statutory))+'段臺灣法條及規定原文') for x in audit]
for row in comparison:
 audit += [f'<details><summary>第{row["paragraph"]}段｜{row["chars"]}字元｜句號{row["before_periods"]}→{row["after_periods"]}</summary><h4>使用者原稿</h4><p>{esc(row["original"])}</p><h4>上一版交付</h4><p>{esc(row["previous_delivery"])}</p><h4>本次文字</h4><p>{esc(row["revision"])}</p><details><summary>實際字串變更</summary>']
 for c in row['changes']:audit.append(f'<p>原：{esc(c["before"] or "（無）")}<br>改：{esc(c["after"] or "（移除）")}</p>')
 audit.append('</details></details>')
source_proof=[]
for de in oldaudit.select('details'):
 sm=de.select_one('summary')
 if sm and ('取得官方原文' in sm.get_text()):source_proof.append(str(de))
audit.append('<h3>2026年9月23日前次已取得之官方法源紀錄</h3>'+''.join(source_proof))
data={'fragment':fragment,'audit':'\n'.join(audit),'sha256':sha(fragment),'bytes':len(fragment.encode()),'revision':record['revision'],'counts':counts}
newjson=json.dumps(data,ensure_ascii=False).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
site=re.sub(r'(<script type="application/json" id="article-data">).*?(</script>)',lambda m:m[1]+newjson+m[2],oldsite_text,flags=re.S)
site=re.sub(r'<p class="hint">.*?</p>','<p class="hint">版面與文體修正版｜正文、法源與固定模組分區。複製按鈕只取文章HTML；未包含工具列與查核紀錄。M Media後台及指定實機尚待驗收。</p>',site,count=1,flags=re.S)
site=re.sub(r"status.textContent='正文38段[^']*'", "status.textContent='正文38段｜"+f'{counts["body_han"]:,}' +"個漢字｜原碼8項著作已恢復｜文內註號0｜含治理思想依據'",site)
assert '5項固定模組逐字相符' not in site
(out/'article.html').write_text(fragment,encoding='utf-8')
(out/'index.html').write_text(site,encoding='utf-8')
(out/'verification.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
(out/'article-text.txt').write_text(soup.select_one('#stt-legal-v2').get_text('\n',strip=True),encoding='utf-8')
assert sha(fragment)=='f06594066154b1eaf6cf80973b06688125faa387390306be1f9ad461762b3167',sha(fragment)
for path in ['public/legal-mortgage-preview/index.html','legal-mortgage-preview/site/index.html']:(ROOT/path).write_text(site,encoding='utf-8')
(ROOT/'legal-mortgage-preview/site-verification.json').write_text(json.dumps({k:v for k,v in record.items() if k!='paragraph_comparison'},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in record.items() if k!='paragraph_comparison'},ensure_ascii=False,indent=2))
