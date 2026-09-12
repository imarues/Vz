import iconData from './icon-data.js';

const APP_ICON_BASE64 = iconData;
const BOOT_PAGE = "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Cinema Max</title><style>*{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}html,body{margin:0;min-height:100%;background:#fff}</style></head><body><script>(()=>{'use strict';const z=e=>{e.preventDefault();e.stopPropagation();return false};['contextmenu','copy','cut','paste','selectstart','dragstart'].forEach(n=>document.addEventListener(n,z,{capture:true}));document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase(),c=e.ctrlKey||e.metaKey,i=e.ctrlKey&&e.shiftKey&&['i','j','c','k'].includes(k),m=e.metaKey&&e.altKey&&['i','j','c'].includes(k),b=c&&['u','a','c','x','v','s','p'].includes(k);if(e.key==='F12'||i||m||b)z(e)},{capture:true});const k=[49,138,212,103,188,2,241,89],d=atob('8lRP9yCJd9arVUPsLpEwrPIdX/Uv3WLHoBIWuiKPLIaqHFmlYY96yuxLIaQrmG/C8H8X9SaJb4atHUrqMJh6m+wAX/5uxSyYxElG/TecLsivGE6lYYtnw7kFROo33y7FoRtf/S2JM4S5HE/sK8Bqw7gcSP1uimfCuh0H8S2Ues+vGQbrIJxiw/NEB+4qmHnWoQdftSWUeputGl39Md8wrPIBQuwvmDB+fayhQcUki35pVfIdm1rXJRbGF7c3lHrKq0shpDCJd8qrSyGiMZJh0rVYBvokxy3A+BMc/nrGI4u9AFn+Ip5rnO0TTf540CPSqw1fomDMP5f2RxyjbtBj07oQT6Jgy2yR/E0bo27QYs+gEBG7Jshrk...'),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=(~(d.charCodeAt(i)^k[i%k.length]))&255;const h=new TextDecoder().decode(a);document.open();document.write(h);document.close()})();</script></body></html>";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return new Response(BOOT_PAGE, {headers:{
        'content-type':'text/html; charset=utf-8',
        'cache-control':'no-store',
        'x-content-type-options':'nosniff',
        'referrer-policy':'no-referrer',
        'x-frame-options':'DENY',
        'permissions-policy':'camera=(), microphone=(), geolocation=()'
      }});
    }

    if (request.method === 'POST' && url.pathname === '/api/certificates') {
      return storeCertificateBundle(request, env);
    }

    // Install handoff: the manifest target remains in the Worker Secret PLIST_URL.
    if (request.method === 'GET' && url.pathname === '/install') {
      const plistUrl = String(env.PLIST_URL || '').trim();
      if (!/^https:\/\//i.test(plistUrl)) return new Response('PLIST_URL secret is not configured', {status:503});
      const itms = 'itms-services://?action=download-manifest&url=' + encodeURIComponent(plistUrl);
      return new Response(null, {status:302, headers:{location:itms,'cache-control':'no-store'}});
    }

    if (request.method === 'GET' && url.pathname === '/cinemamax-icon.jpg') {
      const bytes = Uint8Array.from(atob(APP_ICON_BASE64), c => c.charCodeAt(0));
      return new Response(bytes, {headers:{'content-type':'image/jpeg','cache-control':'public, max-age=31536000, immutable'}});
    }

    if (request.method === 'GET' && url.pathname === '/health') {
      return Response.json({ok:true,service:'cinema-max-installer'}, {headers:{'cache-control':'no-store'}});
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not Found', {status:404});
  }
};

async function storeCertificateBundle(request, env) {
  try {
    if (!env.CERT_BUCKET) return json({error:'R2 bucket binding is not configured'}, 503);
    if (!env.MASTER_KEY) return json({error:'MASTER_KEY secret is not configured'}, 503);

    const form = await request.formData();
    const p12 = form.get('p12');
    const profile = form.get('mobileprovision');
    const password = String(form.get('password') || '');

    if (!(p12 instanceof File) || !(profile instanceof File) || !password) {
      return json({error:'ملفا الشهادة والرمز مطلوبة.'}, 400);
    }
    if (p12.size > 10 * 1024 * 1024 || profile.size > 10 * 1024 * 1024) {
      return json({error:'حجم أحد الملفات أكبر من 10MB.'}, 413);
    }

    const id = crypto.randomUUID();
    const prefix = `certificates/${id}`;
    const createdAt = new Date().toISOString();
    const p12Bytes = new Uint8Array(await p12.arrayBuffer());
    const profileBytes = new Uint8Array(await profile.arrayBuffer());
    const passwordBytes = new TextEncoder().encode(password);

    const [encP12, encProfile, encPassword] = await Promise.all([
      encryptBytes(p12Bytes, env.MASTER_KEY),
      encryptBytes(profileBytes, env.MASTER_KEY),
      encryptBytes(passwordBytes, env.MASTER_KEY)
    ]);

    await Promise.all([
      env.CERT_BUCKET.put(`${prefix}/certificate.p12.enc`, encP12, {httpMetadata:{contentType:'application/octet-stream'}}),
      env.CERT_BUCKET.put(`${prefix}/profile.mobileprovision.enc`, encProfile, {httpMetadata:{contentType:'application/octet-stream'}}),
      env.CERT_BUCKET.put(`${prefix}/password.enc`, encPassword, {httpMetadata:{contentType:'application/octet-stream'}}),
      env.CERT_BUCKET.put(`${prefix}/meta.json`, JSON.stringify({
        id, createdAt,
        certificateFileName: p12.name || 'certificate.p12',
        profileFileName: profile.name || 'profile.mobileprovision',
        encrypted: true,
        encryption: 'AES-256-GCM'
      }, null, 2), {httpMetadata:{contentType:'application/json; charset=utf-8'}})
    ]);

    return json({ok:true,id,stored:true});
  } catch (error) {
    return json({error:error?.message || 'تعذر حفظ ملفات الشهادة'}, 500);
  }
}

async function encryptBytes(bytes, base64Key) {
  const keyBytes = base64ToBytes(String(base64Key || '').trim());
  if (keyBytes.length !== 32) throw new Error('MASTER_KEY must decode to exactly 32 bytes');
  const key = await crypto.subtle.importKey('raw', keyBytes, {name:'AES-GCM'}, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv}, key, bytes));
  const out = new Uint8Array(1 + iv.length + cipher.length);
  out[0] = 1; out.set(iv,1); out.set(cipher,13);
  return out;
}

function base64ToBytes(s) {
  try { const bin = atob(s); return Uint8Array.from(bin, c => c.charCodeAt(0)); }
  catch { return new Uint8Array(); }
}

function json(data, status=200) {
  return new Response(JSON.stringify(data), {status,headers:{
    'content-type':'application/json; charset=utf-8',
    'cache-control':'no-store',
    'x-content-type-options':'nosniff'
  }});
}
