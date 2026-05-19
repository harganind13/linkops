const LEADS_WEBHOOK_URL = process.env.REACT_APP_LEADS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbzDLXWRxanAgt9ZV6nyY2e-awHkC___8Xb-u6A4JNjcFidDxdHhYlr5K_agvg5IO4lO/exec";
const LEADS_FORM_TOKEN = process.env.REACT_APP_LEADS_FORM_TOKEN || "69834dbe5dda48ac91326630d5f977e38f5b3be0193f7eaa";


export async function submitLead(payload) {
  const body = new URLSearchParams({
    token: LEADS_FORM_TOKEN,
    name: payload.name || "",
    email: payload.email || "",
    company: payload.company || "",
    message: payload.message || "",
    source: payload.source || "website",
    pageUrl: window.location.href,
    userAgent: window.navigator.userAgent,
  });

  await fetch(LEADS_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    body,
  });

  return { ok: true };
}
