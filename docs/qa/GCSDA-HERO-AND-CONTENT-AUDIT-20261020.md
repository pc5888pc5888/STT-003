# 現行兩站：內容分流與 GCSDA 主視覺查核

日期：2026-10-20。狀態：DIAGNOSIS_COMPLETE；PUBLIC_FIX_NOT_DEPLOYED。這是查核紀錄，不是網站修復完成或全站 QA_PASS。

## 範圍與基準

依站主本輪提供的 STT /insights 與 GCSDA 首頁截圖，核對現行導覽、出版／专欄／訪談分類及學會底圖顯示。沒有從零重建兩站。
STT：stt-003.vercel.app；查核時來源 main / 1155d9603064c8be31211a05a762d56b0b49d1ad，Vercel dpl_44tgtoc69arZt7Jdi8FVuGrzLoAk。
GCSDA：gcsda-governance.vercel.app；來源 gcsda-release-20261005 / 60303eb4370fa0738430af3f78ce171428b56fa4，Vercel dpl_F8Eo78b7EsHyBpQLYVT3CeRDcDSn。
兩站仍屬不同機構；共同主機 project 不是合併兩站的理由。禁止使用 Delete Project 清理舊部署。

## STT 內容被合併的現行程式事實

src/App.tsx 把 /insights 指向 Columns；/books 與 /books/internal-compliance 導向 /insights?theme=civilization；/research 與 /papers 也沒有獨立研究內容頁。
src/pages/Columns.tsx 同時包含四本出版品、二十題採訪入口、研究說明，以及公開文章清單。
同檔將二十題入口命名為「人文地景產專欄｜20 Questions Journey」，把取材作業與公開系列作品混為一種內容。
同檔的出版說明出現「四本正式出版圖像與既有閱讀入口集中在本頁，不另擴張母站頂層路由。」這是施工邏輯混入公開說明，不是讀者需要的內容。
文章清單直接 import public/data/mmedia-catalog.json，卡片來源文字固定為「外部發表／第三方媒體 · M 傳媒」；資料型別的 series 也固定為 legal / humanistic / news。未來直接加入其他媒體條目，會有錯標來源的風險。

分析：單一現行網站不等於只能有一張內容頁。原 Site Tree 的 /insights 總入口與 ROUTE-001 的五項主導航，不應被延伸解讀成所有出版與專欄必須共用一頁。頁面分工、主題分類、專欄系列與發表平台應各自獨立。
新增主導覽及新頁面名稱仍須依 CHANGE REQUEST 處理；本輪只提出方案，沒有改寫 LOCKED 導覽或正式來源。

## GCSDA 首頁空白：已證實的圖片完整性故障

現行 src/GCSDAStandaloneV3.tsx 的 Home 與 PageHead 都已傳入 image={pageVisuals[...]}; GovernedHero 接收 image，將其用作 picture，並渲染 figure / img。因此本輪現況不能再解釋成沒有傳入圖片參數。
首頁指向 public/visual-bank/gcsda/home-approved.webp。
這個現行檔案的實測結果：
- 實際檔案：7,495 bytes。
- RIFF 檔頭宣告總長：16,526 bytes。
- VP8 區塊宣告 payload：16,506 bytes。
- SHA-256：1846c3115a2c2bca303c305792ecd9e64e25351969ea21aa020fb25db77511b7。
- Pillow 完整影像解碼失敗：could not create decoder object。

這是實際位元組不完整的檔案，不能因檔名帶 approved 就視為有效主圖。

瀏覽器結果須完整記載：本次 Chromium 對该不完整圖片仍回 img.decode() 成功、complete=true、naturalWidth=800、naturalHeight=450；但以現行程式重建的首頁截圖仍重現大面積空白。不能宣稱 Chromium decode 拒絕，也不能將 img.decode()/naturalWidth/HTTP 200 單獨視為圖片完整及實際可見的證據。

基準重建的 1440px 首頁，figure 和 img 均為 display:block / visibility:visible / opacity:1，寬 1440px、高 810px；不是 CSS display:none。截圖已人工檢視，與站主提供的空白首頁現象一致。沒有在正式站偷偷換成另一張圖。

## 畫質與構圖：不能以檔案存在取代驗收

七個有主視覺的內頁目前 pageVisuals 使用 PNG：about / governance / council / membership / events / knowledge / charter，資產尺寸均為 1672×941。/privacy 沒有指定主視覺，不应随意補圖。
同目錄另有 220×124、420×236、600×338 的舊 WebP 縮圖。它們不是目前這七個內頁的直接 image 來源，不能據此宣稱全部現行內頁都在用 220px 縮圖。
首頁則讀出 800×450 的圖頭尺寸，且檔案不完整；在 1440px 滿幅配置已超出該水平尺寸。即使找到完整 800px 同圖，也不能因此標示為高解析原圖。

現行 cis-page-system.css 讓主視覺依圖片比例全寬撐高、桌面文案寬 min(36%,590px)，並在 1201px 以上固定 margin-top:180px。這些規則與每張圖的主體位置、文字長度未逐頁驗收，是視覺整改的檢查項目，不是本輪已變更的值。
整改應先完成同一核准原圖的完整性／來源比對，再按既定構圖調整顯示比例、留白漸層、文字寬度、行距與行動版分區；禁止任選其他頁底圖、重新生成或以低清縮圖放大冒充原圖。
目前完整核准首頁原圖的恢復與同圖高解析度比對尚未完成：ASSET_REQUIRED / SOURCE_REQUIRED。已找到 Library 歷史 HTML 作資產比對候選；沒有將該 HTML 視為現行網站來源，亦未將其重新部署。

## 公開可達性

本次匿名 GCSDA 請求最後落在 Vercel 登入頁，不是學會首頁；經已授權 Vercel 管理連線讀取首頁可得到其 HTML。這兩種存取必須分開。站主登入後看到頁面，不代表未登入訪客可直接進站。正式公開入口可達性仍待修正及匿名驗收，不得為此全面開放歷史預覽部署。

## 證據與本輪實際修改

GitHub run 39439443091 / artifact 12273393463：精確 GCSDA 現行提交重建、27 個 route/viewport 觀測、圖片清冊、首頁及 About 截圖。這是診斷執行成功，不代表頁面驗收通過。
GitHub run 39440929590 / job 118690235764 / artifact 12275150699：原檔長度與 RIFF 比對、Pillow 與 Chromium 實測結果、原檔備查副本。
本輪以既有 GitHub 標準 runner 執行開源檢查；沒有付費外部瀏覽器、Vercel Sandbox、儲值或新訂閱；沒有真實訪談或寄信操作。
本輪只加入查核工作及紀錄／變更提案；沒有更動任何公開文案、二十題、Logo、人物照、主圖、送件 API、收件人或 GCSDA 發布 alias。
既有的舊 Netlify 刪站、Vercel 歷史部署退役、實體 iPhone/Safari 與通訊軟體內建瀏覽器驗收、兩站完整視覺與技術 QA 仍未完成，不會由此次診斷自動變成 PASS。
