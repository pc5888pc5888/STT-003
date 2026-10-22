// User-directed three-class typography; original wording retained in the change register.
export type PagePresentation = { lines: string[]; type: number; image: string | null; originalTitle: string; context?: string | null; portrait?: boolean; byline?: string; imageWidth?: number; imageHeight?: number };
export const PAGE_PRESENTATION: Record<string, PagePresentation> = {
  "/": {
    "lines": [
      "讓策略、治理與永續，",
      "成為共同語言"
    ],
    "type": 2,
    "image": "/visual-bank/gcsda/001.webp",
    "originalTitle": "讓策略、治理與永續，成為共同語言。",
    "context": null,
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
  },
  "/about": {
    "lines": [
      "企業、專業與學術，",
      "在治理議題上持續對話"
    ],
    "type": 2,
    "image": "/visual-bank/gcsda/002.webp",
    "originalTitle": "讓企業、專業與學術在治理議題上，形成可以持續對話的正式共同體。",
    "context": "讓企業、專業與學術在治理議題上，形成可以持續對話的正式共同體。",
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
  },
  "/founder-chairman": {
    "lines": [
      "創辦人暨執行長｜莊鈞翔博士"
    ],
    "type": 1,
    "image": "/visual-bank/gcsda/founder-chairman-hero.webp",
    "originalTitle": "創辦人暨執行長｜莊鈞翔博士",
    "context": null,
    "portrait": true,
    "byline": "CHUANG CHUN HSIANG Ph.D.",
    "imageWidth": 1672,
    "imageHeight": 941
  },
  "/governance": {
    "lines": [
      "學會本身先接受治理：",
      "權力、職權與責任都應可被理解"
    ],
    "type": 3,
    "image": "/visual-bank/gcsda/003.webp",
    "originalTitle": "學會本身先接受治理：權力來源、任期、職權與責任都應可被理解。",
    "context": null,
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
  },
  "/council": {
    "lines": [
      "跨域專業，不等於權責混同"
    ],
    "type": 2,
    "image": "/visual-bank/gcsda/004.webp",
    "originalTitle": "跨域專業，不等於權責混同。",
    "context": null,
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
  },
  "/membership": {
    "lines": [
      "以策略、治理、法遵與永續，",
      "形成專業共同體"
    ],
    "type": 2,
    "image": "/visual-bank/gcsda/005.webp",
    "originalTitle": "加入學會，是進入一個以策略、治理、法遵與永續為共同語言的專業共同體。",
    "context": "加入學會，是進入一個以策略、治理、法遵與永續為共同語言的專業共同體。",
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
  },
  "/events": {
    "lines": [
      "活動，是制度運作與",
      "知識累積的正式紀錄"
    ],
    "type": 2,
    "image": "/visual-bank/gcsda/006.webp",
    "originalTitle": "活動不是一次性聚會，而是學會制度運作與知識累積的正式紀錄。",
    "context": "活動不是一次性聚會，而是學會制度運作與知識累積的正式紀錄。",
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
  },
  "/knowledge": {
    "lines": [
      "讓活動與交流，",
      "沉澱為可傳承的治理知識"
    ],
    "type": 2,
    "image": "/visual-bank/gcsda/007.webp",
    "originalTitle": "讓活動與交流沉澱為可以再次學習、引用與傳承的治理知識。",
    "context": "讓活動與交流沉澱為可以再次學習、引用與傳承的治理知識。",
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
  },
  "/charter": {
    "lines": [
      "章程與公告"
    ],
    "type": 1,
    "image": "/visual-bank/gcsda/008.webp",
    "originalTitle": "章程不是網站附件，而是學會權力來源、會員權利義務與制度運作的正式依據。",
    "context": "章程不是網站附件，而是學會權力來源、會員權利義務與制度運作的正式依據。",
    "portrait": false,
    "imageWidth": 1200,
    "imageHeight": 675
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
