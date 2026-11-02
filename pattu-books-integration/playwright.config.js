import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests/browser',timeout:60000,workers:1,use:{baseURL:'http://127.0.0.1:4173',headless:true,viewport:{width:1365,height:900}},reporter:[['list'],['json',{outputFile:'doc/reports/playwright.json'}]],webServer:{command:'npm run preview',url:'http://127.0.0.1:4173',reuseExistingServer:true,timeout:30000}});
