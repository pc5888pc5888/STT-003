# STT Governance × GCSDA｜雙站 CIS 共用設計系統 v1.1

生效日期：2026-10-27  
狀態：APPROVED BY OWNER INSTRUCTION

## 1. 治理原則

STT Governance 與中華企業策略永續發展學會 GCSDA 為不同機構，必須保有各自完整 CIS、機構身分、內容、路由與視覺資產。

兩站不得因此各自發展不同的網站排版系統。正式規則為：

> 一個共用的治理設計作業系統，兩套獨立 CIS skin。

共用的是資訊閱讀與互動規則；獨立的是機構識別與內容語義。

## 2. 兩站必須共用

### Typography
- 中文主標／段落標題／正式正文：Noto Serif TC 系列為基準。
- 英文標籤／kicker／必要 UI metadata：Inter / Noto Sans TC 系列為基準。
- Desktop Hero H1：48px，line-height 1.38。
- Tablet Hero H1：36px，line-height 1.42。
- Mobile Hero H1：28px，line-height 1.48。
- Body：Desktop / Tablet 17px，Mobile 16px。
- Body line-height：1.9–1.95。
- 導覽與主要 action：15px。
- 同一 semantic role 不得因站別任意改字級、字重或行距。

### Reading Measure & Rhythm
- 主要閱讀容器：1180px 上限。
- Desktop / Tablet 正式 section 上下節奏：62px 為基準。
- Mobile 正式 section 上下節奏：40px 為基準。
- 同層級 heading、lead、body、card、CTA 必須使用同一套 spacing hierarchy。

### Hero Geometry
- Desktop / Tablet 有圖片 Hero：16:9 共用畫布。
- Desktop（>=1201px）：文字 anchor 以 top 180px / left 56px 為基準。
- Tablet（761–1200px）：文字 anchor 以 top 50px / left 36px 為基準。
- Desktop / Tablet：文字層為透明，不得其中一站另加實心白卡、陰影卡或不同 reading panel。
- Desktop / Tablet：圖片使用同一種白色 reading-field → image feather 漸層邏輯；內容圖本身可不同。
- Mobile（<=760px）：圖片在前、文字在後，改為垂直閱讀，不強行疊字。

### Actions
- 主要／次要 action 使用同一高度、字級、padding 與 focus-visible 行為。
- CTA 最小高度 46px。
- 色彩可以依各 CIS 使用自己的金色／制度色，但不能改變元件階級與互動語法。

### Responsive Breakpoints
- Desktop：>=1201px。
- Tablet / narrow desktop：761–1200px。
- Mobile：<=760px。
- 不得再新增只服務單一站、且會改變 Hero 結構的 900px / 1000px / 1050px 私有 breakpoint，除非經正式 Change Request 核准。

## 3. 兩站可以不同

STT Governance 與 GCSDA 可以且應該在以下項目保持自身 CIS：

- Logo / seal。
- 品牌名稱與機構定位。
- 金色深淺與輔助色。
- Hero 圖片及圖片語義。
- 導覽名稱、頁面內容與 CTA 文義。
- 組織／治理／會員／委任等制度內容。
- 法律身分與責任聲明。

不得因「共用設計系統」而將 GCSDA 視為 STT 子品牌，也不得將 STT 改造成學會網站。

## 4. 禁止漂移

以下視為雙站 CIS drift：

- 同 viewport 下，一站為圖片疊字，另一站突然變成白卡。
- 相同 heading level 使用不同字體家族或任意不同字級。
- 同一 breakpoint 在兩站採完全不同閱讀順序。
- 為單頁修補而新增更高 specificity 規則，破壞共用 Hero contract。
- 以不同 CSS 歷史版本持續部署兩站，卻沒有同步共用設計規則。

## 5. 驗收矩陣

至少驗收：

- 1440px Desktop
- 1200px boundary
- 1024px Tablet / narrow desktop
- 900px narrow desktop
- 768px Tablet boundary
- 390px Mobile

驗收重點：

1. Header 高度與視覺起點一致。
2. Hero 畫布比例一致。
3. H1 / lead / CTA 的 anchor 與 hierarchy 一致。
4. 不得出現單站專屬的實心白色 Hero card。
5. 兩站 Logo、色彩與圖片仍能清楚辨識各自 CIS。
6. Body typography、container、section rhythm 與 CTA interaction 一致。

## 6. 施工規則

STT main 為目前共用 design-contract 的視覺基準。GCSDA branch 可保留自身功能 CSS，但不得覆蓋本文件所定義的共用 responsive / typography contract。

任何未來修改共用 Hero、Typography、Container、Breakpoint、CTA component 規則時，必須同步檢查 STT 與 GCSDA，不得只在單一分支修補後結案。
