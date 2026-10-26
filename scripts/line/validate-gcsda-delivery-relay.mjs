import fs from "node:fs";
const src=fs.readFileSync("api/internal/gcsda-membership-delivery.ts","utf8");
const required=[
  "OIDC_GCSDA_MEMBERSHIP_RELAY",
  "owner:pc5888pc5888s-projects:project:stt-003:environment:preview",
  "RESEND_API_KEY",
  "[GCSDA 會員資格申請]",
  "【GCSDA｜會員資格申請】",
  "crypto.verify",
  "/.well-known/jwks"
];
const failures=required.filter(x=>!src.includes(x));
if(failures.length){console.error("GCSDA_RELAY_POLICY_FAILED\n- "+failures.join("\n- "));process.exit(1)}
console.log(JSON.stringify({gcsdaDeliveryRelay:"PASS",auth:"VERCEL_OIDC",transport:"resend"}));
