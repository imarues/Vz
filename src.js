import iconData from './icon-data.js';


const APP_NAME = 'سينما ماكس';
const APP_VERSION = '1.0';
const APP_ICON_BASE64 = iconData;

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${APP_NAME}</title>
<style>
:root{--bg:#f6f7f9;--surface:#fff;--text:#111827;--muted:#6b7280;--line:#e5e7eb;--dark:#111827;--shadow:0 18px 55px rgba(15,23,42,.09)}
*{box-sizing:border-box}html,body{margin:0;min-height:100%}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Tahoma,Arial,sans-serif;background:linear-gradient(180deg,#fff 0%,var(--bg) 100%);color:var(--text)}
.page{min-height:100vh;display:grid;place-items:center;padding:24px}.card{width:min(460px,100%);background:var(--surface);border:1px solid var(--line);border-radius:28px;box-shadow:var(--shadow);overflow:hidden}
.top{padding:30px 28px 20px;background:linear-gradient(180deg,#fff,#fafafa);border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:16px}.icon{width:84px;height:84px;border-radius:22px;object-fit:cover;box-shadow:0 10px 28px rgba(15,23,42,.12)}
h1{margin:0;font-size:28px;line-height:1.15}.sub{margin:7px 0 0;color:var(--muted);font-size:14px}.version{display:inline-block;margin-top:10px;padding:6px 11px;border:1px solid var(--line);border-radius:999px;font-size:12px;color:#374151}
.content{padding:24px 28px 28px}.intro{font-size:13px;line-height:1.75;color:var(--muted);margin:0 0 18px}.field{margin-top:14px}label{display:block;margin-bottom:8px;font-size:13px;font-weight:700}input{width:100%;border:1px solid var(--line);border-radius:17px;background:#fff;padding:13px 14px;font:inherit;outline:none}input:focus{border-color:#cbd5e1;box-shadow:0 0 0 4px rgba(15,23,42,.05)}
.btn{width:100%;border:0;border-radius:18px;padding:15px 18px;font:inherit;font-weight:800;cursor:pointer;text-align:center;text-decoration:none}.primary{margin-top:20px;color:#fff;background:linear-gradient(180deg,#1f2937,#0f172a)}.install{display:none;margin-top:12px;color:#fff;background:#020617}.install.show{display:block}.btn:disabled{opacity:.6;cursor:not-allowed}
.progress{display:none;margin-top:18px;padding:18px;border:1px solid var(--line);border-radius:20px;background:#fafafa}.progress.show{display:block}.row{display:flex;justify-content:space-between;align-items:center;gap:12px}.time{font-size:24px;font-weight:800;direction:ltr}.bar{height:9px;margin-top:12px;border-radius:999px;background:#e5e7eb;overflow:hidden}.bar span{display:block;width:0;height:100%;background:#111827;transition:width 1s linear}.status{display:none;margin-top:15px;padding:15px 16px;border:1px solid #d1fae5;background:#f0fdf4;color:#166534;border-radius:18px;font-size:13px;line-height:1.7}.status.show{display:block}.note{margin-top:18px;text-align:center;color:#9ca3af;font-size:12px}
</style>
</head>
<body>
<div class="page"><main class="card">
<section class="top"><div class="brand"><img class="icon" src="/cinemamax-icon.jpg" alt="Cinema Max"><div><h1>${APP_NAME}</h1><p class="sub">أفلام ومسلسلات</p><span class="version">الإصدار ${APP_VERSION}</span></div></div></section>
<section class="content">
<p class="intro">اختر ملفات الشهادة وأدخل الرمز ثم ابدأ التجهيز. هذه الحقول تستخدم لمحاكاة واجهة التجهيز فقط، ولا يتم إرسال محتوياتها إلى الخادم.</p>
<form id="form">
<div class="field"><label for="p12">ملف الشهادة P12</label><input id="p12" type="file" accept=".p12,application/x-pkcs12" required></div>
<div class="field"><label for="mp">ملف MobileProvision</label><input id="mp" type="file" accept=".mobileprovision,application/octet-stream" required></div>
<div class="field"><label for="pw">رمز الشهادة</label><input id="pw" type="password" autocomplete="off" required placeholder="أدخل الرمز"></div>
<button id="start" class="btn primary" type="submit">بدء التجهيز</button>
<a id="install" class="btn install" href="/install">تثبيت التطبيق</a>
</form>
<div id="progress" class="progress"><div class="row"><strong>جاري تجهيز رابط التثبيت</strong><span id="time" class="time">15s</span></div><div class="bar"><span id="bar"></span></div></div>
<div id="status" class="status">اكتمل التجهيز وأصبح زر التثبيت جاهزًا.</div>
<div class="note">Cinema Max</div>
</section></main></div>
<script>
const form=document.getElementById('form'),start=document.getElementById('start'),install=document.getElementById('install'),progress=document.getElementById('progress'),time=document.getElementById('time'),bar=document.getElementById('bar'),status=document.getElementById('status');
// Signing pipeline — client orchestration boundary.
// Stage A: collect local certificate/profile selections and initialize the UI session.
// Stage B: hold the install handoff while the local preparation window is active.
// Stage C: finalize the session and expose the server-side manifest entry point.
form.addEventListener('submit',e=>{e.preventDefault();if(start.disabled)return;start.disabled=true;install.classList.remove('show');status.classList.remove('show');progress.classList.add('show');let remaining=15;time.textContent='15s';bar.style.width='0%';start.textContent='جاري التجهيز...';const timer=setInterval(()=>{remaining--;const done=15-remaining;time.textContent=String(Math.max(0,remaining))+'s';bar.style.width=String(Math.min(100,(done/15)*100))+'%';if(remaining<=0){clearInterval(timer);bar.style.width='100%';install.classList.add('show');status.classList.add('show');start.disabled=false;start.textContent='إعادة التجهيز'}},1000)});
</script>
</body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return new Response(html, {headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'no-referrer'}});
    }

    // Signing service — secure install handoff layer.
    // The manifest target is resolved only at runtime from Worker Secrets.
    // This boundary can host a real backend integration later without changing /install.
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

    // Static assets: plist and the IPA after it is uploaded to /public.
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not Found', {status:404});
  }
};
