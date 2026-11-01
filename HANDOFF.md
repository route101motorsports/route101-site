# Route 101 website — working notes (where we left off)

_Last updated: 2026-10-31, end of session._

## How the site is wired
- **Platform:** Booqable website builder (theme `a64592c4-9950-4366-ad2b-a0044b2ce483`).
- **Design layer:** `r101-lab.js` in this repo, delivered by jsDelivr:
  `https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@<commit-id>/r101-lab.js`
- **Booqable loader:** Settings → Checkout → Additional scripts (741 chars). Line 1 must stay
  `Booqable.setupGoogleAnalytics('G-SHPG20B48V', true, false);`. The loader sets `var V = '<commit-id>'`.
  Currently pinned to `dd92c1dab380d0536a0eba888b169c9f1913cf4d` (Nov 1: thank-you card + phone fixes on checkout success; guest-checkout card on sign-in; product pages; tire spec cards; brand logos; collection heroes).
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
DONE (sweep): Harley Service, BMW GS Service, Tires, Home, Brakes, collection heroes verified PC + phone.
DONE: collection product cards restyled (all collection pages): white rounded cards, "Rent A" dropped from display titles (product names untouched), orange price, "View & book ->" / "View details ->".
DONE: Straight Talk index (stIndex): one "Latest from Route 101" grid of the 10 live articles (category as tag, first card featured), then "More Straight Talk on the way" list of the 9 unwritten ones (their Read more links looped to /pages/straight-talk or /). Original category sections hidden.
DONE: Straight Talk articles + press release (article()): eyebrow, chapter heroes cut to ~420px (photo-only 380px), 820px reading column at 17px, author card from the "logos" bio section (Meet the Author / Author / Interviewer), share buttons as pills, "More Straight Talk" link. Press release: smaller logo, tighter spacing.
Unwritten articles (for Glenn): Mastering the Curves; Perfect Your Passing; Riding Mastery; Group Riding; Ride the Legend (Route 101); Desert Heat & Iron Beasts (Anza-Borrego); Route 66; Ride to the Rim (Grand Canyon); Tires & Tire Changes.
DONE: Twysted Throttle checked (typo "Poudly" in a heading, content). Privacy (privacyPage): no "Shop our products" button, 860px column. Footer landing pages checked; BMW landing hero headline was dark-on-dark (Booqable color-set-1) -> landingPage() forces white.
Link check by real server status (54 internal links from header/menu/footer): all 200 except footer "Motorcycle Rental Delivery" -> /products/rental-delivery = 404 (Booqable's 404 page title has no "404"; check body text "took a wrong turn").
Sweep status: header, menu drawer, footer all covered.

## NEXT (agreed Nov 1, waiting on Glenn's go): Straight Talk article rebuild
Glenn's direction: author bubble full width; text sections full width like the rest of the site; image sections back to the site's standard large photo-band spec; single overlay at the standard 72-75% (my extra .72 gradient on chapter heroes doubled it, so remove it); convert photo + text pairs into split rows (photo one side, text the other, alternating, slide-in, stacked on phone), like the garage Straight Talk page. First hero stays full size.
Standard Glenn author bio (use on every article he wrote; "six decades", not "55 years", so it never needs updating):
"Glenn Cogan is the founder and CEO of Route 101 Motorsports in Carlsbad. He started riding at age 4, spent a decade racing motocross and 750GP, and is a lifelong rider, racer and motorcycle mechanic. Self-employed since 16, he brings 35+ years of business and brand-building experience and six decades of riding across dirt, street and track to every Route 101 article — and every ride."
The 9 unwritten articles: Glenn will have ChatGPT "G" draft them in his voice; Claude to write G a one-page brief when asked.

## Review logo row (Nov 1, lab)
img/reviews/: Google, Yelp, Tripadvisor, Facebook (square f + "acebook"), each with 5 deep-gold stars; full 600x240 canvas, tight-, and -nostars versions; built by img/reviews/make.py from Glenn's files.
reviewRow(): any logos section whose image is wider than 8:1 (the old flat review strip on home + 3 footer landing pages) gets the code-built row: claim "5 Years in Business · 100s of 100% 5-Star Reviews!", 4 separate linked logos (new tab), alt text, 72px desktop / 60px tablet / 2x2 grid at 62px on phone; per-logo --k balance (Facebook .8, Tripadvisor .96). Links in REVIEWS array (Google maps search, Yelp, Tripadvisor, Facebook /reviews).
Kayak badge deleted from the Home template Logos section (published). Delivery link removed from Rental Add Ons menu. Twysted "Proudly" fixed.
Pin tip: jsDelivr can lag on a brand-new commit; fetch the new r101-lab.js URL in the browser until it returns 200 before saving the new ID in the loader box (curl from the workspace is blocked).
Tires page brand row (Nov 1, lab): #r101-tbrands right under the hero, claim "Top-brand motorcycle tires, mounted & balanced in-house.", the 8 tight brand logos (balanced by TIRE_LOGOS widths x --s: .34 desktop, .28 tablet, .27 phone), 4x2 grid desktop, 2x4 phone; each logo smooth-scrolls to its brand section (#brand-<slug>), landing just under the sticky "Jump to" bar. The sticky "Jump to" bar was kept (it follows you down the page and highlights the current brand).
Service page logo bands (Nov 1, lab): serviceLogos() swaps Booqable logo-band images by file name: "TireBrands" -> 5 tire logos (Dunlop, Bridgestone, Metzeler, Michelin, Pirelli; each links to /pages/motorcycle-tires#brand-<slug>, which tiresPage() now honors on arrival); "iCarSoftMTProLogoBand" -> tight-icarsoft; "HEXGS911LogoBand" -> tight-gs911. 5-across desktop, 3 tablet, 2-col phone (odd last centered).
reviewRow() now matches ONLY the review strip file ("5starreviewsicon..."). An earlier aspect-ratio rule wrongly replaced service-page strips for ~30 min; fixed.
Still old Booqable images: parts strips "ServiceBrandsHarley(II)" (Harley service + brakes) and "ServiceBrands(II)" (BMW service). Have logos for harley, amsoil, kn, ebc, brembo, vance, denali; missing NGK, Ohlins, Screamin' Eagle, Touratech, BMW (need files from Glenn).
Harley Service brands band (Nov 1, lab): partsBand() adds #r101-pbrands right under the hero: eyebrow "Proudly using these top brands & more..." + our logos Harley-Davidson, Screamin' Eagle, AMSOIL, Motul, K&N, EBC, Brembo, Vance & Hines (PB_LOGOS). One row desktop, 4+3 tablet, 2-col phone (last centered). The old parts strip lower on the page is still Booqable's image.
Screamin' Eagle logo added to img/brands (outer black removed, thin dark outline so the white eagle reads on cream). LOGO_BASE now pinned to 881684a7 (has all brand files).
Harley brands band now 9 logos (added NGK after K&N; NGK added to img/brands), label "Proud to use these top brands" (Glenn). LOGO_BASE pinned to 1f8fe9a6.
Pin tip 2: when LOGO_BASE (or any asset base) moves to a new commit, warm EVERY file under it in the browser (fetch each tight-*.png until 200) before pinning. On Nov 1 the GS-911 logo failed once because the page asked the CDN for the new folder before it was ready; a reload fixed it.
Ohlins and BMW M logos added to img/brands (commit 16b1f5f2; all 22 tight logos verified loading from that commit). Not placed on any page yet. LOGO_BASE in r101-lab.js still points at 1f8fe9a6 — move it to 16b1f5f2 (or later) when these get used.
Harley brands band: Glenn's order AMSOIL, K&N, EBC, Brembo, (Ohlins), Motul, NGK, Harley-Davidson, Screamin' Eagle, Vance & Hines (10 logos, one desktop row). HIDDEN ON PHONES (Glenn, Nov 1): parts-brand logos don't earn the space on a phone; tire logos and the iCarsoft/GS-911 logos still show on phones. LOGO_BASE now 16b1f5f2.
Service-page tire band now shows all 8 brands (same order as Tires page): one row desktop, 4x2 tablet, 2-col phone; each links to its brand on the Tires page.
Harley Service: old "ServiceBrandsHarley(II)" parts strip above the FAQs is hidden by partsBand() (Glenn: top band is enough). Brakes page and BMW page still show their old parts strips.
Harley Brakes page now gets the same partsBand() as Harley Service (band under hero, hidden on phones, old ServiceBrandsHarley strip hidden). Only the BMW GS Service page still shows an old parts strip ("ServiceBrands(II)").
BMW GS Service brand band (Nov 1): partsBand() now runs on Harley Service, Harley Brakes and BMW GS Service. BMW list PB_LOGOS_BMW = same order with BMW + Denali in place of Harley-Davidson + Screamin' Eagle. Old "ServiceBrands*" strips hidden on all three. Desktop row is nowrap (logos shrink to fit); hidden on phones.
Pin tip 3: warm the new r101-lab.js with a NORMAL fetch (not cache:'no-store') from a route101motorsports.com tab; that way the page's own script request is served from cache. With no-store warming, the first real page load twice failed to start the script.
FAQ added (live, Booqable content, Nov 1) on Harley Service + BMW GS Service: "Can I get a tire change while I wait or same day?" / "In most cases, yes! Fill out the form below or give us a call with your bike's year and model, and we'll get your tire install scheduled." Sits LAST in each FAQ list; Glenn to drag it to 2nd (builder drag can't be automated).
Booqable template names are swapped: Harley Service page uses template "page.bmw-gs-5k-50k-service-tires.json"; BMW GS Service page uses "page.san-diego-harley-service.json". Edit via Pages > (page) > "Edit template in website builder" to land on the right one.

## Straight Talk article v2 (Nov 1, IN REVIEW on Hidden Costs only)
article2() runs when ART2_PAGES matches (currently only the-hidden-costs-of-motorcycle-rentals). When Glenn signs off, widen ART2_PAGES to all articles.
- Full-size first hero (theme height ~857, single .72 overlay, sitewide zoom drift).
- Photo-only hero + following text section -> one split row (.r101-srow): photo one side (keeps its own shape, no crop), text other side, alternating, slides in on scroll (IntersectionObserver), drift zoom while on screen. Stacks on phone (photo first).
- Text + author card at the site's standard 1440 container. Glenn's standard bio (GLENN_BIO) replaces his author text.
- "N min read" after the date; thin orange reading-progress bar under the header.
- Closing dark CTA card (See bikes & prices / Call) + "More Straight Talk" (3 live articles fetched from the index, current one excluded).
- deDash(): Straight Talk articles only; headings " — " -> "... ", body -> ", ". Reviews never touched. (Page <title> tags still contain em dashes: Booqable SEO fields, fix there.)
Not yet handled in v2: articles whose inner heroes carry text (chapter banners) — decide pairing with Glenn when widening.
