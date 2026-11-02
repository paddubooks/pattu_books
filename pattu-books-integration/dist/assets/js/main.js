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

// Public contact details for pre-orders and enquiries.
const storeDetails = { whatsapp: '94701856427', instagram: '', facebook: '' };
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
const books = [{title:'Nila at Paatti’s Home',images:[{src:'assets/images/nila-cover.png',alt:'Nila at Paatti’s Home — illustrated front cover'},{src:'assets/images/nila-front-back.png',alt:'Front and back of Nila at Paatti’s Home'}],types:['story','activity'],age:'4–6',description:'Join Nila, Paatti and Pattu for a little maths adventure. Count, compare, find shapes and make patterns in the world around you.'}];
const grid=document.querySelector('#book-grid');
function gallery(book) {
 const multiple=book.images.length>1;
 return `<div class="book-gallery" role="group" ${multiple?'aria-roledescription="carousel"':''} aria-label="${book.title} images" data-slide="0">
 <div class="book-slides">${book.images.map((image,index)=>`<img class="featured-cover" src="${image.src}" alt="${image.alt}" width="1448" height="1086" loading="lazy" ${index?'hidden':''}>`).join('')}</div>
 ${multiple?`<div class="gallery-controls"><button type="button" class="gallery-arrow" data-direction="-1" aria-label="Previous book image">←</button><div class="gallery-dots">${book.images.map((image,index)=>`<button type="button" class="gallery-dot" data-slide-to="${index}" aria-label="Show image ${index+1}: ${image.alt}" aria-pressed="${index===0}"><span></span></button>`).join('')}</div><span class="gallery-status" aria-live="polite" aria-atomic="true">1 / ${book.images.length}</span><button type="button" class="gallery-arrow" data-direction="1" aria-label="Next book image">→</button></div>`:''}</div>`;
}
function showSlide(gallery,index) {
 const slides=[...gallery.querySelectorAll('.featured-cover')];
 index=(index+slides.length)%slides.length;
 gallery.dataset.slide=String(index);
 slides.forEach((slide,i)=>{slide.hidden=i!==index;});
 gallery.querySelectorAll('[data-slide-to]').forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===index)));
 gallery.querySelector('.gallery-status').textContent=`${index+1} / ${slides.length}`;
}
grid.addEventListener('click',event=>{
 const control=event.target.closest('[data-direction],[data-slide-to]');
 if(!control)return;
 const gallery=control.closest('.book-gallery');
 showSlide(gallery,control.hasAttribute('data-slide-to')?Number(control.dataset.slideTo):Number(gallery.dataset.slide)+Number(control.dataset.direction));
});
grid.addEventListener('keydown',event=>{
 const gallery=event.target.closest('.book-gallery');
 if(!gallery||!gallery.querySelector('.gallery-controls')||!['ArrowLeft','ArrowRight'].includes(event.key))return;
 event.preventDefault();showSlide(gallery,Number(gallery.dataset.slide)+(event.key==='ArrowRight'?1:-1));
});
function render(filter='all') {
 const visible=books.filter(book=>filter==='all'||book.types.includes(filter));
 grid.innerHTML=visible.map(book=>`<article class="book-feature">
 ${gallery(book)}
 <div class="book-details"><p class="book-type">COMING SOON · PRE-ORDERS OPEN</p><div class="book-tags"><span>Storybook</span><span>Activity book</span><span>Ages ${book.age}</span></div><h3>${book.title}</h3><p class="book-subtitle">A Little Maths Adventure</p><p class="description">${book.description}</p><div class="discovery-list"><span>Count</span><span>Compare</span><span>Discover</span></div><p class="reading-note">Not released yet. Pre-order your copy today.<br>Message us for pricing and release details.</p><button class="button order" data-book="0">Pre-order now ↗</button></div></article>`).join('');
 document.querySelector('.empty').hidden=visible.length>0;
}
render();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render(button.dataset.filter);}));
const dialog=document.querySelector('dialog');
function order(book){if(storeDetails.whatsapp){window.open(`https://wa.me/${storeDetails.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(book?`Hello Pattu Books! I'd like to pre-order ${book.title}. Please share the price and release details.`:'Hello Pattu Books! I’d like to know more about pre-ordering Nila at Paatti’s Home.')}`,'_blank','noopener,noreferrer');return;}document.querySelector('#dialog-title').textContent=book?book.title:'Let’s find your next adventure.';document.querySelector('#dialog-copy').textContent=book?`A Little Maths Adventure · Ages ${book.age}. Read, count and play with Nila, Paatti and Pattu. Not released yet. Contact us on +94 70 185 6427 for pre-orders, pricing and release details.`:'Our ordering details will be here soon. In the meantime, discover Nila at Paatti’s Home.';dialog.showModal();}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-book]');if(b)order(books[Number(b.dataset.book)]);});document.querySelector('#contact-button').addEventListener('click',()=>order());document.querySelectorAll('.close,.close-dialog').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});document.querySelector('#year').textContent=new Date().getFullYear();
const socialLinks=[['instagram','Instagram'],['facebook','Facebook']].filter(([key])=>storeDetails[key]);if(socialLinks.length){const p=document.querySelector('.contact-status');p.replaceChildren();socialLinks.forEach(([key,label])=>{const a=document.createElement('a');a.href=storeDetails[key];a.textContent=label;a.style.margin='0 10px';a.rel='noopener noreferrer';a.target='_blank';p.append(a);});}
