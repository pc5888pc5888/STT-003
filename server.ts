import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/health", (_, res) => res.status(200).json({ status: "ok" }));

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
