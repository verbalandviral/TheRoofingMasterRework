document.querySelectorAll('[data-comparison]').forEach(figure=>{
 const stage=figure.querySelector('.comparison-stage'),range=figure.querySelector('input[type="range"]');
 function render(){const after=Number(range.value);stage.style.setProperty('--split',(100-after)+'%');range.setAttribute('aria-valuetext',after+' percent after image revealed');}
 range.addEventListener('input',render);
 figure.querySelectorAll('[data-side]').forEach(button=>button.addEventListener('click',()=>{range.value=button.dataset.side==='after'?'100':'0';render()}));
 let dragging=false;
 function move(event){const rect=stage.getBoundingClientRect();range.value=String(Math.round(100-Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width))*100));render()}
 stage.addEventListener('pointerdown',event=>{if(event.button!==0)return;dragging=true;stage.setPointerCapture(event.pointerId);move(event)});
 stage.addEventListener('pointermove',event=>{if(dragging)move(event)});
 stage.addEventListener('pointerup',()=>{dragging=false});stage.addEventListener('pointercancel',()=>{dragging=false});stage.addEventListener('lostpointercapture',()=>{dragging=false});render();
});
