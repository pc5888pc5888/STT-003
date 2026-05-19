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
    // Production serving logic: prioritize static files
    app.use(express.static(distPath, { index: false }));

    app.get("*", (req, res) => {
      if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Not Found" });

      // Support multi-page .html entries and SPA fallback
      const reqPath = req.path === '/' ? '/index.html' : req.path;
      const htmlFile = reqPath.endsWith('.html') ? reqPath : `${reqPath}.html`;
      const fullPath = path.join(distPath, htmlFile);

      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        return res.sendFile(fullPath);
      }

      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Initializing...");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`STT Press Server Live: ${PORT}`);
  });
}

startServer().catch(() => process.exit(1));
