/* Logic regression checks. DOM/GSAP doubles do not replace visual browser QA. */
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname, '../dist/app.js'), 'utf8');
class Element {
  constructor(name) { this.name=name; this.id=name.startsWith('#')?name.slice(1):''; this.attrs={}; this.listeners={}; this.open=false; this.alt=name; this.style={setProperty(k,v){this[k]=v;},removeProperty(k){delete this[k];}};this.offsetHeight=100;this.clientWidth=1440;this.clientHeight=900; this.children=new Map(); this.classes=new Set();
    this.classList={add:(...x)=>x.forEach(v=>this.classes.add(v)),remove:(...x)=>x.forEach(v=>this.classes.delete(v)),contains:x=>this.classes.has(x),toggle:(x,on)=>{on??=!this.classes.has(x);on?this.classes.add(x):this.classes.delete(x);return on;}}; }
  addEventListener(type, fn, options={}) { const entry={fn,options};(this.listeners[type]??=[]).push(entry);options.signal?.addEventListener('abort',()=>{this.listeners[type]=this.listeners[type].filter(x=>x!==entry)},{once:true}); }
  emit(type,event={}) { for(const entry of [...(this.listeners[type]||[])]) {entry.fn(event);if(entry.options.once)this.listeners[type]=this.listeners[type].filter(x=>x!==entry);} }
  querySelector(s) { if(!this.children.has(s))this.children.set(s,new Element(this.name+' '+s));return this.children.get(s); }
  querySelectorAll(s) { return [this.querySelector(s)]; }
  closest(s) { if(s==='.closing')return this.name==='final-eyebrow'?this.parent:null;return s==='dialog'?null:this.parent||this; }
  setAttribute(k,v) { this.attrs[k]=v; }
  getAttribute(k) { return this.attrs[k]??null; }
  removeAttribute(k) { delete this.attrs[k]; }
  getTotalLength() { return 1741; }
  getComputedTextLength() { return 160; }
  getBoundingClientRect() { return {left:0,top:0,right:100,bottom:100,width:100,height:100}; }
  showModal() { this.open=true; }
  close() {this.open=false;this.emit('close');}
  focus() { this.focused=true; }
}
async function boot(options={}) {
  const nodes=new Map(), groups=new Map(), window=new Element('window'), doc=new Element('document');
  const get=s=>{if(!nodes.has(s))nodes.set(s,new Element(s));return nodes.get(s);};
  const many=(s,n)=>{const a=Array.from({length:n},(_,i)=>new Element(s+i));groups.set(s,a);return a;};
  doc.querySelector=get;doc.querySelectorAll=s=>groups.get(s)||[];doc.getElementById=id=>get('#'+id);
  doc.documentElement=new Element('html');doc.documentElement.classList.add('intro-pending');
  doc.fonts=new Element('fonts');doc.fonts.ready=Promise.resolve();
  const toggles=many('[aria-controls="menu-dialog"]',2), services=many('.service',4), steps=many('.method-step',4), stacks=many('.stack-toggle',3);
  many('[data-contact]',13).forEach(a=>a.setAttribute('href','#contact'));many('a[href="#contact"]',2);many('a[href="#contact"]:not(.footer-nav a),a[data-contact]',4);many('a[href="#contact"]:not(.footer-nav a)',2);many('[data-lines]',1);many('.eyebrow',2).forEach((el,i)=>{if(i===1){el.name='final-eyebrow';el.parent=get('.closing');}});many('.closing-mask-position,.closing-logo-position',2);many('.closing-label,.closing-contact h2,.closing-description,.closing-cta',4);many('.plan-row',4);
    const footerLinks=many('.footer-nav a',6);
  ['home','expertise','systems','experiencias','fechamento','contact'].forEach((id,i)=>footerLinks[i].setAttribute('data-section',id));
  many('.footer-main,.footer-bottom',2);
  many('.pillar',3).forEach(row=>{row.querySelectorAll=s=>s==='.stack-layer'?Array.from({length:3},(_,i)=>row.querySelector(s+i)):[row.querySelector(s)];});
  stacks.forEach((button,i)=>{button.parent=new Element('art'+i);button.parent.querySelector('.stack-layer-2').alt='panel'+i;});
  const timers=new Map(), raf=new Map(), timelines=[], entrances=[], colorTweens=[], ticks=new Set(), lenis=[], splitters=[];
  let seq=0, refreshes=0, observerDisconnected=false, cleanup, mmCallback;const triggerRefreshHandlers=new Set();
  const flags={motion:options.motion??true,desktop:options.desktop??true,tall:options.tall??true,touch:options.touch??false,closingRoom:options.closingRoom??true,closingMobile:options.closingMobile??false,mobileMotion:options.mobileMotion??false};
  const timeline=opts=>{const t={opts,now:0,calls:[],from(...args){t.calls.push(['from',...args]);return t;},to(...args){t.calls.push(['to',...args]);return t;},fromTo(...args){t.calls.push(['fromTo',...args]);return t;},revert(){t.reverted=true;},time(){return t.now;},progress(){opts?.onComplete?.();return t;}};timelines.push(t);return t;};
  const mm={add(queries,cb){this.queries=queries;mmCallback=cb;cleanup=cb({conditions:flags});},revert(){cleanup?.();cleanup=null;},switch(next){this.revert();Object.assign(flags,next);cleanup=mmCallback({conditions:flags});}};
  const gsap={to(el,vars){const t={el,vars,kill(){this.killed=true;}};colorTweens.push(t);Object.assign(el.style,vars);return t;},registerPlugin(){},context(fn){const before=timelines.length;fn();const captured=timelines.slice(before);return {revert(){captured.forEach(t=>t.revert());}};},matchMedia:()=>mm,timeline,set(){},from(el,vars){entrances.push({el,vars});},fromTo(){},quickTo:()=>()=>{},ticker:{add:f=>ticks.add(f),remove:f=>ticks.delete(f)},utils:{clamp:(a,b,n)=>Math.max(a,Math.min(b,n))}};
  class Lenis {constructor(){this.limit=options.delayedDimensions?1000:50000;lenis.push(this);}on(){}raf(){}resize(){this.resized=true;this.limit=50000;}stop(){this.stopped=true;}start(){this.stopped=false;}destroy(){this.destroyed=true;}scrollTo(target,opts){if(typeof target==='number')target=Math.min(target,this.limit);this.lastScroll={target,opts};}}
  const context={window,document:doc,navigator:{hardwareConcurrency:options.cores??8,connection:{saveData:options.lowPower??false}},location:{hash:options.initialHash||'',href:''},scrollY:0,innerWidth:1440,innerHeight:flags.tall?900:600,AbortController,Promise,URL,
    setTimeout:fn=>{timers.set(++seq,fn);return seq;},clearTimeout:id=>timers.delete(id),requestAnimationFrame:fn=>{raf.set(++seq,fn);return seq;},cancelAnimationFrame:id=>raf.delete(id),
    matchMedia:q=>({matches:q.includes('hover: none')?flags.touch:q.includes('prefers-reduced-motion')?q.includes('no-preference')?flags.motion:!flags.motion:flags.desktop}),
    IntersectionObserver:class{observe(){}disconnect(){observerDisconnected=true;}},gsap,ScrollTrigger:{addEventListener(type,fn){if(type==='refresh')triggerRefreshHandlers.add(fn);},removeEventListener(type,fn){triggerRefreshHandlers.delete(fn);},refresh(){refreshes++;for(const fn of triggerRefreshHandlers)fn();},update(){},getById(id){const t=timelines.findLast(t=>t.opts?.scrollTrigger?.id===id&&!t.reverted);return t?{...t.opts.scrollTrigger,start:0,end:Number(t.opts.scrollTrigger.end().slice(2))}:undefined;}},SplitText:{create(){let split={revert(){split.reverted=true;}};splitters.push(split);return split;}},Lenis};
  const blueSurface=new Element('blue section'),lightSurface=new Element('light section');
  blueSurface.backgroundColor='rgb(1, 75, 170)';lightSurface.backgroundColor='rgb(248, 243, 240)';
  let probe=()=>[blueSurface];doc.elementsFromPoint=(x,y)=>probe(x,y);
  context.getComputedStyle=el=>({getPropertyValue:k=>k==='--layer-opacity'?(el.name.includes('closing-grain')?'.12':el.name.includes('closing-stroke')?'.65':'1'):'',backgroundColor:el.backgroundColor||'rgba(0, 0, 0, 0)',scrollPaddingTop:'22px',opacity:el.name.includes('closing-grain')?'.12':el.name.includes('closing-stroke')?'.65':'1'});
  window.history={pushState:(state,title,hash)=>{context.location.hash=hash;window.lastHash=hash;}};
  window.scrollTo=opts=>{window.lastScroll=opts;};
  Object.assign(window,context);
  window.VINICIUS_CONFIG={whatsappUrl:options.whatsappUrl,whatsappNumber:options.whatsappNumber||'',whatsappMessage:'Olá, Vinicius. Vi seu site e gostaria de conversar sobre a estrutura comercial da minha empresa.'};
  if(options.noGsap)delete window.gsap;
  if(options.noTrigger)delete window.ScrollTrigger;
  if(options.noSplit)delete window.SplitText;
  vm.runInNewContext(source,context,{filename:'app.js'});
  if(options.earlyLoad){window.emit('load');for(const fn of raf.values())fn();raf.clear();}
  await Promise.resolve();await Promise.resolve();await Promise.resolve();
  const flush=()=>{for(const fn of raf.values())fn();raf.clear();};
  return {flushTimers(){const pending=[...timers.values()];timers.clear();pending.forEach(fn=>fn());},triggerRefreshHandlers,get,many,groups,doc,window,toggles,services,steps,stacks,footerLinks,timelines,entrances,colorTweens,blueSurface,lightSurface,setProbe:fn=>{probe=fn;},ticks,lenis,splitters,flags,mm,flush,context,raf,get refreshes(){return refreshes;},get disconnected(){return observerDisconnected;}};
}
(async()=>{
  const cases=[];
  const check=(name,fn)=>{fn();cases.push(name);};
  const contactMessage='Olá, Vinicius. Vi seu site e gostaria de conversar sobre a estrutura comercial da minha empresa.';
  const whatsapp=await boot({whatsappNumber:'+1 (555) 555-0100'});
  check('All thirteen conversion CTAs share the configured recipient and encoded message, with secure new tabs',()=>{
    const links=whatsapp.groups.get('[data-contact]');assert.equal(links.length,13);
    for(const link of links){const u=new URL(link.getAttribute('href'));assert.equal(u.hostname,'wa.me');assert.equal(u.pathname,'/15555550100');assert.equal(u.searchParams.get('text'),contactMessage);assert.equal(link.attrs.target,'_blank');assert.equal(link.attrs.rel,'noopener noreferrer');}
    assert(whatsapp.footerLinks.every(l=>l.getAttribute('href').startsWith('#')));
  });
  const officialUrl = 'https://wa.me/5531993806300?text=Ol%C3%A1,%20Vin%C3%ADcius!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20entender%20como%20podemos%20organizar%20melhor%20nossa%20opera%C3%A7%C3%A3o.';
  const officialWhatsapp = await boot({whatsappUrl: officialUrl});
  check('All thirteen conversion CTAs consume the exact official WhatsApp URL with target _blank and noopener noreferrer',()=>{
    const links=officialWhatsapp.groups.get('[data-contact]');assert.equal(links.length,13);
    for(const link of links){
      assert.equal(link.getAttribute('href'), officialUrl);
      assert.equal(link.attrs.target,'_blank');
      assert.equal(link.attrs.rel,'noopener noreferrer');
    }
  });
  const missingContact=await boot();
  check('Missing recipient is never invented and no temporary contact message is rendered',()=>{
    assert(missingContact.groups.get('[data-contact]').every(a=>a.attrs['aria-disabled']==='true'&&a.attrs.href==='#contact'));
    assert(!source.includes('O WhatsApp ainda não foi informado'));
    assert(!source.includes('contact-status'));
  });
  const invalidContact=await boot({whatsappNumber:'abc'});
  check('An invalid WhatsApp recipient cannot become an outbound link',()=>assert(invalidContact.groups.get('[data-contact]').every(a=>a.attrs.href==='#contact')));
  const direct=await boot({initialHash:'#contact',earlyLoad:true,delayedDimensions:true});direct.flush();direct.flushTimers();direct.flush();
  check('Direct contact waits for motion and refreshes Lenis bounds after pins',()=>{assert.equal(direct.lenis[0].lastScroll.target,1530);assert.equal(direct.lenis[0].lastScroll.opts.immediate,true);assert(direct.lenis[0].resized);});
  const directReduced=await boot({initialHash:'#contact',earlyLoad:true,motion:false});directReduced.flush();directReduced.flushTimers();directReduced.flush();
  check('Direct contact hash also aligns in reduced-motion flow',()=>{assert.equal(directReduced.window.lastScroll.behavior,'auto');assert.equal(directReduced.lenis.length,0);});
  const footer=await boot();
  const footEvent={button:0,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};
  footer.footerLinks[3].emit('click',footEvent);
  check('Footer navigation preserves smooth Lenis scroll and avoids immediate hash handler',()=>{
    assert.equal(footer.lenis[0].lastScroll.target,footer.get('#experiencias'));
    assert.equal(footer.lenis[0].lastScroll.opts.duration,1.05);
    assert.equal(footer.lenis[0].lastScroll.opts.offset,undefined,'Lenis already applies scroll-padding');
    assert.equal(footer.window.lastHash,'#experiencias');assert.ok(footEvent.prevented&&footEvent.stopped);
  });
  const modified={button:0,ctrlKey:true,preventDefault(){this.prevented=true;}};
  footer.footerLinks[0].emit('click',modified);
  check('Footer modified click retains normal link behavior',()=>assert.equal(modified.prevented,undefined));
  const footerReduced=await boot({motion:false});
  footerReduced.footerLinks[5].emit('click',{button:0,preventDefault(){},stopPropagation(){}});
  check('Reduced motion footer anchor scrolls immediately without Lenis',()=>{
    assert.equal(footerReduced.lenis.length,0);assert.equal(footerReduced.window.lastScroll.behavior,'auto');
    assert.equal(footerReduced.window.lastHash,'#contact');
  });
  let rail=await boot();rail.flush();
  check('Rail begins cream with official brand color over blue',()=>{assert.equal(rail.get('.rail-home').attrs['data-surface'],'blue');assert.equal(rail.get('.rail-home').style.backgroundColor,'#F8F3F0');assert.equal(rail.colorTweens.at(-1).vars.duration,0);});
  rail.get('.floating-nav').classList.add('is-visible');
  rail.setProbe((x,y)=>[y<50?rail.blueSurface:rail.lightSurface]);rail.window.emit('scroll');rail.flush();
  check('Rail holds its palette across a mixed 4px boundary',()=>assert.equal(rail.colorTweens.length,1));
  rail.setProbe(()=>[rail.lightSurface]);rail.window.emit('scroll');rail.flush();
  check('Rail inverts on light with isolated 450ms power2 transition',()=>{assert.equal(rail.get('.rail-home').style.backgroundColor,'#014BAA');assert.equal(rail.get('.rail-home').style.color,'#F8F3F0');assert.equal(rail.colorTweens.at(-1).vars.duration,.45);assert.equal(rail.colorTweens.at(-1).vars.ease,'power2.out');assert.equal(rail.colorTweens.at(-1).el,rail.get('.rail-home'));assert.equal(rail.get('.rail-menu').style.backgroundColor,undefined);});
  rail.window.emit('scroll');rail.flush();
  check('Rail does not restart an unchanged color transition',()=>assert.equal(rail.colorTweens.length,2));
  rail.setProbe(()=>[rail.blueSurface]);rail.window.emit('scroll');rail.flush();
  check('Rail reverses, supersedes old tween and cleans up on exit',()=>{assert.equal(rail.get('.rail-home').style.backgroundColor,'#F8F3F0');assert(rail.colorTweens[1].killed);rail.window.emit('pagehide',{persisted:false});assert(rail.colorTweens.at(-1).killed);assert.equal(rail.raf.size,0);});
  let plainRail=await boot({noGsap:true});plainRail.setProbe(()=>[plainRail.lightSurface]);plainRail.flush();
  check('Rail color inversion survives missing animation libraries',()=>{assert(plainRail.get('.rail-home').classes.has('is-color-fallback'));assert.equal(plainRail.get('.rail-home').style.backgroundColor,'#014BAA');});
  let reducedRail=await boot({motion:false});reducedRail.flush();reducedRail.get('.floating-nav').classList.add('is-visible');reducedRail.setProbe(()=>[reducedRail.lightSurface]);reducedRail.window.emit('scroll');reducedRail.flush();
  check('Rail respects reduced motion without removing color contrast',()=>{assert.equal(reducedRail.colorTweens.at(-1).vars.duration,0);assert.equal(reducedRail.get('.rail-home').style.color,'#F8F3F0');});
  let h=await boot();
  check('Desktop retains two sticky scenes and creates one clean brand reveal pin',()=>{assert(h.get('.approach-track').classes.has('is-opening'));assert(h.get('.method-track').classes.has('is-sequenced'));assert(h.get('.closing-track').classes.has('is-revealing'));assert.equal(h.ticks.size,1);});
  const finale=h.timelines.find(t=>t.opts?.scrollTrigger?.id==='vf-brand-finale');
  check('Finale copy has no time-based entrance outside its scrub timeline',()=>{assert(!h.entrances.some(t=>t.el.name==='final-eyebrow'));assert(h.entrances.some(t=>t.el===h.groups.get('.eyebrow')[0]));});
  check('Finale has one timeline, one pin, reserved spacing and 170vh duration',()=>{assert.equal(h.timelines.filter(t=>t.opts?.scrollTrigger?.id==='vf-brand-finale').length,1);assert.equal(finale.opts.scrollTrigger.pin,h.get('.closing-stage'));assert.equal(finale.opts.scrollTrigger.pinSpacing,true);assert.equal(finale.opts.scrollTrigger.pinType,'transform');h.window.scrollY=1234;assert.equal(finale.opts.scrollTrigger.start(),1234);assert.equal(finale.opts.scrollTrigger.end(),'+=1530');});
  check('Finale compositing hints are released outside its active pin',()=>{const copy=h.groups.get('.closing-label,.closing-contact h2,.closing-description,.closing-cta');finale.opts.scrollTrigger.onToggle({isActive:true});assert.equal(h.get('.closing-curtain').style.willChange,'opacity');assert(copy.every(x=>x.style.willChange==='transform,opacity'));finale.opts.scrollTrigger.onToggle({isActive:false});assert(copy.every(x=>x.style.willChange===''));assert.equal(finale.opts.scrollTrigger.scrub,true);});
  check('Official mark positions use a centered, undistorted 80:48 coordinate space',()=>{
    const positions=h.groups.get('.closing-mask-position,.closing-logo-position');
    assert.equal(h.get('.closing-curtain').getAttribute('viewBox'),'0 0 1440 900');
    for(const position of positions){const [x,y,scale]=position.getAttribute('transform').match(/-?[\d.]+/g).map(Number);assert(Math.abs(x+40*scale-720)<.001);assert(Math.abs(y+24*scale-450)<.001);assert(scale>1&&scale<3);}
    assert(finale.calls.some(c=>c[0]==='fromTo'&&c[1]===h.get('.closing-aperture')));
  });
  check('The aperture opens about a filled part of the V and covers the viewport',()=>{
    const reveal=finale.calls.find(c=>c[0]==='fromTo'&&c[1]===h.get('.closing-aperture'));
    assert(reveal);assert.equal(reveal[2].attr.transform,'translate(30 28) scale(1) translate(-30 -28)');
    const target=reveal[3].attr.transform();const zoom=Number(target.match(/scale\(([^)]+)\)/)[1]);assert(zoom>200);
    assert(target.startsWith('translate(30 28)')&&target.endsWith('translate(-30 -28)'));
    assert.equal(reveal[3].width,undefined);assert.equal(reveal[3].height,undefined);
    assert.equal(finale.opts.defaults.ease,'none');
  });
  check('Portrait stays in its final layout while copy enters later in sequence',()=>{
    const portrait=finale.calls.find(c=>c[0]==='fromTo'&&c[1]===h.get('.closing-portrait-plane'));
    const copy=finale.calls.find(c=>c[0]==='fromTo'&&c[1]?.[0]===h.groups.get('.closing-label,.closing-contact h2,.closing-description,.closing-cta')[0]);
    assert(portrait&&copy);assert.equal(portrait[2].scale,undefined);assert.equal(portrait[3].y,0);assert(copy[4]>portrait[4]);assert(copy[3].stagger>0);
  });
  check('Contact focus follows forward, reverse and refreshed progress',()=>{
    for(const progress of [0,.3,.7,.9,.95,1,.7,0]){finale.opts.scrollTrigger.onUpdate({progress});assert.equal(h.get('.closing-contact').inert,progress<.86);}
    finale.opts.scrollTrigger.onRefresh({progress:1});assert.equal(h.get('.closing-contact').inert,false);
  });
  check('Contact links stop delegated Lenis anchors from overriding the completed reveal',()=>{
    const e={button:0,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};
    h.groups.get('a[href="#contact"]:not(.footer-nav a)')[0].emit('click',e);
    assert(e.prevented&&e.stopped);assert.equal(h.lenis[0].lastScroll.target,1530);
  });
  check('Pillar numbers travel continuously from below to above with three grouped timelines',()=>{
    const rows=h.timelines.filter(t=>t.opts?.scrollTrigger?.id?.startsWith('vf-pillar-'));
    assert.equal(rows.length,3);
    for(const t of rows){assert.equal(t.opts.scrollTrigger.start(),334);assert.equal(t.opts.scrollTrigger.end(),1334);const n=t.calls[0];assert.equal(n[2].yPercent,64);assert.equal(n[3].yPercent,-58);assert.equal(t.calls.filter(c=>c[0]==='fromTo').length,5);}
  });
  check('Footer contact anchor reaches the completed pin, with a smooth scroll',()=>{
    h.footerLinks[5].emit('click',{button:0,preventDefault(){},stopPropagation(){}});
    assert.equal(h.lenis[0].lastScroll.target,1530);assert.equal(h.lenis[0].lastScroll.opts.duration,1.05);
  });
  check('Height participates in matchMedia lifecycle',()=>assert.equal(h.mm.queries.tall,'(min-height: 650px)'));
  const method=h.timelines.find(t=>t.opts?.scrollTrigger?.trigger===h.get('.method-track'));
  check('Method refresh restores semantics after a silent timeline seek',()=>{method.now=4;method.opts.scrollTrigger.onRefresh({animation:method});assert.deepEqual(h.steps.map(s=>s.attrs['aria-hidden']),['true','true','true','false']);});
  check('Method accessible stage follows forward and reverse timeline',()=>{for(const [time,index] of [[0,0],[.83,1],[1.83,2],[2.83,3],[4,3],[1.2,1],[0,0]]){method.now=time;method.opts.onUpdate.call(method);assert.deepEqual(h.steps.map(s=>s.attrs['aria-hidden']),h.steps.map((_,i)=>String(i!==index)));}});
  check('Menu pauses Lenis, closes, returns focus',()=>{h.toggles[0].emit('click');assert(h.lenis[0].stopped);assert(h.get('#menu-dialog').open);h.get('#menu-dialog').close();assert(!h.lenis[0].stopped);assert(h.toggles[0].focused);assert.equal(h.toggles[0].attrs['aria-expanded'],'false');});
  check('Hash navigation forces immediate anchor alignment',()=>{h.context.location.hash='#plano';h.window.emit('hashchange');assert.equal(h.lenis[0].lastScroll.target,h.get('#plano'));assert.equal(h.lenis[0].lastScroll.opts.immediate,true);});
  h.mm.switch({tall:false});
  check('Finale breakpoint rebuild reverts its previous scoped timeline',()=>{assert(finale.reverted);assert.equal(h.timelines.filter(t=>t.opts?.scrollTrigger?.id==='vf-brand-finale'&&!t.reverted).length,1);});
  check('Below 650px method returns to flow while finale remains available',()=>{assert(!h.get('.approach-track').classes.has('is-opening'));assert(!h.get('.method-track').classes.has('is-sequenced'));assert(h.get('.closing-track').classes.has('is-revealing'));assert(h.steps.every(s=>s.attrs['aria-hidden']===undefined));assert(h.lenis[0].destroyed);assert.equal(h.ticks.size,1);});
  h.mm.switch({tall:true});
  check('Height restoration rebuilds sticky scenes',()=>{assert(h.get('.method-track').classes.has('is-sequenced'));assert.equal(h.ticks.size,1);});
  h.mm.switch({desktop:false,mobileMotion:true});
  check('Mobile keeps radial and opening sequences plus one roadmap sequence, while retaining native scroll',()=>{assert.equal(h.ticks.size,0);assert(h.lenis.at(-1).destroyed);assert(h.get('.method-track').classes.has('is-sequenced'));assert(h.get('.approach-track').classes.has('is-opening'));assert(h.get('.plan-track').classes.has('is-stacked'));assert(h.get('.pillars').classes.has('has-parallax'));});
  const roadmap=h.timelines.findLast(t=>t.opts?.scrollTrigger?.id==='vf-roadmap-mobile');
  check('Mobile roadmap states follow forward, backward and refreshed scroll positions',()=>{for(const [time,index] of [[0,0],[1.1,1],[2.1,2],[3.2,3],[1.2,1],[0,0]]){roadmap.now=time;roadmap.opts.onUpdate.call(roadmap);assert.deepEqual(h.groups.get('.plan-row').map(row=>row.attrs['aria-hidden']),[0,1,2,3].map(i=>String(i!==index)));}roadmap.now=4;roadmap.opts.scrollTrigger.onRefresh({animation:roadmap});assert.equal(h.groups.get('.plan-row')[3].attrs['aria-hidden'],'false');});
  h.mm.switch({desktop:true,mobileMotion:false,motion:true});h.mm.switch({motion:false});
  check('Reduced motion clears active contexts and releases intro',()=>{assert.equal(h.ticks.size,0);assert(h.splitters.every(s=>s.reverted));assert(!h.doc.documentElement.classes.has('intro-pending'));assert(!h.get('.closing-track').classes.has('is-revealing'));assert(h.timelines.filter(t=>t.opts?.scrollTrigger?.id==='vf-brand-finale').every(t=>t.reverted));assert.equal(h.get('.closing-track').style['--closing-distance'],undefined);assert.equal(h.get('.closing-curtain').getAttribute('viewBox'),null);assert.equal(h.get('.closing-aperture').getAttribute('transform'),null);assert(h.groups.get('.closing-mask-position,.closing-logo-position').every(x=>x.getAttribute('transform')===null));});
  h=await boot({noSplit:true});
  check('Optional SplitText failure preserves other animations',()=>{assert(h.get('.method-track').classes.has('is-sequenced'));assert.equal(h.splitters.length,0);});
  check('Font/load refresh requests coalesce',()=>{h.flush();const before=h.refreshes;h.doc.fonts.emit('loadingdone');h.window.emit('load');assert.equal(h.raf.size,2);h.flush();assert.equal(h.refreshes,before+1);});
  check('BFCache return refreshes retained contexts',()=>{h.window.emit('pagehide',{persisted:true});assert.equal(h.ticks.size,1);const before=h.refreshes;h.window.emit('pageshow',{persisted:true});assert.equal(h.refreshes,before+1);});
  check('Real page exit destroys ticker, observers, listeners',()=>{h.window.emit('pagehide',{persisted:false});assert.equal(h.ticks.size,0);assert(h.disconnected);assert(h.lenis.at(-1).destroyed);assert.equal(h.window.listeners.hashchange.length,0);assert.equal(h.raf.size,0);assert.equal(h.triggerRefreshHandlers.size,0);});
  for(const failure of ['noGsap','noTrigger']) {
    h=await boot({[failure]:true});
    check(failure+' fallback releases loader and cleans base handlers',()=>{assert(!h.doc.documentElement.classes.has('intro-pending'));h.toggles[0].emit('click');assert(h.get('#menu-dialog').open);h.get('#menu-dialog').close();h.window.emit('pagehide',{persisted:false});assert(h.disconnected);assert.equal(h.toggles[0].listeners.click.length,0);});
  }
  h=await boot({touch:true,desktop:false,mobileMotion:true});
  check('Touch stroke responds to pointerdown without consuming the CTA click',()=>{let prevented=0;h.services[0].emit('pointerdown');assert(h.services[0].classes.has('is-active'));h.services[0].emit('click',{preventDefault(){prevented++;}});assert.equal(prevented,0);h.services[0].emit('blur');assert(!h.services[0].classes.has('is-active'));});
  check('Stack controls expose state and retain panel subject',()=>{h.stacks[0].emit('click');assert.equal(h.stacks[0].attrs['aria-expanded'],'true');assert.equal(h.stacks[0].attrs['aria-label'],'Fechar composição: panel0');h.stacks[0].emit('click');assert.equal(h.stacks[0].attrs['aria-label'],'Abrir composição: panel0');assert(!h.stacks[0].parent.classes.has('is-expanded'));});
  h=await boot({desktop:false,closingMobile:true});
  check('Mobile brand reveal keeps native scroll and reduces pin duration to 120vh',()=>{const t=h.timelines.find(t=>t.opts?.scrollTrigger?.id==='vf-brand-finale');assert(t);assert.equal(t.opts.scrollTrigger.end(),'+=1080');assert(t.calls.some(c=>c[0]==='fromTo'&&c[1]===h.get('.closing-scene')));assert.equal(h.ticks.size,0);});
  h.mm.switch({closingRoom:false});
  check('Very short viewport removes finale pin context',()=>assert(!h.get('.closing-track').classes.has('is-revealing')));
  h=await boot();h.flush();const beforeImage=h.refreshes;h.get('.closing-art-image').emit('load');h.flush();
  check('Editorial image load refreshes geometry once',()=>{assert.equal(h.refreshes,beforeImage+1);h.get('.closing-art-image').emit('load');h.flush();assert.equal(h.refreshes,beforeImage+1);});
  h=await boot({desktop:false,mobileMotion:true,cores:4});
  check('A four-core mobile device retains radial, roadmap and final reveal choreography',()=>{assert(h.get('.method-track').classes.has('is-sequenced'));assert(h.get('.plan-track').classes.has('is-stacked'));assert(h.get('.closing-track').classes.has('is-revealing'));});
  h.mm.switch({motion:false});
  check('Reduced motion clears mobile sequence classes and restores all roadmap content',()=>{assert(!h.get('.plan-track').classes.has('is-stacked'));assert(!h.get('.method-track').classes.has('is-sequenced'));assert(h.groups.get('.plan-row').every(r=>r.attrs['aria-hidden']===undefined));});
  h=await boot({lowPower:true});
  check('Low power keeps static readable layout without smooth-scroll ticker',()=>{assert.equal(h.ticks.size,0);assert(!h.get('.method-track').classes.has('is-sequenced'));assert(h.steps.every(s=>s.attrs['aria-hidden']===undefined));assert(!h.timelines.some(t=>t.opts?.scrollTrigger?.id==='vf-brand-finale'));});
  console.log(JSON.stringify({passed:cases.length,checks:cases,scope:'Logic with DOM/GSAP doubles; visual rendering remains a separate browser audit.'},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
