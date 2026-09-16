(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Reveal-on-scroll: fade/slide in any [data-reveal] element as it enters the viewport ----
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var groupCounters = {};
    revealEls.forEach(function (el) {
      var group = el.getAttribute('data-reveal-group') || 'default';
      var index = groupCounters[group] || 0;
      groupCounters[group] = index + 1;
      el.style.transitionDelay = Math.min(index * 60, 480) + 'ms';
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ---- Count-up: animate [data-countup] text from 0 to its target value ----
  var countEls = document.querySelectorAll('[data-countup]');
  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-countup'));
    if (isNaN(target)) return;
    var prefix = el.getAttribute('data-countup-prefix') || '';
    var suffix = el.getAttribute('data-countup-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-countup-decimals') || '0', 10);
    var duration = reduceMotion ? 0 : 900;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var progress = duration === 0 ? 1 : Math.min((ts - start) / duration, 1);
      var value = target * easeOutExpo(progress);
      el.textContent = prefix + value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      if (progress < 1) window.requestAnimationFrame(frame);
      else el.textContent = prefix + target.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    }
    window.requestAnimationFrame(frame);
  }
  if (reduceMotion || !('IntersectionObserver' in window)) {
    countEls.forEach(animateCount);
  } else {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    countEls.forEach(function (el) { countObserver.observe(el); });
  }

  // ---- Copy-to-clipboard buttons: brief "Copied!" confirmation state ----
  document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetEl = document.querySelector(btn.getAttribute('data-copy-target'));
      if (!targetEl) return;
      var text = targetEl.value !== undefined ? targetEl.value : targetEl.textContent;
      var restore = btn.textContent;
      var finish = function () {
        btn.classList.add('is-copied');
        btn.textContent = 'Copied!';
        window.setTimeout(function () {
          btn.classList.remove('is-copied');
          btn.textContent = restore;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(finish, finish);
      } else {
        finish();
      }
    });
  });
})();
