import { useNavigate } from "react-router-dom";

const problems = [
  { id: "major-decision", title: "一個重大決定，大家都說可以做，我卻不知道真正的風險在哪裡。", misjudgment: "最常見的錯，不是沒有分析，而是太早開始比較方案，卻沒有先確認真正要解決的問題、不可承擔的結果與會推翻結論的證據。", result: "Decision Brief、GO／CONDITIONAL GO／HOLD／NO-GO、停止條件與下一步證據。" },
  { id: "owner-dependence", title: "公司愈來愈大，但所有重要事情還是在等老闆決定。", misjudgment: "把『老闆很重要』誤認成『所有權力都必須留在老闆身上』，最後組織有職位，卻沒有真正的決策權與承接能力。", result: "Decision Rights Matrix、Reserved Matters、授權 SOP、例外管理與責任界線。" },
  { id: "succession", title: "二代已經進公司，職位交了，權力卻一直交不出去。", misjudgment: "接班若只處理職稱、股份或交棒日期，卻沒有同步移交資訊權、授權權、對外關係與失敗後的修正機制，交接就容易停留在形式。", result: "接班路線圖、權責移轉、資訊交接、重大事項保留與驗收條件。" },
  { id: "family-ownership", title: "家族有資產，但沒有人真正知道誰有最後決定權。", misjudgment: "資產安排不等於治理完成。真正容易引爆爭議的，是所有權、控制權、照護責任與重大事項決策沒有被說清楚。", result: "家族重大事項清單、決策程序、僵局與退出機制、家族治理文件。" },
  { id: "strategic-legal", title: "律師說法律上可以做，但我不知道商業上值不值得。", misjudgment: "『可以主張』與『值得執行』是兩個問題。法律位置、現金流、談判籌碼、時間、品牌、關係與可逆性必須放在同一張桌上。", result: "Strategic-Legal Decision Review、三軌方案、ROI、可逆性、談判與行動順位。" },
  { id: "ai-governance", title: "公司已經在使用 AI，但沒有人說得清楚它可以決定到哪裡。", misjudgment: "把模型能力當成授權資格。AI 能做到，不代表公司已經決定它有權做到，更不代表責任可以跟著自動化一起外包。", result: "AI 權限矩陣、資料分級、人工覆核、停止／回滾 SOP 與責任簽核。" },
  { id: "system-failure", title: "制度、SOP 都有，真正出事時卻沒有人照制度走。", misjudgment: "文件存在不代表制度成立。真正要驗證的是責任人、例外、資訊、權限、停止條件與追責機制是否在壓力下仍然能運作。", result: "制度缺口圖、責任斷點、例外管理、90 日啟動工程與驗收節點。" },
  { id: "founder-legacy", title: "我希望把創辦人的思想、企業故事與價值留下來。", misjudgment: "事件人人看得見，事件對一個人的意義卻只有當事人知道。等人離開後才整理，很多真正影響企業的判斷與記憶已經無法再被確認。", result: "Founder Legacy 專訪、企業史、文化文本、治理記憶、知識資產與出版素材。" },
];

export default function Problems() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fbfaf7] text-[#26231f]">
      <section className="border-b border-[#d8c8ad] px-6 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-[1180px]"><p className="text-[11px] uppercase tracking-[0.26em] text-[#a37a43]">Problem Finder</p><h1 className="mt-6 max-w-[900px] font-serif text-4xl leading-[1.35] lg:text-6xl">你現在面對的，不一定是你以為的問題。</h1><p className="mt-7 max-w-[780px] text-base leading-8 text-[#6d675f] lg:text-lg">不用先知道自己需要哪一種顧問。先從正在發生的事情開始，再把症狀、真正問題、證據與可執行結果分開。</p></div></section>
      <section className="px-6 py-12 lg:px-10 lg:py-18"><div className="mx-auto max-w-[1180px] divide-y divide-[#ded4c4] border-y border-[#ded4c4]">{problems.map((problem,index)=><article key={problem.id} id={problem.id} className="grid gap-6 py-9 lg:grid-cols-[90px_1.25fr_1fr] lg:gap-10 lg:py-12"><div className="font-serif text-2xl text-[#b18a54]">{String(index+1).padStart(2,"0")}</div><div><h2 className="font-serif text-2xl leading-10 lg:text-3xl">{problem.title}</h2><p className="mt-4 text-sm leading-7 text-[#70695f]">常見誤判｜{problem.misjudgment}</p></div><div className="flex flex-col justify-between gap-6 border-l-0 border-[#d8c8ad] lg:border-l lg:pl-8"><p className="text-sm leading-7 text-[#5f594f]"><span className="text-[#9c7440]">可形成結果｜</span>{problem.result}</p><div className="flex flex-wrap gap-5"><button type="button" onClick={()=>navigate(`/problems/${problem.id}`)} className="w-fit border-b border-[#a37a43] bg-transparent pb-1 text-sm text-[#8c6535]">先看完整判讀 →</button><button type="button" onClick={()=>navigate(`/start?route=${problem.id}`)} className="w-fit border-0 bg-transparent pb-1 text-sm text-[#81766a]">直接開始</button></div></div></article>)}</div></section>
      <section className="px-6 pb-24 pt-10 lg:px-10 lg:pb-32"><div className="mx-auto max-w-[1180px] border border-[#d8c8ad] bg-white px-7 py-10 lg:flex lg:items-end lg:justify-between lg:px-12 lg:py-12"><div><p className="text-[10px] uppercase tracking-[0.24em] text-[#a37a43]">Governance Engagement</p><h2 className="mt-4 font-serif text-3xl leading-tight">現在發生了什麼，而你最不希望接下來發生什麼？</h2></div><button type="button" onClick={()=>navigate("/start")} className="mt-7 border border-[#b8925d] bg-[#b8925d] px-6 py-3 text-sm text-white lg:mt-0">開始治理判讀</button></div></section>
    </div>
  );
}
