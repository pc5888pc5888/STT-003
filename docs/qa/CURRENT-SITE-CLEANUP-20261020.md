# 現行 STT 來源清理 — 2026-10-20

Change Request: CR-SINGLE-CURRENT-20261020-03。
授權依據：站主明確要求只保留現行網站，刪除非現行內容，並禁止再次使用或推送付費瀏覽器。
本次範圍：STT-003 main 內確認未被現行母站使用的舊頁面、重複發布入口、過時還原腳本與設定。不是重新設計網站。

正式母站：https://stt-003.vercel.app/
正式訪談：https://stt-003.vercel.app/humanistic-interview/

## 實際程式庫變更

已刪除 69 個基準版本的舊檔，其中包含 21 個未引用舊頁面、20 個舊施工／還原或一次性工作流程、10 個舊修改腳本，以及 18 個舊入口、設定與暫存稿。另刪除本次一次性清理腳本本身，不把它計入 69 個舊檔。

AGENTS.md 移除錯誤主品牌與舊短網址，改指向正式母站及現行來源，並記載未獲事前明確同意不得使用付費外部瀏覽器、付費測試環境或推送儲值入口。ENVIRONMENT_SETUP.md 移除以 Netlify 為主要環境的過時指引。

訪談驗收 workflow 的唯讀修正與真實寄信測試改為手動觸發，已於本次工作目錄測試，但 runner token 不具 workflows 更新權限，須另由已授權的 GitHub connector 更新；不得在工具確認前宣稱已更新。此輪清理未寄出真實測試郵件。

/humanistic-20q/index.html 舊實體轉址檔已刪除，改由 vercel.json 統一轉至 /humanistic-interview/；/problems.html 也轉回 /problems。既有其他正式 routing 不變。

## 保留與驗證

現行 React 頁面與導覽、所有既有 API、正式問卷 HTML／JavaScript、二十題原文、所有保留 public 素材與既有文案，均與清理前逐檔 SHA-256 比對相同。GCSDA 頁面來源、現行獨立主機發布、人物／Logo／出版圖像與治理追溯紀錄未刪除。

npm run build、現行訪談唯讀 build gate、JavaScript 語法檢查、模擬 API 合約測試及下列瀏覽器回歸全部通過後才提交：
chromium: 40/40
webkit: 40/40

瀏覽器引擎在既有 GitHub 標準 runner 執行，沒有使用付費外部瀏覽器服務、沒有新建 Vercel Sandbox，沒有要求儲值。此為合成資料測試，非實體 iPhone／通訊軟體瀏覽器驗收。

## 尚未完成／不得誤報

本紀錄只證明已提交的程式庫清理與上述測試。舊 Netlify 問卷的遠端下架仍缺該帳戶管理存取；不要標記已刪站。Vercel 舊網址轉址也不等於歷史部署實體刪除，須另以主機操作結果回報。歷史 Git commits 及原始 QA 紀錄是追溯證據，不是現行網站內容，不重寫 Git 歷史。

本次不授予全站 QA_PASS／BUILD_LOCK，不解除 Facebook、LINE HOLD，不擴張 GCSDA 或其他媒體刪除範圍。

## 刪除清單（原始 SHA-256）

