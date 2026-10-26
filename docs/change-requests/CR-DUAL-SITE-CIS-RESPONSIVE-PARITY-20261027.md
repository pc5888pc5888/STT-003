# CR-DUAL-SITE-CIS-RESPONSIVE-PARITY-20261027

日期：2026-10-27  
狀態：APPROVED / IMPLEMENTED  
核准來源：Owner / 莊鈞翔博士本輪明確指示

## 問題

STT Governance 與 GCSDA 雖共享 GovernedHero / CIS 基礎，但 GCSDA branch 保留舊的 gcsda-hero-repair responsive override。

在 761–1000px 區間，舊規則會把 GCSDA Hero 改為 image-first + solid paper copy panel；後續 761–1200px 規則雖恢復部分 absolute positioning，但未完全清除 solid background / legacy breakpoint 行為，造成與 STT 同 viewport 下顯著不同。

## 核准決策

兩站採：

- 同一 responsive / typography / editorial design contract。
- 不同 Logo、色彩、圖片、內容、路由與制度身分。
- GCSDA 不得因機構獨立性而另行發展不同 Hero geometry、typography hierarchy 或 breakpoint system。

## 實作

修改：
- src/styles/gcsda-hero-repair.css
- docs/STT_GCSDA_DUAL_SITE_CIS_STANDARD_v1_1.md

修正內容：
- 761–1200px GCSDA image-backed Hero 回到 16:9 共用畫布。
- copy layer 改為透明，移除白卡、border、shadow。
- 恢復與 STT 相同的 left reading-field → image feather gradient。
- Tablet H1 / lead / action hierarchy 與 STT 共用規格。
- Mobile 維持 image-first / text-second，但回到共用 padding 與 typography hierarchy。
- 保留 GCSDA Logo、品牌色、圖片、文案、會員／章程／活動功能與法人身分。

## 不變

- GCSDA 公開文案。
- GCSDA 導覽 IA。
- 會員申請功能。
- 章程與活動資料。
- STT production Hero / public copy。
- 雙方法律與制度身分。

## Acceptance

必須至少檢查 1440 / 1200 / 1024 / 900 / 768 / 390 viewport。

Critical visual failure：
- GCSDA 在 tablet / narrow desktop 再出現實心白色 copy card。
- 同 semantic role 字級／行距與 STT 明顯不同。
- Hero reading order 在兩站不同。
- GCSDA 專屬功能因本次 CSS 修正失效。
