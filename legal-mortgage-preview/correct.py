from pathlib import Path
from bs4 import BeautifulSoup
import json,re,hashlib,html,copy,sys
SITE=Path('legal-mortgage-preview/site/index.html'); O=Path('legal-recheck')
site=SITE.read_text(encoding='utf-8')
assert hashlib.sha256(site.encode()).hexdigest()=='643883ea23eba6293e731dd9e973824a556cbe833f416194b521a9609673bb89'
pattern=r'(<script\b[^>]*id=["\']article-data["\'][^>]*>)(.*?)(</script>)'
match=re.search(pattern,site,re.S);assert match
D=json.loads(match.group(2));old=D['fragment'];fragment=old;S=BeautifulSoup(old,'html.parser');changes=[]
def change(before,after,position,reason,source):
 global fragment
 assert fragment.count(before)==1,(position,fragment.count(before))
 fragment=fragment.replace(before,after,1)
 changes.append(dict(position=position,before=before,after=after,reason=reason,source=source))
change('截至本篇查核時，央行不動產貸款規定的官方版本為二〇二六年九月十七日修正、同月十八日生效。現行分類對公司法人、高價住宅與自然人不同房貸戶數設有不同條件，其中非高價住宅的自然人第二戶購屋貸款成數上限為七成，第三戶以上及高價住宅有三成等限制；數字只在各自要件成立時適用，不能把七成寫成所有第二棟房子的請求權，也不能把三成套在尚未辨識價格、借款主體與貸款筆數的案件上。','以二〇二六年九月二十三日取得的央行官方規定為準，本篇採用同年九月十七日發布、十八日生效的版本。公司法人、高價住宅與自然人不同房貸戶數，各有適用條件；自然人名下已有一戶房貸，再辦理非高價住宅購屋貸款者，貸款額度最高為住宅含基地鑑價或買賣金額較低者的七成。公司法人購置住宅、自然人購置高價住宅，以及自然人名下已有二戶以上房貸再辦理購屋貸款，原則上適用三成上限，並不得有寬限期；第二戶購屋貸款也不得有寬限期。這些數字須與各項適用及排除條件一併閱讀，不能把七成當成購買第二棟房屋即有的請求權，也不能在尚未核對價格、借款主體及依法認定的房貸戶數前，就逕以三成估算。','正文第16段','補明既有房貸戶數、計算基礎及無寬限期條件；日期固定於實際查核日，不以三月舊網頁取代九月官方版本。','央行規定第2至4點；官方問答Q14')
change('僅有購屋日期早於某次修正，尚不足以推論銀行必須按照當時市場常見成數撥款，更不能逕將成交時的口頭估算視為已成立的貸款契約。','就本次修正而言，第十一點明定：修正生效前，金融機構已錄案辦理而尚未撥款的案件，適用錄案時的規定；修正後規定有利於借款人者，則適用修正後規定。因此，僅有購屋日期早於某次修正，尚不足以推論銀行必須按照當時市場常見成數撥款，更不能逕將成交時的口頭估算視為已成立的貸款契約。','正文第21段','銜接已列在註解的實際過渡條款，區分購屋簽約、銀行錄案及撥款。','央行規定第11點')
change('若承貸規則以交易價格與鑑價較低者為基礎，即使貸款比例不變，鑑價下降也會減少可貸金額。','承貸規則若以交易價格與鑑價較低者為基礎，須先看鑑價下降是否使這個「較低者」隨之減少。鑑價雖然下修，卻仍高於交易價格時，法規成數計算的基礎未必改變；只有較低的計算基礎下降，在同一成數下，法規容許的最高額度才會相應減少。銀行實際核貸金額，仍須另看授信審查結果。','正文第32段','更正鑑價下降必然減少貸款的過度結論；最低值基礎不變時，成數上限的計算結果不變。另區分法規上限與實際核貸。','央行規定第3、4、10點；最低值計算推論')
change('<p>本文不構成對特定個案之法律意見、投資建議或稅務諮詢，讀者如有個案需求，應諮詢具備相關專業資格之法律、財務或稅務顧問。</p>','','AI使用揭露區第二段','移除前版自行加入且不屬Doc2的額外聲明；完整AI揭露母本文字不變，個案限制仍見文章註2。','Doc2 v3.3 AI-DISCLOSURE-FULL')
change('<a href="https://www.cbc.gov.tw/tw/cp-4223-124873-79d4c-1.html" rel="noopener noreferrer" target="_blank">官方原文／法規版本</a>','<a href="https://www.cbc.gov.tw/dl-227702-d82559a407814bb8b6797e6d81215f4e.html" rel="noopener noreferrer" target="_blank">官方問答全文（2026年9月18日生效版本）</a>','法律依據第5組來源連結','直接連到本次取得的官方PDF，將問答版本固定，不以動態索引頁冒充固定版本。','央行問答2026年9月18日生效版本')
change('查核基準日：2026年9月23日。下列臺灣法條及規定按所引條號列示全文；官方問答、外國法中譯與制度說明另標示其性質。法律效果仍須依個案事實、適用時點與契約判斷。','法源核對日：2026年9月23日。下列臺灣法條與規定按所引條號列示，僅調整網頁及PDF的排版換行與空白，不節略條文；官方問答、外國法中譯與制度說明分別標示其性質。本文說明的法律效果，仍須核對個案事實、契約及應適用的歷史或過渡規定，不表示任何個別授信、解除契約或責任爭議已有確定結果。','法律依據區導言','揭露法源核對的範圍、排版處理與個案適用界線，不將引文相符升格為確定個案結論。','本次官方法源與原稿既有個案限制')
sha=hashlib.sha256(fragment.encode()).hexdigest();assert sha=='17cbd4aef5404e606687e683a8e7f40d3f77fe318691a2f05ec488c16cd08b53'
N=BeautifulSoup(fragment,'html.parser')
for sel in ['style','.hero-art','.author-shell','.cover-meta']:
 assert str(S.select_one(sel))==str(N.select_one(sel)),sel
