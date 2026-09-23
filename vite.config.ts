import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import { FORMAL_META, STT_CANONICAL_ORIGIN } from "./src/seo";

const FORMAL_HTML_FILES: Record<string, string> = {
  "/": "index.html",
  "/problems": "problems.html",
  "/how-stt-works": "how-stt-works.html",
  "/engagement": "engagement.html",
  "/insights": "insights.html",
  "/about": "about.html",
  "/eric-chuang": "eric-chuang.html",
  "/institutions": "institutions.html",
  "/start": "start.html",
  "/privacy": "privacy.html",
  "/professional-boundary": "professional-boundary.html",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function schemaTags(route: string, label: string, image?: string) {
  const canonical = `${STT_CANONICAL_ORIGIN}${route === "/" ? "/" : route}`;
  const schemas: unknown[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "STT Governance",
      url: `${STT_CANONICAL_ORIGIN}/`,
      logo: `${STT_CANONICAL_ORIGIN}/images/STT-Governance-Official-Logo.png`,
    },
  ];

  if (route !== "/") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "STT Governance", item: `${STT_CANONICAL_ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: label, item: canonical },
      ],
    });
  }

  if (route === "/eric-chuang") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "莊鈞翔博士 Eric Chuang, Ph.D.",
      url: canonical,
      image: `${STT_CANONICAL_ORIGIN}${image ?? "/images/eric-governance-principal-approved.jpg"}`,
      jobTitle: "STT Governance 創辦人｜治理總控者｜制度設計與重大決策判讀",
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
        const staticHead = [
          `    <meta name="robots" content="${escapeHtml(meta.robots ?? "index,follow")}" />`,
          `    <link rel="canonical" href="${canonical}" />`,
          '    <meta property="og:site_name" content="STT Governance" />',
          '    <meta property="og:locale" content="zh_TW" />',
          `    <meta property="og:type" content="${route === "/eric-chuang" ? "profile" : "website"}" />`,
          `    <meta property="og:title" content="${escapeHtml(meta.title)}" />`,
          `    <meta property="og:description" content="${escapeHtml(meta.description)}" />`,
          `    <meta property="og:url" content="${canonical}" />`,
          `    <meta property="og:image" content="${image}" />`,
          '    <meta name="twitter:card" content="summary_large_image" />',
          `    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
          `    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
          schemaTags(route, meta.label, meta.image),
        ].join("\n");

        let html = baseHtml
          .replace(/<html lang="[^"]*">/, '<html lang="zh-Hant-TW">')
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
          .replace(
            /<meta\s+name="description"[\s\S]*?\/>/,
            `<meta name="description" content="${escapeHtml(meta.description)}" />`,
          );

        html = html.replace("</head>", `${staticHead}\n  </head>`);
        fs.writeFileSync(path.join(outDir, fileName), html, "utf8");
      });
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
