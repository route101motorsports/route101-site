/* ===== ROUTE 101 LAB MODE =====
   Visit any page with ?lab=1 to turn the new design on for THIS device,
   ?lab=0 to turn it off. Everyone else sees the normal site.            */
(function () {
  var on = false;
  try {
    var q = location.search;
    if (/[?&]lab=1\b/.test(q)) localStorage.setItem('r101lab', '1');
    if (/[?&]lab=0\b/.test(q)) localStorage.removeItem('r101lab');
    on = localStorage.getItem('r101lab') === '1';
  } catch (e) { on = false; }
  if (!on) return;

  var O = '#FF6600';

  function addStyle(id, css) {
    if (document.getElementById(id)) return;
    var s = document.createElement('style');
    s.id = id; s.textContent = css;
    document.head.appendChild(s);
  }
  function addFont() {
    if (document.getElementById('r101-font')) return;
    var l = document.createElement('link');
    l.id = 'r101-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  /* ---------- GLOBAL (every page, lab only) ---------- */
  var GLOBAL_CSS = `
:root{--r101-o:${O};--r101-ink:#141414;--r101-mute:#5d5d5d;--r101-line:#e7e5e1;--r101-soft:#f5f4f1}
.rx-content p,.bq-content p,.text__wrapper p,.form__label,.contact-form__wrapper p{font-family:Inter,system-ui,sans-serif!important;letter-spacing:0;line-height:1.32}
.button{border-radius:999px!important;transition:transform .2s ease,box-shadow .2s ease,background .2s ease!important}
.button:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(0,0,0,.18)}
.button--primary:hover{filter:brightness(1.08)}
.button.r101-ol-light:hover{background:#fff!important;border-color:#fff!important;color:#111!important}
.button.r101-ol-dark:hover{background:var(--r101-ink)!important;border-color:var(--r101-ink)!important;color:#fff!important}
#r101-cta .b a:hover,#r101-hub .c .go:hover,#r101-map .go:hover{box-shadow:0 10px 22px rgba(0,0,0,.2)}
#r101-cta .b a.s{transition:transform .2s,background .2s,color .2s,box-shadow .2s}
#r101-cta .b a.s:hover{background:#111;color:#fff}
@keyframes r101-drift{from{scale:1}to{scale:1.045}}
@media (prefers-reduced-motion:no-preference){.r101-drift{animation:r101-drift 22s ease-in-out infinite alternate;animation-play-state:paused}.r101-drift.r101-run{animation-play-state:running}}
h1,.h1{letter-spacing:.022em!important;line-height:1.04!important;word-spacing:.04em}
h2,.h2{letter-spacing:.028em!important;line-height:1.08!important}
h3,.h3{letter-spacing:.035em!important;line-height:1.12!important}
h4,h5,h6{letter-spacing:.04em!important}
.button{letter-spacing:.035em!important}
.rx-content p,.bq-content p{margin-top:0!important;margin-bottom:.45em!important}
.rx-content p:last-child,.bq-content p:last-child{margin-bottom:0!important}
.rx-content p:empty,.bq-content p:empty{display:none!important}
h1,.h1{font-size:clamp(30px,calc(3.4vw + 17px),72px)!important}
main h2{font-size:clamp(26px,calc(2.4vw + 15px),52px)!important}
#r101-steps h2{font-size:clamp(28px,4vw,44px)!important}
/* readable, fluid body text (min/max) */
.rx-content,.rx-content *:not(h1):not(h2):not(h3):not(h4):not(.button),.bq-content,.bq-content *:not(h1):not(h2):not(h3):not(h4):not(.button){font-family:Inter,system-ui,sans-serif!important;letter-spacing:0!important}
.rx-content p,.rx-content li,.bq-content p,.bq-content li{font-size:clamp(16px,calc(.25vw + 15px),18px)!important;line-height:1.32!important}
.hero__description{max-width:720px!important}
.text-large p,.hero__description p{font-size:clamp(17px,calc(.35vw + 15.5px),20px)!important}
.rx-content h3,.bq-content h3{font-size:clamp(22px,calc(1vw + 16px),30px)!important}
.rx-content h4,.bq-content h4{font-size:clamp(19px,calc(.6vw + 15px),24px)!important}
.button{font-size:clamp(14px,calc(.2vw + 13px),17px)!important}
.form__label{font-size:clamp(14px,calc(.15vw + 13.5px),16px)!important}
#r101-lab-badge{position:fixed;left:12px;bottom:76px;z-index:99999;background:#111;color:#fff;font:600 11px/1 Inter,sans-serif;letter-spacing:.12em;padding:8px 10px;border-radius:999px;opacity:.75;text-decoration:none}
#r101-lab-badge b{color:${O}}
#r101-call{position:fixed;left:14px;bottom:14px;z-index:9999;background:${O};color:#111;font:700 15px/1 Inter,sans-serif;padding:15px 20px;border-radius:999px;text-decoration:none;box-shadow:0 10px 24px rgba(0,0,0,.35);display:none}
@media (max-width:760px){#r101-call{display:block}}
`;

  /* ---------- TIRE PAGE ---------- */
  var TIRE_CSS = `
html{scroll-behavior:smooth}
body.r101-tires main section{scroll-margin-top:150px}
/* hero */
body.r101-tires .hero__heading{letter-spacing:.01em;line-height:1.02}
body.r101-tires .hero__description p{font-size:18px;max-width:760px;color:#e9e9e9}
body.r101-tires .hero__buttons{gap:12px}
body.r101-tires .r101-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
body.r101-tires .r101-chips span{font:600 14px/1 Inter,sans-serif;color:#fff;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(6px);padding:10px 14px;border-radius:999px}
body.r101-tires .r101-chips b{color:${O};margin-right:6px}
/* how it works */
#r101-steps{background:var(--r101-soft);padding:64px 20px}
#r101-steps .eb{font:600 13px/1 Inter,sans-serif;letter-spacing:.18em;color:${O};text-transform:uppercase;margin:0 0 10px}
#r101-steps h2{font-family:Anton,sans-serif;text-transform:uppercase;font-size:clamp(28px,4vw,44px);margin:0 0 28px;color:var(--r101-ink)}
#r101-steps .g{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
#r101-steps .s{background:#fff;border:1px solid var(--r101-line);border-radius:16px;padding:24px}
#r101-steps .n{width:38px;height:38px;border-radius:50%;background:var(--r101-ink);color:#fff;font:700 16px/38px Inter,sans-serif;text-align:center;margin-bottom:14px}
#r101-steps h3{font-family:Anton,sans-serif;text-transform:uppercase;font-size:22px;margin:0 0 6px;color:var(--r101-ink)}
#r101-steps p{font:400 16px/1.32 Inter,sans-serif;color:var(--r101-mute);margin:0}
/* sticky brand nav */
#r101-brandnav{position:sticky;z-index:50;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);border-bottom:1px solid var(--r101-line)}
#r101-brandnav .w{display:flex;gap:8px;overflow-x:auto;padding-top:12px;padding-bottom:12px;scrollbar-width:none}
#r101-brandnav .w::-webkit-scrollbar{display:none}
@media (min-width:700px){#r101-brandnav .w{flex-wrap:wrap;overflow-x:visible}}
@media (max-width:699px){#r101-brandnav .w{-webkit-mask-image:linear-gradient(90deg,#000 80%,transparent);mask-image:linear-gradient(90deg,#000 80%,transparent);padding-right:40px!important}}
#r101-brandnav .lbl{font:600 12px/34px Inter,sans-serif;letter-spacing:.14em;color:#888;text-transform:uppercase;white-space:nowrap;margin-right:4px}
#r101-brandnav a{flex:0 0 auto;font:600 14px/1 Inter,sans-serif;color:var(--r101-ink);text-decoration:none;padding:10px 16px;border:1px solid var(--r101-line);border-radius:999px;background:#fff;transition:all .2s}
#r101-brandnav a:hover,#r101-brandnav a.on{background:var(--r101-ink);color:#fff;border-color:var(--r101-ink)}
/* brand blocks */
body.r101-tires section.image-gallery .image-gallery__wrapper{padding-top:56px!important;padding-bottom:8px!important}
body.r101-tires section.r101-alt .image-gallery__wrapper,body.r101-tires section.r101-alt .text__wrapper{background:var(--r101-soft)!important}
body.r101-tires .image-gallery__heading{text-align:left!important;font-size:clamp(30px,3.6vw,44px)!important;margin-bottom:22px!important;display:flex;align-items:center;gap:14px}
body.r101-tires .image-gallery__heading img.r101-blogo{display:block;flex:0 0 auto;max-width:60vw;height:auto}
.r101-vh{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important}
@media (max-width:760px){body.r101-tires .image-gallery__heading img.r101-blogo{width:auto!important;max-height:52px;max-width:56vw}}
body.r101-tires .image-gallery__heading:after{content:"";flex:1;height:2px;background:linear-gradient(90deg,${O},transparent)}
body.r101-tires .image-gallery__images{gap:18px!important}
body.r101-tires .r101-count{order:3;font:500 14px/1 Inter,sans-serif;color:#8a8a8a;text-transform:none;letter-spacing:0;white-space:nowrap}
body.r101-tires .r101-count .sw{display:none;color:${O};font-weight:600}
body.r101-tires .image-gallery__image-wrapper{border-radius:14px;overflow:hidden}
body.r101-tires .image-gallery__images>div{background:#fff;border:1px solid var(--r101-line);border-radius:16px;padding:10px;transition:transform .25s ease,box-shadow .25s ease,border-color .25s}
body.r101-tires .image-gallery__images>div:hover{transform:translateY(-5px);box-shadow:0 16px 34px rgba(0,0,0,.12);border-color:#d8d5cf}
/* help bar (replaces separate text + button rows) */
body.r101-tires section.text .text__wrapper{padding-top:14px!important;padding-bottom:46px!important}
body.r101-tires .image-gallery__images{margin-left:0!important;margin-right:0!important;width:auto!important}
body.r101-tires .r101-help .in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;background:#fff;border:1px dashed #cfcac2;border-radius:16px;padding:16px 20px}
body.r101-tires .r101-help p{font:500 16px/1.45 Inter,sans-serif!important;color:var(--r101-ink);margin:0;text-align:left}
body.r101-tires .r101-help .b{display:flex;gap:10px;flex-wrap:wrap}
body.r101-tires .r101-help a{font:700 14px/1 Inter,sans-serif;text-decoration:none;padding:12px 18px;border-radius:999px;white-space:nowrap}
body.r101-tires .r101-help a.c{background:${O};color:#111}
body.r101-tires .r101-help a.q{border:1.5px solid var(--r101-ink);color:var(--r101-ink)}
body.r101-tires section.cta.r101-hide{display:none!important}
body.r101-tires section.text.r101-merged .text__container,body.r101-tires section.text.r101-merged .rx-content{display:none!important}
/* quote form */
body.r101-tires section.contact-form .contact-form__wrapper{background:var(--r101-ink)!important;padding-top:80px!important;padding-bottom:80px!important}
body.r101-tires section.contact-form .container{max-width:1440px}
body.r101-tires section.contact-form .form__block{margin-bottom:10px!important}
body.r101-tires section.contact-form .form__submit{margin-top:4px!important;padding-top:0!important}
body.r101-tires section.contact-form .contact-form__form{padding:0!important}
body.r101-tires section.contact-form .form__info:empty{display:none!important}
body.r101-tires section.contact-form .form__textarea{height:140px!important;min-height:120px!important}
@media (min-width:761px){body.r101-tires section.contact-form form{display:grid!important;grid-template-columns:1fr 1fr;gap:4px 20px}body.r101-tires section.contact-form form>*{grid-column:1/-1}body.r101-tires section.contact-form form>.form__block:nth-of-type(1){grid-column:1}body.r101-tires section.contact-form form>.form__block:nth-of-type(2){grid-column:2}}
body.r101-tires section.contact-form .contact-form__form,body.r101-tires section.contact-form .form__inner{max-width:none!important;width:100%!important}
body.r101-tires section.contact-form .form__heading{font-size:clamp(32px,4vw,52px)!important;line-height:1.05!important}
body.r101-tires section.contact-form form{background:#1c1c1c;border:1px solid #2c2c2c;border-radius:20px;padding:28px}
body.r101-tires section.contact-form .form__heading,body.r101-tires section.contact-form h2{color:#fff!important}
body.r101-tires section.contact-form p,body.r101-tires section.contact-form .form__label{color:#cfcfcf!important}
body.r101-tires section.contact-form .form__input,body.r101-tires section.contact-form .form__textarea{background:#111!important;border:1px solid #333!important;border-radius:12px!important;color:#fff!important;font:400 16px Inter,sans-serif!important;padding:14px!important}
body.r101-tires section.contact-form .form__input:focus,body.r101-tires section.contact-form .form__textarea:focus{border-color:${O}!important;outline:none;box-shadow:0 0 0 3px rgba(255,102,0,.25)}
body.r101-tires section.contact-form .form__submit .button{width:100%;background:${O}!important;color:#111!important;border-color:${O}!important}
/* phone */
@media (max-width:760px){
  body.r101-tires .image-gallery__images{gap:10px!important;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:6px}
  body.r101-tires .image-gallery__images::-webkit-scrollbar{display:none}
  body.r101-tires .image-gallery__images>div{flex:0 0 64%!important;width:64%!important;min-width:0!important;max-width:64%!important;scroll-snap-align:start;padding:6px;border-radius:12px}
  body.r101-tires .image-gallery__images>div .image-wrapper,body.r101-tires .image-gallery__images>div img{width:100%!important;min-width:0!important;height:auto!important;max-width:100%!important}
  body.r101-tires .r101-count .sw{display:inline}
  body.r101-tires .hero__buttons .button{width:100%;text-align:center}
  body.r101-tires .r101-help .in{flex-direction:column;align-items:stretch}
  body.r101-tires .r101-help a{text-align:center;flex:1}
  #r101-steps{padding:44px 16px}
  body.r101-tires section.contact-form form{padding:18px}
}
`;

  var LOGO_BASE = 'https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@456f6d88d7d815c32539b2b5362ea27ab5774a06/img/brands/';
  var TIRE_LOGOS = {   // slug: [file, width, height] of the balanced, trimmed logo
    'dunlop': ['dunlop', 540, 94], 'michelin': ['michelin', 526, 160], 'bridgestone': ['bridgestone', 540, 68],
    'metzeler': ['metzeler', 540, 102], 'pirelli': ['pirelli', 540, 115], 'shinko': ['shinko', 540, 106],
    'maxxis': ['maxxis', 540, 97], 'mitas': ['mitas', 540, 122]
  };
  var SPECS = null;   // tire spec cards, keyed by slug of the tire's name (e.g. "dunlop-elite-4")
  var SPECS_URL = 'https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@f531f9eecf91e1827ed149a4304434f04b03e043/data/tire-specs.json';
  function loadSpecs() {
    if (SPECS || !window.fetch) return;
    fetch(SPECS_URL).then(function (r) { return r.json(); }).then(function (j) { SPECS = j; }).catch(function () {});
  }
  function brandSlug(t) { return (t || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function tiresPage() {
    var main = document.querySelector('main');
    if (!main || document.getElementById('r101-steps')) return;
    document.body.classList.add('r101-tires');
    addStyle('r101-tires-css', TIRE_CSS);

    var hero = main.querySelector('section.hero');
    var form = main.querySelector('section.contact-form');
    if (form && !form.id) form.id = 'r101-quote';
    var QUOTE = form ? '#' + form.id : '#contact-form';

    // hero trust chips
    if (hero) {
      var btns = hero.querySelector('.hero__buttons');
      if (btns && !hero.querySelector('.r101-chips')) {
        var chips = document.createElement('div');
        chips.className = 'r101-chips';
        chips.innerHTML = '<span><b>&#10003;</b>Mounted &amp; balanced in-house</span><span><b>&#10003;</b>Street, adventure &amp; MX</span><span><b>&#10003;</b>Most installs while you wait</span>';
        btns.parentNode.insertBefore(chips, btns.nextSibling);
      }
    }

    // how it works
    var steps = document.createElement('section');
    steps.id = 'r101-steps';
    steps.innerHTML = '<div class="w container"><p class="eb">How it works</p><h2>New tires in 3 easy steps</h2><div class="g">' +
      '<div class="s"><div class="n">1</div><h3>Tell us your bike</h3><p>Send your year, make and model, or call. We\'ll match the right tire for how you ride.</p></div>' +
      '<div class="s"><div class="n">2</div><h3>We get your tires</h3><p>We source from top brands and confirm your price before anything is ordered.</p></div>' +
      '<div class="s"><div class="n">3</div><h3>Ride out on fresh rubber</h3><p>Mounted and balanced in-house in Carlsbad. Grab a free Red Bull or coffee and relax in our Rider Lounge, or ask about a loaner bike.</p></div>' +
      '</div></div>';
    if (hero) hero.parentNode.insertBefore(steps, hero.nextSibling);

    // brand blocks: anchors, alternating backgrounds, merged help bars
    var nav = [];
    var galleries = [].slice.call(main.querySelectorAll('section.image-gallery'));
    galleries.forEach(function (g, i) {
      var h = g.querySelector('.image-gallery__heading');
      if (!h) return;
      var brand = (h.textContent.split('...').pop() || h.textContent).trim();
      if (/more/i.test(brand) && h.innerHTML.indexOf('<br') > -1) brand = h.innerHTML.split(/<br\s*\/?>/i).pop().replace(/<[^>]+>/g, '').trim();
      h.textContent = brand;                     // drop the "Offering these top brands..." lead-in
      var lg = TIRE_LOGOS[brandSlug(brand)];
      if (lg) {                                  // show the brand's real logo; keep the name in the heading for Google
        h.textContent = '';
        var li = document.createElement('img');
        li.className = 'r101-blogo'; li.alt = brand + ' motorcycle tires'; li.loading = 'lazy';
        li.src = LOGO_BASE + 'tight-' + lg[0] + '.png'; li.width = Math.round(lg[1] * 0.46); li.height = Math.round(lg[2] * 0.46);
        var vh = document.createElement('span'); vh.className = 'r101-vh'; vh.textContent = brand;
        h.appendChild(li); h.appendChild(vh);
      }
      var n = g.querySelectorAll('.image-gallery__images > div').length;
      if (n) {
        var cnt = document.createElement('span');
        cnt.className = 'r101-count';
        cnt.innerHTML = n + ' tire' + (n > 1 ? 's' : '') + '<span class="sw"> &middot; swipe &rarr;</span>';
        h.appendChild(cnt);
      }
      var id = 'brand-' + brandSlug(brand);
      g.id = id;
      nav.push([brand, id]);
      var alt = i % 2 === 1;
      if (alt) g.classList.add('r101-alt');

      // following text + cta -> one help bar
      var t = g.nextElementSibling, c = t && t.nextElementSibling;
      if (t && t.matches('section.text')) {
        var msg = (t.innerText || '').trim();
        var bar = document.createElement('div');
        bar.className = 'r101-help container';
        bar.innerHTML = '<div class="in"><p>' + msg.replace(/</g, '&lt;') + '</p><div class="b">' +
          '<a class="c" href="tel:+18885095032">Call (888) 509-5032</a>' +
          '<a class="q" href="' + QUOTE + '">Get a quote</a></div></div>';
        var wrap = t.querySelector('.text__wrapper') || t;
        wrap.appendChild(bar);
        t.classList.add('r101-merged');
        if (alt) t.classList.add('r101-alt');
        if (c && c.matches('section.cta')) c.classList.add('r101-hide');
      }
    });

    // sticky brand nav after "how it works"
    if (nav.length) {
      var bn = document.createElement('div');
      bn.id = 'r101-brandnav';
      bn.innerHTML = '<div class="w container"><span class="lbl">Jump to</span>' +
        nav.map(function (n) { return '<a href="#' + n[1] + '">' + n[0].charAt(0) + n[0].slice(1).toLowerCase() + '</a>'; }).join('') +
        '<a href="' + QUOTE + '">Get a quote</a></div>';
      steps.parentNode.insertBefore(bn, steps.nextSibling);
      var setTop = function () {
        // sit right under the visible header bar (the drawer/menu pieces inside the header are ignored)
        var bar = document.querySelector('.header__content') || document.getElementById('header');
        var hb = bar ? bar.getBoundingClientRect().bottom : 0;
        bn.style.top = Math.max(0, Math.round(hb)) + 'px';
      };
      var tmr; var onMove = function () { setTop(); clearTimeout(tmr); tmr = setTimeout(setTop, 450); };
      setTop(); window.addEventListener('scroll', onMove, { passive: true }); window.addEventListener('resize', onMove);
      // highlight current brand
      if ('IntersectionObserver' in window) {
        var links = bn.querySelectorAll('a');
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (!e.isIntersecting) return;
            links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
          });
        }, { rootMargin: '-45% 0px -50% 0px' });
        galleries.forEach(function (g) { if (g.id) io.observe(g); });
      }
    }

    // quote form anchor (keep the existing #contact-form links working too)
  }

  /* ---------- TIRE PAGE: one-row brand carousels + tire close-up ---------- */
  var CAR_CSS = `
body.r101-car .r101-rail{position:relative}
body.r101-car .image-gallery__images{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important;grid-template-columns:none!important;scroll-snap-type:x mandatory;scroll-behavior:smooth;gap:18px!important;padding:8px 2px 16px!important;scrollbar-width:none}
body.r101-car .image-gallery__images::-webkit-scrollbar{display:none}
body.r101-car .image-gallery__images>div{flex:0 0 calc((100% - 72px)/4.5)!important;width:auto!important;max-width:none!important;min-width:0!important;scroll-snap-align:start;cursor:zoom-in}
body.r101-car .image-gallery__images>div .image-wrapper,body.r101-car .image-gallery__images>div img{width:100%!important;min-width:0!important;height:auto!important;max-width:100%!important}
body.r101-car .r101-arrow{position:absolute;top:50%;transform:translateY(-60%);z-index:5;width:46px;height:46px;border-radius:50%;border:1px solid var(--r101-line);background:#fff;color:var(--r101-ink);font:700 20px/44px Inter,sans-serif;text-align:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.14);transition:opacity .2s,transform .2s;padding:0}
body.r101-car .r101-arrow:hover{background:var(--r101-ink);color:#fff}
body.r101-car .r101-arrow.l{left:-22px}
body.r101-car .r101-arrow.r{right:-22px}
body.r101-car .r101-arrow[disabled]{opacity:0;pointer-events:none}
@media (max-width:1100px){body.r101-car .image-gallery__images>div{flex-basis:calc((100% - 36px)/3.3)!important}body.r101-car .r101-arrow.l{left:4px}body.r101-car .r101-arrow.r{right:4px}}
@media (max-width:760px){
  body.r101-car .image-gallery__images>div{flex:0 0 64%!important}
  body.r101-car .r101-arrow{display:none}
}
#r101-lb{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;padding:20px}
#r101-lb.open{display:flex}
#r101-lb .bg{position:absolute;inset:0;background:rgba(10,10,10,.82);backdrop-filter:blur(4px)}
#r101-lb .box{position:relative;background:#fff;border-radius:22px;width:min(920px,100%);max-height:calc(100vh - 40px);overflow:auto;display:grid;grid-template-columns:1.15fr 1fr;box-shadow:0 30px 80px rgba(0,0,0,.5)}
#r101-lb .pic{background:#f5f4f1;display:flex;align-items:center;justify-content:center;padding:18px;position:relative;touch-action:pan-y}
#r101-lb .pic img{width:100%;height:auto;max-height:70vh;object-fit:contain;border-radius:12px}
#r101-lb .meta{padding:34px 30px;display:flex;flex-direction:column;gap:14px}
#r101-lb .br{font:600 13px/1 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${O}}
#r101-lb h3{font-family:Anton,sans-serif;text-transform:uppercase;font-size:clamp(28px,3.4vw,40px);line-height:1.02;margin:0;color:var(--r101-ink)}
#r101-lb .txt{font:400 16px/1.32 Inter,sans-serif;color:var(--r101-mute);margin:0}
#r101-lb .btns{display:flex;flex-direction:column;gap:10px;margin-top:6px}
#r101-lb .btns a{display:block;text-align:center;text-decoration:none;font:700 16px/1 Inter,sans-serif;padding:16px 18px;border-radius:999px}
#r101-lb .btns a.q{background:${O};color:#111}
#r101-lb .btns a.c{border:1.5px solid var(--r101-ink);color:var(--r101-ink)}
#r101-lb a.spec{align-self:flex-start;font:600 13px/1 Inter,sans-serif;color:#777;text-decoration:underline;text-underline-offset:3px;margin-top:4px}
#r101-lb a.spec:hover{color:var(--r101-ink)}
#r101-lb .x{position:absolute;top:12px;right:12px;z-index:3;width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.95);font:400 26px/40px Inter,sans-serif;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.15);padding:0;color:#111}
#r101-lb .nv{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;border:0;background:rgba(255,255,255,.95);font:700 18px/42px Inter,sans-serif;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.15);padding:0;color:#111}
#r101-lb .nv.p{left:12px}
#r101-lb .nv.n{right:12px}
#r101-lb .box{position:relative;overflow-x:hidden}
#r101-lb a.sp2{display:block;text-align:center;text-decoration:none;font:700 15px/1 Inter,sans-serif;padding:14px 18px;border-radius:999px;background:#f1efea;color:var(--r101-ink);border:1px solid var(--r101-line)}
#r101-lb a.sp2:hover{background:var(--r101-ink);color:#fff}
#r101-lb .spc{display:none;position:relative;grid-column:1/-1;background:#fff;overflow:hidden}
#r101-lb .box.sp-on .pic,#r101-lb .box.sp-on .meta{display:none}
#r101-lb .box.sp-on .spc{display:block;animation:r101-spin .45s cubic-bezier(.2,.75,.25,1)}
@keyframes r101-spin{from{transform:translateX(70px);opacity:0}to{transform:none;opacity:1}}
#r101-lb .spc .sbg{position:absolute;inset:0;background-repeat:no-repeat;background-position:center 46%;background-size:auto 150%;opacity:.12;filter:grayscale(1) contrast(1.25);pointer-events:none}
#r101-lb .spc .si{position:relative;max-width:560px;margin:0 auto;padding:30px 30px 24px}
#r101-lb .spc .bk{position:absolute;top:14px;left:14px;z-index:2;border:1px solid var(--r101-line);background:#fff;border-radius:999px;padding:9px 14px;font:600 13px/1 Inter,sans-serif;color:var(--r101-ink);cursor:pointer}
#r101-lb .spc .lg{height:40px;width:auto;max-width:70%;display:block;margin:6px auto 10px;object-fit:contain}
#r101-lb .spc h4{font-family:Anton,sans-serif;text-transform:uppercase;text-align:center;font-size:clamp(28px,3.2vw,38px);line-height:1;margin:0 0 6px;color:var(--r101-ink);letter-spacing:.02em}
#r101-lb .spc .tg{text-align:center;font:600 12px/1 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${O};margin:0 0 14px}
#r101-lb .spc .sy{font:400 15px/1.5 Inter,sans-serif;color:#444;text-align:center;margin:0 0 16px}
#r101-lb .spc table{width:100%;border-collapse:collapse;margin:0 0 18px}
#r101-lb .spc td{padding:8px 0;border-top:1px solid #ebe8e2;vertical-align:top;font:400 14px/1.4 Inter,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:#444}
#r101-lb .spc td:first-child{width:34%;font-weight:700!important;color:var(--r101-ink);padding-right:12px}
#r101-lb .spc .sb{display:flex;gap:10px}
#r101-lb .spc .sb a{flex:1;text-align:center;text-decoration:none;font:700 14px/1 Inter,sans-serif;padding:15px 10px;border-radius:999px}
#r101-lb .spc .sb a.q2{background:${O};color:#111}
#r101-lb .spc .sb a.c2{border:1.5px solid var(--r101-ink);color:var(--r101-ink)}
#r101-lb .spc .mf{display:block;text-align:center;margin-top:12px;font:500 12px Inter,sans-serif;color:#9a9a9a;text-decoration:none}
@media (max-width:760px){#r101-lb .spc .si{padding:56px 18px 22px}}
#r101-lb .ct{position:absolute;top:14px;left:14px;font:600 12px/1 Inter,sans-serif;color:#666;background:rgba(255,255,255,.9);padding:6px 10px;border-radius:999px}
@media (max-width:760px){
  #r101-lb{padding:0;align-items:flex-end}
  #r101-lb .box{grid-template-columns:1fr;border-radius:22px 22px 0 0;max-height:94vh}
  #r101-lb .pic img{max-height:46vh}
  #r101-lb .meta{padding:20px 18px 26px}
}
`;

  function track(name, params) { try { if (typeof window.gtag === 'function') window.gtag('event', name, params); } catch (e) {} }

  function bestSrc(tile) {
    var img = tile.querySelector('img');
    var best = img ? (img.currentSrc || img.src) : '';
    var bestW = 0;
    var srcs = [].slice.call(tile.querySelectorAll('source')).map(function (s) { return s.srcset || ''; });
    if (img && img.srcset) srcs.push(img.srcset);
    srcs.forEach(function (ss) {
      ss.split(',').forEach(function (part) {
        var bits = part.trim().split(/\s+/);
        var w = parseInt(bits[1], 10);
        if (bits[0] && w && w > bestW && w <= 1300) { bestW = w; best = bits[0]; }
      });
    });
    return best;
  }

  function carousels() {
    var main = document.querySelector('main');
    if (!main || document.getElementById('r101-lb')) return;
    document.body.classList.add('r101-car');
    addStyle('r101-car-css', CAR_CSS);
    var form = main.querySelector('section.contact-form');

    // one rail per brand, with arrows
    [].slice.call(main.querySelectorAll('section.image-gallery .image-gallery__images')).forEach(function (row) {
      if (row.parentNode.classList.contains('r101-rail')) return;
      var rail = document.createElement('div');
      rail.className = 'r101-rail';
      row.parentNode.insertBefore(rail, row);
      rail.appendChild(row);
      var l = document.createElement('button'); l.className = 'r101-arrow l'; l.type = 'button'; l.setAttribute('aria-label', 'Previous tires'); l.innerHTML = '&larr;';
      var r = document.createElement('button'); r.className = 'r101-arrow r'; r.type = 'button'; r.setAttribute('aria-label', 'More tires'); r.innerHTML = '&rarr;';
      rail.appendChild(l); rail.appendChild(r);
      var upd = function () {
        l.disabled = row.scrollLeft < 8;
        r.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 8;
      };
      l.addEventListener('click', function () { row.scrollBy({ left: -row.clientWidth * 0.85, behavior: 'smooth' }); });
      r.addEventListener('click', function () { row.scrollBy({ left: row.clientWidth * 0.85, behavior: 'smooth' }); });
      row.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('resize', upd);
      upd(); setTimeout(upd, 800);
    });

    // close-up viewer
    var lb = document.createElement('div');
    lb.id = 'r101-lb';
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Tire close-up');
    lb.innerHTML = '<div class="bg"></div><div class="box"><button class="x" type="button" aria-label="Close">&times;</button>' +
      '<div class="pic"><button class="nv p" type="button" aria-label="Previous tire">&larr;</button><img alt=""><button class="nv n" type="button" aria-label="Next tire">&rarr;</button><span class="ct"></span></div>' +
      '<div class="meta"><div class="br"></div><h3></h3><p class="txt">Mounted and balanced in-house at Route 101 in Carlsbad. Tell us your bike and we\'ll confirm fitment and price.</p>' +
      '<div class="btns"><a class="sp2" href="#" style="display:none">See tire specs</a><a class="q" href="#">Get a quote on this tire</a><a class="c" href="tel:+18885095032">Call (888) 509-5032</a></div>' +
      '<a class="spec" href="#" target="_blank" rel="noopener"></a></div>' +
      '<div class="spc" aria-hidden="true"><div class="sbg"></div><button class="bk" type="button">&larr; Back to photo</button><div class="si">' +
      '<img class="lg" alt=""><h4></h4><p class="tg"></p><p class="sy"></p><table></table>' +
      '<div class="sb"><a class="q2" href="#">GET A QUOTE</a><a class="c2" href="tel:+18885095032">CALL US</a></div>' +
      '<a class="mf" href="#" target="_blank" rel="noopener">Manufacturer page &#8599;</a></div></div></div>';
    document.body.appendChild(lb);
    var el = function (s) { return lb.querySelector(s); };
    var cur = { tiles: [], i: 0, brand: '' };

    function info(tile) {
      var img = tile.querySelector('img');
      var a = tile.querySelector('a[href]');
      var alt = (img && img.alt || '').replace(/\s*Motorcycle Tires?\s*$/i, '').trim();
      return { name: alt || (cur.brand + ' tire'), src: bestSrc(tile), href: a ? a.href : '' };
    }
    function show(i) {
      var n = cur.tiles.length;
      cur.i = (i + n) % n;
      var t = info(cur.tiles[cur.i]);
      var im = el('.pic img'); im.src = t.src; im.alt = t.name;
      el('h3').textContent = t.name;
      el('.br').textContent = cur.brand;
      el('.ct').textContent = (cur.i + 1) + ' / ' + n;
      el('.nv.p').style.display = el('.nv.n').style.display = n > 1 ? '' : 'none';
      var sp = el('a.spec');
      var spec = SPECS && SPECS[brandSlug(t.name)];
      lb.querySelector('.box').classList.remove('sp-on');
      el('a.sp2').style.display = spec ? '' : 'none';
      cur.spec = spec ? { d: spec, t: t } : null;
      if (!spec && t.href && t.href.indexOf(location.host) === -1) { sp.href = t.href; sp.textContent = cur.brand + ' tire specs ↗'; sp.style.display = ''; }
      else sp.style.display = 'none';
      track('tire_closeup', { tire_name: t.name, brand: cur.brand });
    }
    function open(tile) {
      var g = tile.closest('section.image-gallery');
      var h = g && g.querySelector('.image-gallery__heading');
      var vh = h && h.querySelector('.r101-vh');
      var b = vh ? vh.textContent.trim() : h ? (h.firstChild && h.firstChild.nodeType === 3 ? h.firstChild.nodeValue : h.textContent).trim() : '';
      cur.brand = b ? b.charAt(0) + b.slice(1).toLowerCase() : '';
      cur.tiles = [].slice.call(tile.parentNode.children);
      lb.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      show(cur.tiles.indexOf(tile));
      el('.x').focus();
    }
    function close() { lb.classList.remove('open'); lb.querySelector('.box').classList.remove('sp-on'); document.documentElement.style.overflow = ''; }

    main.addEventListener('click', function (e) {
      var tile = e.target.closest && e.target.closest('section.image-gallery .image-gallery__images > div');
      if (!tile) return;
      e.preventDefault(); e.stopPropagation();
      open(tile);
    }, true);
    el('.bg').addEventListener('click', close);
    el('.x').addEventListener('click', close);
    el('.nv.p').addEventListener('click', function () { show(cur.i - 1); });
    el('.nv.n').addEventListener('click', function () { show(cur.i + 1); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur.i - 1);
      if (e.key === 'ArrowRight') show(cur.i + 1);
    });
    var sx = null;
    el('.pic').addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    el('.pic').addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 45) show(cur.i + (dx < 0 ? 1 : -1));
    });
    function openSpec() {
      if (!cur.spec) return;
      var d = cur.spec.d, t = cur.spec.t, c = el('.spc');
      var lg = TIRE_LOGOS[brandSlug(cur.brand)];
      var li = el('.spc .lg');
      if (lg) { li.src = LOGO_BASE + 'tight-' + lg[0] + '.png'; li.alt = cur.brand; li.style.display = ''; } else li.style.display = 'none';
      el('.spc .sbg').style.backgroundImage = 'url("' + t.src + '")';
      el('.spc h4').textContent = d.model;
      el('.spc .tg').textContent = d.tag || '';
      el('.spc .sy').textContent = d.syn || '';
      var tb = el('.spc table'); tb.innerHTML = '';
      Object.keys(d.rows || {}).forEach(function (k) {
        var tr = document.createElement('tr'), a = document.createElement('td'), b = document.createElement('td');
        a.textContent = k; b.textContent = d.rows[k]; tr.appendChild(a); tr.appendChild(b); tb.appendChild(tr);
      });
      var mf = el('.spc .mf');
      if (t.href && t.href.indexOf(location.host) === -1) { mf.href = t.href; mf.style.display = ''; } else mf.style.display = 'none';
      lb.querySelector('.box').classList.add('sp-on'); lb.querySelector('.box').scrollTop = 0; c.setAttribute('aria-hidden', 'false');
      track('tire_specs_view', { tire_name: t.name, brand: cur.brand });
    }
    el('a.sp2').addEventListener('click', function (e) { e.preventDefault(); openSpec(); });
    el('.spc .bk').addEventListener('click', function () { lb.querySelector('.box').classList.remove('sp-on'); el('.spc').setAttribute('aria-hidden', 'true'); });
    el('.spc .q2').addEventListener('click', function (e) { e.preventDefault(); el('a.q').click(); });
    el('.spc .c2').addEventListener('click', function () { track('tire_call_click', { tire_name: el('h3').textContent, brand: cur.brand, from: 'specs' }); });
    el('.spc .mf').addEventListener('click', function () { track('tire_specs_click', { tire_name: el('h3').textContent, brand: cur.brand }); });
    el('a.spec').addEventListener('click', function () { track('tire_specs_click', { tire_name: el('h3').textContent, brand: cur.brand }); });
    el('a.c').addEventListener('click', function () { track('tire_call_click', { tire_name: el('h3').textContent, brand: cur.brand }); });
    el('a.q').addEventListener('click', function (e) {
      e.preventDefault();
      var name = el('h3').textContent;
      track('tire_quote_click', { tire_name: name, brand: cur.brand });
      close();
      if (!form) return;
      var ta = form.querySelector('textarea');
      if (ta && ta.value.indexOf(name) === -1) {
        ta.value = 'Tire: ' + name + (ta.value ? '\n' + ta.value : '\nMy bike (year / make / model): ');
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { var f = form.querySelector('input[type=text],input:not([type=hidden])'); if (f) f.focus({ preventScroll: true }); }, 700);
    });
  }

  /* ---------- HEADER (every page) ---------- */
  var HDR_CSS = `
body.r101-hdr #header .top-bar__wrapper{background:#0b0b0b!important;padding-top:7px!important;padding-bottom:7px!important;border-bottom:1px solid rgba(255,255,255,.06)}
body.r101-hdr #header .top-bar,body.r101-hdr #header .top-bar p,body.r101-hdr #header .top-bar span,body.r101-hdr #header .top-bar a,body.r101-hdr #header .top-bar a *{font-family:Inter,system-ui,sans-serif!important;font-size:13px!important;letter-spacing:0!important;text-transform:none!important}
body.r101-hdr #header .top-bar,body.r101-hdr #header .top-bar p,body.r101-hdr #header .top-bar span{color:#bdbdbd!important}
body.r101-hdr #header .top-bar a[href^="tel:"]{color:${O}!important;font-weight:700!important;text-decoration:none!important}
body.r101-hdr #header .top-bar a:not([href^="tel:"]){color:#fff!important;text-decoration:none!important;font-weight:500!important}
body.r101-hdr #header .top-bar a:not([href^="tel:"]):hover{color:${O}!important}
body.r101-hdr #header .top-bar .icon svg{color:${O};fill:currentColor}
body.r101-hdr #header .header__inner{background:rgba(14,14,14,.9)!important;-webkit-backdrop-filter:saturate(1.3) blur(14px);backdrop-filter:saturate(1.3) blur(14px);border-bottom:1px solid rgba(255,255,255,.08)}
body.r101-hdr #header bq-date-picker{--date-picker-border-radius:999px;--date-picker-wrapper-padding:11px 20px;--date-picker-text-size:13px;--date-picker-background-color:${O};--date-picker-text-color:#111;--date-picker-icon-color:#111;--date-picker-border-color:${O}}
body.r101-hdr #header .menu__opener{border-radius:999px!important}
body.r101-hdr #header .header__search-opener{border-radius:999px!important;border-color:rgba(255,255,255,.25)!important;color:#fff!important;background:rgba(255,255,255,.04)}
body.r101-hdr #header .header__search-opener:hover{border-color:${O}!important}
body.r101-hdr #header .header__search-opener svg,body.r101-hdr #header .header__search-opener svg *{stroke:#fff;color:#fff}
.r101-nav{display:none}
@media (min-width:1025px){
  body.r101-hdr #header .header__content{padding-top:10px!important;padding-bottom:10px!important}
  body.r101-hdr #header .header__content-inner{display:flex!important;grid-template-columns:none!important;gap:22px;align-items:center}
  body.r101-hdr #header .header__logo{flex:0 0 auto;width:auto!important}
  body.r101-hdr #header .header__logo img{max-height:52px;width:auto}
  body.r101-hdr #header .header__date-picker-wrapper{flex:0 1 330px!important;max-width:330px!important;margin-left:auto}
  body.r101-hdr #header .header__buttons{flex:0 0 auto;width:auto!important;gap:10px}
  .r101-nav{display:flex;align-items:center;gap:4px;margin-left:8px}
}
.r101-nav a{font:600 14px/1 Inter,system-ui,sans-serif;color:#e8e8e8;text-decoration:none;padding:10px 12px;border-radius:999px;white-space:nowrap;transition:background .2s,color .2s;position:relative}
.r101-nav a:hover{background:rgba(255,255,255,.08);color:#fff}
.r101-nav a.on{color:#fff}
.r101-nav a.on:after{content:"";position:absolute;left:12px;right:12px;bottom:3px;height:2px;border-radius:2px;background:${O}}
@media (max-width:1320px){.r101-nav{display:none!important}}
`;
  var NAV = [['Rentals', '/collections'], ['Harley Service', '/pages/san-diego-harley-service'], ['BMW GS Service', '/pages/san-diego-bmw-gs-service'], ['Tires', '/pages/motorcycle-tires']];

  function cartIcon() {
    var mc = document.querySelector('#header bq-minicart-button');
    if (mc && mc.shadowRoot && !mc.shadowRoot.getElementById('r101-mc')) {
      var s = document.createElement('style');
      s.id = 'r101-mc';
      s.textContent = 'div{border-color:rgba(255,255,255,.25)!important;border-radius:999px!important}div:hover{border-color:' + O + '!important}svg,svg path{fill:#fff!important;color:#fff!important}';
      mc.shadowRoot.appendChild(s);
      return true;
    }
    return !!(mc && mc.shadowRoot && mc.shadowRoot.getElementById('r101-mc'));
  }

  function dpText() {
    var dp = document.querySelector('#header bq-date-picker');
    if (dp && dp.shadowRoot && !dp.shadowRoot.getElementById('r101-dp')) {
      var s = document.createElement('style');
      s.id = 'r101-dp';
      s.textContent = '.bq-date-picker,.bq-date-picker *{color:#111!important}.bq-date-picker svg,.bq-date-picker svg path{fill:#111!important;color:#111!important}';
      dp.shadowRoot.appendChild(s);
      return true;
    }
    return !!(dp && dp.shadowRoot && dp.shadowRoot.getElementById('r101-dp'));
  }

  function header() {
    var hd = document.getElementById('header');
    if (!hd) return;
    document.body.classList.add('r101-hdr');
    addStyle('r101-hdr-css', HDR_CSS);
    var logo = hd.querySelector('.header__logo');
    if (logo && !hd.querySelector('.r101-nav')) {
      var here = location.pathname.replace(/\/$/, '');
      var nav = document.createElement('nav');
      nav.className = 'r101-nav'; nav.setAttribute('aria-label', 'Main');
      nav.innerHTML = NAV.map(function (l) { return '<a href="' + l[1] + '"' + (here === l[1] ? ' class="on"' : '') + '>' + l[0] + '</a>'; }).join('');
      logo.parentNode.insertBefore(nav, logo.nextSibling);
    }
    // cart + date picker render late: retry briefly
    var tries = 0, t = setInterval(function () { var a = cartIcon(), b = dpText(); if ((a && b) || ++tries > 20) clearInterval(t); }, 300);
  }

  /* ---------- FOOTER (every page) ---------- */
  var FTR_CSS = `
#r101-cta{background:${O};color:#111;padding:44px 0}
#r101-cta .w{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 32px}
#r101-cta h2{font-family:Anton,sans-serif;text-transform:uppercase;font-size:clamp(26px,3vw,40px)!important;line-height:1.04!important;margin:0 0 6px;color:#111}
#r101-cta p{font:500 17px/1.35 Inter,system-ui,sans-serif;margin:0;color:#1d1d1d}
#r101-cta .b{display:flex;flex-wrap:wrap;gap:10px}
#r101-cta .b a{font:700 15px/1 Inter,system-ui,sans-serif;text-decoration:none;padding:15px 22px;border-radius:999px;white-space:nowrap;transition:transform .2s}
#r101-cta .b a:hover{transform:translateY(-2px)}
#r101-cta .b a.p{background:#111;color:#fff}
#r101-cta .b a.s{border:2px solid #111;color:#111}
body.r101-ftr footer .footer__wrapper{background:#0e0e0e!important;color:#b5b5b5}
body.r101-ftr footer .footer__top{display:grid!important;grid-template-columns:minmax(240px,1fr) 3fr;gap:48px;padding-top:56px!important;padding-bottom:36px!important;align-items:start}
body.r101-ftr .r101-fbrand .footer__logo{margin:0 0 16px!important;padding:0!important}
body.r101-ftr .r101-fbrand .footer__logo img{max-height:64px;width:auto}
body.r101-ftr .r101-fbrand .tag{font-family:Anton,sans-serif;color:#fff;font-size:20px;letter-spacing:.02em;margin:0 0 16px}
body.r101-ftr .r101-fbrand ul{list-style:none;margin:0 0 18px;padding:0}
body.r101-ftr .r101-fbrand li{font:400 14px/1.3 Inter,system-ui,sans-serif;color:#b5b5b5;margin:0 0 8px}
body.r101-ftr .r101-fbrand li b{display:block;color:#fff;font-weight:600;font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:2px}
body.r101-ftr .r101-fbrand a{color:#fff;text-decoration:none}
body.r101-ftr .r101-fbrand a:hover{color:${O}}
body.r101-ftr .r101-fbrand a.tel{color:${O};font-weight:700;font-size:18px}
body.r101-ftr .r101-fbrand .footer__social{margin:0!important;padding:0!important;width:auto!important;display:block!important}
body.r101-ftr .r101-fbrand li *{font-family:Inter,system-ui,sans-serif!important;letter-spacing:inherit}
body.r101-ftr .r101-fbrand li b{letter-spacing:.12em!important}
body.r101-ftr .r101-fbrand .social-networks{justify-content:flex-start!important;margin:0!important;padding:0!important}
body.r101-ftr .r101-fbrand .social-networks__item{margin:0!important;padding:0!important}
body.r101-ftr .r101-fbrand .social-networks{display:flex;gap:10px;flex-wrap:wrap}
body.r101-ftr .r101-fbrand .social-networks__link{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;color:#fff}
body.r101-ftr .r101-fbrand .social-networks__link:hover{border-color:${O};color:${O}}
body.r101-ftr footer .footer__menu{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px;width:auto!important}
body.r101-ftr footer .footer__menu-wrapper{width:auto!important;margin:0!important}
body.r101-ftr footer .footer__menu-heading{display:flex;justify-content:space-between;align-items:center;font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:18px!important;letter-spacing:.02em;color:#fff!important;margin:0 0 10px}
body.r101-ftr footer .footer__menu-item{margin:0 0 6px!important;padding:0!important;line-height:1.3!important}
body.r101-ftr footer .footer__menu-link{padding:0!important;display:inline!important;font:400 14px/1.3 Inter,system-ui,sans-serif!important;color:#b5b5b5!important;text-decoration:none;text-transform:none!important;letter-spacing:0!important}
body.r101-ftr footer .footer__menu-link:hover{color:${O}!important}
body.r101-ftr footer .r101-x{display:none!important}
body.r101-ftr footer .all .r101-x{display:list-item!important}
body.r101-ftr footer .r101-all{background:none;border:0;padding:4px 0;color:#fff;font:600 13px/1 Inter,system-ui,sans-serif;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
body.r101-ftr footer .r101-all:hover{color:${O}}
body.r101-ftr footer .footer__bottom{border-top:1px solid #222;padding-top:20px!important;padding-bottom:26px!important;display:block!important}
body.r101-ftr footer .footer__copy{display:block!important}
body.r101-ftr footer .footer__copy>p,body.r101-ftr footer .footer__copy>p *{font:400 13px/1.5 Inter,system-ui,sans-serif!important;color:#8a8a8a!important;margin:0 0 12px}
body.r101-ftr footer .footer__bottom-menu{width:auto!important}
body.r101-ftr footer .footer__bottom-menu-list{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;align-items:center}
body.r101-ftr footer .footer__bottom-menu-item{margin:0!important;padding:0!important}
body.r101-ftr footer .footer__bottom-menu-item:before,body.r101-ftr footer .footer__bottom-menu-item:after{display:none!important}
body.r101-ftr footer .footer__bottom-menu-link{font:400 12px/1 Inter,system-ui,sans-serif!important;color:#8a8a8a!important;text-decoration:none;border:1px solid #262626;border-radius:999px;padding:7px 11px;display:inline-block;text-transform:none!important;letter-spacing:0!important}
body.r101-ftr footer .footer__bottom-menu-link:hover{color:#fff!important;border-color:#444}
body.r101-ftr footer .r101-pop{font:600 11px/1 Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#666;margin-right:6px}
@media (max-width:1024px){body.r101-ftr footer .footer__top{grid-template-columns:1fr;gap:32px}body.r101-ftr footer .footer__menu{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:760px){
  #r101-cta{padding:34px 0}
  #r101-cta .b{width:100%}
  #r101-cta .b a{flex:1 1 100%;text-align:center}
  body.r101-ftr footer .footer__top{padding-top:36px!important;padding-bottom:10px!important;gap:22px}
  body.r101-ftr footer .footer__menu{grid-template-columns:1fr;gap:0}
  body.r101-ftr footer .footer__menu-wrapper{border-top:1px solid #222}
  body.r101-ftr footer .footer__menu-heading{margin:0;padding:16px 0;cursor:pointer;font-size:17px!important}
  body.r101-ftr footer .footer__menu-heading:after{content:"+";font-family:Inter,sans-serif;font-size:22px;color:${O}}
  body.r101-ftr footer .open .footer__menu-heading:after{content:"\\2013"}
  body.r101-ftr footer .footer__menu-list{display:none!important}
  body.r101-ftr footer .open .footer__menu-list{display:block!important;padding-bottom:12px}
  body.r101-ftr footer .r101-x{display:list-item!important}
  body.r101-ftr footer .r101-all{display:none}
  body.r101-ftr footer .footer__bottom-menu{display:none!important}
}
`;

  function footer() {
    // the site footer (review cards also contain <footer> tags, so skip anything inside the page content)
    var f = [].slice.call(document.querySelectorAll('footer')).filter(function (x) { return !x.closest('main') && !x.closest('blockquote, [class*=testimonial]'); }).pop();
    if (!f || f.querySelector('.r101-fbrand')) return;
    document.body.classList.add('r101-ftr');
    addStyle('r101-ftr-css', FTR_CSS);

    // 'Get a quote' goes to this page's own quote form if it has one, otherwise to Contact Us
    var pf = document.querySelector('main section.contact-form');
    if (pf && !pf.id) pf.id = 'r101-quote';
    var quote = pf ? '#' + pf.id : '/pages/contact-us';
    var cta = document.createElement('section');
    cta.id = 'r101-cta';
    cta.innerHTML = '<div class="w container"><div><h2>Need tires, service or a rental?</h2><p>Route 101 Motorsports &amp; Garage &middot; Carlsbad, CA</p></div>' +
      '<div class="b"><a class="p" href="tel:+18885095032">Call (888) 509-5032</a><a class="s" href="' + quote + '">Get a quote</a><a class="s" href="/collections">Book a rental</a></div></div>';
    f.parentNode.insertBefore(cta, f);

    var top = f.querySelector('.footer__top');
    if (top) {
      var brand = document.createElement('div');
      brand.className = 'r101-fbrand';
      var logo = f.querySelector('.footer__logo');
      if (logo) brand.appendChild(logo);
      // garage pages show the garage inbox, everything else the main inbox
      var mail = /^\/pages\/(san-diego-harley-service|san-diego-bmw-gs-service|harley-brake-service|motorcycle-tires|straight-talk-route-101-motorsports-offers-)/.test(location.pathname) ? 'garage@route101motorsports.com' : 'info@route101motorsports.com';
      var info = document.createElement('div');
      info.innerHTML = '<ul>' +
        '<li><b>Call</b><a class="tel" href="tel:+18885095032">(888) 509-5032</a></li>' +
        '<li><b>Hours</b>Open 7 days, 8am&ndash;6pm (by appointment)</li>' +
        '<li><b>Visit</b>6351 Corte Del Abeto #107<br>Carlsbad, CA 92011<br><a href="https://www.google.com/maps/search/?api=1&amp;query=Route+101+Motorsports+6351+Corte+Del+Abeto+107+Carlsbad+CA+92011" target="_blank" rel="noopener">Get directions &rarr;</a></li>' +
        '<li><b>Email</b><a href="mailto:' + mail + '">' + mail + '</a></li></ul>';
      brand.appendChild(info);
      var social = f.querySelector('.footer__social');
      if (social) brand.appendChild(social);
      top.insertBefore(brand, top.firstChild);
    }

    [].slice.call(f.querySelectorAll('.footer__menu-wrapper')).forEach(function (w) {
      var h = w.querySelector('.footer__menu-heading');
      var items = [].slice.call(w.querySelectorAll('.footer__menu-item'));
      if (items.length > 6) {
        items.slice(6).forEach(function (li) { li.classList.add('r101-x'); });
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'r101-all';
        btn.textContent = 'See all';
        btn.addEventListener('click', function () {
          var all = w.classList.toggle('all');
          btn.textContent = all ? 'Show less' : 'See all';
        });
        w.appendChild(btn);
      }
      if (h) {
        h.setAttribute('role', 'button'); h.setAttribute('tabindex', '0');
        var tog = function () { w.classList.toggle('open'); };
        h.addEventListener('click', tog);
        h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      }
    });

    // remove 'Powered by Booqable' (and the separator before it)
    var pb = f.querySelector('.footer__copy a[href*="booqable"]');
    if (pb) { var prev = pb.previousSibling; if (prev && prev.nodeType === 3) prev.nodeValue = prev.nodeValue.replace(/\s*\|\s*$/, ''); pb.parentNode.removeChild(pb); }

    var bl = f.querySelector('.footer__bottom-menu-list');
    if (bl && !f.querySelector('.r101-pop')) {
      var lab = document.createElement('li');
      lab.className = 'r101-pop'; lab.textContent = 'Popular searches';
      bl.insertBefore(lab, bl.firstChild);
    }
  }

  /* ---------- QUOTE FORMS (every page that has one) ---------- */
  var FORM_CSS = `
body.r101-form section.contact-form .contact-form__wrapper{background:var(--r101-ink)!important;padding-top:72px!important;padding-bottom:72px!important}
body.r101-form section.contact-form .container{max-width:1440px}
body.r101-form section.contact-form .contact-form__form,body.r101-form section.contact-form .form__inner{max-width:none!important;width:100%!important;padding:0!important;border:0!important;background:none!important}
body.r101-form section.contact-form .form__heading,body.r101-form section.contact-form h2{color:#fff!important;font-size:clamp(30px,3.6vw,48px)!important;line-height:1.04!important}
body.r101-form section.contact-form p,body.r101-form section.contact-form li,body.r101-form section.contact-form .form__label{color:#cfcfcf!important}
body.r101-form section.contact-form ul{margin:6px 0 14px;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:6px 18px}
body.r101-form section.contact-form ul li{font:400 15px/1.3 Inter,system-ui,sans-serif!important;padding-left:20px;position:relative}
body.r101-form section.contact-form ul li:before{content:"\\2713";position:absolute;left:0;color:${O};font-weight:700}
body.r101-form section.contact-form form{background:#1c1c1c;border:1px solid #2c2c2c;border-radius:20px;padding:26px}
body.r101-form section.contact-form .form__block{margin-bottom:10px!important}
body.r101-form section.contact-form .form__info:empty{display:none!important}
body.r101-form section.contact-form .form__submit{margin-top:4px!important;padding-top:0!important}
body.r101-form section.contact-form .form__input,body.r101-form section.contact-form .form__textarea{background:#111!important;border:1px solid #333!important;border-radius:12px!important;color:#fff!important;font:400 16px Inter,sans-serif!important;padding:14px!important}
body.r101-form section.contact-form .form__textarea{height:140px!important;min-height:120px!important}
body.r101-form section.contact-form textarea::placeholder{color:#8a8a8a!important;opacity:1!important;line-height:1.35}
body.r101-form section.contact-form .form__input:focus,body.r101-form section.contact-form .form__textarea:focus{border-color:${O}!important;outline:none;box-shadow:0 0 0 3px rgba(255,102,0,.25)}
body.r101-form section.contact-form .form__submit .button{width:100%;background:${O}!important;color:#111!important;border-color:${O}!important}
@media (min-width:761px){body.r101-form section.contact-form form{display:grid!important;grid-template-columns:1fr 1fr;gap:4px 20px}body.r101-form section.contact-form form>*{grid-column:1/-1}body.r101-form section.contact-form form>.form__block:nth-of-type(1){grid-column:1}body.r101-form section.contact-form form>.form__block:nth-of-type(2){grid-column:2}}
@media (max-width:760px){body.r101-form section.contact-form form{padding:18px}}
`;
  function forms() {
    if (!document.querySelector('main section.contact-form')) return;
    document.body.classList.add('r101-form');
    addStyle('r101-form-css', FORM_CSS);
    var p = location.pathname.replace(/\/+$/, '');
    var ph = {
      '/pages/harley-brake-service': 'Year, make & model (e.g. 2019 Street Glide), plus front only or front & rear?',
      '/pages/motorcycle-tires': 'Year, make & model, tire brand or size if you know it, and front, rear or both?',
      '/pages/san-diego-harley-service': 'Year, make & model, current mileage, and what service you need.',
      '/pages/san-diego-bmw-gs-service': 'Year & model (e.g. 2021 R 1250 GSA), mileage, and what you need.'
    }[p] || 'Year, make & model of your bike, and how we can help.';
    document.querySelectorAll('main section.contact-form textarea').forEach(function (t) { t.setAttribute('placeholder', ph); });
  }

  /* ---------- HARLEY BRAKE SERVICE PAGE ---------- */
  var BRK_CSS = `
body.r101-brakes .r101-hide-sec{display:none!important}
body.r101-brakes .r101-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
body.r101-brakes .r101-prices{margin:18px 0 22px!important}
body.r101-brakes .r101-prices{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px 0;margin:20px 0 8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-radius:16px;padding:14px 22px 12px}
body.r101-brakes .r101-price{flex:1 1 0;text-align:center;padding:0 10px;min-width:0}
body.r101-brakes .r101-price+.r101-price{border-left:1px solid rgba(255,255,255,.25)}
body.r101-brakes .r101-price .amt{font-family:Anton,sans-serif;font-size:clamp(42px,5vw,62px);line-height:1;color:${O}}
body.r101-brakes .r101-price .lbl{font:600 12px/1.2 Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#e5e5e5;margin-top:6px}
body.r101-brakes .hero__buttons{gap:12px}
body.r101-brakes .r101-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
body.r101-brakes .r101-chips span{font:600 14px/1 Inter,sans-serif;color:#fff;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);padding:10px 14px;border-radius:999px}
body.r101-brakes .r101-chips b{color:${O};margin-right:6px}
#r101-steps{background:var(--r101-soft);padding:56px 0}
#r101-steps .eb{font:600 13px/1 Inter,sans-serif;letter-spacing:.18em;color:${O};text-transform:uppercase;margin:0 0 10px}
#r101-steps h2{font-family:Anton,sans-serif;text-transform:uppercase;margin:0 0 24px;color:var(--r101-ink)}
#r101-steps .g{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
#r101-steps .s{background:#fff;border:1px solid var(--r101-line);border-radius:16px;padding:22px}
#r101-steps .n{width:36px;height:36px;border-radius:50%;background:var(--r101-ink);color:#fff;font:700 15px/36px Inter,sans-serif;text-align:center;margin-bottom:12px}
#r101-steps h3{font-family:Anton,sans-serif;text-transform:uppercase;font-size:21px!important;margin:0 0 6px;color:var(--r101-ink)}
#r101-steps p{font:400 16px/1.32 Inter,sans-serif;color:var(--r101-mute);margin:0}
body.r101-brakes .r101-wide .hero__text-area,body.r101-brakes .r101-wide .hero__content,body.r101-brakes .r101-wide .hero__description{max-width:none!important;width:100%!important}
body.r101-brakes .r101-wide .hero__wrapper{padding-top:56px!important;padding-bottom:56px!important;padding-left:0!important;padding-right:0!important}
body.r101-brakes .r101-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin:18px 0 24px}
body.r101-brakes .r101-card{margin:0!important;background:var(--r101-soft);border:1px solid var(--r101-line);border-radius:16px;padding:20px;position:relative;overflow:hidden}
body.r101-brakes .r101-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:${O}}
body.r101-brakes .r101-card h4{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:20px!important;line-height:1.08!important;margin:0 0 8px;color:var(--r101-ink)}
body.r101-brakes .r101-card p{font:400 15px/1.32 Inter,sans-serif!important;color:var(--r101-mute);margin:0!important}
body.r101-brakes .r101-src{display:none!important}
body.r101-brakes .r101-checks ul{columns:2;column-gap:40px;list-style:none;padding:0;margin:14px 0 14px}
body.r101-brakes .r101-checks li{break-inside:avoid;position:relative;padding-left:30px;margin:0 0 12px!important}
body.r101-brakes .r101-checks li:before{content:"\\2713";position:absolute;left:0;top:1px;width:20px;height:20px;border-radius:50%;background:${O};color:#111;font:800 12px/20px Inter,sans-serif;text-align:center}
body.r101-brakes .r101-checks p i,body.r101-brakes .r101-checks p em{font-size:14px;color:#777}
@media (max-width:1024px){body.r101-brakes .r101-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:640px){body.r101-brakes .r101-cards{grid-template-columns:1fr;gap:8px!important;margin:12px 0 18px}body.r101-brakes .r101-card{padding:14px 16px}body.r101-brakes .r101-card h4{margin-bottom:4px}body.r101-brakes .r101-checks ul{columns:1}body.r101-brakes .hero__buttons .button{width:100%;text-align:center}body.r101-brakes .r101-price{flex:1 1 40%;min-width:0;padding:0 8px}}
`;

  function brakesPage() {
    var main = document.querySelector('main');
    if (!main || document.body.classList.contains('r101-brakes')) return;
    document.body.classList.add('r101-brakes');
    addStyle('r101-brk-css', BRK_CSS);
    var secs = [].slice.call(main.querySelectorAll('section')).filter(function (s) { return !s.parentElement.closest('section'); });
    var hero = secs.filter(function (s) { return s.classList.contains('hero'); })[0];

    // hero: price cards pulled from the hero text (edit prices in Booqable, cards follow)
    if (hero) {
      var desc = hero.querySelector('.hero__description');
      var txt = desc ? desc.textContent : '';
      var f = txt.match(/front brakes?\D{0,12}\$\s?(\d[\d,]*)/i), fr = txt.match(/front (?:and|&) rear\D{0,12}\$\s?(\d[\d,]*)/i);
      var btns = hero.querySelector('.hero__buttons');
      if (desc && (f || fr) && !hero.querySelector('.r101-prices')) {
        var pc = document.createElement('div');
        pc.className = 'r101-prices';
        pc.innerHTML = (f ? '<div class="r101-price"><div class="amt">$' + f[1] + '</div><div class="lbl">Front brakes only</div></div>' : '') +
          (fr ? '<div class="r101-price"><div class="amt">$' + fr[1] + '</div><div class="lbl">Front &amp; rear</div></div>' : '');
        desc.parentNode.insertBefore(pc, desc.nextSibling);
      }
      // the price sentence is shown in the cards: keep it in the page for Google, hide it visually
      if (desc && (f || fr) && !desc.querySelector('.r101-sr')) {
        var walker = document.createTreeWalker(desc, NodeFilter.SHOW_TEXT), node;
        while ((node = walker.nextNode())) {
          var m = node.nodeValue.match(/\s*front brakes?\D{0,12}\$[\s\S]*$/i);
          if (m) {
            var sr = document.createElement('span'); sr.className = 'r101-sr'; sr.textContent = m[0];
            node.nodeValue = node.nodeValue.slice(0, m.index);
            node.parentNode.insertBefore(sr, node.nextSibling);
            break;
          }
        }
      }
    }

    // hide image-only ad heroes (they live on in Booqable, just not shown in this design)
    secs.forEach(function (s, i) {
      if (i === 0 || !s.classList.contains('hero')) return;
      var hasText = (s.querySelector('.hero__description') || {}).textContent;
      if (!s.querySelector('h1,h2,h3') && !(hasText && hasText.trim()) && s.querySelector('img')) s.classList.add('r101-hide-sec');
    });

    // "Here's why" bullets -> benefit cards
    var why = secs.filter(function (s) { var h = s.querySelector('h2'); return h && /double-h|h-h|hh|ebc/i.test(h.textContent) && s.querySelector('ul li b'); })[0];
    if (why && !why.querySelector('.r101-cards')) {
      why.classList.add('r101-wide');
      var ul = why.querySelector('ul');
      var cards = document.createElement('div');
      cards.className = 'r101-cards';
      [].slice.call(ul.querySelectorAll('li')).forEach(function (li) {
        var b = li.querySelector('b,strong');
        var title = b ? b.textContent.replace(/:\s*$/, '').trim() : '';
        var body = li.textContent.replace(b ? b.textContent : '', '').trim();
        var c = document.createElement('div');
        c.className = 'r101-card';
        c.innerHTML = '<h4></h4><p></p>';
        c.querySelector('h4').textContent = title;
        c.querySelector('p').textContent = body;
        cards.appendChild(c);
      });
      ul.parentNode.insertBefore(cards, ul);
      ul.classList.add('r101-src');

      // "How it works" before the why section
      if (!document.getElementById('r101-steps')) {
        var st = document.createElement('section');
        st.id = 'r101-steps';
        st.innerHTML = '<div class="w container"><p class="eb">How it works</p><h2>Fresh brakes in 3 easy steps</h2><div class="g">' +
          '<div class="s"><div class="n">1</div><h3>Tell us your Harley</h3><p>Year and model, front, rear or both, and anything you\'ve noticed. Call or use the form.</p></div>' +
          '<div class="s"><div class="n">2</div><h3>We confirm your price</h3><p>Flat price up front. No extra parts or labor without your approval.</p></div>' +
          '<div class="s"><div class="n">3</div><h3>Done while you wait</h3><p>Grab a free Red Bull or coffee and relax in our Rider Lounge, or ask about a loaner bike.</p></div>' +
          '</div></div>';
        why.parentNode.insertBefore(st, why);
      }
    }

    // "Includes" list -> two-column checklist
    var incl = secs.filter(function (s) { var h = s.querySelector('h3'); return h && /includes/i.test(h.textContent) && s.querySelector('ul'); })[0];
    if (incl) incl.classList.add('r101-wide', 'r101-checks');
  }

  /* ---------- SLIDE-OUT MENU (Booqable's "Menu" drawer, restyled) ---------- */
  var MENU_CSS = `
#mobile-menu-opener:checked ~ nav.menu{background:rgba(0,0,0,.45)!important}
nav.menu .menu__wrapper{background:#161616!important;width:min(420px,100vw)!important;max-width:none!important;height:100%!important;overflow-y:auto!important;padding:26px 30px 30px!important;box-shadow:-24px 0 60px rgba(0,0,0,.45);border-top:3px solid ${O}}
nav.menu .menu__list{margin:0!important;padding:0!important;flex:none!important;height:auto!important;overflow:visible!important}
nav.menu .menu__bottom{flex:none!important;padding:18px 0 10px!important}
nav.menu .menu__icons,nav.menu .menu__icons>*{background:none!important}
nav.menu .menu__item-icon{overflow:visible!important;display:flex!important;align-items:center;justify-content:center}
nav.menu .menu__social{background:none!important;padding:0!important;display:flex!important;flex-wrap:wrap;align-items:center;gap:10px 14px}
nav.menu .menu__social-label{font:600 12px/1 Inter,system-ui,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:#8a8a8a!important;width:100%}
nav.menu .social-networks{display:flex!important;flex-wrap:wrap;gap:8px!important;margin:0!important;padding:0!important}
nav.menu .social-networks__link{background:#242424!important;border-radius:50%!important;transition:background .15s}
nav.menu .social-networks__link:hover{background:#333!important}
nav.menu .menu__label{padding:0 0 12px!important;margin:0 0 4px!important;border-bottom:1px solid #2a2a2a}
nav.menu .menu__label b{font:700 12px/1 Inter,system-ui,sans-serif!important;letter-spacing:.2em!important;text-transform:uppercase!important;color:${O}!important}
nav.menu .menu__item,nav.menu .menu__dropdown-item{padding:0!important;margin:0!important;border-bottom:1px solid #242424!important;position:relative!important;overflow:visible!important}
nav.menu .menu__link,nav.menu .menu__dropdown-link{display:block!important;font:600 17px/1.3 Inter,system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:#f1f1f1!important;padding:12px 40px 12px 0!important;text-decoration:none!important;transition:color .15s,padding .15s}
nav.menu .menu__link:hover,nav.menu .menu__dropdown-link:hover{color:${O}!important;padding-left:4px!important}
nav.menu .r101-cur{color:${O}!important}
nav.menu .r101-cur:before{content:"";position:absolute;left:-30px;top:10px;bottom:10px;width:3px;background:${O};border-radius:0 3px 3px 0}
nav.menu .menu__dropdown-opener:not(.menu__dropdown-closer){position:absolute!important;right:2px!important;top:0!important;height:100%!important;width:44px!important;display:flex!important;align-items:center;justify-content:flex-end;color:#8a8a8a!important;cursor:pointer;z-index:1}
nav.menu .menu__dropdown-opener:not(.menu__dropdown-closer):hover{color:${O}!important}
nav.menu .menu__item-icon{width:16px!important;height:16px!important}
nav.menu .menu__item-icon svg{width:14px!important;height:auto!important;max-height:14px}
nav.menu .menu__item-icon svg path{fill:currentColor!important;stroke:currentColor}
nav.menu .menu__dropdown-wrapper{background:#161616!important;height:100%!important;overflow-y:auto!important;padding:26px 30px 30px!important;border-top:3px solid ${O}}
nav.menu .menu__dropdown-closer{display:flex!important;align-items:center;gap:8px;font:700 12px/1.2 Inter,system-ui,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:${O}!important;padding:0 0 12px!important;margin:0 0 4px!important;border-bottom:1px solid #2a2a2a;cursor:pointer;width:auto!important;position:static!important}
nav.menu .menu__dropdown-closer .menu__item-icon{width:14px!important;height:14px!important}
nav.menu .menu__dropdown-list{margin:0!important;padding:0!important;background:none!important}
nav.menu .menu__dropdown-item,nav.menu .menu__dropdown-link{background:none!important}
nav.menu .menu__dropdown{z-index:5!important}
nav.menu .menu__dropdown-closer{width:100%!important;justify-content:flex-start!important;text-align:left!important}
#r101-mcta{margin-top:22px;padding-top:4px}
#r101-mcta .b{display:flex;gap:10px;margin-bottom:16px}
#r101-mcta .b a{flex:1;min-height:46px;display:flex;align-items:center;justify-content:center;border-radius:999px;font:700 15px/1 Inter,system-ui,sans-serif;text-decoration:none;letter-spacing:0;text-transform:none}
#r101-mcta .c1{background:${O};color:#111!important}
#r101-mcta .c2{border:1.5px solid #3a3a3a;color:#fff!important}
#r101-mcta .c2:hover{border-color:${O};color:${O}!important}
#r101-mcta p{font:400 14px/1.45 Inter,system-ui,sans-serif!important;color:#9a9a9a!important;margin:0 0 4px!important}
#r101-mcta p b{color:#e6e6e6;font:600 14px/1.45 Inter,system-ui,sans-serif!important;letter-spacing:0!important}
body.r101-menu-open #r101-call,body.r101-menu-open #r101-lab-badge{display:none!important}
nav.menu.r101-inline .menu__dropdown-closer{display:none!important}
nav.menu.r101-inline .menu__dropdown-wrapper{border-top:0!important;padding:0 0 4px 18px!important;height:auto!important}
nav.menu.r101-inline .menu__dropdown-item:last-child{border-bottom:0!important}
@media (max-width:640px){nav.menu .menu__wrapper{width:100%!important}nav.menu .menu__wrapper,nav.menu .menu__dropdown-wrapper{padding:20px 20px 26px!important}nav.menu .r101-cur:before{left:-20px}}
`;
  function menuDrawer() {
    var nav = document.querySelector('nav.menu');
    if (!nav || document.getElementById('r101-mcta')) return;
    addStyle('r101-menu-css', MENU_CSS);
    var here = location.pathname.replace(/\/+$/, '') || '/';
    [].slice.call(nav.querySelectorAll('a.menu__link, a.menu__dropdown-link')).forEach(function (a) {
      var p = (a.getAttribute('href') || '').replace(/^https?:\/\/[^/]+/, '').split(/[?#]/)[0].replace(/\/+$/, '') || '/';
      if (p === here) a.classList.add('r101-cur');
    });
    // tapping a parent item (e.g. "Motorcycle Rental Options") opens its sub-menu instead of leaving the page
    [].slice.call(nav.querySelectorAll('.menu__item.has-dropdown')).forEach(function (li) {
      var a = li.querySelector('a.menu__link'), t = li.querySelector('input[type=checkbox]');
      if (!a || !t) return;
      a.addEventListener('click', function (e) { e.preventDefault(); t.checked = !t.checked; t.dispatchEvent(new Event('change', { bubbles: true })); });
    });
    var form = document.querySelector('main section.contact-form');
    var quote = form && form.id ? '#' + form.id : '/pages/contact-us';
    var box = document.createElement('div');
    box.id = 'r101-mcta';
    box.innerHTML = '<div class="b"><a class="c1" href="tel:+18885095032">Call (888) 509-5032</a><a class="c2" href="' + quote + '">Get a quote</a></div>' +
      '<p><b>Route 101 Motorsports &amp; Garage</b></p><p>6351 Corte Del Abeto #107, Carlsbad, CA 92011</p><p>Open 7 days, 8am–6pm, by appointment</p>';
    box.querySelector('.c2').addEventListener('click', function () { var o = document.getElementById('mobile-menu-opener'); if (o) o.checked = false; });
    var wrap = nav.querySelector('.menu__wrapper'), list = nav.querySelector('.menu__list');
    if (list && list.parentNode) list.parentNode.insertBefore(box, list.nextSibling); else if (wrap) wrap.appendChild(box);
    // start the drawer right under the header bar (no light strip between them)
    var opener = document.getElementById('mobile-menu-opener');
    var fit = function () {
      var bar = document.querySelector('.header__content') || document.querySelector('header');
      var nr = nav.getBoundingClientRect();
      if (!bar || !nr.height) return;
      var shift = nr.top - (parseFloat(getComputedStyle(nav).top) || 0);   // nav sits inside a moved header, so offset it
      var want = Math.round(bar.getBoundingClientRect().bottom - shift);
      nav.style.setProperty('top', want + 'px', 'important');
      nav.style.setProperty('height', Math.round(window.innerHeight - bar.getBoundingClientRect().bottom) + 'px', 'important');
    };
    // phones open sub-menus inline (not as a sliding panel): no need for the back row there
    var mode = function () { var dd = nav.querySelector('.menu__dropdown'); if (dd) nav.classList.toggle('r101-inline', getComputedStyle(dd).position !== 'fixed'); };
    window.addEventListener('resize', mode); mode();
    if (opener) opener.addEventListener('change', function () { document.body.classList.toggle('r101-menu-open', opener.checked); mode(); setTimeout(fit, 30); });
    window.addEventListener('scroll', function () { if (opener && opener.checked) fit(); }, { passive: true });
    fit();
  }

  /* ---------- HOME PAGE HUB ---------- */
  var HOME_CSS = `
#r101-hub{background:#fff;padding:22px 0 28px}
body.r101-home main section.logos.r101-trust .logos__wrapper{padding-top:14px!important;padding-bottom:22px!important}
#r101-hub .eb{font:600 13px/1 Inter,sans-serif;letter-spacing:.18em;color:${O};text-transform:uppercase;margin:0 0 10px}
#r101-hub h2{font-family:Anton,sans-serif;text-transform:uppercase;margin:0 0 22px;color:var(--r101-ink)}
#r101-hub .g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
#r101-hub .c{position:relative;background:#161616;color:#fff;border-radius:20px;padding:30px 28px 26px;overflow:hidden;display:flex;flex-direction:column}
#r101-hub .c:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:${O}}
#r101-hub .c .k{font:700 12px/1 Inter,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:${O};margin:0 0 10px}
#r101-hub .c h3{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(26px,2.4vw,34px)!important;line-height:1.04!important;margin:0 0 10px;color:#fff}
#r101-hub .c p{font:400 16px/1.4 Inter,sans-serif!important;color:#c4c4c4;margin:0 0 18px!important;flex:1}
#r101-hub .c .l{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
#r101-hub .c .l a{font:600 14px/1 Inter,sans-serif;color:#fff;text-decoration:none;border:1.5px solid #3a3a3a;border-radius:999px;padding:10px 14px;transition:border-color .15s,color .15s}
#r101-hub .c .l a:hover{border-color:${O};color:${O}}
#r101-hub .c .go{align-self:flex-start;display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;border-radius:999px;background:${O};color:#111;font:700 15px/1 Inter,sans-serif;text-decoration:none;transition:transform .2s}
#r101-hub .c .go:hover{transform:translateY(-2px)}
body.r101-home main section.logos .logos__wrapper{padding-top:22px!important;padding-bottom:22px!important}
body.r101-home .r101-notice [class*=wrapper]{padding-top:6px!important;padding-bottom:6px!important}
body.r101-home .r101-notice h1,body.r101-home .r101-notice h2,body.r101-home .r101-notice h3,body.r101-home .r101-notice p{display:inline-block;font:700 13px/1.2 Inter,system-ui,sans-serif!important;letter-spacing:.14em!important;text-transform:uppercase!important;color:${O}!important;border:1.5px solid rgba(255,102,0,.35);border-radius:999px;padding:9px 16px;margin:0!important}
body.r101-home section.products .product-card{border-radius:16px!important;overflow:hidden;border:1px solid var(--r101-line)!important;background:#fff;transition:transform .2s,box-shadow .2s}
body.r101-home section.products .product-card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.10)}
body.r101-home section.products .product-card__meta{padding:12px 14px 14px!important}
body.r101-home section.products .product-card__meta,body.r101-home section.products .product-card__meta *{font-family:Inter,system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important}
body.r101-home section.products .product-card__meta a{font-weight:600!important;font-size:15px!important;line-height:1.3!important}
body.r101-home .carousel__btn{border-radius:50%!important}
body.r101-home section.testimonials .testimonials__blockquote,body.r101-home section.testimonials .testimonials__quote{height:auto!important;min-height:0!important}
body.r101-home section.testimonials .testimonials__blockquote{justify-content:flex-start!important;gap:16px}
body.r101-home section.testimonials .testimonials__quote{padding-bottom:0!important}
/* reviews: every card trimmed to the same 6 lines (full review behind View More), equal card heights */
body.r101-home section.testimonials .testimonials__quote p{display:-webkit-box!important;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}
body.r101-home section.testimonials .testimonials__quote:before,body.r101-home section.testimonials .testimonials__quote:after{content:none!important;display:none!important}
body.r101-home section.testimonials .carousel__inner,body.r101-home section.testimonials .testimonials__content{height:100%!important}
body.r101-home section.testimonials .testimonials__blockquote{flex:1 1 auto!important;flex-direction:column!important}
body.r101-home section.testimonials .testimonials__blockquote>footer{margin-top:auto!important}
body.r101-home section.collections .collections__image-item{height:clamp(340px,36vw,540px)!important;padding-top:0!important}
body.r101-home section.collections .collections__image{object-fit:cover;width:100%;height:100%}
body.r101-home main section.testimonials .testimonials__wrapper,body.r101-home main section.articles .articles__wrapper{padding-top:48px!important;padding-bottom:48px!important}
body.r101-home main section.products .products__wrapper{padding-bottom:48px!important}
@media (max-width:760px){body.r101-home section.collections .collections__image-item{height:240px!important}}
body.r101-home section.testimonials .carousel__inner{border-radius:16px;overflow:hidden}
@media (max-width:760px){#r101-hub{padding:18px 0 20px}#r101-hub .g{grid-template-columns:1fr;gap:12px}#r101-hub .c{padding:24px 20px 20px}#r101-hub .c .go{align-self:stretch;justify-content:center}}
/* section heads: orange eyebrow + uppercase Anton, left aligned like the service pages */
body.r101-home .r101-eb{font:600 13px/1 Inter,sans-serif!important;letter-spacing:.18em!important;color:${O}!important;text-transform:uppercase!important;margin:0 0 10px!important;display:block}
body.r101-home section.products h2,body.r101-home section.testimonials h2,body.r101-home section.articles h2,body.r101-home section.accordion h2{text-transform:uppercase!important;color:var(--r101-ink)!important}
body.r101-home section.products .products__top{text-align:left!important;margin-bottom:22px!important}
body.r101-home section.products .products__wrapper{padding-top:48px!important}
body.r101-home section.products + section.products .products__wrapper{padding-top:8px!important}
/* "rentals in 3 clicks": soft band with 3 numbered steps (replaces the clip-art icon strip) */
body.r101-home section.r101-3c .cta__wrapper{background:var(--r101-soft)!important;padding:48px 0!important}
body.r101-home section.r101-3c .cta__tag{font:600 13px/1 Inter,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:${O}!important}
body.r101-home section.r101-3c h2{color:var(--r101-ink)!important}
body.r101-home .r101-hide-sec{display:none!important}
.r101-3steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;max-width:1100px;margin:26px auto 0;text-align:left}
.r101-3steps .s{background:#fff;border:1px solid var(--r101-line);border-radius:16px;padding:20px 22px;display:flex;gap:14px;align-items:flex-start}
.r101-3steps .n{flex:0 0 36px;height:36px;border-radius:50%;background:var(--r101-ink);color:#fff;font:700 15px/36px Inter,sans-serif;text-align:center}
.r101-3steps h3{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:20px!important;line-height:1.1!important;margin:2px 0 4px!important;color:var(--r101-ink)!important}
.r101-3steps p{font:400 15px/1.35 Inter,sans-serif!important;color:var(--r101-mute)!important;margin:0!important}
/* photo call-to-action bands: less dead space, stronger shade behind the words */
body.r101-home section.cta.r101-photo .cta__vision:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.55));pointer-events:none}
body.r101-home section.cta.r101-photo h2{max-width:900px;margin-left:auto;margin-right:auto;text-shadow:0 2px 18px rgba(0,0,0,.35)}
/* blog: three clean cards instead of the orange blocks */
body.r101-home section.articles .articles__top{align-items:flex-end!important;margin-bottom:22px!important}
body.r101-home section.articles .articles__list{grid-template-columns:repeat(3,minmax(0,1fr))!important;grid-template-rows:none!important;gap:16px!important}
body.r101-home section.articles .articles__item{grid-column:auto!important;grid-row:auto!important;display:flex!important;flex-direction:column!important;background:#fff!important;color:var(--r101-ink)!important;border:1px solid var(--r101-line)!important;border-radius:16px!important;overflow:hidden;height:auto!important;transition:transform .2s,box-shadow .2s}
body.r101-home section.articles .articles__item:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.10)}
body.r101-home section.articles .articles__image-wrapper{width:100%!important;height:auto!important;aspect-ratio:16/10;position:relative;overflow:hidden;flex:none!important}
body.r101-home section.articles .articles__image-wrapper .image-wrapper,body.r101-home section.articles .articles__image-wrapper picture{position:absolute!important;inset:0;width:100%!important;height:100%!important;padding:0!important}
body.r101-home section.articles .articles__image-wrapper img{width:100%!important;height:100%!important;object-fit:cover}
body.r101-home section.articles .articles__text-area{width:auto!important;height:auto!important;padding:20px 22px 22px!important;display:flex!important;flex-direction:column!important;flex:1;justify-content:flex-start!important}
body.r101-home section.articles .articles__tag{font:600 12px/1 Inter,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:${O}!important;margin:0 0 10px!important}
body.r101-home section.articles .articles__item-heading{font-size:clamp(20px,1.5vw,24px)!important;line-height:1.1!important;color:var(--r101-ink)!important;margin:0 0 10px!important}
body.r101-home section.articles .articles__text p{font-size:15px!important;line-height:1.45!important;color:var(--r101-mute)!important;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
body.r101-home section.articles .articles__text b,body.r101-home section.articles .articles__text strong{color:var(--r101-mute)!important;font-weight:400!important}
body.r101-home section.articles .articles__buttons{margin-top:auto!important;padding-top:16px!important;height:auto!important}
body.r101-home section.articles .articles__button{color:var(--r101-ink)!important;border-color:var(--r101-ink)!important;background:transparent!important}
body.r101-home section.articles .articles__button:hover{background:var(--r101-ink)!important;color:#fff!important}
body.r101-home .r101-ebw{flex:1 1 auto;min-width:0}
body.r101-home section.articles .articles__list{padding-top:0!important}
body.r101-home .r101-notice [class*=container]{text-align:left!important}
body.r101-home .r101-notice [class*=wrapper] *{text-align:left!important;justify-content:flex-start!important}
@media (max-width:760px){body.r101-home section.articles .articles__item{min-width:0!important;flex:0 0 78vw!important;width:78vw!important;max-width:none!important}body.r101-home section.articles .articles__list{gap:12px!important}}
body.r101-home section.products + section.products .products__wrapper{padding-top:48px!important}
/* reviews */
body.r101-home section.testimonials .testimonials__side{border-color:var(--r101-line)!important}
body.r101-home section.testimonials .carousel__btn,body.r101-home section.products .carousel__btn{width:44px!important;height:44px!important}
@media (max-width:900px){body.r101-home section.articles .articles__list{grid-template-columns:1fr!important}.r101-3steps{grid-template-columns:1fr;gap:10px}}
@media (max-width:760px){body.r101-home section.r101-3c .cta__wrapper{padding:36px 0!important}.r101-3steps .s{padding:14px 16px}body.r101-home section.products .products__wrapper{padding-top:36px!important}}
`;
  function homePage() {
    var main = document.querySelector('main');
    if (!main || document.body.classList.contains('r101-home')) return;
    document.body.classList.add('r101-home');
    addStyle('r101-home-css', HOME_CSS);
    var secs = [].slice.call(main.querySelectorAll('section')).filter(function (s) { return !s.parentElement.closest('section'); });
    var hero = secs[0];
    // "Advance Booking Required." line -> small notice pill
    secs.forEach(function (s) { if (s.classList.contains('text') && /advance booking/i.test(s.textContent) && s.textContent.trim().length < 80) s.classList.add('r101-notice'); });
    // Rentals + Garage hub right under the hero (both sides of the business, one tap each)
    if (hero && !document.getElementById('r101-hub')) {
      var hub = document.createElement('section');
      hub.id = 'r101-hub';
      hub.innerHTML = '<div class="container"><p class="eb">Route 101 Motorsports &amp; Garage</p><h2>Rentals &amp; Garage, all under one roof</h2><div class="g">' +
        '<div class="c"><p class="k">Motorcycle Rentals</p><h3>Rent a Harley or BMW GS</h3><p>Touring, cruiser and adventure bikes, plus gear, add-ons and guided tours. Pick your dates, pick your bike, book your ride.</p>' +
        '<div class="l"><a href="/collections/motorcycle-rentals">Harley Rentals</a><a href="/collections/explore-our-bmw-gs-rental-fleet">BMW GS Rentals</a><a href="/collections/motorcycle-tours">Motorcycle Tours</a><a href="/collections/gear-and-rental-add-ons">Rental Add Ons</a></div>' +
        '<a class="go" href="/collections/route-rental-fleet">See the rental fleet</a></div>' +
        '<div class="c"><p class="k">Route 101 Garage</p><h3>Service, brakes &amp; tires</h3><p>Harley and BMW GS service, EBC brake jobs, diagnostics, and top-brand tires with mounting and balancing, right here in Carlsbad.</p>' +
        '<div class="l"><a href="/pages/san-diego-harley-service">Harley Service</a><a href="/pages/san-diego-bmw-gs-service">BMW GS Service</a><a href="/pages/harley-brake-service">Harley Brakes</a><a href="/pages/motorcycle-tires">Tires</a></div>' +
        '<a class="go" href="/pages/straight-talk-route-101-motorsports-offers-san-diego-harley-bmw-gs-motorcycle-service-diagnostics-and-tire-installation">Explore the Garage</a></div>' +
        '</div></div>';
      // review badges stay right under the hero (sets the tone), hub follows them
      var trust = secs[1] && secs[1].classList.contains('logos') ? secs[1] : null;
      if (trust) trust.classList.add('r101-trust');
      var after = trust || hero;
      after.parentNode.insertBefore(hub, after.nextSibling);
    }
    // "rentals in 3 clicks" -> numbered steps; the clip-art icon strip after it is hidden (stays in Booqable)
    secs.forEach(function (s, i) {
      if (!s.classList.contains('cta') || s.querySelector('img') || !/3 clicks/i.test(s.textContent)) return;
      s.classList.add('r101-3c');
      var nx = secs[i + 1];
      if (nx && nx.classList.contains('logos') && nx.querySelectorAll('img').length <= 1 && !nx.textContent.trim()) nx.classList.add('r101-hide-sec');
      if (!s.querySelector('.r101-3steps')) {
        var st = document.createElement('div');
        st.className = 'r101-3steps';
        st.innerHTML = '<div class="s"><div class="n">1</div><div><h3>Select your dates</h3><p>See real-time availability and pricing.</p></div></div>' +
          '<div class="s"><div class="n">2</div><div><h3>Pick your bike</h3><p>Harley touring, cruiser or BMW GS adventure.</p></div></div>' +
          '<div class="s"><div class="n">3</div><div><h3>Book your ride</h3><p>Reserve online in minutes.</p></div></div>';
        var ta = s.querySelector('.cta__text-area') || s.querySelector('.cta__container');
        if (ta) ta.appendChild(st);
      }
    });
    // photo call-to-action bands
    secs.forEach(function (s) { if (s.classList.contains('cta') && s.querySelector('.cta__vision img') && s.querySelector('h2')) s.classList.add('r101-photo'); });
    // orange eyebrows over the section headings
    var eb = function (s, txt) {
      var h = s.querySelector('h2');
      if (!h || h.previousElementSibling && h.previousElementSibling.classList.contains('r101-eb')) return;
      var p = document.createElement('p'); p.className = 'r101-eb'; p.textContent = txt;
      var par = h.parentNode, ps = getComputedStyle(par);
      if (ps.display.indexOf('flex') > -1 && ps.flexDirection.indexOf('row') === 0) {   // heading sits in a row (e.g. next to a button): stack eyebrow + heading together
        var w = document.createElement('div'); w.className = 'r101-ebw';
        par.insertBefore(w, h); w.appendChild(p); w.appendChild(h);
      } else par.insertBefore(p, h);
    };
    secs.forEach(function (s) {
      var h = (s.querySelector('h2') || {}).textContent || '';
      if (s.classList.contains('products')) eb(s, /bmw/i.test(h) ? 'BMW GS adventure rentals' : 'Harley-Davidson rentals');
      else if (s.classList.contains('testimonials')) eb(s, '100% 5-Star Reviews');
      else if (s.classList.contains('articles')) eb(s, 'From the shop');
      else if (s.classList.contains('accordion')) eb(s, 'Questions, answered');
    });
  }

  /* ---------- STRAIGHT TALK: GARAGE STORY PAGE (photo-only hero + text hero pairs -> photo/text split rows) ---------- */
  var ST_CSS = `
body.r101-st .r101-hide-sec{display:none!important}
body.r101-st main section p.r101-eb,body.r101-st main section .r101-eb{font:600 13px/1 Inter,sans-serif!important;letter-spacing:.18em!important;color:${O}!important;text-transform:uppercase!important;margin:0 0 12px!important;display:block}
body.r101-st section.r101-intro .hero__wrapper{background:var(--r101-soft)!important;padding:52px 0!important;min-height:0!important;height:auto!important}
body.r101-st section.r101-intro .hero__container,body.r101-st section.r101-intro .hero__text-area{min-height:0!important;height:auto!important}
body.r101-st section.r101-intro .hero__text-area{max-width:880px!important;width:100%!important}
body.r101-st section.r101-intro .hero__vision{display:none!important}
body.r101-st section.r101-intro h1,body.r101-st section.r101-split h1,body.r101-st section.r101-split h2{text-transform:uppercase;font-size:clamp(28px,calc(1.8vw + 16px),46px)!important;color:var(--r101-ink)!important}
body.r101-st section.r101-split .hero__wrapper{padding:44px 0!important;min-height:0!important;height:auto!important;background:#fff!important}
body.r101-st section.r101-split .hero__vision{display:none!important}
body.r101-st section.r101-split .hero__container{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:44px;align-items:center;min-height:0!important;height:auto!important}
body.r101-st section.r101-split .hero__text-area{width:auto!important;max-width:none!important;height:auto!important;min-height:0!important}
body.r101-st section.r101-split .hero__content{height:auto!important}
body.r101-st section.r101-split .r101-pic{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 18px 40px rgba(0,0,0,.14)}
body.r101-st section.r101-split .r101-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
body.r101-st section.r101-split.rev .r101-pic{order:2}
body.r101-st section.r101-split + section.r101-split .hero__wrapper{padding-top:8px!important}
body.r101-st section.r101-split p,body.r101-st section.r101-intro p{color:var(--r101-mute)!important}
body.r101-st section.r101-split .hero__buttons,body.r101-st section.r101-intro .hero__buttons{gap:10px;margin-top:18px}
body.r101-st section.r101-split .button--outlined,body.r101-st section.r101-intro .button--outlined{color:var(--r101-ink)!important;border-color:var(--r101-ink)!important}
body.r101-st section.r101-split .button--outlined:hover,body.r101-st section.r101-intro .button--outlined:hover{background:var(--r101-ink)!important;color:#fff!important}
body.r101-st main section.spacer{display:none!important}
@media (max-width:860px){body.r101-st section.r101-split .hero__container{grid-template-columns:1fr;gap:18px}body.r101-st section.r101-split.rev .r101-pic{order:0}body.r101-st section.r101-split .hero__wrapper{padding:28px 0!important}body.r101-st section.r101-split + section.r101-split .hero__wrapper{padding-top:4px!important}body.r101-st section.r101-intro .hero__wrapper{padding:36px 0!important}body.r101-st section.r101-split .hero__buttons .button,body.r101-st section.r101-intro .hero__buttons .button{width:100%;text-align:center}}
`;
  function garageStory() {
    var main = document.querySelector('main');
    if (!main || document.body.classList.contains('r101-st')) return;
    document.body.classList.add('r101-st');
    addStyle('r101-st-css', ST_CSS);
    var secs = [].slice.call(main.querySelectorAll('section')).filter(function (s) { return !s.parentElement.closest('section'); });
    var isPhoto = function (s) { return s && s.classList.contains('hero') && !s.querySelector('h1,h2,h3') && !((s.querySelector('.hero__description') || {}).textContent || '').trim() && s.querySelector('img'); };
    var addEb = function (s, txt) {
      var d = s.querySelector('.hero__description'), h = s.querySelector('h1,h2');
      if (!d || !h || d.querySelector('.r101-eb')) return;
      var p = document.createElement('p'); p.className = 'r101-eb'; p.textContent = txt;
      h.parentNode.insertBefore(p, h);
    };
    if (secs[0]) addEb(secs[0], 'Straight Talk · Route 101 Garage');
    var n = 0;
    secs.forEach(function (s, i) {
      if (i === 0 || !s.classList.contains('hero') || isPhoto(s)) return;
      var prev = secs[i - 1];
      if (isPhoto(prev) && prev !== secs[0]) {
        // photo + text become one split row (photo alternates sides)
        var img = prev.querySelector('img');
        var pic = document.createElement('div'); pic.className = 'r101-pic';
        var im = document.createElement('img');
        im.src = img.currentSrc || img.src; im.alt = img.alt || ((s.querySelector('h1,h2') || {}).textContent || '').trim(); im.loading = 'lazy';
        pic.appendChild(im);
        var c = s.querySelector('.hero__container');
        if (c && !c.querySelector('.r101-pic')) c.insertBefore(pic, c.firstChild);
        s.classList.add('r101-split'); if (n % 2) s.classList.add('rev'); n++;
        prev.classList.add('r101-hide-sec');
        var h = ((s.querySelector('h1,h2') || {}).textContent || '');
        addEb(s, /bmw/i.test(h) ? 'BMW GS' : /harley/i.test(h) ? 'Harley-Davidson' : /tire/i.test(h) ? 'Tires' : 'Route 101 Garage');
      } else {
        s.classList.add('r101-intro');
        addEb(s, 'Now open to the public');
      }
    });
  }

  /* ---------- STRAIGHT TALK INDEX (/pages/straight-talk) ----------
     Theme "articles" sections = giant orange half-width blocks. Restyle into a magazine card grid.
     Cards whose Read more points back to this page or home are unwritten: label "Coming soon", no dead link. */
  var STX_CSS = `
body.r101-stx main section.articles .articles__wrapper{background:transparent!important;padding:52px 0 8px!important}
body.r101-stx main section.articles:last-of-type .articles__wrapper{padding-bottom:64px!important}
body.r101-stx main section.articles .articles__top{margin:0 0 20px!important}
body.r101-stx main section.articles .articles__heading{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(26px,2.4vw,36px)!important;line-height:1.05!important;color:var(--r101-ink,#111)!important;margin:0!important}
body.r101-stx main section.articles .articles__list{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:18px!important}
body.r101-stx main section.articles .articles__item{display:flex!important;flex-direction:column!important;background:#fff!important;border:1px solid var(--r101-line,#e6e6e6);border-radius:18px;overflow:hidden;box-shadow:0 10px 26px rgba(0,0,0,.06);transition:transform .25s,box-shadow .25s;width:auto!important;max-width:none!important;margin:0!important;min-height:0!important}
body.r101-stx main section.articles .articles__item:hover{transform:translateY(-4px);box-shadow:0 18px 36px rgba(0,0,0,.12)}
body.r101-stx main section.articles .articles__image-wrapper{position:relative!important;width:100%!important;max-width:none!important;aspect-ratio:16/10;height:auto!important;flex:none!important;overflow:hidden}
body.r101-stx main section.articles .articles__image-wrapper img{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:cover;transition:scale .5s ease}
body.r101-stx main section.articles .articles__item:hover .articles__image-wrapper img{scale:1.04}
body.r101-stx main section.articles .articles__text-area{background:#fff!important;color:var(--r101-ink,#111)!important;padding:18px 20px 20px!important;display:flex!important;flex-direction:column;flex:1;width:auto!important;max-width:none!important;gap:0}
body.r101-stx main section.articles .articles__tag{font:600 11.5px/1 Inter,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:${O}!important;margin:0 0 10px!important}
body.r101-stx main section.articles .articles__item-heading{font-family:Anton,sans-serif!important;font-size:clamp(20px,1.55vw,24px)!important;line-height:1.12!important;color:var(--r101-ink,#111)!important;margin:0 0 10px!important;text-transform:none}
body.r101-stx main section.articles .articles__text,body.r101-stx main section.articles .articles__text p{font:400 14.5px/1.5 Inter,sans-serif!important;color:var(--r101-mute,#555)!important;margin:0!important}
body.r101-stx main section.articles .articles__text{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0 0 14px!important}
body.r101-stx main section.articles .articles__buttons{margin-top:auto!important;padding:0!important}
body.r101-stx main section.articles a.articles__button{all:unset;cursor:pointer;font:700 12.5px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${O}}
body.r101-stx main section.articles a.articles__button:after{content:" \\2192"}
body.r101-stx main section.articles a.articles__button:hover{text-decoration:underline}
body.r101-stx main section.articles .articles__item.r101-soon{opacity:.9}
body.r101-stx main section.articles .articles__item.r101-soon .articles__image-wrapper img{filter:grayscale(.55)}
body.r101-stx main section.articles .r101-soon-b{display:inline-block;align-self:flex-start;margin-top:auto;font:700 11.5px/1 Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#777;background:#f1f1ef;border:1px solid #e3e3e0;border-radius:999px;padding:7px 11px}
body.r101-stx main section.articles .articles__item.r101-soon:hover{transform:none;box-shadow:0 10px 26px rgba(0,0,0,.06)}
body.r101-stx p.r101-eb{font:600 13px/1 Inter,sans-serif!important;letter-spacing:.18em!important;color:${O}!important;text-transform:uppercase!important;margin:0 0 10px!important}
body.r101-stx main section.r101-stx-all .articles__wrapper{padding:60px 0 40px!important}
body.r101-stx main section.r101-stx-all .articles__top{display:block!important}
body.r101-stx main section.r101-stx-all .articles__list .articles__item:first-child{grid-column:span 2}
body.r101-stx main section.r101-stx-all .articles__list .articles__item:first-child .articles__image-wrapper{aspect-ratio:16/8}
body.r101-stx section.r101-stx-soon{padding:0 0 70px}
body.r101-stx section.r101-stx-soon .in{background:#fff;border:1px dashed #d9d9d4;border-radius:18px;padding:26px 26px 18px}
body.r101-stx section.r101-stx-soon h2{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(22px,2vw,28px)!important;margin:0 0 14px!important;color:var(--r101-ink,#111)!important}
body.r101-stx section.r101-stx-soon ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px 24px}
body.r101-stx section.r101-stx-soon li{padding:10px 0;border-top:1px solid #eee}
body.r101-stx section.r101-stx-soon li span{display:block;font:600 11px/1 Inter,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#999;margin:0 0 6px}
body.r101-stx section.r101-stx-soon li b{font:600 14.5px/1.35 Inter,sans-serif;color:#333}
@media (max-width:980px){body.r101-stx section.r101-stx-soon ul{grid-template-columns:1fr 1fr}}
@media (max-width:620px){body.r101-stx section.r101-stx-soon ul{grid-template-columns:1fr}body.r101-stx main section.r101-stx-all .articles__list .articles__item:first-child{grid-column:auto}body.r101-stx main section.r101-stx-all .articles__list .articles__item:first-child .articles__image-wrapper{aspect-ratio:16/10}body.r101-stx main section.r101-stx-all .articles__wrapper{padding:40px 0 24px!important}body.r101-stx section.r101-stx-soon .in{padding:20px 18px 12px}}
@media (max-width:980px){body.r101-stx main section.articles .articles__list{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
@media (max-width:620px){body.r101-stx main section.articles .articles__list{grid-template-columns:1fr!important;gap:14px!important}body.r101-stx main section.articles .articles__wrapper{padding:36px 0 4px!important}}
`;
  function stIndex() {
    var secs = [].slice.call(document.querySelectorAll('main section.articles'));
    if (!secs.length || document.body.classList.contains('r101-stx')) return;
    document.body.classList.add('r101-stx');
    addStyle('r101-stx-css', STX_CSS);
    var live = [], soon = [];
    secs.forEach(function (sec) {
      var cat = ((sec.querySelector('.articles__heading') || {}).textContent || '').trim();
      [].slice.call(sec.querySelectorAll('.articles__item')).forEach(function (it) {
        var a = it.querySelector('a.articles__button');
        var href = a ? (a.getAttribute('href') || '').replace(/^https?:\/\/[^\/]+/, '').replace(/[?#].*$/, '').replace(/\/$/, '') : '';
        var tag = it.querySelector('.articles__tag'); if (tag && cat) tag.textContent = cat;
        if (!a || href === '' || href === '/pages/straight-talk') soon.push([cat, ((it.querySelector('.articles__item-heading') || {}).textContent || '').trim()]);
        else {
          it.style.cursor = 'pointer';
          it.addEventListener('click', function (e) { if (!e.target.closest('a')) location.href = a.href; });
          live.push(it);
        }
      });
    });
    var wrap = document.createElement('section'); wrap.className = 'articles r101-stx-all';
    wrap.innerHTML = '<div class="articles__wrapper"><div class="articles__container container"><div class="articles__top"><p class="r101-eb">Straight Talk</p><h2 class="articles__heading">Latest from Route 101</h2></div><div class="articles__list"></div></div></div>';
    var list = wrap.querySelector('.articles__list');
    live.forEach(function (it) { list.appendChild(it); });
    secs[0].parentNode.insertBefore(wrap, secs[0]);
    if (soon.length) {
      var box = document.createElement('section'); box.className = 'r101-stx-soon';
      box.innerHTML = '<div class="container"><div class="in"><p class="r101-eb">Coming soon</p><h2>More Straight Talk on the way</h2><ul></ul></div></div>';
      var ul = box.querySelector('ul');
      soon.forEach(function (x) { var li = document.createElement('li'); li.innerHTML = '<span></span><b></b>'; li.firstChild.textContent = x[0]; li.lastChild.textContent = x[1]; ul.appendChild(li); });
      wrap.parentNode.insertBefore(box, wrap.nextSibling);
    }
    secs.forEach(function (sec) { sec.style.display = 'none'; });
  }

  /* ---------- CONTACT US PAGE ---------- */
  var CT_CSS = `
body.r101-ct main section p.r101-eb{font:600 13px/1 Inter,sans-serif!important;letter-spacing:.18em!important;color:${O}!important;text-transform:uppercase!important;margin:0 0 12px!important;display:block}
body.r101-ct main section.text [class*=wrapper]{padding-top:48px!important;padding-bottom:8px!important}
body.r101-ct main section.text h2{text-transform:uppercase;color:var(--r101-ink)!important}
body.r101-ct main section.text p{max-width:760px;margin-left:auto!important;margin-right:auto!important;color:var(--r101-mute)!important}
body.r101-ct main section.columns .columns__wrapper{padding-top:24px!important;padding-bottom:48px!important}
body.r101-ct main section.columns .columns__grid{gap:16px!important}
body.r101-ct main section.columns .columns__item{position:relative;background:var(--r101-soft)!important;border:1px solid var(--r101-line)!important;border-radius:18px!important;padding:26px 24px 24px!important;overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
body.r101-ct main section.columns .columns__item:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,.08)}
body.r101-ct main section.columns .columns__item:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:${O}}
body.r101-ct main section.columns .columns__icon-wrapper{width:48px!important;height:48px!important;border-radius:50%;background:var(--r101-ink);display:flex!important;align-items:center;justify-content:center;margin-bottom:14px!important}
body.r101-ct main section.columns .columns__icon-wrapper svg{width:22px!important;height:22px!important}
body.r101-ct main section.columns .columns__icon-wrapper svg *{stroke:${O}!important}
body.r101-ct main section.columns .columns__text{display:flex;flex-direction:column;flex:1;height:auto!important}
body.r101-ct main section.columns .columns__title{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:24px!important;letter-spacing:.03em!important;color:var(--r101-ink)!important;margin:0 0 8px!important}
body.r101-ct main section.columns .columns__description{flex:1}
body.r101-ct main section.columns .columns__description p{font-size:16px!important;color:var(--r101-mute)!important}
body.r101-ct main section.columns .columns__buttons{margin-top:16px!important}
body.r101-ct main section.columns .columns__button{width:100%;justify-content:center;text-align:center;text-transform:none!important;font-family:Inter,sans-serif!important;font-weight:700!important;letter-spacing:0!important;color:#111!important}
body.r101-ct main section.cta.r101-map{display:none!important}
#r101-map{background:#fff;padding:0 0 56px}
#r101-map .g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:16px;align-items:stretch}
#r101-map .info{background:var(--r101-ink);color:#fff;border-radius:18px;padding:28px 26px;display:flex;flex-direction:column;position:relative;overflow:hidden}
#r101-map .info:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:${O}}
#r101-map .eb{font:600 13px/1 Inter,sans-serif;letter-spacing:.18em;color:${O};text-transform:uppercase;margin:0 0 10px}
#r101-map h2{font-family:Anton,sans-serif;text-transform:uppercase;color:#fff;font-size:clamp(28px,2.4vw,38px)!important;line-height:1.05!important;margin:0 0 14px}
#r101-map p{font:400 16px/1.45 Inter,sans-serif;color:#cfcfcf;margin:0 0 10px}
#r101-map p b{color:#fff;font-weight:600}
#r101-map .go{margin-top:auto;display:flex;align-items:center;justify-content:center;min-height:50px;border-radius:999px;background:${O};color:#111;font:700 15px/1 Inter,sans-serif;text-decoration:none;transition:transform .2s}
#r101-map .go:hover{transform:translateY(-2px)}
#r101-map iframe{display:block;width:100%;height:100%;min-height:420px;border:0;border-radius:18px;box-shadow:0 18px 40px rgba(0,0,0,.12);background:var(--r101-soft)}
@media (max-width:860px){body.r101-ct main section.columns .columns__grid{grid-template-columns:1fr!important;gap:10px!important}body.r101-ct main section.columns .columns__item{padding:20px 18px!important}body.r101-ct main section.columns .columns__description{flex:none}body.r101-ct main section.text [class*=wrapper]{padding-top:32px!important}#r101-map{padding-bottom:36px}#r101-map .g{grid-template-columns:1fr;gap:10px}#r101-map iframe{min-height:320px}#r101-map .info{padding:22px 20px}#r101-map .go{margin-top:12px}}
`;
  function contactPage() {
    var main = document.querySelector('main');
    if (!main || document.body.classList.contains('r101-ct')) return;
    document.body.classList.add('r101-ct');
    addStyle('r101-ct-css', CT_CSS);
    var hero = main.querySelector('section.hero');
    var h = hero && hero.querySelector('h1,h2');
    if (h && !hero.querySelector('.r101-eb')) {
      var p = document.createElement('p'); p.className = 'r101-eb'; p.textContent = 'Rentals · Service · Tires';
      h.parentNode.insertBefore(p, h);
    }
    // the map-picture call-to-action becomes a live Google map with our pin + a "find us" card
    var mapCta = [].slice.call(main.querySelectorAll('section.cta')).filter(function (s) { return !s.parentElement.closest('section') && !((s.querySelector('h2,h3') || {}).textContent || '').trim(); })[0];
    if (mapCta && !document.getElementById('r101-map')) {
      var dir = (mapCta.querySelector('a.button') || {}).href || 'https://www.google.com/maps/search/?api=1&query=Route+101+Motorsports+6351+Corte+Del+Abeto+107+Carlsbad+CA+92011';
      var q = encodeURIComponent('Route 101 Motorsports, 6351 Corte Del Abeto #107, Carlsbad, CA 92011');
      var m = document.createElement('section');
      m.id = 'r101-map';
      m.innerHTML = '<div class="container"><div class="g"><div class="info"><p class="eb">Find us</p><h2>Carlsbad, North County San Diego</h2>' +
        '<p><b>Route 101 Motorsports &amp; Garage</b><br>6351 Corte Del Abeto #107<br>Carlsbad, CA 92011</p>' +
        '<p><b>Open 7 days</b>, 8am&ndash;6pm, by appointment</p>' +
        '<a class="go" href="' + dir + '" target="_blank" rel="noopener">Get directions</a></div>' +
        '<iframe title="Map to Route 101 Motorsports" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' + q + '&z=15&output=embed"></iframe></div></div>';
      mapCta.classList.add('r101-map');
      mapCta.parentNode.insertBefore(m, mapCta);
    }
  }

  /* ---------- ABOUT US PAGE (one long text section -> intro + numbered cards + dark "why choose" band) ---------- */
  var AB_CSS = `
body.r101-ab main section.r101-about .text__wrapper{padding-top:56px!important;padding-bottom:56px!important}
body.r101-ab main section.r101-about .text__container{max-width:1440px!important}
body.r101-ab main section.r101-about .text__top,body.r101-ab main section.r101-about h2{text-align:left!important}
body.r101-ab main section.r101-about h2{text-transform:uppercase;color:var(--r101-ink)!important;margin-bottom:14px!important}
body.r101-ab .r101-eb{font:600 13px/1 Inter,sans-serif!important;letter-spacing:.18em!important;color:${O}!important;text-transform:uppercase!important;margin:0 0 12px!important;display:block;text-align:left}
body.r101-ab main section.r101-about .rx-content>p{max-width:900px;color:var(--r101-mute)!important;text-align:left!important}
body.r101-ab main section.r101-about .rx-content{text-align:left!important}
.r101-ab5{display:flex;flex-direction:column;margin:30px 0 0}
.r101-ab5 .c{position:relative;width:75%;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.9fr);gap:30px;align-items:center;background:#fff;border:1px solid var(--r101-line);border-radius:18px;padding:30px 34px;box-shadow:0 14px 34px rgba(0,0,0,.06);overflow:hidden}
.r101-ab5 .c:nth-child(odd){align-self:flex-start}
.r101-ab5 .c:nth-child(even){align-self:flex-end}
.r101-ab5 .c+.c{margin-top:-14px}
.r101-ab5 .c:nth-child(1){z-index:5}.r101-ab5 .c:nth-child(2){z-index:4}.r101-ab5 .c:nth-child(3){z-index:3}.r101-ab5 .c:nth-child(4){z-index:2}.r101-ab5 .c:nth-child(5){z-index:1}
.r101-ab5 .c:after{content:"";position:absolute;top:0;bottom:0;width:5px;background:${O}}
.r101-ab5 .c:nth-child(odd):after{right:0}
.r101-ab5 .c:nth-child(even):after{left:0}
.r101-ab5 .k{font:600 12px/1 Inter,sans-serif!important;letter-spacing:.18em!important;text-transform:uppercase!important;color:${O}!important;margin:0 0 10px!important}
.r101-ab5 h3{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(22px,1.9vw,30px)!important;line-height:1.08!important;margin:0!important;color:var(--r101-ink)!important}
.r101-ab5 .bd p,.r101-ab5 .bd li{font:400 16.5px/1.55 Inter,sans-serif!important;color:var(--r101-mute)!important;margin:0 0 8px!important}
.r101-ab5 .bd p:last-child{margin-bottom:0!important}
.r101-ab5 b,.r101-ab5 strong{color:var(--r101-ink)!important;font-weight:600!important}
#r101-abwhy{background:var(--r101-ink);color:#fff;padding:60px 0}
#r101-abwhy h2{font-family:Anton,sans-serif;text-transform:uppercase;color:#fff!important;margin:0 0 22px}
#r101-abwhy ul{list-style:none;padding:0;margin:0 0 26px;columns:2;column-gap:40px}
#r101-abwhy li{break-inside:avoid;position:relative;padding-left:32px;margin:0 0 14px;font:400 17px/1.4 Inter,sans-serif;color:#d6d6d6}
#r101-abwhy li:before{content:"\\2713";position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:${O};color:#111;font:800 12px/22px Inter,sans-serif;text-align:center}
#r101-abwhy .b{display:flex;flex-wrap:wrap;gap:12px}
#r101-abwhy .b a{display:inline-flex;align-items:center;min-height:50px;padding:12px 24px;border-radius:999px;font:700 15px/1 Inter,sans-serif;text-decoration:none;border:1.5px solid #fff;color:#fff}
#r101-abwhy .b a:first-child{background:${O};border-color:${O};color:#111}
@media (max-width:1100px){.r101-ab5 .c{width:88%}}
@media (max-width:760px){.r101-ab5 .c{width:100%;grid-template-columns:1fr;gap:10px;padding:22px 20px}.r101-ab5 .c+.c{margin-top:12px}.r101-ab5 .c:after{top:0;bottom:auto;left:0!important;right:0!important;width:auto;height:4px}}
body.r101-ab main section.r101-about{overflow-x:clip}
.r101-ab5.r101-anim .c{opacity:0;transition:opacity .7s ease-out,transform .85s cubic-bezier(.2,.75,.25,1)}
.r101-ab5.r101-anim .c:nth-child(odd){transform:translateX(-60px)}
.r101-ab5.r101-anim .c:nth-child(even){transform:translateX(60px)}
.r101-ab5.r101-anim .c.in{opacity:1;transform:none}
#r101-abwhy.r101-anim li{opacity:0;transform:translateY(8px);transition:opacity .5s ease-out,transform .5s ease-out}
#r101-abwhy.r101-anim.in li{opacity:1;transform:none}
@media (max-width:760px){.r101-ab5.r101-anim .c,.r101-ab5.r101-anim .c:nth-child(odd),.r101-ab5.r101-anim .c:nth-child(even){transform:translateY(14px);transition:opacity .5s ease-out,transform .5s ease-out}.r101-ab5.r101-anim .c.in{transform:none}}
#r101-abwhy .b a{transition:transform .2s ease,box-shadow .2s ease,background .2s ease,color .2s ease}
#r101-abwhy .b a:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(0,0,0,.35)}
#r101-abwhy .b a:not(:first-child):hover{background:#fff;color:#111}
@media (max-width:640px){#r101-abwhy{padding:44px 0}#r101-abwhy ul{columns:1}#r101-abwhy .b a{width:100%;justify-content:center}body.r101-ab main section.r101-about .text__wrapper{padding-top:36px!important;padding-bottom:36px!important}}
`;
  function aboutPage() {
    var main = document.querySelector('main');
    if (!main || document.body.classList.contains('r101-ab')) return;
    var sec = [].slice.call(main.querySelectorAll('section.text')).filter(function (s) { return s.querySelectorAll('h4').length >= 3; })[0];
    if (!sec) return;
    document.body.classList.add('r101-ab');
    addStyle('r101-ab-css', AB_CSS);
    sec.classList.add('r101-about');
    var rx = sec.querySelector('.rx-content, .bq-content');
    var top = sec.querySelector('h2');
    if (top && !sec.querySelector('.r101-eb')) { var eb = document.createElement('p'); eb.className = 'r101-eb'; eb.textContent = 'Our story'; top.parentNode.insertBefore(eb, top); }
    // numbered H4 points -> cards (each card takes everything up to the next heading)
    var kids = [].slice.call(rx.children), grid = document.createElement('div'); grid.className = 'r101-ab5';
    var firstH4 = kids.filter(function (k) { return k.tagName === 'H4'; })[0];
    var whyH2 = kids.filter(function (k) { return k.tagName === 'H2'; })[0];
    var card = null;
    kids.forEach(function (k) {
      if (whyH2 && (k === whyH2 || (k.compareDocumentPosition(whyH2) & Node.DOCUMENT_POSITION_PRECEDING))) return;
      if (k.tagName === 'H4') {
        card = document.createElement('div'); card.className = 'c';
        var t = k.textContent.trim().replace(/^\d+\.\s*/, '');
        var lab = /family|since/i.test(t) ? 'Since 2022' : /pric/i.test(t) ? 'No hidden fees' : /deposit/i.test(t) ? '$500 deposit' : /flexib|convenien/i.test(t) ? 'Your schedule' : /maintain/i.test(t) ? 'In-house service' : '';
        card.innerHTML = '<div class="hd"><p class="k"></p><h3></h3></div><div class="bd"></div>';
        card.querySelector('.k').textContent = lab; if (!lab) card.querySelector('.k').remove();
        card.querySelector('h3').textContent = t;
        k.style.display = 'none'; card.querySelector('.hd').appendChild(k);   // keep the original heading in the page
        grid.appendChild(card); return;
      }
      if (!card) return;
      var a = k.tagName === 'P' && k.querySelector('a');
      if (a && k.textContent.trim() === a.textContent.trim()) { k.className = 'go'; }
      card.querySelector('.bd').appendChild(k);
    });
    if (firstH4 && grid.children.length) { if (whyH2) rx.insertBefore(grid, whyH2); else rx.appendChild(grid); }
    // "Why choose" heading + list + links -> dark band after the section
    if (whyH2 && !document.getElementById('r101-abwhy')) {
      var band = document.createElement('section'); band.id = 'r101-abwhy';
      var c = document.createElement('div'); c.className = 'container'; band.appendChild(c);
      var btns = document.createElement('div'); btns.className = 'b';
      var after = []; var n = whyH2;
      while (n) { after.push(n); n = n.nextElementSibling; }
      after.forEach(function (el) {
        var a = el.tagName === 'P' && el.querySelector('a');
        if (a && el.textContent.trim() === a.textContent.trim()) { a.removeAttribute('style'); btns.appendChild(a); el.remove(); return; }
        c.appendChild(el);
      });
      if (btns.children.length) c.appendChild(btns);
      sec.parentNode.insertBefore(band, sec.nextSibling);
    }
    aboutReveal();
  }
  // Tiles glide in from their own side the first time they scroll into view (once only).
  function aboutReveal() {
    try { if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) { return; }
    if (!('IntersectionObserver' in window)) return;
    var grid = document.querySelector('.r101-ab5'), why = document.getElementById('r101-abwhy');
    var items = grid ? [].slice.call(grid.children) : [];
    if (grid) grid.classList.add('r101-anim');
    if (why) {
      why.classList.add('r101-anim');
      [].slice.call(why.querySelectorAll('li')).forEach(function (li, i) { li.style.transitionDelay = (i * 0.06) + 's'; });
      items.push(why);
    }
    var io = new IntersectionObserver(function (es) {
      var n = 0;
      es.forEach(function (e) {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          if (e.target.id !== 'r101-abwhy') e.target.style.transitionDelay = (n++ * 0.12) + 's';   // tiles arriving together roll in one after another
          e.target.classList.add('in'); io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- COLLECTION HEROES ----------
     Booqable has ONE "Collection" template, so every collection page shares one hero.
     This swaps in each collection's own photo, headline, text and buttons by URL.
     Collections not listed here keep the shared hero.                                  */
  var CDN = 'https://images.booqablecdn.com/';
  var IMG_HARLEY = 'assets/a64592c4-9950-4366-ad2b-a0044b2ce483/clzvhd39m00jh2a71hqi09q1nsandiegoharleyrentalsreferstwystedthrottle-81b5d46b76f3892c7fea91399eac620f4b88ccdc531e4fe72b904689c855cf12(2).jpg';
  var IMG_GS = 'assets/a64592c4-9950-4366-ad2b-a0044b2ce483/cmht58ngx00jw2a7line2q4zm(2).BMWR1200GSAdventureBikeHero1highresIV-e2d79e9d0fbd87598b14565aa93f9bc66a3c4f908927e0e017d4e5f6295d8980.jpg';
  var A = 'assets/a64592c4-9950-4366-ad2b-a0044b2ce483/';
  var IMG_GS2 = A + 'cmhs1rln20bcr2a7hn25kco7t(2).BMWR1200GSAdventureBikeCTA3highres-83131262172441953b4248b1ee9acae9762bd4bdf91a205281d078a626a2e865.jpg';
  var IMG_HWY = A + 'cm0q2vvxr01d92a71dv29yf4tsandiegoharleyrentalscta1-8dc054395bde28d517c7e23a69491d1cc7613d267942f289e305326a6811e2c2(2).jpg';
  var IMG_CITY = A + 'clzvg0k3s00h62a710pcfprtmsandiegoharleyrentalscta2-1b65c47d3c54409155db3c8acd2b0a5b8eed81ea90881e233e6c4786bfeaa242(2).jpg';
  var IMG_ROAD = A + 'ue4ec8mhyq38ab8o4h4rnp54(2).Route101CTACenteredHero-be6475418a8ea4a26382c73815ddb9e37a904d9a4b9f5760ca6326bf61dd54d8.png';
  var IMG_BROKE = A + 'cmayde55s00qs2a78ve38u1j0(2).BrokenDownHarley-44bb140bcbff2aba67bbf6901dff41a85a4cdc587ac3990ec57bf3536eab3e9c.jpg';
  var IMG_PIER = A + 'cm0qx02m500ib2a720sxxwlsmpacificbeachpier-041c1e488dca73789f6b1d6ae8471bcf7661a42282816604c549ae4d39cb08b7(2).jpg';
  var CALL = ['CALL (888) 509-5032', 'tel:+18885095032'];
  var FLEETBTN = ['SEE THE FLEET', '/collections/route-rental-fleet'];
  var SEE = ['SEE BIKES & PRICES', '#r101-grid'];
  var FLEET = {
    h: 'The Route 101 Rental Fleet',
    p: 'Harley-Davidson touring and cruisers plus BMW GS adventure bikes, all maintained in-house. Free riding gear with every rental, and a $500 deposit, never more.',
    b: [SEE, CALL]
  };
  var CHERO = {
    'route-rental-fleet': FLEET,
    'all': FLEET,
    'motorcycle-rentals': {
      img: IMG_HARLEY,
      h: 'Harley-Davidson Rentals in San Diego',
      p: 'Street Glide and Heritage Softail, maintained in-house and ready for the coast, the mountains or the desert. Free Venom helmet, Harley-Davidson leather jacket and gloves with every rental.',
      b: [SEE, CALL]
    },
    'explore-our-bmw-gs-rental-fleet': {
      img: IMG_GS,
      h: 'BMW GS Adventure Rentals',
      p: 'R 1250 GS, R 1200 GS and GS Adventure models, built for pavement, dirt and everything in between. Side cases and top box available, and free riding gear with every rental.',
      b: [SEE, CALL]
    },
    'motorcycle-tours': {
      img: IMG_HWY,
      h: 'Guided Motorcycle Day Tours',
      p: 'Ride Southern California with a San Diego native: the Route 101 coast, Josie\u2019s Hideout in the backcountry, or the Anza-Borrego desert. 100 to 200 miles round trip, with a one-day bike rental included.',
      b: [['SEE THE TOURS', '#r101-grid'], CALL]
    },
    'book-a-bmw-gs-adventure-tour': {
      img: IMG_GS2,
      h: 'BMW GS Adventure Tours',
      p: 'Guided day rides on a BMW GS, led by a San Diego native: the Route 101 coast, Josie\u2019s Hideout in the backcountry, or the Anza-Borrego desert. One-day bike rental included.',
      b: [['SEE THE TOURS', '#r101-grid'], CALL]
    },
    'gear-and-rental-add-ons': {
      img: IMG_CITY,
      h: 'Free Riding Gear & Rental Add-Ons',
      p: 'A Venom helmet, Harley-Davidson leather jacket and Milwaukee gloves come free with every rental. Add dual sport gear, REIS\u00cbN side cases or a protection plan to fit your ride.',
      b: [['SEE GEAR & ADD-ONS', '#r101-grid'], FLEETBTN]
    },
    'harley-add-ons': {
      img: IMG_ROAD,
      h: 'Harley Riding Gear',
      p: 'Venom full-face helmet, Harley-Davidson leather jackets and Milwaukee leather gloves, ready for your Harley rental.',
      b: [['SEE HARLEY GEAR', '#r101-grid'], ['SEE HARLEY RENTALS', '/collections/motorcycle-rentals']]
    },
    'dual-sport-add-ons': {
      img: IMG_GS,
      h: 'Adventure & Dual Sport Gear',
      p: 'Raptor modular helmet, dual sport jacket, pants and gloves, plus REIS\u00cbN side cases and top box for your GS adventure.',
      b: [['SEE ADVENTURE GEAR', '#r101-grid'], ['SEE BMW GS RENTALS', '/collections/explore-our-bmw-gs-rental-fleet']]
    },
    'roadside-add-ons': {
      img: IMG_BROKE,
      h: 'Rental Insurance & Roadside Protection',
      p: 'RiderSHIELD\u2122 rental insurance from $19/day, plus ProtectionONE and ProtectionPLUS roadside plans covering flat tires, towing and mechanical failures.',
      b: [['SEE COVERAGE OPTIONS', '#r101-grid'], CALL]
    },
    'route-101-merch': {
      url: 'https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@5bd9236ab2c26f7443caa40e5769344131408de2/img/merch-rider-dusk',
      h: 'Route 101 Merch',
      p: 'Route 101 short-sleeve tees in black and white. Wear the shield.',
      b: [['SHOP MERCH', '#r101-grid'], FLEETBTN]
    }
  };
  var CH_CSS = `
body.r101-ch main section.hero .hero__vision-wrapper:after{content:"";position:absolute;inset:0;background:linear-gradient(127deg,#000 25.94%,rgba(0,0,0,0) 100%);opacity:.72;pointer-events:none;z-index:1}
#r101-grid{scroll-margin-top:110px}
body.r101-ch #r101-grid .product-card{background:#fff;border:1px solid var(--r101-line,#e6e6e6)!important;border-radius:18px;overflow:hidden;box-shadow:0 10px 26px rgba(0,0,0,.06);transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column;height:100%}
body.r101-ch #r101-grid .product-card:hover{transform:translateY(-4px);box-shadow:0 18px 36px rgba(0,0,0,.12)}
body.r101-ch #r101-grid .product-card__vision{background:#fff;padding:10px 10px 0;box-sizing:border-box;width:100%;overflow:hidden}
body.r101-ch #r101-grid .product-card__image-wrapper{display:block;width:100%;max-width:100%}
body.r101-ch #r101-grid .product-card__image{width:100%;height:100%;object-fit:contain}
body.r101-ch #r101-grid .product-card__image{transition:scale .5s ease}
body.r101-ch #r101-grid .product-card:hover .product-card__image{scale:1.03}
body.r101-ch #r101-grid .product-card__meta{padding:14px 18px 18px;display:flex;flex-direction:column;gap:6px;flex:1;border-top:1px solid var(--r101-line,#eee)}
body.r101-ch #r101-grid .product-card__title{margin:0!important}
body.r101-ch #r101-grid .product-card__title a{font-family:Anton,sans-serif!important;font-size:clamp(19px,1.5vw,22px)!important;line-height:1.1!important;color:var(--r101-ink,#111)!important;text-decoration:none;letter-spacing:0}
body.r101-ch #r101-grid .product-card__price-wrapper{font:400 14px/1.3 Inter,sans-serif!important;color:#666}
body.r101-ch #r101-grid .product-card__price{color:${O}!important;font-weight:700!important;font-size:17px!important}
body.r101-ch #r101-grid .r101-go{margin-top:auto;padding-top:6px;font:700 12.5px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${O}}
`;
  function collectionHero() {
    var m = location.pathname.match(/^\/collections\/([^\/?#]+)\/?$/);
    var cfg = m && CHERO[m[1]];
    var hero = document.querySelector('main section.hero');
    if (!cfg || !hero || document.body.classList.contains('r101-ch')) return;
    document.body.classList.add('r101-ch');
    addStyle('r101-ch-css', CH_CSS);
    var grid = document.querySelector('main section.collection-page');
    if (grid && !document.getElementById('r101-grid')) grid.id = 'r101-grid';
    if (grid) [].slice.call(grid.querySelectorAll('.product-card')).forEach(function (pc) {
      var t = pc.querySelector('.product-card__title a'), meta = pc.querySelector('.product-card__meta');
      if (t && /^Rent (a|an) /i.test(t.textContent.trim())) { t.setAttribute('title', t.textContent.trim()); t.textContent = t.textContent.trim().replace(/^Rent (a|an) /i, ''); }
      if (meta && !meta.querySelector('.r101-go')) {
        var bike = /\/products\/rent-a-/.test((t && t.getAttribute('href')) || '');
        var g = document.createElement('span'); g.className = 'r101-go'; g.textContent = (bike ? 'View & book' : 'View details') + ' →';
        meta.appendChild(g);
      }
    });
    var h = hero.querySelector('.hero__heading'); if (h && cfg.h) h.textContent = cfg.h;
    var d = hero.querySelector('.hero__description'); if (d && cfg.p) { d.innerHTML = '<p></p>'; d.firstChild.textContent = cfg.p; }
    var btns = [].slice.call(hero.querySelectorAll('.hero__button'));
    (cfg.b || []).forEach(function (b, i) {
      if (!btns[i]) return;
      btns[i].textContent = b[0]; btns[i].setAttribute('href', b[1]);
      if (b[1].charAt(0) === '#') btns[i].addEventListener('click', function (e) {
        var t = document.querySelector(b[1]); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
    if (cfg.img || cfg.url) {
      var pic = hero.querySelector('.hero__vision picture'), im = pic && pic.querySelector('img');
      if (im) {
        var widths = [480, 768, 1200, 1680, 2560];
        var set = cfg.url ? cfg.url + '-960.jpg 960w, ' + cfg.url + '.jpg 1920w'
          : widths.map(function (w) { return CDN + 'w' + w + '/' + cfg.img + ' ' + w + 'w'; }).join(', ');
        [].slice.call(pic.querySelectorAll('source')).forEach(function (src) { src.remove(); });
        im.removeAttribute('srcset');
        im.setAttribute('srcset', set);
        im.setAttribute('sizes', '100vw');
        im.src = cfg.url ? cfg.url + '.jpg' : CDN + 'w1680/' + cfg.img;
        im.alt = cfg.h;
      }
    }
  }

  /* ---------- RENTALS HUB (/collections) ----------
     Booqable's collections index = 9 tall unlabeled-looking tiles, alphabetical, BMW GS on page 2.
     We add a standard hero and rebuild the index as three labeled groups (links unchanged). */
  var RH_CSS = `
body.r101-rh main section.title,body.r101-rh main section.collections{display:none!important}
#r101-rhero{position:relative;min-height:min(78vh,760px);display:flex;align-items:center;overflow:hidden;background:#111;color:#fff}
#r101-rhero .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
#r101-rhero:after{content:"";position:absolute;inset:0;background:linear-gradient(127deg,#000 25.94%,rgba(0,0,0,0) 100%);opacity:.72;pointer-events:none}
#r101-rhero .in{position:relative;z-index:1;width:100%;max-width:1240px;margin:0 auto;padding:120px 24px 90px}
#r101-rhero h1{font-family:Anton,sans-serif!important;font-size:clamp(40px,4.6vw,66px)!important;line-height:1.04!important;color:#fff!important;margin:0 0 18px!important;max-width:15ch;text-transform:none}
#r101-rhero p{font:400 16px/1.5 Inter,sans-serif!important;color:#fff!important;max-width:620px;margin:0 0 28px!important}
#r101-rhero .bt{display:flex;flex-wrap:wrap;gap:12px}
#r101-rh{padding:64px 0 72px}
#r101-rh .wrap{max-width:1240px;margin:0 auto;padding:0 24px}
#r101-rh .grp+.grp{margin-top:56px}
#r101-rh .eb{font:600 13px/1 Inter,sans-serif;letter-spacing:.18em;color:${O};text-transform:uppercase;margin:0 0 10px}
#r101-rh h2{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(28px,2.6vw,38px)!important;line-height:1.05!important;margin:0 0 22px!important;color:var(--r101-ink,#111)}
#r101-rh .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
#r101-rh .g.two{grid-template-columns:repeat(2,minmax(0,1fr))}
#r101-rh a.c{position:relative;display:block;border-radius:18px;overflow:hidden;aspect-ratio:4/3;background:#222;color:#fff!important;text-decoration:none;box-shadow:0 12px 30px rgba(0,0,0,.10);transition:transform .25s,box-shadow .25s}
#r101-rh .g.two a.c{aspect-ratio:16/9}
#r101-rh a.c img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:scale .6s ease}
#r101-rh a.c:after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.62) 48%,rgba(0,0,0,.08) 80%)}
#r101-rh a.c:hover{transform:translateY(-4px);box-shadow:0 18px 38px rgba(0,0,0,.18)}
#r101-rh a.c:hover img{scale:1.04}
#r101-rh .t{position:absolute;left:0;right:0;bottom:0;z-index:1;padding:20px 22px}
#r101-rh .t h3{font-family:Anton,sans-serif!important;font-size:clamp(22px,1.9vw,28px)!important;line-height:1.05!important;margin:0 0 6px!important;color:#fff!important;text-shadow:0 2px 14px rgba(0,0,0,.65)}
#r101-rh .t p{font:400 14.5px/1.45 Inter,sans-serif!important;color:rgba(255,255,255,.9)!important;margin:0 0 10px!important;text-shadow:0 1px 8px rgba(0,0,0,.6)}
#r101-rh .t .go{font:700 13px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${O}}
#r101-rh .t .n{font:500 12px/1 Inter,sans-serif;color:rgba(255,255,255,.7);margin-left:10px;letter-spacing:.04em;text-transform:none}
@media (max-width:900px){#r101-rh .g,#r101-rh .g.two{grid-template-columns:1fr 1fr}}
@media (max-width:620px){
#r101-rhero{min-height:0}
#r101-rhero .in{padding:160px 18px 56px}
#r101-rh{padding:44px 0 52px}
#r101-rh .wrap{padding:0 16px}
#r101-rh .grp+.grp{margin-top:40px}
#r101-rh .g,#r101-rh .g.two{grid-template-columns:1fr;gap:14px}
#r101-rh a.c,#r101-rh .g.two a.c{aspect-ratio:16/10}
}
`;
  var RH_GROUPS = [
    ['Rent a motorcycle', 'Pick your bike', '', [
      ['motorcycle-rentals', 'Harley-Davidson Rentals', 'Street Glide and Heritage Softail. Free helmet, H-D leather jacket and gloves.', IMG_HARLEY],
      ['explore-our-bmw-gs-rental-fleet', 'BMW GS Adventure Rentals', 'R 1250 GS, R 1200 GS and GS Adventure. Pavement, dirt and everything between.', IMG_GS],
      ['route-rental-fleet', 'The Full Fleet', 'Every Harley and BMW GS we rent, side by side.', null, 'all']
    ]],
    ['Guided tours', 'Ride with a local', 'two', [
      ['motorcycle-tours', 'Harley Day Tours', 'Coast, backcountry or desert with a San Diego native. One-day bike rental included.', IMG_HWY],
      ['book-a-bmw-gs-adventure-tour', 'BMW GS Adventure Tours', 'Guided GS day rides, 100 to 200 miles round trip. One-day bike rental included.', IMG_GS2]
    ]],
    ['Gear, protection & merch', 'Add to your ride', '', [
      ['gear-and-rental-add-ons', 'Free Riding Gear & Add-Ons', 'Helmet, jacket and gloves free with every rental, plus extras for your trip.', IMG_CITY],
      ['harley-add-ons', 'Harley Riding Gear', 'Venom helmet, Harley-Davidson leather jackets and Milwaukee gloves.', IMG_ROAD],
      ['dual-sport-add-ons', 'Adventure & Dual Sport Gear', 'Raptor helmet, jacket, pants and gloves, plus side cases and top box.', IMG_GS],
      ['roadside-add-ons', 'Insurance & Roadside Protection', 'RiderSHIELD™ from $19/day, plus ProtectionONE and ProtectionPLUS roadside plans.', IMG_BROKE],
      ['route-101-merch', 'Route 101 Merch', 'Route 101 tees in black and white. Wear the shield.', null]
    ]]
  ];
  function rentalsHub() {
    var sec = document.querySelector('main section.collections');
    if (!sec || document.getElementById('r101-rh')) return;
    document.body.classList.add('r101-rh');
    addStyle('r101-rh-css', RH_CSS);
    var tile = {};
    [].slice.call(sec.querySelectorAll('li.collections__item')).forEach(function (li) {
      var a = li.querySelector('a'), im = li.querySelector('img');
      var slug = a && (a.getAttribute('href') || '').replace(/[?#].*$/, '').split('/collections/')[1];
      if (!slug) return;
      var n = (li.textContent.match(/(\d+)\s+Items?/i) || [])[1];
      tile[slug.replace(/\/$/, '')] = { img: im && (im.currentSrc || im.src), n: n };
    });
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    var hero = document.createElement('section'); hero.id = 'r101-rhero';
    hero.innerHTML = '<img class="bg r101-drift" alt="Motorcycle rentals in San Diego" fetchpriority="high" sizes="100vw" src="' + CDN + 'w1680/' + esc(IMG_ROAD) + '" srcset="' +
      [768, 1200, 1680, 2560].map(function (w) { return CDN + 'w' + w + '/' + esc(IMG_ROAD) + ' ' + w + 'w'; }).join(', ') + '">' +
      '<div class="in"><h1>Motorcycle Rentals &amp; Tours in San Diego</h1>' +
      '<p>Harley-Davidson touring and cruisers, BMW GS adventure bikes and guided day tours, all from our Carlsbad shop. Free riding gear with every rental, and a $500 deposit, never more.</p>' +
      '<div class="bt"><a class="button button--primary button--large" href="#r101-rh">SEE BIKES &amp; PRICES</a>' +
      '<a class="button button--outlined button--large r101-ol-light" href="tel:+18885095032">CALL (888) 509-5032</a></div></div>';
    var list = document.createElement('section'); list.id = 'r101-rh';
    var html = '<div class="wrap">';
    RH_GROUPS.forEach(function (g) {
      html += '<div class="grp"><p class="eb">' + esc(g[1]) + '</p><h2>' + esc(g[0]) + '</h2><div class="g ' + g[2] + '">';
      g[3].forEach(function (c) {
        var t = tile[c[4] || c[0]] || tile[c[0]] || {};
        var src = c[3] ? CDN + 'w960/' + c[3] : t.img;
        if (!src && c[0] === 'route-101-merch') src = CHERO['route-101-merch'].url + '-960.jpg';
        html += '<a class="c" href="/collections/' + c[0] + '">' + (src ? '<img loading="lazy" alt="' + esc(c[1]) + '" src="' + esc(src) + '">' : '') +
          '<div class="t"><h3>' + esc(c[1]) + '</h3><p>' + esc(c[2]) + '</p><span class="go">View &rarr;</span></div></a>';
      });
      html += '</div></div>';
    });
    list.innerHTML = html + '</div>';
    var main = sec.parentNode;
    main.insertBefore(hero, main.firstChild);
    sec.parentNode.insertBefore(list, sec);
    hero.querySelector('a[href="#r101-rh"]').addEventListener('click', function (e) { e.preventDefault(); list.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    var bg = hero.querySelector('.bg');
    bg.style.animationDelay = (-Math.random() * 22).toFixed(1) + 's';
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { bg.classList.toggle('r101-run', e.isIntersecting); }); }).observe(hero);
  }

  /* ---------- PRODUCT PAGES (bikes, gear, plans) ----------
     One shared Booqable "Product" template. Booking widgets (bq-*) are Booqable's own;
     we only restyle around them and reorder the info column so booking sits up top. */
  var PR_CSS = `
body.r101-pr main section.product-main .product-main__wrapper{padding-top:28px!important;padding-bottom:56px!important}
body.r101-pr .product-main__info{display:flex;flex-direction:column;gap:0}
body.r101-pr .r101-peb{font:600 12px/1 Inter,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:${O};margin:0 0 10px}
@media (max-width:760px){body.r101-pr .r101-peb{margin-top:22px}}
body.r101-pr h1.product-main__title{font-size:clamp(30px,3.1vw,46px)!important;line-height:1.04!important;margin:0 0 12px!important}
body.r101-pr .product-main__price{margin:0 0 16px!important}
body.r101-pr .r101-blab{background:#fff;border:1px solid var(--r101-line);border-top:4px solid ${O};border-bottom:0;border-radius:18px 18px 0 0;padding:16px 18px 8px;margin:0;font:700 15px/1.3 Inter,sans-serif;color:var(--r101-ink)}
body.r101-pr .r101-blab span{display:block;font:400 13.5px/1.35 Inter,system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:var(--r101-mute);margin-top:3px}
body.r101-pr .product-main__info>.r101-bk{background:#fff;border-left:1px solid var(--r101-line);border-right:1px solid var(--r101-line);margin:0!important;padding:4px 18px}
body.r101-pr .product-main__info>.r101-bk.r101-bk-last{border-bottom:1px solid var(--r101-line);border-radius:0 0 18px 18px;padding-bottom:16px;box-shadow:0 14px 26px rgba(0,0,0,.05)}
body.r101-pr .product-main__info>.product-main__variant.r101-bk:empty{display:none}
#r101-pchips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 22px}
#r101-pchips span{font:600 13px/1 Inter,sans-serif;color:var(--r101-ink);background:#fff;border:1px solid var(--r101-line);border-radius:999px;padding:9px 12px}
#r101-pchips b{color:${O};margin-right:6px}
body.r101-pr .product-main__description{font:400 15.5px/1.55 Inter,sans-serif!important;color:var(--r101-mute)}
body.r101-pr .product-main__description p{margin:0 0 10px!important}
body.r101-pr .product-main__description ul{list-style:none;padding:0;margin:4px 0 12px}
body.r101-pr .product-main__description li{position:relative;padding-left:26px;margin:0 0 6px;list-style:none!important}
body.r101-pr .product-main__description li::marker{content:''}
body.r101-pr .product-main__description li:before{content:"\\2713";position:absolute;left:0;top:2px;width:18px;height:18px;border-radius:50%;background:${O};color:#111;font:800 11px/18px Inter,sans-serif;text-align:center}
body.r101-pr .product-main__gallery img{border-radius:18px}
body.r101-pr main section.products.r101-pr-hide{display:none!important}
body.r101-pr main section.products .r101-phd{margin:0 0 18px}
body.r101-pr main section.products .r101-phd p{font:600 12px/1 Inter,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:${O};margin:0 0 8px}
body.r101-pr main section.products .r101-phd h2{font-family:Anton,sans-serif;text-transform:uppercase;font-size:clamp(26px,2.8vw,38px)!important;line-height:1.05!important;margin:0!important;text-align:left!important;color:var(--r101-ink)}
body.r101-pr main section.products .products__heading{display:none!important}
body.r101-pr main section.products .product-card{background:#fff;border:1px solid var(--r101-line);border-radius:16px;padding:10px 10px 14px;transition:transform .25s ease,box-shadow .25s ease}
body.r101-pr main section.products .product-card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.10)}
body.r101-pr main section.products .product-card img{border-radius:12px}
body.r101-pr main section.products .product-card__title{font:600 15px/1.3 Inter,sans-serif!important;text-transform:none!important;letter-spacing:0!important;color:var(--r101-ink)!important;margin-top:10px!important}
@media (max-width:760px){`;
  function productPage() {
    var main = document.querySelector('main');
    var pm = main && main.querySelector('section.product-main');
    if (!pm || document.body.classList.contains('r101-pr')) return;
    document.body.classList.add('r101-pr');
    addStyle('r101-pr-css', PR_CSS);
    var slug = (location.pathname.split('/products/')[1] || '').replace(/\/$/, '');
    var bike = /^rent-a-bmw/.test(slug) ? 'bmw' : /^rent-a-harley/.test(slug) ? 'harley' : '';
    var info = pm.querySelector('.product-main__info');
    var h1 = info && info.querySelector('.product-main__title');
    if (!info || !h1) return;
    // eyebrow above the title
    var eb = document.createElement('p'); eb.className = 'r101-peb';
    eb.textContent = bike === 'harley' ? 'Harley-Davidson rental' : bike === 'bmw' ? 'BMW GS adventure rental' : 'Route 101 Motorsports';
    info.insertBefore(eb, h1);
    // booking card drawn around Booqable's own widgets (they stay in place so their styling and logic keep working)
    var parts = ['.product-main__variant', '.product-main__availability', '.product-main__quantity'].map(function (q) { return info.querySelector(':scope > ' + q); }).filter(Boolean);
    if (parts.length) {
      var lab = document.createElement('p'); lab.className = 'r101-blab';
      lab.innerHTML = bike ? 'Pick your dates<span>See live availability and your exact price, with no hidden fees.</span>' : 'Add to your booking';
      info.insertBefore(lab, parts[0]);
      parts.forEach(function (p) { p.classList.add('r101-bk'); });
      parts[parts.length - 1].classList.add('r101-bk-last');
      if (bike) {
        var chips = document.createElement('div'); chips.id = 'r101-pchips';
        chips.innerHTML = '<span><b>&#10003;</b>100% 5-star reviews</span><span><b>&#10003;</b>$500 deposit, never more</span><span><b>&#10003;</b>No mileage limits</span><span><b>&#10003;</b>Free riding gear</span><span><b>&#10003;</b>Maintained in-house</span>';
        info.insertBefore(chips, parts[parts.length - 1].nextSibling);
      }
      // keep the long description below the booking card
      var desc = info.querySelector(':scope > .product-main__description');
      if (desc) info.appendChild(desc);
    }
    // add-on rows: label them, and only show gear that fits this bike
    [].slice.call(main.querySelectorAll('section.products')).forEach(function (sec) {
      var t = sec.innerText || '';
      var kind = /Protection(ONE|PLUS)|RiderSHIELD/.test(t) ? 'plan' : /Dual Sport|REIS/.test(t) ? 'adv' : 'harley';
      if ((bike === 'harley' && kind === 'adv') || (bike === 'bmw' && kind === 'harley')) { sec.classList.add('r101-pr-hide'); return; }
      var lab = { harley: ['Riding gear', bike ? 'Add your free gear' : 'Harley riding gear'],
                  adv: ['Adventure gear & luggage', bike ? 'Gear up for the GS' : 'Adventure gear & luggage'],
                  plan: ['Peace of mind', 'Protect your ride'] }[kind];
      var c = sec.querySelector('.container') || sec.firstElementChild;
      if (c && !sec.querySelector('.r101-phd')) {
        var hd = document.createElement('div'); hd.className = 'r101-phd';
        hd.innerHTML = '<p></p><h2></h2>'; hd.querySelector('p').textContent = lab[0]; hd.querySelector('h2').textContent = lab[1];
        c.insertBefore(hd, c.firstChild);
      }
    });
  }

  /* ---------- CHECKOUT SIGN-IN: guest checkout up front ---------- */
  var GUEST_CSS = `
#r101-guest{background:#fff;border:1px solid var(--r101-line);border-top:4px solid ${O};border-radius:18px;padding:22px 22px 18px;margin:0 0 18px;text-align:center;box-shadow:0 14px 34px rgba(0,0,0,.06)}
#r101-guest h2{font-family:Anton,sans-serif;text-transform:uppercase;font-size:clamp(24px,2.4vw,30px)!important;line-height:1.05!important;margin:0 0 6px!important;color:var(--r101-ink)}
#r101-guest p{font:400 15px/1.45 Inter,sans-serif!important;color:var(--r101-mute);margin:0 0 14px!important;letter-spacing:0!important;text-transform:none!important}
#r101-guest a.g{display:block;background:${O};color:#111!important;text-decoration:none;font:700 16px/1 Inter,sans-serif;padding:17px 18px;border-radius:999px;transition:transform .2s,box-shadow .2s,filter .2s}
#r101-guest a.g:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(0,0,0,.18);filter:brightness(1.06)}
#r101-guest .or{display:flex;align-items:center;gap:10px;margin:16px 0 0;font:600 12px/1 Inter,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#9a9a9a}
#r101-guest .or:before,#r101-guest .or:after{content:"";flex:1;height:1px;background:var(--r101-line)}
#r101-guest p.vip{margin:12px 0 0!important;font-size:14.5px!important;color:var(--r101-ink)}
#r101-guest p.vip b{color:var(--r101-ink);font:700 14.5px/1.45 Inter,system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important}
body.r101-gco .acc__inner a[href*="force_guest_checkout"]:not(.g){display:none!important}
`;
  function guestCheckout() {
    var q = location.search, m = q.match(/[?&]redirect_uri=([^&]+)/);
    var to = m ? decodeURIComponent(m[1]) : '';
    if (to.indexOf('/checkouts/') !== 0 || document.getElementById('r101-guest')) return;
    var inner = document.querySelector('.acc__inner');
    if (!inner) return;
    document.body.classList.add('r101-gco');
    addStyle('r101-guest-css', GUEST_CSS);
    var b = document.createElement('div'); b.id = 'r101-guest';
    b.innerHTML = '<h2>Almost done!</h2><p>No account needed. Check out as a guest in a minute or two.</p>' +
      '<a class="g" href="#">Continue as guest &rarr;</a><div class="or">or</div>' +
      '<p class="vip"><b>Create an account</b> to save your details, earn <b>VIP rental credits</b> and receive <b>seasonal rental discounts</b> and <b>special offers!</b></p>';
    b.querySelector('a.g').href = to + (to.indexOf('?') > -1 ? '&' : '?') + 'force_guest_checkout=true';
    inner.parentNode.insertBefore(b, inner);
    b.style.maxWidth = inner.getBoundingClientRect().width + 'px';
    b.style.marginLeft = b.style.marginRight = 'auto';
  }

  /* ---------- CHECKOUT SUCCESS: thank-you card ---------- */
  var TY_CSS = `
#r101-ty{max-width:440px;margin:0 auto;text-align:center}
#r101-ty h2{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(28px,2.8vw,36px)!important;line-height:1.05!important;margin:14px 0 6px!important;color:var(--r101-ink,#111)}
#r101-ty p{font:400 15px/1.5 Inter,sans-serif!important;color:#555;margin:0 0 12px!important}
#r101-ty p.num{font-size:13.5px!important;color:#888;margin-bottom:18px!important}
#r101-ty .see{font:700 17px/1.35 Inter,sans-serif!important;color:#111;background:#fff6ef;border:1px solid #ffd9bf;border-radius:14px;padding:14px 16px;margin:0 0 18px!important}
#r101-ty .see b{color:${O}}
#r101-ty .ct{border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;padding:16px 0 6px;margin:0 0 18px}
#r101-ty .ct .l{font:600 12px/1 Inter,sans-serif!important;letter-spacing:.14em;text-transform:uppercase;color:#9a9a9a;margin:0 0 12px!important}
#r101-ty .ct a{color:#111;text-decoration:none;font-weight:600}
#r101-ty .ct a:hover{color:${O}}
#r101-ty .sig{font:700 14px/1.3 Inter,sans-serif!important;color:#111;margin:0 0 18px!important}
#r101-ty .sig span{display:block;font-weight:400;color:${O};font-size:13px;margin-top:2px}
#r101-ty .see b{white-space:nowrap}
@media (max-width:760px){
.payment__status{height:auto!important;padding:28px 18px 34px!important}
#r101-ty .see b{display:block;white-space:normal;margin-top:2px}
}
`;
  function thankYou() {
    var st = document.querySelector('.payment__status');
    if (!st || document.getElementById('r101-ty')) return;
    var h = st.querySelector('h2');
    if (!h || !/thank you/i.test(h.textContent)) return;
    var box = h.parentElement;
    var numP = box.querySelector('p');
    var num = numP ? (numP.textContent.match(/#\s*\d+/) || [''])[0] : '';
    var back = box.querySelector('a.button');
    var icon = box.querySelector('.payment__success-icon');
    function pickup() {
      var d = document.querySelector('.summary-period__date');
      var m = d && d.textContent.trim().match(/^(\d\d)-(\d\d)-(\d{4})\s+(\d\d?):(\d\d)\s*(AM|PM)/i);
      if (!m) return '';
      var dt = new Date(+m[3], +m[1] - 1, +m[2]);
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var mos = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return days[dt.getDay()] + ', ' + mos[dt.getMonth()] + ' ' + dt.getDate() + ' <span style="white-space:nowrap">at ' + (+m[4]) + ':' + m[5] + '&nbsp;' + m[6].toUpperCase() + '!</span>';
    }
    var see = pickup();
    if (!see) {
      var tries = 0, t = setInterval(function () {
        var s = pickup(), el = document.querySelector('#r101-ty .see');
        if (s && el) el.innerHTML = 'See you <b>' + s + '</b>';
        if (s || ++tries > 30) clearInterval(t);
      }, 400);
    }
    addStyle('r101-ty-css', TY_CSS);
    var w = document.createElement('div'); w.id = 'r101-ty';
    w.innerHTML = '<h2>Thank you for booking!</h2>' +
      (num ? '<p class="num">Booking number ' + num + '</p>' : '') +
      '<p>Check your inbox now for your booking confirmation email (from <b>rental@route101motorsports.com</b>). If you did not receive it, check your spam folder. Contact us if you did not receive it.</p>' +
      '<div class="ct"><p class="l">Contact Route 101 Motorsports</p>' +
      '<p>Tel: <a href="tel:+18885095032">(888) 509-5032</a></p>' +
      '<p>Address: <a href="https://maps.google.com/?q=6351+Corte+Del+Abeto+%23107,+Carlsbad,+CA+92011" target="_blank" rel="noopener">6351 Corte Del Abeto #107, Carlsbad, CA 92011</a></p></div>' +
      '<p class="see">' + (see ? 'See you <b>' + see + '</b>' : 'See you soon!') + '</p>' +
      '<p class="sig">Route 101 Motorsports<span>Go. Just go.</span></p>';
    box.innerHTML = '';
    if (icon) box.appendChild(icon);
    box.appendChild(w);
    if (back) w.appendChild(back);
  }

  /* ---------- HARLEY SERVICE HUB ---------- */
  var HRL_CSS = `
body.r101-harley .r101-hide-sec,body.r101-harley .r101-hide{display:none!important}
body.r101-harley section.contact-form{scroll-margin-top:110px}
body.r101-harley .r101-hhero .hero__description strong{font-weight:inherit}
body.r101-harley .r101-hhero .hero__description p.r101-tag{font:700 15px/1.3 Inter,system-ui,sans-serif!important;letter-spacing:.04em;color:${O}!important;margin:0 0 10px!important}
#r101-svc{background:#fff;padding:60px 0}
#r101-svc .eb,#r101-hl .eb{font:600 13px/1 Inter,sans-serif;letter-spacing:.18em;color:${O};text-transform:uppercase;margin:0 0 10px}
#r101-svc h2{font-family:Anton,sans-serif;text-transform:uppercase;margin:0 0 22px;color:var(--r101-ink)}
#r101-svc .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
#r101-svc .c{position:relative;display:flex;flex-direction:column;background:var(--r101-soft);border:1px solid var(--r101-line);border-radius:18px;padding:24px 22px 20px;overflow:hidden}
#r101-svc .c:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:${O}}
#r101-svc h3{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(21px,1.6vw,25px)!important;line-height:1.08!important;margin:0 0 8px;color:var(--r101-ink)}
#r101-svc .pr{font-family:Anton,sans-serif;font-size:clamp(44px,4.2vw,58px);line-height:1;color:${O};margin:2px 0 10px}
#r101-svc .pr small{font:600 13px/1 Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--r101-mute);margin-right:6px;vertical-align:middle}
#r101-svc p{font:400 16px/1.35 Inter,sans-serif!important;color:var(--r101-mute);margin:0 0 16px!important;flex:1}
#r101-svc .a{display:flex;flex-direction:column;gap:8px}
#r101-svc .a .button{width:100%;min-height:48px;padding:12px 20px!important;border-radius:999px!important;display:flex!important;align-items:center;text-align:center;justify-content:center;background:${O}!important;border-color:${O}!important;color:#111!important}
#r101-svc .lk{background:none;border:0;padding:4px 0;font:600 14px/1.2 Inter,sans-serif;color:var(--r101-ink);text-decoration:underline;text-underline-offset:3px;cursor:pointer;align-self:center}
#r101-svc .lk:hover{color:${O}}
body.r101-harley .r101-hl ul{columns:3;column-gap:36px;list-style:none;padding:0;margin:12px 0 18px}
body.r101-harley .r101-hl li{break-inside:avoid;position:relative;padding-left:30px;margin:0 0 10px;font:400 16px/1.35 Inter,sans-serif;color:var(--r101-ink)}
body.r101-harley .r101-hl li:before{content:"\\2713";position:absolute;left:0;top:1px;width:20px;height:20px;border-radius:50%;background:${O};color:#111;font:800 12px/20px Inter,sans-serif;text-align:center}
body.r101-harley .r101-hl .r101-src{display:none!important}
body.r101-harley .r101-hl .hero__text-area,body.r101-harley .r101-hl .hero__content,body.r101-harley .r101-hl .hero__description{max-width:none!important;width:100%!important}
body.r101-harley .r101-hl .hero__wrapper{padding-left:0!important;padding-right:0!important}
body.r101-harley .r101-tight .hero__wrapper{padding-bottom:28px!important}
body.r101-harley .r101-tight .hero__description{padding-bottom:0!important}
body.r101-harley .r101-tight ul.r101-done{margin-bottom:0!important}
body.r101-harley .r101-tight-logos img{max-height:46px!important;width:auto!important}
body.r101-harley .r101-logorow img{max-height:40px!important;width:auto!important}
body.r101-harley .r101-tight .hero__wrapper{padding-top:8px!important}
body.r101-harley .r101-tight-logos .logos__wrapper{padding-top:28px!important;padding-bottom:0!important}
body.r101-harley .r101-logorow .logos__images-wrapper{display:flex!important;flex-wrap:wrap;justify-content:center;align-items:center;gap:18px 40px}
body.r101-harley .r101-logorow .logos__wrapper{padding:20px 0 28px!important}
body.r101-harley .r101-logorow .logos__images,body.r101-harley .r101-logorow .logos__images-wrapper{padding:0!important;margin:0!important}
#r101-inc{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px}
#r101-inc .p{position:relative;background:#fff;border-radius:20px;width:100%;max-width:780px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.35)}
#r101-inc .p:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:${O}}
#r101-inc .hd{padding:24px 64px 14px 24px;border-bottom:1px solid var(--r101-line)}
#r101-inc .eb{font:600 12px/1 Inter,sans-serif;letter-spacing:.18em;color:${O};text-transform:uppercase;margin:0 0 8px}
#r101-inc h3{font-family:Anton,sans-serif!important;text-transform:uppercase;font-size:clamp(22px,2.4vw,28px)!important;line-height:1.08!important;margin:0;color:var(--r101-ink)}
#r101-inc .pr{font-family:Anton,sans-serif;font-size:30px;line-height:1.1;color:${O};margin-top:4px}
#r101-inc .x{position:absolute;top:16px;right:16px;width:40px;height:40px;border-radius:50%;border:0;background:var(--r101-soft);color:var(--r101-ink);font:400 26px/40px Inter,sans-serif;cursor:pointer}
#r101-inc .x:hover{background:#e9e7e2}
#r101-inc .bd{padding:16px 24px 8px;overflow:auto}
#r101-inc .bd .in{font:400 16px/1.4 Inter,sans-serif;color:var(--r101-mute);margin:0 0 6px}
#r101-inc .bd h4{font:700 12px/1 Inter,sans-serif!important;letter-spacing:.14em;text-transform:uppercase;color:${O};margin:16px 0 8px}
#r101-inc .bd ul{list-style:none;padding:0;margin:0 0 6px;display:grid;grid-template-columns:1fr 1fr;gap:7px 24px}
#r101-inc .bd ul.one{grid-template-columns:1fr;gap:10px}
#r101-inc .bd li{position:relative;padding-left:28px;font:400 15px/1.35 Inter,sans-serif;color:var(--r101-ink)}
#r101-inc .bd li:before{content:"\\2713";position:absolute;left:0;top:1px;width:18px;height:18px;border-radius:50%;background:${O};color:#111;font:800 11px/18px Inter,sans-serif;text-align:center}
#r101-inc .bd li,#r101-inc .bd li span,#r101-inc .bd p{font-family:Inter,system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important}
#r101-inc .bd ul.one .t{font-weight:600}
#r101-inc .bd .d{display:block;color:var(--r101-mute);font-size:14px;margin-top:2px}
#r101-inc .bd .nt{font:italic 400 13px/1.4 Inter,sans-serif;color:#777;margin:12px 0 6px}
#r101-inc .bd .ld{color:var(--r101-mute);margin:10px 0 16px}
#r101-inc .bd .poster{display:block;max-width:100%;height:auto;border-radius:12px;margin:4px 0 12px}
#r101-inc .ft{padding:14px 24px 18px;border-top:1px solid var(--r101-line)}
#r101-inc .ft .button{width:100%;min-height:48px;padding:12px 20px!important;border-radius:999px!important;display:flex!important;align-items:center;justify-content:center;background:${O}!important;border-color:${O}!important;color:#111!important}
@media (max-width:640px){#r101-inc{padding:10px;align-items:flex-end}#r101-inc .p{max-height:92vh;border-radius:18px}#r101-inc .bd ul{grid-template-columns:1fr}#r101-inc .hd{padding:20px 60px 12px 18px}#r101-inc .bd{padding:14px 18px 6px}#r101-inc .ft{padding:12px 18px 16px}}
#r101-plb{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out}
#r101-plb img{max-width:min(1200px,96vw);max-height:88vh;width:auto;height:auto;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
#r101-plb button{position:absolute;top:14px;right:16px;width:44px;height:44px;border-radius:50%;border:0;background:#fff;color:#111;font:700 22px/44px Inter,sans-serif;cursor:pointer}
#r101-svc .g.n2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:1024px){#r101-svc .g{grid-template-columns:1fr 1fr}body.r101-harley .r101-hl ul{columns:2}}
@media (max-width:700px){#r101-svc{padding:44px 0}#r101-svc .g,#r101-svc .g.n2{grid-template-columns:1fr;gap:12px}#r101-svc .c{padding:20px 18px 16px}body.r101-harley .r101-hl ul{columns:1}}
`;

  function harleyPage() {
    var main = document.querySelector('main');
    if (!main || document.body.classList.contains('r101-harley')) return;
    document.body.classList.add('r101-harley');
    addStyle('r101-brk-css', BRK_CSS);   // shared "How it works" styles
    addStyle('r101-hrl-css', HRL_CSS);
    var secs = [].slice.call(main.querySelectorAll('section')).filter(function (s) { return !s.parentElement.closest('section'); });
    var hero = secs[0];
    var form = main.querySelector('section.contact-form');
    var formHash = form && form.id ? '#' + form.id : '#section-contact-form';
    var dec = function (s) { var t = document.createElement('textarea'); t.innerHTML = s; return t.value; };
    var BR = /bmw/i.test(location.pathname) ? 'BMW' : 'Harley';            // brand words for the BMW GS hub
    var BIKE = BR === 'BMW' ? 'BMW' : 'Harley';
    var prefill = function (c) {
      var ta = form && form.querySelector('textarea');
      if (ta && !ta.value.trim()) ta.value = 'Service: ' + c.t + ' (' + c.p + ')\nMy ' + BIKE + ' (year & model): ';
      try { gtag('event', 'service_card_click', { service: c.t }); } catch (x) {}
    };

    // "See what's included" pop-up. Content comes from Booqable: a matching FAQ answer on this page
    // ("What's included in ..."), or the "Includes" list on the service's own page, else the poster image.
    var incCache = {};
    var cap = function (s) { s = s.trim().replace(/\.$/, ''); return s.charAt(0).toUpperCase() + s.slice(1); };
    var keyOf = function (t) { return /interval/i.test(t) ? 'interval' : /3-hole|oil/i.test(t) ? 'oil' : /brake/i.test(t) ? 'brake' : ''; };
    var fromFaq = function (c) {
      var k = keyOf(c.t); if (!k) return null;
      var item = [].slice.call(main.querySelectorAll('section.accordion .accordion__item')).filter(function (li) {
        var h = (li.querySelector('h3') || {}).textContent || '';
        return /included/i.test(h) && h.toLowerCase().indexOf(k) > -1 && (k !== 'oil' || !/interval/i.test(h));
      })[0];
      var box = item && item.querySelector('.accordion__content-inner');
      if (!box) return null;
      var data = { intro: [], groups: [], notes: [] };
      [].slice.call(box.querySelectorAll('p')).forEach(function (p) {
        var tx = p.textContent.trim(); if (!tx) return;
        var b = p.firstElementChild && /^(B|STRONG)$/.test(p.firstElementChild.tagName) && tx.indexOf(p.firstElementChild.textContent.trim()) === 0 ? p.firstElementChild : null;
        if (b) {
          var rest = tx.slice(b.textContent.trim().length);
          data.groups.push({ label: b.textContent.replace(/:\s*$/, '').trim(), items: rest.split(';').map(function (x) { return x.trim(); }).filter(Boolean).map(function (x) { return { t: cap(x) }; }) });
        } else (data.groups.length ? data.notes : data.intro).push(tx);
      });
      return data.groups.length ? data : null;
    };
    var fromPage = function (href, cb) {
      if (incCache[href]) return cb(incCache[href]);
      fetch(href, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (html) {
        var d = new DOMParser().parseFromString(html, 'text/html');
        var s = [].slice.call(d.querySelectorAll('main section')).filter(function (x) { var h = x.querySelector('h2,h3'); return h && /includes/i.test(h.textContent) && x.querySelector('ul li'); })[0];
        if (!s) return cb(null);
        var data = { intro: [], groups: [{ label: '', items: [] }], notes: [], wide: true };
        [].slice.call(s.querySelectorAll('ul li')).forEach(function (li) {
          var b = li.querySelector('b,strong'), t = b ? b.textContent.trim() : li.textContent.trim();
          var dsc = b ? li.textContent.replace(b.textContent, '').replace(/^[\s \-–—:]+/, '').trim() : '';
          data.groups[0].items.push({ t: t, d: dsc ? cap(dsc) + '.' : '' });
        });
        [].slice.call(s.querySelectorAll('p')).forEach(function (p) { var tx = p.textContent.replace(/^\*/, '').trim(); if (tx && p.closest('ul') === null) data.notes.push(tx); });
        incCache[href] = data; cb(data);
      }).catch(function () { cb(null); });
    };
    var openIncluded = function (c) {
      var old = document.getElementById('r101-inc'); if (old) old.remove();
      var ov = document.createElement('div');
      ov.id = 'r101-inc';
      ov.innerHTML = '<div class="p" role="dialog" aria-modal="true"><div class="hd"><p class="eb">What\'s included</p><h3></h3><div class="pr"></div>' +
        '<button type="button" class="x" aria-label="Close">&times;</button></div><div class="bd"><p class="ld">Loading&hellip;</p></div>' +
        '<div class="ft"><a class="button button--primary"></a></div></div>';
      ov.querySelector('h3').textContent = c.t;
      ov.querySelector('.pr').textContent = c.p;
      var go = ov.querySelector('.ft a');
      go.setAttribute('href', c.href);
      go.textContent = c.here ? 'Book this service' : 'See ' + c.t;
      var close = function () { ov.remove(); document.documentElement.style.overflow = ''; document.removeEventListener('keydown', esc); };
      var esc = function (e) { if (e.key === 'Escape') close(); };
      ov.addEventListener('click', function (e) { if (e.target === ov || e.target.closest('.x')) close(); });
      go.addEventListener('click', function () { if (c.here) prefill(c); close(); });
      document.addEventListener('keydown', esc);
      document.documentElement.style.overflow = 'hidden';
      document.body.appendChild(ov);
      var fill = function (data) {
        var bd = ov.querySelector('.bd');
        if (!data) { bd.innerHTML = '<img class="poster" alt="">'; bd.querySelector('img').src = c.img; return; }
        bd.innerHTML = '';
        var add = function (tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
        data.intro.forEach(function (t) { bd.appendChild(add('p', 'in', t)); });
        data.groups.forEach(function (g) {
          if (g.label) bd.appendChild(add('h4', '', g.label));
          var ul = add('ul', data.wide ? 'one' : '');
          g.items.forEach(function (it) {
            var li = add('li'); li.appendChild(add('span', 't', it.t));
            if (it.d) li.appendChild(add('span', 'd', it.d));
            ul.appendChild(li);
          });
          bd.appendChild(ul);
        });
        data.notes.forEach(function (t) { bd.appendChild(add('p', 'nt', t)); });
      };
      var f = fromFaq(c);
      if (f) fill(f);
      else if (!c.here && c.href) fromPage(c.href, fill);
      else fill(null);
    };

    // hero: first short line with dots becomes the orange tagline
    if (hero && hero.classList.contains('hero')) {
      hero.classList.add('r101-hhero');
      var tp = hero.querySelector('.hero__description p');
      if (tp && /·/.test(tp.textContent) && tp.textContent.length < 90) tp.classList.add('r101-tag');
    }

    // poster ads -> service cards (card text lives in each poster's image description: "Title | Price | One line")
    var cards = [];
    secs.forEach(function (s, i) {
      if (i === 0 || !s.classList.contains('hero')) return;
      var t = (s.querySelector('.hero__description') || {}).textContent || '';
      var img = s.querySelector('img');
      if (s.querySelector('h1,h2,h3') || t.trim() || !img) return;
      s.classList.add('r101-hide-sec');
      var prev = s.previousElementSibling, next = s.nextElementSibling;
      if (prev && prev.classList.contains('spacer')) prev.classList.add('r101-hide-sec');
      if (next && next.classList.contains('spacer') && next.nextElementSibling && !next.nextElementSibling.classList.contains('contact-form')) next.classList.add('r101-hide-sec');
      var parts = dec(img.getAttribute('alt') || '').split('|').map(function (x) { return x.trim(); });
      if (parts.length < 3 || !parts[0]) return;
      var a = s.querySelector('a.button, .button');
      var href = a ? a.getAttribute('href') || '' : '';
      var here = !href || href.indexOf(location.pathname.replace(/\/+$/, '')) > -1 || href.charAt(0) === '#';
      var src = img.currentSrc || img.src;
      var big = s.querySelector('source') && s.querySelector('source').srcset ? s.querySelector('source').srcset.split(',').pop().trim().split(' ')[0] : src;
      cards.push({ t: parts[0], p: parts[1], d: parts.slice(2).join(' | '), href: here ? formHash : href, here: here, img: big || src });
    });
    cards.sort(function (x, y) { return (x.here ? 0 : 1) - (y.here ? 0 : 1); });
    var after = hero;
    if (cards.length && !document.getElementById('r101-svc')) {
      var sv = document.createElement('section');
      sv.id = 'r101-svc';
      var h = '<div class="container"><p class="eb">Flat-rate ' + (BR === 'BMW' ? 'BMW GS' : 'Harley') + ' service</p><h2>Popular ' + (BR === 'BMW' ? 'BMW GS' : 'Harley') + ' Services</h2><div class="g' + (cards.length === 2 ? ' n2' : '') + '">';
      cards.forEach(function (c, k) {
        var m = c.p.match(/^(from)\s*(.*)$/i);
        h += '<div class="c"><h3></h3><div class="pr">' + (m ? '<small>from</small>' : '') + '<span></span></div><p></p><div class="a">' +
          '<a class="button button--primary" data-k="' + k + '"></a><button type="button" class="lk" data-k="' + k + '">See what\'s included</button></div></div>';
      });
      sv.innerHTML = h + '</div></div>';
      var cs = sv.querySelectorAll('.c');
      cards.forEach(function (c, k) {
        var m = c.p.match(/^(from)\s*(.*)$/i);
        cs[k].querySelector('h3').textContent = c.t;
        cs[k].querySelector('.pr span').textContent = m ? m[2] : c.p;
        cs[k].querySelector('p').textContent = c.d;
        var b = cs[k].querySelector('a');
        b.setAttribute('href', c.href);
        b.textContent = c.here ? 'Book this service' : 'See ' + c.t;
      });
      sv.addEventListener('click', function (e) {
        var el = e.target.closest('[data-k]');
        if (!el) return;
        var c = cards[+el.getAttribute('data-k')];
        if (el.classList.contains('lk')) { openIncluded(c); return; }
        if (c.here) prefill(c);
      });
      hero.parentNode.insertBefore(sv, hero.nextSibling);
      after = sv;
    }

    // "How it works"
    if (!document.getElementById('r101-steps')) {
      var st = document.createElement('section');
      st.id = 'r101-steps';
      st.innerHTML = '<div class="w container"><p class="eb">How it works</p><h2>' + (BR === 'BMW' ? 'BMW GS' : 'Harley') + ' service in 3 easy steps</h2><div class="g">' +
        '<div class="s"><div class="n">1</div><h3>Tell us your ' + BIKE + '</h3><p>Year, model, mileage and what you need. Call or use the form.</p></div>' +
        '<div class="s"><div class="n">2</div><h3>We confirm your price</h3><p>Clear price up front. No extra parts or labor without your approval.</p></div>' +
        '<div class="s"><div class="n">3</div><h3>Relax while we wrench</h3><p>Grab a free Red Bull or coffee and relax in our Rider Lounge, or ask about a loaner bike.</p></div>' +
        '</div></div>';
      after.parentNode.insertBefore(st, after.nextSibling);
    }

    // "●" bullet lines -> checklists; drop the repeated "Need ...? / Call ..." lines
    secs.forEach(function (s, i) {
      if (i === 0 || !s.classList.contains('hero')) return;
      var d = s.querySelector('.hero__description');
      if (!d || d.querySelector('.r101-done')) return;
      var ps = [].slice.call(d.querySelectorAll('p')).filter(function (p) { return /^\s*●/.test(p.textContent); });
      if (!ps.length) return;
      s.classList.add('r101-hl');
      var ul = document.createElement('ul'); ul.className = 'r101-done';
      ps.forEach(function (p) {
        p.innerHTML.split(/<br\s*\/?>/i).forEach(function (line) {
          var tx = dec(line.replace(/<[^>]+>/g, '')).replace(/^[\s● ]+/, '').trim();
          if (tx) { var li = document.createElement('li'); li.textContent = tx; ul.appendChild(li); }
        });
        p.classList.add('r101-src');
      });
      ps[0].parentNode.insertBefore(ul, ps[0]);
      [].slice.call(d.children).forEach(function (el) {
        var tx = el.textContent.trim();
        if (/^Need .*\?$/i.test(tx) || /^Call \(\d{3}\)/i.test(tx)) el.classList.add('r101-hide');
      });
      // a list section that follows its own photo intro (+ logo strip): show it as the second half of that intro
      var p1 = s.previousElementSibling, p2 = p1 && p1.previousElementSibling;
      var isIntro = function (x) { return x && x.classList.contains('hero') && !x.classList.contains('r101-hide-sec') && x.querySelector('img') && x.querySelector('h1,h2,h3'); };
      var introBefore = isIntro(p1) || (p1 && p1.classList.contains('logos') && isIntro(p2));
      if (introBefore) {
        s.classList.add('r101-tight');
        var hd = d.querySelector('h2,h3'); if (hd) hd.classList.add('r101-hide');
        var bt = s.querySelector('.hero__buttons'); if (bt) bt.classList.add('r101-hide');
        if (p1.classList.contains('logos')) p1.classList.add('r101-tight-logos');
      }
    });

    // the two brand-logo strips -> one row, moved down near the form
    var logos = secs.slice(1, 4).filter(function (s) { return s.classList.contains('logos'); });
    if (logos.length) {
      var row = logos[0], wrap = row.querySelector('.logos__images-wrapper');
      logos.slice(1).forEach(function (l) {
        [].slice.call(l.querySelectorAll('.logos__image-wrapper')).forEach(function (w) { wrap && wrap.appendChild(w); });
        l.classList.add('r101-hide-sec');
      });
      row.classList.add('r101-logorow');
      var anchor = main.querySelector('section.accordion') || form;
      if (anchor && anchor.previousElementSibling && anchor.previousElementSibling.classList.contains('spacer')) anchor = anchor.previousElementSibling;
      if (anchor) anchor.parentNode.insertBefore(row, anchor);
    }
  }

  function openPoster(src, alt) {
    var old = document.getElementById('r101-plb'); if (old) old.remove();
    var d = document.createElement('div');
    d.id = 'r101-plb';
    d.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
    d.querySelector('img').src = src; d.querySelector('img').alt = alt || '';
    var close = function () { d.remove(); document.removeEventListener('keydown', esc); };
    var esc = function (e) { if (e.key === 'Escape') close(); };
    d.addEventListener('click', close);
    document.addEventListener('keydown', esc);
    document.body.appendChild(d);
  }

  /* ---------- WHITE / CREAM RHYTHM ----------
     Rules: (1) photos, photo bands, collection tiles and dark sections are breaks and take no shade;
     (2) tiny strips (<300px) ride with their neighbor; short sections (<480px) never get their own shade;
     (3) the remaining groups alternate, starting with cream after the hero. */
  function rhythm() {
    var main = document.querySelector('main');
    if (!main || document.getElementById('r101-rhythm-css')) return;
    addStyle('r101-rhythm-css',
      'main > section.r101-cream > div,main > section.r101-cream.r101-own{background:var(--r101-soft)!important}' +
      'main > section.r101-white > div,main > section.r101-white.r101-own{background:#fff!important}' +
      'main > section.r101-cream .r101-3steps .s{background:#fff!important}' +
      'main > section.r101-white .r101-3steps .s{background:var(--r101-soft)!important}' +
      'body main > section.r101-cream div.columns__item.columns__item,main > section.r101-cream .r101-card{background:#fff!important}');   // cards flip to white on cream
    var secs = [].slice.call(main.children).filter(function (s) { return s.tagName === 'SECTION' && s.offsetHeight > 0; });
    var isBreak = function (s) {
      if (s.classList.contains('hero')) {                              // a hero is a break only when it actually shows a photo
        var im = [].slice.call(s.querySelectorAll('img')).filter(function (x) { return x.offsetHeight > 0 && !x.closest('.r101-pic'); })[0];
        if (im) return true;
      }
      if (s.classList.contains('collections') || s.classList.contains('contact-form') || s.classList.contains('r101-band') || s.id === 'r101-map') return true;
      var w = s.firstElementChild, bg = w ? getComputedStyle(w).backgroundColor : '';
      if (!bg || /rgba\(0, 0, 0, 0\)|transparent/.test(bg)) bg = getComputedStyle(s).backgroundColor;   // fall back to the section's own color
      var m = bg.match(/\d+/g);
      return !!(m && m.length >= 3 && (+m[0] + +m[1] + +m[2]) < 200 && !(m[3] === '0'));   // dark background
    };
    // tiny (<300px: logo strips, badges, notices) always ride along; short (<500px) joins the group above,
    // or - right after a photo/break - pulls the next section in with it; full sections start a new shade
    var groups = [], cur = null;
    secs.forEach(function (s) {
      if (isBreak(s)) { cur = null; return; }
      var h = s.offsetHeight, tiny = h < 300, short = h < 480;
      if (tiny) {
        if (cur) { cur.push(s); return; }
        cur = [s]; cur.wait = true; groups.push(cur); return;          // waits for the next section to join it
      }
      if (cur && cur.wait) { cur.push(s); cur.wait = false; if (short && cur.length === cur.filter(function (x) { return x.offsetHeight < 300; }).length + 1) cur.take = false; return; }
      if (short) {
        if (cur) { cur.push(s); return; }
        cur = [s]; cur.take = true; groups.push(cur); return;          // first after a break: takes the next section too
      }
      if (cur && cur.take) { cur.push(s); cur.take = false; return; }
      cur = [s]; groups.push(cur);
    });
    groups.forEach(function (g, k) {
      var cls = k % 2 === 0 ? 'r101-cream' : 'r101-white';
      if (g.some(function (s) { return s.classList.contains('accordion'); })) cls = 'r101-cream';   // FAQ is always cream
      g.forEach(function (s) { s.classList.add(cls); if (s.id) s.classList.add('r101-own'); });
    });
  }

  /* ---------- PHOTO BANDS: every call-to-action photo with words on it gets the same (large) height, sitewide ---------- */
  function photoBands() {
    var main = document.querySelector('main');
    if (!main) return;
    addStyle('r101-band-css', 'main section.cta.r101-band .cta__wrapper{min-height:clamp(460px,41.5vw,800px)!important;display:flex!important;align-items:center!important;padding-top:72px!important;padding-bottom:72px!important}' +
      'main section.cta.r101-band .cta__container{width:100%}' +
      '@media (max-width:760px){main section.cta.r101-band .cta__wrapper{min-height:440px!important;padding-top:56px!important;padding-bottom:56px!important}}');
    [].slice.call(main.querySelectorAll('section.cta')).forEach(function (sec) {
      if (sec.parentElement.closest('section') || !sec.querySelector('img') || sec.classList.contains('r101-map')) return;
      if (!((sec.querySelector('h1,h2,h3') || {}).textContent || '').trim()) return;
      sec.classList.add('r101-band');
    });
  }

  /* ---------- PARALLAX: every hero / CTA with a photo AND text on top (image-only ad graphics are skipped) ---------- */
  function parallax() {
    try { if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) {}
    var main = document.querySelector('main');
    if (!main || document.getElementById('r101-plx-css')) return;
    addStyle('r101-plx-css', '.r101-plx{height:150%!important;top:-25%!important;will-change:transform}' +
      '.r101-plx2{position:absolute!important;left:0;right:0;height:150%!important;top:-25%!important;will-change:transform}' +
      '.r101-plx2 picture,.r101-plx2 img{display:block;width:100%!important;height:100%!important;object-fit:cover}');
    var items = [], drift = [];
    [].slice.call(main.querySelectorAll('section.hero, section.cta')).forEach(function (sec) {
      if (sec.parentElement.closest('section') || !sec.querySelector('img')) return;
      var text = (sec.querySelector('h1,h2,h3') || {}).textContent || (sec.querySelector('.hero__description, .cta__text-area') || {}).textContent || '';
      if (!text.trim()) return;                       // image-only ad graphic: leave it alone
      var w = sec.querySelector('.hero__vision-wrapper'), cls = 'r101-plx';
      if (!w) { w = sec.querySelector('.cta__image-wrapper'); cls = 'r101-plx2'; }
      if (!w) return;
      w.classList.add(cls);
      items.push([sec, w]);
      var im = w.querySelector('img');
      if (im) { im.classList.add('r101-drift'); im.style.animationDelay = (-Math.random() * 20).toFixed(1) + 's'; drift.push(im); }
    });
    if (drift.length && 'IntersectionObserver' in window) {
      var dio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('r101-run', e.isIntersecting); }); });
      drift.forEach(function (im) { dio.observe(im); });
    }
    if (!items.length) return;
    var busy = false;
    var upd = function () {
      busy = false;
      var vh = window.innerHeight, k = window.innerWidth <= 760 ? 0.16 : 0.22;
      items.forEach(function (it) {
        var r = it[0].getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || it[0].offsetParent === null) return;
        var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);   // +1 entering .. -1 leaving
        p = Math.max(-1, Math.min(1, p));
        it[1].style.transform = 'translate3d(0,' + (-p * k * r.height).toFixed(1) + 'px,0)';
      });
    };
    window.addEventListener('scroll', function () { if (!busy) { busy = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }

  /* ---------- FAQ ACCORDIONS (any page) ---------- */
  var ACC_CSS = `
main section.accordion .accordion__top{margin-bottom:18px;text-align:left!important;align-items:flex-start!important}
main section.accordion .accordion__description p:empty{display:none!important}
main section.accordion .accordion__container{max-width:1440px!important}
main section.spacer:has(+ section.accordion){display:none!important}
main section.accordion .accordion__wrapper{background:var(--r101-soft)!important}
main section.accordion .accordion__description p{margin:6px 0 0}
main section.accordion .accordion__list{max-width:none!important;width:100%;margin:0;padding:0;list-style:none}
main section.accordion .accordion__item{border:1px solid var(--r101-line)!important;border-radius:14px!important;background:#fff;margin:0 0 8px!important;overflow:hidden;position:relative;transition:border-color .2s,box-shadow .2s}
main section.accordion .accordion__item:hover{border-color:#cfcfcf!important}
main section.accordion .accordion__item:has(.accordion__trigger:checked){border-color:${O}!important;box-shadow:0 6px 18px rgba(0,0,0,.06)}
main section.accordion .accordion__item:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:${O};opacity:0;transition:opacity .2s}
main section.accordion .accordion__item:has(.accordion__trigger:checked):before{opacity:1}
main section.accordion .accordion__item-heading{font:600 clamp(16px,calc(.25vw + 15px),18px)/1.3 Inter,system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important;color:var(--r101-ink)!important;padding:16px 20px!important;gap:16px;align-items:center;justify-content:space-between;cursor:pointer}
main section.accordion .accordion__item-heading svg{flex:0 0 auto;width:12px;height:auto}
main section.accordion .accordion__item-heading svg path{fill:${O}!important}
main section.accordion .accordion__content{padding:0 56px 0 20px!important}
main section.accordion .accordion__content-inner{font:400 16px/1.4 Inter,system-ui,sans-serif!important;color:var(--r101-mute)!important}
main section.accordion .accordion__content-inner p{margin:0!important}
main section.accordion .accordion__content-inner p+p{margin-top:8px!important}
main section.accordion .accordion__content-inner b,main section.accordion .accordion__content-inner strong{color:var(--r101-ink);font-weight:600}
main section.accordion .accordion__content-inner p:empty{display:none!important}
main section.accordion .accordion__content-inner:after{content:"";display:block;height:16px}
@media (max-width:760px){main section.accordion .accordion__item-heading{padding:14px 16px!important}main section.accordion .accordion__content{padding:0 16px!important}}
`;

  function run() {
    try {
      addFont();
      addStyle('r101-global-css', GLOBAL_CSS);
      header();
      menuDrawer();
      footer();
      forms();
      if (document.querySelector('main section.accordion')) addStyle('r101-acc-css', ACC_CSS);
      if (location.pathname === '/' || location.pathname === '') homePage();
      if (/^\/pages\/harley-brake-service\/?$/.test(location.pathname)) brakesPage();
      if (/^\/pages\/san-diego-(harley-service|bmw-gs-service)\/?$/.test(location.pathname)) harleyPage();
      if (/^\/pages\/straight-talk-route-101-motorsports-offers-/.test(location.pathname)) garageStory();
      if (/^\/pages\/contact-us\/?$/.test(location.pathname)) contactPage();
      if (/^\/pages\/about-us\/?$/.test(location.pathname)) aboutPage();
      if (/^\/collections\/[^\/]+\/?$/.test(location.pathname)) collectionHero();
      if (/^\/collections\/?$/.test(location.pathname)) rentalsHub();
      if (/^\/pages\/straight-talk\/?$/.test(location.pathname)) stIndex();
      if (/^\/products\/[^\/]+\/?$/.test(location.pathname)) productPage();
      if (/^\/customers\/login\/?$/.test(location.pathname)) guestCheckout();
      if (/^\/checkouts\/[^\/]+\/success\/?$/.test(location.pathname)) thankYou();
      photoBands();
      rhythm();
      parallax();
      [].slice.call(document.querySelectorAll('main .button--outlined')).forEach(function (b) {
        var m = (getComputedStyle(b).color.match(/\d+/g) || [0, 0, 0]).map(Number);
        b.classList.add((m[0] + m[1] + m[2]) / 3 > 150 ? 'r101-ol-light' : 'r101-ol-dark');
      });
      if (!document.getElementById('r101-lab-badge')) {
        var b = document.createElement('a');
        b.id = 'r101-lab-badge'; b.href = '?lab=0'; b.title = 'Turn lab mode off';
        b.innerHTML = '<b>&#9679;</b> LAB MODE';
        document.body.appendChild(b);
      }
      if (!document.getElementById('r101-call')) {
        var c = document.createElement('a');
        c.id = 'r101-call'; c.href = 'tel:+18885095032'; c.textContent = 'Call now';
        document.body.appendChild(c);
      }
      if (/^\/pages\/motorcycle-tires\/?$/.test(location.pathname)) { loadSpecs(); tiresPage(); carousels(); }
    } catch (e) { if (window.console) console.warn('r101 lab', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
