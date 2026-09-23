// Independent organizational identity. Production origin requires owner confirmation.
export const GCSDA_META: Record<string,{title:string;description:string}> = {
  "/": {
    "title": "GCSDA｜中華企業策略永續發展學會",
    "description": "中華企業策略永續發展學會連結企業、專業與學術，透過正式組織、章程、會員共同體與跨域交流，累積治理知識與實務連結。"
  },
  "/about": {
    "title": "關於學會｜GCSDA",
    "description": "認識中華企業策略永續發展學會的成立宗旨、法定身分與治理定位。"
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
  }
};
export function verifiedGcsdaOrigin(value?:string){
 if(!value)return "";
 try{const url=new URL(value);if(url.protocol!=="https:"||url.pathname!=="/"||url.search||url.hash||url.username||url.password||url.hostname==="stt-003.vercel.app"||url.hostname.includes("-git-"))return "";return url.origin;}catch{return "";}
}
export function applyGcsdaMetadata(path:string){
 const meta=GCSDA_META[path],origin=verifiedGcsdaOrigin((import.meta as any).env.VITE_GCSDA_SITE_ORIGIN);
 function set(key:string,value:string,property=false){const attr=property?"property":"name";let el=document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);if(!el){el=document.createElement("meta");el.setAttribute(attr,key);document.head.appendChild(el);}el.content=value;}
 const title=meta?.title||"找不到頁面｜GCSDA",description=meta?.description||"中華企業策略永續發展學會網站導覽。";
 document.title=title;set("description",description);set("robots",origin&&meta?"index,follow":"noindex,follow");
 set("og:title",title,true);set("og:description",description,true);set("og:site_name","中華企業策略永續發展學會｜GCSDA",true);set("og:type","website",true);set("og:locale","zh_TW",true);
 document.head.querySelectorAll('link[rel="canonical"]').forEach(el=>el.remove());
 if(origin&&meta){const link=document.createElement("link");link.rel="canonical";link.href=origin+path;document.head.appendChild(link);set("og:url",origin+path,true);set("og:image",origin+"/images/gcsda-logo.png",true);}
 else{document.head.querySelectorAll('meta[property="og:url"],meta[property="og:image"]').forEach(el=>el.remove());}
}
