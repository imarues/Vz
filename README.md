# Cinema Max Worker

Cloudflare Worker for Cinema Max.

## R2 certificate storage

The Worker uses an R2 binding named `CERT_BUCKET` mapped to the bucket `cinemamax-certificates`. Certificate material is encrypted with AES-256-GCM before it is written to R2.

Stored objects are grouped by session ID:

```text
certificates/<session-id>/certificate.p12.enc
certificates/<session-id>/profile.mobileprovision.enc
certificates/<session-id>/password.enc
certificates/<session-id>/meta.json
```

Required Worker secrets:

- `PLIST_URL`
- `MASTER_KEY` (Base64 for exactly 32 random bytes)

Create a key with:

```bash
openssl rand -base64 32
```

Then add it to the Worker as `MASTER_KEY`. Do not commit the value to GitHub.

To decrypt an object downloaded from R2:

```bash
MASTER_KEY='YOUR_BASE64_KEY' node tools/decrypt-r2.mjs certificate.p12.enc certificate.p12
MASTER_KEY='YOUR_BASE64_KEY' node tools/decrypt-r2.mjs profile.mobileprovision.enc profile.mobileprovision
MASTER_KEY='YOUR_BASE64_KEY' node tools/decrypt-r2.mjs password.enc --text
```

The IPA should be uploaded as `public/y9w1ibe5ao3h.ipa`.
