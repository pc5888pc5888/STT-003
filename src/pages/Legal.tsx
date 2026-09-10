import { useParams } from "react-router-dom";

type LegalPage = { title: string; eyebrow: string; body: string[] };

const pages: Record<string, LegalPage> = {
  "intellectual-property": {
    eyebrow: "INTELLECTUAL PROPERTY",
    title: "作者與智慧財產聲明",
    body: [
      "STT Governance 網站中的原創文章、研究整理、著作內容、治理方法、圖文編排與其他受保護內容，其權利歸屬依各該內容之作者、出版者、授權文件與適用法律認定。",
      "未經授權，不得將網站內容整體或實質部分重製、改作、散布、公開傳輸、建立資料庫或用於足以取代原內容之商業利用。合理引用、學術討論與依法允許之使用，仍應保留作者、作品與來源脈絡。",
      "第三方商標、名稱、圖像、研究與外部連結之權利仍屬原權利人；STT 不因引用、連結或評論而主張取得其權利。",
    ],
  },
  "ai-disclosure": {
    eyebrow: "AI ASSISTANCE DISCLOSURE",
    title: "AI 工具使用揭露",
    body: [
      "STT Governance 在部分研究整理、文字校對、結構整理、資訊檢索、格式處理與工作流程中，可能使用人工智慧工具提供輔助。",
      "AI 的參與不等於作者權、論證主權或決策責任移轉。核心觀點、命題、制度架構、正式判讀與最終內容責任，仍應由具名作者、編輯或治理責任人確認。",
      "在法律、財務、稅務、醫療、人事或其他高影響領域，AI 輸出不得被當成自動取得專業資格的意見；必要時應由具相應資格之專業者正式進場。",
    ],
  },
  privacy: {
    eyebrow: "PRIVACY & DATA USE",
    title: "隱私與資料使用",
    body: [
      "第一次透過網站說明治理需求時，應只提供完成初步分流所必要的資訊。未經正式受理與資料邊界確認前，不建議提交完整訴訟卷證、敏感個資、未公開商業秘密或大量機密文件。",
      "若後續需要進一步資料交換，應依案件性質確認資料目的、可接觸人員、保存方式、AI 是否可使用以及必要的刪除、退出或替代機制。",
      "正式隱私條款仍需依實際網站收集欄位、第三方服務、分析工具、Cookie、主機與聯絡流程完成法務校對後定稿。",
    ],
  },
  "digital-content-policy": {
    eyebrow: "DIGITAL CONTENT POLICY",
    title: "數位內容與交易政策",
    body: [
      "本頁僅在網站實際提供數位內容交易、付款或交付時適用。商品名稱、價格、付款方式、交付方式、退款與例外條件必須依實際交易流程及適用法律清楚揭露。",
      "未啟用正式交易流程前，本頁不得以範本文字假裝已建立付款、退費或交付制度。",
    ],
  },
};

export default function Legal(){
  const {slug="intellectual-property"}=useParams();
  const page=pages[slug]??pages["intellectual-property"];
  return <div className="legal-root"><style>{`
    .legal-root{min-height:100vh;background:#fbfaf7;color:#2b261f}.legal-wrap{max-width:900px;margin:0 auto;padding:90px 28px 120px}.legal-kicker{font-size:10px;letter-spacing:.26em;color:#8b642f}.legal-root h1{margin:20px 0 0;font:400 clamp(40px,5vw,64px)/1.35 'Noto Serif TC',Georgia,serif}.legal-rule{height:1px;background:#ddcfba;margin:34px 0}.legal-root p{margin:0;padding:22px 0;border-bottom:1px solid #e2d6c4;color:#6f675e;line-height:2}
  `}</style><div className="legal-wrap"><div className="legal-kicker">{page.eyebrow}</div><h1>{page.title}</h1><div className="legal-rule"/>{page.body.map((p)=><p key={p}>{p}</p>)}</div></div>;
}
