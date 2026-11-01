// Independent organizational identity. Production origin requires owner confirmation.
export type GcsdaMeta = {
  title:string;
  description:string;
  language?:"zh-Hant-TW"|"en";
  locale?:"zh_TW"|"en_US";
};

export const GCSDA_META: Record<string,GcsdaMeta> = {
  "/": {
    "title": "GCSDA｜中華企業策略永續發展學會",
    "description": "中華企業策略永續發展學會連結企業、專業與學術，透過正式組織、章程、會員共同體與跨域交流，累積治理知識與實務連結。"
  },
  "/about": {
    "title": "關於學會｜GCSDA",
    "description": "認識中華企業策略永續發展學會的成立宗旨、法定身分與治理定位。"
  },
  "/founder-chairman": {
    "title": "創會理事長｜莊鈞翔博士｜GCSDA",
    "description": "認識中華企業策略永續發展學會創會理事長莊鈞翔博士之學會角色、治理與研究脈絡。"
  },
  "/governance": {
    "title": "組織治理｜GCSDA",
    "description": "了解中華企業策略永續發展學會的會員大會、理事會、監事會與第一屆理監事治理架構。"
  },
  "/council": {
    "title": "策略治理聯席會｜GCSDA",
    "description": "了解策略治理聯席會的議題導向、專業邊界與跨域治理交流定位。"
  },
  "/membership": {
    "title": "會員與入會｜GCSDA",
    "description": "了解中華企業策略永續發展學會會員資格、會費與入會程序。"
  },
  "/events": {
    "title": "活動與大會｜GCSDA",
    "description": "查閱中華企業策略永續發展學會會員大會、理監事會與正式活動紀錄。"
  },
  "/knowledge": {
    "title": "知識與研究｜GCSDA",
    "description": "查閱中華企業策略永續發展學會之企業策略、治理、法遵、風險控管與永續知識內容。"
  },
  "/charter": {
    "title": "章程與公告｜GCSDA",
    "description": "查閱中華企業策略永續發展學會章程摘要、法定立案資訊與正式公告原則。"
  },
  "/privacy": {
    "title": "隱私與資料使用｜GCSDA",
    "description": "中華企業策略永續發展學會網站之會員聯絡、會務與資料使用說明。"
  },
  "/en": {
    "title": "GCSDA | Institutional English Edition",
    "description": "GCSDA connects enterprise, professional and academic communities through formal organization, membership, governance and sustainable-development exchange.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/about": {
    "title": "About GCSDA | Institutional English Edition",
    "description": "Learn about GCSDA's institutional purpose, independent organizational identity and responsibility boundary.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/founder-chairman": {
    "title": "Founding Chairman | GCSDA",
    "description": "Learn about GCSDA founding chairman Chuang Chun-Hsiang, Ph.D., the founding vision and the institutional boundary between the chairman's role and the association's formal governance.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/governance": {
    "title": "Institutional Governance | GCSDA",
    "description": "Understand GCSDA's institutional governance through its General Assembly, Board of Directors, Board of Supervisors, bylaws and formal procedures.",
    "language": "en",
    "locale": "en_US"
  },
  "/navigator": {
    "title": "制度導航｜GCSDA",
    "description": "以自然語言描述需求，由 GCSDA Institutional Navigator 協助前往會員、章程、治理、活動、研究與會務等正式網站頁面。"
  },
  "/en/navigator": {
    "title": "Institutional Navigator | GCSDA",
    "description": "Describe what you are looking for and the local GCSDA Institutional Navigator will direct you to the appropriate formal association page.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/council": {
    "title": "Strategy Governance Council | GCSDA",
    "description": "Understand the Strategy Governance Council as an issue-led cross-disciplinary exchange mechanism that preserves professional and statutory governance boundaries.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/events": {
    "title": "Assemblies & Events | GCSDA",
    "description": "Review how GCSDA distinguishes formation, assemblies, board meetings, programs and formal public records.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/knowledge": {
    "title": "Knowledge & Research | GCSDA",
    "description": "Explore GCSDA knowledge domains across enterprise strategy, governance, compliance, risk control, sustainability and cross-disciplinary exchange.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/charter": {
    "title": "Charter & Notices | GCSDA",
    "description": "Understand the institutional role of GCSDA's six-chapter, thirty-eight-article charter; the complete Traditional Chinese charter remains the formal published source.",
    "language": "en",
    "locale": "en_US"
  },
  "/en/membership": {
    "title": "Membership Framework | GCSDA",
    "description": "Understand GCSDA's membership application, qualification review and formal membership process. The governed application remains on the Traditional Chinese intake page.",
    "language": "en",
    "locale": "en_US"
  }
};

export const GCSDA_LANGUAGE_PAIRS:Record<string,{zh:string;en:string}>={
  "/":{zh:"/",en:"/en"},
  "/en":{zh:"/",en:"/en"},
  "/about":{zh:"/about",en:"/en/about"},
  "/en/about":{zh:"/about",en:"/en/about"},
  "/founder-chairman":{zh:"/founder-chairman",en:"/en/founder-chairman"},
  "/en/founder-chairman":{zh:"/founder-chairman",en:"/en/founder-chairman"},
  "/governance":{zh:"/governance",en:"/en/governance"},
  "/en/governance":{zh:"/governance",en:"/en/governance"},
  "/council":{zh:"/council",en:"/en/council"},
  "/en/council":{zh:"/council",en:"/en/council"},
  "/membership":{zh:"/membership",en:"/en/membership"},
  "/en/membership":{zh:"/membership",en:"/en/membership"},
  "/events":{zh:"/events",en:"/en/events"},
  "/en/events":{zh:"/events",en:"/en/events"},
  "/knowledge":{zh:"/knowledge",en:"/en/knowledge"},
  "/en/knowledge":{zh:"/knowledge",en:"/en/knowledge"},
  "/charter":{zh:"/charter",en:"/en/charter"},
  "/en/charter":{zh:"/charter",en:"/en/charter"},
  "/navigator":{zh:"/navigator",en:"/en/navigator"},
  "/en/navigator":{zh:"/navigator",en:"/en/navigator"},
};
export function verifiedGcsdaOrigin(value?:string){
 if(!value)return "";
 try{const url=new URL(value);if(url.protocol!=="https:"||url.pathname!=="/"||url.search||url.hash||url.username||url.password||url.hostname==="stt-003.vercel.app"||url.hostname.includes("-git-"))return "";return url.origin;}catch{return "";}
}
export function applyGcsdaMetadata(path:string){
 path=path!=="/"?path.replace(/\/$/,""):"/";
 const meta=GCSDA_META[path],origin=verifiedGcsdaOrigin((import.meta as any).env.VITE_GCSDA_SITE_ORIGIN);
 const language=meta?.language??"zh-Hant-TW",locale=meta?.locale??"zh_TW";
 document.documentElement.lang=language;
 function set(key:string,value:string,property=false){const attr=property?"property":"name";let el=document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);if(!el){el=document.createElement("meta");el.setAttribute(attr,key);document.head.appendChild(el);}el.content=value;}
 const title=meta?.title||"找不到頁面｜GCSDA",description=meta?.description||"中華企業策略永續發展學會網站導覽。";
 document.title=title;set("description",description);set("robots",origin&&meta?"index,follow":"noindex,follow");
 const isFounder=path==="/founder-chairman"||path==="/en/founder-chairman";set("og:title",title,true);set("og:description",description,true);set("og:site_name","GCSDA｜中華企業策略永續發展學會",true);set("og:type",isFounder?"profile":"website",true);set("og:locale",locale,true);
 document.head.querySelectorAll('link[rel="canonical"],link[data-gcsda-language-alternate="true"]').forEach(el=>el.remove());
 const pair=GCSDA_LANGUAGE_PAIRS[path];
 if(origin&&pair){
  [["zh-Hant-TW",pair.zh],["en",pair.en],["x-default",pair.zh]].forEach(([hreflang,route])=>{
   const alt=document.createElement("link");alt.rel="alternate";alt.hreflang=hreflang;alt.href=origin+route;alt.dataset.gcsdaLanguageAlternate="true";document.head.appendChild(alt);
  });
 }
 document.getElementById("gcsda-organization-schema")?.remove();document.getElementById("gcsda-founder-schema")?.remove();
 if(origin&&meta){
  const link=document.createElement("link");link.rel="canonical";link.href=origin+path;document.head.appendChild(link);set("og:url",origin+path,true);set("og:image",origin+(isFounder?"/visual-bank/gcsda/founder-chairman-hero.webp":"/images/gcsda-logo.png"),true);set("og:image:alt",isFounder?"創會理事長莊鈞翔博士":"中華企業策略永續發展學會 GCSDA 標誌",true);
  const schema=document.createElement("script");schema.id="gcsda-organization-schema";schema.type="application/ld+json";schema.text=JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"中華企業策略永續發展學會","alternateName":"GCSDA","url":origin,"logo":origin+"/images/gcsda-logo.png","inLanguage":language});document.head.appendChild(schema);if(isFounder){const person=document.createElement("script");person.id="gcsda-founder-schema";person.type="application/ld+json";person.text=JSON.stringify({"@context":"https://schema.org","@type":"Person","name":"莊鈞翔博士","alternateName":"Chuang Chun-Hsiang, Ph.D.","url":origin+"/founder-chairman","image":origin+"/visual-bank/gcsda/founder-chairman-hero.webp","jobTitle":language==="en"?"Founding Chairman":"創會理事長","affiliation":{"@type":"Organization","name":"中華企業策略永續發展學會","alternateName":"GCSDA","url":origin}});document.head.appendChild(person);}
 }
 else{document.head.querySelectorAll('meta[property="og:url"],meta[property="og:image"],meta[property="og:image:alt"]').forEach(el=>el.remove());}
}
