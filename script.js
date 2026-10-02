/* =========================================================
   INSPIRA FAM EXPERIENCE 2026 — SCRIPT NOVO
========================================================= */
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];

/* MENU MOBILE */
const menuToggle=$(".menu-toggle");
menuToggle?.addEventListener("click",()=>{
  const open=document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("menu-open")));

/* REVEAL — funciona em desktop e mobile */
const reveals=$$(".reveal");
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
    });
  },{threshold:.08,rootMargin:"0px 0px -30px"});
  reveals.forEach(el=>observer.observe(el));
}else reveals.forEach(el=>el.classList.add("visible"));

/* PROGRAMAÇÃO */
$$(".schedule-tab").forEach(tab=>tab.addEventListener("click",()=>{
  $$(".schedule-tab").forEach(x=>x.classList.toggle("active",x===tab));
  $$(".schedule-panel").forEach(panel=>panel.classList.toggle("active",panel.dataset.schedulePanel===tab.dataset.schedule));
}));

/* EXPERIÊNCIAS */
const experienceModal=$("#experience-modal");
$$("[data-experience]").forEach(card=>{
  const activate=()=>card.classList.add("touch-active");
  const deactivate=()=>setTimeout(()=>card.classList.remove("touch-active"),160);
  card.addEventListener("touchstart",activate,{passive:true});
  card.addEventListener("touchend",deactivate,{passive:true});
  card.addEventListener("click",()=>{
    const [title,text]=(card.dataset.experience||"|").split("|");
    if(!experienceModal)return;
    $("#modal-title").textContent=title;
    $("#modal-text").textContent=text;
    experienceModal.showModal();
  });
});
$(".modal-close")?.addEventListener("click",()=>experienceModal?.close());
experienceModal?.addEventListener("click",e=>{if(e.target===experienceModal)experienceModal.close()});

/* INSCRIÇÕES */
const GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycbxbSTueVdVNfdViHDP-6d4dbNetiok3GNjG8w5axyjhwZ6ui2hI89c8EG1awpvVl8bQ/exec";
const formsSection=$("#forms"),visitorForm=$("#visitor-form"),commercialForm=$("#commercial-form");
const result=$("#form-result"),resultAgain=$("#result-again");

