# route101-site

Design layer for [route101motorsports.com](https://www.route101motorsports.com) (Booqable).

- `r101-lab.js` — all custom styling and page enhancements.
- Loaded by a short loader in Booqable → Settings → Checkout → Additional scripts, via jsDelivr:
  `https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@<tag>/r101-lab.js`
- Each release is a git tag (v1, v2, …). To roll back, point the loader at an earlier tag.
- Lab gate: `?lab=1` turns the new design on for a device, `?lab=0` turns it off.