- `.github/workflows/apply-humanistic-cooperation-20260916.yml` — `6d22708e72b590c62467a36869661ce7b3d399d58eb2f9895d059f5b0e2bb170`
- `.github/workflows/audit-current-cooperation-assets.yml` — `eb1c96d0408270b479d3854fa3957629ee88cb9e90ce4cefa58d3bb0a05c6f69`
- `.github/workflows/audit-humanistic-netlify-exact.yml` — `e03f11dcd02e531d53ce15718d6dc2d259ab8f03a57653fb992e8c9f73c17d0d`
- `.github/workflows/finalize-approved-two-heroes-20260916.yml` — `91f22627de6b6d9f1d4446cdecbd832a33149726ee04de0d2d7c5f88e546e2b7`
- `.github/workflows/install-approved-six-direct-20260915.yml` — `0e4e5c4c2d6117a8ea9fcf48280acd895c69c2da228331842c9527373cd7ad78`
- `.github/workflows/install-user-approved-six-main.yml` — `328864a382318bf76847c9103b8ea11e28f6f8b27b0375904d129f3cb3fefc14`
- `.github/workflows/repair-humanistic-delivery-once.yml` — `49eba5b9300e625ea0de18251bd3993b9ada45cf88d8c18521cf6674fc800f68`
- `.github/workflows/restore-owner-fullwidth.yml` — `9c48fe1fb711b149a78bd41c34a602b8e8034f6902c0202fba25d415ed480169`
- `.github/workflows/stt-approved-home-restore.yml` — `6a01e2860eb030fbbe5b174c9f6ca929f420f8a318e02f42b13efadb0da2b83a`
- `.github/workflows/stt-fix-asset-runtime.yml` — `f233ef74edfbadbbfe863da39d99aec1339982ee5aad3fa5055962e76fe38789`
- `.github/workflows/stt-install-original-artwork.yml` — `6679d5d5ba3539c4417b6e8532ca95e5d8c451f34307da82fd1d2a4dbdca5ec1`
- `.github/workflows/stt-install-true-hires-heroes.yml` — `3ede49d978a95189a3761444f2ab8ae522f43a0afd91aff06d1f3ba5e4ab478e`
- `.github/workflows/stt-materialize-visual-bank.yml` — `98bd7c62e5dc85dc6c17799a839fd805e33ee0738f7d09f093d6150d3812079b`
- `.github/workflows/stt-mmedia-bootstrap.yml` — `e86229846f58d63cf64c8444832914d705524d5fbfb32bdf0f524c3a5f050ade`
- `.github/workflows/stt-primary-landings.yml` — `56173377de2557ea8779706722a1a69196e0bc16eb7506433bb07544207f2d3a`
- `.github/workflows/stt-primary-production.yml` — `0b5449c72170b71b2f6990e240ecfdb4ff40eb4a19e8e762f7afbaac6f0039cc`
- `.github/workflows/stt-stage2-verify.yml` — `98970aa4402c302bcfbe1c2d59aeba77f49a18c300ea5a696b61a6800565691c`
- `.github/workflows/stt-stage3-verify.yml` — `1397479063930c6f72414cfda1f95cb52167b87ac740ab0e968715c941ce56c5`
- `.github/workflows/stt-wire-visual-bank.yml` — `3bfa47a58d132a115a5a69cdb631e7b27c5d9ce7096178fba50f77eca72b9646`
- `.github/workflows/verify-humanistic-production-once.yml` — `87fa04f4e5a084781c908d515445ac433a023ce158ec4483861e6aeead03c855`
- `about.html` — `7bc8f32bdb8620b9faa3fe485b5630e8832b9a128f8db084bd38484c94d1c4fc`
- `about_backup.txt` — `38f1bac8b170c157275f047e9e17ae46f728ebce754ae48e1bb172646a7c9ece`
- `about_clean.txt` — `f0547a9cb6a6f3feea1bddc88c7b5428baa5f4ad58892c40b2581360a553f71c`
- `about_current.txt` — `49c256333dc38d75b664a7f36d7f5830d5daa22660234a971f910560d48ec2ed`
- `contact.html` — `020d92e405650dd4722267cca2562e420b08d1890c826bbe6542affd4bea723e`
- `fix.py` — `e4eccc70ff77a7dc99a3dd396f6428d96e3040ae7ecd00eb4e57727eeed2cd1f`
- `fix_about.py` — `1a41ef3bea3355becfeb969abe1fa19aede24927b5ab9a9dc062b16ca06d2468`
- `fix_about2.py` — `80eccef65fda365ee900b9ca1f796225751b8c02b7efc2373a3d59243b0cf59d`
- `fix_about3.py` — `a686bfda53647cb25729bcf2cc3ee1f9d734a2c21b2fb3ea1315f981404c61e8`
- `fix_line38.py` — `579632df4bc1f6d7bd3c80c2520b59c72b3a64dc893d8021386c2acc02cca06e`
- `governance.html` — `d15839bceeb055416787e328a6841044f6b3d03d01683d68c6d548d95bf4e1c2`
- `insights.html` — `0942b92a341a88b3f26ec2e59207695a620f0900cc795f6b9feaa6c7ef4521e9`
- `metadata.json` — `30ae6cc71bc2180b3673d5ada2aea09b36f356a0984a299f2076472a0da5fde6`
- `netlify.toml` — `125d14ddd33053b4879c335b56357cec65dcce5c63330754206bbce47e2cd6c2`
- `problems.html` — `14ab9b78ec4550d776f74b6687b7a7dfb9357418de6c6fce3fe4dbe33e84d515`
- `public/humanistic-20q/index.html` — `8a9375eefb1fc97d79e6c42dae5f143d878a2d8f1583ce0c8cd69661f8c55f02`
- `scripts/apply_fullbleed.py` — `8b7fce9445dad701a7ffefe0c5a0b8e138ec4245c3c19b233e70c3e987fe9ddd`
- `scripts/apply_humanistic_cooperation_20260916.py` — `197255ad58b8e0a97a30d4869cd9b9afea0c5de80adc7854888badf8e9a98bb2`
- `scripts/apply_stage2_layout.py` — `bf9e9ed5c109b7a900a8b61f17ee764593a7205aea755c071a6e1d9e8b5ae02d`
- `scripts/apply_stage3_layout.py` — `6e71532efb92d048d8926f7afccff081c0190ee49f5cbc45029c68058aee2c63`
- `scripts/install_original_artwork.py` — `409a1143aaa09023bddc3c23679be51cd511467fb0a8ad2bea6372c285f8ac2e`
- `scripts/mmedia_bootstrap.py` — `a94def6f6c4abe832af18bdf994a733b06e8303b3c794073ff31ca72e3d7c048`
- `scripts/patch-interview-delivery.py` — `f87c99850e050b77afb28dc02df4a4d1f0b77ab4aa2e9747b49213589913ff02`
- `scripts/patch_humanistic_privacy.py` — `b733018330e3e7f6bdeb1ae18d3c6cd0cb0f0322afc64f5737d28684c68c20a2`
- `scripts/refine_primary.py` — `fbcea29e2cc6a97166a940052f7da2d23fda93648aa1004ace1260d650eaa9f6`
- `scripts/repair_humanistic_delivery.py` — `a4744a48f625267a0a85bd49a6b448f34eff6e6caea3238ec59bc890c7921bbb`
- `src/pages/About.tsx` — `4656b0ac04640dc69fec50aa2d023bc577a7463230a4868de765ff10a92aee1e`
- `src/pages/ArticleIndex.tsx` — `1fc22298743e5a2f7c13d94389680cff40c3a9036eba02001bc81e8bf4719c66`
- `src/pages/Books.tsx` — `8aa372be4e3aedf1b987c0eb7f58085e4aed27da04d999196b339ab7740f5342`
- `src/pages/CanonicalLibrary.tsx` — `12169c7ff43334035c35e51e62d11c9bcb809183c1d117c95b225e895c30dbeb`
- `src/pages/Cooperation.tsx` — `ef460cb6a681e4a4ad46ef6c6416886fce66da842b87bbe3c5c7b21272e2ef7e`
- `src/pages/CorporateGovernance.tsx` — `79a50be3b239c6cd8e6c59697b87852c1fe7147932ff60a60f7432b19e74ea0c`
- `src/pages/Domains.tsx` — `32f817c71da42f7c919e3533b94f0dc2a19e121429a8f88e29e003fa8f30084a`
- `src/pages/ESGAI.tsx` — `5cc31e52bab02e652401d9ebd367cba8492962e6160af45f06363fe8dcde88db`
- `src/pages/FamilyGovernance.tsx` — `5d98ec931b743ad89c6f25e5ce4608a5bf4f18fd7190be76d6be0f28a9b346b8`
- `src/pages/GovernanceResponsibility.tsx` — `cf15ec2aad8b9828932110b6415d5b6a9441bcca544ec4d91f4e93f79425112f`
- `src/pages/Home.tsx` — `eb9351f52bb92fcb307682c80762040b9cde715bf4c35c3f9d82e6dbebf30b72`
- `src/pages/HomeV2.tsx` — `e6bb79499564ede5ee2edc8dda5dfe490e17ebb3e6906654188efc0d775d8b73`
- `src/pages/Humanistic20Q.tsx` — `1a997b56a46d3f79cc5e847e35110b17eb63a6c6a481c36ec1a39eecf9a2ca54`
- `src/pages/HumanisticInterview.tsx` — `eeea05fbd7694d306957d73c17cf1fbb6452d4cb010f9954a6f57f1de0e236e7`
- `src/pages/InternalCompliance.tsx` — `a280dc0cd575d263123852f63390b0002adc2b260e12e659dccdbe33c2764971`
- `src/pages/InternalCompliancePortal.tsx` — `a65bc1487998ff3b1cb71421eeb64fe459665374621bd60ed51ae3edd5d88e61`
- `src/pages/Legal.tsx` — `7b9e9da75962ed52e07938920b922c9adbc6742aef2c3c31e88ddb5666daba85`
- `src/pages/Papers.tsx` — `ebf67efb82b145f6fd9bea9ba171ad0bde1b890ebd39dcb27b24ed2aa5695afe`
- `src/pages/PublicCore.tsx` — `ec608ac5795804ed9b80cf73aa857302f6c5700fd3c4d137363961d98e5111bf`
- `src/pages/ServicePortal.tsx` — `3b13328e1e4e50cbc984f4281849031603bf303aaa665f4bbfe7df9e9376c988`
- `src/pages/Success.tsx` — `ec055427222e89360dcac2dcfd7eb93b5765d7d3250eb64541ef9e5d99f13c77`
- `temp_about.txt` — `40604319b46168e30aa088b5f486b65db936f2c093e05b01ef389342349832b5`
- `temp_check2.txt` — `40ed8a235c8385bbb407adafc699747582f8b997ea21a0dc9a1402c98c978fb5`
