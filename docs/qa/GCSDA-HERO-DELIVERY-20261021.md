# GCSDA 底圖、圖文排版與正式公開入口 — 實際交付紀錄

日期：2026-10-21（臺灣時間）。
變更：CR-GCSDA-HERO-20261021、CR-GCSDA-PUBLIC-ACCESS-20261021。
狀態：HERO_REPAIR_DEPLOYED_AND_ANONYMOUSLY_VERIFIED。
本紀錄取代上述 CR 的 implementation_in_progress / execution_pending 進度；不是整站 QA_PASS／BUILD_LOCK。
執行順序：先完成 STT 出版分頁與正式網址驗證，再修改 GCSDA，未重新施工已被站主接受的二十題。

## CHANGED — 實際畫面與圖像

正式網址保持 https://gcsda-governance.vercel.app/，未新增網站、域名或主機專案。
首頁不再請求不完整的 /visual-bank/gcsda/home-approved.webp，而由唯一 Hero resolver 使用原已核准首頁作品的完整原图。
已核對的完整檔位於既有 public/visual-bank/gcsda/council.png：1672×941，1923720 bytes，SHA256 3eeb5a932e9582c5e602ff56a712e1fdd504ef4c14d9c1ebb417e9f9bfa90f42。先前 Library《GCSDA_全站排版修正版.html》首頁的圖像鍵 3eeb5a932e9582c5e602 與該原圖相符；home.webp 的低解析衍生圖亦為相同冊頁、封緘卷軸、樹與指南針構圖。本次不是任意改用別頁的不同作品，更不是重新生成圖片。
原不完整 WebP 實際7495 bytes、RIFF宣告16526 bytes，完整解碼失敗；既有600×338縮圖未拿來放大冒充原圖。舊檔仍作既有資產保留，現行頁面已不再請求它；不得寫成該資產實體已被刪除。

新增僅限學會的 gcsda-hero 版面規則：桌面保持左側閱讀區與右側原圖，使用局部白色漸層處理交界；移除舊固定180px下移效果，首頁與內頁首屏高度不再被任意拉長。
圖片完整等比例 contain 顯示，不變形、不靠過度放大或裁掉原圖補版面。手机／窄平板將圖片與文字上下分開，不把正文壓在複雜圖像上。隱私頁維持純文字，不補造底圖。

## UNCHANGED / ASSETS

所有 public 原始像素、Logo、最新聯席會團體照、人物姓名職銜、會員申請程式與API／指定收件設定、組織正文、章程／活動資訊、既有標題文字與換行資料、路由及 metadata 均未改寫。
Git source diff 驗證上述原檔與60303eb4370fa0738430af3f78ce171428b56fa4相同；瀏覽器另逐頁比較所有 main 可見文字及非 Hero 圖像來源一致。
STT main 的已接受二十題 HTML／JavaScript／API／26 個嵌入圖與新出版分頁均未在學會施工中修改。正式二十題公開字節再次對帳通過。

## ROUTES / 正式公開存取修正

初次匿名公開查核 run39464839620 / job118773405826，首頁回302到Vercel SSO；不是網頁畫面修好即代表一般訪客能進站。失敗紀錄 artifact12284108581保留。
依已核准 CR-20261005-GCSDA-FREE-OFFICIAL-ORIGIN 的正式公開用途，本次只對 gcsda-governance.vercel.app 的 alias 建立 scope=alias-protection-override。
Vercel get_alias 先確認 alias 所屬 project與team；patch_url_protection_bypass 回傳成功，後續 get_alias 再讀到同一 canonical alias 上的 override。未修改全project的 ssoProtection，未放行其他branch aliases，也未把臨時share token當正式網址。
方案依據為 Vercel 2026-09-09 官方公告 Protect production deployments for free on every plan，Deployment Protection Exceptions 已在所有方案免費提供。未購買任何方案、訂閱、Password Protection 或付費瀏覽器。
來源：https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan

修正後，同一匿名查核以全新瀏覽器／HTTP context重跑：正式9頁全部200，沒有owner cookies或share token，首頁與各頁新主視覺實際可見。已知退役 STT g1-home alias抽查仍回302到SSO，未重新公開舊頁；不宣稱已逐一覆核全部歷史部署。

## QA — 局部建置與現行正式网址分開驗證

原圖與版面驗收 run39463182185 / job118767583004：364/364通過。涵蓋7幅唯一高解析PNG的完整解碼、8個主視覺頁＋隱私頁、390／768／1024／1440px、主標與正文相同、非Hero圖片與Logo相同、無水平溢出或捕捉到的未處理JS例外、文字區邊界、桌面高度、手機圖文分開、圖片實際像素非空白、按鈕導向。
artifact12282824330，gcsda-original-art-hero-repair，SHA256 52d083a8be4c4828923cc2d78e3b8eec2d3185d86100ada1f2865aa63d6bc82e。
第一個workflow版本因job env引用未支援的runner context而未開始；修正後才完成上述364項，不將最初失敗列通過。

正式匿名驗收 run39464839620第二次執行 / job118774607334：252/252通過。9頁的HTTP200、static canonical、完整原圖公開byte對帳與解碼、四種寬度的新Hero標記／單一H1／實際圖片繪製／無溢出／無JS錯誤／首頁操作、沒有請求損壞WebP、STT問卷未改、舊預覽仍受保護。
artifact12284586986，gcsda-anonymous-public-hero，建立於2026-10-20T17:23:12Z，SHA256 1917f99d7e4ac9f972670aba86b17be1a6b15d7415b7544d61e6b2fb34b10ea9。
已檢視before與after之首頁1440、手機390、關於學會1440，以及正式匿名首頁1440截圖；不是只看建置READY或圖片naturalWidth。

頁面程式修復於036cfa5370f2aa2d83defaf9795bfa07dc449480；限定CSS於b8efb4d0c571ebcf1a47b3fed1db484d96024adc。
查核時正式GCSDA alias指向dpl_BiqKiY3RQNr7qiofyU2rAG2PiGAi / gcsda-release-20261005 / 064fc3162ffe415234a6f22d5aaf9628e49cf277，READY，並有以上匿名驗證另行成立。
實際主機會隨已連接學會branch推送自動更新正式alias，本轮沒有手動assign_alias；不能宣稱已建立人工核准後才發布的主機閘門。未另改STT正式alias。
最後核對STT母站仍屬main，部署dpl_4higr4VDVwDumQRYGMSAnLaxNztY／7794fd6abac03cd66cc242e26b4777e2b69fe7e9。該並行的既有STT Column Index自動提交只更新目錄syncedAt一行，全部文章與出版程式未變，不是本次GCSDA造成跨站寫入。

## OPEN ISSUES / 界線

本輪沒有實體iPhone/Safari驗收、沒有完整人工無障礙認證，也沒有重測會員申請的真實寄送流程。合成建置比較時API GET採一致的未啟用stub；正式公開測試只GET/HEAD，沒有送出會員申請／問卷或寄測試信。
原不完整及低解析衍生資產沒有整批刪除，現行Hero已不再引用不完整首頁檔；各頁原有核准圖不隨意重新生成。
舊Netlify網站與Vercel歷史部署的遠端刪除仍未完成，依原CR另行處理；不要把匿名例外、圖片修復或分支刪除當成刪站。
未使用付費外部瀏覽器、Vercel Sandbox、儲值或新服務；WEBSITE仍ACTIVE_BUILD，Facebook／LINE HOLD，STT與GCSDA仍各自獨立。
