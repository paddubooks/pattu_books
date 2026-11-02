import fs from 'node:fs';import path from 'node:path';import {spawnSync} from 'node:child_process';
const base=(process.env.SITE_BASE_PATH||'').replace(/\/$/,'');
if(base&&!/^\/[A-Za-z0-9_.-]+$/.test(base))throw Error('SITE_BASE_PATH must be empty or /repository-name');
const out=path.resolve('outputs/pages');
// Only regenerate the dedicated Pages output, never the editable Books source.
if(out!==path.join(process.cwd(),'outputs','pages'))throw Error('Unexpected output path');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
const env={...process.env,SITE_BASE_PATH:base,BUILD_DIR:out};
function run(script,args=[]){const result=spawnSync(process.execPath,[script,...args],{env,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
run('scripts/prepare-catalogue.mjs');
run('node_modules/typescript/bin/tsc',['--noEmit']);
run('node_modules/vite/bin/vite.js',['build','--outDir',path.join(out,'learn')]);
// Shared static URLs in HTML/CSS are outside Vite's asset graph.
const rewrite=s=>s.replaceAll('/learn/',base+'/learn/');
const index=path.join(out,'learn/index.html');fs.writeFileSync(index,fs.readFileSync(index,'utf8').replace(/(["'])\/learn\//g,`$1${base}/learn/`));
for(const name of fs.readdirSync(path.join(out,'learn/assets')).filter(x=>x.endsWith('.css'))){const file=path.join(out,'learn/assets',name);fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace(/(["'(])\/learn\//g,`$1${base}/learn/`));}
const manifest=path.join(out,'learn/manifest.webmanifest');fs.writeFileSync(manifest,rewrite(fs.readFileSync(manifest,'utf8')));
fs.cpSync('dist/assets',path.join(out,'assets'),{recursive:true});
const tokens=path.join(out,'assets/css/pattu-tokens.css');fs.writeFileSync(tokens,rewrite(fs.readFileSync(tokens,'utf8')));
fs.writeFileSync(path.join(out,'index.html'),rewrite(fs.readFileSync('dist/index.html','utf8')));
run('scripts/finalize.mjs');
// GitHub Pages serves directories, so emit an entry file for every valid route.
const catalogue=JSON.parse(fs.readFileSync('public/learn/catalogue.json','utf8'));
const grade='learn/subjects/maths/grades/kindergarten';
const routes=['learn/subjects/maths',grade,...catalogue.topics.map(t=>`${grade}/topics/${t.slug}`),...catalogue.activities.map(a=>`${grade}/topics/${a.topicSlug}/activities/${a.id}`)];
for(const route of routes){const dir=path.resolve(out,route);if(!dir.startsWith(out+path.sep))throw Error('Invalid route');fs.mkdirSync(dir,{recursive:true});fs.copyFileSync(index,path.join(dir,'index.html'));}
fs.writeFileSync(path.join(out,'.nojekyll'),'');
fs.writeFileSync('outputs/pages-base.json',JSON.stringify({base,routes:routes.length}));
console.log(`GitHub Pages ready: ${out}; base ${base||'/'}; ${routes.length} direct routes`);
