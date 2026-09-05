import { Scale, ShieldCheck } from "lucide-react";
import { GovernancePortalPage, type PortalSection } from "@/components/GovernancePortalPage";

export default function InternalCompliancePortal({
  onNavigate,
  activeSection = "intro",
}: {
  onNavigate?: (page: string) => void;
  activeSection?: "intro" | "pillars" | "simulator" | "academic";
}) {
  const sections: PortalSection[] = [
    {
      id: "intro",
      label: "內在法遵",
      title: "把法遵從外部要求，轉化成企業自己的決策秩序",
      description: "內在法遵不是把法條貼在流程旁邊，而是讓重大交易、契約、授權與資金移動在進入執行前，就受到制度邊界與責任鏈的約束。",
      points: [
        "先把企業日常最容易發生責任斷裂的交易、授權、採購、付款、資訊與對外承諾流程畫清。",
        "將法務與合規由事後審查移到決策前端，形成可被執行的 Compliance Gate，而不是只在事件發生後補救。",
        "透過契約治理、證據保留、權責分離與例外升級，把個人經驗轉化為組織可重複遵循的制度。",
      ],
      note: "正式法遵設計應依企業實際產業、交易模式、司法管轄與內部權限配置建立，不以通用模板替代個案判讀。",
    },
    {
      id: "pillars",
      label: "五大支柱",
      title: "內部控制、契約、稽核、透明與文化必須形成同一套系統",
      description: "如果法遵只存在於法務部門，企業仍然會在營運現場失去控制。真正有效的法遵必須進入日常決策與權責分工。",
      points: [
        "內部控制：建立 Authorization Matrix、職務分離與關鍵程序的必要核准節點。",
        "契約治理：統一重大條款、權利義務、版本、核准與履約追蹤，避免契約簽完後失去管理。",
        "稽核與證據：保留交易、會議、指示與異常事件的 Audit Trail，讓責任與改善都有依據。",
        "資訊透明：讓真正需要承擔責任的人取得足以判斷的資訊，而不是只看到被修飾過的結果。",
        "法遵文化：把制度要求轉成組織成員理解的行為邊界，降低制度只停留在文件層的風險。",
      ],
    },
    {
      id: "simulator",
      label: "風險盲點",
      title: "先確認企業在哪些情境下最容易越過自己的邊界",
      description: "法遵診斷不應用虛構案例替企業下結論，而應聚焦於真實的權限、交易與異常事件。",
      points: [
        "董事、高階經理人或關係人是否能以口頭指示跳過原本的審查、採購、付款或利益迴避流程。",
        "跨境交易、代理商、供應商與合作夥伴是否存在第三方風險、制裁、反貪腐或商業秘密暴露。",
        "勞資、人事、競業、保密與離職流程是否有一致的契約與證據管理，避免事件發生後才補文件。",
        "發現異常時，企業是否有獨立調查、保全證據、升級通報與矯正措施，而不是只靠主管自行處理。",
      ],
      note: "此區只做治理盲點定位。涉及具體法律責任、司法策略或行政風險時，應進一步依事實、法源與證據進行專案判讀。",
    },
    {
      id: "academic",
      label: "研究基礎",
      title: "法遵真正的競爭力來自制度內化，而不是文件數量",
      description: "STT 的內在法遵方法，建立在公司治理、策略管理、法律服務與組織信任研究的交界。",
      points: [
        "企業策略導入公司治理法遵精神：探討外部法律顧問如何進入策略前端，協助重大決策控制風險。",
        "顧客關係管理對服務永續之探討：從高階專業服務的資訊不對稱，理解制度信任如何被建立。",
        "《內在法遵 Internal Compliance》：把法律遵循從被動服從轉化為責任、邊界與自我治理的內在秩序。",
      ],
    },
  ];

  const changeSection = (section: string) => {
    if (!onNavigate) {
      return;
    }
    if (section === "intro") {
      onNavigate("internal-compliance");
      return;
    }
    onNavigate(`internal-compliance-${section}`);
  };

  return (
    <GovernancePortalPage
      eyebrow="Internal Compliance · Contract Governance · Legal Risk"
      title="內在法遵與風險治理"
      titleEn="Internal Compliance & Legal Risk Governance"
      lead="企業跨境、擴張、融資與數位化之後，法律風險不會只發生在法務部門。真正的防禦必須進入契約、權限、交易與證據本身。"
      statement="最高階的法遵，不是要求每個人背更多規則；而是讓組織在壓力最大時，仍知道哪些邊界不能被越過。"
      variant="compliance"
      activeSection={activeSection}
      sections={sections}
      metrics={[
        { label: "契約治理", value: "CONTRACT", description: "從簽署權限、版本到履約責任都能被追蹤。" },
        { label: "稽核軌跡", value: "TRACE", description: "重大決定與異常事件留下可驗證的證據鏈。" },
        { label: "例外控制", value: "ESCALATE", description: "越過標準流程時必須被識別、升級與說明。" },
      ]}
      primaryLabel="提出法遵治理需求"
      secondaryLabel="檢視風險盲點"
      primaryIcon={Scale}
      onPrimary={() => onNavigate?.("about")}
      onSecondary={() => changeSection("simulator")}
      onSectionChange={changeSection}
    />
  );
}
