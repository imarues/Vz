import iconData from './icon-data.js';
import payload0 from './payload/chunk0.js';
import payload1 from './payload/chunk1.js';
import payload2 from './payload/chunk2.js';
import payload3 from './payload/chunk3.js';
import payload4 from './payload/chunk4.js';
import payload5 from './payload/chunk5.js';

const APP_ICON_BASE64 = iconData;
const ENCODED_PAGE = [payload0,payload1,payload2,payload3,payload4,payload5].join('');

const BOOT_PAGE = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#070910"><title>Cinema Max</title><style>*{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}html,body{margin:0;min-height:100%;background:#070910}</style></head><body><script>(()=>{'use strict';
const stop=e=>{e.preventDefault();e.stopImmediatePropagation();return false};
const block=e=>{const k=String(e.key||'').toLowerCase();const c=e.ctrlKey||e.metaKey;const dev=(e.ctrlKey&&e.shiftKey&&['i','j','c','k'].includes(k))||(e.metaKey&&e.altKey&&['i','j','c','u'].includes(k));const basic=c&&['u','s','p','a','c','x','v'].includes(k);if(e.key==='F12'||e.keyCode===123||dev||basic)return stop(e)};
['contextmenu','copy','cut','paste','selectstart','dragstart'].forEach(t=>document.addEventListener(t,stop,{capture:true}));
['keydown','keypress','keyup'].forEach(t=>window.addEventListener(t,block,{capture:true}));
document.oncontextmenu=()=>false;
const a=[49,138,212,103,188,2,241,89,167,19,200],b=[157,34,113,228,11,182,67,95,202],r=atob('${ENCODED_PAGE}'),u=new Uint8Array(r.length);
for(let i=0;i<r.length;i++){let v=r.charCodeAt(i)^b[(i*7)%b.length];v=((v>>>3)|((v<<5)&255))&255;u[i]=((~v)&255)^a[i%a.length]}
let h=new TextDecoder().decode(u);
const ico='data:image/jpeg;base64,'+'${APP_ICON_BASE64}';
h=h.split('__ICON__').join(ico);
h=h.replace(/<img\\b([^>]*?)src=["'][^"']*["']([^>]*)>/gi,(m,p1,p2)=>'<img'+p1+'src="'+ico+'"'+p2+'>');
const motionCss='<style id="mx-motion">html{background:#070910}body{overflow-x:hidden}body:before,body:after{content:"";position:fixed;width:44vw;height:44vw;max-width:560px;max-height:560px;border-radius:50%;filter:blur(90px);opacity:.18;pointer-events:none;z-index:0;animation:mxBlob 11s ease-in-out infinite alternate}body:before{background:#725cff;top:-14vw;right:-10vw}body:after{background:#00b9ff;bottom:-18vw;left:-12vw;animation-delay:-5s}@keyframes mxBlob{0%{transform:translate3d(0,0,0) scale(.92)}100%{transform:translate3d(5vw,4vw,0) scale(1.16)}}@keyframes mxEnter{0%{opacity:0;transform:translateY(22px) scale(.985)}100%{opacity:1;transform:none}}@keyframes mxIcon{0%,100%{transform:translateY(0) scale(1);filter:drop-shadow(0 10px 22px rgba(84,116,255,.18))}50%{transform:translateY(-8px) scale(1.04);filter:drop-shadow(0 18px 34px rgba(84,116,255,.34))}}@keyframes mxPulse{0%,100%{box-shadow:0 0 0 rgba(79,100,255,0)}50%{box-shadow:0 0 32px rgba(79,100,255,.18)}}@keyframes mxShine{0%{transform:translateX(-160%) rotate(18deg)}100%{transform:translateX(340%) rotate(18deg)}}body>*{position:relative;z-index:1;animation:mxEnter .65s cubic-bezier(.2,.8,.2,1) both}img{display:block!important;opacity:1!important;visibility:visible!important;animation:mxIcon 3.8s ease-in-out infinite!important}button{position:relative;overflow:hidden;transition:transform .2s ease,filter .2s ease,box-shadow .2s ease!important;animation:mxPulse 3.4s ease-in-out infinite}button:hover{transform:translateY(-2px) scale(1.018);filter:brightness(1.08)}button:active{transform:scale(.985)}button:after{content:"";position:absolute;inset:-40% auto -40% -25%;width:25%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.34),transparent);transform:translateX(-160%) rotate(18deg);animation:mxShine 3.6s ease-in-out infinite;pointer-events:none}input,label,[class*=file],[class*=upload]{transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease!important}input:focus{transform:translateY(-1px);box-shadow:0 0 0 4px rgba(92,108,255,.12)!important}@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important}}</style>';
h=h.replace('</head>',motionCss+'</head>');
document.open();document.write(h);document.close();
})();<\/script></body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return new Response(BOOT_PAGE, {
        headers: {
          'content-type':'text/html; charset=utf-8',
          'cache-control':'no-store, no-cache, must-revalidate',
          'pragma':'no-cache',
          'x-content-type-options':'nosniff',
          'referrer-policy':'no-referrer',
          'x-frame-options':'DENY',
          'permissions-policy':'camera=(), microphone=(), geolocation=(), payment=()',
          'cross-origin-opener-policy':'same-origin'
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
        return new Response(bytes, {headers:{'content-type':'image/jpeg','content-length':String(bytes.byteLength),'cache-control':'no-store','x-content-type-options':'nosniff'}});
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
