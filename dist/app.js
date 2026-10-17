(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const events = new AbortController();
  let disposed = false, introPlayed = false, refreshFrame, disposeMotion = () => {};
  let motionReady = false;
  let initialContactPending = location.hash === '#contact';
  const listen = (el, type, fn, options = {}) => el.addEventListener(type, fn, { ...options, signal: events.signal });
  const releaseIntro = () => {
    clearTimeout(window.vfIntroGuard);
    document.documentElement.classList.remove('intro-pending');
  };
  const menu = $('#menu-dialog');
  const toggles = all('[aria-controls="menu-dialog"]');
  let menuOpener, menuMotion, smoothScroll;
  const anchorDestination = target => {
    const finale = window.ScrollTrigger?.getById('vf-brand-finale');
    return target.id === 'contact' && finale ? finale.end : target;
  };
  const closeMenu = () => { if (menu.open) menu.close(); };
  toggles.forEach(button => listen(button, 'click', () => {
    if (menu.open) return;
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
    if (!target) return;
    if (target.id === 'contact' && !motionReady) initialContactPending = true;
    const destination = anchorDestination(target);
    if (smoothScroll) smoothScroll.scrollTo(destination, { immediate: true, force: true });
    else if (typeof destination === 'number') window.scrollTo({ top: destination, behavior: 'auto' });
  });
  listen(menu, 'close', () => {
    smoothScroll?.start();
    menuMotion?.revert();
    toggles.forEach(b => b.setAttribute('aria-expanded', 'false'));
    menuOpener?.focus({ preventScroll: true });
  });
  const contactConfig = window.VINICIUS_CONFIG || {};
  const resolveWhatsApp = () => {
    if (contactConfig.whatsappUrl) return contactConfig.whatsappUrl;
    if (window.WHATSAPP_URL) return window.WHATSAPP_URL;
    const phone = String(contactConfig.whatsappNumber || '').replace(/[+\s()-]/g, '');
    if (!/^[1-9]\d{9,14}$/.test(phone)) return '';
    const url = new URL('https://wa.me/' + phone);
    url.searchParams.set('text', contactConfig.whatsappMessage || '');
    return url.href;
  };
  const whatsappUrl = contactConfig.whatsappUrl || window.WHATSAPP_URL || resolveWhatsApp();
  all('[data-contact]').forEach(link => {
    if (whatsappUrl) {
      link.setAttribute('href', whatsappUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('aria-label', 'Conversar com Vinicius no WhatsApp');
      link.removeAttribute('aria-disabled');
    } else {
      // No recipient is fabricated. Production readiness is documented outside the UI.
      link.setAttribute('aria-disabled', 'true');
    }
  });
  // Footer anchors keep smooth navigation independent of the menu's immediate hash handling.
  all('.footer-nav a').forEach(link => {
    const hash = '#' + link.getAttribute('data-section');
    link.setAttribute('href', hash);
    listen(link, 'click', e => {
      if (e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      if (location.hash !== hash) window.history.pushState(null, '', hash);
      const destination = anchorDestination(target);
      if (smoothScroll && !reduced()) smoothScroll.scrollTo(destination, { duration: 1.05, force: true });
      else window.scrollTo({ top: typeof destination === 'number' ? destination : window.scrollY + target.getBoundingClientRect().top - offset,
        behavior: reduced() ? 'auto' : 'smooth' });
    });
  });
  // The contact block lives at the end of the pinned story, not at its DOM offset.
  all('a[href="#contact"]:not(.footer-nav a)').forEach(link => listen(link, 'click', e => {
    if (e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const target = $('#contact'), destination = anchorDestination(target);
    if (typeof destination !== 'number') return;
    e.preventDefault();
    e.stopPropagation();
    window.history.pushState(null, '', '#contact');
    if (smoothScroll) smoothScroll.scrollTo(destination, { duration: 1.05, force: true });
    else window.scrollTo({ top: destination, behavior: reduced() ? 'auto' : 'smooth' });
  }));
  // Touch feedback reuses the existing cyan stroke without consuming a conversion tap.
  all('.service').forEach(card => {
    listen(card, 'pointerdown', () => {
      if (!matchMedia('(hover: none), (pointer: coarse)').matches) return;
      all('.service.is-active').forEach(other => other.classList.remove('is-active'));
      card.classList.add('is-active');
    });
    listen(card, 'blur', () => card.classList.remove('is-active'));
  });
  all('.stack-toggle').forEach(button => {
    const subject = button.closest('.pillar-art').querySelector('.stack-layer-2').alt;
    listen(button, 'click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.closest('.pillar-art').classList.toggle('is-expanded', open);
      button.setAttribute('aria-label', (open ? 'Fechar' : 'Abrir') + ' composição: ' + subject);
    });
  });
  const floating = [$('.floating-nav'), $('.chat-link')];
  const railHome = $('.rail-home');
  let railFrame, railTween, railSurface;
  let surfaceColors = new WeakMap();
  railHome.classList.toggle('is-color-fallback', !window.gsap);
  // Sample the actual surface under the logo, excluding fixed navigation layers.
  // Two probes create a 4px deadband so a section edge cannot flicker.
  const surfaceAt = (x, y) => {
    for (const node of document.elementsFromPoint(x, y)) {
      if (!node.closest('main, footer')) continue;
      let color = surfaceColors.get(node);
      if (color === undefined) {
        const rgba = getComputedStyle(node).backgroundColor.match(/[\d.]+/g)?.map(Number);
        color = null;
        if (rgba?.length >= 3 && (rgba[3] === undefined || rgba[3] > .5)) {
          const distance = rgb => rgb.reduce((sum, value, i) => sum + (value - rgba[i]) ** 2, 0);
          color = distance([248, 243, 240]) < distance([1, 75, 170]) ? 'light' : 'blue';
        }
        surfaceColors.set(node, color);
      }
      if (color) return color;
    }
    return 'blue';
  };
  const syncRailTheme = () => {
    railFrame = null;
    if (disposed) return;
    const box = railHome.getBoundingClientRect();
    const x = box.left + box.width / 2, y = box.top + box.height / 2;
    const upper = surfaceAt(x, y - 2), lower = surfaceAt(x, y + 2);
    if (upper !== lower && railSurface !== undefined) return;
    const surface = upper === lower ? upper : surfaceAt(x, y);
    if (surface === railSurface) return;
    const instant = railSurface === undefined || !floating[0].classList.contains('is-visible') || reduced();
    railSurface = surface;
    railHome.setAttribute('data-surface', surface);
    const colors = surface === 'light'
      ? { backgroundColor: '#014BAA', color: '#F8F3F0', borderColor: '#014BAA' }
      : { backgroundColor: '#F8F3F0', color: '#014BAA', borderColor: 'rgba(248,243,240,.35)' };
    railTween?.kill();
    if (window.gsap) railTween = gsap.to(railHome, { ...colors, duration: instant ? 0 : .45, ease: 'power2.out', overwrite: 'auto' });
    else Object.assign(railHome.style, colors);
  };
  const queueRailTheme = () => { if (railFrame == null && !disposed) railFrame = requestAnimationFrame(syncRailTheme); };
  const invalidateRailTheme = () => { surfaceColors = new WeakMap(); queueRailTheme(); };
  listen(window, 'scroll', queueRailTheme, { passive: true });
  listen(window, 'resize', invalidateRailTheme, { passive: true });
  listen(window, 'load', invalidateRailTheme, { once: true });
  listen(window, 'pageshow', invalidateRailTheme);
  queueRailTheme();
  const observer = new IntersectionObserver(([entry]) => {
    const shown = !entry.isIntersecting;
    floating.forEach(el => { el.classList.toggle('is-visible', shown); el.inert = !shown; });
    queueRailTheme();
  }, { threshold: .3 });
  observer.observe($('.hero'));
  // Base interactions and observers clean up even when animation libraries fail.
  listen(window, 'pagehide', e => {
    if (e.persisted) return;
    disposed = true;
    cancelAnimationFrame(refreshFrame);
    cancelAnimationFrame(railFrame);
    railTween?.kill();
    observer.disconnect();
    menuMotion?.revert();
    disposeMotion();
    events.abort();
    releaseIntro();
  });
  listen(window, 'pageshow', e => {
    if (e.persisted) { releaseIntro(); window.ScrollTrigger?.refresh(); }
  });
  if (!window.gsap || !window.ScrollTrigger) { releaseIntro(); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (ScrollTrigger.config) ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.SplitText) gsap.registerPlugin(SplitText);
  const mm = gsap.matchMedia();
  disposeMotion = () => mm.revert();
  const refreshGeometry = () => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => {
      if (disposed) return;
      ScrollTrigger.refresh();
      smoothScroll?.resize();
      if (initialContactPending && motionReady) {
        initialContactPending = false;
        const destination = anchorDestination($('#contact'));
        if (smoothScroll) smoothScroll.scrollTo(destination, { immediate: true, force: true });
        else window.scrollTo({ top: typeof destination === 'number' ? destination : destination.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0), behavior: 'auto' });
      }
    });
  };
  if (document.fonts) listen(document.fonts, 'loadingdone', refreshGeometry);
  listen(window, 'load', refreshGeometry, { once: true });
  const closingImage = $('.closing-art-image');
  if (!closingImage.complete) listen(closingImage, 'load', refreshGeometry, { once: true });
  const lowPower = navigator.connection?.saveData === true;
  const enter = (trigger, start = 'top 91%') => ({ trigger, start, toggleActions: 'play none none none' });
  const clean = 'transform,opacity,filter,clipPath,willChange';
  // Read absolute document coordinates only during refresh. Native scroll can be
  // re-anchored during resize before ScrollTrigger's cached scroll value updates.
  const documentTop = element => element.getBoundingClientRect().top + window.scrollY;

  // Bounded font wait: a slow connection must never hold the page behind a loader.
  Promise.race([document.fonts?.ready || Promise.resolve(), new Promise(resolve => setTimeout(resolve, 250))]).then(() => {
    if (disposed) return;
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1025px) and (hover: hover) and (pointer: fine)', tall: '(min-height: 650px)', closingRoom: '(min-width: 769px) and (min-height: 480px), (max-width: 768px) and (min-height: 380px)', closingMobile: '(max-width: 768px)', mobileMotion: '(max-width: 768px) and (min-height: 380px)' }, context => {
      if (!context.conditions.motion) { menuMotion?.revert(); menuMotion = null; motionReady = true; releaseIntro(); refreshGeometry(); return; }
      const desktop = context.conditions.desktop && !lowPower;
      const mobileMotion = context.conditions.mobileMotion && !lowPower;
      const sequenced = (desktop && context.conditions.tall) || mobileMotion;
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
      if (window.SplitText) all('[data-lines]').forEach(el => {
        splitters.push(SplitText.create(el, {
          type: 'lines', mask: 'lines', autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, { yPercent: 105, duration: el.closest('.contact') ? .95 : .78,
              stagger: .065, ease: 'power3.out', scrollTrigger: enter(el), clearProps: 'transform' });
          }
        }));
      });
      all('.eyebrow').forEach(el => {
        // The finale owns every reveal in its scrub timeline.
        if (el.closest('.closing')) return;
        gsap.from(el, { clipPath: 'inset(0 100% 0 0)', duration: .7, ease: 'power3.out', scrollTrigger: enter(el), clearProps: clean });
      });
      all('.service').forEach((card, i) => {
        gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: enter(card) })
          .from(card, { clipPath: 'inset(0 0 100% 0 round 7px)', y: distance, duration: .72, delay: (i % 2) * .09, clearProps: clean })
          .from(card.querySelectorAll('.service-label,h3,.service-arrow'), { y: 14, opacity: 0, duration: .5, stagger: .065, clearProps: clean }, '<+.14');
      });
      const approachTrack = $('.approach-track');
      if (sequenced) {
        approachTrack.classList.add('is-opening');
        restores.push(() => approachTrack.classList.remove('is-opening'));
        gsap.set('.approach-line', { yPercent: 250 });
        gsap.set('.inner-rays line,.outer-rays line', { strokeDasharray: (_, line) => line.getTotalLength(),
          strokeDashoffset: (_, line) => line.getTotalLength(), opacity: 0 });
        gsap.set('.approach-copy,.approach .cream-button', { opacity: 0, y: 24 });
        const opening = gsap.timeline({ scrollTrigger: { id: 'vf-approach', trigger: approachTrack,
          start: () => documentTop(approachTrack), end: () => documentTop(approachTrack) + approachTrack.offsetHeight - innerHeight, scrub: .55, invalidateOnRefresh: true } });
        opening.fromTo('.approach-panel', { clipPath: mobileMotion ? 'inset(16% 30% 16% 30% round 16px)' : 'inset(20% 40% 20% 40% round 16px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.5, ease: 'power2.inOut' }, 0)
          .to('.inner-rays line', { strokeDashoffset: 0, opacity: 1, duration: .4, stagger: { amount: 1.3 }, ease: 'none' }, 0)
          .to('.outer-rays line', { strokeDashoffset: 0, opacity: 1, duration: .65, stagger: { amount: .35, from: 'center' }, ease: 'none' }, .65)
          .to('.approach-line', { yPercent: 0, duration: .9, stagger: .1, ease: 'power3.out' }, .6)
          .to('.approach-meta', { opacity: 0, duration: .2 }, .45)
          .to('.approach-copy,.approach .cream-button', { opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'power3.out' }, 1.35);
      } else {
        gsap.timeline({ scrollTrigger: enter('.approach-panel'), defaults: { ease: 'power3.out' } })
          .from('.approach-panel', { clipPath: 'inset(5% 2% 5% 2% round 15px)', duration: .8, clearProps: clean })
          .from('.inner-rays line', { opacity: 0, duration: .5, stagger: { amount: .45 }, clearProps: clean }, .12)
          .from('.approach-line,.approach-copy,.approach .cream-button', { y: 18, opacity: 0, duration: .65, stagger: .08, clearProps: clean }, .25);
      }
      gsap.from('#systems-heading', { clipPath: 'inset(0 0 100% 0)', y: 20, duration: .85, ease: 'power3.out', scrollTrigger: enter('#systems-heading'), clearProps: clean });
      gsap.from('.underlined', { '--line-scale': 0, duration: .7, ease: 'power3.inOut', scrollTrigger: enter('#systems-heading', 'top 65%') });
      const diagram = gsap.timeline({ scrollTrigger: enter('.systems-diagram'), defaults: { ease: 'power2.out' } });
      diagram.from('.system-hub', { scale: .7, transformOrigin: 'center center', opacity: 0, duration: .4, clearProps: 'transform,opacity' })
        .fromTo('.system-connections path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: .8, stagger: .1, clearProps: 'strokeDasharray,strokeDashoffset' }, .15)
        .from('.system-node', { opacity: 0, scale: .93, transformOrigin: 'center center', duration: .5, stagger: .12, clearProps: 'transform,opacity' }, .32);
      $('.pillars').classList.add('has-parallax');
      restores.push(() => $('.pillars').classList.remove('has-parallax'));
      all('.pillar').forEach((row, index) => {
        const number = row.querySelector('.pillar-number');
        const motion = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          id: 'vf-pillar-' + index, trigger: row, start: () => documentTop(row) - innerHeight, end: () => documentTop(row) + row.offsetHeight,
          scrub: desktop ? .45 : .25, invalidateOnRefresh: true
        } });
        // The glyph travels for the entire row interval, including its exit.
        motion.fromTo(number, { yPercent: desktop ? 64 : 30, scale: 1.04 },
          { yPercent: desktop ? -58 : -26, scale: .96, duration: 1 }, 0)
          .fromTo(row, { '--rule-scale': .15 }, { '--rule-scale': 1, duration: .5 }, 0);
        row.querySelectorAll('.stack-layer').forEach((layer, i) => {
          motion.fromTo(layer, { yPercent: 11 + i * 4, rotation: [-9, 6, 1][i] },
            { yPercent: -8 - i * 3, rotation: [-5, 3, -1][i], duration: 1 }, 0);
        });
      });

      // New method chapter: native sticky positioning, with one scroll timeline.
      const methodTrack = $('.method-track');
      const methodSteps = all('.method-step');
      if (sequenced) {
        methodTrack.classList.add('is-sequenced');
        restores.push(() => methodTrack.classList.remove('is-sequenced'));
        let activeStep = -1;
        const syncMethod = time => {
          const next = Math.min(methodSteps.length - 1, Math.floor(time + .18));
          if (next === activeStep) return;
          activeStep = next;
          methodSteps.forEach((step, i) => step.setAttribute('aria-hidden', String(i !== next)));
        };
        syncMethod(0);
        restores.push(() => methodSteps.forEach(step => step.removeAttribute('aria-hidden')));
        gsap.set(methodSteps.slice(1), { opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' });
        const sequence = gsap.timeline({ scrollTrigger: { id: 'vf-method', trigger: methodTrack,
          start: () => documentTop(methodTrack), end: () => documentTop(methodTrack) + methodTrack.offsetHeight - innerHeight, scrub: .4, invalidateOnRefresh: true,
          onRefresh(self) { syncMethod(self.animation?.time() || 0); } },
          onUpdate() { syncMethod(this.time()); } });
        const arc = $('.method-progress'), circumference = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: circumference });
        sequence.fromTo(arc, { strokeDashoffset: circumference * .75 },
          { strokeDashoffset: 0, autoRound: false, duration: 3, ease: 'none' }, 0)
          .to({}, { duration: 1 }, 3);
        methodSteps.slice(0, -1).forEach((step, i) => {
          sequence.to(step, { opacity: 0, y: -18, duration: .16, ease: 'power2.in' }, i + .68)
            .to(methodSteps[i + 1], { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .18, ease: 'power3.out' }, i + .82);
        });
        syncMethod(sequence.time());
      } else methodSteps.forEach(step => gsap.from(step, { y: 18, clipPath: 'inset(0 0 100% 0)', duration: .7, ease: 'power3.out', scrollTrigger: enter(step), clearProps: clean }));
      const planTrack = $('.plan-track'), planRows = all('.plan-row');
      if (mobileMotion) {
        planTrack.classList.add('is-stacked');
        restores.push(() => {
          planTrack.classList.remove('is-stacked');
          planRows.forEach(row => row.removeAttribute('aria-hidden'));
        });
        const syncPlan = time => planRows.forEach((row, i) => row.setAttribute('aria-hidden', String(i !== Math.min(3, Math.floor(time + .18)))));
        syncPlan(0);
        gsap.set(planRows.slice(1), { opacity: 0, xPercent: 14, yPercent: 5, scale: .97 });
        const roadmap = gsap.timeline({ scrollTrigger: {
          id: 'vf-roadmap-mobile', trigger: planTrack,
          start: () => documentTop(planTrack),
          end: () => documentTop(planTrack) + planTrack.offsetHeight - innerHeight,
          scrub: .35, invalidateOnRefresh: true,
          onRefresh(self) { syncPlan(self.animation?.time() || 0); }
        }, onUpdate() { syncPlan(this.time()); } });
        planRows.slice(0, -1).forEach((row, i) => {
          roadmap.to(row, { xPercent: -8, yPercent: -3, scale: .97, opacity: 0, duration: .2, ease: 'power2.inOut' }, i + .65)
            .to(planRows[i + 1], { xPercent: 0, yPercent: 0, scale: 1, opacity: 1, duration: .26, ease: 'power2.out' }, i + .8);
        });
        roadmap.to({}, { duration: .3 }, 3.7);
      } else {
      all('.plan-row').forEach((row, i) => {
        if (desktop) {
          gsap.fromTo(row, { x: () => innerWidth * (.18 + i * .035) },
            { x: 0, ease: 'none', scrollTrigger: { trigger: row,
              start: () => documentTop(row) - innerHeight, end: () => documentTop(row) - innerHeight * .22, scrub: .65, invalidateOnRefresh: true } });
        } else gsap.from(row, { y: 18, opacity: .4, duration: .7,
          ease: 'power3.out', scrollTrigger: enter(row), clearProps: clean });
      });
      }
      all('.experience-card').forEach((card, i) => {
        gsap.timeline({ scrollTrigger: enter(card), defaults: { ease: 'power3.out' } })
          .from(card, { clipPath: 'inset(0 0 100% 0 round 7px)', duration: .75,
            delay: (i % (innerWidth > 768 ? 3 : 2)) * .065, clearProps: clean })
          .from(card.querySelector('img'), { y: 14, scale: .97, duration: .7, clearProps: clean }, '<+.08');
      });
      const closingTrack = $('.closing-track');
      const closingStage = $('.closing-stage');
      if (context.conditions.closingRoom && !lowPower) {
        const mobileFinale = context.conditions.closingMobile;
        // One scoped, reversible timeline owns the logo, aperture and content.
        const closingContext = gsap.context(() => {
          const scene = $('.closing-scene'), curtain = $('.closing-curtain');
          const signature = $('.closing-signature'), aperture = $('.closing-aperture');
          const portrait = $('.closing-portrait-plane'), contact = $('.closing-contact');
          const copy = all('.closing-label,.closing-contact h2,.closing-description,.closing-cta');
          const positions = all('.closing-mask-position,.closing-logo-position');
          let coverZoom = 1;
          const measureReveal = () => {
            const width = closingStage.clientWidth, height = closingStage.clientHeight;
            // Geometry is measured on refresh only, never during animation frames.
            const unit = Math.min(180, Math.max(92, width * .12)) / 80;
            curtain.setAttribute('viewBox', `0 0 ${width} ${height}`);
            closingTrack.style.setProperty('--closing-distance', Math.round(innerHeight * (mobileFinale ? 1.2 : 1.7)) + 'px');
            positions.forEach(position => position.setAttribute('transform',
              `translate(${width / 2 - 40 * unit} ${height / 2 - 24 * unit}) scale(${unit})`));
            // (30,28) lies inside the V; expanding about it avoids an empty center.
            coverZoom = Math.max(width, height) / (unit * 3);
          };
          closingTrack.classList.add('is-revealing');
          measureReveal();
          const hintCompositing = active => {
            curtain.style.willChange = active ? 'opacity' : '';
            copy.forEach(el => { el.style.willChange = active ? 'transform,opacity' : ''; });
          };
          restores.push(() => {
            if (!closingContext.isReverted) closingContext.revert();
            closingTrack.classList.remove('is-revealing');
            closingTrack.style.removeProperty('--closing-distance');
            hintCompositing(false); contact.inert = false;
            aperture.removeAttribute('transform');
            positions.forEach(position => position.removeAttribute('transform'));
            curtain.removeAttribute('viewBox');
          });
          const finale = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
            id: 'vf-brand-finale', trigger: closingTrack,
            start: () => documentTop(closingTrack),
            end: () => '+=' + Math.round(innerHeight * (mobileFinale ? 1.2 : 1.7)),
            pin: closingStage, pinType: 'transform', pinSpacing: true, anticipatePin: 1,
            scrub: mobileFinale ? .35 : true, invalidateOnRefresh: true, onRefreshInit: measureReveal,
            onToggle: self => hintCompositing(self.isActive),
            onRefresh: self => { contact.inert = self.progress < (mobileFinale ? .72 : .86); },
            onUpdate: self => { contact.inert = self.progress < (mobileFinale ? .72 : .86); }
          } });
          contact.inert = true;
          if (mobileFinale) {
            finale.fromTo(scene, { opacity: 0 }, { opacity: 1, duration: .1 }, .18)
              .fromTo(signature, { opacity: 0, scale: .92, svgOrigin: '40 24' },
                { opacity: 1, scale: 1, duration: .08, ease: 'power2.out' }, 0)
              .to(signature, { opacity: 0, duration: .05 }, .2)
              .fromTo(aperture, { attr: { transform: 'translate(30 28) scale(1) translate(-30 -28)' } },
                { attr: { transform: () => `translate(30 28) scale(${coverZoom}) translate(-30 -28)` },
                  duration: .44, ease: 'power2.in' }, .22)
              .fromTo(curtain, { opacity: 1 }, { opacity: 0, duration: .12 }, .54)
              .fromTo(portrait, { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: .18, ease: 'power2.out' }, .28)
              .fromTo(copy, { opacity: 0, y: 14 }, { opacity: 1, y: 0,
                duration: .15, stagger: .03, ease: 'power2.out' }, .50)
              .to({}, { duration: .27 }, .73);
          } else {
            finale.fromTo(scene, { opacity: 0 }, { opacity: 1, duration: .12 }, .27)
              .fromTo(signature, { opacity: 0, scale: .92, svgOrigin: '40 24' },
                { opacity: 1, scale: 1, duration: .1, ease: 'power2.out' }, 0)
              .to(signature, { opacity: 0, duration: .06 }, .28)
              .fromTo(aperture, { attr: { transform: 'translate(30 28) scale(1) translate(-30 -28)' } },
                { attr: { transform: () => `translate(30 28) scale(${coverZoom}) translate(-30 -28)` },
                  duration: .5, ease: 'power2.in' }, .30)
              .fromTo(curtain, { opacity: 1 }, { opacity: 0, duration: .14 }, .68)
              .fromTo(portrait, { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: .2, ease: 'power2.out' }, .38)
              .fromTo(copy, { opacity: 0, y: 14 }, { opacity: 1, y: 0,
                duration: .16, stagger: .035, ease: 'power2.out' }, .65)
              .to({}, { duration: .085 }, .915);
          }
        }, closingTrack);
      }

      all('.footer-main,.footer-bottom').forEach(part => gsap.from(part, { y: 10, opacity: 0,
        duration: .7, ease: 'power2.out', scrollTrigger: enter(part, 'top 96%'), clearProps: clean }));

      if (desktop) {
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
      motionReady = true;
      refreshGeometry();
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
})();
