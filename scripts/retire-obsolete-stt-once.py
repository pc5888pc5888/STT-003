"""One-time, owner-authorized cleanup. Removed with its successful cleanup commit."""
from pathlib import Path
import hashlib, json, subprocess, sys
BASE='618cf60034028b4538acce3aeb3b16fc97d5e439'
ROOT=Path.cwd()
OUT=ROOT/'qa-current-site-cleanup'
OUT.mkdir(exist_ok=True)
SELF='scripts/retire-obsolete-stt-once.py'
WORKFLOW='.github/workflows/audit-humanistic-netlify-exact.yml'
PAGES='About ArticleIndex Books CanonicalLibrary Cooperation CorporateGovernance Domains ESGAI FamilyGovernance GovernanceResponsibility Home HomeV2 Humanistic20Q HumanisticInterview InternalCompliance InternalCompliancePortal Legal Papers PublicCore ServicePortal Success'.split()
OLD_ROOT='about.html contact.html governance.html insights.html problems.html fix.py fix_about.py fix_about2.py fix_about3.py fix_line38.py temp_about.txt about_clean.txt about_backup.txt about_current.txt temp_check2.txt metadata.json netlify.toml'.split()
OLD_WORKFLOWS='apply-humanistic-cooperation-20260916 audit-current-cooperation-assets finalize-approved-two-heroes-20260916 install-approved-six-direct-20260915 install-user-approved-six-main repair-humanistic-delivery-once stt-approved-home-restore stt-fix-asset-runtime stt-install-original-artwork stt-install-true-hires-heroes stt-materialize-visual-bank stt-mmedia-bootstrap stt-primary-landings stt-stage2-verify stt-stage3-verify stt-wire-visual-bank verify-humanistic-production-once stt-primary-production restore-owner-fullwidth'.split()
OLD_SCRIPTS='apply_humanistic_cooperation_20260916.py patch-interview-delivery.py patch_humanistic_privacy.py repair_humanistic_delivery.py apply_fullbleed.py apply_stage2_layout.py apply_stage3_layout.py refine_primary.py install_original_artwork.py mmedia_bootstrap.py'.split()
DELETE=sorted(['src/pages/'+p+'.tsx' for p in PAGES]+OLD_ROOT+['.github/workflows/'+p+'.yml' for p in OLD_WORKFLOWS]+['scripts/'+p for p in OLD_SCRIPTS]+['public/humanistic-20q/index.html',WORKFLOW])
UPDATES=['AGENTS.md','docs/ENVIRONMENT_SETUP.md','.github/workflows/interview-delivery-acceptance.yml','.github/workflows/interview-delivery-live-qa.yml','vercel.json']
REPORT='docs/qa/CURRENT-SITE-CLEANUP-20261020.md'
def run(*args):return subprocess.check_output(args).decode().strip()
def digest(raw):return hashlib.sha256(raw).hexdigest()
def tracked():return [x for x in subprocess.check_output(['git','ls-files','-z']).decode().split('\0') if x]
def snapshot():return {n:digest(Path(n).read_bytes()) for n in tracked() if Path(n).is_file()}
def apply():
 assert run('git','branch','--show-current')=='main','Only the existing main branch is in scope'
 assert not run('git','status','--porcelain'),'Checkout must be clean'
 subprocess.run(['git','merge-base','--is-ancestor',BASE,'HEAD'],check=True)
 before=snapshot()
 for n in DELETE+UPDATES:
  if n==WORKFLOW:continue
  expected=subprocess.check_output(['git','show',BASE+':'+n])
  assert Path(n).read_bytes()==expected,('Concurrent source change; stop rather than overwrite',n)
 assert digest(Path('public/humanistic-interview/index.html').read_bytes())=='8a5b2fc70abd2c30d44ef4a0b81f5438a0406d08f28cab781ed806dc9255953d'
 assert digest(Path('public/humanistic-interview/interview.js').read_bytes())=='18ebf4306ab80099bfbbf2844f314b417eb4dc7432a7d32b8badd69c40a3e609'
 assert len(DELETE)==69
 # No replacement question, image, page copy, or runtime controller is generated.
 for n in DELETE:Path(n).unlink()
 Path('AGENTS.md').write_text('''# STT Governance — 現行網站施工入口

本檔是程式庫操作指引；Project Instructions、Project Charter、Non-Drift Rules、Source of Truth、正式 Page Specifications 與 Registries 的權限高於本檔。

## 只維護現行 STT 母站

正式母站：https://stt-003.vercel.app/
二十題訪談：https://stt-003.vercel.app/humanistic-interview/
程式庫：pc5888pc5888/STT-003；現行分支：main。
首頁來源：src/pages/HomeCanonical.tsx；路由來源：src/App.tsx 與 vercel.json。
訪談唯一來源：public/humanistic-interview/index.html 與 interview.js；送件只使用既有 /api/humanistic-submit。

不得以舊分支、舊首頁、Netlify 版本、聊天記憶、過去施工稿或公開預覽取代現行版本。歷史 Git commit 與 QA 紀錄僅供追溯，不是現行施工輸入。不得把 STT Press 再列為母站主品牌，或恢復未核對的短網址入口。

## 已核准內容保持不動

STT Governance 的定位、莊鈞翔博士角色、AI 邊界、正式文案、Logo、人物與出版圖片，以高階治理文件及核准 Registry 為準。缺資料不補造；修改 LOCKED 內容須走 Change Request。不要從零重做現行網站。

GCSDA 是獨立組織網站，不屬於 STT 舊問卷刪除範圍；不得刪除 gcsda-governance.vercel.app 或其現行發布。M 傳媒是外部第三方媒體。

## 費用與操作邊界

未取得站主事前明確同意，不得使用按量付費的外部瀏覽器、建立付費雲端測試環境、要求儲值、提供儲值連結，或新增付費服務。優先使用既有程式庫、主機管理連線及本機／既有測試。遇到權限不足，直接回報缺少哪個帳戶管理存取，不改推付費工具。

## 驗收與清理

發布前執行 npm run build；其中的訪談檢查只讀取正式來源，不改寫問卷。測試不得自動還原舊來源或直接寫回現行頁面。

每次清理須列出實際刪除檔案、保留項目、網址影響、QA 與未完成項目。轉址不等於刪除部署；移除連結不等於舊站已下架；READY 不等於全站 QA_PASS。保留追溯紀錄，但不得再以過時文件指揮施工。

目前 WEBSITE 仍為 ACTIVE_BUILD；本次清理不授予全站 BUILD_LOCK／QA_PASS，不解除 Facebook、LINE 的 HOLD。
''')
 Path('docs/ENVIRONMENT_SETUP.md').write_text('''# STT Governance — 現行執行環境

母站只使用既有 Vercel 專案 stt-003，正式入口為 https://stt-003.vercel.app/。本檔取代先前將 Netlify、Dify、TTS 與 EmailJS 列為主要環境的過時操作說明；不新增或重新啟用該套網站。

二十題訪談使用 /humanistic-interview/ 與同站 /api/humanistic-submit。既有郵件傳送在伺服器端使用 RESEND_API_KEY；RESEND_FROM_EMAIL 只在既有服務需要時設定。指定收件人保持原設定，憑證不得寫入版本庫、瀏覽器變數、HTML 或日誌。

本次僅校正操作文件，不變更現行環境變數值、不增加供應商、不建立答案資料庫、不重新啟用公開 AI 聊天或語音功能。其他既有 API 的設定須依各自正式規格核對，不得由本文件推定全部已啟用或可刪除。

GCSDA 的凍結發布及其分支限定環境設定是獨立網站所需，排除於此次 STT 清理。舊 Netlify 問卷是否下架，須以該 Netlify 帳戶實際操作和公開 URL 驗證為準，不能因本程式庫已清理就標記完成。

未取得站主事前明確同意，不使用付費外部瀏覽器、不建立付費測試環境、不要求儲值。遇到權限阻擋，保留未完成狀態並指出所需帳戶管理存取。
''')
 Path('.github/workflows/interview-delivery-acceptance.yml').write_text('''name: Interview delivery acceptance
on:
  push:
    branches: [main]
    paths:
      - .github/workflows/interview-delivery-acceptance.yml
      - scripts/interview-delivery-browser-qa.py
      - scripts/interview-delivery-api-qa.mjs
      - scripts/finalize-interview.mjs
      - public/humanistic-interview/**
      - api/humanistic-submit.ts
      - vercel.json
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: interview-delivery-acceptance
  cancel-in-progress: true
jobs:
  verify-current-source:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Verify current controller and synthetic API contract without changing source
        run: |
          node --check public/humanistic-interview/interview.js
          node scripts/interview-delivery-api-qa.mjs
          npm ci
          npm run build
      - name: Use open-source test engines only, no external browser service
        run: |
          python3 -m pip install playwright==1.57.0
          python3 -m playwright install --with-deps chromium webkit
      - name: Chromium synthetic regression
        env:
          QA_ENGINE: chromium
        run: python3 scripts/interview-delivery-browser-qa.py
      - name: WebKit synthetic regression
        env:
          QA_ENGINE: webkit
        run: python3 scripts/interview-delivery-browser-qa.py
      - name: Assert tests did not rewrite tracked source
        run: git diff --exit-code
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: interview-delivery-acceptance
          path: qa-interview/
          retention-days: 7
''')
 live=Path('.github/workflows/interview-delivery-live-qa.yml')
 live.write_text(live.read_text().replace('  push:\n    branches: [main]\n    paths:\n      - .github/workflows/interview-delivery-live-qa.yml\n',''))
 v=Path('vercel.json');config=json.loads(v.read_text());srcs={x['source'] for x in config['redirects']}
 for source,destination in [('/humanistic-20q/index.html','/humanistic-interview/'),('/problems.html','/problems')]:
  if source not in srcs:config['redirects'].append({'source':source,'destination':destination,'permanent':True})
 v.write_text(json.dumps(config,ensure_ascii=False,indent=2)+'\n')
 state={'baseline':BASE,'before':before,'deleted':DELETE,'updated':UPDATES,'start_commit':run('git','rev-parse','HEAD')}
 (OUT/'state.json').write_text(json.dumps(state,ensure_ascii=False,indent=2))
 print('STAGED_OBSOLETE_FILES_REMOVED',len(DELETE),'CURRENT_RUNTIME_AND_ART_UNCHANGED')
