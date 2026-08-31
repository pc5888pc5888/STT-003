import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT || 3000);
  const distPath = path.resolve(process.cwd(), "dist");

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_request, response) => {
    response.status(200).json({ status: "ok", service: "stt-governance" });
  });

  if (process.env.NODE_ENV !== "production") {
    try {
      const viteModule = "vite";
      const { createServer } = await import(viteModule);
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch {
      app.use(express.static(distPath));
    }
  } else {
    app.use(
      express.static(distPath, {
        index: false,
        fallthrough: true,
      })
    );

    app.get("*", (request, response) => {
      if (request.path.startsWith("/api/")) {
        response.status(404).json({ error: "Not Found" });
        return;
      }

      const requestedExtension = path.extname(request.path);
      if (!requestedExtension) {
        const normalizedPath = request.path === "/" ? "/index" : request.path.replace(/\/$/, "");
        const matchingHtml = path.join(distPath, `${normalizedPath}.html`);
        if (fs.existsSync(matchingHtml) && fs.statSync(matchingHtml).isFile()) {
          response.sendFile(matchingHtml);
          return;
        }
      }

      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        response.sendFile(indexPath);
        return;
      }

      response.status(404).send("Application build not found");
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`STT Governance server listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("STT Governance server failed to start", error);
  process.exit(1);
});
