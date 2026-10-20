"""Apply the owner-authorized interview entry only; never restore retired sources."""
from pathlib import Path
import hashlib, json, re, subprocess

ROOT = Path('.')
BASE = '416afa5fda21c444618b1da1c404e91837fe0407'
EXPECTED = {
 'src/App.tsx':'0585cfc4cb9c9ebe6e12f23cf31ab5394f84ca6d',
 'src/pages/Columns.tsx':'f04f557a830595c7b6042eefb75e72761bb837cc',
 'public/humanistic-interview/index.html':'6b0ad4acf014f3dbfda2397f2b7db5597290b677',
 'public/humanistic-interview/interview.js':'4fb411cb3a72806f6eb5a57923778f18b78448c8',
 'src/main.tsx':'4a65bde1ae48a287db6e701e05378bb914b33bbd',
 'docs/change-requests/CR-20261020-INTERVIEW-CONTENT-SEPARATION.md':'6a2df103d5615368e26d13b866c8a7f82618eaa6',
}
def git_blob(raw):
 return hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
def replace_once(text, old, new):
 assert text.count(old)==1, f'Expected one exact match: {old[:90]}'
 return text.replace(old,new,1)
for name,sha in EXPECTED.items():
 assert git_blob(Path(name).read_bytes())==sha, f'Current source changed; stop rather than overwrite: {name}'

before={n:Path(n).read_text() for n in EXPECTED}
app=before['src/App.tsx']
app=replace_once(app,'  { label: "研究與出版", path: "/insights" },','  { label: "研究與出版", path: "/insights" },\n  { label: "受訪者專區", path: HUMANISTIC_INTERVIEW_URL },')
app=replace_once(app,'                to={item.path}\n                className=', '                to={item.path}\n                reloadDocument={item.path === HUMANISTIC_INTERVIEW_URL}\n                className=')
app=replace_once(app,'<NavLink key={item.path} to={item.path}>\n                    <span>', '<NavLink key={item.path} to={item.path} reloadDocument={item.path === HUMANISTIC_INTERVIEW_URL}>\n                    <span>')
app=replace_once(app,'<a href={HUMANISTIC_INTERVIEW_URL} target="_blank" rel="noreferrer">人文地景產｜20 Questions ↗</a>', '<a href={HUMANISTIC_INTERVIEW_URL}>受訪者專區｜二十題訪談準備</a>')
# Keep the existing governance CTA reachable when the narrow header uses its menu.
app=replace_once(app,'{SECONDARY_NAVIGATION.map((item) => (\n                  <NavLink key={item.path} to={item.path}>{item.label}</NavLink>\n                ))}', '{SECONDARY_NAVIGATION.map((item) => (\n                  <NavLink key={item.path} to={item.path}>{item.label}</NavLink>\n                ))}\n                <Link to="/start">開始治理判讀</Link>')
Path('src/App.tsx').write_text(app)

columns=before['src/pages/Columns.tsx']
pattern=r'\n      <section className="stt-humanistic-entry"[\s\S]*?\n      </section>\n'
assert len(re.findall(pattern,columns))==1
columns=re.sub(pattern,'\n',columns,count=1)
Path('src/pages/Columns.tsx').write_text(columns)

html=before['public/humanistic-interview/index.html']
html=replace_once(html,'<title>人文地景產｜20 Questions Journey</title>', '<title>受訪者專區｜二十題訪談準備｜STT Governance</title>\n<meta name="description" content="正式採訪前的二十題訪談準備。可複製回答、儲存與讀回草稿、下載文字備份，並送交採訪整理；填答流程與公開專欄作品分開。">\n<meta name="stt-entry-version" content="20261020.1">\n<meta property="og:title" content="受訪者專區｜二十題訪談準備｜STT Governance">\n<meta property="og:description" content="透過五站、二十題整理採訪前的生活經驗與觀點；這是訪談準備，不是公開專欄作品。">\n<meta property="og:url" content="https://stt-003.vercel.app/humanistic-interview/">\n<meta property="og:type" content="website">')
html=replace_once(html,'<div class="brand">人文地景產｜20 Questions</div>', '<div class="brand">受訪者專區｜二十題訪談</div>')
html=replace_once(html,'<div class="eyebrow">人文地景產｜20 Questions Journey</div>', '<div class="eyebrow">受訪者專區 · 20 Questions Journey</div>')
html=replace_once(html,'<h1>今天，不急著介紹你自己。</h1>', '<h1>今天，不急著介紹你自己。</h1>\n    <p class="soft-note" id="interview-purpose">這二十題是正式採訪前的資料整理，不是已公開的專欄作品。後續稿件與直接引言，依原採訪確認程序處理。</p>')
html=replace_once(html,'大約需要 20–35 分鐘。每一題都會自動保存在這台裝置上，途中可以回頭修改。', '大約需要 20–35 分鐘，途中可以回頭修改。離開前，請先儲存草稿檔；分頁暫存不等於永久備份。')
Path('public/humanistic-interview/index.html').write_text(html)

