# 研究與出版分頁 — 實際交付紀錄

日期：2026-10-21（臺灣時間）。CR：CR-20261020-INTERVIEW-CONTENT-SEPARATION。
授權：站主已確認受訪者入口「我看了！ok！」，並明確要求接續其他已提出事項。
狀態：CONTENT_SEPARATION_DEPLOYED_AND_VERIFIED；不是全站 QA_PASS / BUILD_LOCK。

## 已上線的頁面與分工

/insights：研究與出版總覽。保留原核准主標、說明、四大治理主題與 columns.png 主視覺；不再塞入完整書籍庫、全部文章及訪談程序。
/books：電子書與出版。獨立呈現原四本書、正式封面及原有兩個線上翻閱入口。
/columns：全部專欄與報導索引，可搜尋、依主題篩選、排序、分頁。
/columns/legal：法律專欄，只呈現既有 legal 系列。
/columns/humanistic：人文地景產專欄，只呈現已公開作品，不包含二十題問卷或未公開回答。
/columns/news：既有報導與其他發表獨立頁，避免遺漏原有 news 類別。
上述路徑均在同一正式母站 https://stt-003.vercel.app；各有自己的 title、description、canonical、Open Graph、靜態 metadata HTML 與 sitemap 記錄。

頁面內設「研究與出版分類」導覽，頁尾補上三類獨立入口；已核准六項頂層導覽、受訪者專區與治理主 CTA 不新增或改名。
/books 不再轉回 /insights。/books/internal-compliance 與既有著作入口轉回 /books#internal-compliance；/publications 轉到 /books。舊 /insights 搜尋／主題查詢轉至 /columns 保留條件，#publications 轉至 /books。

## 內容、圖片與資料來源對帳

既有 public/data/mmedia-catalog.json 未改寫，blob 52f0a3fa2d9ff681c1a4e1d6ab82a45b92f4c915。
全部 258 筆原始公開資料保留：法律 242、人文地景產 5、報導與其他發表 11。逐筆比較 id、標題、原摘要、作者、日期、分類、系列與原文網址；並實際走完各系列所有分頁，沒有遺漏或重複。
四本書的原始名稱、英文標示、封面與閱讀連結從舊頁移入 src/data/contentRegistry.ts，不新增價格、販售條件或虛構連結。
原封面皆未改動：2026-sustainable-family-governance.jpg、internal-compliance.jpg、ai-governance.webp、family-governance.webp。
只有前兩本原本有 Heyzine 閱讀 URL；AI Governance 與 Family Governance 未有核准閱讀 URL，因此顯示「本書目前未提供線上翻閱連結」，不做假按鈕。

內容系列、治理主題與 publisher/sources 分開。每篇卡片由自己的 sources 決定來源文字，不再把 M 傳媒寫死為所有將來作品的來源。既有 M 傳媒記錄仍如實標為外部第三方。
新增空的 additional-publications.json 作其他已核對公開作品登錄，不含假資料。單一作品可有多個發表來源；新系列與其他媒體均可透過靜態 registry 增加，不需要新增 CMS、資料庫、登入或付費平台。相關最低登錄與核對 workflow 已寫入 docs/governance/content-separation.yaml。

## 已接受的二十題保持不動

public/humanistic-interview/index.html、interview.js、所有 API、指定收件設定、題目／同意文字／26 個嵌入圖片、草稿／複製／下載／送出程式均未修改。
問卷 HTML SHA-256：8a5b2fc70abd2c30d44ef4a0b81f5438a0406d08f28cab781ed806dc9255953d。
問卷 JavaScript SHA-256：18ebf4306ab80099bfbbf2844f314b417eb4dc7432a7d32b8badd69c40a3e609。
從新書籍頁的桌面／手機導覽實際點入受訪者專區，仍為同一 /humanistic-interview/ 並載入原二十題。沒有建立另一份問卷、新站或新網域。

## 實際驗證與限制

基準：06c460c8fe84c81ff3184e93167b1c02ae5887f8。
內容程式完成於 a7626e814758ef9ad25abf81f5cdc4690f90b2f3；後續 ccab45eba047d63063ea7de57a3a1b04fe9fa6b5 只補強影像完整解碼／捲動驗證。
Vercel 主機查核：正式母站對應 dpl_GNDVt9pEAvKVCeMBhRwiG9iJsCG8 / main / a7626e814758ef9ad25abf81f5cdc4690f90b2f3，READY；另有下述真實公開網址驗證，不以 READY 代替驗收。

初次 acceptance run 39459611399 成功；完整覆核 run 39460904230 / job 118759797796 成功。
npm run build、TypeScript tsc --noEmit、原始資料全部欄位对帳通過。
正式網址 203/203 檢查通過：六頁直接 HTTP200、各自 canonical／title／description／OG、sitemap、舊連結與404、390／768／1440px、單一 H1、無水平溢出與捕捉到的未處理 JS 例外、系列隔離、搜尋／空狀態／排序／完整分頁、鍵盤操作與受訪者入口。
另完成四個原封面的 Pillow 完整解碼，以及每個封面在三種寬度實際捲入視窗後的 12/12 像素非空白與可見性檢查。初次整頁手機截圖的畫面外圖片尚未完整繪製，不能據此宣稱四張都已看見；已逐張捲動並等待 decode 後再截圖確認，沒有改圖來掩蓋檢查不足。
兩個既有 Heyzine 閱讀入口的 HTTP GET 均為 200，未另驗證其所有翻頁／外部平台功能；未逐一做 258 個外部原文的當時可達性稽核，不宣稱所有外站永遠可用。
已檢視正式 overview 桌面、books 桌面、完整捲動後的 books 手機與 humanistic 手機截圖。

最終 artifact 12283525750：publication-separation-verification，2026-10-20T16:52:15Z。
ZIP SHA-256：3093b2de03836f95856ebf64d121835cd05db0302913c768d581590a098e6e17。
驗證只使用現有標準 GitHub runner 與開源 Chromium；未使用付費外部瀏覽器、Vercel Sandbox、儲值或新第三方服務。未送出真實訪談／測試信，未使用真實受訪者資料。
本輪是內容分頁與上述瀏覽器／來源驗證，非實體 iPhone/Safari 或全站人工無障礙認證。

## 仍待處理

GCSDA 底圖與排版修復按順序接續，本紀錄不宣稱學會已修好；本階段未改動學會現行分支／圖片／組織資料。
/research 的原始研究文件、版本與可公開範圍仍需核對，不建立假研究列表或假下載；現行 /research、/papers 維持回總覽，且不當成獨立內容頁納入 sitemap。
兩本未提供閱讀入口的書保留待補網址，不虛構。
舊 Netlify 站、Vercel 歷史部署本體尚未遠端刪除，此輪不以分頁施工冒充刪站。
Project 上傳 v1.0 原附件未因 Github 寫入而被自動覆蓋；本 CR 與 content-separation.yaml 是本次正式核准增補。
WEBSITE ACTIVE_BUILD；Facebook／LINE HOLD。
