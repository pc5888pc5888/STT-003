import GovernedHero from "./components/GovernedHero";
import "./styles/cis-page-system.css";
import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { applyGcsdaMetadata } from "./gcsdaMetadata";
import "./styles/gcsda-accessibility.css";

const STT_URL = "https://stt-003.vercel.app/";
const LINE_URL = "https://line.me/R/ti/p/@387nbnjs";

const TITLE_BREAK_MARKS = ["，", "；", "：", "！", "？", "｜", ",", ";", ":", "!", "?", "|"] as const;

function splitBalancedTitle(title:string){
  const text=title.trim();
  const candidates:{index:number;score:number}[]=[];
  for(let i=0;i<text.length-1;i+=1){
    if(!TITLE_BREAK_MARKS.includes(text[i] as (typeof TITLE_BREAK_MARKS)[number])) continue;
    const left=text.slice(0,i+1).trim();
    const right=text.slice(i+1).trim();
    if(!left||!right) continue;
    const ratio=Math.min(left.length,right.length)/Math.max(left.length,right.length);
    const score=Math.abs((i+1)-text.length/2)+(ratio<0.45?10:0);
    candidates.push({index:i,score});
  }
  if(!candidates.length) return [text];
  candidates.sort((a,b)=>a.score-b.score||b.index-a.index);
  const i=candidates[0].index;
  return [text.slice(0,i+1).trim(),text.slice(i+1).trim()];
}

const pageVisuals:Record<string,string|undefined>={
  "/about":"/visual-bank/gcsda/about.webp",
  "/governance":"/visual-bank/gcsda/governance.webp",
  "/council":"/visual-bank/gcsda/council.webp",
  "/membership":"/visual-bank/gcsda/membership.webp",
  "/events":"/visual-bank/gcsda/events.webp",
  "/knowledge":"/visual-bank/gcsda/knowledge.webp",
  "/charter":"/visual-bank/gcsda/charter.webp",
  "/privacy":undefined,
};

const pageDescriptions:Record<string,string>={
  "/":"中華企業策略永續發展學會連結企業、專業與學術，透過正式組織、章程、會員共同體與跨域交流，累積治理知識與實務連結。",
  "/about":"認識中華企業策略永續發展學會的成立宗旨、法定身分與治理定位。",
  "/governance":"了解中華企業策略永續發展學會的會員大會、理事會、監事會與第一屆理監事治理架構。",
  "/council":"了解策略治理聯席會的議題導向、專業邊界與跨域治理交流定位。",
  "/membership":"了解中華企業策略永續發展學會會員資格、會費與入會程序。",
  "/events":"查閱中華企業策略永續發展學會會員大會、理監事會與正式活動紀錄。",
  "/knowledge":"查閱中華企業策略永續發展學會之企業策略、治理、法遵、風險控管與永續知識內容。",
  "/charter":"查閱中華企業策略永續發展學會章程摘要、法定立案資訊與正式公告原則。",
  "/privacy":"中華企業策略永續發展學會網站之會員聯絡、會務與資料使用說明。",
};

const navItems = [
  ["關於學會", "/about"],
  ["組織治理", "/governance"],
  ["策略治理聯席會", "/council"],
  ["會員與入會", "/membership"],
  ["活動與大會", "/events"],
  ["知識與研究", "/knowledge"],
  ["章程與公告", "/charter"],
] as const;

const directory = [
  ["創會理事長", "莊鈞翔 博士", "中華企業策略永續發展學會 創辦人"],
  ["副理事長", "范英峰", "鎂宥新工程有限公司 總經理"],
  ["秘書長", "黃朝福 會計師", "朝陽會計師事務所 所長"],
  ["常務理事", "陳錚程", ""],
  ["理事", "謝秉錡 律師", "謝秉錡律師事務所 主持律師"],
  ["理事", "高毓謙 律師", "博理法律事務所"],
  ["理事", "林柏劭 律師", "欣成法律事務所 主持律師"],
  ["理事", "賴祺元 律師", "賴祺元律師事務所 所長"],
  ["理事", "劉煒達 律師", "亞森銧國際法律事務所 所長"],
  ["理事", "林政男 律師", "上海申浩律師事務所 合夥律師"],
  ["候補理事", "游筑雅", ""],
  ["常務監事", "廖經舜", ""],
  ["監事", "李克成 建築師", ""],
  ["監事", "林家豪", ""],
  ["候補監事", "陳冠宏", ""],
] as const;

const charterHighlights = [
  ["宗旨", "推廣公司治理法遵精神，促進企業智庫策略有效應用，建構企業界、民間團體及學術界之跨界交流平台，強化風險控管並提升企業永續發展動能。"],
  ["策略圭臬", "策略為先、治理為本、管理為終。"],
  ["組織區域", "以全國行政區域為組織區域，主管機關為內政部。"],
  ["理事會", "理事 9 人，含常務理事 3 人，其中 1 人為理事長、1 人為副理事長；候補理事 1 人。"],
  ["監事會", "監事 3 人、候補監事 1 人、常務監事 1 人。"],
  ["任期", "理事、監事均為無給職，任期二年。"],
] as const;