function openForm(type){
  if(!formsSection)return;
  formsSection.hidden=false; result.hidden=true; resultAgain.hidden=true; $(".form-heading").hidden=false; $$("[data-form]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.form===type)));
  const commercial=type==="commercial";
  visitorForm.hidden=commercial; commercialForm.hidden=!commercial;
  $("#form-title").innerHTML=commercial?"INTERESSE<br><i>COMERCIAL.</i>":"INSCRIÇÃO<br><i>VISITANTE.</i>";
  $("#form-description").textContent=commercial?"Conte sobre sua marca e como gostaria de participar.":"Preencha seus dados. A entrada é gratuita, mas a inscrição é necessária para acesso.";
  setTimeout(()=>formsSection.scrollIntoView({behavior:"smooth",block:"start"}),50);
}
$$("[data-form]").forEach(btn=>btn.addEventListener("click",()=>openForm(btn.dataset.form)));

function chamarGoogle(params){
  return new Promise((resolve,reject)=>{
    const callbackName="__inspira_"+Date.now()+"_"+Math.floor(Math.random()*1e6);
    const script=document.createElement("script");
    let done=false;
    const cleanup=()=>{delete window[callbackName];script.remove()};
    const timer=setTimeout(()=>{if(done)return;done=true;cleanup();reject(new Error("Tempo de resposta excedido."))},30000);
    window[callbackName]=data=>{if(done)return;done=true;clearTimeout(timer);cleanup();resolve(data)};
    script.onerror=()=>{if(done)return;done=true;clearTimeout(timer);cleanup();reject(new Error("Não foi possível conectar ao sistema de inscrições."))};
    const query=new URLSearchParams({...params,callback:callbackName,_:Date.now()});
    script.src=GOOGLE_SCRIPT_URL+"?"+query.toString();
    document.body.appendChild(script);
  });
}

function setLoading(form,loading){
  const btn=$(".submit-button",form);
  if(!btn)return;
  btn.disabled=loading;
  btn.dataset.original ||= btn.innerHTML;
  btn.innerHTML=loading?"ENVIANDO...":btn.dataset.original;
}
function showResult({kicker,title,text,duplicate=false}){
  visitorForm.hidden=true;commercialForm.hidden=true;$(".form-heading").hidden=true;
  result.hidden=false;$("#result-kicker").textContent=kicker;$("#result-title").innerHTML=title;$("#result-text").textContent=text;
  resultAgain.hidden=!duplicate;
  result.scrollIntoView({behavior:"smooth",block:"center"});
}
resultAgain?.addEventListener("click",()=>{result.hidden=true;$(".form-heading").hidden=false;openForm("visitor");visitorForm.reset()});

visitorForm?.addEventListener("submit",async e=>{
  e.preventDefault(); if(!visitorForm.reportValidity())return;
  clearFormError(visitorForm); setLoading(visitorForm,true);
  try{
    const data=Object.fromEntries(new FormData(visitorForm));
    const response=await chamarGoogle({action:"cadastrarvisitante",...data});
    if(response.status==="EMAIL_DUPLICADO"){
      showResult({kicker:"SUA INSCRIÇÃO JÁ EXISTE",title:"VOCÊ JÁ TÁ<br><i>DENTRO.</i>",text:"Este e-mail já possui uma inscrição no Inspira FAM 2026. Nos vemos de 9 a 12 de novembro.",duplicate:true});
    }else if(response.sucesso){
      showResult({kicker:"INSCRIÇÃO CONFIRMADA!",title:"VOCÊ ESTÁ<br><i>NO INSPIRA FAM.</i>",text:response.emailEnviado===false?"Sua inscrição foi registrada, mas houve um problema ao enviar o e-mail de confirmação.":"Sua inscrição foi registrada. Confira seu e-mail para receber a confirmação e as informações do evento."});
      visitorForm.reset();
    }else throw new Error(response.mensagem||"Não foi possível concluir a inscrição.");
  }catch(err){showFormError(visitorForm, err.message);}
  finally{setLoading(visitorForm,false)}
});

commercialForm?.addEventListener("submit",async e=>{
  e.preventDefault(); if(!commercialForm.reportValidity())return;
  clearFormError(commercialForm); setLoading(commercialForm,true);
  try{
    const data=Object.fromEntries(new FormData(commercialForm));
    const response=await chamarGoogle({action:"cadastrarcomercial",...data});
    if(response.sucesso){
      showResult({kicker:"INTERESSE RECEBIDO!",title:"OBRIGADO POR<br><i>FAZER PARTE.</i>",text:response.emailEnviado===false?"Seu interesse foi registrado, mas houve um problema ao enviar o e-mail de confirmação.":"Recebemos seus dados. Enviamos uma confirmação por e-mail; a equipe poderá entrar em contato sobre as possibilidades de participação."});
      commercialForm.reset();
    }else throw new Error(response.mensagem||"Não foi possível enviar seu interesse.");
  }catch(err){showFormError(commercialForm, err.message);}
  finally{setLoading(commercialForm,false)}
});
/* Gallery: touch, keyboard and accessible enlargement */
const track=$('.gallery-track'), cards=$$('[data-gallery]'), galleryDialog=$('#gallery-modal');
let galleryIndex=0;
function moveGallery(direction){track?.scrollBy({left:direction*(track.querySelector('.memory-card')?.offsetWidth+24||300),behavior:'smooth'})}
$('.gallery-prev')?.addEventListener('click',()=>moveGallery(-1));
$('.gallery-next')?.addEventListener('click',()=>moveGallery(1));
track?.addEventListener('keydown',e=>{if(e.target===track&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();moveGallery(e.key==='ArrowLeft'?-1:1)}});
function showGallery(index){galleryIndex=(index+cards.length)%cards.length;const copy=cards[galleryIndex].cloneNode(true);copy.removeAttribute('data-gallery');copy.removeAttribute('aria-label');copy.setAttribute('tabindex','-1');$('#gallery-detail').replaceChildren(copy)}
cards.forEach((card,i)=>card.addEventListener('click',()=>{showGallery(i);galleryDialog.showModal()}));
$('.gallery-close')?.addEventListener('click',()=>galleryDialog.close());
$('.detail-prev')?.addEventListener('click',()=>showGallery(galleryIndex-1));
$('.detail-next')?.addEventListener('click',()=>showGallery(galleryIndex+1));
galleryDialog?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')showGallery(galleryIndex-1);if(e.key==='ArrowRight')showGallery(galleryIndex+1)});
galleryDialog?.addEventListener('click',e=>{if(e.target===galleryDialog)galleryDialog.close()});
function closeMenu(){document.body.classList.remove('menu-open');menuToggle?.setAttribute('aria-expanded','false');menuToggle?.setAttribute('aria-label','Abrir menu')}
$$('.nav-links a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
menuToggle?.addEventListener('click',()=>menuToggle.setAttribute('aria-label',document.body.classList.contains('menu-open')?'Fechar menu':'Abrir menu'));
window.matchMedia('(min-width:760px)').addEventListener('change',e=>{if(e.matches)closeMenu()});

function clearFormError(form){$(".form-status",form)?.remove()}
function showFormError(form,message){clearFormError(form);const status=document.createElement("p");status.className="form-status full";status.setAttribute("role","alert");status.textContent="Não foi possível concluir agora. "+message+" Tente novamente.";form.append(status)}

/* =========================================================
   RETORNO / NAVEGAÇÃO
   O alvo #top fica no body, não no cabeçalho fixo.
   O link continua funcionando mesmo sem JavaScript.
========================================================= */
$$('[data-back-top], .brand-link[href="#top"]').forEach(link=>{
  link.addEventListener('click',event=>{
    event.preventDefault();
    closeMenu();
    window.scrollTo({top:0,left:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    history.replaceState(null,'',location.pathname+location.search+'#top');
  });
});
$$('[data-back-event]').forEach(link=>{
  // Resolução relativa: funciona tanto na pasta local quanto no site publicado.
  link.href=new URL('./index.html',document.baseURI).href;
});
