# CR-GCSDA-PUBLIC-ACCESS-20261021

狀態：AUTHORIZED_PUBLIC_ORIGIN_REPAIR / EXECUTION_PENDING。
授權依據：CR-20261005-GCSDA-FREE-OFFICIAL-ORIGIN 已由站主核准免費正式公開網址；站主本輪再次要求修復現行學會網站。這是恢復該正式公開入口，不是開放其他預覽、帳戶或未公開資料。

現況證據：GCSDA anonymous public hero acceptance，run 39464839620 / job 118773405826；全新匿名 HTTP GET 無 owner cookies、無 share token，https://gcsda-governance.vercel.app/ 回302到 vercel.com/sso-api。Artifact12284108581，SHA25687795a43064c241a187777152dfd1d71bba5aa05c0e4257c46f71c3401dd1a57。首次測試失敗，不列通過。

## 最小修改

只對正式 gcsda-governance.vercel.app 的 alias 建立 alias-protection-override。
已從 Vercel get_alias 確認所有權與 project：prj_lASDpLR6RkkVmJuZuDMM1LU8pD0F，team_F50JteWE5b42WDsruhQlNWFj。
不關閉整個 project 的 ssoProtection；不改 STT 正式域名；不放行所有 branch aliases 或歷史部署；不建立新域名／專案。
不使用臨時 shareable URL 作正式入口，不把 bypass token、登入 Cookie 或管理憑證寫入程式庫。

## 費用核對

Vercel 官方 2026-09-09 公告 Protect production deployments for free on every plan，明確說明 Deployment Protection Exceptions 現已在所有方案免費提供。
來源：https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan
本操作不得升級方案、購買 Advanced Deployment Protection、啟用 Password Protection、建立付費瀏覽器或 Sandbox。若 API 要求付費則停止並如實回報，不能代為訂閱。

## 驗收與回復

執行後用同一既有唯讀測試重新檢查9個正式路徑及完整圖片，確認匿名能載入新 hero，沒有改用帶 token 的特殊網址。
抽查已知退役 STT alias 仍受保護／導向，不重新公開舊內容；逐 byte 核對已接受的 STT 二十題未變。
若影響正式網址以外的保護、或 API 回傳失敗，不標記完成。可對相同 alias 以 override revoke 回復，無須刪 project。
最終操作結果與驗證會另記於 GCSDA hero 交付紀錄；本檔的 execution_pending 不代表已修改成功。
