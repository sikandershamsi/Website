(function () {
  'use strict';

  // Mobile nav
  var mobileNav = document.querySelector('[data-mobile-nav]');
  document.querySelectorAll('[data-mobile-nav-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      mobileNav && mobileNav.classList.remove('hidden');
    });
  });
  document.querySelectorAll('[data-mobile-nav-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      mobileNav && mobileNav.classList.add('hidden');
    });
  });

  // Mobile nav accordions
  document.querySelectorAll('[data-mobile-accordion]').forEach(function (item) {
    var trigger = item.querySelector('[data-mobile-accordion-trigger]');
    var panel = item.querySelector('[data-mobile-accordion-panel]');
    var icon = item.querySelector('[data-mobile-accordion-icon]');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      icon && icon.classList.toggle('rotate-180', !isOpen);
    });
  });

  // Desktop nav — one submenu per hovered parent
  var navItems = document.querySelectorAll('[data-nav-item]');
  navItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      navItems.forEach(function (other) {
        other.classList.toggle('is-open', other === item);
      });
    });
    item.addEventListener('mouseleave', function () {
      item.classList.remove('is-open');
    });
    item.addEventListener('focusin', function () {
      navItems.forEach(function (other) {
        other.classList.toggle('is-open', other === item);
      });
    });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) {
        item.classList.remove('is-open');
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    navItems.forEach(function (item) {
      item.classList.remove('is-open');
    });
  });

  // Search panel
  var searchPanel = document.querySelector('[data-search-panel]');
  document.querySelectorAll('[data-search-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!searchPanel) return;
      searchPanel.classList.toggle('hidden');
      if (!searchPanel.classList.contains('hidden')) {
        var input = searchPanel.querySelector('input');
        input && input.focus();
      }
    });
  });

  // Generic tabs
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('[data-tab-btn]');
    var panels = group.querySelectorAll('[data-tab-panel]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-tab-btn');
        buttons.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        panels.forEach(function (p) {
          p.classList.toggle('hidden', p.getAttribute('data-tab-panel') !== key);
        });
      });
    });
  });

  // Accordion
  document.querySelectorAll('[data-accordion-item]').forEach(function (item) {
    var trigger = item.querySelector('[data-accordion-trigger]');
    var panel = item.querySelector('[data-accordion-panel]');
    var icon = item.querySelector('[data-accordion-icon]');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      icon && icon.classList.toggle('rotate-180', !isOpen);
    });
  });

  // Hero media stitch / fade (supports <video> and <img>)
  var heroSlides = document.querySelectorAll('[data-hero-slide]');
  if (heroSlides.length) {
    var heroIndex = 0;
    var HERO_HOLD_MS = 6500;

    function isVideo(el) {
      return el && el.tagName === 'VIDEO';
    }

    function pauseSlide(el) {
      if (isVideo(el)) {
        try {
          el.pause();
        } catch (e) {}
      }
    }

    function playSlide(el) {
      if (!isVideo(el)) return;
      try {
        el.currentTime = 0;
        var p = el.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
      } catch (e) {}
    }

    function showHero(next) {
      pauseSlide(heroSlides[heroIndex]);
      heroSlides[heroIndex].classList.remove('opacity-100');
      heroSlides[heroIndex].classList.add('opacity-0');
      heroIndex = next;
      heroSlides[heroIndex].classList.remove('opacity-0');
      heroSlides[heroIndex].classList.add('opacity-100');
      playSlide(heroSlides[heroIndex]);
    }

    playSlide(heroSlides[0]);

    if (heroSlides.length > 1) {
      setInterval(function () {
        showHero((heroIndex + 1) % heroSlides.length);
      }, HERO_HOLD_MS);
    }
  }

  function initPairSlider(options) {
    var track = document.querySelector(options.track);
    var slides = document.querySelectorAll(options.slide);
    var prev = document.querySelector(options.prev);
    var next = document.querySelector(options.next);
    var dotsWrap = options.dots ? document.querySelector(options.dots) : null;
    if (!track || !slides.length) return;

    var index = 0;
    function perView() {
      if (options.perViewLg && window.innerWidth >= 1024) return options.perViewLg;
      return window.innerWidth >= 768 ? (options.perViewMd || 2) : 1;
    }
    function maxIndex() {
      return Math.max(0, slides.length - perView());
    }
    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      var pages = maxIndex() + 1;
      for (var i = 0; i < pages; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot' + (i === index ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to slide group ' + (i + 1));
        (function (page) {
          dot.addEventListener('click', function () {
            index = page;
            update();
          });
        })(i);
        dotsWrap.appendChild(dot);
      }
    }
    function update() {
      if (index > maxIndex()) index = maxIndex();
      var pct = (100 / perView()) * index;
      track.style.transform = 'translateX(-' + pct + '%)';
      renderDots();
    }
    prev && prev.addEventListener('click', function () {
      index = Math.max(0, index - 1);
      update();
    });
    next && next.addEventListener('click', function () {
      index = Math.min(maxIndex(), index + 1);
      update();
    });
    window.addEventListener('resize', update);
    update();

    if (options.autoMs) {
      var timer = setInterval(function () {
        index = index >= maxIndex() ? 0 : index + 1;
        update();
      }, options.autoMs);
      var root = track.closest('[data-auto-slider]') || track;
      root.addEventListener('mouseenter', function () { clearInterval(timer); });
      root.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
          index = index >= maxIndex() ? 0 : index + 1;
          update();
        }, options.autoMs);
      });
    }
  }

  initPairSlider({
    track: '[data-truth-track]',
    slide: '[data-truth-slide]',
    prev: '[data-truth-prev]',
    next: '[data-truth-next]',
    dots: '[data-truth-dots]',
    autoMs: 5000,
  });

  initPairSlider({
    track: '[data-testimonial-track]',
    slide: '[data-testimonial-slide]',
    prev: '[data-testimonial-prev]',
    next: '[data-testimonial-next]',
    autoMs: 4500,
  });

  initPairSlider({
    track: '[data-products-track]',
    slide: '[data-products-slide]',
    prev: '[data-products-prev]',
    next: '[data-products-next]',
    dots: '[data-products-dots]',
    autoMs: 5000,
    perViewMd: 2,
    perViewLg: 4,
  });

  // Affiliate earnings calculator
  var calc = document.querySelector('[data-affiliate-calculator]');
  if (calc) {
    var horses = calc.querySelector('[data-calc-horses]');
    var spend = calc.querySelector('[data-calc-spend]');
    var conversion = calc.querySelector('[data-calc-conversion]');
    var commission = calc.querySelector('[data-calc-commission]');
    var output = calc.querySelector('[data-calc-output]');
    var horsesVal = calc.querySelector('[data-calc-horses-val]');
    var conversionVal = calc.querySelector('[data-calc-conversion-val]');
    var commissionVal = calc.querySelector('[data-calc-commission-val]');

    function fmt(n) {
      return '$' + Math.round(n).toLocaleString('en-US');
    }

    function recalc() {
      var h = parseFloat(horses.value) || 0;
      var s = parseFloat(spend.value) || 0;
      var c = parseFloat(conversion.value) || 0;
      var m = parseFloat(commission.value) || 0;
      var earnings = h * s * (c / 100) * (m / 100);
      output.textContent = fmt(earnings);
      horsesVal.textContent = h.toLocaleString('en-US');
      conversionVal.textContent = c + '%';
      commissionVal.textContent = m + '%';
    }

    [horses, spend, conversion, commission].forEach(function (el) {
      el.addEventListener('input', recalc);
    });
    recalc();
  }

  // Horse IQ content filter
  var iqFilter = document.querySelector('[data-iq-filter]');
  if (iqFilter) {
    var filterBtns = iqFilter.querySelectorAll('[data-iq-filter-btn]');
    var cards = document.querySelectorAll('[data-iq-card]');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var type = btn.getAttribute('data-iq-filter-btn');
        filterBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        cards.forEach(function (card) {
          var show = type === 'all' || card.getAttribute('data-iq-card') === type;
          card.classList.toggle('hidden', !show);
        });
      });
    });
  }
})();
