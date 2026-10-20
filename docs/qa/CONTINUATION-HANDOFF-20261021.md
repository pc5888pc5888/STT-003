# 2026-10-21 續行交付與未完成項目

站主已確認二十題入口「我看了！ok！」，本輪接續其餘要求；未從零重做網站。

## 已完成並驗證

STT母站仍為 https://stt-003.vercel.app/，main。
研究與出版 /insights 已改為總覽；/books 電子書與出版、/columns 全部專欄與報導、/columns/legal 法律專欄、/columns/humanistic 人文地景產專欄、/columns/news 報導與其他發表各有專責頁及獨立metadata、canonical、sitemap與可操作的頁內導覽。
現有四本書、258筆原文章的全部內容與來源保留。系列與每篇發表平台分開，預留經核對的多系列／多平台資料，不新增假作品或空白系列頁。
二十題 /humanistic-interview/、其已接受入口、原HTML／JS、題目與26張嵌入圖、草稿、API及收件設定保持不動；不等於另做實體iPhone驗收。
詳見 docs/qa/CONTENT-SEPARATION-DELIVERY-20261021.md、docs/governance/content-separation.yaml 及原分流CR。

學會修復在獨立 gcsda-release-20261005 分支進行。正式 https://gcsda-governance.vercel.app/ 已恢復原首頁作品對應的完整1672×941圖像，並修正8個主視覺頁的圖文比例、閱讀區與手機圖文分離。原圖像素、Logo、人物／聯席會照片與正文／會員API未變。
已處理正式學會alias被Vercel登入保護攔截的問題：僅正式學會域名加入免費公開例外，不關閉全project保護。252項未登入正式網址檢查通過；原圖及版面對照364項通過。沒有使用owner cookies或臨時share token冒充公開可用；已知舊STT預覽仍受保護。
學會正式交付與限制詳見 gcsda-release-20261005 分支 docs/qa/GCSDA-HERO-DELIVERY-20261021.md（紀錄提交9509ee196a1ccea399df6ef3f55a845c3978e234）。STT main 不複製學會頁面程式。

## 最後的出版驗證維護

既有STT Column Index工作在17:17UTC產生7794fd6abac03cd66cc242e26b4777e2b69fe7e9，只更新catalog.syncedAt一行；原文章及程式未變。未回復或覆蓋這個合法同步時間。
把一次性catalog完整blob鎖定改為逐筆原文章欄位／ID保留檢查，避免合法同步時間變動引發假失敗。二十題仍維持原始blob完整檢查，沒有放寬其保護。
最後驗證run39466143951 / job118777945367，全部steps成功；203項正式出版頁檢查及四封面完整解碼／三種寬度捲動繪製驗證再次完成。artifact12285217022，SHA256868a03188f898d8b64736f270716fc739c59883ad6592c7cf9bb0dceda86a125。
該修正僅為唯讀QA，不改公開網站。沒有真實問卷送出、寄信或帳戶設定變更。

## 仍未完成，不得混報

舊Netlify網站與Vercel歷史部署本體未遠端刪除。既有分支／來源清理、redirect與公開例外不是遠端刪站。
實體iPhone／Safari與通訊軟體內建瀏覽器未進行實機驗收；不把尺寸模擬列為實機。
AI Governance及Family Governance兩本書仍缺核准翻閱URL，保留封面與誠實未提供提示，沒有假按鈕。
研究原文件／版本及公開範圍仍待核對，本輪不建立假研究文件下載或假目錄。
學會原不完整與低解析衍生檔未整批刪除；現行主視覺不再請求不完整的首頁WebP，不能寫成檔案全被刪除。

未用付費外部瀏覽器、未建立Vercel Sandbox、未要求儲值、未購買或新增付費服務。STT/GCSDA維持兩個獨立現行網站；WEBSITE仍ACTIVE_BUILD，Facebook／LINE HOLD，不宣告全站BUILD_LOCK。