assert [e.get_text() for e in S.select('.article-body h2,.article-body h3')]==[e.get_text() for e in N.select('.article-body h2,.article-body h3')]
ps=S.select('.article-body > p');ns=N.select('.article-body > p');assert len(ps)==len(ns)==38
assert [i for i,(a,b) in enumerate(zip(ps,ns),1) if str(a)!=str(b)]==[16,21,32]
assert len(N.select('.ai-full p'))==1
assert not N.select('script,iframe,object,embed')
assert '\ufffd' not in fragment and not re.search(r'\{\{[^{}]+\}\}|sandbox:/|turn\d+file\d+',fragment)
ids=[e['id'] for e in N.select('[id]')];assert len(ids)==len(set(ids))
for a in N.select('a[href^="#"]'):assert a['href'][1:] in ids
# Full-module extraction preserves exact characters, line breaks and link destinations.
expected={'AUTHOR-INFO':'b239431f7151f607b443e6f39a2a03f7539259a85123910ca1aa210b3c03236c','COVER-META':'7cade1cc2e846d84487d723ee6423695f9f52bf1c5139b34a325ccee8fe71fb6','AI-DISCLOSURE-FULL':'4fc570e6718d2ef1b67c0aba621b7159d7350916db433aa437305cd4b9d6360f','IP-DECLARATION':'9f4051f797f42b38d916eece42f3c70aa0e9fee1c76c0b88fca34febd8ebb505','PLATFORM-LINKS':'0a2beac9cd3a3121146f050d44d097937d447245994ae533f25fa2ff3c7ea1fc'}
ex={};ex['AUTHOR-INFO']='\n'.join(e.get_text() for e in N.select_one('.author-shell').select('.author-topline,.author-heading,.author-bio,.author-section-title,.author-list-line,.publication-card,.author-quote'))
ex['COVER-META']='\n'.join(e.get_text() for e in N.select('.cover-meta .meta-line'));ex['AI-DISCLOSURE-FULL']=N.select_one('.ai-full p').get_text()
e=copy.copy(N.select_one('.copyright'))
for br in e.select('br'):br.replace_with('\n')
ex['IP-DECLARATION']=e.get_text();links=[]
for a in N.select('.link-wrap a'):
 links.extend(e.get_text() for e in a.select('.link-title,.link-sub') if e.get_text()!='');links.append(a['href'])
