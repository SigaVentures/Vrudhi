/* Vrudhi Designer Boutique — site interactions (no dependencies) */
(function () {
  'use strict';

  var WA_NUMBER = '919600119945';
  var WA_DEFAULT = 'Hi, I found your boutique website and would like to know more about your designs and services.';
  var IG_PROFILE = 'https://www.instagram.com/vrudhi_designer_boutique/';

  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }

  /* ---------- WhatsApp links with prefilled messages ---------- */
  document.querySelectorAll('.js-wa').forEach(function (a) {
    var svc = a.getAttribute('data-service');
    var msg = svc
      ? 'Hi, I found your boutique website and would like to know more about ' + svc + '.'
      : WA_DEFAULT;
    a.href = waLink(msg);
  });

  /* ---------- Year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Sticky header + mobile menu ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Active nav link ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if ('IntersectionObserver' in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var s = document.querySelector(l.getAttribute('href')); if (s) sectionObs.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); revObs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Focus trap helper for dialogs ---------- */
  var lastFocus = null;
  function openDialog(el) {
    lastFocus = document.activeElement;
    el.hidden = false; el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var f = el.querySelector('button'); if (f) f.focus();
  }
  function closeDialog(el) {
    el.classList.remove('is-open'); el.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function trap(el, e) {
    if (e.key !== 'Tab') return;
    var f = el.querySelectorAll('button, a[href], iframe');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Instagram Reel modal (click-to-play official embed) ---------- */
  var modal = document.getElementById('reel-modal');
  var frameWrap = modal.querySelector('.modal-frame');
  var openLink = document.getElementById('reel-open');
  var loadingHTML = frameWrap.innerHTML;

  document.querySelectorAll('.js-reel').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-reel');
      var url = 'https://www.instagram.com/reel/' + id + '/';
      openLink.href = url;
      frameWrap.innerHTML = loadingHTML;
      var iframe = document.createElement('iframe');
      iframe.src = url + 'embed/';
      iframe.title = 'Instagram Reel by @vrudhi_designer_boutique';
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; clipboard-write');
      iframe.setAttribute('allowfullscreen', '');
      iframe.addEventListener('load', function () { var l = frameWrap.querySelector('.loading'); if (l) l.remove(); });
      frameWrap.appendChild(iframe);
      openDialog(modal);
    });
  });
  function closeReel() { closeDialog(modal); frameWrap.innerHTML = loadingHTML; }
  modal.querySelector('.modal-close').addEventListener('click', closeReel);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeReel(); });
  modal.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeReel(); trap(modal, e); });

  /* ---------- Gallery filters ---------- */
  var filters = document.querySelectorAll('.filter');
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      var cat = b.getAttribute('data-filter');
      filters.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      items.forEach(function (it) { it.hidden = !(cat === 'all' || it.getAttribute('data-cat') === cat); });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var lbLink = document.getElementById('lb-link');
  var current = 0;

  function visibleItems() { return items.filter(function (it) { return !it.hidden; }); }
  function show(i) {
    var vis = visibleItems(); if (!vis.length) return;
    current = (i + vis.length) % vis.length;
    var it = vis[current], btn = it.querySelector('button'), img = it.querySelector('img');
    lbImg.src = btn.getAttribute('data-full');
    lbImg.alt = img.alt;
    lbCap.textContent = it.querySelector('figcaption').textContent;
    lbLink.href = btn.getAttribute('data-link') || IG_PROFILE;
  }
  items.forEach(function (it) {
    it.querySelector('button').addEventListener('click', function () {
      show(visibleItems().indexOf(it)); openDialog(lb);
    });
  });
  lb.querySelector('.lb-close').addEventListener('click', function () { closeDialog(lb); });
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeDialog(lb); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDialog(lb);
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    trap(lb, e);
  });
  var touchX = null;
  lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Opening hours: highlight today ---------- */
  var today = new Date().getDay();
  var row = document.querySelector('#hours tr[data-day="' + today + '"]');
  if (row) row.classList.add('today');

  /* ---------- Enquiry form → WhatsApp ---------- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      if (!name) { form.name.focus(); form.name.setAttribute('aria-invalid', 'true'); return; }
      form.name.removeAttribute('aria-invalid');
      var lines = [
        'Hi, I found your boutique website and would like to know more about your designs and services.',
        '',
        'Name: ' + name
      ];
      if (form.phone.value.trim()) lines.push('Phone: ' + form.phone.value.trim());
      lines.push('Service: ' + form.service.value);
      if (form.message.value.trim()) lines.push('Message: ' + form.message.value.trim());
      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
