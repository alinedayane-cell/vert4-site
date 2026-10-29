(() => {
  'use strict';
  const hero=document.getElementById('inicio');
  const offer=document.getElementById('oferta');
  const dock=document.querySelector('.diagnostic-dock');
  if(!hero||!offer||!dock)return;
  let framePending=false;
  function update(){
    const heroRect=hero.getBoundingClientRect();
    const offerRect=offer.getBoundingClientRect();
    const heroVisible=heroRect.bottom>100&&heroRect.top<innerHeight;
    const offerVisible=offerRect.bottom>100&&offerRect.top<innerHeight;
    const visible=!heroVisible&&!offerVisible&&heroRect.bottom<=100;
    dock.hidden=!visible;
    document.body.classList.toggle('mobile-action-visible',visible);
    framePending=false;
  }
  function schedule(){if(!framePending){framePending=true;requestAnimationFrame(update);}}
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(schedule,{rootMargin:'-100px 0px 0px',threshold:[0,.01]});observer.observe(hero);observer.observe(offer);}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  addEventListener('pageshow',schedule);
  update();
})();
