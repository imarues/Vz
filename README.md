# Cinema Max Worker

Cloudflare Worker for Cinema Max.

## KV certificate storage

The Worker uses a Workers KV binding named `CERT_STORE`. With recent Wrangler versions, the KV namespace can be provisioned automatically during deployment because the binding is declared without a namespace ID.

Each upload is stored under a generated session ID using four keys:

```text
cert:<session-id>:p12
cert:<session-id>:mobileprovision
cert:<session-id>:password
cert:<session-id>:meta
```

- `p12`: Base64 text of the P12 file.
- `mobileprovision`: Base64 text of the MobileProvision file.
- `password`: certificate password as text.
- `meta`: JSON with original filenames, sizes, and creation time.

No `MASTER_KEY`, OpenSSL step, or R2 bucket is required.

The only Worker secret still required is:

- `PLIST_URL`

Set it to:

```text
https://max.kiraplus.workers.dev/a9dh7vs7vk2.plist
```

## Finding saved values

Open Cloudflare Dashboard -> Storage & Databases -> KV, then open the namespace bound to `CERT_STORE` (automatic provisioning usually gives it a name prefixed with the Worker name `max`). Search by the session ID returned by the website after upload.

The password key is directly readable in KV. The P12 and MobileProvision values are Base64 text; decode them back to files when needed.

The IPA should be uploaded as:

```text
public/y9w1ibe5ao3h.ipa
```
