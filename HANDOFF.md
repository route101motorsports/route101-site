# Route 101 website — working notes (where we left off)

_Last updated: 2026-10-31, end of session._

## How the site is wired
- **Platform:** Booqable website builder (theme `a64592c4-9950-4366-ad2b-a0044b2ce483`).
- **Design layer:** `r101-lab.js` in this repo, delivered by jsDelivr:
  `https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@<commit-id>/r101-lab.js`
- **Booqable loader:** Settings → Checkout → Additional scripts (741 chars). Line 1 must stay
  `Booqable.setupGoogleAnalytics('G-SHPG20B48V', true, false);`. The loader sets `var V = '<commit-id>'`.
  Currently pinned to `3bb4bc61e4394220135c81368c54c08c697a2223` (Nov 1: collection heroes for full fleet/all, Harley, BMW GS; sitewide drift + button hover).
- **Lab gate:** `?lab=1` turns the new design on for a device, `?lab=0` off (localStorage `r101lab`).
  The loader only fetches the script for lab devices. Launch day = remove the gate lines from the loader.

## Update workflow
1. Edit `r101-lab.js`, `node --check r101-lab.js`, commit, `git push origin main`.
   (Tag pushes and repo-settings API calls are blocked from Claude sessions — pin by commit ID.)
2. In the Additional scripts box, change `V` to the new commit ID, Save, reload, verify.
3. Roll back = put an earlier commit ID back.

## Pages done (lab design + published content)
Home, Straight Talk garage page, Contact (real Google map), Tires, About Us
(staggered tiles, Why Choose band, reviews link fixed, SEO title/description tidied).
Sitewide: white/cream rhythm engine, uniform photo bands, footer email/hours.

## Today's extra changes (live)
- About Us page SEO: title "About Us | Family-Owned in Carlsbad Since 2022", 158-char description.
- About Us buttons: "Read Our 5-Star Reviews" (clean Google Maps link, new tab), "Explore Guided Tours".
- Footer "Motorcycle Rentals" menu: Heritage labels shortened to "Harley FLHCS Softail" (x2) and
  "Harley FLSTC Softail"; Harleys grouped first, then BMWs.

## IN PROGRESS: per-collection heroes
**Done (lab):** route-rental-fleet + all (keeps sunset photo), motorcycle-rentals (Harley group-ride photo), explore-our-bmw-gs-rental-fleet (three GS riders photo). Config lives in `CHERO` in r101-lab.js. Button 1 = SEE BIKES & PRICES (scrolls to the grid, #r101-grid); button 2 = CALL. Overlay re-added via CSS (theme gradient, .72).
**Harley collection SEO fixed (live):** title "Harley-Davidson Rentals San Diego | Street Glide & Softail", 152-char description (no Indian/Aprilia).
**Note:** each collection's Settings tab also has a "Description on collection page" field (currently empty) — possible native, SEO-friendly text later.

**Finding:** Booqable has ONE "Collection" template. All 11 collection pages share the same hero
(sunset photo, "San Diego Motorcycle Rentals, Free Riding Gear and Guided Motorcycle Tours", buttons
"DON'T FORGET TO ADD FREE RIDING GEAR!" / "CALL FOR RENTAL | SERVICE | TIRE INFO") plus the
"Advance Booking Required." text line. Custom templates can only be made for regular pages.

**Plan agreed:** the code swaps each collection's hero by URL from a lookup table
(path → photo, headline, paragraph, buttons, notice). Unlisted collections keep the shared hero.
Standard hero settings: black overlay 72–75%, no transitions, site button style.

**Collections:** route-rental-fleet, all, motorcycle-rentals (Harley), explore-our-bmw-gs-rental-fleet,
motorcycle-tours (harley-tours redirects here), book-a-bmw-gs-adventure-tour, gear-and-rental-add-ons,
harley-add-ons, dual-sport-add-ons, roadside-add-ons, route-101-merch.

**Draft hero copy** (awaiting Glenn's markup):
1. Full fleet / all — "The Route 101 Rental Fleet" — Harley touring and cruisers plus BMW GS adventure bikes; free riding gear; $500 deposit, never more.
2. Harley — "Harley-Davidson Rentals in San Diego" — Street Glide and Heritage Softail, maintained in-house; free Venom helmet, H-D leather jacket and gloves.
3. BMW GS — "BMW GS Adventure Rentals" — R 1250 GS, R 1200 GS and GS Adventure; pavement, dirt and between; side cases and top box available.
4. Harley tours — "Guided Harley Tours of SoCal" (inclusions to confirm).
5. GS tours — "BMW GS Adventure Tours" (inclusions to confirm).
6. Gear & add-ons — "Free Riding Gear & Rental Add-Ons".
7. Harley add-ons — "Harley Rental Add-Ons".
8. Dual sport add-ons — "Adventure & Dual Sport Add-Ons".
9. Roadside add-ons — "Roadside Protection" (details to confirm).
10. Merch — "Route 101 Merch" — "Wear the shield. Go. Just go."
Buttons default: Check Availability & Prices · Call (888) 509-5032.

**Open questions for Glenn:** tour inclusions; roadside/merch details; hero photos (pick from
Booqable library unless he has favorites).

**Also flagged on these pages (not yet done):**
- Harley collection's Google title/description says "Harley, BMW, Indian & Aprilia" — rewrite (Aprilia never rented, sold).
- Insurance/protection tiles mixed into bike grids → separate "Protect your ride" strip (display only).
- Card restyle + shorter display titles (strip "Rent A" visually; product names untouched).
- Footer BMW labels: three say "BMW R 1200GS Adventure Bike" but two are GSAs (suggested relabel, not approved yet).

## Remaining backlog
Collections (above) → 9 Straight Talk articles → blog index → product, cart, checkout pages.
Launch-day gate flip. Uniform brand logo lineup (awaiting files). "recieved" typo in tire form success message.
