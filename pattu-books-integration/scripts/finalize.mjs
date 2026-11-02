import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const out=path.join(process.env.BUILD_DIR||'dist','learn');
const base=process.env.SITE_BASE_PATH||'';
const assets=fs.readdirSync(path.join(out,'assets')).map(x=>base+'/learn/assets/'+x);
const revision=crypto.createHash('sha256').update(fs.readFileSync(path.join(out,'index.html'))).digest('hex').slice(0,12);
const shell=['/learn/','/learn/index.html','/learn/catalogue-summary.json','/learn/manifest.webmanifest','/learn/icon.svg',...fs.readdirSync(path.join(out,'fonts')).filter(x=>x.endsWith('.ttf')).map(x=>'/learn/fonts/'+x)].map(url=>base+url);
const template=fs.readFileSync('scripts/sw-template.js','utf8');
fs.writeFileSync(path.join(out,'sw.js'),template.replace('__VERSION__',revision).replaceAll('__BASE__',JSON.stringify(base)).replace('__SHELL__',JSON.stringify([...shell,...assets])));
console.log('Built learning app; original Books assets preserved.');
