// User-directed three-class typography; original wording retained in the change register.
export type PagePresentation = { lines: string[]; type: number; image: string | null; originalTitle: string; context?: string | null; portrait?: boolean; byline?: string; imageWidth?: number; imageHeight?: number };
export const PAGE_PRESENTATION: Record<string, PagePresentation> = {
  "/": {
    "lines": [
      "讓重要的事，",
      "走得更遠。"
    ],
    "type": 2,
    "image": "/visual-bank/stt/user-approved-six/home.png",
    "originalTitle": "讓重要的事，走得更遠。",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems": {
    "lines": [
      "你正在面對什麼"
    ],
    "type": 1,
    "image": "/visual-bank/stt/user-approved-six/problems.png",
    "originalTitle": "你正在面對什麼",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/how-stt-works": {
    "lines": [
      "如何判讀"
    ],
    "type": 1,
    "image": "/visual-bank/stt/user-approved-six/method.png",
    "originalTitle": "如何判讀",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/engagement": {
    "lines": [
      "當一件事情值得被正式治理，",
      "就不應只停留在一次諮詢。"
    ],
    "type": 2,
    "image": "/visual-approved/bank-14.png",
    "originalTitle": "當一件事情值得被正式治理，就不應只停留在一次諮詢。",
    "context": null,
    "portrait": false,
    "imageWidth": 1672,
    "imageHeight": 941
  },
  "/insights": {
    "lines": [
      "判讀不是臨時形成的意見，",
      "而是長期累積的制度研究。"
    ],
    "type": 2,
    "image": "/visual-approved/bank-05.png",
    "originalTitle": "判讀不是臨時形成的意見，而是長期累積的制度研究。",
    "context": null,
    "portrait": false,
    "imageWidth": 1672,
    "imageHeight": 941
  },
  "/about": {
    "lines": [
      "STT Governance",
      "高位階治理文明平台"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-07.png",
    "originalTitle": "STT Governance 不是一般顧問公司，而是高位階治理文明平台。",
    "context": "STT Governance 不是一般顧問公司，而是高位階治理文明平台。",
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/eric-chuang": {
    "lines": [
      "莊鈞翔博士"
    ],
    "type": 1,
    "image": "/visual-approved/eric-page-owner-original.png",
    "originalTitle": "莊鈞翔博士 Eric Chuang, Ph.D.",
    "context": null,
    "portrait": true,
    "byline": "Eric Chuang, Ph.D.",
    "imageWidth": 2048,
    "imageHeight": 1152
  },
  "/institutions": {
    "lines": [
      "跨專業治理整合，",
      "先建立共同的判讀架構。"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-05.png",
    "originalTitle": "當單一專業工具不足以處理整體治理問題，需要的是一個更上位的判讀架構。",
    "context": "當單一專業工具不足以處理整體治理問題，需要的是一個更上位的判讀架構。",
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/start": {
    "lines": [
      "先把正在發生的事情說清楚。"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "先把正在發生的事情說清楚。",
    "context": null,
    "portrait": false
  },
  "/privacy": {
    "lines": [
      "隱私與資料使用"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "隱私與資料使用",
    "context": null,
    "portrait": false
  },
  "/professional-boundary": {
    "lines": [
      "治理判讀與專業服務邊界"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "治理判讀與專業服務邊界",
    "context": null,
    "portrait": false
  },
  "/research": {
    "lines": [
      "研究與論文"
    ],
    "type": 1,
    "image": "/visual-approved/secondary-02.png",
    "originalTitle": "研究與論文",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/books": {
    "lines": [
      "著作正典"
    ],
    "type": 1,
    "image": "/visual-approved/bank-08.png",
    "originalTitle": "著作正典",
    "context": null,
    "portrait": false,
    "imageWidth": 1672,
    "imageHeight": 941
  },
  "/books/internal-compliance": {
    "lines": [
      "內在法遵"
    ],
    "type": 1,
    "image": "/visual-approved/bank-20.png",
    "originalTitle": "內在法遵",
    "context": null,
    "portrait": false,
    "imageWidth": 1672,
    "imageHeight": 941
  },
  "/problems/major-decision": {
    "lines": [
      "重大決策，",
      "先確認正確的問題。"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-04.png",
    "originalTitle": "重大決策，不是先選 A、B、C；而是先確認這是不是正確的問題。",
    "context": "重大決策，不是先選 A、B、C；而是先確認這是不是正確的問題。",
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems/owner-dependence": {
    "lines": [
      "公司愈大，",
      "組織更需要承接能力。"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-15.png",
    "originalTitle": "公司愈大，卻還是只有老闆能決定，真正的風險是組織沒有承接能力。",
    "context": "公司愈大，卻還是只有老闆能決定，真正的風險是組織沒有承接能力。",
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems/succession": {
    "lines": [
      "職位交出去，",
      "不代表接班已經發生。"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-10.png",
    "originalTitle": "職位交出去，不代表接班已經發生。",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems/family-ownership": {
    "lines": [
      "家族有資產，",
      "不代表家族已經知道",
      "怎麼共同決定。"
    ],
    "type": 3,
    "image": "/visual-approved/secondary-01.png",
    "originalTitle": "家族有資產，不代表家族已經知道怎麼共同決定。",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems/strategic-legal": {
    "lines": [
      "法律上可以做，",
      "和策略上值得做，",
      "是兩個不同問題。"
    ],
    "type": 3,
    "image": "/visual-approved/secondary-09.png",
    "originalTitle": "法律上可以做，和策略上值得做，是兩個不同問題。",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems/ai-governance": {
    "lines": [
      "AI 能做到，",
      "不代表公司已經授權它做到。"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-06.png",
    "originalTitle": "AI 能做到，不代表公司已經授權它做到。",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems/system-failure": {
    "lines": [
      "有 SOP，",
      "制度還必須承受壓力。"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-12.png",
    "originalTitle": "有 SOP，不等於制度真的會在壓力下運作。",
    "context": "有 SOP，不等於制度真的會在壓力下運作。",
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/problems/founder-legacy": {
    "lines": [
      "人離開以後，",
      "很多最重要的事情",
      "就再也問不到了。"
    ],
    "type": 3,
    "image": "/visual-approved/secondary-07.png",
    "originalTitle": "人離開以後，很多最重要的事情就再也問不到了。",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/domains": {
    "lines": [
      "理解複雜問題的",
      "治理知識領域"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-13.png",
    "originalTitle": "這些不是服務套餐，而是 STT 用來理解複雜問題的治理知識領域。",
    "context": "這些不是服務套餐，而是 STT 用來理解複雜問題的治理知識領域。",
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/domains/corporate-governance": {
    "lines": [
      "公司治理與決策權"
    ],
    "type": 1,
    "image": "/visual-approved/secondary-08.png",
    "originalTitle": "公司治理與決策權",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/domains/family-succession": {
    "lines": [
      "家族治理與接班"
    ],
    "type": 1,
    "image": "/visual-approved/secondary-03.png",
    "originalTitle": "家族治理與接班",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/domains/strategic-legal": {
    "lines": [
      "策略＋法務"
    ],
    "type": 1,
    "image": "/visual-approved/secondary-09.png",
    "originalTitle": "策略＋法務",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/domains/compliance-contract": {
    "lines": [
      "企業法遵與契約治理"
    ],
    "type": 1,
    "image": "/visual-approved/secondary-16.png",
    "originalTitle": "企業法遵與契約治理",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/domains/human-ai-governance": {
    "lines": [
      "AI Governance",
      "人機治憲"
    ],
    "type": 2,
    "image": "/visual-approved/bank-15.png",
    "originalTitle": "AI Governance｜人機治憲",
    "context": null,
    "portrait": false,
    "imageWidth": 1672,
    "imageHeight": 941
  },
  "/projects": {
    "lines": [
      "人文地景產採訪｜",
      "把仍能被說清楚的記憶留下。"
    ],
    "type": 2,
    "image": "/visual-approved/secondary-17.png",
    "originalTitle": "人文地景產採訪｜把仍能被說清楚的記憶留下。",
    "context": null,
    "portrait": false,
    "imageWidth": 1491,
    "imageHeight": 1055
  },
  "/success": {
    "lines": [
      "付款與訂單確認"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "",
    "context": "",
    "portrait": false
  },
  "/legal/intellectual-property": {
    "lines": [
      "作者與智慧財產聲明"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "作者與智慧財產聲明",
    "context": null,
    "portrait": false
  },
  "/legal/ai-disclosure": {
    "lines": [
      "AI 工具使用揭露"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "AI 工具使用揭露",
    "context": null,
    "portrait": false
  },
  "/legal/digital-content-policy": {
    "lines": [
      "數位內容與交易政策"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "數位內容與交易政策",
    "context": null,
    "portrait": false
  },
  "/404": {
    "lines": [
      "找不到這個頁面。"
    ],
    "type": 1,
    "image": null,
    "originalTitle": "找不到這個頁面。",
    "context": null,
    "portrait": false
  }
};
