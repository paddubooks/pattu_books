import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
export default defineConfig({publicDir:'public/learn',base:(process.env.SITE_BASE_PATH||'')+'/learn/',plugins:[react(),tailwind(),{name:'books-preserved',configureServer(server){server.middlewares.use((req,res,next)=>{const url=req.url.split('?')[0]; if(url==='/learn'){res.writeHead(302,{Location:'/learn/'+(req.url.includes('?')?'?'+req.url.split('?')[1]:'')});res.end();return;} if(url==='/'||url==='/index.html'||url.startsWith('/assets/')){const file=path.resolve('dist',url==='/'?'index.html':'.'+url);if(file.startsWith(path.resolve('dist'))&&fs.existsSync(file)){res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':file.endsWith('.svg')?'image/svg+xml':'text/html');res.end(fs.readFileSync(file));return;}}next();});}}],server:{watch:{ignored:['**/public/learn/images/**','**/public/learn/data/**']}},build:{outDir:'dist/learn',emptyOutDir:true},test:{include:['tests/**/*.test.ts']}});