js=before['public/humanistic-interview/interview.js']
LABELS=[('人文地景產｜20 Questions Journey','受訪者專區｜二十題訪談準備'),('人文地景產_20Questions_','STT_20Questions_'),('人文地景產｜回答備份','STT 受訪者專區｜回答備份')]
for old,new in LABELS:js=replace_once(js,old,new)
# Prove that delivery/storage/import logic is byte-identical after reversing labels.
original=js
for old,new in LABELS:original=original.replace(new,old)
assert original==before['public/humanistic-interview/interview.js']
Path('public/humanistic-interview/interview.js').write_text(js)

css='''/* CR-20261020-INTERVIEW-CONTENT-SEPARATION, interview-only approval.
   Six navigation destinations; preserve the approved logo and primary CTA. */
@media (min-width:1400px) {
  #root .stt-g0-header .stt-g0-header__inner {grid-template-columns:340px minmax(0,1fr) auto!important;gap:20px!important;}
  #root .stt-g0-header .stt-g0-desktop-nav {display:flex!important;justify-content:flex-end;min-width:0;}
  #root .stt-g0-header .stt-g0-nav-link {padding-left:10px!important;padding-right:10px!important;}
}
@media (max-width:1399px) {
  #root .stt-g0-header .stt-g0-desktop-nav,
  #root .stt-g0-header .stt-g0-header__inner>.stt-g0-primary-cta {display:none!important;}
  #root .stt-g0-header .stt-g0-header__inner {grid-template-columns:minmax(0,1fr) auto!important;}
  #root .stt-g0-header .stt-g0-menu-button {display:flex!important;margin-left:auto;align-items:center;justify-content:center;padding:10px;border:1px solid var(--cis-line);background:transparent;}
}
#root .stt-g0-header .stt-g0-mobile-menu {max-height:calc(100dvh - 92px);overflow-y:auto;overscroll-behavior:contain;}
'''
csspath=Path('src/styles/interview-entry-navigation.css');assert not csspath.exists();csspath.write_text(css)
main=before['src/main.tsx'];main=replace_once(main,'import "./styles/cis-page-system.css";', 'import "./styles/cis-page-system.css";\nimport "./styles/interview-entry-navigation.css";')
Path('src/main.tsx').write_text(main)

# This is a narrow approved exception, not approval of the larger publication split.
cr=before['docs/change-requests/CR-20261020-INTERVIEW-CONTENT-SEPARATION.md']
cr=replace_once(cr,'狀態：PROPOSED；需求方向已由站主明確提出；導覽名稱與具體路由方案尚待核定。','狀態：PARTIALLY_APPROVED_INTERVIEW_ONLY；先完成二十題獨立入口，其他分頁方案暫停。')
cr=replace_once(cr,'Approved by Founder：NO（本具體方案尚未核定；不否定站主已提出的拆分需求）。','Approved by Founder：YES — 僅受訪者專區／現行二十題入口。依站主在「先完成二十題的操作、獨立入口與驗收」及「把獨立入口正式上線」的具體回覆後明確指示「那趕快做啊，不要我問你時你都這樣理由藉口一大堆」。不將此授權擴張為出版分頁或 GCSDA 修復。')
cr=replace_once(cr,'Implementation commit/deployment：NONE。本檔是提案，不是現行 Source of Truth 的永久變更。','Implementation：本輪執行 interview-only 子範圍；實際提交與正式網址驗證記於 docs/qa/INTERVIEW-ENTRY-DELIVERY-20261020.md。其餘提案仍非核准施工範圍。')
cr+='''

## 本輪受訪者入口核准差異（覆蓋上方「核定前」的 interview-only 狀態）

CHANGE REQUEST REQUIRED：ROUTE-001／COPY-001 已由本 CR 取得本輪限定授權。
主導航由原五項增加「受訪者專區」，置於「研究與出版」之後、「關於 STT」之前。主 CTA「開始治理判讀」及 /start 不變。
唯一填答及 canonical 保持 /humanistic-interview/；不是第二個問卷，不增加網域。使用完整文件導覽，不讓 React SPA 誤接到不存在的問卷頁。
/insights 僅移除將「人文地景產專欄｜20 Questions Journey」混同的採訪準備區塊；電子書與公開文章條目、圖片、原文連結不改動，後續分頁不於本輪施工。
問卷頁只更新頁名、頂欄、入口說明、備份顯示標籤及儲存提醒；二十題題目、圖片、同意文字、欄位名稱、草稿 schema、暫存鍵、API、收件設定與送件成功／失敗處理不變。
受影響 v1.0 文件：01_NON_DRIFT_RULES 的 ROUTE-001 限定例外、02_SITE_TREE 的受訪者入口、site_source_of_truth.yaml 的 nav.main 與該 route、Master Build Spec 的主导航／Insights 採訪区塊，以及相關 page/copy/link/QA registry；以 docs/governance/INTERVIEW-ENTRY-ADDENDUM-20261020.md 記錄此核准增補，其餘原規格不變。Project 上傳的 v1.0 原檔未被此 GitHub 操作覆寫。
不以技術通過宣稱實體 iPhone／Safari 已驗收；未使用付費外部瀏覽器。舊主機退役仍屬原 CR，不能把此次導覽修改冒充 Netlify 已刪除。
'''
Path('docs/change-requests/CR-20261020-INTERVIEW-CONTENT-SEPARATION.md').write_text(cr)

