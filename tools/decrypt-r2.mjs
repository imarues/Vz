import fs from 'node:fs/promises';
import { webcrypto } from 'node:crypto';

const [,, input, output, flag] = process.argv;
if (!input) {
  console.error('Usage: MASTER_KEY="base64" node tools/decrypt-r2.mjs <input.enc> [output] [--text]');
  process.exit(1);
}
const master = String(process.env.MASTER_KEY || '').trim();
if (!master) throw new Error('MASTER_KEY environment variable is required');
const keyBytes = Uint8Array.from(Buffer.from(master, 'base64'));
if (keyBytes.length !== 32) throw new Error('MASTER_KEY must decode to exactly 32 bytes');
const data = new Uint8Array(await fs.readFile(input));
if (data[0] !== 1 || data.length < 30) throw new Error('Unsupported or invalid encrypted file');
const iv = data.slice(1, 13);
const cipher = data.slice(13);
const key = await webcrypto.subtle.importKey('raw', keyBytes, {name:'AES-GCM'}, false, ['decrypt']);
const plain = new Uint8Array(await webcrypto.subtle.decrypt({name:'AES-GCM',iv}, key, cipher));
if (flag === '--text' || (!output && input.toLowerCase().includes('password'))) {
  process.stdout.write(new TextDecoder().decode(plain) + '\n');
} else {
  const dest = output || input.replace(/\.enc$/i, '.decrypted');
  await fs.writeFile(dest, plain);
  console.log(dest);
}
