import iconData from './icon-data.js';

const APP_ICON_BASE64 = iconData;

// Encoded presentation payload: XNOR byte transform + Base64 transport.
// This is obfuscation, not cryptographic secrecy; the browser must decode it to render.
const BOOT_PAGE = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cinema Max</title><style>*{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}html,body{margin:0;min-height:100%;background:#fff}</style></head><body><script>(()=>{'use strict';const z=e=>{e.preventDefault();e.stopPropagation();return false};['contextmenu','copy','cut','paste','selectstart','dragstart'].forEach(n=>document.addEventListener(n,z,{capture:true}));document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase(),c=e.ctrlKey||e.metaKey,i=e.ctrlKey&&e.shiftKey&&['i','j','c','k'].includes(k),m=e.metaKey&&e.altKey&&['i','j','c'].includes(k),b=c&&['u','a','c','x','v','s','p'].includes(k);if(e.key==='F12'||i||m||b)z(e)},{capture:true});const q=[249,179,13,134,75,209,238,120,165,60,146,22,207,139,90,224].map(v=>v^170),s=[
  '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'
].join(''),r=atob(s),u=new Uint8Array(r.length);for(let i=0;i<r.length;i++)u[i]=~(r.charCodeAt(i)^q[i%q.length])&255;const h=new TextDecoder().decode(u);document.open();document.write(h);document.close()})();</script></body></html>`;

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
        'permissions-policy':'clipboard-read=(), clipboard-write=()'
      }});
    }

    // Install handoff is resolved only at runtime from Worker Secrets.
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
