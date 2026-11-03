import {test,expect} from '@playwright/test';
import fs from 'node:fs';
const root='/learn/subjects/maths/grades/kindergarten';
const a=JSON.parse(fs.readFileSync('public/learn/data/MATH-K-001.json'));
const topic=`${root}/topics/${a.topicSlug}`,activity=`${topic}/activities/${a.id}`;
for(const width of [320,390,768,1365])test(`redesign layout, targets and fonts at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});
 for(const [name,url] of [['books','/'],['learn','/learn/'],['catalogue',root],['topic',topic]]){
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(await page.evaluate(()=>document.fonts.check('700 16px Nunito'))).toBe(true);
  for(const text of await page.locator(name==='books'?'.hero p,.book-details .description':name==='learn'?'.hero>div:first-child>p:not(.eyebrow):not(.fine)':'.topic-card li a').all()){expect(await text.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16);}
  const primary=page.locator('a.button:visible,button:visible');
  for(const control of await primary.all()){const box=await control.boundingBox();expect(box.height).toBeGreaterThanOrEqual(44);expect(box.width).toBeGreaterThanOrEqual(44);}
  await page.screenshot({path:`outputs/previews/redesign-${width}-${name}.png`});
 }
 await page.goto(activity);await page.getByRole('button',{name:'Next',exact:true}).click();while(await page.getByRole('heading',{name:/Watch how it works/}).isVisible())await page.getByRole('button',{name:'Next',exact:true}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`outputs/previews/redesign-${width}-guide.png`,fullPage:true});await page.getByRole('button',{name:'Skip guide'}).click();
 const answer=page.locator('.choices > button').first();await answer.click();await expect(answer).toHaveAttribute('aria-pressed','true');const answerBox=await answer.boundingBox();expect(answerBox.height).toBeGreaterThanOrEqual(48);expect(answerBox.width).toBeGreaterThanOrEqual(48);await page.screenshot({path:`outputs/previews/redesign-${width}-activity.png`,fullPage:true});
 await page.getByRole('button',{name:'Learn with an example'}).click();await expect(page.locator('.teaching-panel')).toHaveCount(4);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`outputs/previews/redesign-${width}-example.png`,fullPage:true});
 await page.getByRole('button',{name:'Back to practice',exact:true}).first().click();await expect(answer).toHaveAttribute('aria-pressed','true');
 await answer.focus();await page.keyboard.press("Tab");await page.keyboard.press("Shift+Tab");await expect(answer).toBeFocused();expect(await answer.evaluate(e=>getComputedStyle(e).outlineStyle)).toBe('solid');
});
test('local fonts stay available offline',async({page,context})=>{
 const fontRequests=[];page.on('request',r=>{if(r.url().includes('.ttf'))fontRequests.push(r.url());});
 await page.goto('/learn/');await page.evaluate(()=>navigator.serviceWorker.ready);await page.evaluate(()=>document.fonts.ready);
 await page.reload();await page.evaluate(()=>document.fonts.ready);await context.setOffline(true);await page.reload();await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByText('You’re offline.',{exact:false})).toBeVisible();
 expect(await page.evaluate(()=>document.fonts.check('700 16px Nunito'))).toBe(true);
 expect(fontRequests.length).toBeGreaterThan(0);expect(fontRequests.every(u=>u.startsWith('http://127.0.0.1:4173/learn/fonts/'))).toBe(true);
 await page.screenshot({path:'outputs/previews/redesign-offline.png'});
});
