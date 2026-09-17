const quoteForm=document.querySelector('.quote-form');
if(quoteForm){
 const responseMessage=document.getElementById('quote-response');
 quoteForm.addEventListener('submit',async event=>{
  event.preventDefault();if(!quoteForm.reportValidity())return;
  responseMessage.hidden=false;
  if(window.ROOFING_FORM_MODE!=='php'){responseMessage.textContent='This is a preview. No message was sent. Please call 905 317 2014 to request an estimate.';responseMessage.focus();return}
  const button=quoteForm.querySelector('button[type=submit]');button.disabled=true;responseMessage.textContent='Sending your request…';
  try{const response=await fetch(quoteForm.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(quoteForm),credentials:'same-origin'});const result=await response.json();responseMessage.textContent=result.message||'Your request could not be sent. Please call 905 317 2014.';if(response.ok&&result.success){quoteForm.reset();}}
  catch{responseMessage.textContent='We could not confirm that your message was sent. Please call 905 317 2014 before trying again.'}
  finally{button.disabled=false;responseMessage.focus()}
 });
}