function Styles(){return <style>{`
  html,body,#root{margin:0;background:#fbfaf7!important;color:#2c271f!important}.g4{--paper:#fbfaf7;--surface:#fffdf9;--soft:#f5efe5;--ink:#2c271f;--muted:#756c60;--gold:#b48a50;--gold2:#835c2e;--line:#ddceb8;min-height:100vh;background:var(--paper);color:var(--ink);font-family:Inter,"Noto Sans TC",system-ui,sans-serif}.g4 *{box-sizing:border-box}.g4-wrap{max-width:1220px;margin:auto;padding:0 30px}.g4-head{position:sticky;top:0;z-index:60;height:84px;background:rgba(255,253,249,.96);border-bottom:1px solid rgba(180,138,80,.24);backdrop-filter:blur(12px)}.g4-headin{height:84px;display:flex;align-items:center}.g4-brand{border:0;background:transparent;padding:0;text-align:left;color:var(--ink);cursor:pointer;text-decoration:none}.g4-brand img{display:block;width:min(430px,34vw);max-height:68px;object-fit:contain;object-position:left center}.g4-nav{margin-left:auto;display:flex;align-items:center}.g4-nav a{height:84px;padding:0 11px;display:inline-flex;align-items:center;border:0;background:transparent;color:#655c51;font-size:11px;cursor:pointer;text-decoration:none}.g4-nav a.active{position:relative;color:var(--gold2);background:transparent!important}.g4-nav a.active:after{content:"";position:absolute;left:10px;right:10px;bottom:14px;height:2px;background:var(--gold2)}.g4-join{height:auto!important;margin-left:14px!important;border:1px solid #9b6e38!important;border-radius:999px!important;padding:11px 18px!important;background:#9b6e38!important;color:#fff!important;font-size:13px!important;text-decoration:none!important}.g4-menu{display:none;margin-left:auto;border:0;background:transparent;color:var(--ink);cursor:pointer}
  .g4-home{position:relative;min-height:700px;display:flex;align-items:center;overflow:hidden;border-bottom:1px solid var(--line);background:var(--paper)}.g4-home-media{position:absolute;inset:0 0 0 44%;background:url('/visual-bank/gcsda/home-approved.webp') center right/cover no-repeat}.g4-home-media:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--paper) 0%,rgba(251,250,247,.96) 16%,rgba(251,250,247,.72) 40%,rgba(251,250,247,.18) 72%,rgba(251,250,247,.03) 100%)}.g4-home-copy{position:relative;z-index:2;width:56%;padding:110px 0}.g4-kicker{font-size:10px;letter-spacing:.27em;color:var(--gold2)}.g4-home h1,.g4-pagehead h1{margin:20px 0 0;font:400 clamp(46px,5.2vw,74px)/1.3 "Noto Serif TC",Georgia,serif;letter-spacing:-.025em}.g4-home p,.g4-pagehead p{max-width:760px;margin-top:24px;color:var(--muted);line-height:2;font-size:15px}.g4-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.g4-actions button,.g4-actions a{border:1px solid #b78c55;background:transparent;color:#805a30;padding:13px 18px;text-decoration:none;font-size:13px;cursor:pointer}.g4-actions .primary{background:#9b6e38;color:#fff;border-color:#9b6e38}.g4-values{background:#fffdf9;border-bottom:1px solid var(--line)}.g4-valuegrid{display:grid;grid-template-columns:repeat(4,1fr)}.g4-value{padding:30px 28px;min-height:185px;border-right:1px solid var(--line)}.g4-value:last-child{border-right:0}.g4-value span{font:400 12px Georgia,serif;color:var(--gold2)}.g4-value :is(h2,h3){margin:18px 0 0;font:400 21px/1.5 "Noto Serif TC",Georgia,serif}.g4-value p{margin:9px 0 0;color:var(--muted);font-size:13px;line-height:1.8}.g4-section{padding:94px 0;border-bottom:1px solid var(--line);background:var(--paper)}.g4-section.soft{background:linear-gradient(135deg,#f5efe5,#fbfaf7 72%)}.g4-title{margin:15px 0 0;font:400 clamp(34px,3.8vw,52px)/1.43 "Noto Serif TC",Georgia,serif}.g4-lead{max-width:840px;margin-top:18px;color:var(--muted);line-height:2}.g4-grid{display:grid;grid-template-columns:repeat(3,1fr);margin-top:40px;border-top:1px solid var(--line);border-left:1px solid var(--line)}.g4-card{background:#fffdf9;padding:28px;min-height:205px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}.g4-card span{font:11px Georgia,serif;color:var(--gold2);letter-spacing:.12em}.g4-card :is(h2,h3){font:400 22px/1.55 "Noto Serif TC",Georgia,serif;margin:16px 0 0}.g4-card p{color:var(--muted);font-size:14px;line-height:1.9}.g4-page{padding-bottom:100px}.g4-pagehead{position:relative;min-height:clamp(650px,calc(100svh - 84px),820px);display:flex;align-items:center;overflow:hidden;isolation:isolate;border-bottom:1px solid var(--line);background:var(--paper)}.g4-pagehead-media{position:absolute;inset:0;z-index:-3;width:100%;height:100%;object-fit:cover;object-position:center;display:block}.g4-pagehead-veil{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,rgba(251,250,247,.82) 0%,rgba(251,250,247,.62) 24%,rgba(251,250,247,.32) 43%,rgba(251,250,247,.1) 62%,rgba(251,250,247,0) 82%)}.g4-pagehead-inner{width:100%}.g4-pagehead-copy{width:min(54%,760px);padding:94px 0 90px}.g4-pagehead.is-medium .g4-pagehead-copy{width:min(61%,900px);max-width:900px}.g4-pagehead.is-long .g4-pagehead-copy{width:min(69%,1060px);max-width:1060px}.g4-pagehead h1{max-width:790px;margin:24px 0 0;font-size:clamp(50px,6vw,82px);line-height:1.12;letter-spacing:-.045em}.g4-pagehead.is-medium h1{max-width:900px;font-size:clamp(44px,4.3vw,62px);line-height:1.18}.g4-pagehead.is-long h1{max-width:1060px;font-size:clamp(40px,3.35vw,52px);line-height:1.24;letter-spacing:-.03em}.g4-title-line{display:block}.g4-pagehead p{max-width:760px;margin-top:24px;font-size:16px;line-height:1.95}.g4-pagehead.is-text-only{min-height:clamp(440px,55svh,590px);background:linear-gradient(180deg,rgba(180,138,80,.035),rgba(180,138,80,0) 40%),var(--paper)}.g4-pagehead.is-text-only .g4-pagehead-veil{display:none}.g4-pagehead.is-text-only .g4-pagehead-copy,.g4-pagehead.is-text-only.is-medium .g4-pagehead-copy,.g4-pagehead.is-text-only.is-long .g4-pagehead-copy{width:min(100%,980px);max-width:980px}.g4-pagehead.is-text-only h1,.g4-pagehead.is-text-only.is-medium h1,.g4-pagehead.is-text-only.is-long h1{max-width:980px}.g4-list{border-top:1px solid var(--line);margin-top:34px}.g4-row{display:grid;grid-template-columns:190px 1fr;gap:34px;padding:25px 0;border-bottom:1px solid var(--line)}.g4-row b{color:var(--gold2);font:400 14px Georgia,serif}.g4-row div{line-height:1.9;color:#5f584f}.g4-directory{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line);margin-top:34px}.g4-person{padding:25px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:#fffdf9}.g4-person small{color:var(--gold2);letter-spacing:.1em}.g4-person h3{font:400 21px "Noto Serif TC",Georgia,serif;margin:10px 0 7px}.g4-person p{margin:0;color:var(--muted);font-size:13px;line-height:1.7}.g4-event{display:grid;grid-template-columns:180px 1fr auto;gap:30px;align-items:start;padding:30px 0;border-bottom:1px solid var(--line)}.g4-event time{font:400 19px Georgia,serif;color:var(--gold2)}.g4-event h3{font:400 23px "Noto Serif TC",Georgia,serif;margin:0}.g4-event p{color:var(--muted);line-height:1.85}.g4-badge{border:1px solid #c7a16b;padding:8px 10px;font-size:10px;color:var(--gold2)}.g4-note{margin-top:34px;padding:28px;border:1px solid var(--line);background:linear-gradient(135deg,#fffdf9,#f5efe5)}.g4-note :is(h2,h3){margin:0;font:400 23px/1.5 "Noto Serif TC",Georgia,serif}.g4-note p{margin:12px 0 0;color:var(--muted);line-height:1.9}.g4-steps{counter-reset:step;margin-top:36px;border-top:1px solid var(--line)}.g4-step{display:grid;grid-template-columns:70px 1fr;gap:24px;padding:23px 0;border-bottom:1px solid var(--line)}.g4-step b{color:var(--gold2);font:400 16px Georgia,serif}.g4-step p{margin:0;color:var(--muted);line-height:1.85}.g4-final{text-align:center;padding:96px 28px;background:linear-gradient(180deg,#faf8f3,#f0e7d9);border-bottom:1px solid var(--line)}.g4-final h2{margin:16px auto 0;max-width:880px;font:400 clamp(36px,4.1vw,56px)/1.42 "Noto Serif TC",Georgia,serif}.g4-final p{max-width:740px;margin:22px auto 0;color:var(--muted);line-height:2}.g4-footer{padding:48px 0;background:#f5efe5;border-top:1px solid var(--line);color:var(--ink)}.g4-footergrid{display:grid;grid-template-columns:1fr auto;gap:35px;align-items:end}.g4-footer p{max-width:650px;color:var(--muted);line-height:1.8;font-size:13px}.g4-footer a,.g4-footer button{color:#8b622f;text-decoration:none;margin-left:18px;font-size:12px;border:0;background:transparent;cursor:pointer}.g4-drawer{position:fixed;inset:0;z-index:100;background:rgba(245,239,229,.8);backdrop-filter:blur(9px);display:flex;justify-content:flex-end}.g4-drawerpanel{width:min(430px,92vw);height:100%;background:#fffdf9;padding:86px 34px}.g4-drawerpanel>a,.g4-drawerpanel>button:not(.g4-close){width:100%;padding:17px 0;display:block;border:0;border-bottom:1px solid var(--line);background:transparent;text-align:left;font:400 18px "Noto Serif TC",Georgia,serif;color:var(--ink);text-decoration:none}.g4-close{position:absolute;right:25px;top:22px!important;width:auto!important;border:0!important}.g4-drawerpanel .g4-drawer-join{margin-top:18px!important;padding:14px 16px!important;background:#9b6e38!important;color:#fff!important;text-align:center!important;border-bottom:0!important}.g4-drawerpanel .g4-drawer-stt{margin-top:14px!important;font-size:15px!important;color:#8b622f!important}@media(max-width:1050px){.g4-nav{display:none}.g4-menu{display:block}.g4-home-media{inset:0;opacity:.5}.g4-home-media:after{background:rgba(251,250,247,.84)}.g4-home-copy{width:100%}.g4-pagehead{min-height:auto;align-items:flex-end}.g4-pagehead-media{object-position:68% center}.g4-pagehead-veil{background:linear-gradient(180deg,rgba(251,250,247,.05) 0%,rgba(251,250,247,.32) 32%,rgba(251,250,247,.86) 59%,rgba(251,250,247,1) 79%,rgba(251,250,247,1) 100%)}.g4-pagehead-copy,.g4-pagehead.is-medium .g4-pagehead-copy,.g4-pagehead.is-long .g4-pagehead-copy{width:100%;max-width:none;padding:clamp(340px,56vw,520px) 0 72px}.g4-pagehead.is-text-only{min-height:auto}.g4-pagehead.is-text-only .g4-pagehead-copy,.g4-pagehead.is-text-only.is-medium .g4-pagehead-copy,.g4-pagehead.is-text-only.is-long .g4-pagehead-copy{padding:76px 0 70px}.g4-pagehead-linework{top:28%;right:50%;width:min(60vw,380px);transform:translate(50%,-50%)}.g4-valuegrid,.g4-grid,.g4-directory{grid-template-columns:repeat(2,1fr)}}@media(max-width:760px){.g4-wrap{padding:0 20px}.g4-home{min-height:650px}.g4-home-copy{padding:90px 0}.g4-home h1{font-size:44px}.g4-pagehead-copy{padding:285px 0 54px}.g4-pagehead h1,.g4-pagehead.is-medium h1,.g4-pagehead.is-long h1{font-size:clamp(38px,10.8vw,52px);line-height:1.2}.g4-pagehead.is-text-only .g4-pagehead-copy,.g4-pagehead.is-text-only.is-medium .g4-pagehead-copy,.g4-pagehead.is-text-only.is-long .g4-pagehead-copy{padding:58px 0 52px}.g4-pagehead p{font-size:15px}.g4-valuegrid,.g4-grid,.g4-directory{grid-template-columns:1fr}.g4-value{border-right:0;border-bottom:1px solid var(--line)}.g4-row{grid-template-columns:1fr}.g4-event{grid-template-columns:1fr}.g4-footergrid{grid-template-columns:1fr}.g4-footer a,.g4-footer button{margin:0 18px 0 0}}
.g4-membership-form{margin-top:36px;border-top:1px solid var(--line)}.g4-membership-form label{display:grid;grid-template-columns:220px minmax(0,1fr);gap:28px;padding:22px 0;border-bottom:1px solid var(--line);align-items:start}.g4-membership-form label>span{font:500 15px/1.8 "Noto Serif TC",Georgia,serif;color:var(--gold2)}.g4-membership-form :is(input,select,textarea){width:100%;border:1px solid #d5c5ae;background:#fffdf9;color:var(--ink);padding:12px 14px;font:16px/1.7 "Noto Serif TC",Georgia,serif;outline:none}.g4-membership-form :is(input,select,textarea):focus{border-color:var(--gold2)}.g4-membership-form textarea{resize:vertical}.g4-membership-form button{border:1px solid #9b6e38;background:#9b6e38;color:#fff;padding:12px 20px;border-radius:999px;cursor:pointer}.g4-membership-form button:disabled{opacity:.6;cursor:wait}.g4-honeypot{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important}.g4-form-status{color:#4f6d42!important}.g4-form-error{color:#8a4f3d!important}@media(max-width:760px){.g4-brand img{width:min(270px,66vw);max-height:60px}.g4-membership-form label{grid-template-columns:1fr;gap:8px}.g4-nav a.active:after{display:none}}`}</style>}