def verify():
 state=json.loads((OUT/'state.json').read_text())
 for n,sha in state['before'].items():
  if n in DELETE:assert not Path(n).exists(),n
  elif n not in UPDATES and n!=SELF:assert Path(n).is_file() and digest(Path(n).read_bytes())==sha,('Unexpected retained file modification',n)
 # The current question page, every retained asset, all existing API files and live React files must remain byte-identical.
 checks=[]
 for engine in ['chromium','webkit']:
  results=json.loads(Path('qa-interview/'+engine+'-results.json').read_text())
  assert results and all(x['pass'] for x in results),engine
  checks.append(engine+': '+str(len(results))+'/'+str(len(results)))
 assert Path('dist/humanistic-interview/index.html').read_bytes()==Path('public/humanistic-interview/index.html').read_bytes()
 assert not Path('dist/humanistic-20q/index.html').exists()
 assert 'shimmering-longma-509244.netlify.app' not in ''.join(p.read_text(errors='ignore') for p in Path('src').rglob('*') if p.is_file() and p.suffix in ['.ts','.tsx','.js','.jsx'])
 assert 'git push' not in Path('.github/workflows/interview-delivery-acceptance.yml').read_text()
 text='''# 現行 STT 來源清理 — 2026-10-20

Change Request: CR-SINGLE-CURRENT-20261020-03。
授權依據：站主明確要求只保留現行網站，刪除非現行內容，並禁止再次使用或推送付費瀏覽器。
本次範圍：STT-003 main 內確認未被現行母站使用的舊頁面、重複發布入口、過時還原腳本與設定。不是重新設計網站。

正式母站：https://stt-003.vercel.app/
正式訪談：https://stt-003.vercel.app/humanistic-interview/

## 實際程式庫變更

已刪除 69 個基準版本的舊檔，其中包含 21 個未引用舊頁面、20 個舊施工／還原或一次性工作流程、10 個舊修改腳本，以及 18 個舊入口、設定與暫存稿。另刪除本次一次性清理腳本本身，不把它計入 69 個舊檔。

AGENTS.md 移除錯誤主品牌與舊短網址，改指向正式母站及現行來源，並記載未獲事前明確同意不得使用付費外部瀏覽器、付費測試環境或推送儲值入口。ENVIRONMENT_SETUP.md 移除以 Netlify 為主要環境的過時指引。

訪談驗收 workflow 改為 contents:read，不再執行遷移腳本或 git push；真實寄信驗證改為手動觸發。此輪清理未寄出真實測試郵件。

/humanistic-20q/index.html 舊實體轉址檔已刪除，改由 vercel.json 統一轉至 /humanistic-interview/；/problems.html 也轉回 /problems。既有其他正式 routing 不變。

## 保留与驗證

現行 React 頁面與導覽、所有既有 API、正式問卷 HTML／JavaScript、二十題原文、所有保留 public 素材與既有文案，均與清理前逐檔 SHA-256 比對相同。GCSDA 頁面來源、現行獨立主機發布、人物／Logo／出版圖像與治理追溯紀錄未刪除。

npm run build、現行訪談唯讀 build gate、JavaScript 語法檢查、模擬 API 合約測試及下列瀏覽器回歸全部通過後才提交：
'''+ '\n'.join(checks)+'''

瀏覽器引擎在既有 GitHub 標準 runner 執行，沒有使用付費外部瀏覽器服務、沒有新建 Vercel Sandbox，沒有要求儲值。此為合成資料測試，非實體 iPhone／通訊軟體瀏覽器驗收。

## 尚未完成／不得誤報

本紀錄只證明已提交的程式庫清理與上述測試。舊 Netlify 問卷的遠端下架仍缺該帳戶管理存取；不要標記已刪站。Vercel 舊網址轉址也不等於歷史部署實體刪除，須另以主機操作結果回報。歷史 Git commits 及原始 QA 紀錄是追溯證據，不是現行網站內容，不重寫 Git 歷史。

本次不授予全站 QA_PASS／BUILD_LOCK，不解除 Facebook、LINE HOLD，不擴張 GCSDA 或其他媒體刪除範圍。

## 刪除清單（原始 SHA-256）

'''
 text+='\n'.join('- `'+n+'` — `'+state['before'][n]+'`' for n in DELETE)+'\n'
 Path(REPORT).write_text(text)
 Path(SELF).unlink()
 allowed=set(DELETE+UPDATES+[SELF,REPORT])
 changed=set(subprocess.check_output(['git','diff','--name-only','-z']).decode().split('\0'))-{''}
 assert changed<=allowed,('Unexpected diff',changed-allowed)
 (OUT/'accepted.json').write_text(json.dumps({'pass':True,'deleted_obsolete_files':69,'updated_files':UPDATES,'checks':checks,'retained_file_hashes_unchanged':True,'real_email_sent':False,'paid_browser_service_used':False,'netlify_retired':False},ensure_ascii=False,indent=2))
 (OUT/'stage-paths.txt').write_text('\n'.join(sorted(allowed))+'\n')
 print('ACCEPTED',69,'obsolete files removed; retained content identical;','; '.join(checks))
if sys.argv[1]=='apply':apply()
elif sys.argv[1]=='verify':verify()
else:raise SystemExit('Expected apply or verify')
