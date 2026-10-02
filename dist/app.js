(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const events = new AbortController();
  const listen = (el, type, fn, options = {}) => el.addEventListener(type, fn, { ...options, signal: events.signal });
  const releaseIntro = () => {
    clearTimeout(window.vfIntroGuard);
    document.documentElement.classList.remove('intro-pending');
  };
  const menu = $('#menu-dialog');
  const toggles = all('[aria-controls="menu-dialog"]');
  let menuOpener, menuMotion, smoothScroll;
  const closeMenu = () => menu.close();
  toggles.forEach(button => listen(button, 'click', () => {
    menuOpener = button;
    menu.showModal();
    smoothScroll?.stop();
    toggles.forEach(b => b.setAttribute('aria-expanded', 'true'));
    if (window.gsap && !reduced()) {
      menuMotion?.revert();
      menuMotion = gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(menu, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: .48 })
        .fromTo(menu.querySelectorAll('nav a'), { x: 25, opacity: 0 }, { x: 0, opacity: 1, duration: .4, stagger: .045 }, .12);
    }
  }));
  listen(menu.querySelector('.close-menu'), 'click', closeMenu);
  menu.querySelectorAll('a').forEach(link => listen(link, 'click', closeMenu));
  listen(menu, 'click', e => {
    const box = menu.getBoundingClientRect();
    if (e.target === menu && (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom)) closeMenu();
  });
  listen(window, 'hashchange', () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target && smoothScroll) smoothScroll.scrollTo(target, { immediate: true, force: true });
  });
  listen(menu, 'close', () => {
    smoothScroll?.start();
    menuMotion?.revert();
    toggles.forEach(b => b.setAttribute('aria-expanded', 'false'));
    menuOpener?.focus({ preventScroll: true });
  });
  const contactUrl = window.VINICIUS_CONFIG?.contactUrl || '';
  const contactButton = $('.contact-action');
  if (/^(https:\/\/|mailto:|tel:)/i.test(contactUrl)) {
    all('a[href="#contact"]').forEach(a => { a.href = contactUrl; });
    contactButton.removeAttribute('aria-disabled');
    contactButton.removeAttribute('title');
    listen(contactButton, 'click', () => { window.location.href = contactUrl; });
  } else {
    listen(contactButton, 'click', () => { $('#contact-status').textContent = 'O canal de contato será disponibilizado em breve.'; });
  }
  const floating = [$('.floating-nav'), $('.chat-link')];
  const observer = new IntersectionObserver(([entry]) => {
    const shown = !entry.isIntersecting;
    floating.forEach(el => { el.classList.toggle('is-visible', shown); el.inert = !shown; });
  }, { threshold: .3 });
  observer.observe($('.hero'));
  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) { releaseIntro(); return; }
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const mm = gsap.matchMedia();
  let disposed = false, introPlayed = false;
  const lowPower = navigator.connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const enter = (trigger, start = 'top 91%') => ({ trigger, start, toggleActions: 'play none none none' });
  const clean = 'transform,opacity,filter,clipPath,willChange';

  // Bounded font wait: a slow connection must never hold the page behind a loader.
  Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 250))]).then(() => {
    if (disposed) return;
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1025px) and (hover: hover) and (pointer: fine)' }, context => {
      if (!context.conditions.motion) { releaseIntro(); return; }
      const desktop = context.conditions.desktop && !lowPower;
      const splitters = [], restores = [], pointerEvents = new AbortController();
      const distance = desktop ? 32 : 18;
      let scrollFrame;
      if (desktop && window.Lenis) {
        smoothScroll = new Lenis({ lerp: .13, smoothWheel: true, syncTouch: false,
          anchors: true, stopInertiaOnNavigate: true, prevent: node => node.closest?.('dialog') });
        smoothScroll.on('scroll', ScrollTrigger.update);
        const instance = smoothScroll;
        scrollFrame = time => instance.raf(time * 1000);
        gsap.ticker.add(scrollFrame);
        if (menu.open) smoothScroll.stop();
      }
      const listenPointer = (el, type, fn) => el.addEventListener(type, fn, { passive: true, signal: pointerEvents.signal });
      const introActive = !introPlayed && document.documentElement.classList.contains('intro-pending') && scrollY < 30;
      introPlayed = true;
      if (introActive) {
        const introEvents = new AbortController();
        restores.push(() => introEvents.abort());
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { releaseIntro(); introEvents.abort(); } });
        intro.fromTo('.intro-logo', { clipPath: 'inset(100% 0 0 0)', y: 8 }, { clipPath: 'inset(0% 0 0 0)', y: 0, duration: .4 }, 0)
          .fromTo('.intro-track i', { scaleX: 0 }, { scaleX: 1, duration: .52, ease: 'power2.inOut' }, .05)
          .to('.intro-curtain', { clipPath: 'inset(0 0 100% 0)', duration: .7, ease: 'power3.inOut' }, .38)
          .from('.hero-monogram', { scale: 1.045, clipPath: 'inset(0 0 100% 0)', duration: 1.05, clearProps: clean }, .48)
          .from('.hero-portrait', { clipPath: 'inset(100% 0 0 0)', y: 20, duration: 1.08, clearProps: clean }, .57)
          .from('.hero-heading span', { yPercent: 104, clipPath: 'inset(0 0 100% 0)', duration: .68, stagger: .065, clearProps: clean }, .65)
          .from('.name-rear', { y: 30, clipPath: 'inset(100% 0 0 0)', duration: .7, clearProps: clean }, .92)
          .from('.name-front', { y: 17, clipPath: 'inset(100% 0 0 0)', duration: .72, clearProps: clean }, 1.02)
          .from('.header-logo,.header-nav a,.talk-pill,.mobile-menu', { y: -12, opacity: 0, duration: .45, stagger: .035, clearProps: clean }, .86);
        // Native scrolling and navigation are never blocked by the intro.
        const skipIntro = () => { intro.progress(1); releaseIntro(); };
        ['wheel', 'touchstart', 'keydown'].forEach(type => window.addEventListener(type, skipIntro, { passive: true, signal: introEvents.signal }));
      } else releaseIntro();

      // SplitText keeps accessible source text and rebuilds line masks on reflow.
      all('[data-lines]').forEach(el => {
        splitters.push(SplitText.create(el, {
          type: 'lines', mask: 'lines', autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, { yPercent: 105, duration: el.closest('.contact') ? .95 : .78,
              stagger: .065, ease: 'power3.out', scrollTrigger: enter(el), clearProps: 'transform' });
          }
        }));
      });
      all('.eyebrow').forEach(el => gsap.from(el, { clipPath: 'inset(0 100% 0 0)', duration: .7, ease: 'power3.out', scrollTrigger: enter(el), clearProps: clean }));
      gsap.from('.expertise-context img', { clipPath: 'inset(0 0 100% 0)', scale: 1.025, duration: .9, ease: 'power3.inOut', scrollTrigger: enter('.expertise-context'), clearProps: clean });
      all('.service').forEach((card, i) => {
        gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: enter(card) })
          .from(card, { clipPath: 'inset(0 0 100% 0 round 7px)', y: distance, duration: .72, delay: (i % 2) * .09, clearProps: clean })
          .from(card.querySelectorAll('.service-label,h3,.service-arrow'), { y: 14, opacity: 0, duration: .5, stagger: .065, clearProps: clean }, '<+.14');
      });
      const approach = gsap.timeline({ scrollTrigger: enter('.approach-panel', 'top 85%'), defaults: { ease: 'power3.out' } });
      if (desktop) {
        gsap.fromTo('.approach-panel', { clipPath: 'inset(8% 36% 8% 36% round 15px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 15px)', ease: 'power2.inOut',
            scrollTrigger: { trigger: '.approach', start: 'top 92%', end: 'top 18%', scrub: .45 } });
      } else approach.from('.approach-panel', { clipPath: 'inset(8% 2% 8% 2% round 15px)', duration: .8, clearProps: clean });
      approach.fromTo('.outer-rays line', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .9, stagger: { amount: .35, from: 'center' }, clearProps: 'strokeDasharray,strokeDashoffset' }, .1)
        .from('.inner-rays line', { scale: .7, opacity: 0, transformOrigin: 'center center', duration: .55, stagger: { amount: .45 }, clearProps: 'transform,opacity' }, .22)
        .from('.cream-button', { y: 14, clipPath: 'inset(0 0 100% 0)', duration: .65, clearProps: clean }, .5);
      if (desktop) gsap.to('.inner-rays', { rotation: 14, ease: 'none', scrollTrigger: { trigger: '.approach', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      all('.client').forEach((card, i) => {
        gsap.timeline({ scrollTrigger: enter(card), defaults: { ease: 'power3.out' } })
          .from(card, { clipPath: 'inset(0 0 100% 0 round 7px)', duration: .75, delay: (i % (desktop ? 3 : 2)) * .065, clearProps: clean })
          .from(card.querySelector('img'), { y: 14, scale: .97, duration: .7, clearProps: clean }, '<+.08');
      });
      gsap.from('#systems-heading', { clipPath: 'inset(0 0 100% 0)', y: 20, duration: .85, ease: 'power3.out', scrollTrigger: enter('#systems-heading'), clearProps: clean });
      gsap.from('.underlined', { '--line-scale': 0, duration: .7, ease: 'power3.inOut', scrollTrigger: enter('#systems-heading', 'top 65%') });
      const diagram = gsap.timeline({ scrollTrigger: enter('.systems-diagram'), defaults: { ease: 'power2.out' } });
      diagram.from('.system-hub', { scale: .7, transformOrigin: 'center center', opacity: 0, duration: .4, clearProps: 'transform,opacity' })
        .fromTo('.system-connections path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .8, stagger: .1, clearProps: 'strokeDasharray,strokeDashoffset' }, .15)
        .from('.system-node', { opacity: 0, scale: .93, transformOrigin: 'center center', duration: .5, stagger: .12, clearProps: 'transform,opacity' }, .32);
      gsap.from('.systems-scale', { clipPath: 'inset(100% 0 0 0)', y: 20, duration: .95, ease: 'power3.out', scrollTrigger: enter('.systems-scale'), clearProps: clean });
      all('.pillar').forEach(row => {
        const number = row.querySelector('.pillar-number');
        const original = number.textContent;
        const target = parseInt(original, 10);
        const count = { value: 0 };
        number.setAttribute('aria-label', original);
        restores.push(() => { number.textContent = original; number.style.minWidth = ''; });
        const timeline = gsap.timeline({ scrollTrigger: enter(row, 'top 87%'), defaults: { ease: 'power3.out' } });
        timeline.from(row, { '--rule-scale': 0, duration: .9 })
          .from(number, { y: 22, clipPath: 'inset(0 0 100% 0)', filter: desktop ? 'blur(3px)' : 'none', duration: .8, clearProps: clean }, 0)
          .to(count, { value: target, duration: 1.05, ease: 'power2.out', onStart() { number.style.minWidth = number.getBoundingClientRect().width + 'px'; }, onUpdate() { number.textContent = Math.round(count.value) + (original.includes('/') ? '/7' : ''); }, onComplete() { number.textContent = original; number.style.minWidth = ''; } }, 0)
          .from(row.querySelector('p'), { y: 9, clipPath: 'inset(0 100% 0 0)', duration: .6, clearProps: clean }, .12)
          .from(row.querySelector('.pillar-art'), { x: desktop ? 25 : 12, y: 15, scale: .97, rotation: desktop ? 1.4 : 0, clipPath: 'inset(0 0 100% 0)', duration: .95, clearProps: clean }, .1);
      });
      gsap.timeline({ scrollTrigger: enter('.contact'), defaults: { ease: 'power3.out' } })
        .from('.contact-rule', { scaleX: 0, transformOrigin: 'left center', duration: 1, clearProps: clean })
        .from('.contact-mark', { clipPath: 'inset(0 100% 0 0)', x: -8, duration: .7, clearProps: clean }, .15);
      gsap.from('.contact .split-button', { y: 20, clipPath: 'inset(0 0 100% 0)', duration: .8, ease: 'power3.out', scrollTrigger: enter('.contact .split-button'), clearProps: clean });

      // New method chapter: native sticky positioning, with one scroll timeline.
      const methodTrack = $('.method-track');
      const methodSteps = all('.method-step');
      if (desktop && innerHeight >= 650) {
        methodTrack.classList.add('is-sequenced');
        restores.push(() => methodTrack.classList.remove('is-sequenced'));
        gsap.set(methodSteps.slice(1), { opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' });
        const sequence = gsap.timeline({ scrollTrigger: { trigger: methodTrack,
          start: 'top top', end: 'bottom bottom', scrub: .4, invalidateOnRefresh: true } });
        sequence.fromTo('.method-progress', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 4, ease: 'none' }, 0);
        methodSteps.slice(0, -1).forEach((step, i) => {
          sequence.to(step, { opacity: 0, y: -18, duration: .24, ease: 'power2.in' }, i + .72)
            .to(methodSteps[i + 1], { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .42, ease: 'power3.out' }, i + .91);
        });
      } else methodSteps.forEach(step => gsap.from(step, { y: 18, clipPath: 'inset(0 0 100% 0)', duration: .7, ease: 'power3.out', scrollTrigger: enter(step), clearProps: clean }));
      all('.plan-row').forEach(row => {
        gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: enter(row) })
          .from(row.querySelector('.plan-number'), { clipPath: 'inset(0 0 100% 0 round 12px)', y: 20, duration: .85, clearProps: clean })
          .from(row.querySelector('.plan-detail'), { clipPath: 'inset(0 100% 0 0 round 12px)', x: desktop ? 18 : 0, duration: .85, clearProps: clean }, .12);
      });
      all('.person-main,.person-context').forEach((photo, i) => {
        gsap.from(photo, { clipPath: 'inset(100% 0 0 0)', y: 24, duration: 1, ease: 'power3.inOut', scrollTrigger: enter(photo), clearProps: clean });
        if (desktop) gsap.fromTo(photo.querySelector('img'), { y: 10 }, { y: -10, ease: 'none', scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: .7 } });
      });
      all('.principle-card').forEach(card => gsap.from(card, { y: 24, rotationX: desktop ? 5 : 0,
        transformOrigin: 'center top', opacity: .3, duration: .9, ease: 'power3.out', scrollTrigger: enter(card), clearProps: clean }));

      if (desktop) {
        // Perspective belongs to the image; the entrance animates its parent.
        all('.pillar-art').forEach(card => {
          const artwork = card.querySelector('img');
          gsap.set(artwork, { transformPerspective: 900 });
          const tiltX = gsap.quickTo(artwork, 'rotationX', { duration: .65, ease: 'power3.out' });
          const tiltY = gsap.quickTo(artwork, 'rotationY', { duration: .65, ease: 'power3.out' });
          listenPointer(card, 'pointermove', e => {
            if (e.pointerType !== 'mouse') return;
            const r = card.getBoundingClientRect();
            tiltX((.5 - (e.clientY - r.top) / r.height) * 4);
            tiltY(((e.clientX - r.left) / r.width - .5) * 5);
          });
          listenPointer(card, 'pointerleave', () => { tiltX(0); tiltY(0); });
        });
        // Move SVG contents independently: the two name layers stay registered.
        const monogram = $('.hero-monogram path');
        const moveX = gsap.quickTo(monogram, 'x', { duration: .65, ease: 'power3.out' });
        const moveY = gsap.quickTo(monogram, 'y', { duration: .65, ease: 'power3.out' });
        listenPointer($('.hero'), 'pointermove', e => {
          if (e.pointerType !== 'mouse') return;
          const rect = $('.hero').getBoundingClientRect();
          moveX(((e.clientX - rect.left) / rect.width - .5) * 9);
          moveY(((e.clientY - rect.top) / rect.height - .5) * 7);
        });
        listenPointer($('.hero'), 'pointerleave', () => { moveX(0); moveY(0); });
        // Magnetism is deliberately tiny and never changes the hit area.
        all('.split-button:not([aria-disabled="true"]),.talk-pill').forEach(button => {
          const target = button.querySelector('i') || button.querySelector('span');
          const x = gsap.quickTo(target, 'x', { duration: .3, ease: 'power3.out' });
          const y = gsap.quickTo(target, 'y', { duration: .3, ease: 'power3.out' });
          listenPointer(button, 'pointermove', e => {
            if (e.pointerType !== 'mouse') return;
            const rect = button.getBoundingClientRect();
            x(gsap.utils.clamp(-4, 4, (e.clientX - rect.left - rect.width / 2) * .08));
            y(gsap.utils.clamp(-3, 3, (e.clientY - rect.top - rect.height / 2) * .1));
          });
          listenPointer(button, 'pointerleave', () => { x(0); y(0); });
        });
      }
      return () => {
        releaseIntro();
        pointerEvents.abort();
        if (scrollFrame) gsap.ticker.remove(scrollFrame);
        smoothScroll?.destroy();
        smoothScroll = null;
        splitters.forEach(split => split.revert());
        restores.forEach(restore => restore());
      };
    });
  });
  listen(window, 'pageshow', e => { if (e.persisted) { releaseIntro(); ScrollTrigger.refresh(); } });
  listen(window, 'pagehide', e => {
    if (e.persisted) return;
    disposed = true;
    observer.disconnect();
    menuMotion?.revert();
    mm.revert();
    events.abort();
    releaseIntro();
  });
})();