links.extend([N.select_one('.gw-title').get_text(),N.select_one('.gateway p').get_text()]);ex['PLATFORM-LINKS']='\n'.join(links)
modules={k:{'expected_sha256':v,'actual_sha256':hashlib.sha256(ex[k].encode()).hexdigest()} for k,v in expected.items()}
assert all(v['expected_sha256']==v['actual_sha256'] for v in modules.values())
# Statutes: remove layout whitespace only, never punctuation or words.
norm=lambda x:re.sub(r'\s+','',x)
quotes={};section=''
for e in N.select_one('.legal-zone').find_all(recursive=False):
 if e.get('id'):section=e['id']
 if e.name=='p' and e.strong and len(e.contents)==1:
  t=e.get_text()
  if t.startswith(('第','Q','十八')):quotes[(section,t)]=e.find_next_sibling('p').get_text('\n')
checks=[]
config={'law1':('central_bank',[1,2,5,6,23,25,28,29,31]),'law2':('procedure',[6,7,10]),'law5':('bank72',['72-2']),'law6a':('consumer17',[17]),'law7':('civil148',[148]),'law8':('obu',[4,5,6,7,8]),'law9':('obu_rules',[2,3,6,10])}
for section,(file,nums) in config.items():
 s=BeautifulSoup((O/(file+'.html')).read_text(),'html.parser')
 for n in nums:
  title='第'+str(n).replace('-','條之')+('條' if '-' not in str(n) else '')
  if file=='obu_rules':
   p=next(p for p in s.select('.law-article p') if re.match(r'第\s*'+str(n)+r'\s*條',p.get_text()));official=re.sub(r'^第\s*'+str(n)+r'\s*條','',p.get_text('\n'),count=1)
  elif file in ['bank72','consumer17','civil148']:official=s.select_one('.law-article').get_text('\n')
  else:official=s.select_one('.col-no a[name="'+str(n)+'"]').parent.parent.select_one('.law-article').get_text('\n')
  actual=quotes[(section,title)];assert norm(actual)==norm(official),(file,title)
  checks.append(dict(section=section,title=title,source=file,actual=actual,same_nonlayout_text=True))
for section,file in [('law3','cbc_rules_pdf'),('law4','cbc_qa_pdf'),('law6b','presale_pdf')]:
 txt=(O/(file+'.txt')).read_text();txt=re.sub(r'\[PAGE \d+\]\n','',txt);txt=re.sub(r'^\d+\s*$','',txt,flags=re.M);txt=re.sub(r'第\s*\d+\s*頁，共\s*\d+\s*頁','',txt)
 for (sid,title),actual in quotes.items():
  if sid==section:
   assert norm(actual) in norm(txt),(file,title)
   checks.append(dict(section=section,title=title,source=file,actual=actual,same_nonlayout_text=True))
assert len(checks)==36
R=json.loads((O/'report.json').read_text());assert R['cbc_rules_pdf']['sha256']=='2a25deedd97fd0f86a0a81324c43c0396eabd9ab5447d5add99c9bd02903b1bf'
assert all(R[q['source']].get('status')==200 for q in checks)
A=BeautifulSoup(D['audit'],'html.parser');rows=[]
def prose(p):
 e=copy.copy(p)
 for a in e.select('a,sup'):a.extract()
 return e.get_text()
