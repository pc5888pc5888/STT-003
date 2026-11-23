# 九篇法律專欄網址更正｜2026-11-24

## 授權與範圍

依站主本次指示「重新更正網址名稱」，將 2026-11-22 九篇法律專欄的公開網址改為固定六碼數字編號。範圍限九篇公開路徑、站內讀取對應、分享與搜尋中繼資料及舊網址相容轉址。

| 原公開路徑末段 | 新公開路徑末段 |
| --- | --- |
| financial-governance-01 | 000001 |
| financial-governance-02 | 000002 |
| financial-governance-03 | 000003 |
| financial-governance-04 | 000004 |
| financial-governance-05 | 000005 |
| financial-governance-06 | 000006 |
| financial-governance-07 | 000007 |
| financial-governance-08 | 000008 |
| financial-governance-09 | 000009 |

路徑共同前綴為 `https://stt-003.vercel.app/columns/articles/`。數字編號由該批原始 01–09 篇序補足六位，已核對與現行 279 篇無碰撞；不是 M 傳媒的原刊識別碼。

## 實作與保留

九篇索引及正文 JSON 僅更新 `path`、`sourceUrl`，清冊僅更新 `path`。內部文章 ID、原文、標題、圖片、閱讀規則、目錄錨點及來源雜湊維持原樣，其餘 270 篇記錄不變。

文章頁由公開路徑解析既有內部 ID，支援直接載入及站內導覽。舊網址與尾斜線版本設定永久轉址；前端相容導覽保留語言查詢參數與段落錨點。既有分享元件、canonical、Open Graph、結構化資料、sitemap 與延伸閱讀皆由新的 `article.path` 產生。

匯入程式同步採用數字公開路徑。既有資料驗證保留全部來源、正文及圖片檢查，另核對路徑唯一性、索引與正文一致、九篇清冊對應及其餘文章的原路徑規則。

## 發布前驗證

基準版本：`29ee9c433fa8d62c01485955d3376646407befd5`。

- `npm run lint`：通過。
- `npm run build`：通過，包含 279 篇文章與 318 張原圖雜湊檢查。
- 獨立程式審查：通過；15 個實作檔案的變更均在上述範圍。
- 獨立資料比對：九篇除網址欄位外逐欄相同；其餘 270 筆不變。
- 獨立建置產物驗證：九篇標題、canonical、Open Graph、Article schema、站內連結及 sitemap 皆對應數字網址。

正式發布是否完成，另以 Vercel 的對應提交與正式網址實測為準。本記錄不宣稱全站 QA_PASS，也不將網址更名視為已證實先前裝置複製失敗的唯一原因。
