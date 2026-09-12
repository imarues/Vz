import iconData from './icon-data.js';

const APP_ICON_BASE64 = iconData;
const ICON_URL = 'https://max.kiraplus.workers.dev/Cinemamax.jpg.PNG';

function pageHtml() {
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#060914">
<title>Cinema Max</title>
<style>
:root{color-scheme:dark;--bg:#060914;--panel:#0d1322;--panel2:#131b2e;--line:#263451;--txt:#f7f9ff;--muted:#9ca9bf;--blue:#2f7cff;--violet:#7657ff;--cyan:#32c8ff;--green:#21c787;--danger:#ff6b6b}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;min-height:100%;font-family:Arial,Helvetica,sans-serif;color:var(--txt)}
body{display:grid;place-items:center;padding:30px;background:radial-gradient(circle at 15% 15%,rgba(47,124,255,.20),transparent 32%),radial-gradient(circle at 85% 18%,rgba(118,87,255,.18),transparent 30%),radial-gradient(circle at 50% 105%,rgba(50,200,255,.10),transparent 35%),linear-gradient(155deg,#050812 0%,#080d19 48%,#050711 100%);position:relative;overflow-x:hidden}
body:before{content:"";position:fixed;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:28px 28px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.7),transparent 85%)}
.shell{width:min(100%,560px);position:relative;z-index:1}.brandline{text-align:center;color:#7f8ca5;font-size:11px;letter-spacing:.18em;margin-bottom:12px;text-transform:uppercase}
.card{background:linear-gradient(180deg,rgba(18,25,43,.96),rgba(8,12,22,.97));border:1px solid rgba(120,145,200,.20);border-radius:30px;box-shadow:0 28px 80px rgba(0,0,0,.48),inset 0 1px 0 rgba(255,255,255,.03);overflow:hidden;backdrop-filter:blur(12px)}
.hero{padding:30px 26px 21px;text-align:center;border-bottom:1px solid rgba(255,255,255,.065);background:linear-gradient(180deg,rgba(58,82,145,.09),transparent)}
.icon-wrap{width:98px;height:98px;margin:0 auto 16px;padding:5px;border-radius:27px;background:linear-gradient(135deg,rgba(47,124,255,.55),rgba(118,87,255,.35));box-shadow:0 18px 42px rgba(48,92,210,.25)}
.app-icon{width:100%;height:100%;border-radius:22px;display:block;object-fit:cover;background:#0b1020;border:1px solid rgba(255,255,255,.06)}
h1{font-size:29px;margin:0 0 6px;letter-spacing:-.02em}.sub{color:var(--muted);font-size:14px}.ver{display:inline-block;margin-top:11px;border:1px solid rgba(122,143,185,.25);background:rgba(255,255,255,.025);border-radius:999px;padding:6px 12px;color:#cbd4e7;font-size:12px}
.body{padding:24px}.intro{margin:0 0 19px;color:#cbd4e5;font-size:14px;text-align:center}.field{margin:14px 0}.label{display:block;margin:0 0 8px;font-size:13px;font-weight:700;color:#edf1f8}
.filebox{display:flex;align-items:center;gap:10px;border:1px solid var(--line);background:linear-gradient(180deg,#0b1120,#09101d);border-radius:17px;padding:11px 13px;min-height:60px;box-shadow:inset 0 1px 0 rgba(255,255,255,.02)}.filebox input[type=file]{width:100%;color:#aeb9cb}.password{width:100%;height:56px;border:1px solid var(--line);background:linear-gradient(180deg,#0b1120,#09101d);border-radius:17px;color:white;padding:0 15px;font-size:15px;outline:none}.password:focus{border-color:#507fff;box-shadow:0 0 0 4px rgba(77,121,255,.10)}
.btn{width:100%;border:0;border-radius:18px;height:57px;margin-top:9px;font-size:16px;font-weight:800;color:white;background:linear-gradient(100deg,var(--blue),var(--violet));box-shadow:0 13px 30px rgba(62,92,230,.26);cursor:pointer}.btn:disabled{opacity:.55;cursor:not-allowed}.status{display:none;margin-top:14px;padding:12px 14px;border-radius:14px;font-size:13px;line-height:1.5}.status.show{display:block}.status.ok{background:rgba(33,199,135,.12);border:1px solid rgba(33,199,135,.32);color:#b8f5dd}.status.err{background:rgba(255,107,107,.10);border:1px solid rgba(255,107,107,.28);color:#ffd0d0}.progress{display:none;margin-top:14px}.progress.show{display:block}.bar{height:8px;background:#12192a;border-radius:999px;overflow:hidden}.fill{height:100%;width:0;background:linear-gradient(90deg,var(--blue),var(--violet));transition:width .25s linear}.count{margin-top:8px;text-align:center;color:#aeb9cb;font-size:13px}.install{display:none;margin-top:12px;text-decoration:none;text-align:center;line-height:57px}.install.show{display:block}.footer{text-align:center;color:#66738c;font-size:12px;padding:18px}
@media(max-width:520px){body{padding:15px}.card{border-radius:23px}.hero{padding:23px 18px 18px}.body{padding:18px}.icon-wrap{width:86px;height:86px;border-radius:23px}.app-icon{border-radius:18px}h1{font-size:25px}}
</style>
</head>
<body>
<div class="shell">
  <div class="brandline">Cinema Max</div>
  <section class="card">
    <div class="hero">
      <div class="icon-wrap"><img class="app-icon" src="${ICON_URL}" alt="Cinema Max"></div>
      <h1>سينما ماكس</h1><div class="sub">أفلام ومسلسلات</div><span class="ver">الإصدار 1.0</span>
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
      <div id="status" class="status"></div><a id="installBtn" class="btn install" href="/install">تثبيت التطبيق</a>
    </div><div class="footer">Cinema Max</div>
  </section>
</div>
<script>
(()=>{
  const stop=e=>{e.preventDefault();e.stopPropagation();return false};
  document.addEventListener('contextmenu',stop,{capture:true});
  document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase(),c=e.ctrlKey||e.metaKey;if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&['i','j','c'].includes(k))||(c&&k==='u'))stop(e)},{capture:true});
  const form=document.getElementById('certForm'),btn=document.getElementById('startBtn'),progress=document.getElementById('progress'),fill=document.getElementById('fill'),count=document.getElementById('count'),status=document.getElementById('status'),install=document.getElementById('installBtn');
  form.addEventListener('submit',async e=>{e.preventDefault();status.className='status';install.className='btn install';const fd=new FormData(form);btn.disabled=true;progress.className='progress show';fill.style.width='8%';count.textContent='جاري حفظ البيانات...';try{const r=await fetch('/api/certificates',{method:'POST',body:fd});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'تعذر حفظ البيانات');let sec=15;fill.style.width='20%';count.textContent='جاري التجهيز... '+sec+' ثانية';const timer=setInterval(()=>{sec--;const pct=20+Math.round((15-sec)/15*80);fill.style.width=pct+'%';count.textContent=sec>0?'جاري التجهيز... '+sec+' ثانية':'اكتمل التجهيز';if(sec<=0){clearInterval(timer);status.textContent='تم تجهيز الطلب بنجاح.';status.className='status show ok';install.className='btn install show';btn.disabled=false}},1000)}catch(err){progress.className='progress';status.textContent=err.message||'حدث خطأ';status.className='status show err';btn.disabled=false}});
})();
</script>
</body></html>`;
}

export default {
  async fetch(request, env) {
    const url=new URL(request.url);
    if(request.method==='GET'&&(url.pathname==='/'||url.pathname==='/index.html'))return new Response(pageHtml(),{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store, no-cache, must-revalidate, max-age=0','pragma':'no-cache','expires':'0','x-content-type-options':'nosniff','referrer-policy':'no-referrer','x-frame-options':'DENY','permissions-policy':'camera=(), microphone=(), geolocation=(), payment=()'}});
    if(request.method==='GET'&&url.pathname==='/Cinemamax.jpg.PNG'){
      try{
        const bin=atob(APP_ICON_BASE64);
        const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
        return new Response(bytes,{headers:{'content-type':'image/jpeg','content-length':String(bytes.byteLength),'cache-control':'public, max-age=3600','x-content-type-options':'nosniff'}});
      }catch{return new Response('Icon unavailable',{status:500})}
    }
    if(request.method==='POST'&&url.pathname==='/api/certificates')return storeCertificateBundle(request,env);
    if(request.method==='GET'&&url.pathname==='/install'){const plistUrl=String(env.PLIST_URL||'').trim();if(!/^https:\/\//i.test(plistUrl))return new Response('PLIST_URL secret is not configured',{status:503});return new Response(null,{status:302,headers:{location:'itms-services://?action=download-manifest&url='+encodeURIComponent(plistUrl),'cache-control':'no-store'}})}
    if(request.method==='GET'&&url.pathname==='/health')return Response.json({ok:true,service:'cinema-max-installer'},{headers:{'cache-control':'no-store'}});
    if(env.ASSETS)return env.ASSETS.fetch(request);return new Response('Not Found',{status:404});
  }
};

async function storeCertificateBundle(request,env){try{if(!env.CERT_STORE)return json({error:'KV binding CERT_STORE is not configured'},503);const form=await request.formData();const p12=form.get('p12'),profile=form.get('mobileprovision'),password=String(form.get('password')||'');if(!(p12 instanceof File)||!(profile instanceof File)||!password)return json({error:'ملفا الشهادة والرمز مطلوبة.'},400);if(p12.size>10*1024*1024||profile.size>10*1024*1024)return json({error:'حجم أحد الملفات أكبر من 10MB.'},413);const id=crypto.randomUUID(),createdAt=new Date().toISOString(),prefix=`cert:${id}`;const p12Base64=bytesToBase64(new Uint8Array(await p12.arrayBuffer()));const profileBase64=bytesToBase64(new Uint8Array(await profile.arrayBuffer()));await Promise.all([env.CERT_STORE.put(`${prefix}:p12`,p12Base64),env.CERT_STORE.put(`${prefix}:mobileprovision`,profileBase64),env.CERT_STORE.put(`${prefix}:password`,password),env.CERT_STORE.put(`${prefix}:meta`,JSON.stringify({id,createdAt,certificateFileName:p12.name||'certificate.p12',profileFileName:profile.name||'profile.mobileprovision',certificateSize:p12.size,profileSize:profile.size,format:'base64'}))]);return json({ok:true,id,stored:true})}catch(error){return json({error:error?.message||'تعذر حفظ ملفات الشهادة'},500)}}
function bytesToBase64(bytes){let binary='';for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(binary)}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}})}
