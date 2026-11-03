import {test,expect} from '@playwright/test';
const url='/learn/subjects/maths/grades/kindergarten/topics/numbers-to-3/activities/MATH-K-004';
for(const [width,height] of [[320,640],[390,844],[768,1024],[1365,768],[1705,912]])test(`audio activity controls remain reachable ${width}`,async({page})=>{
 await page.setViewportSize({width,height});await page.goto(url);await page.getByRole('button',{name:'Skip guide'}).click();await page.evaluate(()=>document.fonts.ready);

 for(const control of await page.locator('.question-view button,.actions button').all()){
  await control.scrollIntoViewIfNeeded();const box=await control.boundingBox();expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(height);expect(box.height).toBeGreaterThanOrEqual(44);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 await page.screenshot({path:`outputs/previews/activity-fit-${width}.png`});
});
test('menus and Books remain functional without announcement',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/learn/']){
  await page.goto(path);await expect(page.locator('.announcement')).toHaveCount(0);
  expect(await page.locator('header').evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgb(255, 226, 146)');
 }
 expect(errors).toEqual([]);
});
test('initial catalogue excludes offline file lists',async({page})=>{
 const requests=[];page.on('request',r=>requests.push(r.url()));await page.goto(url);await page.getByRole('button',{name:'Skip guide'}).waitFor();
 expect(requests.some(u=>u.endsWith('/catalogue.json'))).toBe(false);
 expect(requests.some(u=>u.includes('/topic-assets/'))).toBe(false);
 const response=await page.request.get('/learn/catalogue-summary.json');expect((await response.body()).length).toBeLessThan(550000);
});