for i,(det,p) in enumerate(zip(A.select('details')[:38],ns),1):
 pair=det.select('p');assert len(pair)>=2
 rows.append(dict(paragraph=i,original=pair[0].get_text(),previous=pair[1].get_text(),corrected=prose(p),changed=i in [16,21,32]))
assert len(rows)==38
body='\n\n'.join(r['corrected'] for r in rows)
counts={'paragraphs':38,'original_han':len(re.findall('[\u4e00-\u9fff]',''.join(r['original'] for r in rows))),'corrected_han':len(re.findall('[\u4e00-\u9fff]',body)),'corrected_effective':len(re.sub(r'\s','',body))}
assert counts=={'paragraphs':38,'original_han':6092,'corrected_han':6441,'corrected_effective':7035},counts
esc=lambda t:html.escape(str(t),quote=True)
p=lambda t:'<p>'+esc(t)+'</p>'
link=lambda u,t:'<a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+esc(t)+'</a>'
a=['<h2>本次修正與法源覆核｜2026年9月23日</h2>',p('本頁是編修紀錄，不是文章正文；複製按鈕不會帶入本頁、按鈕或驗收狀態。原稿、前次編修、官方證據、本次採用分開保存。'),p('38段正文僅修正第16、21、32段；其餘35段及正文標題未變。本次共6項變更。原稿6,092漢字；前次編修6,211漢字；本次6,441漢字，不含空白與換行7,035字元。漢字計數不含標點、標題、引用標記、法源及固定模組。'),p('本次核對36則臺灣法條、央行規定、官方問答及預售屋契約規範引文。排除網頁及PDF排版空白、換行與頁碼後，均與本次實際取得的官方原文相符；未改寫或替換標點。這不等於宣稱原始檔位元組相同，也不等於個案法律效果已確認。'),p('美國法的中文是文內標示的非官方翻譯；歐洲央行段落是官方制度說明的摘要。兩者均僅作制度比較，不是臺灣授信的直接法源。'),p('未取得個案買賣契約、核貸通知、擔保文件及錄案資料，因此未認定任何個案已取得貸款、解約、分期或損害賠償的確定權利。文中家庭與產業情境是原稿分析假設，不是新增的統計調查結果。'),p('M Media後台：CMS-PENDING；指定實機：DEVICE-PENDING；本篇作者最終確認：尚未取得。固定聲明的「審定修訂」是Doc2母本文字，不代表本篇已經作者審定。'),'<h3>六項實際變更</h3>']
for i,x in enumerate(changes,1):
 a+=['<details open><summary>'+esc(str(i)+'｜'+x['position'])+'</summary><h4>修正前</h4>',p(BeautifulSoup(x['before'],'html.parser').get_text() if x['before'].startswith('<') else x['before']),'<h4>本次採用</h4>',p(BeautifulSoup(x['after'],'html.parser').get_text() if x['after'].startswith('<') else x['after'] or '移除非Doc2額外聲明；完整母本揭露保留。'),p('理由：'+x['reason']),p('依據：'+x['source']),'</details>']
a.append('<h3>38段原稿、前次編修與本次採用</h3>')
for r in rows:
 a+=['<details><summary>第'+str(r['paragraph'])+'段｜'+('本次修正' if r['changed'] else '本次未變更')+'</summary><h4>使用者原稿</h4>',p(r['original']),'<h4>前次交付</h4>',p(r['previous']),'<h4>本次採用</h4>',p(r['corrected']),'</details>']
a.append('<h3>36則引文的官方原文核對</h3>')
for i,c in enumerate(checks,1):
 src=R[c['source']]
 a+=['<details><summary>'+esc(str(i)+'｜'+c['title']+'｜引文相符')+'</summary>',p('文中定位：'+c['section']),'<p>'+link(src['url'],'官方原文')+'</p>',p('取得時間：'+src['retrieved_at']),p('官方檔案SHA-256：'+src['sha256']),'<h4>本篇引文</h4>',p(c['actual']),p('比對只排除版面空白、換行及頁碼；未以語意近似、標點替換或搜尋摘要判定相符。'),'</details>']
