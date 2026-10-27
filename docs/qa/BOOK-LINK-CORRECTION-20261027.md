# 書籍閱讀連結 — 發布前限定範圍驗證

CR：CR-20261027-DUAL-SITE-BOOK-LINK
日期：2026-10-27

- `npm ci --ignore-scripts --no-audit --no-fund`：完成。
- `npm run build`：PASS（既有版面與 LINE 規則檢查均通過）。
- 精確差異檢查：每個實作檔只有指定舊網址替換為新網址；其他內容與 URL 不變。
- 建置後 JavaScript：新網址出現一次，指定舊網址為零次。
- 新 Heyzine 頁面：HTTP 200，canonical 符合新網址，封面人工核對為《2026 永續家族治理實務實錄》。
- 正式入口：STT `/books`；GCSDA `/knowledge`。
- 圖片與 CSS 未修改，未新增外部套件或服務。
- 本機為 sparse checkout；GCSDA 圖片 URL 保留原字串，由正式 Git 完整來源建置。
- 初次本機建置缺少未取出的 `tsconfig.node.json`；補取既有檔案後重跑成功，未改動設定。

本紀錄是發布前限定範圍 QA；正式網域與閱讀按鈕於部署後另行驗證。未宣告全站、手機實機或整本電子書逐頁驗收通過。
