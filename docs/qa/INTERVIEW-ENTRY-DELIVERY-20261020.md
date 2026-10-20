# 二十題獨立受訪入口 — 實際交付紀錄

日期：2026-10-20。
Change Request：CR-20261020-INTERVIEW-CONTENT-SEPARATION，PARTIALLY_APPROVED_INTERVIEW_ONLY。
狀態：RESPONDENT_ENTRY_DEPLOYED_AND_VERIFIED。這是本次獨立入口交付，不是整站 BUILD_LOCK、所有裝置或歷史主機退役完成宣告。

## CHANGED

母站桌面導覽與手機選單已新增「受訪者專區」，位置在「研究與出版」之後、「關於 STT」之前。桌面／手機 NavLink 均以 reloadDocument 完整載入原問卷，而不是讓 React SPA 導到 404。
頁尾「人文地景產｜20 Questions ↗」已改成「受訪者專區｜二十題訪談準備」，使用同分頁的同一正式路徑。
/insights 中「人文地景產專欄｜20 Questions Journey」的採訪準備區塊已移除。實際 Columns.tsx 差異僅為刪除该 12 行區塊；四本書目、所有公開文章目錄、來源、圖片與原文連結沒有更動。
新增限定於母站頁首的導航樣式；窄螢幕使用可捲動手機選單，保留「開始治理判讀」→ /start 的可到達性。沒有縮小核准 Logo 來硬塞導航。

## UNCHANGED / ASSETS

原始問卷 HTML、JavaScript、二十題題目、26 個嵌入圖片、同意文字、storage keys、草稿 schema、複製／儲存／下載／讀回／送件／失敗處理程式、API、指定收件設定，均與本輪開始前相同。
HTML blob：6b0ad4acf014f3dbfda2397f2b7db5597290b677；SHA-256：8a5b2fc70abd2c30d44ef4a0b81f5438a0406d08f28cab781ed806dc9255953d。
JavaScript blob：4fb411cb3a72806f6eb5a57923778f18b78448c8；SHA-256：18ebf4306ab80099bfbbf2844f314b417eb4dc7432a7d32b8badd69c40a3e609。
沒有修改／生成任何 Logo、人物照、核准圖片；GCSDA、電子書／專欄分頁全部未施工。

## ROUTES

唯一正式二十題填答網址：https://stt-003.vercel.app/humanistic-interview/。
桌面導覽、手機選單與頁尾直接到達該既有網址，沒有建立第二份問卷、第二個網域或新主機專案。canonical 不變。
/humanistic-20q、/humanistic-20q/、/humanistic-20q/index.html、/humanistic-interview、/humanistic-interview/index.html 五個舊路徑均實測回到該正式網址。

## QA — 實際執行，不僅查看 READY

Workflow run 39447279580，第二次執行 job 118716048289。原問卷 source blob 對帳、npm run build、API 合約測試、Chromium 40/40 與 WebKit 40/40 合成資料回歸通過；涵蓋四項操作、草稿讀回、斷線／拒絕儲存／不完整送件回覆時保留資料。
正式網址入口測試 215/215 通過：390、768、1024、1280、1399、1400、1440、1920px；从首頁與 /insights 實際點擊或鍵盤 Enter 載入原問卷、開始流程、返回母站、同分頁、canonical、原程式逐 byte 相同、無水平溢出或捕捉到未處理 JS 例外；桌面 Logo／導航／CTA 不重疊。
已人工檢視該次生成的正式站 header-1440.png、header-390.png 與 interview-390.png；桌面與手機選單中「受訪者專區」均實際可見。
Artifact：12275789551，single-respondent-entry-verification，建立時間 2026-10-20T15:28:33Z。ZIP SHA-256：ad36fe5831febbfa1f04103b30cc105295baf78c546d012f2848634fe187440e。
第一次入口測試因手機連結的可及名稱包含既有數字序號，測試用完整名稱精確比對而失敗；只修正測試定位器辨識實際「05 受訪者專區」，保留所有點擊、導向、無溢出等斷言後重跑通過。沒有將第一次失敗寫成通過。
本輪未寄送新的真實測試郵件；送件服務實收證據沿用前輪已讀收件匣紀錄，不能宣稱本輪新信已收。WebKit 剪貼簿測試包含測試介面替代，不宣稱等同實體 Safari 的系統剪貼簿。

## IMPLEMENTATION / DEPLOYMENT

本輪開始基準：416afa5fda21c444618b1da1c404e91837fe0407。
App：c1da5860c33a3c3bbb0c666966fe88062447e814；導航 CSS：7115503f1460f198090e1f90aac40a1efd2ec74a；樣式載入：e4e3352facd873a5614757903fede26489e689b9；移除混同區塊：a1a9408f3378714d8082cf408cd0a263a37a88ef。
查核時正式 alias stt-003.vercel.app 指向 dpl_433qCrobgZ2qTPsxQ3b9RetjfPvv，main / d46743ffd292ee7321a10d99c3b4c1d168b62eb6，READY。公開頁面／操作測試另行成立，非以 READY 代替驗收。
沒有執行自動寫回網站的 mutation workflow。未使用的一次性準備腳本已刪除；現存驗證 workflow 為 contents:read，不改写來源。

## OPEN ISSUES / BOUNDARIES

實體 iPhone／Safari、通訊軟體內建瀏覽器尚未操作驗收，不標示通過。原問卷內既有頁名、圖片內人文地景產文字與自動保存提示未在本次入口移設中改寫；分頁暫存不是永久備份，關閉前仍須自行保管已儲存的草稿檔。
舊 Netlify 與 Vercel 歷史部署本體的退役不是本輪項目，未宣稱已刪除。其他頁面的分拆與學會圖片修復暫停，不能同時列作完成。
原 CR 已記錄 ROUTE-001／COPY-001 的本次限定核准例外。Project 上傳 v1.0 原附件未被此 GitHub 寫入覆蓋。Facebook／LINE HOLD 保持不變。
本輪未使用付費外部瀏覽器、未建立 Vercel Sandbox、未要求儲值、未新增第三方服務。
