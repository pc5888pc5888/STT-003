# CR-20261020-INTERVIEW-CONTENT-SEPARATION

## 核准與執行順序

狀態：INTERVIEW_ENTRY_ACCEPTED; CONTENT_SEPARATION_AUTHORIZED。
Approved by Founder：YES。
二十題入口已完成之證據：docs/qa/INTERVIEW-ENTRY-DELIVERY-20261020.md。
站主於本輪明確確認「承上我看了！ok！」，並要求「其他我提出來的部分可以協助處理了嗎？」及「承上請繼續執行」。本輪承接先前已提出的三類內容獨立分頁需求，不再要求同一授權。

先處理研究與出版的內容分頁、驗證並交付，再處理 GCSDA 圖片；不交錯施工。已接受的受訪者入口、原問卷、資料與送件機制不變。

## CHANGE REQUEST REQUIRED — 本次核准的限定變更

受影響文件／規則：02_SITE_TREE.md、site_source_of_truth.yaml 的 Insights 頁面範圍、Master Build Spec 的 PAGE-INSIGHTS、相關 page/copy/link/SEO registry、COPY-001；先前 ROUTE-001 核准之六項導航保持不變。
本 CR 與 docs/governance/content-separation.yaml 為本次核准增補；Project 上傳的 v1.0 原附件不會被 GitHub 寫入自動覆蓋，不宣稱已覆寫附件。

修改前：/insights 同時呈現完整書目與所有專欄；/books 被永久轉回 /insights?theme=civilization；全部文章卡片固定寫 M 傳媒。
修改後：/insights 為總覽，保留核准主標／說明與四大治理主題，導向專責內容頁。/books 為電子書與出版；/columns 為專欄與報導索引；/columns/legal 為法律專欄；/columns/humanistic 為人文地景產專欄；/columns/news 為既有報導與其他發表。不得新增沒有內容的系列。
理由：同一網站可以有多個用途明確的頁面。採訪準備、公開專欄作品、書籍出版及發表平台不是同一概念。

## 已核准受訪者入口 — 保持不動

導航：你正在面對什麼／STT 如何判讀／治理委任／研究與出版／受訪者專區／關於 STT。
主 CTA「開始治理判讀」→ /start。
受訪者專區 → /humanistic-interview/，維持 reloadDocument、同分頁與唯一問卷。
保留 public/humanistic-interview/index.html、interview.js、所有二十題、26 個嵌入圖片、同意文字、storage keys、草稿 schema、API、指定收件人、複製／儲存／下載／讀回／送件及失敗處理；不因出版分頁修改它們。
人文地景產專欄是公開作品，不再包含二十題表單或未公開回答。

## 內容與來源

既有 public/data/mmedia-catalog.json 是本輪來源基準，不改寫標題、作者、原始摘要、日期、原文網址或系列分類。保留全部既有條目，不只保留首頁顯示的前幾筆。
四本書籍之名稱、英文標示、封面與原有兩個翻閱連結從現行 Columns.tsx 移至內容 registry，不虛構另外兩本的翻閱／購買網址，不新增價格。
系列名稱與 publisher、原文網址、來源關係、治理主題分開登錄。每篇顯示其自身来源；M 傳媒是外部第三方之一，不寫死為所有未來內容的來源。每個作品可列多個經核對的發表來源。
沿用靜態 registry，不新增 CMS、資料庫、登入或付費服務。公開資料限原有可公開標題、摘要及原文連結，不搬運外站全文；未公開訪談資料不進目錄、sitemap 或程式庫。

## 路由與畫面

取消 /books 的匯回規則；/books/internal-compliance 舊入口回 /books#internal-compliance。舊 /insights?theme=...、搜尋／分頁條件轉入 /columns 保留條件；舊出版錨點轉至 /books。
每個正式新頁具有自己的 title、description、canonical、Open Graph、靜態 SEO head 與 sitemap 記錄；/columns 的未知系列路徑不得誤顯示全部作品。
出版子導覽位於頁面內，不再增加頂層導航或改動受訪者入口。新頁以排版與原有書籍封面呈現，不生成或借用未核准底圖。
/research 的原始研究文件與公開權限未完成核對，本輪不新增虛構研究列表或假下載按鈕，另記 CONTENT_REQUIRED / SOURCE_REQUIRED。

## 驗收

驗證總覽不含完整書目／文章庫，三類指定內容各有獨立網址；全部來源條目對帳、系列不交叉混入、搜尋／排序／分頁及返回可用、書籍連結與封面完整、空搜尋狀態明確。
390／768／1440px 截圖、鍵盤與行動導覽、無水平溢出、單一 H1、metadata／canonical／sitemap、404 與舊路徑一致。公開來源聲明不再含內部施工指令。
問卷、API、主導航與核准素材逐檔對帳不變；不以此輪測試代替實體 iPhone 或全站驗收。
施工與主機結果另写入 docs/qa/CONTENT-SEPARATION-DELIVERY-20261021.md；沒有實際部署與頁面驗證不得填完成。

## 其他邊界

GCSDA 是另一個現行獨立組織網站，不是要刪除的 STT 舊站；圖片修復待本輪分頁完成再進行。
Netlify／Vercel 歷史部署退役仍屬 CR-SINGLE-CURRENT-20261020-03。轉址、隱藏與刪除分支均不等於遠端刪站。
不使用付費外部瀏覽器、不建立付費測試環境、不要求儲值。Facebook／LINE HOLD；WEBSITE ACTIVE_BUILD，不授予整站 BUILD_LOCK。
