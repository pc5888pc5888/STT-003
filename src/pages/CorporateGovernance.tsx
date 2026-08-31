import { Landmark, Scale } from "lucide-react";
import { GovernancePortalPage, type PortalSection } from "@/components/GovernancePortalPage";

export default function CorporateGovernance({
  onNavigate,
  activeSection = "intro",
}: {
  onNavigate?: (page: string) => void;
  activeSection?: "intro" | "modules" | "simulator" | "academic";
}) {
  const sections: PortalSection[] = [
    {
      id: "intro",
      label: "治理原理",
      title: "重大決策先有秩序，策略才有承載能力",
      description: "企業治理不是把更多程序疊在管理之上，而是先釐清誰能決定、誰必須說明、哪些事項必須被制衡，以及風險出現時如何升級處理。",
      points: [
        "把董事會、經營團隊與關鍵權責人的決策權限重新畫清，避免重大事項在權威、人情與部門慣例之間漂移。",
        "建立重大投資、併購、融資、跨境與轉型事項的治理門檻，使決策在執行前先經過風險、利益衝突與證據檢核。",
        "讓會議紀錄、決策依據與反對意見形成可追溯的治理紀錄，降低事後無法釐清責任與判斷依據的風險。",
      ],
      note: "本頁呈現治理方法與制度設計思路，不以任意滑桿或隨機分數製造治理結論。正式評估必須基於企業提供的真實資料、權責關係與決策紀錄。",
    },
    {
      id: "modules",
      label: "核心架構",
      title: "從董事會到重大事項門控的五個治理層次",
      description: "治理架構的價值，在於把企業主的判斷能力轉譯為組織可重複執行的制度。",
      points: [
        "董事會治理：明確審議層級、利益迴避、資訊品質與重大事項保留權限。",
        "決策架構：建立 Decision Rights、Authorization Matrix 與例外升級處理機制。",
        "風險治理：將法律、營運、財務、地緣與聲譽風險放進同一張重大決策地圖。",
        "制度紀錄：保留證據、版本、會議判斷與責任鏈，讓治理可被稽核而不是只靠記憶。",
        "執行校正：透過定期治理審查與例外事件回顧，把制度從一次性文件變成持續運作的控制系統。",
      ],
    },
    {
      id: "simulator",
      label: "治理診斷",
      title: "不用假分數，先辨識企業真正的治理斷點",
      description: "初步診斷應先找出結構性斷點，再決定是否需要深入評估，而不是用沒有資料基礎的漂亮分數替企業下結論。",
      points: [
        "決策權是否集中於少數人，卻缺乏保留事項、替代機制與第二層審查。",
        "重大風險是否只在事件發生後由法務或財務補救，而沒有被嵌入前端決策流程。",
        "董事會與高階經理人是否能取得足以支持判斷的資料，而不是被簡報摘要與單一部門資訊綁架。",
        "關係人交易、利益衝突、跨境交易與資本配置是否存在獨立審查與可追溯紀錄。",
      ],
      note: "若要形成可用於董事會或企業主的治理診斷，下一步應建立企業專屬問卷、文件清單與訪談流程，再進入正式判讀。",
    },
    {
      id: "academic",
      label: "研究基礎",
      title: "治理設計必須有理論，也必須能回到企業現場",
      description: "STT 將公司治理、策略管理、組織決策與法遵研究轉譯為可被企業主直接使用的制度語言。",
      points: [
        "企業策略導入公司治理法遵精神：把外部專業顧問從事件處理者提升為重大策略決策的治理參與者。",
        "企業接班與家族價值研究：辨識控制權、價值傳承與世代決策機制的交互作用。",
        "不同世代企業家人格特質、創新能力與經營績效研究：理解領導風格如何影響策略執行與組織反應。",
      ],
    },
  ];

  const changeSection = (section: string) => {
    if (!onNavigate) {
      return;
    }
    if (section === "intro") {
      onNavigate("corporate-governance");
      return;
    }
    onNavigate(`corporate-governance-${section}`);
  };

  return (
    <GovernancePortalPage
      eyebrow="Strategic Governance · Institutional Architecture"
      title="企業治理與策略判讀"
      titleEn="Corporate Governance & Strategic Judgment"
      lead="當市場、資本與地緣秩序快速改變，企業最需要的不是更多口號，而是一套能承接重大判斷、分配決策權並留下責任軌跡的治理架構。"
      statement="治理的價值，不是讓企業變慢；而是讓真正重要的決策，在速度之外仍保有邊界、證據與責任。"
      variant="governance"
      activeSection={activeSection}
      sections={sections}
      metrics={[
        { label: "決策權", value: "RIGHTS", description: "誰能決定、誰能否決、哪些事項必須升級。" },
        { label: "證據鏈", value: "EVIDENCE", description: "重大判斷必須能回到資料、紀錄與責任來源。" },
        { label: "治理邊界", value: "BOUNDARY", description: "把個人權威與組織制度清楚分界。" },
      ]}
      primaryLabel="進入治理委託"
      secondaryLabel="查看治理診斷"
      primaryIcon={Landmark}
      onPrimary={() => onNavigate?.("about")}
      onSecondary={() => changeSection("simulator")}
      onSectionChange={changeSection}
    />
  );
}
