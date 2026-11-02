import {test,expect} from '@playwright/test';import fs from 'node:fs';
const a=JSON.parse(fs.readFileSync('public/learn/data/MATH-K-001.json'));const root='/learn/subjects/maths/grades/kindergarten',url=`${root}/topics/${a.topicSlug}/activities/${a.id}`;
for(const [width,height] of [[320,640],[390,844],[768,1024],[1365,900]])test(`single-click guide and answer dialogs ${width}`,async({page})=>{
 await page.setViewportSize({width,height});await page.goto(url);
 await expect(page.locator('.announcement')).toHaveCount(0);
 const next=page.getByRole('button',{name:'Next',exact:true});const nextBox=await next.boundingBox();expect(nextBox.y+nextBox.height).toBeLessThanOrEqual(height);await next.click();
 for(let step=1;step<=3;step++){
  await expect(page.getByText(`EXAMPLE · STEP ${step} OF 3`,{exact:true})).toBeVisible();
  await next.click();
 }
 await expect(page.getByRole('heading',{name:'Now it’s your turn.'})).toBeVisible();
 await page.locator('.guide-workspace .choices > button').filter({hasText:/^3$/}).click();await page.getByRole('button',{name:'Check answer',exact:true}).click();
 let dialog=page.getByRole('dialog');await expect(dialog).toHaveCount(1);await expect(dialog).toContainText('Take your time. Look again and try once more.');
 const box=await dialog.boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(height);
 await dialog.getByRole('button',{name:'Retry',exact:true}).click();await expect(dialog).toHaveCount(0);await expect(page.getByText('FIRST QUESTION · PART 1 OF 1',{exact:true})).toBeVisible();
 await page.locator('.guide-workspace .choices > button').filter({hasText:/^1$/}).click();await page.getByRole('button',{name:'Check answer',exact:true}).click();
 await expect(dialog).toContainText('That’s right. Well done for trying!');await expect(dialog.getByRole('button',{name:'Next question →'})).toBeFocused();
 await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true);
 await page.screenshot({animations:'disabled',path:`outputs/previews/popup-${width}-success.png`});
 await dialog.getByRole('button',{name:'Next question →'}).click();await expect(page.getByRole('heading',{name:'You finished your first question!'})).toBeVisible();
 await page.getByRole('button',{name:'Continue this activity →'}).click();await expect(page.getByText('Question 2 of 12',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Check answer',exact:true}).click();await expect(dialog).toContainText('Take your time. Look again and try once more.');await page.screenshot({animations:'disabled',path:`outputs/previews/popup-${width}-retry.png`});
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(page.getByText('Question 2 of 12',{exact:true})).toBeVisible();
});
for(const [width,height] of [[320,640],[390,844],[768,1024],[1365,900]])test(`complete opening content sections ${width}`,async({page})=>{
 await page.setViewportSize({width,height});
 for(const [name,path,selector] of [['home','/learn/','.hero'],['subject','/learn/subjects/maths','.page-intro'],['catalogue',root,'.catalogue-intro'],['topic',`${root}/topics/${a.topicSlug}`,'.catalogue-intro'],['guide',url,'.guide-heading']]){
  await page.goto(path);await expect(page.locator(selector)).toBeVisible();await page.evaluate(()=>document.fonts.ready);
  const box=await page.locator(selector).boundingBox();expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height,`${name} opening section bottom`).toBeLessThanOrEqual(height);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(name==='catalogue'){const first=await page.locator('.topic-card li a').first().boundingBox();expect(first.y+first.height).toBeLessThanOrEqual(height);}
  await page.screenshot({animations:'disabled',path:`outputs/previews/compact-${width}-${name}.png`});
 }
});
test('restored demonstration step two advances with one click',async({page})=>{await page.goto(url);const next=page.getByRole('button',{name:'Next',exact:true});await next.click();await next.click();await page.reload();await expect(page.getByText('EXAMPLE · STEP 2 OF 3',{exact:true})).toBeVisible();await next.click();await expect(page.getByText('EXAMPLE · STEP 3 OF 3',{exact:true})).toBeVisible();await next.click();await expect(page.getByRole('heading',{name:'Now it’s your turn.'})).toBeVisible();});
test('example feedback returns to the untouched practice question',async({page})=>{
 await page.goto(url);await page.getByRole('button',{name:'Skip guide'}).click();await page.locator('.choices > button').filter({hasText:/^1$/}).click();await page.getByRole('button',{name:'Learn with an example'}).click();
 await page.getByRole('button',{name:'Check example answer'}).click();await expect(page.getByRole('dialog')).toContainText('Take your time.');await page.getByRole('dialog').getByRole('button',{name:'Retry',exact:true}).click();
 const panels=page.locator('.example .teaching-panel').last();await panels.locator('fieldset').nth(0).getByRole('button',{name:'1',exact:true}).click();await panels.locator('fieldset').nth(1).getByRole('button',{name:'2',exact:true}).click();
 await page.getByRole('button',{name:'Check example answer'}).click();await expect(page.getByRole('dialog')).toContainText('That’s right.');await page.getByRole('dialog').getByRole('button',{name:'Next question →'}).click();await expect(page.getByText('Question 1 of 12',{exact:true})).toBeVisible();await expect(page.locator('.choices > button').filter({hasText:/^1$/})).toHaveAttribute('aria-pressed','true');
});
