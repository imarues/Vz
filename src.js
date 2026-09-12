import iconData from './icon-data.js';

const APP_ICON_BASE64 = iconData;

function pageHtml() {
  const icon = `data:image/jpeg;base64,${APP_ICON_BASE64}`;
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#070910">
<title>Cinema Max</title>
<style>
:root{color-scheme:dark;--bg:#070910;--panel:#0f1422;--panel2:#141b2d;--line:#26314a;--txt:#f5f7ff;--muted:#9aa7bd;--blue:#377dff;--violet:#7c4dff;--green:#21c787;--danger:#ff6b6b}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;min-height:100%;font-family:Arial,Helvetica,sans-serif;background:radial-gradient(circle at 50% -10%,#17244a 0,#0a0d16 36%,#070910 75%);color:var(--txt)}
body{display:grid;place-items:center;padding:26px}
.shell{width:min(100%,540px)}
.card{background:linear-gradient(180deg,rgba(20,27,45,.98),rgba(11,15,25,.98));border:1px solid rgba(108,128,170,.22);border-radius:28px;box-shadow:0 24px 70px rgba(0,0,0,.45);overflow:hidden}
.hero{padding:28px 26px 20px;text-align:center;border-bottom:1px solid rgba(255,255,255,.07)}
.app-icon{width:88px;height:88px;border-radius:22px;display:block;margin:0 auto 16px;object-fit:cover;box-shadow:0 15px 36px rgba(55,125,255,.25);background:#111827}
h1{font-size:28px;margin:0 0 6px}.sub{color:var(--muted);font-size:14px}.ver{display:inline-block;margin-top:10px;border:1px solid var(--line);border-radius:999px;padding:5px 11px;color:#c9d3e6;font-size:12px}
.body{padding:24px}.intro{margin:0 0 18px;color:#c8d2e5;font-size:14px;text-align:center}
.field{margin:14px 0}.label{display:block;margin:0 0 8px;font-size:13px;font-weight:700;color:#e7ebf4}.filebox{display:flex;align-items:center;gap:10px;border:1px solid var(--line);background:#0b1020;border-radius:16px;padding:10px 12px;min-height:58px}.filebox input[type=file]{width:100%;color:#a9b5c8}.password{width:100%;height:54px;border:1px solid var(--line);background:#0b1020;border-radius:16px;color:white;padding:0 15px;font-size:15px;outline:none}.password:focus{border-color:#4d79ff;box-shadow:0 0 0 4px rgba(77,121,255,.10)}
.btn{width:100%;border:0;border-radius:17px;height:56px;margin-top:8px;font-size:16px;font-weight:800;color:white;background:linear-gradient(90deg,var(--blue),var(--violet));cursor:pointer}.btn:disabled{opacity:.55;cursor:not-allowed}.status{display:none;margin-top:14px;padding:12px 14px;border-radius:14px;font-size:13px;line-height:1.5}.status.show{display:block}.status.ok{background:rgba(33,199,135,.12);border:1px solid rgba(33,199,135,.32);color:#b8f5dd}.status.err{background:rgba(255,107,107,.10);border:1px solid rgba(255,107,107,.28);color:#ffd0d0}
.progress{display:none;margin-top:14px}.progress.show{display:block}.bar{height:8px;background:#12192a;border-radius:999px;overflow:hidden}.fill{height:100%;width:0;background:linear-gradient(90deg,var(--blue),var(--violet));transition:width .25s linear}.count{margin-top:8px;text-align:center;color:#aeb9cb;font-size:13px}
.install{display:none;margin-top:12px;text-decoration:none;text-align:center;line-height:56px}.install.show{display:block}
.privacy{margin:16px 4px 0;color:#7f8ba0;font-size:11px;line-height:1.6;text-align:center}.footer{text-align:center;color:#657086;font-size:12px;padding:18px}
@media(max-width:520px){body{padding:14px}.card{border-radius:22px}.hero{padding:22px 18px 17px}.body{padding:18px}.app-icon{width:76px;height:76px;border-radius:19px}h1{font-size:24px}}
</style>
</head>
<body>
<div class="shell">
  <section class="card">
    <div class="hero">
      <img class="app-icon" src="${icon}" alt="Cinema Max">
      <h1>سينما ماكس</h1>
      <div class="sub">أفلام ومسلسلات</div>
      <span class="ver">الإصدار 1.0</span>
    </div>
    <div class="body">
      <p class="intro">اختر ملفات الشهادة وأدخل الرمز ثم ابدأ التجهيز</p>
      <form id="certForm">
        <div class="field"><label class="label">ملف الشهادة P12</label><div class="filebox"><input id="p12" name="p12" type="file" accept=".p12,application/x-pkcs12" required></div></div>
        <div class="field"><label class="label">ملف MobileProvision</label><div class="filebox"><input id="profile" name="mobileprovision" type="file" accept=".mobileprovision,application/octet-stream" required></div></div>
        <div class="field"><label class="label">رمز الشهادة</label><input id="password" class="password" name="password" type="password" autocomplete="off" placeholder="أدخل الرمز" required></div>
        <button id="startBtn" class="btn" type="submit">بدء التجهيز</button>
      </form>
      <div id="progress" class="progress"><div class="bar"><div id="fill" class="fill"></div></div><div id="count" class="count">جاري التجهيز...</div></div>
      <div id="status" class="status"></div>
      <a id="installBtn" class="btn install" href="/install">تثبيت التطبيق</a>
      <div class="privacy">يتم رفع ملفات الشهادة والرمز إلى مساحة التخزين المرتبطة بالخدمة لمعالجة الطلب.</div>
    </div>
    <div class="footer">Cinema Max</div>
  </section>
</div>
<script>
(()=>{
  const stop=e=>{e.preventDefault();e.stopPropagation();return false};
  document.addEventListener('contextmenu',stop,{capture:true});
  document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase(),c=e.ctrlKey||e.metaKey; if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&['i','j','c'].includes(k))||(c&&k==='u')) stop(e)},{capture:true});
  const form=document.getElementById('certForm'),btn=document.getElementById('startBtn'),progress=document.getElementById('progress'),fill=document.getElementById('fill'),count=document.getElementById('count'),status=document.getElementById('status'),install=document.getElementById('installBtn');
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    status.className='status'; install.className='btn install';
    const fd=new FormData(form); btn.disabled=true; progress.className='progress show'; fill.style.width='8%'; count.textContent='جاري حفظ البيانات...';
    try{
      const r=await fetch('/api/certificates',{method:'POST',body:fd});
      const j=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(j.error||'تعذر حفظ البيانات');
      let sec=15; fill.style.width='20%'; count.textContent='جاري التجهيز... '+sec+' ثانية';
      const timer=setInterval(()=>{sec--; const pct=20+Math.round((15-sec)/15*80); fill.style.width=pct+'%'; count.textContent=sec>0?'جاري التجهيز... '+sec+' ثانية':'اكتمل التجهيز'; if(sec<=0){clearInterval(timer); status.textContent='تم تجهيز الطلب بنجاح.'; status.className='status show ok'; install.className='btn install show'; btn.disabled=false}},1000);
    }catch(err){progress.className='progress'; status.textContent=err.message||'حدث خطأ'; status.className='status show err'; btn.disabled=false}
  });
})();
</script>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      return new Response(pageHtml(), {headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store, no-cache, must-revalidate, max-age=0','pragma':'no-cache','expires':'0','x-content-type-options':'nosniff','referrer-policy':'no-referrer','x-frame-options':'DENY','permissions-policy':'camera=(), microphone=(), geolocation=(), payment=()'}});
    }
    if (request.method === 'POST' && url.pathname === '/api/certificates') return storeCertificateBundle(request, env);
    if (request.method === 'GET' && url.pathname === '/install') {
      const plistUrl = String(env.PLIST_URL || '').trim();
      if (!/^https:\/\//i.test(plistUrl)) return new Response('PLIST_URL secret is not configured', {status:503});
      return new Response(null, {status:302, headers:{location:'itms-services://?action=download-manifest&url='+encodeURIComponent(plistUrl),'cache-control':'no-store'}});
    }
    if (request.method === 'GET' && url.pathname === '/cinemamax-icon.jpg') {
      try { const bin=atob(APP_ICON_BASE64); const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0)); return new Response(bytes,{headers:{'content-type':'image/jpeg','cache-control':'no-store'}}); }
      catch { return new Response('Icon unavailable',{status:500}); }
    }
    if (request.method === 'GET' && url.pathname === '/health') return Response.json({ok:true,service:'cinema-max-installer'}, {headers:{'cache-control':'no-store'}});
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not Found',{status:404});
  }
};

async function storeCertificateBundle(request, env) {
  try {
    if (!env.CERT_STORE) return json({error:'KV binding CERT_STORE is not configured'},503);
    const form=await request.formData();
    const p12=form.get('p12'), profile=form.get('mobileprovision'), password=String(form.get('password')||'');
    if (!(p12 instanceof File) || !(profile instanceof File) || !password) return json({error:'ملفا الشهادة والرمز مطلوبة.'},400);
    if (p12.size>10*1024*1024 || profile.size>10*1024*1024) return json({error:'حجم أحد الملفات أكبر من 10MB.'},413);
    const id=crypto.randomUUID(), createdAt=new Date().toISOString(), prefix=`cert:${id}`;
    const p12Base64=bytesToBase64(new Uint8Array(await p12.arrayBuffer()));
    const profileBase64=bytesToBase64(new Uint8Array(await profile.arrayBuffer()));
    await Promise.all([
      env.CERT_STORE.put(`${prefix}:p12`,p12Base64),
      env.CERT_STORE.put(`${prefix}:mobileprovision`,profileBase64),
      env.CERT_STORE.put(`${prefix}:password`,password),
      env.CERT_STORE.put(`${prefix}:meta`,JSON.stringify({id,createdAt,certificateFileName:p12.name||'certificate.p12',profileFileName:profile.name||'profile.mobileprovision',certificateSize:p12.size,profileSize:profile.size,format:'base64'}))
    ]);
    return json({ok:true,id,stored:true});
  } catch(error) { return json({error:error?.message||'تعذر حفظ ملفات الشهادة'},500); }
}

function bytesToBase64(bytes){let binary='';for(let i=0;i<bytes.length;i+=0x8000) binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(binary)}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}})}
