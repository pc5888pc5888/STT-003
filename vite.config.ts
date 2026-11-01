import AUTHOR_PROFILE from "./src/data/authorProfile.json";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import { FORMAL_META, LANGUAGE_PAIRS, STT_CANONICAL_ORIGIN } from "./src/seo";

const FORMAL_HTML_FILES: Record<string, string> = Object.fromEntries(
  Object.keys(FORMAL_META).map(route => [route, route === "/" ? "index.html" : "seo-" + route.slice(1).replaceAll("/", "-") + ".html"]),
);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function schemaTags(route: string, label: string, image?: string, language: "zh-Hant-TW" | "en" | "ja" | "ko" = "zh-Hant-TW") {
  const isEnglish = language === "en";
  const isJapanese = language === "ja";
  const isKorean = language === "ko";
  const localizedHome = isEnglish ? "/en" : isJapanese ? "/ja" : isKorean ? "/ko" : "/";
  const canonical = `${STT_CANONICAL_ORIGIN}${route === "/" ? "/" : route}`;
  const schemas: unknown[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "STT Governance｜策略智庫智慧治理",
      alternateName: "STT Governance",
      url: `${STT_CANONICAL_ORIGIN}/`,
      logo: `${STT_CANONICAL_ORIGIN}/images/STT-Governance-Official-Logo.png`,
    },
  ];

  if (route !== "/" && route !== "/en") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: language === "zh-Hant-TW" ? "STT Governance｜策略智庫智慧治理" : "STT Governance", item: `${STT_CANONICAL_ORIGIN}${localizedHome}` },
        { "@type": "ListItem", position: 2, name: label, item: canonical },
      ],
    });
  }

  if (route === "/eric-chuang") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      name: AUTHOR_PROFILE.chineseName,
      alternateName: AUTHOR_PROFILE.englishName,
      url: canonical,
      image: `${STT_CANONICAL_ORIGIN}${image ?? "/images/eric-governance-principal-approved.jpg"}`,
      jobTitle: AUTHOR_PROFILE.positions[0],
      affiliation: {
        "@type": "Organization",
        name: "STT Governance",
        url: `${STT_CANONICAL_ORIGIN}/`,
      },
    });
  }

  return schemas
    .map((schema) => `    <script type="application/ld+json" data-stt-schema="true">${JSON.stringify(schema)}</script>`)
    .join("\n");
}

function formalSeoPages(): Plugin {
  return {
    name: "stt-formal-seo-pages",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const baseHtml = fs.readFileSync(indexPath, "utf8");

      Object.entries(FORMAL_HTML_FILES).forEach(([route, fileName]) => {
        const meta = FORMAL_META[route];
        if (!meta) return;

        const canonical = `${STT_CANONICAL_ORIGIN}${route === "/" ? "/" : route}`;
        const image = `${STT_CANONICAL_ORIGIN}${meta.image ?? "/images/STT-Governance-Official-Logo.png"}`;
        const language = meta.language ?? "zh-Hant-TW";
        const locale = meta.locale ?? (language === "en" ? "en_US" : language === "ja" ? "ja_JP" : language === "ko" ? "ko_KR" : "zh_TW");
        const languagePair = LANGUAGE_PAIRS[route];
        const alternateTags = languagePair ? [
          `    <link rel="alternate" hreflang="zh-Hant-TW" href="${STT_CANONICAL_ORIGIN}${languagePair.zh}" />`,
          languagePair.en ? `    <link rel="alternate" hreflang="en" href="${STT_CANONICAL_ORIGIN}${languagePair.en}" />` : "",
          languagePair.ja ? `    <link rel="alternate" hreflang="ja" href="${STT_CANONICAL_ORIGIN}${languagePair.ja}" />` : "",
          languagePair.ko ? `    <link rel="alternate" hreflang="ko" href="${STT_CANONICAL_ORIGIN}${languagePair.ko}" />` : "",
          `    <link rel="alternate" hreflang="x-default" href="${STT_CANONICAL_ORIGIN}${languagePair.zh}" />`,
        ].filter(Boolean).join("\n") : "";
        const staticHead = [
          `    <meta name="robots" content="${escapeHtml(meta.robots ?? "index,follow")}" />`,
          `    <link rel="canonical" href="${canonical}" />`,
          '    <meta property="og:site_name" content="STT Governance｜策略智庫智慧治理" />',
          `    <meta property="og:locale" content="${locale}" />`,
          `    <meta property="og:type" content="${route === "/eric-chuang" ? "profile" : "website"}" />`,
          `    <meta property="og:title" content="${escapeHtml(meta.title)}" />`,
          `    <meta property="og:description" content="${escapeHtml(meta.description)}" />`,
          `    <meta property="og:url" content="${canonical}" />`,
          `    <meta property="og:image" content="${image}" />`,
          '    <meta name="twitter:card" content="summary_large_image" />',
          `    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
          `    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
          alternateTags,
          schemaTags(route, meta.label, meta.image, language),
        ].join("\n");

        let html = baseHtml
          .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
          .replace(
            /<meta\s+name="description"[\s\S]*?\/>/,
            `<meta name="description" content="${escapeHtml(meta.description)}" />`,
          );

        html = html.replace("</head>", `${staticHead}\n  </head>`);
        fs.writeFileSync(path.join(outDir, fileName), html, "utf8");
      });
      const urls = Object.entries(FORMAL_META).filter(([,meta])=>!meta.robots?.includes("noindex"))
        .map(([route])=>`  <url><loc>${STT_CANONICAL_ORIGIN}${route}</loc></url>`).join("\n");
      fs.writeFileSync(path.join(outDir,"sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
    },
  };
}

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [react(), tailwindcss(), formalSeoPages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== "true",
  },
});
