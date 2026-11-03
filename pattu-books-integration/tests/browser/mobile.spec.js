import {test,expect} from '@playwright/test';
for(const width of [320,360,390,430])test(`mobile navigation and pre-order flow at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:800});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
 expect((await page.locator('header').boundingBox()).height).toBeLessThan(220);
 for(const link of await page.locator('header a:visible').all()){const box=await link.boundingBox();expect(box.width).toBeGreaterThanOrEqual(44);expect(box.height).toBeGreaterThanOrEqual(44);}
 for(const link of await page.locator('header nav a').all())expect(await link.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);
 await page.getByRole('link',{name:'Explore our books',exact:false}).click();
 await expect(page.getByRole('button',{name:'Pre-order now'})).toBeVisible();
 await page.locator('[data-filter="activity"]').click();await expect(page.locator('.book-feature')).toHaveCount(1);
 const swipe=async(x,y)=>page.locator('.book-slides').evaluate((target,{x,y})=>{
  const start=new Touch({identifier:1,target,clientX:200,clientY:100});
  const end=new Touch({identifier:1,target,clientX:x,clientY:y});
  target.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[start]}));
  target.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[end]}));
 },{x,y});
 await swipe(60,110);await expect(page.locator('.gallery-status')).toHaveText('2 / 2');
 await swipe(210,230);await expect(page.locator('.gallery-status')).toHaveText('2 / 2');
 await page.getByRole('button',{name:'Previous book image'}).click();await expect(page.locator('.gallery-status')).toHaveText('1 / 2');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/learn/');await expect(page.locator('.curiosity-card')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('link',{name:'Let’s explore Maths'}).click();await expect(page.getByRole('link',{name:/Kindergarten Maths/})).toBeVisible();
});
