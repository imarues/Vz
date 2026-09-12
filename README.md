# Cinema Max Worker

Cloudflare Worker لموقع سينما ماكس مع Cloudflare Static Assets.

## الروابط بعد النشر

- الموقع: `https://max.kiraplus.workers.dev/`
- ملف plist: `https://max.kiraplus.workers.dev/a9dh7vs7vk2.plist`
- ملف IPA المتوقع: `https://max.kiraplus.workers.dev/y9w1ibe5ao3h.ipa`
- الأيقونة: `https://max.kiraplus.workers.dev/cinemamax-icon.jpg`

## PLIST_URL Secret

رابط الـ plist غير موجود داخل HTML أو JavaScript الخاص بالصفحة. زر `/install` يقرأه من Cloudflare Worker Secret باسم `PLIST_URL`.

ضع في Cloudflare القيمة التالية فقط:

`https://max.kiraplus.workers.dev/a9dh7vs7vk2.plist`

ومن Wrangler يمكن ضبطه بالأمر:

```bash
npx wrangler secret put PLIST_URL
```

## ملف IPA

ارفع ملف التطبيق لاحقًا إلى هذا المسار وبنفس الاسم:

`public/y9w1ibe5ao3h.ipa`

وبعد النشر سيصبح رابطه:

`https://max.kiraplus.workers.dev/y9w1ibe5ao3h.ipa`

## الأيقونة

أيقونة Cinema Max المرفقة مدمجة داخل `icon-data.js` بصيغة Base64، والـWorker يقدمها من المسار `/cinemamax-icon.jpg`.

## ملاحظة عن plist

حاليًا `bundle-identifier` مضبوط على `com.cinemamax.app` والإصدار `1.0`. عند رفع الـIPA يجب التأكد أن Bundle Identifier وإصدار التطبيق الحقيقي يطابقان القيم الموجودة في الـplist حتى ينجح تثبيت OTA.

## النشر

```bash
npm install
npm run deploy
```
