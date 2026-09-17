const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const opening=document.getElementById('opening'),fill=document.getElementById('loading-fill');
const showOpening=!opening.hidden;
const started=performance.now();
const critical=[...document.querySelectorAll('.opening img,.hero-photo')];let loaded=0;
const ready=Promise.all(critical.map(img=>new Promise(resolve=>{function done(){loaded++;fill.style.width=`${Math.round(loaded/critical.length*100)}%`;resolve()}if(img.complete)done();else{img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true})}})));
let opened=false;
function enterSite(){if(opened)return;opened=true;opening.classList.add('done');opening.setAttribute('aria-hidden','true');document.dispatchEvent(new Event('site-ready'))}
ready.then(()=>setTimeout(enterSite,!showOpening||reduced?0:Math.max(0,2500-(performance.now()-started))));
setTimeout(enterSite,5000);
if(!showOpening||reduced){opening.style.display='none'}
if(!reduced&&'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
const scene=document.querySelector('.roof-scene');
if(scene){
 const slider=document.getElementById('repair-progress'),toggle=document.getElementById('repair-toggle'),label=document.getElementById('repair-label');
 let value=0,playing=false,frame=0,lastTime=0,hold=0;
 function render(){scene.style.setProperty('--repair',value+'%');slider.value=String(Math.round(value));label.textContent=value<=0?'01 / Weathered roof':value>=100?'03 / Restored roof':'02 / Restoring the roof';slider.setAttribute('aria-valuetext',Math.round(value)+' percent restored');toggle.textContent=value>=100?'Replay ↻':playing?'Pause Ⅱ':'Play ▷';scene.classList.toggle('running',playing&&value>0&&value<100)}
 function stop(){playing=false;cancelAnimationFrame(frame);render()}
 function tick(now){if(!playing)return;const dt=Math.min(now-lastTime,80);lastTime=now;if(hold>0)hold-=dt;else value=Math.min(100,value+dt/60);if(value>=100)playing=false;render();if(playing)frame=requestAnimationFrame(tick)}
 function play(){if(value>=100){value=0;hold=1200}playing=true;lastTime=performance.now();render();frame=requestAnimationFrame(tick)}
 toggle.addEventListener('click',()=>playing?stop():play());
 slider.addEventListener('input',()=>{const selected=Number(slider.value);stop();value=selected;render()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stop()});
 document.addEventListener('site-ready',()=>ready.then(()=>{if(reduced){value=100;render()}else{hold=1500;play()}}),{once:true});
 render();
}
const viewer=document.querySelector('.lightbox');
if(viewer){
 const links=[...document.querySelectorAll('.photo-open')];let index=0,trigger=null;
 const photo=document.getElementById('lightbox-image'),caption=document.getElementById('photo-caption'),count=document.getElementById('photo-count');
 function show(i){index=(i+links.length)%links.length;const source=links[index].querySelector('img');photo.src=links[index].href;photo.alt=source.alt;caption.textContent=links[index].closest('figure').querySelector('h2').textContent;count.textContent=`${String(index+1).padStart(2,'0')} / ${String(links.length).padStart(2,'0')}`}
 links.forEach((link,i)=>link.addEventListener('click',e=>{if(typeof viewer.showModal!=='function')return;e.preventDefault();trigger=link;show(i);viewer.showModal();document.body.style.overflow='hidden'}));
 viewer.querySelector('.lightbox-close').addEventListener('click',()=>viewer.close());
 viewer.querySelector('.lightbox-prev').addEventListener('click',()=>show(index-1));
 viewer.querySelector('.lightbox-next').addEventListener('click',()=>show(index+1));
 viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}});
 viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});
 viewer.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus()});
}

