import { motion } from "motion/react";
import { Landmark, Users, Scroll } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const directory = [
  { role: "創會理事長", name: "莊鈞翔 博士", title: "中華企業策略永續發展學會 創辦人" },
  { role: "副理事長", name: "范英峰", title: "鎂宥新工程有限公司 總經理" },
  { role: "秘書長", name: "黃朝福 會計師", title: "朝陽會計師事務所 所長" },
  { role: "常務理事", name: "陳錚程", title: "玉山銀行 襄理" },
  { role: "理事", name: "謝秉錡律師", title: "謝秉錡律師事務所 主持律師" },
  { role: "理事", name: "高毓謙 律師", title: "博理法律事務所" },
  { role: "理事", name: "林柏劭 律師", title: "欣成法律事務所 主持律師" },
  { role: "理事", name: "賴祺元 律師", title: "賴祺元律師事務所 所長" },
  { role: "理事", name: "劉煒達 律師", title: "亞森銧國際法律事務所 所長" },
  { role: "理事", name: "林政男 律師", title: "上海申浩律師事務所 合夥律師" },
  { role: "候補理事", name: "游筑雅", title: "鈺田工業有限公司 業務經理" },
  { role: "常務監事", name: "廖經舜", title: "旭研電機有限公司 總經理" },
  { role: "監事", name: "李克成 建築師", title: "李克成建築師事務所 所長" },
  { role: "監事", name: "林家豪", title: "樂業國際事業有限公司 執行長" },
  { role: "候補監事", name: "陳冠宏", title: "裕富數位資融股份有限公司 副理" },
];

