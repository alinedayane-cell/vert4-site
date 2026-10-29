(() => {
  'use strict';
  const ID='2345575089312148',KEY='vert4-marketing-consent-v1';
  const banner=document.getElementById('cookie-banner'),closeButton=document.getElementById('cookie-close'),status=document.getElementById('consent-status');
  let choice=null,initialized=false,pageSent=false,returnFocus=null;
  try{const saved=localStorage.getItem(KEY);if(saved==='accepted'||saved==='rejected')choice=saved;}catch{}
  function track(event,standard=false){if(choice!=='accepted'||!initialized||typeof window.fbq!=='function')return;window.fbq(standard?'trackSingle':'trackSingleCustom',ID,event);}
  function start(){
    if(choice!=='accepted')return;
    if(!window.fbq){const queue=window.fbq=function(){queue.callMethod?queue.callMethod.apply(queue,arguments):queue.queue.push(arguments);};queue.push=queue;queue.loaded=true;queue.version='2.0';queue.queue=[];window._fbq=queue;}
    window.fbq('consent','grant');
    if(!initialized){window.fbq('set','autoConfig',false,ID);window.fbq('init',ID);initialized=true;
      const script=document.createElement('script');script.async=true;script.id='vert4-meta-pixel';script.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(script);}
    if(!pageSent){track('PageView',true);pageSent=true;}
  }
  function clearAdvertisingCookies(){['_fbp','_fbc'].forEach(name=>{document.cookie=name+'=; Max-Age=0; path=/; SameSite=Lax';const host=location.hostname;if(host&&host!=='localhost'&&!/^\d+\.\d+\.\d+\.\d+$/.test(host)){const domains=[host];if(host==='vert4comercial.com'||host.endsWith('.vert4comercial.com'))domains.push('vert4comercial.com');domains.forEach(domain=>{document.cookie=name+'=; Max-Age=0; path=/; domain=.'+domain+'; SameSite=Lax';});}});}
  function hide(){if(banner)banner.hidden=true;if(returnFocus){returnFocus.focus();returnFocus=null;}}
  function choose(value,persist=true){if(value!=='accepted'&&value!=='rejected')return;choice=value;if(persist)try{localStorage.setItem(KEY,value);}catch{}if(value==='accepted')start();else{if(typeof window.fbq==='function')window.fbq('consent','revoke');clearAdvertisingCookies();}hide();if(status)status.textContent=value==='accepted'?'Cookies de publicidade aceitos.':'Cookies de publicidade recusados.';}
  document.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>choose(button.dataset.consent)));
  document.querySelectorAll('.cookie-settings').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;if(banner)banner.hidden=false;if(closeButton)closeButton.hidden=choice===null;const first=banner?.querySelector('[data-consent]');first?.focus();}));
  closeButton?.addEventListener('click',hide);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&returnFocus&&choice!==null)hide();});
  addEventListener('storage',event=>{if(event.key===KEY){if(event.newValue==='accepted'||event.newValue==='rejected')choose(event.newValue,false);else{choice=null;if(typeof window.fbq==='function')window.fbq('consent','revoke');if(banner)banner.hidden=false;}}});
  document.addEventListener('click',event=>{const link=event.target.closest?.('a[href]');if(!link)return;let url;try{url=new URL(link.href,location.href);}catch{return;}let name;if(url.hostname==='vert4comercial.com'&&url.pathname==='/mapa/quiz.html')name='institucional_clique_diagnostico';else if(url.hostname==='vert4comercial.com'&&url.pathname==='/mapa/')name='institucional_clique_mapa';else if(url.hostname==='pay.hotmart.com')name='institucional_clique_hotmart';else if(url.hostname==='wa.me')name='institucional_clique_whatsapp';else if(url.hostname==='aluno.vert4comercial.com')name='institucional_clique_aluno';if(name)track(name);});
  if(choice==='accepted')start();else if(choice===null&&banner)banner.hidden=false;
})();
