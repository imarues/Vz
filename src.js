import iconData from './icon-data.js';
import payload0 from './payload/chunk0.js';
import payload1 from './payload/chunk1.js';
import payload2 from './payload/chunk2.js';
import payload3 from './payload/chunk3.js';

const APP_ICON_BASE64 = iconData;
const ENCODED_PAGE = [payload0,payload1,payload2,payload3].join('');
const BOOT_PAGE = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cinema Max</title><style>*{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}html,body{margin:0;min-height:100%;background:#fff}</style></head><body><script>(()=>{'use strict';const z=e=>{e.preventDefault();e.stopPropagation();return false};['contextmenu','copy','cut','paste','selectstart','dragstart'].forEach(n=>document.addEventListener(n,z,{capture:true}));document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase(),c=e.ctrlKey||e.metaKey,i=e.ctrlKey&&e.shiftKey&&['i','j','c','k'].includes(k),m=e.metaKey&&e.altKey&&['i','j','c'].includes(k),b=c&&['u','a','c','x','v','s','p'].includes(k);if(e.key==='F12'||i||m||b)z(e)},{capture:true});const k=[49,138,212,103,188,2,241,89],d=atob('${ENCODED_PAGE}'),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=(~(d.charCodeAt(i)^k[i%k.length]))&255;const h=new TextDecoder().decode(a);document.open();document.write(h);document.close()})();</script></body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return new Response(BOOT_PAGE, {headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'no-referrer','x-frame-options':'DENY','permissions-policy':'camera=(), microphone=(), geolocation=()'}});
    }
    if (request.method === 'POST' && url.pathname === '/api/certificates') return storeCertificateBundle(request, env);
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
    if (request.method === 'GET' && url.pathname === '/health') return Response.json({ok:true,service:'cinema-max-installer'}, {headers:{'cache-control':'no-store'}});
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not Found', {status:404});
  }
};

async function storeCertificateBundle(request, env) {
  try {
    if (!env.CERT_STORE) return json({error:'KV binding CERT_STORE is not configured'}, 503);
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
    const createdAt = new Date().toISOString();
    const p12Base64 = bytesToBase64(new Uint8Array(await p12.arrayBuffer()));
    const profileBase64 = bytesToBase64(new Uint8Array(await profile.arrayBuffer()));
    const prefix = `cert:${id}`;

    await Promise.all([
      env.CERT_STORE.put(`${prefix}:p12`, p12Base64),
      env.CERT_STORE.put(`${prefix}:mobileprovision`, profileBase64),
      env.CERT_STORE.put(`${prefix}:password`, password),
      env.CERT_STORE.put(`${prefix}:meta`, JSON.stringify({
        id,
        createdAt,
        certificateFileName: p12.name || 'certificate.p12',
        profileFileName: profile.name || 'profile.mobileprovision',
        certificateSize: p12.size,
        profileSize: profile.size,
        format: 'base64'
      }))
    ]);

    return json({ok:true,id,stored:true});
  } catch (error) {
    return json({error:error?.message || 'تعذر حفظ ملفات الشهادة'}, 500);
  }
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function json(data,status=200) {
  return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
}
