(() => {
'use strict';
const menu = document.querySelector('#menu-dialog');
let menuOpener;
const toggles = document.querySelectorAll('[aria-controls="menu-dialog"]');
toggles.forEach(button => button.addEventListener('click', () => {menuOpener=button;menu.showModal();toggles.forEach(b=>b.setAttribute('aria-expanded','true'));}));
const closeMenu=()=>menu.close();
menu.querySelector('.close-menu').addEventListener('click',closeMenu);
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
menu.addEventListener('click',e=>{if(e.target===menu && e.clientX<menu.getBoundingClientRect().left)closeMenu();});
menu.addEventListener('close',()=>{toggles.forEach(b=>b.setAttribute('aria-expanded','false'));menuOpener?.focus({preventScroll:true});});
const contactUrl=window.VINICIUS_CONFIG?.contactUrl || '';
const contactButton=document.querySelector('.contact-action');
if (/^(https:\/\/|mailto:|tel:)/i.test(contactUrl)) {
 document.querySelectorAll('a[href="#contact"]').forEach(a=>{a.href=contactUrl;});
 contactButton.removeAttribute('aria-disabled');contactButton.removeAttribute('title');
 contactButton.addEventListener('click',()=>{window.location.href=contactUrl;});
} else {
 contactButton.addEventListener('click',()=>{document.querySelector('#contact-status').textContent='O canal de contato será disponibilizado em breve.';});
}
const rail=document.querySelector('.floating-nav'),chat=document.querySelector('.chat-link');
new IntersectionObserver(([entry])=>{const shown=!entry.isIntersecting;[rail,chat].forEach(el=>{el.classList.toggle('is-visible',shown);el.inert=!shown;});},{threshold:.3}).observe(document.querySelector('.hero'));
if(!window.gsap || !window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger,SplitText);
const mm=gsap.matchMedia();
document.fonts.ready.then(()=>{
mm.add('(prefers-reduced-motion: no-preference)',()=>{
const tl=gsap.timeline({defaults:{ease:'power3.out'}});
tl.from('.hero-monogram',{opacity:0,scale:.97,duration:1.05},0)
.from('.hero-portrait',{opacity:0,y:22,duration:1.1},.08)
.from('.hero-heading span',{yPercent:105,clipPath:'inset(0 0 100% 0)',stagger:.07,duration:.85},.15)
.from('.name-layer',{opacity:0,y:18,duration:.8},.4);
gsap.utils.toArray('[data-reveal]').forEach((el)=>gsap.from(el,{y:22,opacity:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
gsap.utils.toArray('[data-clip]').forEach((el)=>gsap.from(el,{clipPath:'inset(12% 0 12% 0)',opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
const splitters=gsap.utils.toArray('[data-lines]').map(el=>SplitText.create(el,{type:'lines',mask:'lines',autoSplit:true,onSplit(self){return gsap.from(self.lines,{yPercent:104,duration:.75,stagger:.055,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}});}}));
gsap.to('.inner-rays',{rotation:12,ease:'none',scrollTrigger:{trigger:'.approach',start:'top bottom',end:'bottom top',scrub:1.2}});
const desktop=gsap.matchMedia();desktop.add('(min-width: 1025px)',()=>{gsap.to('.hero-monogram',{y:24,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});});
return()=>{splitters.forEach(s=>s.revert());desktop.revert();};
});
});
})();
