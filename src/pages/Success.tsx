import { ExternalLink, MessageCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] px-6 py-20 text-[#2b261f] lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[920px]">
        <p className="text-[10px] uppercase tracking-[0.26em] text-[#8b642f]">STT PRESS · DIGITAL DELIVERY</p>
        <h1 className="mt-6 font-serif text-5xl font-normal leading-tight lg:text-7xl">付款完成</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#9a6f3b]">Payment Confirmed</p>

        <div className="mt-10 border-y border-[#ddcfba] py-9">
          <p className="max-w-[800px] font-serif text-2xl leading-[1.8] text-[#5f5549]">
            感謝您購買《內在法遵 Internal Compliance｜為你的內心，打造一座不可侵犯的至聖所》數位閱讀完整版。
          </p>
          <p className="mt-5 max-w-[800px] text-sm leading-8 text-[#756b5e]">
            請使用付款時填寫的姓名與 Email 進行後續身分確認與數位內容交付。實際授權、交付、解除權或退款條件，以購買頁面、交易時揭露內容及適用法規為準。
          </p>
        </div>

        <section className="mt-10 border border-[#d8c8ad] bg-white p-7 lg:p-9">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b642f]">NEXT STEP</p>
          <h2 className="mt-4 font-serif text-3xl font-normal">加入 STT Governance 官方 LINE 完成交付確認。</h2>
          <p className="mt-4 text-sm leading-7 text-[#756b5e]">加入後請提供付款時使用的身分資訊，由正式交付流程進一步核對。</p>
          <a
            href="https://line.me/R/ti/p/@stt-group"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 border border-[#9f7138] bg-[#9f7138] px-5 py-3 text-sm text-white no-underline"
          >
            <MessageCircle className="h-5 w-5" />
            前往 STT Governance 官方 LINE
          </a>
        </section>

        <section className="mt-8 grid gap-0 border-l border-t border-[#ddcfba] md:grid-cols-2">
          <div className="border-b border-r border-[#ddcfba] bg-[#fffdf9] p-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b642f]">Digital Asset Info</p>
            <p className="mt-4 font-serif text-lg">EPUB：9786264470544</p>
            <p className="mt-2 font-serif text-lg">PDF：9786264470551</p>
          </div>
          <div className="border-b border-r border-[#ddcfba] bg-[#fffdf9] p-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b642f]">Delivery & Transaction</p>
            <p className="mt-4 text-sm leading-7 text-[#756b5e]">數位內容之交付與交易條件，依付款時揭露內容及正式交易政策辦理。</p>
          </div>
        </section>

        <div className="mt-10 border-t border-[#ddcfba] pt-8">
          <p className="text-sm leading-7 text-[#756b5e]">如亦希望參與學會之正式會員與交流，可另由 GCSDA 官方 LINE 洽詢；學會會員制度與 STT 數位內容交易為不同關係。</p>
          <a
            href="https://line.me/R/ti/p/@387nbnjs"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-b border-[#a9793e] pb-1 text-sm text-[#805a30] no-underline"
          >
            GCSDA 官方 LINE <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
