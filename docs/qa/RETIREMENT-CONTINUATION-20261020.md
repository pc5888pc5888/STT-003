# STT 舊版退役續行紀錄 — 2026-10-20

Change Request：CR-SINGLE-CURRENT-20261020-03（延續站主已核准的單一現行網站清理，不另啟專案）。
狀態：BRANCH_RETIREMENT_VERIFIED；BUILD_EXCLUSION_EXECUTED；REMOTE_HOST_DELETION_STILL_BLOCKED。

正式母站：https://stt-003.vercel.app/
母站內唯一正式二十題入口：https://stt-003.vercel.app/humanistic-interview/
本次僅處理舊來源分支、舊合併提案、建置排除與查核；不修改公開網站內容或表單收件設定。

## 本輪實際完成

已從 pc5888pc5888/STT-003 刪除 68 個經逐名核對的過時 STT 分支；清冊由 81 個分支減為 13 個。現行 STT 只保留 main，其餘 12 個是未納入本次清理授權的獨立 GCSDA 分支，名稱與原 head SHA 全部保留。刪除後另經 GitHub branches API 獨立確認，不僅依 workflow 自報。

已關閉 12 個與退役 STT 分支相連的舊合併提案：#20、#19、#18、#17、#15、#13、#11、#10、#9、#8、#7、#6。沒有合併其內容至 main，未修改 GCSDA 的提案。

為保留治理追溯，每個被刪除分支的原始 head 保存在 retired-stt-20261020/ 命名空間的歷史 tag。這些是版本證據，不是現行分支、不是新網站、不是發布來源；不得從這些歷史標記恢復或重新發布舊 STT。原 Git 歷史與 QA 證據未重寫。

分支刪除使用 git atomic push 與逐分支預期 SHA lease；刪除前檢查分支保護、提案依賴、main 與保留分支未變動。沒有改動保護規則、沒有提升帳戶權限。

執行 workflow：39433163247，success。完成時間：2026-10-20 13:48:02 UTC（臺灣時間 21:48:02）。完整清冊及結果：docs/qa/BRANCH-RETIREMENT-20261020.json，status=VERIFIED。最終結果提交：9e8ded729203214ab3bc475417e4b7d276faaaf1。

一次性執行流程 .github/workflows/retire-stt-branches-20261020.yml 已完成後刪除，提交：4d27b2b3f375c49f7689826b6b40a4cc20d2af86。沒有把刪除程式留在現行 workflow 中反覆執行。

## 主機建置排除已實際設定與執行

Vercel project：prj_lASDpLR6RkkVmJuZuDMM1LU8pD0F；team：team_F50JteWE5b42WDsruhQlNWFj。

已更新 project 的 commandForIgnoringBuildStep：

```sh
case "$VERCEL_GIT_COMMIT_REF" in main|*gcsda*|*GCSDA*) exit 1;; *) exit 0;; esac
```

效果：依 Vercel Ignored Build Step 的退出碼約定，main 繼續建置；GCSDA 分支保留原使用範圍；其他 STT 舊分支、未識別或空白 ref 在這個檢查點跳過建置。本機九個案例的退出碼已測試，涵蓋 main、GCSDA、舊 STT、空白 ref 與歷史 tag。

不是只設定後推測成功：正式 deployment dpl_CqHVek1HUNoTTevagUpH3xD5Pr6k（main / 4d27b2b3f375c49f7689826b6b40a4cc20d2af86）的 Vercel build logs 已明確列出執行上述 case 指令，隨後繼續 vercel build 並 READY。沒有為測試排除規則另建一個舊版網站。

界線：這是一般建置流程的排除規則，不是不可繞過的帳戶權限政策。專案設定仍可被具管理權限者修改，vercel.json 的 ignoreCommand 或選擇略過檢查的手動重新部署亦不在本次防護保證內。未宣稱所有未來重新發布方式永久不可能。

官方機制依據：https://vercel.com/docs/project-configuration/project-settings 、https://vercel.com/docs/project-configuration/vercel-json 。

## 現行內容與清理後複查

比較本輪開始提交 7fa26a43325f041cf586757cd9e061205f97e63d 與清理完成提交 4d27b2b3f375c49f7689826b6b40a4cc20d2af86，唯一保留的檔案差異是新增分支退役 JSON 紀錄。現行首頁、路由設定、問卷 HTML／JavaScript、所有 API、二十題原文、正式文案、Logo、人物、出版及核准圖片均未修改。

重跑既有唯讀公開查核：run 39430413567 的第二次執行，job 118665626403，success；artifact 12268813369，建立於 2026-10-20 13:51:56 UTC。該 job 使用原已核准的查核程式與相同未變動的網站來源，讀取清理後的現行公開網址，不寄信、不送出訪談、不寫回頁面。

結果：6/6 母站舊路徑轉址正確；正式問卷及其控制程式均 HTTP 200，內容 bytes 與未修改的現行來源相同。母站 11 頁 × 390／768／1440px 的 33/33 基本公開頁面檢查通過，無捕捉到未處理的 JavaScript 例外，無水平溢出。此處沒有新增四項表單操作的實體 iPhone 驗收；先前表單驗證範圍維持原紀錄，不擴張為所有裝置保證。

問卷 HTML SHA-256：8a5b2fc70abd2c30d44ef4a0b81f5438a0406d08f28cab781ed806dc9255953d。
控制程式 SHA-256：18ebf4306ab80099bfbbf2844f314b417eb4dc7432a7d32b8badd69c40a3e609。

GCSDA 正式 alias 刪除後再次核對，仍指向 dpl_F8Eo78b7EsHyBpQLYVT3CeRDcDSn；來源仍為 gcsda-release-20261005 / 60303eb4370fa0738430af3f78ce171428b56fa4。其既有 SSO 狀態未修改。未刪除或暫停共同承載兩站的 Vercel project。

## 尚未完成，不得標示已刪站

Vercel：45 個先前統一設定的 STT 舊 alias，本轮匿名查核仍全部先受到登入保護，未直接回傳舊網站。底層歷史 deployment 本體未刪除；目前已連接 Vercel 工具不提供個別 deployment 的刪除動作。提供的 Delete Project 連結不適用，因為刪除整個 project 會影響現行 STT 與 GCSDA。此部分需要具個別 deployment 刪除能力的原主機管理操作，不是再購買瀏覽器。

Netlify：shimmering-longma-509244.netlify.app 本輪匿名查核仍 HTTP 200，尚未下架或刪除。未找到可用的 Netlify 管理連線，且沒有原帳戶的已驗證管理存取。沒有宣稱 Git 分支刪除或母站轉址等於該 Netlify 站已被刪除。

本輪沒有使用付費外部瀏覽器、沒有建立 Vercel Sandbox、沒有要求儲值、沒有新增第三方付費服務。現行 API 金鑰與收件人未修改，未使用真實受訪者內容。

因此，舊 STT 分支退役與一般建置排除已完成；所有遠端歷史網站本體的刪除仍未完成。整體 WEBSITE 仍為 ACTIVE_BUILD；CR-SINGLE-CURRENT-20261020-03 的遠端刪站部分保持 OPEN，不授予全站 QA_PASS／BUILD_LOCK，不解除 Facebook、LINE HOLD。
