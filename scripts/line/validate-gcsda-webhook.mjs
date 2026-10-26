import fs from "node:fs";
const file="api/line/gcsda-webhook.ts";
const src=fs.readFileSync(file,"utf8");
const required=[
  "DETERMINISTIC_ROUTING_ONLY",
  "LINE_GCSDA_CHANNEL_SECRET",
  "LINE_GCSDA_CHANNEL_ACCESS_TOKEN",
  "x-line-signature",
  "會員與入會",
  "活動與大會",
  "章程與公告",
  "創會理事長",
  "組織治理",
  "策略治理聯席會",
  "知識與研究",
  "關於學會",
  "GCSDA 與 STT Governance 為不同機構主體",
  "為降低不必要的資料暴露"
];
const failures=required.filter(token=>!src.includes(token));
if(!src.includes('["image","file","audio","video"]')) failures.push("attachment guard event types");
if(src.includes("generative")||src.includes("openai")||src.includes("gemini")) failures.push("generative layer prohibited");
if(failures.length){console.error("GCSDA_LINE_WEBHOOK_POLICY_FAILED\n- "+failures.join("\n- "));process.exit(1)}
console.log(JSON.stringify({gcsdaLineWebhookPolicy:"PASS",mode:"DETERMINISTIC_ROUTING_ONLY"}));
