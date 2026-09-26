import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { GCSDA_META, verifiedGcsdaOrigin } from "./src/gcsdaMetadata";
const esc=(v:string)=>v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),""),origin=verifiedGcsdaOrigin(env.VITE_GCSDA_SITE_ORIGIN);
 return {base:"/",plugins:[react(),tailwindcss(),{name:"gcsda-route-metadata",apply:"build",closeBundle(){
  const root=path.resolve("dist"),base=fs.readFileSync(path.join(root,"index.html"),"utf8");
  for(const [route,meta] of Object.entries(GCSDA_META)){
   let html=base.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(meta.title)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${esc(meta.description)}" />`);
   const tags=[`<meta name="robots" content="${origin?"index,follow":"noindex,follow"}" />`,`<meta property="og:title" content="${esc(meta.title)}" />`,`<meta property="og:description" content="${esc(meta.description)}" />`,`<meta property="og:site_name" content="中華企業策略永續發展學會｜GCSDA" />`,`<meta property="og:locale" content="zh_TW" />`,`<meta property="og:type" content="website" />`];
   if(origin)tags.push(`<link rel="canonical" href="${origin+route}" />`,`<meta property="og:url" content="${origin+route}" />`,`<meta property="og:image" content="${origin}/images/gcsda-logo.png" />`);
   html=html.replace("</head>",tags.join("\n")+"\n</head>");fs.writeFileSync(path.join(root,route==="/"?"index.html":"gcsda-"+route.slice(1)+".html"),html);
  }
  fs.writeFileSync(path.join(root,"sitemap.xml"),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+(origin?Object.keys(GCSDA_META).map(route=>`<url><loc>${origin+route}</loc></url>`).join(""):"")+"</urlset>");
  fs.writeFileSync(path.join(root,"robots.txt"),origin?`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`:"User-agent: *\nDisallow: /\n");
 }}],resolve:{alias:{"@":path.resolve(__dirname,"src")}},server:{hmr:process.env.DISABLE_HMR!=="true"}};
});
