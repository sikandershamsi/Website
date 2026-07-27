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

  // Generic tabs: [data-tabs] wraps [data-tab-btn="key"] triggers and [data-tab-panel="key"] panels
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

  // Accordion: [data-accordion-item] toggles [data-accordion-panel]
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