const charter = [
  {
    chapter: "第一章　總則",
    articles: [
      { id: "第一條", content: "本會名稱為中華企業策略永續發展學會（以下簡稱本會）。" },
      { id: "第二條", content: "本會為依法設立、非以營利為目的之公益性社會團體，本會宗旨致力於推廣公司治理之法遵精神，並促進企業智庫策略之有效應用，以引導企業積極實踐社會責任，並深化公司治理之落實，進而強化企業組織體質，提升整體營運效能，並積極建構企業界、民間團體及學術界之跨界交流平台，以前瞻性思維強化風險控管機制，有效降低潛在爭議與損失，最終旨在全面提升企業邁向永續發展之動能。" },
      { id: "第三條", content: "本會之任務如下：\n一、戮力倡導策略發展思維，深植策略為先、治理為本、管理為終之圭臬，藉以厚植產業價值基磐。\n二、精微觀察產業脈動與發展趨勢，深入思考動態策略管理之內涵，並弘揚公司治理法遵之精神。\n三、擘劃企業策略藍圖，協助企業興建智庫以符企業發展之需。\n四、襄助產業界、學術界及研究機構，建構多元交流互動平台，促進產學研之蓬勃發展。\n五、籌辦產業趨勢研討盛會、專業議題座談會及工商實務觀摩行旅，以啟迪業界新思維。\n六、應各界委託，協助經營管理研究、辦理學術專題講座，並提供專業諮詢建議，以有助於企業決策之完善。\n七、提供企業營運法規諮詢服務，並徵詢學術專家卓見，俾利企業穩健經營。\n八、協同辦理企業策略深耕教育培訓及相關活動，以利策略思維之普及與深化。" },
      { id: "第四條", content: "本會之主管機關為內政部，本會之目的事業應受各該事業主管機關之指導、監督。" },
      { id: "第五條", content: "本會以全國行政區域為組織區域。" },
      { id: "第六條", content: "本會會址設於主管機關所轄地區，並得報經主管機關核准設分支機構。\n前項分支機構組織簡則經會員（會員代表）大會通過，報請主管機關核准後行之。\n會址及分支機構之地址於設置及變更時，應函報主管機關核備。" }
    ]
  },
  {
    chapter: "第二章　會員、理事及監事",
    articles: [
      { id: "第七條", content: "本會會員及會費分類如下：\n一、個人會員：凡贊同本會宗旨、年滿二十五歲，填具入會申請書，經理事會審查通過，並繳納會費後，為個人會員；入會費新臺幣2000元，於會員入會時繳納；常年會費新臺幣2000元。\n二、榮譽會員：贊同本會宗旨的公私立機構團體或個人，經本會邀請擔任之會員。\n三、贊助會員：贊同本會宗旨且對本會無償捐贈之個人、機構或團體，經本會邀請擔任之會員。" },
      { id: "第八條", content: "會員（會員代表）有表決權、選舉權、被選舉權與罷免權。每一會員（會員代表）為一權。贊助會員、榮譽會員無前項權利。" },
      { id: "第九條", content: "本會理事、監事均為無給職，任期二年，連選得連任。理事長之連任，以一次為限。理事、監事之任期自召開本屆第一次理事會之日起計算。" },
      { id: "第十條", content: "本會置理事9人（含常務理事3人，其中1人為理事長，其中1人為副理事長）、候補理事1人。\n常務理事，由全體理事互選之。\n理事長，由全體理事就常務理事中選舉之。\n副理事長，由全體理事就常務理事中選舉之。" },
      { id: "第十一條", content: "本會置監事3人、候補監事1人、常務監事1人、監事會召集人1人。監事會置常務監事，由監事互選之，監察日常會務，並互推1人擔任監事會召集人。" },
      { id: "第十二條", content: "會員有遵守本會章程、決議及繳納會費之義務。\n會員未繳納會費者，不得享有會員權利，連續2年未繳納會費者，視為自動退會。會員經出會、退會或停權處分，如欲申請復會或復權時，除有正當理由經理事會審核通過者外，應繳清前所積欠之會費。" },
      { id: "第十三條", content: "會員（會員代表）有違反法令、章程或不遵守會員大會決議時，得經理事會決議，予以警告或停權處分，其危害團體情節重大者，得經會員大會決議予以除名。" },
      { id: "第十四條", content: "會員有下列情事之一者，為出會：\n一、喪失會員資格者。\n二、經會員大會決議除名者。" },
      { id: "第十五條", content: "會員得以書面敘明理由向本會聲明退會。" }
    ]
  },
  {
    chapter: "第三章　組織及職權",
    articles: [
      { id: "第十六條", content: "本會以會員大會為最高權力機構。會員人數超過三百人以上時得分區比例選出會員代表，再召開會員代表大會，行使會員大會職權。會員代表任期二年，其名額及選舉辦法由理事會擬訂，報請主管機關核備後行之。" },
      { id: "第十七條", content: "會員大會之職權如下：\n一、訂定與變更章程。\n二、選舉及罷免理事、監事。\n三、議決入會費、常年會費、事業費及會員捐款之數額及方式。\n四、議決年度工作計畫、報告及預算、決算。\n五、議決會員之除名處分。\n六、議決財產之處分。\n七、議決本會之解散。\n八、議決與會員權利義務有關之其他重大事項。前項第八款重大事項之範圍由理事會定之。" },
      { id: "第十八條", content: "本會理事、監事，由會員（會員代表）選舉之，分別成立理事會、監事會。\n選舉前項理事、監事時，依計票情形得同時選出候補理事，候補監事，遇理事、監事出缺時，分別依序遞補之。\n理事會得提出下屆理事、監事候選人參考名單。\n理事、監事得採用通訊選舉。通訊選舉辦法由理事會通過後實施，並報主管機關備查。" },
      { id: "第十九條", content: "理事長對內綜理督導會務，對外代表本會，並擔任會員大會、理事會主席。\n理事長因事不能執行職務時，由副理事長代理之；未指定或不能指定時，由常務理事互推1人代理之。\n理事長、副理事長或常務理事出缺時，應於2個月內補選之。" },
      { id: "第二十條", content: "理事會之職權如下：\n一、審定會員（會員代表）之資格。\n二、選舉及罷免常務理事、副理事長、理事長。\n三、議決理事、常務理事及副理事長、理事長之辭職。\n四、聘免工作人員。\n五、擬訂年度工作計畫、報告及預算、決算。\n六、其他應執行事項。" },
      { id: "第二十一條", content: "常務監事因事不能執行職務時，應指定監事1人代理之，未指定或不能指定時，由監事互推1人代理之。\n監事會主席（常務監事）出缺時，應於1個月內補選之。" },
      { id: "第二十二條", content: "監事會之職權如下：\n一、監察理事會工作之執行。\n二、審核年度決算。\n三、選舉及罷免常務監事。\n四、議決監事及常務監事之辭職。\n五、其他應監察事項。" },
      { id: "第二十三條", content: "理事、監事均為無給職，任期二年，連選得連任。理事長之連任，以1次為限。理事、監事之任期自召開本屆第1次理事會之日起計算。" },
      { id: "第二十四條", content: "理事、監事有下列情事之一者，應即解任：\n一、喪失會員（會員代表）資格者。\n二、因故辭職經理事會或監事會決議通過者。\n三、被罷免或撤免者。\n四、受停權處分期間逾任期二分之一者。" },
      { id: "第二十五條", content: "本會置秘書長1人，承理事長之命處理本會事務，其他工作人員若干人，由理事長提名經理事會通過後聘免之。\n前項工作人員不得由理事、監事擔任。工作人員權責及分層負責事項由理事會另定之。" },
      { id: "第二十六條", content: "本會得設各種委員會、小組或其他內部作業組織，其組織簡則經理事會通過後施行，變更時亦同。" },
      { id: "第二十七條", content: "本會得由理事會聘請名譽理事長、名譽理事、顧問若干人，其聘期與理事、監事之任期同。" }
    ]
  },
  {
    chapter: "第四章　會議",
    articles: [
      { id: "第二十八條", content: "會員大會分定期會議與臨時會議2種，由理事長召集之，召集時除緊急事故之臨時會議外，應於15日前通知全體應出席人員。\n定期會議每年召開1次，臨時會議於理事會認為必要，或經會員五分之一以上之請求，或監事會函請召集時召開之。\n本會辦理法人登記後，臨時會議經會員十分之一以上之請求召開之。\n會員大會得以視訊會議或其他經中央主管機關公告之方式召集之，簽到及表決方式則配合電子化設備功能辦理。但涉及選舉、補選、罷免事項，應以實體集會方式辦理。" },
      { id: "第二十九條", content: "會員不能親自出席會員大會時，得以書面委託其他會員代理，每1會員以代理1人為限。" },
      { id: "第三十條", content: "會員大會之決議，以會員過半數之出席，出席人數過半數或較多數之同意行之。但下列事項之決議以出席人數三分之二以上同意行之：\n一、章程之訂定與變更。\n二、會員之除名。\n三、理事、監事之罷免。\n四、財產之處分。\n五、本會之解散。\n六、其他與會員權利義務有關之重大事項。\n本會辦理法人登記後，章程之變更以出席人數四分之三以上之同意或全體會員三分之二以上書面之同意行之；本會之解散，得隨時以全體會員三分之二以上之可決解散之。" },
      { id: "第三十一條", content: "理事會每6個月至少舉行會議1次，監事會每6個月至少舉會議1次，常務理事會每6個月召開一次，必要時得召開聯席會議或臨時會議。\n前項會議召集時除臨時會議外，應於7日前通知全體應出席人員，會議之決議，各以理事、監事過半數之出席，出席人數較多數之同意行之。" },
      { id: "第三十二條", content: "理事應出席理事會議，監事應出席監事會議，理事會、監事會不得委託出席。\n理事會議、監事會議及理監事聯席會議得以視訊會議或其他經中央主管機關公告之方式召集之，理事、監事出席各視訊會議，視為親自出席，簽到及表決方式則配合電子化設備功能辦理。但涉及選舉、補選、罷免事項，應以實體集會方式辦理。\n理事、監事連續2次無故缺席理事會、監事會者，視同辭職。" }
    ]
  },
  {
    chapter: "第五章　經費及會計",
    articles: [
      { id: "第三十三條", content: "本會經費來源如下：\n一、入會費：入會費新臺幣2000元，於會員入會時繳納。\n二、常年會費：新臺幣2000元。\n三、事業費。\n四、會員捐款。\n五、委託收益。\n六、基金及其孳息。\n七、其他捐助及收入。" },
      { id: "第三十四條", content: "本會會計年度以曆年為準，自每年1月1日起至12月31日止。\n本會於會計年度開始前2個月由理事會編造年度工作計畫及收支預算表、員工待遇表，提會員大會通過（會員大會因故未能如期召開者，先提理監事聯席會議通過），於會計年度開始前報主管機關核備。並於會計年度終了後2個月內由理事會編造年度工作報告及會計報告，送監事會審核後，造具審核意見書送還理事會，連同當年度工作計畫及收支預算表，提經會員大會通過後報主管機關備查。會員大會因故未能如期召開，可先經本會理事會及監事會或理監事聯席會議通過，事後提報大會追認後，再報請主管機關備查。" },
      { id: "第三十五條", content: "本會於解散後，剩餘財產歸屬所在地之地方自治團體或主管機關指定之機關團體所有。\n本會解散之清算人選任及財產清算程序，如本會經法人登記，除法律另有規定外，依民法之規定辦理；如本會未經法人登記，應依會員（會員代表）大會決議辦理，會員（會員代表）大會無法決議時，由理事長擔任清算人，並準用民法清算之規定。" }
    ]
  },
  {
    chapter: "第六章　附則",
    articles: [
      { id: "第三十六條", content: "本章程未規定事項，悉依有關法令規定辦理。" },
      { id: "第三十七條", content: "本章程經會員（會員代表）大會通過後施行，並報主管機關核備，變更時亦同。" },
      { id: "第三十八條", content: "本章程經本會114年07月01日第一屆第一次會員大會通過。\n114/04/07 申請組成全國性社會團體 准予籌組。\n114/08/12 申請成立全國性社會團體 結案。" }
    ]
  }
];

