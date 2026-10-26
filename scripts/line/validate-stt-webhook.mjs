import fs from "node:fs";
const file="api/line/stt-webhook.ts";
const src=fs.readFileSync(file,"utf8");
const required=[
  "DETERMINISTIC_ROUTING_ONLY",
  "LINE_STT_CHANNEL_SECRET",
  "LINE_STT_CHANNEL_ACCESS_TOKEN",
  "x-line-signature",
  "開始治理判讀",
  "你正在面對什麼",
  "STT 如何判讀",
  "治理委任",
  "莊鈞翔博士",
  "研究與出版",
  "關於 STT",
  "機構合作",
  "隱私與資料使用",
  "專業服務邊界",
  "為降低不必要的資料暴露"
];
const failures=required.filter(token=>!src.includes(token));
if(!src.includes('["image","file","audio","video"]')) failures.push("attachment guard event types");
if(src.includes("generative")||src.includes("openai")||src.includes("gemini")) failures.push("generative layer prohibited");
if(failures.length){console.error("STT_LINE_WEBHOOK_POLICY_FAILED\n- "+failures.join("\n- "));process.exit(1)}
console.log(JSON.stringify({sttLineWebhookPolicy:"PASS",mode:"DETERMINISTIC_ROUTING_ONLY"}));
