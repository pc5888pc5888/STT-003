import { Cpu, ShieldCheck } from "lucide-react";
import { GovernancePortalPage, type PortalSection } from "@/components/GovernancePortalPage";

export default function ESGAI({
  onNavigate,
  activeSection = "intro",
}: {
  onNavigate?: (page: string) => void;
  activeSection?: "intro" | "features" | "console" | "academic";
}) {
  const sections: PortalSection[] = [
    {
      id: "intro",
      label: "治理原理",
      title: "AI 可以加速工作，但不能取得無邊界的決策權",
      description: "數位治理的核心不是展示模型能力，而是決定 AI 在企業裡可以看什麼、做什麼、影響什麼，以及什麼時候必須把決策交還給人。",
      points: [
        "建立模型與代理式工作流的授權範圍，區分查詢、建議、執行與高風險操作，不讓工具權限自然膨脹。",
        "將資料來源、提示、工具調用、輸出與人工覆核形成可稽核紀錄，避免出現無法還原的黑箱決策。",
        "對高風險任務建立人類最終決策權、拒絕條件與升級流程，確保 AI 是治理幕僚而不是權力替代者。",
      ],
      note: "本頁不以隨機分數、虛構安全標章或未經驗證的系統狀態製造信任。未輸入企業資料、未完成測試，就不宣稱已通過治理稽核。",
    },
    {
      id: "features",
      label: "核心架構",
      title: "從模型、資料到工具調用的四層治理門控",
      description: "AI 治理必須與企業現有權責、資訊安全、法遵與決策流程整合，而不是另外建立一套只由工程部門理解的技術制度。",
      points: [
        "Model Gate：管理模型選擇、版本、能力邊界與高風險用途，避免模型升級後治理條件失效。",
        "Data Gate：管理敏感資料、個資、商業秘密與知識庫來源，確保資料使用有權限、目的與保存邊界。",
        "Tool Gate：管理 API、MCP、外部工具與代理式執行權限，避免 AI 從回答問題變成未授權執行。",
        "Human Gate：對重大財務、法律、人事、外部承諾與高風險行動保留人工確認與可否決權。",
      ],
    },
    {
      id: "console",
      label: "治理控制台",
      title: "控制台首先顯示證據，不先顯示漂亮分數",
      description: "真正的治理控制台應把目前連線、權限、資料來源、未解決風險與人工覆核狀態放在最前面。",
      points: [
        "模型清單：目前啟用的模型、版本、用途、責任人與最後審查日期。",
        "工具權限：每個代理或工作流能呼叫的 API、MCP Server 與外部系統權限。",
        "證據與紀錄：保存關鍵輸入、引用來源、工具操作與人工覆核結果，支援事後稽核。",
        "例外事件：記錄拒絕、失敗、越權、幻覺、敏感資料暴露與人工接管，形成治理改善清單。",
      ],
      note: "下一階段接入真實 Dify／Coze、企業知識庫與工作流後，控制台才會逐步顯示實際狀態；未連線前維持明確的 Not Configured 狀態。",
    },
    {
      id: "academic",
      label: "治理基礎",
      title: "技術能力與治理責任必須在同一張架構圖上",
      description: "STT 的數位治理路線以 Agentic AI、MCP、API 整合與企業決策治理的交界為核心，避免 AI 專案與治理制度彼此分離。",
      points: [
        "Anthropic／Claude 專業訓練涵蓋模型使用、API、Agentic AI、MCP、Agent Skills 與企業工作流整合。",
        "Google for Education｜Gemini Certified Educator 提供另一套模型生態與教育應用理解，避免治理判讀只依賴單一供應商。",
        "治理原則維持一致：AI 提供檢索、分析、流程與紀錄支援；重大判斷、否決權與責任仍由人類治理主體承擔。",
      ],
    },
  ];

  const changeSection = (section: string) => {
    if (!onNavigate) {
      return;
    }
    if (section === "intro") {
      onNavigate("esgai");
      return;
    }
    if (section === "features") {
      onNavigate("esgai-features");
      return;
    }
    if (section === "console") {
      onNavigate("esgai-console");
      return;
    }
    onNavigate("esgai-academic");
  };

  return (
    <GovernancePortalPage
      eyebrow="Digital Governance · Agentic AI · MCP · Model Control"
      title="數位（AI）治理"
      titleEn="Digital Governance & AI Control Architecture"
      lead="企業導入生成式 AI、代理式 AI 與 MCP 之後，真正的風險不只是模型答錯，而是資料、工具與執行權限在沒有治理邊界時被放大。"
      statement="AI 的角色是治理幕僚與作業系統輔助；不是取代治理主體，更不是讓企業把決策責任交給模型。"
      variant="digital"
      activeSection={activeSection}
      sections={sections}
      metrics={[
        { label: "模型邊界", value: "MODEL", description: "模型能力、用途、版本與風險條件都有明確範圍。" },
        { label: "工具權限", value: "TOOL", description: "API、MCP 與外部系統的可執行權限被逐層控制。" },
        { label: "人工主權", value: "HUMAN", description: "重大決策保留人類確認、否決與責任歸屬。" },
      ]}
      primaryLabel="提出數位治理需求"
      secondaryLabel="查看治理控制台"
      primaryIcon={Cpu}
      onPrimary={() => onNavigate?.("about")}
      onSecondary={() => changeSection("console")}
      onSectionChange={changeSection}
    />
  );
}
