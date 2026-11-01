# Route 101 website — working notes (where we left off)

_Last updated: 2026-10-31, end of session._

## How the site is wired
- **Platform:** Booqable website builder (theme `a64592c4-9950-4366-ad2b-a0044b2ce483`).
- **Design layer:** `r101-lab.js` in this repo, delivered by jsDelivr:
  `https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@<commit-id>/r101-lab.js`
- **Booqable loader:** Settings → Checkout → Additional scripts (741 chars). Line 1 must stay
  `Booqable.setupGoogleAnalytics('G-SHPG20B48V', true, false);`. The loader sets `var V = '<commit-id>'`.
  Currently pinned to `628bd01d57e36f6ac090917d169b8fd5c872ddea` (Nov 1: thank-you card + phone fixes on checkout success; guest-checkout card on sign-in; product pages; tire spec cards; brand logos; collection heroes).
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

## DONE (lab): per-collection heroes — all 11
Full fleet + all (sunset photo), Harley (group ride), BMW GS (three GS riders), Harley tours (highway rider), GS tours (two GS on the coast), gear & add-ons (city rider), Harley add-ons (highway), dual sport add-ons (GS group), roadside (BrokenDownHarley photo), merch (Pacific Beach pier). Copy uses only facts from the product pages (tours: 100–200 mi, San Diego native guide, 1-day rental included; RiderSHIELD from $19/day; ProtectionONE/PLUS cover flat tires, towing, mechanical failure). Config lives in `CHERO` in r101-lab.js. Button 1 = SEE BIKES & PRICES (scrolls to the grid, #r101-grid); button 2 = CALL. Overlay re-added via CSS (theme gradient, .72).
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

## Brand logos
Matched set of 18 brand logos in `img/brands/` (600x240 canvas PNGs + `tight-*.png` trimmed versions). Tires page section headings use the tight versions (TIRE_LOGOS map in r101-lab.js); brand name kept as visually hidden text for SEO. Saving tip: if the Booqable Save click doesn't stick, click the form's own Save button via JS (`.ace_editor` closest form).

## Tire spec cards (tires page)
Each tire pop-up has a SEE TIRE SPECS button that slides in a spec card: brand logo, model, category tag, own-words synopsis, table (Best for · Construction · Compound · Tread · Mileage* · Speed rating* · Terrain (off-road only) · Sizes; *only when the brand publishes it), GET A QUOTE (pre-fills the quote form with the tire name) and CALL, plus a small manufacturer link. Background = that tire's photo, grayscale, 12%.
Data: `data/tire-specs.json`, keyed by slug of the tile's alt name (e.g. `dunlop-elite-4`); sources in `data/tire-specs-sources.json`. SPECS_URL in r101-lab.js is pinned to a commit — bump it when the data changes.
Done: all 8 brands, 69 tires. Tile names misspelled in Booqable: "Excedra" (Exedra), "Cruisetac" (Cruisetec) — cards show the correct spelling. Glenn's rules: no "Made in" / "Wear check" rows; include Compound.

## Product pages (done, lab)
One shared Booqable Product template. productPage(): eyebrow, smaller title, booking card drawn AROUND Booqable's bq-* widgets (moving them breaks their styling, so never move them), trust chips, description moved below, add-on rows labeled; Harley pages hide GS gear row, BMW pages hide Harley gear row.

## Cart & checkout
Cart is Booqable's own pop-out widget (left as-is). Checkout runs on our domain (/checkouts/<id>) and is Booqable's clean standard form. Before it, /customers/login?redirect_uri=/checkouts/<id> shows sign-in; guestCheckout() adds a big 'Continue as guest' card on top (link = redirect_uri + force_guest_checkout=true). Account creation is optional (Glenn's setting). Possible later: small reassurance box on the checkout summary (deposit is a refundable hold; call number).
Checkout success (/checkouts/<id>/success): thankYou() rebuilds the card in Glenn's words: "Thank you for booking!", booking number, confirmation email from rental@ (check spam), contact (tel + address, tappable), "See you <weekday, month day at time>!" pulled from the booking's start date, signed Route 101 Motorsports / Go. Just go., Back to website.
End-to-end test Nov 1: free helmet (size M) booked as guest → booking #451, $0, no payment step. "Must Choose One" protection isn't enforced (Glenn: fine). Glenn to cancel #451.
Phone check Nov 1 (390px frames): thank-you card top gap removed, pick-up line waits for the booking dates and keeps the time together, product-page eyebrow given room under the thumbnails. Tip: Chrome window resize may not take; test phone width by loading pages in 390px iframes on the same site.

## Final sweep (started Nov 1)
Glenn's method: every clickable link (header, menu drawer, footer), left to right, PC + phone; finish any unfinished page before moving on.
Automated pass: 53 internal pages all load, lab styling runs on all, no sideways scroll on phone, no broken images.
Not yet given page treatment: Straight Talk index, 11 Straight Talk articles, press release, Twysted Throttle, Privacy Policy, 3 footer landing pages (san-diego-harley-rentals, san-diego-bmw-adventure-bike-rentals, motorcycle-rentals-san-diego), /products/rental-delivery (no title).
DONE: Rentals hub (/collections) via rentalsHub(): standard hero + groups Rent a motorcycle / Guided tours / Gear, protection & merch (cards use each collection's hero photo). Fixes BMW GS being on page 2 of Booqable's index.
Testing tip: NEVER put ?lab=0 in a same-site iframe or test URL; localStorage is shared, so it switches lab off for the whole browser and the next frames load plain Booqable.
