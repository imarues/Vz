import iconData from './icon-data.js';
import payload0 from './payload/chunk0.js';
import payload1 from './payload/chunk1.js';
import payload2 from './payload/chunk2.js';
import payload3 from './payload/chunk3.js';
import payload4 from './payload/chunk4.js';
import payload5 from './payload/chunk5.js';

const APP_ICON_BASE64 = iconData;
const INNER_PAYLOAD = [payload0,payload1,payload2,payload3,payload4,payload5].join('');
const OUTER_KEY = [91,14,233,67,172,39,201,8,145,254,63,117,190];
const WRAPPED_PAYLOAD = outerWrap(INNER_PAYLOAD);

function outerWrap(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    let v = bytes[i] ^ OUTER_KEY[i % OUTER_KEY.length];
    v = ((v << 3) | (v >>> 5)) & 255;
    v = (v + ((i * 17 + 43) & 255)) & 255;
    binary += String.fromCharCode(v);
  }
  return btoa(binary);
}

const BOOT_PAGE = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#070910"><title>Cinema Max</title><style>*{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}html,body{margin:0;min-height:100%;background:#070910}img{-webkit-user-drag:none!important}</style></head><body><script>(()=>{'use strict';
const stop=e=>{try{e.preventDefault();e.stopImmediatePropagation()}catch{}return false};
const block=e=>{const k=String(e.key||'').toLowerCase(),ctrl=e.ctrlKey||e.metaKey,shift=e.shiftKey,alt=e.altKey;const dev=(e.key==='F12'||e.keyCode===123)||(ctrl&&shift&&['i','j','c','k'].includes(k))||(e.metaKey&&alt&&['i','j','c','u'].includes(k));const src=ctrl&&['u','s','p','a','c','x','v'].includes(k);if(dev||src)return stop(e)};
['contextmenu','copy','cut','paste','selectstart','dragstart'].forEach(t=>document.addEventListener(t,stop,{capture:true}));
['keydown','keypress','keyup'].forEach(t=>window.addEventListener(t,block,{capture:true}));
document.oncontextmenu=()=>false;

const ok=[91,14,233,67,172,39,201,8,145,254,63,117,190],w=atob('${WRAPPED_PAYLOAD}'),wb=new Uint8Array(w.length);
for(let i=0;i<w.length;i++){let v=(w.charCodeAt(i)-((i*17+43)&255)+256)&255;v=((v>>>3)|((v<<5)&255))&255;wb[i]=v^ok[i%ok.length]}
const inner=new TextDecoder().decode(wb);
const a=[49,138,212,103,188,2,241,89,167,19,200],b=[157,34,113,228,11,182,67,95,202],r=atob(inner),u=new Uint8Array(r.length);
for(let i=0;i<r.length;i++){let v=r.charCodeAt(i)^b[(i*7)%b.length];v=((v>>>3)|((v<<5)&255))&255;u[i]=((~v)&255)^a[i%a.length]}
let h=new TextDecoder().decode(u);
h=h.split('__ICON__').join('/cinemamax-icon.jpg?v=5');
h=h.replace(/<img\\b([^>]*?)src=["'][^"']*["']([^>]*)>/gi,(m,p1,p2)=>'<img'+p1+'src="/cinemamax-icon.jpg?v=5"'+p2+'>');
document.open();document.write(h);document.close();
})();<\/script></body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return new Response(BOOT_PAGE, {
        headers: {
          'content-type':'text/html; charset=utf-8',
          'cache-control':'no-store, no-cache, must-revalidate, max-age=0',
          'pragma':'no-cache',
          'expires':'0',
          'x-content-type-options':'nosniff',
          'referrer-policy':'no-referrer',
          'x-frame-options':'DENY',
          'permissions-policy':'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=()',
          'cross-origin-opener-policy':'same-origin',
          'cross-origin-resource-policy':'same-origin'
        }
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/certificates') return storeCertificateBundle(request, env);

    if (request.method === 'GET' && url.pathname === '/install') {
      const plistUrl = String(env.PLIST_URL || '').trim();
      if (!/^https:\/\//i.test(plistUrl)) return new Response('PLIST_URL secret is not configured', {status:503});
      const itms = 'itms-services://?action=download-manifest&url=' + encodeURIComponent(plistUrl);
      return new Response(null, {status:302, headers:{location:itms,'cache-control':'no-store'}});
    }

    if (request.method === 'GET' && url.pathname === '/cinemamax-icon.jpg') {
      try {
        const bin = atob(APP_ICON_BASE64);
        const bytes = new Uint8Array(bin.length);
        for (let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
        return new Response(bytes, {
          headers: {
            'content-type':'image/jpeg',
            'content-length':String(bytes.byteLength),
            'cache-control':'public, max-age=3600',
            'x-content-type-options':'nosniff'
          }
        });
      } catch {
        return new Response('Icon unavailable', {status:500});
      }
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
    if (!(p12 instanceof File) || !(profile instanceof File) || !password) return json({error:'ملفا الشهادة والرمز مطلوبة.'}, 400);
    if (p12.size > 10 * 1024 * 1024 || profile.size > 10 * 1024 * 1024) return json({error:'حجم أحد الملفات أكبر من 10MB.'}, 413);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const p12Base64 = bytesToBase64(new Uint8Array(await p12.arrayBuffer()));
    const profileBase64 = bytesToBase64(new Uint8Array(await profile.arrayBuffer()));
    const prefix = `cert:${id}`;
    await Promise.all([
      env.CERT_STORE.put(`${prefix}:p12`, p12Base64),
      env.CERT_STORE.put(`${prefix}:mobileprovision`, profileBase64),
      env.CERT_STORE.put(`${prefix}:password`, password),
      env.CERT_STORE.put(`${prefix}:meta`, JSON.stringify({id,createdAt,certificateFileName:p12.name||'certificate.p12',profileFileName:profile.name||'profile.mobileprovision',certificateSize:p12.size,profileSize:profile.size,format:'base64'}))
    ]);
    return json({ok:true,id,stored:true});
  } catch (error) {
    return json({error:error?.message || 'تعذر حفظ ملفات الشهادة'}, 500);
  }
}

function bytesToBase64(bytes) {
  let binary='';
  const chunkSize=0x8000;
  for(let i=0;i<bytes.length;i+=chunkSize) binary+=String.fromCharCode(...bytes.subarray(i,i+chunkSize));
  return btoa(binary);
}

function json(data,status=200) {
  return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
}
