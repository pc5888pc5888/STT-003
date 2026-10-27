# STT 三本書試閱入口 — 發布前限定範圍驗證

CR：CR-20261027-STT-THREE-BOOK-SAMPLES
日期：2026-10-27

- 三個使用者指定的 Heyzine 網址均回應 HTTP 200，canonical 與輸入網址一致。
- 已逐一檢視封面，核對 Internal Compliance、Family Governance、AI Governance 與網址的對應。
- `npm run build`：PASS；既有版面、LINE 規則與訪談唯讀檢查通過。
- 匯入正式 BOOKS registry 驗證：保留四本書，其中三本標示為 sample，各自 URL 完全符合使用者提供的連結。
- 《2026 永續家族治理實務實錄》保留 `cc95743e15.html`；其閱讀模式不改為試閱。
- 編譯後 JavaScript 包含三個新試閱網址與「線上試閱」文案，沒有舊 Internal Compliance 閱讀網址 `c700d8beb2.html`。
- `git diff --check`：PASS。
- 既有閱讀入口數量檢查已從 2 更新為 4，外部 URL 檢查清單同步更新。
- 書籍封面、CSS、版面順序及學會發布分支未修改。

此處記錄發布前驗證；正式網域上的三個按鈕於部署完成後再逐一檢查。不宣告全站 QA_PASS、手機實機或電子書內頁逐頁驗收。
