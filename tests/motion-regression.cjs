/* Logic regression checks. DOM/GSAP doubles do not replace visual browser QA. */
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname, '../dist/app.js'), 'utf8');
class Element {
  constructor(name) { this.name=name; this.attrs={}; this.listeners={}; this.open=false; this.alt=name; this.style={}; this.children=new Map(); this.classes=new Set();
    this.classList={add:(...x)=>x.forEach(v=>this.classes.add(v)),remove:(...x)=>x.forEach(v=>this.classes.delete(v)),contains:x=>this.classes.has(x),toggle:(x,on)=>{on??=!this.classes.has(x);on?this.classes.add(x):this.classes.delete(x);return on;}}; }
  addEventListener(type, fn, options={}) { const entry={fn,options};(this.listeners[type]??=[]).push(entry);options.signal?.addEventListener('abort',()=>{this.listeners[type]=this.listeners[type].filter(x=>x!==entry)},{once:true}); }
  emit(type,event={}) { for(const entry of [...(this.listeners[type]||[])]) {entry.fn(event);if(entry.options.once)this.listeners[type]=this.listeners[type].filter(x=>x!==entry);} }
  querySelector(s) { if(!this.children.has(s))this.children.set(s,new Element(this.name+' '+s));return this.children.get(s); }
  querySelectorAll(s) { return [this.querySelector(s)]; }
  closest(s) { return s==='dialog'?null:this.parent||this; }
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
  many('a[href="#contact"]',2);many('[data-lines]',1);many('.eyebrow',2);many('.closing-letter',18).forEach((letter,i)=>letter.setAttribute('x',String(i*160)));get('.closing-type').setAttribute('viewBox','0 0 3620 600');many('.plan-row',4);many('.purpose-card',3);many('.principle-card',4);
    const footerLinks=many('.footer-nav a',6);
  ['home','expertise','systems','experiencias','vinicius','contact'].forEach((id,i)=>footerLinks[i].setAttribute('data-section',id));
  many('.footer-main,.footer-bottom',2);
  many('.pillar',3).forEach(row=>{row.querySelectorAll=s=>s==='.stack-layer'?Array.from({length:3},(_,i)=>row.querySelector(s+i)):[row.querySelector(s)];});
  stacks.forEach((button,i)=>{button.parent=new Element('art'+i);button.parent.querySelector('.stack-layer-2').alt='panel'+i;});
  const timers=new Map(), raf=new Map(), timelines=[], colorTweens=[], ticks=new Set(), lenis=[], splitters=[];
  let seq=0, refreshes=0, observerDisconnected=false, cleanup, mmCallback;
  const flags={motion:options.motion??true,desktop:options.desktop??true,tall:options.tall??true,touch:options.touch??false,closingRoom:options.closingRoom??true,closingMobile:options.closingMobile??false};
  const timeline=opts=>{const t={opts,now:0,calls:[],from(...args){t.calls.push(['from',...args]);return t;},to(...args){t.calls.push(['to',...args]);return t;},fromTo(...args){t.calls.push(['fromTo',...args]);return t;},revert(){t.reverted=true;},time(){return t.now;},progress(){opts?.onComplete?.();return t;}};timelines.push(t);return t;};
  const mm={add(queries,cb){this.queries=queries;mmCallback=cb;cleanup=cb({conditions:flags});},revert(){cleanup?.();cleanup=null;},switch(next){this.revert();Object.assign(flags,next);cleanup=mmCallback({conditions:flags});}};
  const gsap={to(el,vars){const t={el,vars,kill(){this.killed=true;}};colorTweens.push(t);Object.assign(el.style,vars);return t;},registerPlugin(){},context(fn){const before=timelines.length;fn();const captured=timelines.slice(before);return {revert(){captured.forEach(t=>t.revert());}};},matchMedia:()=>mm,timeline,set(){},from(){},fromTo(){},quickTo:()=>()=>{},ticker:{add:f=>ticks.add(f),remove:f=>ticks.delete(f)},utils:{clamp:(a,b,n)=>Math.max(a,Math.min(b,n))}};
  class Lenis {constructor(){lenis.push(this);}on(){}raf(){}stop(){this.stopped=true;}start(){this.stopped=false;}destroy(){this.destroyed=true;}scrollTo(target,opts){this.lastScroll={target,opts};}}
  const context={window,document:doc,navigator:{hardwareConcurrency:options.lowPower?4:8},location:{hash:'',href:''},scrollY:0,innerWidth:1440,innerHeight:flags.tall?900:600,AbortController,Promise,
    setTimeout:fn=>{timers.set(++seq,fn);return seq;},clearTimeout:id=>timers.delete(id),requestAnimationFrame:fn=>{raf.set(++seq,fn);return seq;},cancelAnimationFrame:id=>raf.delete(id),
    matchMedia:q=>({matches:q.includes('hover: none')?flags.touch:q.includes('prefers-reduced-motion')?q.includes('no-preference')?flags.motion:!flags.motion:flags.desktop}),
    IntersectionObserver:class{observe(){}disconnect(){observerDisconnected=true;}},gsap,ScrollTrigger:{refresh(){refreshes++;},update(){}},SplitText:{create(){let split={revert(){split.reverted=true;}};splitters.push(split);return split;}},Lenis};
  const blueSurface=new Element('blue section'),lightSurface=new Element('light section');
  blueSurface.backgroundColor='rgb(1, 75, 170)';lightSurface.backgroundColor='rgb(248, 243, 240)';
  let probe=()=>[blueSurface];doc.elementsFromPoint=(x,y)=>probe(x,y);
  context.getComputedStyle=el=>({backgroundColor:el.backgroundColor||'rgba(0, 0, 0, 0)',scrollPaddingTop:'22px'});
  window.history={pushState:(state,title,hash)=>{context.location.hash=hash;window.lastHash=hash;}};
  window.scrollTo=opts=>{window.lastScroll=opts;};
  Object.assign(window,context);
  if(options.noGsap)delete window.gsap;
  if(options.noTrigger)delete window.ScrollTrigger;
  if(options.noSplit)delete window.SplitText;
  vm.runInNewContext(source,context,{filename:'app.js'});
  await Promise.resolve();await Promise.resolve();await Promise.resolve();
  const flush=()=>{for(const fn of raf.values())fn();raf.clear();};
  return {get,many,groups,doc,window,toggles,services,steps,stacks,footerLinks,timelines,colorTweens,blueSurface,lightSurface,setProbe:fn=>{probe=fn;},ticks,lenis,splitters,flags,mm,flush,context,raf,get refreshes(){return refreshes;},get disconnected(){return observerDisconnected;}};
}
(async()=>{
  const cases=[];
  const check=(name,fn)=>{fn();cases.push(name);};
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
  check('Desktop retains two sticky scenes and creates the editorial finale pin',()=>{assert(h.get('.approach-track').classes.has('is-opening'));assert(h.get('.method-track').classes.has('is-sequenced'));assert(h.get('.closing-track').classes.has('is-opening'));assert.equal(h.ticks.size,1);});
  const finale=h.timelines.find(t=>t.opts?.scrollTrigger?.id==='vf-editorial-finale');
  check('Finale has one timeline, native pin, reserved spacing and 280vh duration',()=>{assert.equal(h.timelines.filter(t=>t.opts?.scrollTrigger?.id==='vf-editorial-finale').length,1);assert.equal(finale.opts.scrollTrigger.pin,h.get('.closing-stage'));assert.equal(finale.opts.scrollTrigger.pinSpacing,true);assert.equal(finale.opts.scrollTrigger.pinType,'transform');h.window.scrollY=1234;assert.equal(finale.opts.scrollTrigger.start(),1234);assert.equal(finale.opts.scrollTrigger.end(),'+=2520');});
  check('Finale compositing hints apply only while active',()=>{const layers=[...h.groups.get('.closing-letter'),h.get('.closing-heading'),h.get('.closing-art')];finale.opts.scrollTrigger.onToggle({isActive:true});assert(layers.every(x=>x.style.willChange==='transform'));finale.opts.scrollTrigger.onToggle({isActive:false});assert(layers.every(x=>x.style.willChange===''));assert.equal(finale.opts.scrollTrigger.scrub,true);});
  check('Finale compresses eighteen glyphs to the center with no vertical dispersion',()=>{
    const letters=h.groups.get('.closing-letter');
    const opening=finale.calls.find(c=>c[0]==='fromTo'&&c[1]?.[0]===letters[0]);
    const centers=letters.map(el=>Number(el.getAttribute('x')));
    const start=centers.map((x,i)=>x+opening[2].x(i));
    assert(Math.max(...start)-Math.min(...start)<60,'Initial glyphs must overlap');
    assert.equal(opening[3].x,0);assert.equal(opening[2].y,undefined);assert.equal(opening[3].y,undefined);
    const dispersion=finale.calls.find(c=>c[0]==='to'&&c[1]?.[0]===letters[0]);
    assert(dispersion[2].x(0)<0&&dispersion[2].x(17)>0);
    assert.equal(dispersion[2].y,undefined);
  });
  check('Finale expands the original horizontal artwork to the viewport',()=>{
    const art=h.get('.closing-art');
    const finalArt=finale.calls.find(c=>c[0]==='to'&&c[1]===art);
    assert.equal(finalArt[2].width,'100%');assert.equal(finalArt[2].height,'100%');
    assert.equal(finale.opts.defaults.ease,'none');
  });
  check('Height participates in matchMedia lifecycle',()=>assert.equal(h.mm.queries.tall,'(min-height: 650px)'));
  const method=h.timelines.find(t=>t.opts?.scrollTrigger?.trigger===h.get('.method-track'));
  check('Method refresh restores semantics after a silent timeline seek',()=>{method.now=4;method.opts.scrollTrigger.onRefresh({animation:method});assert.deepEqual(h.steps.map(s=>s.attrs['aria-hidden']),['true','true','true','false']);});
  check('Method accessible stage follows forward and reverse timeline',()=>{for(const [time,index] of [[0,0],[.83,1],[1.83,2],[2.83,3],[4,3],[1.2,1],[0,0]]){method.now=time;method.opts.onUpdate.call(method);assert.deepEqual(h.steps.map(s=>s.attrs['aria-hidden']),h.steps.map((_,i)=>String(i!==index)));}});
  check('Menu pauses Lenis, closes, returns focus',()=>{h.toggles[0].emit('click');assert(h.lenis[0].stopped);assert(h.get('#menu-dialog').open);h.get('#menu-dialog').close();assert(!h.lenis[0].stopped);assert(h.toggles[0].focused);assert.equal(h.toggles[0].attrs['aria-expanded'],'false');});
  check('Hash navigation forces immediate anchor alignment',()=>{h.context.location.hash='#plano';h.window.emit('hashchange');assert.equal(h.lenis[0].lastScroll.target,h.get('#plano'));assert.equal(h.lenis[0].lastScroll.opts.immediate,true);});
  h.mm.switch({tall:false});
  check('Finale breakpoint rebuild reverts its previous scoped timeline',()=>{assert(finale.reverted);assert.equal(h.timelines.filter(t=>t.opts?.scrollTrigger?.id==='vf-editorial-finale'&&!t.reverted).length,1);});
  check('Below 650px method returns to flow while finale remains available',()=>{assert(!h.get('.approach-track').classes.has('is-opening'));assert(!h.get('.method-track').classes.has('is-sequenced'));assert(h.get('.closing-track').classes.has('is-opening'));assert(h.steps.every(s=>s.attrs['aria-hidden']===undefined));assert(h.lenis[0].destroyed);assert.equal(h.ticks.size,1);});
  h.mm.switch({tall:true});
  check('Height restoration rebuilds sticky scenes',()=>{assert(h.get('.method-track').classes.has('is-sequenced'));assert.equal(h.ticks.size,1);});
  h.mm.switch({desktop:false});
  check('Mobile removes Lenis, classes, and hidden steps',()=>{assert.equal(h.ticks.size,0);assert(h.lenis.at(-1).destroyed);assert(h.steps.every(s=>s.attrs['aria-hidden']===undefined));assert(!h.get('.pillars').classes.has('has-parallax'));});
  h.mm.switch({desktop:true,motion:true});h.mm.switch({motion:false});
  check('Reduced motion clears active contexts and releases intro',()=>{assert.equal(h.ticks.size,0);assert(h.splitters.every(s=>s.reverted));assert(!h.doc.documentElement.classes.has('intro-pending'));assert(!h.get('.closing-track').classes.has('is-opening'));assert(h.timelines.filter(t=>t.opts?.scrollTrigger?.id==='vf-editorial-finale').every(t=>t.reverted));assert.equal(h.get('.closing-type').getAttribute('viewBox'),'0 0 3620 600');assert.equal(h.groups.get('.closing-letter')[1].getAttribute('x'),'160');});
  h=await boot({noSplit:true});
  check('Optional SplitText failure preserves other animations',()=>{assert(h.get('.method-track').classes.has('is-sequenced'));assert.equal(h.splitters.length,0);});
  check('Font/load refresh requests coalesce',()=>{h.flush();const before=h.refreshes;h.doc.fonts.emit('loadingdone');h.window.emit('load');assert.equal(h.raf.size,2);h.flush();assert.equal(h.refreshes,before+1);});
  check('BFCache return refreshes retained contexts',()=>{h.window.emit('pagehide',{persisted:true});assert.equal(h.ticks.size,1);const before=h.refreshes;h.window.emit('pageshow',{persisted:true});assert.equal(h.refreshes,before+1);});
  check('Real page exit destroys ticker, observers, listeners',()=>{h.window.emit('pagehide',{persisted:false});assert.equal(h.ticks.size,0);assert(h.disconnected);assert(h.lenis.at(-1).destroyed);assert.equal(h.window.listeners.hashchange.length,0);assert.equal(h.raf.size,0);});
  for(const failure of ['noGsap','noTrigger']) {
    h=await boot({[failure]:true});
    check(failure+' fallback releases loader and cleans base handlers',()=>{assert(!h.doc.documentElement.classes.has('intro-pending'));h.toggles[0].emit('click');assert(h.get('#menu-dialog').open);h.get('#menu-dialog').close();h.window.emit('pagehide',{persisted:false});assert(h.disconnected);assert.equal(h.toggles[0].listeners.click.length,0);});
  }
  h=await boot({touch:true,desktop:false});
  check('Touch draws first tap, permits navigation second tap, resets blur',()=>{let prevented=0;h.services[0].emit('click',{preventDefault(){prevented++;}});assert(h.services[0].classes.has('is-active'));h.services[0].emit('click',{preventDefault(){prevented++;}});assert.equal(prevented,1);h.services[0].emit('blur');assert(!h.services[0].classes.has('is-active'));});
  check('Stack controls expose state and retain panel subject',()=>{h.stacks[0].emit('click');assert.equal(h.stacks[0].attrs['aria-expanded'],'true');assert.equal(h.stacks[0].attrs['aria-label'],'Fechar composição: panel0');h.stacks[0].emit('click');assert.equal(h.stacks[0].attrs['aria-label'],'Abrir composição: panel0');assert(!h.stacks[0].parent.classes.has('is-expanded'));});
  h=await boot({desktop:false,closingMobile:true});
  check('Mobile finale keeps native scroll and reduces pin duration to 200vh',()=>{const t=h.timelines.find(t=>t.opts?.scrollTrigger?.id==='vf-editorial-finale');assert(t);assert.equal(t.opts.scrollTrigger.end(),'+=1800');assert.equal(t.calls.find(c=>c[0]==='to'&&c[1]===h.get('.closing-art'))[2].height,'68%');assert.equal(h.ticks.size,0);});
  h.mm.switch({closingRoom:false});
  check('Very short viewport removes finale pin context',()=>assert(!h.get('.closing-track').classes.has('is-opening')));
  h=await boot();h.flush();const beforeImage=h.refreshes;h.get('.closing-art-image').emit('load');h.flush();
  check('Editorial image load refreshes geometry once',()=>{assert.equal(h.refreshes,beforeImage+1);h.get('.closing-art-image').emit('load');h.flush();assert.equal(h.refreshes,beforeImage+1);});
  h=await boot({lowPower:true});
  check('Low power keeps static readable layout without smooth-scroll ticker',()=>{assert.equal(h.ticks.size,0);assert(!h.get('.method-track').classes.has('is-sequenced'));assert(h.steps.every(s=>s.attrs['aria-hidden']===undefined));});
  console.log(JSON.stringify({passed:cases.length,checks:cases,scope:'Logic with DOM/GSAP doubles; visual rendering remains a separate browser audit.'},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
