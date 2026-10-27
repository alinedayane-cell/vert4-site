(() => {
  'use strict';
  const questions=['Quem está chegando?','O valor está claro?','Como a conversa está sendo conduzida?'];
  const tabs=[...document.querySelectorAll('[role="tab"]')];
  const nodes=[...document.querySelectorAll('.node[data-axis]')];
  const panels=[...document.querySelectorAll('[role="tabpanel"]')];
  function selectAxis(index,focus=false){
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
    nodes.forEach((node,i)=>{node.classList.toggle('is-active',i===index);node.setAttribute('aria-pressed',String(i===index));});
    panels.forEach((panel,i)=>{panel.hidden=i!==index;panel.classList.remove('panel-changing');});
    const current=panels[index];if(current)requestAnimationFrame(()=>current.classList.add('panel-changing'));
    const number=document.getElementById('hero-axis-number'),question=document.getElementById('hero-axis-question');
    if(number)number.textContent=String(index+1).padStart(2,'0')+' / 03';if(question)question.textContent=questions[index];
    if(focus)tabs[index].focus();
  }
  if(tabs.length){document.querySelectorAll('[data-axis]').forEach(button=>button.addEventListener('click',()=>selectAxis(Number(button.dataset.axis))));tabs.forEach((tab,index)=>tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%3;if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+2)%3;if(event.key==='Home')next=0;if(event.key==='End')next=2;if(next!==undefined){event.preventDefault();selectAxis(next,true);}}));selectAxis(0);}
  const menuButton=document.querySelector('.menu-toggle'),menu=document.getElementById('navigation');
  if(menuButton&&menu){function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');menu.classList.remove('is-open');}menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.classList.toggle('is-open',open);});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});}
  const progress=document.querySelector('.read-progress i');if(progress){let scheduled=false;function update(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(max>0?Math.min(1,Math.max(0,scrollY/max)):0)+')';scheduled=false;}addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();}
  if(menu&&'IntersectionObserver' in window){const links=[...menu.querySelectorAll('a[href^="#"]')];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('#metodo,#como-funciona,#ofertas,#aline,#perguntas').forEach(section=>observer.observe(section));}
})();
