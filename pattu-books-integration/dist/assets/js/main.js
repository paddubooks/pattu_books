// Measure the actual header so the full hero fits each screen and font size.
function fitOpeningScreen() {
  const chrome = ['.announcement', 'header'].reduce((height, selector) => {
    return height + (document.querySelector(selector)?.getBoundingClientRect().height || 0);
  }, 0);
  document.documentElement.style.setProperty('--site-chrome-height', `${chrome}px`);
}
const headerObserver = new ResizeObserver(fitOpeningScreen);
headerObserver.observe(document.querySelector('header'));
const announcement = document.querySelector('.announcement');
if (announcement) headerObserver.observe(announcement);
fitOpeningScreen();

// Replace sample catalogue and contact values here when store details are ready.
const storeDetails = { whatsapp: '', instagram: '', facebook: '' };
// The SVG is loaded directly; changes to that file appear without copying markup.
const motionToggle = document.querySelector('.motion-toggle');
const gardenScene = document.querySelector('#garden-scene');
let scenePaused = false;

function syncSceneMotion() {
  gardenScene?.contentDocument?.documentElement.classList.toggle('scene-paused', scenePaused);
}

gardenScene?.addEventListener('load', syncSceneMotion);
motionToggle?.addEventListener('click', () => {
  scenePaused = !scenePaused;
  syncSceneMotion();
  motionToggle.setAttribute('aria-pressed', String(scenePaused));
  motionToggle.textContent = scenePaused ? 'Play animations ▷' : 'Pause animations Ⅱ';
});
const books = [
 {title:'The Little Forest Explorer',type:'story',age:'3–6',price:1250,bg:'#e8ebda',color:'#e9bb74',subtitle:'A world of wonder awaits',motif:'forest',description:'A curious little rabbit. A forest full of surprises.'},
 {title:'My First Activity Book',type:'activity',age:'3–5',price:950,bg:'#f3e4d9',color:'#e8a294',subtitle:'Let’s learn, play & discover!',motif:'activity',description:'Little puzzles, big discoveries, and lots of happy learning.'},
 {title:'A Sky Full of Dreams',type:'story',age:'4–8',price:1450,bg:'#e8e3ef',color:'#a7abc9',subtitle:'An adventure beyond the stars',motif:'sky',description:'Follow a little bear on a magical bedtime adventure.'},
 {title:'Colour, Play & Learn',type:'activity',age:'3–6',price:850,bg:'#f3eccf',color:'#a8bd9a',subtitle:'Big fun for little hands',motif:'activity',description:'A colourful collection of playful, creative activities.'}
];
function cover(book,index){const art=book.motif==='forest'?'<path d="M0 160Q75 100 180 170V280H0" fill="#78916c"/><path d="M25 210v-65m-20 35 20-49 22 49Z" fill="#426c51" stroke="#426c51" stroke-width="5"/><ellipse cx="110" cy="213" rx="27" ry="32" fill="#fff7df"/><ellipse cx="99" cy="176" rx="8" ry="28" fill="#fff7df"/><ellipse cx="119" cy="176" rx="8" ry="28" fill="#fff7df"/><circle cx="101" cy="207" r="2"/><circle cx="118" cy="207" r="2"/><path d="M107 218q5 5 9-1" fill="none" stroke="#344d3f"/><path d="m65 251 10-25 10 25" fill="#f0bd76"/>':book.motif==='sky'?'<circle cx="128" cy="157" r="31" fill="#f9e7ad"/><circle cx="140" cy="146" r="29" fill="#a7abc9"/><g fill="#fff3bd"><path d="m36 145 4 9 10 2-8 6 2 10-8-5-9 5 2-10-7-6 10-2Z"/><circle cx="64" cy="191" r="3"/><circle cx="155" cy="215" r="3"/><circle cx="33" cy="229" r="3"/></g><path d="M0 252Q50 214 100 250T180 244V280H0" fill="#858eaf"/><circle cx="85" cy="225" r="23" fill="#d1ac83"/><circle cx="68" cy="205" r="9" fill="#d1ac83"/><circle cx="103" cy="205" r="9" fill="#d1ac83"/><circle cx="78" cy="223" r="2"/><circle cx="93" cy="223" r="2"/><ellipse cx="85" cy="234" rx="9" ry="6" fill="#f2d4ad"/>':'<rect x="22" y="139" width="59" height="54" rx="10" fill="#fff0ca" transform="rotate(-8 50 165)"/><text x="50" y="178" text-anchor="middle" font-family="sans-serif" font-size="37" fill="#c87962">a</text><circle cx="129" cy="167" r="28" fill="#e6cb75"/><text x="129" y="181" text-anchor="middle" font-family="sans-serif" font-size="34" fill="#557a68">2</text><path d="m39 222 9-22 9 22 23 2-18 15 5 22-19-12-20 12 5-22-17-15Z" fill="#e39f91"/><g transform="rotate(20 123 232)"><rect x="115" y="204" width="15" height="51" rx="3" fill="#fff0ca"/><path d="m115 255 7 14 8-14" fill="#cf9b72"/><path d="m119 263 3 6 4-6" fill="#345544"/></g>';
return `<svg role="img" aria-label="Illustrated cover of ${book.title}" viewBox="0 0 180 280" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="178" height="278" rx="5" fill="${book.color}"/><path d="M7 2v276" stroke="#3a5041" opacity=".2" stroke-width="6"/><rect x="13" y="13" width="155" height="254" rx="3" fill="none" stroke="#fff6dc" opacity=".55"/><text x="90" y="32" text-anchor="middle" fill="#314f40" font-family="sans-serif" font-size="6" letter-spacing="2">PATTU BOOKS</text><foreignObject x="21" y="47" width="140" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Georgia,serif;font-size:24px;font-weight:bold;line-height:1.04;text-align:center;color:#294f40">${book.title}</div></foreignObject><text x="90" y="123" text-anchor="middle" font-family="sans-serif" font-size="6" fill="#294f40">${book.subtitle}</text>${art}</svg>`;}
const grid=document.querySelector('#book-grid');
function render(filter='all'){grid.innerHTML=books.map((b,i)=>({...b,index:i})).filter(b=>filter==='all'||b.type===filter).map(b=>`<article class="book-card"><div class="cover-wrap" style="background:${b.bg}"><span class="age">Ages ${b.age}</span>${cover(b,b.index)}</div><p class="book-type">${b.type==='story'?'Storybook':'Activity book'}</p><h3>${b.title}</h3><p class="description">${b.description}</p><div class="book-bottom"><strong>LKR ${b.price.toLocaleString()}</strong><button class="order" data-book="${b.index}">Order book ↗</button></div></article>`).join('');}
render();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render(button.dataset.filter);}));
const dialog=document.querySelector('dialog');
function order(book){if(storeDetails.whatsapp){window.open(`https://wa.me/${storeDetails.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(book?`Hello Pattu Books! I'd like to order ${book.title}.`:'Hello Pattu Books! Could you help me choose a book?')}`,'_blank','noopener,noreferrer');return;}document.querySelector('#dialog-title').textContent=book?book.title:'Let’s find your next adventure.';document.querySelector('#dialog-copy').textContent=book?`Sample edition · Ages ${book.age} · LKR ${book.price.toLocaleString()}. Final catalogue and availability will be confirmed by Pattu Books.`:'Our ordering details will be here soon. In the meantime, explore our sample collection for a little inspiration.';dialog.showModal();}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-book]');if(b)order(books[Number(b.dataset.book)]);});document.querySelector('#contact-button').addEventListener('click',()=>order());document.querySelectorAll('.close,.close-dialog').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});document.querySelector('#year').textContent=new Date().getFullYear();
const socialLinks=[['instagram','Instagram'],['facebook','Facebook']].filter(([key])=>storeDetails[key]);if(socialLinks.length){const p=document.querySelector('.contact-status');p.replaceChildren();socialLinks.forEach(([key,label])=>{const a=document.createElement('a');a.href=storeDetails[key];a.textContent=label;a.style.margin='0 10px';a.rel='noopener noreferrer';a.target='_blank';p.append(a);});}
