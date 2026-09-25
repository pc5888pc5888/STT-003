"""Continue existing work branches. No image mutation or production write."""
from pathlib import Path
import json,re,sys
site=sys.argv[1]
changes={}
def read(p):return Path(p).read_text()
def once(t,a,b):
 if t.count(a)!=1:raise RuntimeError('Nonunique source match: '+a[:100])
 return t.replace(a,b,1)
def write(p,t):changes[p]=t
if site=='stt':
 detail=read('src/pages/ProblemDetail.tsx')
 visual=read('src/sttVisuals.ts')
 visuals=dict(re.findall(r'^  (\w+): "([^"]+)",',visual,re.M))
 mapping={}
 block=visual.split('export const PROBLEM_VISUALS:')[1].split('};')[0]
 for key,key2,val in re.findall(r'^  (?:"([^"]+)"|(\w+)): "([^"]+)",',block,re.M):mapping[key or key2]=val
 retained={}
 source=detail.split('const data: Record<string, ProblemConfig> = {',1)[1].split('\n};',1)[0]
 for quoted,bare,title,lead in re.findall(r'^  (?:"([^"]+)"|(\w+)): \{\n    title: "([^"]+)",[\s\S]*?\n    lead: "([^"]+)",',source,re.M):
  ident=quoted or bare
  retained['/problems/'+ident]={'title':title+'｜STT Governance','description':lead,'label':title,'image':visuals[mapping[ident]]}
 assert len(retained)==8
 library=read('src/pages/CanonicalLibrary.tsx')
 for name,route in [('ResearchCanonical','/research'),('BooksCanonical','/books'),('InternalComplianceCanonical','/books/internal-compliance')]:
  part=library.split('export function '+name+'()',1)[1].split('export function ',1)[0]
  m=re.search(r'<STTPageHero visual="([^"]+)" eyebrow="[^"]+" title="([^"]+)" lead="([^"]+)"',part)
  assert m,name
  image,title,lead=m.groups();retained[route]={'title':title+'｜STT Governance','description':lead,'label':title,'image':visuals[image]}
 write('src/data/retainedRouteMetadata.ts','// Existing page copy and approved image paths; no new research or publication claims.\nexport const RETAINED_META = '+json.dumps(retained,ensure_ascii=False,indent=2)+';\n')
 t=read('src/seo.ts');t='import { RETAINED_META } from "./data/retainedRouteMetadata";\n'+t
 t=once(t,'export const FORMAL_META: Record<string, MetaRecord> = {','export const FORMAL_META: Record<string, MetaRecord> = {\n  ...RETAINED_META,')
 t=once(t,'    upsertCanonical(canonical);\n  }\n\n  removeSchemas();','''    document.head.querySelectorAll('link[rel="canonical"],meta[property^="og:"],meta[name^="twitter:"]').forEach(node=>node.remove());
  }

  removeSchemas();''')
 write('src/seo.ts',t)
 t=read('vite.config.ts')
 start=t.index('const FORMAL_HTML_FILES:');end=t.index('\n\nfunction escapeHtml',start)
 t=t[:start]+'''const FORMAL_HTML_FILES: Record<string, string> = Object.fromEntries(
  Object.keys(FORMAL_META).map(route => [route, route === "/" ? "index.html" : "seo-" + route.slice(1).replaceAll("/", "-") + ".html"]),
);'''+t[end:]
 t=once(t,'      });\n    },\n  };','''      });
      const urls = Object.entries(FORMAL_META).filter(([,meta])=>!meta.robots?.includes("noindex"))
        .map(([route])=>`  <url><loc>${STT_CANONICAL_ORIGIN}${route}</loc></url>`).join("\\n");
      fs.writeFileSync(path.join(outDir,"sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n${urls}\\n</urlset>\\n`);
    },
  };''')
 write('vite.config.ts',t)
 library=once(library,'import { useNavigate } from "react-router-dom";','import { Link } from "react-router-dom";')
 library=once(library,'  const navigate=useNavigate();\n','')
 library=once(library,"  const navigate=useNavigate(); const book=",'  const book=')
 library=once(library,"<button onClick={()=>navigate('/books/internal-compliance')}>正典頁</button>",'<Link to="/books/internal-compliance">正典頁</Link>')
 library=once(library,"<button onClick={()=>navigate('/domains/compliance-contract')}>企業法遵與契約治理 →</button>",'<Link to="/domains/compliance-contract">企業法遵與契約治理 →</Link>')
 library=once(library,"<button className=\"lib-back\" onClick={()=>navigate('/books')}>← 回到著作正典</button>",'<Link className="lib-back" to="/books">← 回到著作正典</Link>')
 write('src/pages/CanonicalLibrary.tsx',library)
 app=read('src/App.tsx');start=app.index('function NotFound() {');end=app.index('\nfunction PublicShell',start)
 nf=app[start:end].replace('function NotFound() {','export default function NotFound() {\n  useEffect(()=>{document.title="找不到頁面｜STT Governance";},[]);',1)
 write('src/components/NotFound.tsx','import { useEffect } from "react";\nimport { Link } from "react-router-dom";\n\n'+nf+'\n')
 app=app[:start]+app[end:];app=once(app,'import Home from "./pages/HomeCanonical";','import Home from "./pages/HomeCanonical";\nimport NotFound from "./components/NotFound";')
 app=once(app,'    window.scrollTo({ top: 0, behavior: "auto" });\n  }, [location.pathname]);','''    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        let id = location.hash.slice(1);
        try { id = decodeURIComponent(id); } catch { /* Keep the literal fragment. */ }
        const target = document.getElementById(id);
        if (target) { target.scrollIntoView({ block: "start", behavior: "instant" }); return; }
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);''')
 write('src/App.tsx',app)
 detail=once(detail,'Link, Navigate, useParams','Link, useParams');detail=once(detail,'import { PROBLEM_VISUALS } from "../sttVisuals";','import { PROBLEM_VISUALS } from "../sttVisuals";\nimport NotFound from "../components/NotFound";')
 detail=once(detail,'if(!cfg) return <Navigate to="/problems" replace />;','if(!cfg) return <NotFound />;')
 write('src/pages/ProblemDetail.tsx',detail)
 p=read('src/pages/Problems.tsx')
 old='''  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    }
  }, [location.hash]);'''
 if old in p:p=once(p,old,'')
 write('src/pages/Problems.tsx',p)
 cfg=json.loads(read('vercel.json'))
 cfg['rewrites']=[r for r in cfg['rewrites'] if r['source'] not in ['/problems/:path*','/research','/books/:path*']]
 cfg['rewrites']=[{'source':r,'destination':'/seo-'+r[1:].replace('/','-')+'.html'} for r in retained]+cfg['rewrites']
 aliases={'/publications':'/insights','/insights.html':'/insights','/insights/index':'/insights','/papers':'/research','/stt':'/about','/about.html':'/about','/institution/eric-chuang':'/eric-chuang','/cooperation':'/engagement','/contact.html':'/start','/internal-compliance':'/books/internal-compliance','/internal-compliance/pillars':'/books/internal-compliance','/internal-compliance/academic':'/books/internal-compliance','/internal-compliance/publication':'/books/internal-compliance','/governance.html':'/problems','/legal/privacy':'/privacy'}
 cfg['redirects']=[r for r in cfg.get('redirects',[]) if r['source'] not in aliases]+[{'source':a,'destination':b,'permanent':True} for a,b in aliases.items()]
 cfg['rewrites']=[r for r in cfg['rewrites'] if r['source'] not in aliases]
 write('vercel.json',json.dumps(cfg,ensure_ascii=False,indent=2)+'\n')
 p=read('public/404.html').replace('background:#b8925d;color:white','background:#805b32;color:white')
 write('public/404.html',p)
 write('docs/qa/TRUST_PATH_CHANGE_RECORD.md','''# 本次施工紀錄｜2026-09-23

依《網站收斂、施工與驗收計畫》第六至八節執行。沿用既有施工分支，未變更正式站。

研究、著作與八個問題深頁的 metadata，逐字取自既有標題與 lead；原圖路徑不變。這是修正頁面辨識，不是重寫研究或擴張對外承諾。

問題頁、方法頁 fragment 導覽統一；不存在的問題頁保留原網址顯示找不到頁面，不導向另一個事件。既有別名改成正式 HTTP redirect，語意與原 React 導向一致。

受理八欄、無上傳、AI 幕僚定位、莊博士責任角色、GCSDA 分立、M 傳媒第三方標示、定稿文案均未改動。

仍須驗收：首頁權威肖像原始 JPEG 無法解碼；治理委任與機構合作核准圖對位；STT Press 正式目標的版本衝突；真實寄送與資料處理設定；GCSDA 章程等正式來源與正式網域。不得據此次局部測試宣告全站通過。
''')
elif site=='gcsda':
 t=read('src/GCSDAStandaloneV3.tsx')
 t=once(t,'<div className="g4-event"><time>2026.08.16</time>','<div className="g4-event" id="assembly-20260816"><time dateTime="2026-08-16">2026.08.16</time>')
 t=once(t,'；活動結合理監事聯席會議、會員交流、專題講座與餐敘。</p>','。</p><p className="gcsda-source-note">資料來源：2026 年 8 月 16 日會員大會正式簡報。簡報不代替正式議事紀錄。</p>')
 a=t.index('function Privacy()');b=t.index('\n',a)
 replacement='''function Privacy(){return <div className="g4-page"><PageHead eyebrow="PRIVACY" title="隱私與資料使用" lead="本頁說明學會網站的聯絡入口與資料提供方式。入會、會務與活動事項由 GCSDA 自身的會務程序處理，不因網站互相連結而成為 STT 的治理委任。"/><section className="g4-section"><div className="g4-wrap"><div className="g4-list"><div className="g4-row"><b>入會與會務聯絡</b><div>網站的「入會與會務聯絡」入口會開啟 LINE 外部服務。本頁沒有入會申請表或檔案上傳欄位。<div className="g4-actions"><a href={LINE_URL} target="_blank" rel="noreferrer">入會與會務聯絡 ↗</a></div></div></div><div className="g4-row"><b>資料提供範圍</b><div>初次聯絡請先說明會務事項與必要聯絡資訊，避免主動傳送身分證件、金融帳戶、醫療資料或其他不必要的敏感內容。正式入會所需資料與程序，請依學會提供的正式說明辦理。</div></div><div className="g4-row"><b>外部服務與機構界線</b><div>進入 LINE 或其他外部網站後，相關服務由各自平台提供。GCSDA 與 STT Governance 是不同機構主體；學會入會不等於 STT 治理委任。</div></div></div></div></section></div>}'''
 t=t[:a]+replacement+t[b:]
 write('src/GCSDAStandaloneV3.tsx',t)
 t=read('src/gcsdaMetadata.ts')
 t=once(t,'export function applyGcsdaMetadata(path:string){','export function applyGcsdaMetadata(path:string){\n path=path!=="/"?path.replace(/\\/$/,""):"/";')
 write('src/gcsdaMetadata.ts',t)
 write('docs/qa/TRUST_PATH_CHANGE_RECORD.md','''# 本次施工紀錄｜2026-09-23

沿用 GCSDA 原施工分支；不合併 STT，不更動主視覺與主要資訊架構。

本輪變更僅限 /privacy 的實際聯絡方式與資料最小化說明、/events 的既有大會來源標示及日期語意、metadata 的尾斜線識別。不新增會員、理監事、章程、研究或成果數字。

## 來源核對
- 大會名稱、日期、地點、主持人：GCSDA_816_大會正式簡報_10頁_高級套裝版_v2_文字排版精修.pptx。
- 已有理監事姓名角色可與 Family_Governance_COMPLETE_FINAL_20260829.epub 致謝交叉核對。
- 部分聯席會職銜可與站主提供的 image-gen-2(40).png 文字對帳；不當成所有外部職銜均已核准。
- 正式章程全文、立案函、所有外部職銜、議事紀錄及資料保存流程仍未取得足以逐項驗收的正式來源。原站既有相關內容不是本次新核准的發布資料；保持 preview / noindex，不合併正式站。

/charter 與 /membership 中未核對條文必須在正式發布前取得來源或撤下，不能因其曾存在程式中而自動通過。本次不把自動可及性檢查代替來源驗收。
''')
else:raise RuntimeError('Unknown site')
for p,t in changes.items():
 Path(p).parent.mkdir(parents=True,exist_ok=True);Path(p).write_text(t)
print(json.dumps({'site':site,'changed':list(changes),'noImageChanges':True,'productionModified':False},ensure_ascii=False,indent=2))
