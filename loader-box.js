Booqable.setupGoogleAnalytics('G-SHPG20B48V', true, false);

/* Route 101 design layer: the code lives on GitHub (route101motorsports/route101-site),
   delivered by jsDelivr. To update or roll back, change the commit ID after the @. */
(function () {
  var V = '5aa9fe237c8c13ec3f36c939f5c88441df4a3d29';
  try {
    var q = location.search;
    if (/[?&]lab=1\b/.test(q)) localStorage.setItem('r101lab', '1');
    if (/[?&]lab=0\b/.test(q)) localStorage.removeItem('r101lab');
    if (localStorage.getItem('r101lab') !== '1') return;
  } catch (e) { return; }
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@' + V + '/r101-lab.js';
  document.head.appendChild(s);
})();