export default function GCSDA() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F7F4] pt-24 pb-20 selection:bg-gold-500 selection:text-black font-sans leading-relaxed">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* HERO SECTION - INSTITUTIONAL PURITY */}
        <section className="relative flex flex-col items-center justify-center min-h-[95vh] py-8 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            {/* The primary logo already contains the slogan; do not repeat textual slogans in the UI layer. */}
            <div className="w-full max-w-[650px] flex justify-center mb-16 px-4">
              <img 
                src="/images/gcsda-logo.png" 
                alt="中華企業策略永續發展學會" 
                className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_0_80px_rgba(212,175,55,0.15)]" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col items-center gap-10 text-center max-w-4xl px-4">
              <div className="h-px w-32 bg-gold-600/30"></div>
              
              <a 
                href="https://line.me/R/ti/p/@387nbnjs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-24 py-11 text-2xl md:text-3xl h-auto flex items-center justify-center bg-white/5 backdrop-blur-sm text-white/50 border border-white/10 hover:bg-gold-500 hover:text-black transition-all duration-700 rounded-none font-display font-black tracking-[0.5em] shadow-[0_40px_100px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 active:scale-95 no-underline"
              >
                <span>聯 繫 學 會 秘 書 處</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* GOVERNANCE AUTHORITY - THE CANONICAL INSTITUTIONAL ZONE */}
        <section className="relative py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <span className="text-gold-500 font-bold tracking-[0.5em] text-xs uppercase opacity-60">Governance Collective</span>
              <h2 className="text-4xl md:text-6xl font-display font-light text-gold-metallic tracking-widest">策略治理聯席會</h2>
              <p className="text-stone-300 text-xl md:text-2xl font-serif font-light tracking-[0.2em] mt-8">學會策略智庫 · 創始榮譽團體成員</p>
              <div className="h-px w-16 bg-gold-900/40 mx-auto mt-10"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start px-4">
              <p className="text-stone-100 text-2xl md:text-5xl font-serif font-light leading-[1.6] text-justify relative pl-16 border-l-4 border-gold-500">
                「引導產學共治，為企業建立不可變更的經營憲法。」
              </p>
              <p className="text-stone-400 text-lg md:text-2xl font-serif font-light leading-[1.7] text-justify italic opacity-80 pl-8 border-l border-white/10">
                產學研聯合智庫專注於判斷決策的「底線」而非「上限」，為複雜經營建立最後一道剛性門控機制。我們的任務是將深厚洞見轉化為具備強制力的治理正典。
              </p>
            </div>

            {/* THE DEFINITIVE THINK TANK ALLIANCE */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="relative pt-12 flex flex-col items-center"
            >
              <div className="relative w-full lg:w-[95%] border border-white/5 shadow-[0_100px_200px_rgba(0,0,0,0.8)] overflow-hidden bg-black/40 backdrop-blur-sm">
                 <div className="relative group overflow-hidden">
                   {/* Refined Group Photo with Masking for perfect dark-theme integration */}
                   <img 
                     src="/images/group-001.png" 
                     alt="中華企業策略永續發展學會 策略智庫全體專家成員" 
                     className="w-full h-auto drop-shadow-2xl transition-all duration-[20s] ease-out scale-[1.01] group-hover:scale-[1.03] opacity-95 group-hover:opacity-100"
                     style={{ 
                       imageRendering: 'auto' as any,
                       maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                       WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                       maskComposite: 'intersect',
                       WebkitMaskComposite: 'source-in'
                     }}
                     referrerPolicy="no-referrer"
                   />
                   
                   {/* Artistic Vignette Overlay to help blend white background with dark theme */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none mix-blend-multiply opacity-60"></div>
                 </div>
                 
                 {/* OVERLAY PANEL - IDENTIFYING THE EXPERTS */}
                 <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                    {[
                      { role: "理事", name: "林柏劭", title: "律師" },
                      { role: "理事", name: "林政男", title: "律師" },
                      { role: "理事", name: "劉煒達", title: "律師" },
                      { role: "創會理事長", name: "莊鈞翔", title: "博士", highlight: true },
                      { role: "理事", name: "高毓謙", title: "律師" },
                      { role: "秘書長", name: "黃朝福", title: "會計師" },
                      { role: "理事", name: "謝秉錡", title: "律師" },
                      { role: "理事", name: "賴祺元", title: "律師" }
                    ].map((expert, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className={`py-4 md:py-8 px-2 text-center flex flex-col justify-center gap-1 transition-all duration-1000 backdrop-blur-[2px] border-r border-white/5 last:border-r-0 ${
                          expert.highlight 
                            ? 'bg-gold-500/40 text-white shadow-[inset_0_0_20px_rgba(212,175,55,0.2)] z-20 border-x border-white/20' 
                            : 'bg-black/80 text-stone-200 hover:bg-black/60'
                        }`}
                      >
                        <span className={`text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase block mb-1 ${expert.highlight ? 'text-white' : 'text-gold-500/60'}`}>{expert.role}</span>
                        <h4 className={`text-lg md:text-2xl font-display font-medium tracking-tighter whitespace-nowrap ${expert.highlight ? 'font-black scale-110 drop-shadow-lg' : ''}`}>{expert.name}</h4>
                        <p className={`text-[8px] md:text-[10px] font-bold tracking-widest uppercase leading-tight ${expert.highlight ? 'text-white/90' : 'text-stone-500'}`}>{expert.title}</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DIRECTORY SECTION */}
        <section className="py-32 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-baseline gap-6 mb-24 max-w-4xl">
            <Users className="h-10 w-10 text-gold-500/30" />
            <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight">第一屆理監事會名錄</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20">
            {directory.map((member, i) => (
              <div key={i} className="group relative border-l border-white/10 pl-8 hover:border-gold-500 transition-all duration-700">
                <span className="text-gold-500/40 font-black text-xs tracking-widest uppercase block mb-4">{member.role}</span>
                <h4 className="text-3xl font-display font-light text-white group-hover:text-gold-metallic transition-colors mb-2">
                  {member.name}
                </h4>
                <p className="text-stone-500 text-base font-serif italic">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BYLAWS ACCORDION */}
        <section className="py-32 border-t border-white/5">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 gap-6">
            <Scroll className="h-12 w-12 text-gold-500/10" />
            <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight">學會章程摘要</h2>
          </div>

          <div className="max-w-5xl mx-auto bg-black border border-white/5 p-4 md:p-12">
            <Accordion className="space-y-4">
              {charter.map((chapter, i) => (
                <AccordionItem key={i} value={`chapter-${i}`} className="border-white/5 px-6 pb-4">
                  <AccordionTrigger className="text-xl md:text-2xl font-display font-light text-gold-metallic/60 hover:text-white transition-all py-8">
                    {chapter.chapter}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-12 pt-8 pb-12">
                    {chapter.articles.map((art, idx) => (
                      <div key={idx} className="space-y-4 pl-8 border-l border-gold-900/10">
                        <span className="text-gold-500 font-bold text-xs tracking-widest uppercase">{art.id}</span>
                        <p className="text-stone-300 font-serif font-light text-lg md:text-xl leading-relaxed text-justify">
                          {art.content}
                        </p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL REGISTRATION CTA */}
        <section className="py-40 border-t border-white/5 text-center bg-black -mx-6 md:-mx-24 px-6 md:px-24">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-6xl md:text-9xl font-display font-light text-white tracking-tighter leading-none">
              加入<span className="text-gold-metallic">治理生態圈</span>
            </h2>
            <p className="text-stone-400 font-serif font-light text-xl md:text-3xl leading-relaxed max-w-5xl mx-auto">
              與產學精英共同協作，引導企業建立穩健的策略治理基盤。
            </p>
            <div className="pt-8">
              <a 
                href="https://line.me/R/ti/p/@387nbnjs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-24 py-10 text-2xl h-auto bg-gold-400 text-black hover:bg-white transition-all duration-700 rounded-none font-display font-bold tracking-[0.4em] shadow-[0_30px_90px_rgba(212,175,55,0.25)] no-underline"
              >
                <span>申請入會洽詢</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