spec=Path('docs/governance/INTERVIEW-ENTRY-ADDENDUM-20261020.md');spec.parent.mkdir(parents=True,exist_ok=True)
spec.write_text('''# 二十題受訪者入口 — 核准規格增補

Authority: CR-20261020-INTERVIEW-CONTENT-SEPARATION, PARTIALLY_APPROVED_INTERVIEW_ONLY。
僅本節覆蓋 v1.0 的五項主導航限制與 /insights 中誤稱專欄的訪談入口；原 Project Instructions、定位、治理主 CTA、題目與隱私條件不變。未核准其他出版分頁或學會改版。

## Site Tree / nav.main

你正在面對什麼 → /problems
STT 如何判讀 → /how-stt-works
治理委任 → /engagement
研究與出版 → /insights
受訪者專區 → /humanistic-interview/ （原生文件導覽）
關於 STT → /about
主 CTA：開始治理判讀 → /start。

## Page / Copy / Link registry

PAGE-INTERVIEW：採訪前準備與二十題填答；不是公開成果目錄。
COPY-INTERVIEW-NAV：受訪者專區。
COPY-INTERVIEW-TITLE：受訪者專區｜二十題訪談準備｜STT Governance。
COPY-INTERVIEW-PURPOSE：這二十題是正式採訪前的資料整理，不是已公開的專欄作品。後續稿件與直接引言，依原採訪確認程序處理。
Canonical：https://stt-003.vercel.app/humanistic-interview/。
Desktop nav、mobile nav、footer 指向同一現有路徑，不另建填答頁；返回母站沿用頁內 ← STT 連結。
舊 /humanistic-20q 等 redirect 不改動；API 沿用 /api/humanistic-submit。已公開的人文地景產作品與來源資料不移除。

## Preserved and deferred

二十題原文、26 個嵌入圖片、同意文字、草稿格式與 storage key 保持不變。不新增登入、資料庫、供應商或付費服務。
電子書、法律專欄、其他作品分頁、GCSDA 與遠端舊站刪除暫停，不納入本次上線宣告。

## Acceptance

桌面、窄螢幕、手機選單與鍵盤均直接載入同一靜態問卷；不得只改 href 造成 SPA 404。標誌與治理 CTA 不擠壓，無水平溢出。
/insights 不再出現誤稱的 20 Questions 專欄區塊；公開書目與文章目錄不變。
新增頁名與 canonical 正確；單一控制程式；舊草稿可讀回；複製／儲存／下載／送出與失敗保留回歸。手機尺寸自動化不等同實體 iPhone 驗收。
''')

# Invariants for every actual question and approved embedded image.
questions=lambda s:re.findall(r'<section[^>]*\bid="question-\d+"[\s\S]*?</section>',s)
images=lambda s:re.findall(r'data:image/[^\'"\s)<>]+',s)
assert len(questions(html))==20 and questions(html)==questions(before['public/humanistic-interview/index.html'])
assert images(html)==images(before['public/humanistic-interview/index.html'])
assert len(images(html))==26
assert 'action="/api/humanistic-submit"' in html and html.count('<script ')==1
assert '人文地景產專欄｜20 Questions Journey' not in columns
out=Path('qa-interview-entry');out.mkdir(exist_ok=True)
(out/'source-invariants.json').write_text(json.dumps({'questions_identical':20,'embedded_images_identical':26,'delivery_logic_unchanged':True,'new_questionnaire_routes':0,'api_modified':False,'base':BASE},ensure_ascii=False,indent=2))
print('INTERVIEW ENTRY APPLIED: existing path, approved content preserved; publication/GCSDA work deferred.')
