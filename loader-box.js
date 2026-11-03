Booqable.setupGoogleAnalytics('G-SHPG20B48V', true, false);

/* Route 101 design layer: the code lives on GitHub (route101motorsports/route101-site).
   Main copy from jsDelivr; if it fails or hasn't run after 4s, a backup copy loads from githack.
   To update or roll back, change the commit ID in var V. */
(function () {
  var V = '768deb5eb8b98c7438b4c1930432a2d235fad8d1', P = '/route101motorsports/route101-site', F = '/r101-lab.js', b = 0;
  function L(u) { var s = document.createElement('script'); s.src = u; s.onerror = B; document.head.appendChild(s); }
  function B() { if (b || window.__r101loaded) return; b = 1; L('https://rawcdn.githack.com' + P + '/' + V + F); }
  L('https://cdn.jsdelivr.net/gh' + P + '@' + V + F);
  setTimeout(B, 4000);
})();
