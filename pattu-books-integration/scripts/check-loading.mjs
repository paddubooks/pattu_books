import {chromium} from '@playwright/test';
const browser=await chromium.launch();
try{
 const page=await browser.newPage({viewport:{width:1705,height:912}});
 for(const path of ['/','/learn/subjects/maths/grades/kindergarten/topics/numbers-to-3/activities/MATH-K-004']){
  const start=Date.now();await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'domcontentloaded'});
  await page.locator(path==='/'?'#book-grid .book-card':'.activity-card').first().waitFor();
  console.log(JSON.stringify({path,readyMs:Date.now()-start,resources:await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').slice(-2).join('/'),ms:Math.round(r.duration),bytes:r.transferSize})).sort((a,b)=>b.ms-a.ms).slice(0,8))}));
 }
}finally{await browser.close();}
