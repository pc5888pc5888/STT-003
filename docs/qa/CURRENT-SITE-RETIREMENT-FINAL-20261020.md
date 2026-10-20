# STT 現行網站清理與主機查核紀錄

日期：2026-10-20。Change Request：CR-SINGLE-CURRENT-20261020-03。
本紀錄補充 CURRENT-SITE-CLEANUP-20261020.md 的後續執行结果，並取代其中尚待更新 workflow 的進度狀態。不是全站 QA_PASS／BUILD_LOCK 宣告。

## 正式來源及費用邊界

唯一正式 STT 母站入口：https://stt-003.vercel.app/
母站內正式訪談入口：https://stt-003.vercel.app/humanistic-interview/
現行來源：pc5888pc5888/STT-003 的 main；首頁 HomeCanonical.tsx；正式訪談 public/humanistic-interview/index.html 與 interview.js。

站主已明確拒絕付費瀏覽器。本輪未使用付費外部瀏覽器、未新建 Vercel Sandbox、未要求儲值、未新增第三方供應商。AGENTS.md 與 docs/ENVIRONMENT_SETUP.md 已寫入：未取得站主事前明確同意，不使用付費外部瀏覽器、付費測試環境或提供儲值入口；缺少主機管理權限時直接回報權限，不推付費工具。

## 已實際刪除與修正

程式庫清理已推送至 main：17bef74f312ee0095d99a1f10c5698c9bb3f9e44。
69 個原有過時檔案實際刪除：21 個未被現行路由引用的舊頁面、20 個舊施工／還原或一次性 workflow、10 個舊修改腳本、18 個舊入口／Netlify 設定／暫存稿。原始檔名及 SHA-256 詳見 CURRENT-SITE-CLEANUP-20261020.md。本輪一次性清理腳本也已自我移除，不列入 69 個舊檔。

保留現行 React 頁面、導航文字、所有既有 API、正式二十題問卷 HTML／JavaScript 與全部保留 public 素材；逐檔 SHA-256 比對未改動。沒有重做 Logo、人物照、出版封面或已核准圖像。沒有重寫品牌定位、題目或隱私條件。

AGENTS.md 與 ENVIRONMENT_SETUP.md 已移除錯誤母品牌、未核對短網址，以及以 Netlify 為主要環境的過時指令。

訪談驗收 workflow 已由授權 GitHub connector 更新完成，不再停留於工作目錄：
- ef28f927e6309b7807ae32da734edc38e62b2aa7：interview-delivery-acceptance.yml 改為 contents:read，不執行舊遷移腳本、不 git push、不改寫正式頁面。
- 62443a5c31daf0a885bff8596c534f72f66225fb：interview-delivery-live-qa.yml 改為僅 workflow_dispatch，不因推送檔案自動寄出真實測試信。
- d5099c780b424ec93be77b0bd33c71176a45a18e：stt-fixed-domain-verify.yml 不再 checkout 過時提交或核對過時資料量，改為只讀取現行公開網址與來源的驗證。

Git 歷史與原始 QA 證據保留作追溯，不作現行施工输入；未重寫 Git 歷史。

## 舊網址的實際狀態

Vercel 已對 45 個既有非 GCSDA 的 STT 舊分支／副本 alias 更新設定，移除其舊 deployment 指向，設定 redirect=stt-003.vercel.app。61 筆 alias 清冊中，45 筆舊 STT alias 已更新；3 筆標準現行 alias 保持同一現行 production deployment；13 筆獨立 GCSDA alias 未修改。

不能將以上寫成「45 個部署已刪除」，也不能寫成「匿名訪客實際都已轉回母站」：公開、未登入的 HTTP 查核中，45/45 舊 alias 先受到 Vercel 登入保護，0/45 在第一跳直接轉至 canonical；本輪沒有繞過登入保護。已確認的是它們沒有直接向匿名請求回傳舊站內容，且主機記錄中已設定統一轉址。底層歷史 deployment 及舊 Git 分支並未實體刪除，未證明今後從所有舊分支重新發布均已被主機層阻止。

母站內以下 6 條舊路徑均公開實測為 308：
/humanistic-20q、/humanistic-20q/、/humanistic-20q/index.html、/humanistic-interview、/humanistic-interview/index.html 均回 /humanistic-interview/；/problems.html 回 /problems。

獨立 Netlify 舊問卷 shimmering-longma-509244.netlify.app 仍回 HTTP 200，尚未停用或刪除。缺少該 Netlify 原帳戶的已驗證管理存取，未執行遠端刪站。

GCSDA 是獨立組織网站，未刪除或改寫。其公開入口本次匿名檢查回傳 Vercel SSO 登入轉址，故本輪不宣稱其匿名可達性通過；這不在本次 STT 刪除／改版授權範圍。不得以刪除整個 stt-003 Vercel project 來清除歷史部署，該 project 同時承載現行 STT 與 GCSDA。

## 本輪驗證證據

清理 workflow：run 39428237041，成功推送清理提交；artifact 12266408305（stt-current-site-cleanup-evidence）。建置、唯讀問卷 build gate、語法與合成 API 合約，以及 Chromium 40/40、WebKit 40/40 通過。初次 runner 因 workflow 更新權限不足而被 GitHub 拒絕的 push 不列作完成；後續已使用授權 connector 完成該兩份 workflow 更新。

更新後的唯讀驗收：run 39428819208，success，驗證其不會重寫追蹤來源。

正式網址查核：run 39430413567；artifact 12267507607（stt-current-public-verification）。6/6 舊路徑 308 正確；正式訪談 HTML 與控制程式 HTTP 200 且與現行來源逐 byte 相同。

正式訪談 HTML SHA-256：8a5b2fc70abd2c30d44ef4a0b81f5438a0406d08f28cab781ed806dc9255953d。
控制程式 SHA-256：18ebf4306ab80099bfbbf2844f314b417eb4dc7432a7d32b8badd69c40a3e609。

母站 11 頁於 390、768、1440px 共 33/33 基本公開頁面檢查通過：HTTP 200、主要內容可見、頁面標題／canonical 可讀、無舊 Netlify 訪談連結、無捕捉到未處理 JavaScript 例外；33 組未發現水平溢出。已另檢視首頁手機與桌面截圖。這不是所有圖片、每個控件、所有無障礙項目或實體 iPhone／Safari 的全面驗收。

正式 Vercel 網址在查核時指向 deployment dpl_92L9jGpKmnnMyvypRriWnSxy6EtN，main 提交 d5099c780b424ec93be77b0bd33c71176a45a18e，READY。READY 僅作部署對應證據，前述 HTTP／頁面測試另行成立。

本輪未送出真實問卷／真實測試郵件，未處理真實受訪者內容。沒有恢復先前遺失的回答。

## 仍待完成

Netlify 舊問卷遠端停用／刪除；Vercel 舊部署與舊分支的完整退役；所有舊分支的主機層重新發布限制。不能將這些未執行項目標記完成。本次來源清理及已核對的公開路徑修正不改變 WEBSITE ACTIVE_BUILD，Facebook 與 LINE 保持 HOLD。
