# LINE OA MANAGER IMPLEMENTATION PACKAGE — 2026-10-26

Status: ACTIVE_BUILD
Website gate: BUILD_LOCKED / QA_PASS
Live publication: HOLD until owner visual approval + credentials

This file is the operator-facing implementation sheet for LINE Official Account Manager.
It is intentionally limited to deterministic routing, institutional information, and formal website entry points.

---

## A. STT Governance

### Account identity
- Display name: STT Governance
- LINE ID: @783xkknh
- Status message: 讓重要的事，走得更遠
- Founder identity: 創辦人暨執行長｜莊鈞翔博士

### Rich Menu
Image candidate:
- line/candidates/stt-richmenu-20261026-owner-review.png
- 2500 × 1686

Chat bar text:
- 治理入口

Top-left:
- Label: 開始治理判讀
- URL: https://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu

Top-center:
- Label: 你正在面對什麼
- URL: https://stt-003.vercel.app/problems?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu

Top-right:
- Label: STT 如何判讀
- URL: https://stt-003.vercel.app/how-stt-works?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu

Bottom-left:
- Label: 莊鈞翔博士
- URL: https://stt-003.vercel.app/eric-chuang?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu

Bottom-center:
- Label: 研究與出版
- URL: https://stt-003.vercel.app/insights?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu

Bottom-right:
- Label: 關於 STT
- URL: https://stt-003.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=stt_richmenu

### Welcome message
歡迎加入 STT Governance。

本帳號用於治理資訊、研究出版與正式受理後之關係維護。若你正面對重大決策、企業／家族治理或 AI 決策責任問題，請先由「開始治理判讀」整理情境。

首次提交不需傳送身分證件、金融帳戶、完整契約、醫療資料或其他高敏感文件。LINE 不取代正式治理受理；正式入口以 STT Governance 官網為準。

### Default auto reply
這裡是 STT Governance 官方 LINE。

若你正在處理重大決策、企業治理、家族治理或 AI 決策責任問題，建議先從「你正在面對什麼」確認問題類型；如需正式進入受理程序，請使用「開始治理判讀」。

為降低不必要的資料暴露，請先不要在 LINE 傳送身分證件、金融帳戶、完整契約、醫療資料、完整資產／稅務資料或其他高敏感文件。

### Keyword routing
- 「開始」／「治理判讀」／「受理」 → https://stt-003.vercel.app/start?utm_source=line&utm_medium=oa&utm_campaign=stt_keyword
- 「問題」／「我適合嗎」 → https://stt-003.vercel.app/problems?utm_source=line&utm_medium=oa&utm_campaign=stt_keyword
- 「方法」／「怎麼判讀」 → https://stt-003.vercel.app/how-stt-works?utm_source=line&utm_medium=oa&utm_campaign=stt_keyword
- 「莊博士」／「執行長」 → https://stt-003.vercel.app/eric-chuang?utm_source=line&utm_medium=oa&utm_campaign=stt_keyword
- 「研究」／「出版」 → https://stt-003.vercel.app/insights?utm_source=line&utm_medium=oa&utm_campaign=stt_keyword

---

## B. GCSDA

### Account identity
- Display name: 中華企業策略永續發展學會｜GCSDA
- LINE ID: @387nbnjs
- Status message: 策略為先｜治理為本｜管理為終
- Founder identity: 創會理事長｜莊鈞翔博士

### Rich Menu
Image candidate:
- line/candidates/gcsda-richmenu-20261026-owner-review.png
- 2500 × 1686

Chat bar text:
- 學會入口

Top-left:
- Label: 關於學會
- URL: https://gcsda-governance.vercel.app/about?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu

Top-center:
- Label: 創會理事長
- URL: https://gcsda-governance.vercel.app/founder-chairman?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu

Top-right:
- Label: 會員與入會
- URL: https://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu

Bottom-left:
- Label: 活動與大會
- URL: https://gcsda-governance.vercel.app/events?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu

Bottom-center:
- Label: 知識與研究
- URL: https://gcsda-governance.vercel.app/knowledge?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu

Bottom-right:
- Label: 章程與公告
- URL: https://gcsda-governance.vercel.app/charter?utm_source=line&utm_medium=oa&utm_campaign=gcsda_richmenu

### Welcome message
歡迎加入中華企業策略永續發展學會 GCSDA。

本帳號用於會務聯絡、會員申請、活動與治理知識資訊。入會申請請由「會員與入會」進入正式流程；送出申請不代表會員資格成立，後續依章程及正式會務程序審查。

GCSDA 與 STT Governance 為不同機構主體。

### Default auto reply
這裡是中華企業策略永續發展學會 GCSDA 官方 LINE。

會員申請請由「會員與入會」進入正式流程；活動、研究、組織治理及章程公告，請使用下方學會入口。

請勿以 LINE 訊息取代正式入會申請或正式會務程序。

### Keyword routing
- 「入會」／「會員」 → https://gcsda-governance.vercel.app/membership?utm_source=line&utm_medium=oa&utm_campaign=gcsda_keyword
- 「活動」／「大會」 → https://gcsda-governance.vercel.app/events?utm_source=line&utm_medium=oa&utm_campaign=gcsda_keyword
- 「研究」／「知識」 → https://gcsda-governance.vercel.app/knowledge?utm_source=line&utm_medium=oa&utm_campaign=gcsda_keyword
- 「章程」／「公告」 → https://gcsda-governance.vercel.app/charter?utm_source=line&utm_medium=oa&utm_campaign=gcsda_keyword
- 「理事長」／「莊博士」 → https://gcsda-governance.vercel.app/founder-chairman?utm_source=line&utm_medium=oa&utm_campaign=gcsda_keyword

---

## C. LIVE RELEASE ORDER

1. Owner visually approves STT candidate PNG.
2. Owner visually approves GCSDA candidate PNG.
3. Promote candidate PNGs to line/release/.
4. Bind each account's Channel access token, Channel secret, and owner user ID.
5. Run release gate.
6. Publish STT Rich Menu.
7. Publish GCSDA Rich Menu.
8. Configure welcome messages.
9. Configure deterministic keyword replies.
10. Run real GCSDA membership POST E2E.
11. Run iOS and Android tap-through E2E for all 12 Rich Menu areas.
12. Record production evidence and close LINE_ACTIVE_BUILD.

## D. DO NOT ENABLE
- automatic case-specific governance advice
- automatic legal conclusions
- automatic membership approval
- price quotation
- document upload intake through chat
- high-sensitivity attachment processing
