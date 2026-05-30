import express from "express";
import path from "path";
import fs from "fs";
import AdmZip from "adm-zip";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/health", (_, res) => res.status(200).json({ status: "ok" }));

  app.get("/api/download-source-zip", (req, res) => {
    try {
      const zip = new AdmZip();
      const workspaceDir = process.cwd();
      
      const files = fs.readdirSync(workspaceDir);
      for (const file of files) {
        // Skip node_modules, .git, and build artifacts to keep the download small and clean
        if (file === "node_modules" || file === ".git" || file === "dist" || file === "package-lock.json") {
          continue;
        }
        const fullPath = path.join(workspaceDir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          zip.addLocalFolder(fullPath, file);
        } else if (stat.isFile()) {
          zip.addLocalFile(fullPath);
        }
      }
      
      const buffer = zip.toBuffer();
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="stt-governance-source.zip"');
      res.send(buffer);
    } catch (err: any) {
      console.error("ZIP bundle error:", err);
      res.status(500).send("Failed to bundle source: " + err.message);
    }
  });

  const distPath = path.resolve(process.cwd(), "dist");

  if (process.env.NODE_ENV !== "production") {
    try {
      const viteModule = "vite";
      const { createServer } = await import(viteModule);
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      app.use(express.static(distPath));
    }
  } else {
    // Production serving logic: serve all static files automatically
    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({ error: "Not Found" });
      }

      // If requested path does not have an extension, check if matching .html file exists
      const ext = path.extname(req.path);
      if (!ext) {
        const checkPath = req.path === "/" ? "/index" : req.path;
        const htmlFile = `${checkPath.replace(/\/$/, "")}.html`;
        const fullHtmlPath = path.join(distPath, htmlFile);
        if (fs.existsSync(fullHtmlPath) && fs.statSync(fullHtmlPath).isFile()) {
          return res.sendFile(fullHtmlPath);
        }
      }

      // Default fallback to index.html for SPA routing
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
      }
      res.status(404).send("Initializing...");
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`STT Press Server Live: ${PORT}`);
  });
}

startServer().catch(() => process.exit(1));
