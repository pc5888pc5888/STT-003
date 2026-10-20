# STT Governance — 現行網站施工入口

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
