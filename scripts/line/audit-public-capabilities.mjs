const endpoints={
  sttIntake:"https://stt-003.vercel.app/api/cooperation-submit",
  gcsdaMembership:"https://gcsda-governance.vercel.app/api/gcsda-membership-submit",
  sttWebhook:"https://stt-003.vercel.app/api/line/stt-webhook",
  gcsdaWebhook:"https://gcsda-governance.vercel.app/api/line/gcsda-webhook"
};

async function getJson(url){
  const r=await fetch(url,{headers:{Accept:"application/json"},signal:AbortSignal.timeout(12000)});
  const text=await r.text();
  let body={}; try{body=JSON.parse(text)}catch{}
  return {status:r.status,ok:r.ok,body};
}

const [sttIntake,gcsdaMembership,sttWebhook,gcsdaWebhook]=await Promise.all([
  getJson(endpoints.sttIntake),
  getJson(endpoints.gcsdaMembership),
  getJson(endpoints.sttWebhook),
  getJson(endpoints.gcsdaWebhook)
]);

const failures=[];
if(!sttIntake.ok||sttIntake.body?.resendConfigured!==true) failures.push("STT formal intake delivery is not configured");
if(!gcsdaMembership.ok||gcsdaMembership.body?.deliveryConfigured!==true||gcsdaMembership.body?.recipientConfigured!==true) failures.push("GCSDA membership delivery is not configured");

const releaseOpen=(process.env.LINE_RELEASE_GATE||"").trim()==="WEBSITE_QA_PASS_BUILD_LOCKED";
if(!releaseOpen){
  if(sttWebhook.body?.configured===true) failures.push("STT LINE webhook configured while LINE is HOLD");
  if(gcsdaWebhook.body?.configured===true) failures.push("GCSDA LINE webhook configured while LINE is HOLD");
}

const result={
  auditedAt:new Date().toISOString(),
  websiteDelivery:{
    stt:{status:sttIntake.status,resendConfigured:Boolean(sttIntake.body?.resendConfigured)},
    gcsda:{
      status:gcsdaMembership.status,
      resendConfigured:Boolean(gcsdaMembership.body?.resendConfigured),
      recipientConfigured:Boolean(gcsdaMembership.body?.recipientConfigured),
      formSubmitConfigured:Boolean(gcsdaMembership.body?.formSubmitConfigured),
      deliveryConfigured:Boolean(gcsdaMembership.body?.deliveryConfigured)
    }
  },
  lineWebhooks:{
    stt:{status:sttWebhook.status,configured:Boolean(sttWebhook.body?.configured)},
    gcsda:{status:gcsdaWebhook.status,configured:Boolean(gcsdaWebhook.body?.configured)}
  },
  releaseGate:releaseOpen?"OPEN":"HOLD"
};

if(failures.length){
  console.error("LINE_PUBLIC_CAPABILITY_AUDIT_FAILED\n- "+failures.join("\n- ")+"\n"+JSON.stringify(result));
  process.exit(1);
}
console.log(JSON.stringify({linePublicCapabilityAudit:"PASS",...result}));