a+=['<h3>Doc2固定模組</h3>',p('母本：Doc2_Declaration_Format_Library_v3_3.docx。母本檔案SHA-256：d6041166e0aa11098af15a87e64d7e9dc70f9d66d59273f440acfe07e7a6195b。'),p('下列五項完整模組的原始字元、空格、換行、標點、大小寫與目的網址均納入比對，未先正規化。封面第三行由COVER-META保留，不另重複插入短版揭露。')]
for k,v in modules.items():a+=['<details><summary>'+esc(k)+'｜全文指紋相符</summary>',p('母本SHA-256：'+v['expected_sha256']),p('實際SHA-256：'+v['actual_sha256']),'</details>']
a.append('<h3>來源取得紀錄與限制</h3>')
for k,v in R.items():
 a+=['<details><summary>'+esc(k+'｜'+('取得官方原文' if v.get('status')==200 else '此一路徑未取得'))+'</summary>','<p>'+link(v['url'],'來源位置')+'</p>']
 if v.get('status')==200:a.extend([p('實際取得：'+v['retrieved_at']),p('SHA-256：'+v['sha256'])])
 else:a.append(p('內政部法規HTML頁連線逾時；第18點使用已取得並核對的行政院官方完整PDF，未用搜尋摘要代替條文。'))
 a.append('</details>')
a+=['<h3>版型、影像與交付界線</h3>',p('版型仍為本次指定《已貼上文字 (1).txt》的《從收藏走向文明治理》原始碼。CSS、Banner、作者照片、簽名、作者區DOM、平台連結及版權區均與前次交付相符，未重繪或壓縮圖片。'),p('本次CMS fragment SHA-256：'+sha),p('預覽頁可操作不代表M Media後台或全部實機通過。未取得作者本篇發布確認，不標示Release、Final或百分之百正確。')]
D.update(fragment=fragment,audit='\n'.join(a),sha256=sha,bytes=len(fragment.encode()))
encoded=json.dumps(D,ensure_ascii=False).replace('<','\\u003c')
site=re.sub(pattern,lambda m:m.group(1)+encoded+m.group(3),site,count=1,flags=re.S)
site=site.replace('編修預覽，尚未經作者核定。M Media CMS 與實機待驗。複製內容只有本篇文章 HTML，不含本頁按鈕及查核紀錄。','法源覆核修正版｜2026年9月23日。尚未經作者核定；固定揭露母本文字不代表本篇已審定。M Media CMS 與實機待驗。複製內容只有文章 HTML，不含按鈕及查核紀錄。')
site=site.replace('正文38段｜原版圖片與CSS｜法律依據及固定模組已置入','正文38段｜6項修正｜36則引文已對照官方原文｜5項固定模組逐字相符')
SITE.write_text(site,encoding='utf-8');public=Path('public/legal-mortgage-preview/index.html');public.parent.mkdir(parents=True,exist_ok=True);public.write_text(site,encoding='utf-8')
manifest={'revision':'2026-09-23-source-corrected','fragment_sha256':sha,'site_sha256':hashlib.sha256(site.encode()).hexdigest(),'bytes':len(site.encode()),'counts':counts,'changed_body_paragraphs':[16,21,32],'changes':changes,'statutory_quotes':36,'quote_matches':36,'fixed_modules':modules,'css_and_assets_unchanged':True,'cms':'PENDING','devices':'PENDING','author_approval':'PENDING','production_modified':False,'path':'/legal-mortgage-preview','branch':'preview/legal-mortgage-20260923-r2'}
Path('legal-mortgage-preview/site-verification.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'fragment_sha256':sha,'site_sha256':manifest['site_sha256'],'counts':counts,'statutes':36,'fixed_modules':len(modules)},ensure_ascii=False))
