import {test,expect} from '@playwright/test';import fs from 'node:fs';
const {base}=JSON.parse(fs.readFileSync('outputs/pages-base.json'));
const c=JSON.parse(fs.readFileSync('public/learn/catalogue.json'));const topic=c.topics[0];
const grade=base+'/learn/subjects/maths/grades/kindergarten';
const activity=`${grade}/topics/${topic.slug}/activities/${topic.activityIds[0]}`;
test('Books, Learn, direct routes, refresh and local assets on static hosting',async({page})=>{
 const failed=[];const errors=[];page.on('response',r=>{if(r.status()>=400)failed.push(r.url())});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/');await expect(page.locator('.book-feature')).toHaveCount(1);
 await expect(page.getByRole('heading',{name:'Nila at Paatti’s Home',exact:true})).toBeVisible();
 await expect(page.getByText('COMING SOON · PRE-ORDERS OPEN')).toBeVisible();
 for(const filter of ['story','activity','all']){await page.locator(`[data-filter="${filter}"]`).click();await expect(page.locator('.book-feature')).toHaveCount(1);}
 await page.evaluate(()=>{window.openedLinks=[];window.open=url=>{window.openedLinks.push(url);return null;};});
 await page.getByRole('button',{name:'Pre-order now'}).click();await page.locator('#contact-button').click();
 const links=await page.evaluate(()=>window.openedLinks);expect(links).toHaveLength(2);
 for(const link of links){const url=new URL(link);expect(url.origin+url.pathname).toBe('https://wa.me/94701856427');expect(url.searchParams.get('text')).toContain('pre-order');}
 await page.getByRole('link',{name:'Pattu Learn',exact:true}).click();await expect(page.getByRole('heading',{name:/Big discoveries/})).toBeVisible();
 for(const route of [grade,`${grade}/topics/${topic.slug}`,activity]){const r=await page.goto(route);expect(r.status()).toBe(200);await expect(page.locator(route===activity?'.activity-card':'.topic-card').first()).toBeVisible();await page.reload();}
 await page.getByRole('button',{name:'Skip guide'}).click();await expect(page.getByRole('button',{name:'Check answer',exact:true})).toBeVisible();await page.evaluate(()=>document.fonts.ready);
 await page.getByRole('link',{name:'← Pattu Books',exact:true}).click();expect(new URL(page.url()).pathname).toBe(base+'/');
 expect(failed).toEqual([]);expect(errors).toEqual([]);
});
test('every catalogue route has a physical entry file',async({request})=>{
 for(const a of c.activities){const file=`outputs/pages/learn/subjects/maths/grades/kindergarten/topics/${a.topicSlug}/activities/${a.id}/index.html`;expect(fs.existsSync(file)).toBe(true);}
 expect((await request.get(base+'/learn/not-a-real-asset.svg')).status()).toBe(404);
});
test('offline downloads and refresh use the repository prefix',async({page,context})=>{
 await page.goto(base+'/learn/');await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();
 await page.goto(`${grade}/topics/${topic.slug}`);await page.getByRole('button',{name:'Download topic for offline'}).click();await expect(page.getByText('✓ Offline ready',{exact:true})).toBeVisible({timeout:100000});
 await context.setOffline(true);await page.goto(activity);await page.getByRole('button',{name:'Skip guide'}).click();await page.reload();await expect(page.getByRole('button',{name:'Check answer',exact:true})).toBeVisible();await context.setOffline(false);
});
