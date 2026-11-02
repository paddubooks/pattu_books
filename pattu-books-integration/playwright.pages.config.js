import {defineConfig} from '@playwright/test';import fs from 'node:fs';
const {base}=JSON.parse(fs.readFileSync('outputs/pages-base.json'));
export default defineConfig({testDir:'tests/pages',timeout:120000,workers:1,use:{baseURL:'http://127.0.0.1:4174',headless:true},webServer:{command:'node scripts/serve-pages.mjs',url:`http://127.0.0.1:4174${base}/`,reuseExistingServer:false},reporter:'list'});
