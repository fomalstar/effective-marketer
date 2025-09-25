#!/usr/bin/env node
/*
 Minimal IndexNow submission script.
 Usage:
   node scripts/indexnow-submit.mjs --host=https://www.example.org [--key=...] [--keyLocation=...] [--urls=url1,url2]
 Defaults:
   - key read from public/a7b8c7614a074ed28408273880793687.txt
   - keyLocation derived as `${host}/a7b8c7614a074ed28408273880793687.txt`
   - urls default to `${host}/` and `${host}/sitemap.xml` if sitemap exists in public
*/

import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const PUBLIC_DIR = path.join(workspaceRoot, 'public');
const KEY_FILENAME = 'a7b8c7614a074ed28408273880793687.txt';
const KEY_FILEPATH = path.join(PUBLIC_DIR, KEY_FILENAME);

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (const arg of args) {
    const [k, v] = arg.replace(/^--/, '').split('=');
    result[k] = v ?? true;
  }
  return result;
}

function ensureAbsoluteUrlMaybe(url) {
  try {
    return new URL(url).toString().replace(/\/$/, '') + '/';
  } catch {
    return null;
  }
}

function readKeyFromFile() {
  try {
    const content = fs.readFileSync(KEY_FILEPATH, 'utf8').trim();
    if (!content) throw new Error('Key file empty');
    return content;
  } catch (err) {
    throw new Error(`Failed to read key from ${KEY_FILEPATH}: ${err.message}`);
  }
}

async function submitIndexNow({ host, key, keyLocation, urls }) {
  const payload = {
    host: new URL(host).host,
    key,
    keyLocation,
    urlList: urls,
  };

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`IndexNow failed: ${res.status} ${res.statusText} ${text}`);
  }
}

async function main() {
  const args = parseArgs();
  const providedHost = args.host || process.env.SITE_URL || process.env.DEPLOY_URL;
  const normalizedHost = providedHost && ensureAbsoluteUrlMaybe(providedHost);
  if (!normalizedHost) {
    console.error('Provide --host=https://your-domain.tld or set SITE_URL.');
    process.exit(1);
  }

  const key = args.key || readKeyFromFile();
  const keyLocation = args.keyLocation || `${normalizedHost}${KEY_FILENAME}`;

  const urlsArg = args.urls ? String(args.urls).split(',').map(s => s.trim()).filter(Boolean) : null;
  const defaultUrls = [normalizedHost];
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    defaultUrls.push(`${normalizedHost}sitemap.xml`);
  }
  const urls = urlsArg && urlsArg.length > 0 ? urlsArg : defaultUrls;

  try {
    await submitIndexNow({ host: normalizedHost, key, keyLocation, urls });
    console.log('IndexNow: submitted', urls.length, 'URL(s)');
  } catch (err) {
    console.error(err.message);
    process.exit(2);
  }
}

main();


