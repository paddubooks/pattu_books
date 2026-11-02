// Strict static hosting: no SPA fallback. This mirrors Pages route requirements.
import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
const {base}=JSON.parse(fs.readFileSync('outputs/pages-base.json'));
const root=path.resolve('outputs/pages');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.ttf':'font/ttf','.png':'image/png','.wav':'audio/wav','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');let pathname=decodeURIComponent(url.pathname);
 if(base&&pathname!==base&&!pathname.startsWith(base+'/')){res.writeHead(404).end();return;}
 const file=path.resolve(root,'.'+(pathname.slice(base.length)||'/'));
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 let target=file;
 if(fs.existsSync(target)&&fs.statSync(target).isDirectory()){
  if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'+url.search}).end();return;}
  target=path.join(target,'index.html');
 }
 if(!fs.existsSync(target)){res.writeHead(404).end('Not found');return;}
 res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');fs.createReadStream(target).pipe(res);
}).listen(4174,'127.0.0.1',()=>console.log(`Pages preview http://127.0.0.1:4174${base}/`));
