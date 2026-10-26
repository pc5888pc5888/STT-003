import crypto from "node:crypto";

const TEAM_SLUG="pc5888pc5888s-projects";
const PROJECT_NAME="stt-003";
const ALLOWED_ISSUERS=new Set([
  "https://oidc.vercel.com",
  `https://oidc.vercel.com/${TEAM_SLUG}`,
]);
const EXPECTED_AUDIENCE=`https://vercel.com/${TEAM_SLUG}`;
const EXPECTED_SUBJECT=`owner:${TEAM_SLUG}:project:${PROJECT_NAME}:environment:preview`;
const DEFAULT_FROM="GCSDA Website <onboarding@resend.dev>";

function json(res:any,status:number,body:Record<string,unknown>){
  res.status(status).setHeader("Content-Type","application/json; charset=utf-8");
  res.setHeader("Cache-Control","no-store");
  res.end(JSON.stringify(body));
}
function b64urlJson(part:string){
  return JSON.parse(Buffer.from(part,"base64url").toString("utf8"));
}
async function verifyVercelOidc(token:string){
  const parts=token.split(".");
  if(parts.length!==3) throw new Error("Malformed token");
  const header=b64urlJson(parts[0]);
  const payload=b64urlJson(parts[1]);
  if(header?.alg!=="RS256"||typeof header?.kid!=="string") throw new Error("Unsupported token");
  if(!ALLOWED_ISSUERS.has(payload?.iss)) throw new Error("Issuer mismatch");
  if(payload?.aud!==EXPECTED_AUDIENCE) throw new Error("Audience mismatch");
  if(payload?.sub!==EXPECTED_SUBJECT) throw new Error("Subject mismatch");
  const now=Math.floor(Date.now()/1000);
  if(typeof payload?.exp!=="number"||payload.exp<=now) throw new Error("Expired token");
  if(typeof payload?.nbf==="number"&&payload.nbf>now+30) throw new Error("Token not active");
  const jwksUrl=payload.iss+"/.well-known/jwks";
  const response=await fetch(jwksUrl,{signal:AbortSignal.timeout(5000)});
  if(!response.ok) throw new Error("JWKS unavailable");
  const jwks=await response.json() as {keys?:any[]};
  const jwk=jwks.keys?.find(key=>key?.kid===header.kid&&key?.kty==="RSA");
  if(!jwk) throw new Error("Signing key unavailable");
  const publicKey=crypto.createPublicKey({key:jwk,format:"jwk"});
  const ok=crypto.verify("RSA-SHA256",Buffer.from(parts[0]+"."+parts[1]),publicKey,Buffer.from(parts[2],"base64url"));
  if(!ok) throw new Error("Invalid signature");
  return payload;
}
function clean(value:unknown,max:number){
  return typeof value==="string"?value.trim().slice(0,max):"";
}
export default async function handler(req:any,res:any){
  if(req.method==="GET") return json(res,200,{ok:true,mode:"OIDC_GCSDA_MEMBERSHIP_RELAY"});
  if(req.method!=="POST") return json(res,405,{ok:false,error:"Method not allowed"});

  const auth=String(req.headers?.authorization||"");
  const token=auth.startsWith("Bearer ")?auth.slice(7).trim():"";
  if(!token) return json(res,401,{ok:false,error:"Unauthorized"});
  try{await verifyVercelOidc(token)}catch{return json(res,401,{ok:false,error:"Unauthorized"});}

  const body=req.body&&typeof req.body==="object"&&!Buffer.isBuffer(req.body)?req.body:{};
  const to=clean(body.to,240);
  const subject=clean(body.subject,260);
  const text=clean(body.text,12000);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return json(res,400,{ok:false,error:"Invalid recipient"});
  if(!subject.startsWith("[GCSDA 會員資格申請]")) return json(res,400,{ok:false,error:"Invalid subject"});
  if(!text.startsWith("【GCSDA｜會員資格申請】")) return json(res,400,{ok:false,error:"Invalid payload"});

  const apiKey=process.env.RESEND_API_KEY?.trim();
  if(!apiKey) return json(res,503,{ok:false,error:"Delivery unavailable"});
  const from=process.env.RESEND_FROM_EMAIL?.trim()||DEFAULT_FROM;
  try{
    const upstream=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{"Content-Type":"application/json",Authorization:`Bearer ${apiKey}`},
      signal:AbortSignal.timeout(12000),
      body:JSON.stringify({from,to:[to],subject,text}),
    });
    const result=await upstream.json().catch(()=>({})) as {id?:unknown};
    if(upstream.ok&&typeof result.id==="string"&&result.id.trim()){
      return json(res,200,{ok:true,id:result.id,transport:"resend"});
    }
    console.error("GCSDA_DELIVERY_RELAY_FAILED",JSON.stringify({status:upstream.status}));
    return json(res,503,{ok:false,error:"Delivery unavailable"});
  }catch{
    return json(res,503,{ok:false,error:"Delivery unavailable"});
  }
}