function Shell({children}:{children:ReactNode}){
  const loc=useLocation(); const[open,setOpen]=useState(false);
  useEffect(()=>{
    const labels:Record<string,string>={
      "/":"GCSDA｜中華企業策略永續發展學會",
      "/about":"關於學會｜GCSDA",
      "/governance":"組織治理｜GCSDA",
      "/council":"策略治理聯席會｜GCSDA",
      "/membership":"會員與入會｜GCSDA",
      "/events":"活動與大會｜GCSDA",
      "/knowledge":"知識與研究｜GCSDA",
      "/charter":"章程與公告｜GCSDA",
      "/privacy":"隱私與資料使用｜GCSDA",
    };
    document.title=labels[loc.pathname]||"找不到頁面｜GCSDA";
    let meta=document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if(!meta){
      meta=document.createElement("meta");
      meta.name="description";
      document.head.appendChild(meta);
    }
    meta.content=pageDescriptions[loc.pathname]||"中華企業策略永續發展學會官方網站。";
    applyGcsdaMetadata(loc.pathname);
    setOpen(false);
    window.scrollTo({top:0,behavior:"auto"});
  },[loc.pathname]);
  useEffect(()=>{
    if(!open) return;
    const panel=document.querySelector<HTMLElement>("#gcsda-mobile-menu");
    panel?.querySelector<HTMLButtonElement>("button")?.focus();
    const main=document.getElementById("main-content");
    const oldOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
    if(main)main.inert=true;
    const key=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){event.preventDefault();setOpen(false);document.querySelector<HTMLButtonElement>(".g4-menu")?.focus();}
      if(event.key==="Tab"&&panel){
        const items=Array.from(panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
        const first=items[0],last=items[items.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener("keydown",key);
    return()=>{document.removeEventListener("keydown",key);document.body.style.overflow=oldOverflow;if(main)main.inert=false;};
  },[open]);
  return <div className="g4"><a className="site-skip-link" href="#main-content">跳至主要內容</a><Styles/><header className="g4-head"><div className="g4-wrap g4-headin"><Link className="g4-brand" to="/" aria-label="GCSDA 首頁"><img src="/images/gcsda-logo.png" alt="GCSDA｜中華企業策略永續發展學會" /></Link><nav className="g4-nav" aria-label="主要導覽">{navItems.map(([l,p])=><NavLink key={p} className={({isActive})=>isActive?"active":""} to={p}>{l}</NavLink>)}<Link className="g4-join" to="/membership">申請入會</Link></nav><button className="g4-menu" onClick={()=>setOpen(true)} aria-label="開啟選單" aria-expanded={open} aria-controls="gcsda-mobile-menu"><Menu/></button></div></header>{open&&<div className="g4-drawer" onClick={()=>setOpen(false)}><div id="gcsda-mobile-menu" role="dialog" aria-modal="true" aria-label="網站導覽" className="g4-drawerpanel" onClick={e=>e.stopPropagation()}><button className="g4-close" onClick={()=>setOpen(false)} aria-label="關閉選單"><X/></button>{navItems.map(([l,p])=><Link key={p} to={p} onClick={()=>setOpen(false)}>{l}</Link>)}<Link className="g4-drawer-join" to="/membership" onClick={()=>setOpen(false)}>申請入會</Link><a className="g4-drawer-stt" href={STT_URL} target="_blank" rel="noreferrer" onClick={()=>setOpen(false)}>STT Governance ↗</a></div></div>}<main id="main-content" tabIndex={-1}>{children}</main><footer className="g4-footer"><div className="g4-wrap g4-footergrid"><div><b>中華企業策略永續發展學會｜GCSDA</b><p>依法成立之全國性專業社團，以公司治理法遵、企業策略、風險控管、跨界交流與永續發展為核心，逐步累積正式組織與治理知識。</p></div><div><a href={LINE_URL} target="_blank" rel="noreferrer">會員與聯絡</a><a href={STT_URL} target="_blank" rel="noreferrer">STT Governance ↗</a><Link to="/privacy">隱私</Link></div></div></footer></div>
}

function PageHead({eyebrow,title,lead}:{eyebrow:string;title:string;lead:string}){return <GovernedHero kicker={eyebrow} title={title} lead={lead}/>;}

function Home(){return <><GovernedHero kicker="GCSDA · NATIONAL PROFESSIONAL ASSOCIATION · TAIWAN" title="讓策略、治理與永續，成為共同語言。" lead="中華企業策略永續發展學會連結企業、專業與學術，透過正式組織、章程、會員共同體與跨域交流，逐步累積可被延續的治理知識與實務連結。"><Link className="cis-primary" to="/membership">申請入會</Link><Link to="/about">認識學會</Link></GovernedHero><section className="g4-values"><div className="g4-wrap g4-valuegrid">{[["01","策略為先","先理解方向與真正問題，再談資源配置。"],["02","治理為本","讓權力、責任與程序有正式制度位置。"],["03","跨域協作","不同專業保有責任邊界，再形成共同語言。"],["04","永續累積","讓活動與交流逐步沉澱為可被傳承的知識資產。"]].map(([n,t,d])=><div className="g4-value" key={n}><span>{n}</span><h2>{t}</h2><p>{d}</p></div>)}</div></section><section className="g4-section"><div className="g4-wrap"><div className="g4-kicker">INSTITUTIONAL FOUNDATION</div><h2 className="g4-title">一個談治理的組織，本身必須先被治理。</h2><p className="g4-lead">學會以會員大會、理事會、監事會與章程形成正式組織基礎；網站呈現的治理身分、職權與會員制度，均應回到正式章程與會務文件。</p><div className="g4-grid">{[["01","正式立案","主管機關為內政部，組織區域為全國。"],["02","會員共同體","會員資格、權利義務與會費依正式章程及決議。"],["03","專業協作","連結法律、會計、策略、產業與學術，但不混淆各自責任。"]].map(x=><div className="g4-card" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div><div className="g4-actions"><Link to="/governance">理解組織治理 →</Link></div></div></section><section className="g4-section soft"><div className="g4-wrap"><div className="g4-kicker">MEMBERSHIP & COMMUNITY</div><h2 className="g4-title">加入的不是一項服務，而是一個治理共同體。</h2><p className="g4-lead">會員制度的核心是長期參與、共同學習、正式會務與跨域交流，而不是把學會變成商業顧問銷售入口。</p><div className="g4-actions"><Link className="primary" to="/membership">了解會員與入會</Link><Link to="/events">活動與大會</Link></div></div></section><section className="g4-final"><div className="g4-kicker">GCSDA</div><h2>把一次性的交流，轉化為可以逐年累積的制度與知識。</h2><p>學會不以尚未發生的成果裝飾網站；網站僅收錄資料已完成並可核對之正式活動、研究、出版與公告紀錄。</p></section></>}

function About(){return <div className="g4-page"><PageHead eyebrow="INSTITUTIONAL IDENTITY" title="讓企業、專業與學術在治理議題上，形成可以持續對話的正式共同體。" lead="GCSDA 以公司治理法遵、企業策略、風險控管、跨界交流與永續發展為核心，透過正式社團制度，把一次性交流轉化為可以逐年累積的組織與知識。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-list">{charterHighlights.slice(0,3).map(([a,b])=><div className="g4-row" key={a}><b>{a}</b><div>{b}</div></div>)}<div className="g4-row"><b>法定立案</b><div>內政部 114/8 台內團字第 1140030747 號。</div></div></div><div className="g4-note"><h2>GCSDA 與 STT Governance 是不同機構主體。</h2><p>兩者可以在治理知識、活動或內容上形成合作與互相連結，但學會的會員大會、理事會、監事會、章程與法定責任不由 STT 取代；STT 亦不因連結學會而成為學會之法定機關。</p></div></div></section></div>}

function Governance(){return <div className="g4-page"><PageHead eyebrow="INSTITUTIONAL GOVERNANCE" title="學會本身先接受治理：權力來源、任期、職權與責任都應可被理解。" lead="網站公開學會正式治理架構與第一屆理監事名錄；具體人數、職權、任期與程序以章程及正式會務文件為準。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-grid">{[["01","會員大會","作為學會正式治理體系的一部分，其法定職權依章程與人民團體相關規範。"],["02","理事會","理事 9 人、常務理事 3 人；理事長、副理事長與候補理事之配置依正式章程。"],["03","監事會","監事 3 人、常務監事 1 人、候補監事 1 人；負責監察相關職權。"]].map(x=><div className="g4-card" key={x[0]}><span>{x[0]}</span><h2>{x[1]}</h2><p>{x[2]}</p></div>)}</div><div className="g4-kicker" style={{marginTop:58}}>FIRST BOARD & SUPERVISORS</div><h2 className="g4-title">第一屆理監事會</h2><div className="g4-directory">{directory.map(([role,name,title])=><div className="g4-person" key={`${role}-${name}`}><small>{role}</small><h3>{name}</h3>{title&&<p>{title}</p>}</div>)}</div><div className="g4-note"><h3>職務資訊</h3><p>名錄以學會職務為主；外部機構職銜僅在有正式公開依據時呈現，並以本人或所屬機構最新公開資訊為準。</p></div></div></section></div>}

function Council(){return <div className="g4-page"><PageHead eyebrow="STRATEGIC GOVERNANCE COUNCIL" title="跨域專業，不等於權責混同。" lead="策略治理聯席會以議題為中心，連結法律、會計、策略、產業與學術專業，在各自責任邊界內形成交流、研究與治理實務的共同語言。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-grid">{[["01","議題導向","從企業治理、策略、法遵、永續與其他正式議題出發，不以固定專家名單製造全能顧問印象。"],["02","專業邊界","不同專業者只在其資格、經驗與責任範圍內提供意見；必要時由具正式資格者承接專業工作。"],["03","紀錄與成果","正式講座、交流紀錄或研究成果完成後再公開，不以尚未發生的合作或研究裝飾網站。"]].map(x=><div className="g4-card" key={x[0]}><span>{x[0]}</span><h2>{x[1]}</h2><p>{x[2]}</p></div>)}</div><div className="g4-note"><h2>制度界線</h2><p>策略治理聯席會屬學會之專業協作／交流機制；除非正式章程或會員大會／理事會決議另有明文，不取代會員大會、理事會或監事會之法定職權。</p></div></div></section></div>}

function Membership(){
  const [form,setForm]=useState({name:"",contact:"",organization:"",title:"",member_type:"個人會員",participation:"","bot-field":""});
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [message,setMessage]=useState("");
  const update=(key:string,value:string)=>setForm(current=>({...current,[key]:value}));
  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setStatus("sending");setMessage("");
    try{
      const response=await fetch("/api/gcsda-membership-submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const result=await response.json().catch(()=>({}));
      if(!response.ok||!result.ok)throw new Error("submit_failed");
      setStatus("sent");setMessage("入會申請已送出；學會將依章程及會務程序進行後續審查與聯絡。");
    }catch{
      setStatus("error");setMessage("目前未完成送出，你填寫的內容仍保留在本頁；也可使用下方 LINE 會務聯絡入口。");
    }
  };
  return <div className="g4-page"><PageHead eyebrow="MEMBERSHIP" title="加入學會，是進入一個以策略、治理、法遵與永續為共同語言的專業共同體。" lead="會員資格、費用、權利義務與入會程序依正式章程及最新會務決議辦理；提出申請不代表會員資格立即成立。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-grid">{[["個人會員","年滿二十五歲、贊同宗旨，依章程完成申請與審查。","入會費 NT$2,000｜常年會費 NT$2,000"],["榮譽會員","由學會依章程與正式程序邀請之公私立機構、團體或個人。","資格與權利義務以章程為準"],["贊助會員","贊同宗旨且對學會無償捐贈之個人、機構或團體。","資格與權利義務以章程為準"]].map((x,i)=><div className="g4-card" key={x[0]}><span>0{i+1}</span><h2>{x[0]}</h2><p>{x[1]}</p><p style={{color:"#835c2e"}}>{x[2]}</p></div>)}</div><div className="g4-kicker" style={{marginTop:56}}>MEMBERSHIP APPLICATION</div><h2 className="g4-title">申請入會</h2><p className="g4-lead">請先提供基本聯絡與參與資料，學會依章程及會務程序進行資格審查；正式會員資格以完成審查及相關程序為準。</p><form className="g4-membership-form" onSubmit={submit} aria-busy={status==="sending"}><label><span>01｜姓名或稱謂</span><input required maxLength={120} value={form.name} onChange={e=>update("name",e.target.value)} autoComplete="name"/></label><label><span>02｜Email 或可回覆之聯絡方式</span><input required maxLength={300} value={form.contact} onChange={e=>update("contact",e.target.value)} autoComplete="email"/></label><label><span>03｜公司／機構</span><input maxLength={200} value={form.organization} onChange={e=>update("organization",e.target.value)}/></label><label><span>04｜職務／專業角色</span><input maxLength={160} value={form.title} onChange={e=>update("title",e.target.value)}/></label><label><span>05｜申請會員類別</span><select required value={form.member_type} onChange={e=>update("member_type",e.target.value)}><option>個人會員</option><option>榮譽會員</option><option>贊助會員</option></select></label><label><span>06｜參與學會的主要期待</span><textarea required rows={5} maxLength={2000} value={form.participation} onChange={e=>update("participation",e.target.value)}/></label><input className="g4-honeypot" tabIndex={-1} aria-hidden="true" autoComplete="off" value={form["bot-field"]} onChange={e=>update("bot-field",e.target.value)}/><div className="g4-actions"><button className="primary" type="submit" disabled={status==="sending"}>{status==="sending"?"正在送出…":"送出入會申請"}</button><a href={LINE_URL} target="_blank" rel="noreferrer">LINE 會務聯絡 ↗</a></div>{message&&<p className={status==="error"?"g4-form-error":"g4-form-status"} role="status">{message}</p>}</form><div className="g4-kicker" style={{marginTop:60}}>APPLICATION FLOW</div><h2 className="g4-title">入會流程</h2><div className="g4-steps">{[["01","提出申請與必要資料"],["02","依章程與會務程序進行資格審查"],["03","完成應繳費用與必要程序"],["04","會員資格成立後進入正式會務與活動通知"]].map(([n,t])=><div className="g4-step" key={n}><b>{n}</b><p>{t}</p></div>)}</div></div></section></div>
}
function Events(){return <div className="g4-page"><PageHead eyebrow="ASSEMBLY & PROGRAMS" title="活動不是一次性聚會，而是學會制度運作與知識累積的正式紀錄。" lead="會員大會、理監事會、專題講座與正式交流，依可核對之會務資料建立活動檔案；沒有正式資料的活動不預先虛構。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-kicker">ASSEMBLY ARCHIVE</div><h2 className="g4-title">正式活動紀錄</h2><div className="g4-event" id="assembly-20260816"><time dateTime="2026-08-16">2026.08.16</time><div><h3>第一屆第二次會員大會暨第三次理監事聯席會議</h3><p>地點｜沐青餐廳；正式簡報記載本次大會由副理事長范英峰主持。</p><p className="gcsda-source-note">資料來源：2026 年 8 月 16 日會員大會正式簡報；該簡報不代替正式議事紀錄。</p></div><span className="g4-badge">FORMAL ASSEMBLY</span></div><div className="g4-note"><h3>活動檔案原則</h3><p>正式活動紀錄保留日期、活動名稱、性質與可公開之正式資料；不以未核對的成果數字、合作名單或媒體曝光作為裝飾。</p></div></div></section></div>}

function Knowledge(){return <div className="g4-page"><PageHead eyebrow="KNOWLEDGE & RESEARCH" title="讓活動與交流沉澱為可以再次學習、引用與傳承的治理知識。" lead="本頁作為學會知識資產入口，依可公開資料整理企業策略、公司治理、法遵、風險控管與永續相關之研究、講座與治理內容。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-grid">{[["01","企業策略","聚焦企業方向、資源配置、決策結構與策略實務。"],["02","治理與法遵","聚焦公司治理、權責、風險控管、法遵精神與制度運作。"],["03","永續與跨域","聚焦企業永續、跨專業交流及可被組織承接的長期治理知識。"]].map(x=><div className="g4-card" key={x[0]}><span>{x[0]}</span><h2>{x[1]}</h2><p>{x[2]}</p></div>)}</div><div className="g4-note"><h2>正式知識典藏</h2><p>《2026 永續家族治理實務實錄》為目前可直接核對之公開治理出版資料，由 STT Intelligence／STT Press 與 GCSDA 脈絡共同呈現。</p><div className="g4-actions"><a href="https://heyzine.com/flip-book/e424001f8c.html" target="_blank" rel="noreferrer">線上翻閱《2026 永續家族治理實務實錄》 ↗</a></div></div><div className="g4-note"><h2>知識紀錄原則</h2><p>研究、出版與可公開文件均以已完成且可核對之資料為準，不以虛構篇數、合作機構、研究計畫或影響力數字替代實際成果。</p></div></div></section></div>}

function Charter(){return <div className="g4-page"><PageHead eyebrow="CHARTER & NOTICE" title="章程不是網站附件，而是學會權力來源、會員權利義務與制度運作的正式依據。" lead="本頁呈現可由現有會務資料確認的章程摘要與法定立案資訊；章程全文、公告與會務文件僅收錄已正式核定且可公開之版本。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-list">{charterHighlights.map(([a,b])=><div className="g4-row" key={a}><b>{a}</b><div>{b}</div></div>)}</div><div className="g4-note"><h2>組織法定立案</h2><p>內政部 114/8 台內團字第 1140030747 號。</p></div><div className="g4-note"><h2>公告與正式文件</h2><p>此區只收錄已正式核定、可公開之章程、公告、會員大會或理監事會相關文件；網站說明文字不取代正式法定文件。</p></div></div></section></div>}

function Privacy(){return <div className="g4-page"><PageHead eyebrow="PRIVACY" title="隱私與資料使用" lead="本頁說明學會網站的聯絡入口與資料提供方式。入會、會務與活動事項由 GCSDA 自身的會務程序處理，不因網站互相連結而成為 STT 的治理委任。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-list"><div className="g4-row"><b>入會與會務聯絡</b><div>會員頁提供基本入會申請表，送出內容用於後續資格審查與會務聯絡；網站另保留 LINE 外部服務作為補充聯絡入口，本表不提供檔案上傳。<div className="g4-actions"><a href={LINE_URL} target="_blank" rel="noreferrer">入會與會務聯絡 ↗</a></div></div></div><div className="g4-row"><b>資料提供範圍</b><div>初次聯絡請先說明會務事項與必要聯絡資訊，避免主動傳送身分證件、金融帳戶、醫療資料或其他不必要的敏感內容。正式入會所需資料與程序，請依學會提供的正式說明辦理。</div></div><div className="g4-row"><b>外部服務與機構界線</b><div>進入 LINE 或其他外部網站後，相關服務由各自平台提供。GCSDA 與 STT Governance 是不同機構主體；學會入會不等於 STT 治理委任。</div></div></div></div></section></div>}


function NotFound(){return <div className="g4-page"><PageHead eyebrow="404" title="找不到這個頁面。" lead="這個網址不在中華企業策略永續發展學會目前公開的正式網站路由中。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-actions"><Link className="primary" to="/">回到學會首頁</Link></div></div></section></div>}

function AppRoutes(){return <Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/governance" element={<Governance/>}/><Route path="/council" element={<Council/>}/><Route path="/membership" element={<Membership/>}/><Route path="/events" element={<Events/>}/><Route path="/knowledge" element={<Knowledge/>}/><Route path="/charter" element={<Charter/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Routes>}
export default function GCSDAStandaloneV3(){return <BrowserRouter><Shell><AppRoutes/></Shell></BrowserRouter>}

/* 2026-09-24 owner correction: keep the approved image as one continuous canvas. */
