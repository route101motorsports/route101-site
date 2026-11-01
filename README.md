# route101-site

Design layer for [route101motorsports.com](https://www.route101motorsports.com) (Booqable).

- `r101-lab.js` — all custom styling and page enhancements.
- Loaded by a short loader in Booqable → Settings → Checkout → Additional scripts, via jsDelivr:
  `https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@<commit-id>/r101-lab.js`
- The loader pins an exact commit ID, so each update shows immediately. To roll back, put an earlier commit ID back in the loader.
- Lab gate: `?lab=1` turns the new design on for a device, `?lab=0` turns it off.
