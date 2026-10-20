# CR-20261020-INTERVIEW-CONTENT-SEPARATION — 受訪者入口分流

狀態：PARTIALLY_APPROVED_INTERVIEW_ONLY。
Approved by Founder：YES，僅本次二十題独立入口。其餘出版分頁提案暫停，不於本輪施工。
授權依據：站主已要求導覽列設獨立受訪者入口；在「先完成二十題的操作、獨立入口與驗收」及「把獨立入口正式上線」的具體回覆後，明確指示：「那趕快做啊，不要我問你時你都這樣理由藉口一大堆」。承接前述推薦名称「受訪者專區」，不重新要求相同授權。

## CHANGE REQUEST REQUIRED — 本次限定例外

受影響規則：ROUTE-001 主導航五項限制、COPY-001 訪談入口名稱；其餘品牌定位、主 CTA、AI 與機構邊界不變。
原導航：你正在面對什麼／STT 如何判讀／治理委任／研究與出版／關於 STT。
本次核准：你正在面對什麼／STT 如何判讀／治理委任／研究與出版／受訪者專區／關於 STT。
新增目的地：既有 /humanistic-interview/，直接完整載入原問卷文件；不新增第二份問卷、網域、登入或後端。
主 CTA「開始治理判讀」仍指向 /start，不改成採訪入口。窄版選單保留該 CTA 的可到達性。

## 本次實際施工範圍

src/App.tsx：新增主導航「受訪者專區」；桌面與行動版使用完整文件導覽，避免 React Router 把獨立靜態問卷當成不存在的 SPA 路由。頁尾改為「受訪者專區｜二十題訪談準備」，同一分頁、同一網址。
src/pages/Columns.tsx：僅移除將「人文地景產專欄｜20 Questions Journey」混同的採訪準備區塊。公開文章條目、來源、電子書與已核准圖片不改。
src/styles/interview-entry-navigation.css、src/main.tsx：窄螢幕改用可捲動選單；不縮小 Logo、不擠壓既有治理 CTA。

本次不改原問卷 HTML、JavaScript、二十題題目、同意文字、圖片、暫存鍵、草稿 schema、複製／儲存／下載／讀回／送件邏輯、API 金鑰或指定收件人。原始問卷頁內既有標題不於此入口移設中重写；網站入口名稱與公開專欄作品分類分開。

## 正式規格增補

本 CR 是 01_NON_DRIFT_RULES.md 的 ROUTE-001、02_SITE_TREE.md、site_source_of_truth.yaml 的 nav.main，以及 Master Build Spec 的導航／Insights 訪談區塊之限定核准增補。新增的 nav、page、copy、link、QA 對照均列於本檔；其他原規格不變。
Project 上傳的 v1.0 原檔未被 GitHub 操作覆寫；不得宣稱已同步覆寫 Project 附件。本 CR 對應之程式庫部署才是本次施工成果。
PAGE-INTERVIEW：採訪前準備與二十題填答，不是公開成果目錄。
COPY-INTERVIEW-NAV：受訪者專區。
COPY-INTERVIEW-FOOTER：受訪者專區｜二十題訪談準備。
LINK-INTERVIEW：桌面導航、行動導航、頁尾均指向 https://stt-003.vercel.app/humanistic-interview/；canonical 與舊路徑轉址保留。

## 驗收

新增入口在桌面／手機選單可見；滑鼠、觸控尺寸及鍵盤 Enter 均實際載入原靜態問卷，不能只是網址變了但顯示 404。不得有 Logo／導航／CTA 重疊或水平溢出。
/insights 不再出現混同的採訪準備區塊，原有書目與文章仍在。
原問卷 HTML／控制程式／API 與此輪開始前一致；沿用既有四項操作驗證，不以更換入口為由重做送件機制。實體 iPhone／Safari 未操作不得標記通過。
Implementation commit、production check、未完成項目：寫入 docs/qa/INTERVIEW-ENTRY-DELIVERY-20261020.md，未有主機／HTTP 證據前不寫已上線。

## 其他提案保留待後續，不在本輪同步執行

/insights 保留研究與出版總覽；/books 電子書；/columns、/columns/legal、/columns/humanistic 各自呈現公開作品；/research 僅以核對來源上線。這些仍待後續分頁施工，不恢復已退役的 Books/Papers/Home 舊程式。
二十題是採訪準備，人文地景產是公開成果。多系列與多發表平台須逐篇記錄，不能把全部作品寫死為 M 傳媒。M 傳媒是外部第三方來源，不屬 STT。
GCSDA 排版／底圖與電子書／其他專欄全部暫停。Netlify／Vercel 歷史部署退役仍屬 CR-SINGLE-CURRENT-20261020-03，不能把本次改入口冒充已刪站。
不新增付費瀏覽器、付費測試環境、服務或社群渠道；Facebook／LINE HOLD 不變。
