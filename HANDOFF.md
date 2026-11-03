# Route 101 website — working notes (where we left off)

_Last updated: 2026-10-31, end of session._

## How the site is wired
- **Platform:** Booqable website builder (theme `a64592c4-9950-4366-ad2b-a0044b2ce483`).
- **Design layer:** `r101-lab.js` in this repo, delivered by jsDelivr:
  `https://cdn.jsdelivr.net/gh/route101motorsports/route101-site@<commit-id>/r101-lab.js`
- **Booqable loader:** Settings → Checkout → Additional scripts (763 chars since Nov 3 5am; copy in loader-box.js). Main copy from jsDelivr, backup from rawcdn.githack.com if the main copy errors or has not run after 4s; r101-lab.js has a run-once guard (window.__r101loaded). Line 1 must stay
  `Booqable.setupGoogleAnalytics('G-SHPG20B48V', true, false);`. The loader sets `var V = '<commit-id>'`.
  Currently pinned to `2266228454a789ef6c761c37d1e7cc3c604dd617` (Nov 1: garage story page rows slide in like the articles; Straight Talk article v2 on every article; everything before it).
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
Hidden Costs article (Booqable template "page.articles-indiidual.json", unique to this article): Spacer (divider under author) and Columns (share links) sections DELETED and published, Nov 1 (Glenn). Do the same on every other article when we roll v2 out: delete the divider Spacer under the author box and any section holding share links.
Article v2 ROLLED OUT (Nov 1): all 11 Straight Talk pages checked on PC (1280) and phone (390): split rows render, 0 em dashes, no sideways scroll, end CTA + "More Straight Talk" present. Divider Spacer + share Columns deleted and published in Booqable on every article (Protect Yourself, Peer-to-Peer, Google vs, Prices Soar, Founder, Riding Fundamentals, Revving, Human-AI [divider only]; Hidden Costs earlier; Oil Change and the "Offers Service" page never had them). Live check: 0 dividers, 0 share sections across all 11.
The "Route 101 Motorsports Offers... Service" page (straight-talk-route-101-motorsports-offers-...) is a service overview, not an article: article2 leaves it alone (0 rows) and it already uses the split photo/text layout (garageStory()). Nov 1: its 3 split rows (Harley, BMW GS, Tires) now slide in and replay on scroll like the articles, with photo drift.
Builder tip: JS .click() on the builder sidebar and "Delete section" does NOT work. Use real clicks: JS scrollIntoView the item and read its rect (scale x 1568/innerWidth), click it, scroll the panel down, zoom to confirm the panel title, then click "Delete section" (about 62,707 in a 1568x726 frame). Always confirm the panel title first (one click once landed on a Hero).

## LAUNCH: LIVE Nov 1, 2026 ~12:25pm PT (Glenn's go)
- Loader now 485 chars, no lab gate, pinned to ee2b278. Every visitor gets the design. Verified with a fresh visitor (no lab flag) on PC and phone: home, collections, Street Glide S product, Harley/BMW/brake service, tires, Straight Talk hub + article, about, contact-us: design on, no badge, no sideways scroll.
- From here on, pin updates go straight to the public site; test in a branch commit first if risky.
- NEXT: exit-intent mailing-list pop-up (Brevo form + Booqable coupon); Glenn deciding discount.

(Original prep notes below.)
- Launch build: `ee2b2787078ea2e78a8fe433e73a4cb85a211f2c` (CDN warmed). Same as the pinned 4687ee0 but with no lab gate and no LAB MODE badge.
- The switch, in the Booqable loader (Settings > Checkout > Additional scripts):
  1. Set `var V` to the launch build.
  2. Delete the `try { ... }` lab-gate block, so the script tag loads for every visitor.
  Keep the Google Analytics line as is.
- Rollback: put the gate block back, or point V at an older commit.
- After the switch: run a first-visitor pass in a fresh profile (no lab flag) on PC and phone, covering home, rentals, a bike page, checkout start, service pages, tires, Straight Talk and contact.

## Mailing-list pop-up (LIVE Nov 1 ~1:15pm PT; test build was 0386d27)
- exitPopup() in r101-lab.js. PROMO {code, expires, pct} + POP_LIVE flag at the top of the block. POP_LIVE=false: shows only on devices that visited ?popup=test (?popup=off clears, ?popup=show forces it open).
- PC: exit intent (mouse to the top edge after 4s). Phone (<=860 or touch): bottom sheet after a deep scroll then a quick upward scroll. Close = 7-day snooze (localStorage r101popSnooze). Sign-up = never again (r101popDone). Skips /cart, /checkout(s), /customers, /orders, /account.
- Submits by posting a hidden form into a hidden iframe to the Brevo form "Website Pop-up Sign-up (Promo Code)" (sibforms serve URL in BREVO_ACTION). Fields: FIRSTNAME, LASTNAME (name box split on first space), EMAIL, SMS + SMS__COUNTRY_CODE=+1 (only if 10 digits), honeypot "website". The response can't be read, so the success screen shows on submit.
- Brevo: list "Website Sign-ups (Pop-up)" (#5); form uses Simple confirmation with template #7 "Website Pop-up Promo Code (02ROUTE26)" from garage@; disposable emails blocked; no reCAPTCHA (custom pop-up); no owner alert (Glenn checks the list himself).
- Booqable coupon 02ROUTE26 = 10%, no dates (plan limit). MONTHLY on the 1st: Glenn makes the new code (secret pattern, never write it down publicly); Claude updates PROMO here AND the Brevo template #7 (code + expiry + name), then re-pins. On the 15th Glenn turns off last month's code. Two scheduled reminders exist (1st 9:47am, 15th 10:23am PT).
- To launch: set POP_LIVE = true, commit, warm, pin.
- Nov 1: text-consent checkbox added (pin dcc34c4). Appears only after a phone number is typed; unticked by default. Wording approved by Glenn: "Text me deals and updates. By checking, I agree to receive occasional marketing texts from Route 101 Motorsports at this number (no more than 4 per month). Consent isn't required to purchase. We will never sell your contact info. Msg & data rates may apply. Reply STOP to opt out, HELP for help." Ticked -> sends TEXT_OPTIN=1 (Brevo boolean attribute TEXT_OPTIN, on the form as a Checkbox block). Brevo marks anyone with a phone "SMS subscribed", so ONLY ever text a segment where TEXT_OPTIN = true. Email template #7 buttons rebuilt Outlook-safe (bgcolor on td).

## Load flash (Nov 1)
- Booqable only lets our loader run at the END of the body (Checkout > Additional scripts), so the native theme paints first (~1.7s) before our design (~2.0s on a first visit; near-instant once cached). No head-code slot, no custom CSS, no theme code editing on this plan. The announcement bar strips <style> tags but KEEPS the CSS text (it showed as visible text for ~3 min, reverted). Don't try that again.
- Mitigation instead: make the native first paint match. Top bar color scheme set to Set 4 (dark); header was already Set 4. Tried header "Use transparent background" OFF: Glenn saw a big charcoal block on load, so it's back ON (transparent). Final: top bar Set 4, header Set 4 + transparent.
- (A headGap() fix for the solid-header white strip existed briefly in 136c9ef; removed when the header went back to transparent.)
- boot() also adds html.r101-ready once the design has applied (unused for now; it would let a head-level anti-flash rule work if Booqable ever allows head code).
- Best remaining fix: ask Booqable support whether head code is available on any plan.

## Form buttons / in-page jumps (Nov 1, pin 7c3a91d)
- Bug (Glenn): "Submit Harley service request" landed at the footer. The Booqable buttons use full URLs with a trailing slash (/pages/x/#contact-form), so the browser RELOADED the page and jumped before our layout and lazy images settled.
- anchors() in boot(): rewrites same-page links (any path +/- trailing slash) to pure #hash; one document click handler smooth-scrolls to the target, offset below the header at its tallest (hbNow() measures the visible header bar = descendants of #header with top<45 and bottom<200, which skips the off-canvas menu; hbMax is learned at load and resize while scrollY<5, because the header re-grows with the top bar on any upward scroll), then re-aims after scrollend or 1.1s, and again 0.5s later, since lazy images push the target down. Arriving with a hash re-aims at 0, 350, 1200ms and on load, unless the visitor has already scrolled.
- Test results before the last two tweaks: Harley brakes 5/5 and tires 11/11 OK; Harley service OK visually; BMW landed ~16px under the full-height header (the hbMax fix, 7c3a91d, addresses that; not yet re-verified because Chrome disconnected).
- STILL TO VERIFY: BMW, Harley service, brakes, tires, contact-us, garage story page, phone width, and arriving from another page with #contact-form.

## Google Ads, approved Nov 1 (NOT yet done)
1) Remove the duplicate "Calls from ads" conversion (two exist: Count=One and Count=Every; keep one, 60s).
2) Website call-tap tracking: GA event on tel: link taps -> GA key event -> import to Ads.
3) Check the GA quote_form_submit rule still matches the redesigned forms + one test submit marked "TEST – ignore".
4) Add negatives to Harley Tires: atv, utv, golf cart, lawn mower, trailer, wheelbarrow, pit bike, minibike.
5) Add Brakes phrase keywords: "harley brake job", "harley brakes".
- Review status: $171 all-time, 50 clicks, 0 tracked conversions; since the restructure (Oct 29 on): $84, 25 clicks, $3.37 CPC. Call reporting ON (forwarding number on the 858 call asset), call recording ON. 85 negatives already in place. Next review at ~$250-300 total spend.

## Google Ads changes, Nov 1 2026 (approved by Glenn)
- (a) "Calls from ads (1)" (counted Every) set to Secondary. "Calls from ads" (One, 60s) is the only primary call conversion.
- (b) Site pin 104e205: every tel: link tap fires GA4 `phone_call_click` (to G-SHPG20B48V, G-43JHYBLPZB, G-5SZV1SH4NH). Still to do (scheduled for Nov 2): star it as a key event in GA4 once it shows in Recent events, then import it into Ads as Secondary.
- (c) GA4 quote_form_submit = form_submit where form_id contains "contact". The live service forms have id="contact", so it matches, and form_submit/quote_form_submit show in Recent events. Test submit skipped (forms use reCAPTCHA; the rule is already proven).
- (d) Harley Tires negatives added: atv, utv, golf cart, lawn mower, trailer, wheelbarrow, pit bike, minibike (93 total).
- (e) Harley Brakes phrase keywords added: "harley brakes" (under review), "harley brake job" (low search volume).
- Anchor fix (pin 7c3a91d) verified on all service pages, PC + phone.

## Site search (LIVE Nov 2 2026)
- Booqable's /search only finds products. `siteSearch()` adds a "Pages & services" block on /search from `SPAGES` (32 pages) + `STOPICS` (topic word lists: brakes, oil, service, quote, tires, gear, rentals, Harley models, Harley/BMW brand, tours, insurance, license, tips, contact, PB, merch, blog, about, p2p, fees).
- Scoring: exact word/phrase = 3, partial (still typing) = 1.2, one-letter typo on 6+ letter words = 1.5; topic position weight; brand bonus (Harley vs BMW) ±1.5; page title words +1.2; results keep only scores >= 40% of top, max 6.
- No pages and no products -> "No exact match" + 6 main pages + Call/Quote buttons.
- GA events: site_search, search_no_results (search_term, page_matches, product_matches), search_page_click.
- Gate: `SRCH_LIVE = false`. A browser opens `?srch=test` once (localStorage r101srch=1) to see it; `?srch=off` clears. Go live = set SRCH_LIVE true, push, pin.
- New page added to the site -> add it to SPAGES (+ topic words if needed).

## Nov 2 2026 morning session (live)
- Builder template names are swapped/odd: Harley Service page = template "Bmw gs 5k 50k service tires" (page.bmw-gs-5k-50k-service-tires.json); BMW GS page = template "San diego harley service" (page.san-diego-harley-service.json); Brakes = "Harley brake service". Open directly with ?template=<file> on the theme URL.
- Builder text editing: RedactorX instance -> app.editor.setContent({html}) WITHOUT the last character, then a real keystroke typing that character, so the builder registers the change. Two preview iframes swap; read iframe.preview.active.
- Hours everywhere: Open 7 days, 8am–6pm, by appointment (service FAQs fixed).
- Homepage FAQs rewritten 11 -> 9 (FAQ-HOME-2026-11-02.md). FAQ cards black sitewide. FAQ intro gap 24px.
- Footer: empty payment-icon box hidden; PC top 64 / bottom 48; phone bottom 80 (Call now button).
- Service pages: #r101-svc padding 40/24, #r101-steps top 40; diagnostics blocks 48px + tagline "Dealership-level diagnostics at local shop prices" (iCarsoft + GS-911).
- Lesson: a python replace of a repeated code pattern hit the wrong function (reviewRow) and broke pages ~5 min. Always check uniqueness (count==1) before replacing.

## Rental landing pages + price chart (Nov 2, ~7:15-8:00am)
- landingPage() now: body.r101-land; reuses HOME_CSS product/testimonial rules (body.r101-home -> body.r101-land); products__tag (star lines) -> one eyebrow line; add-on section (.r101-addons, h2 contains "Add-Ons") photos object-fit:contain; $0.00 prices hidden (price lives in bq-product-price shadowRoot); step 3 "Book Your Rental" gets "Select your dates & book" (LAND_FLEET per page) + Call buttons. Pacific Beach added to landing pages.
- priceChart(): PRICE_DATA (read off May 2025 audit image) drawn as SVG, hover/tap tooltip, draw-in, 3 savings stats; Competitor A/B/C (names withheld). Live on Harley rentals + San Diego motorcycle rentals pages (pin ec3e5b2).
- PENDING: pin 8b549b3 (chart anchors on the "lowest prices" heading, not the image) BEFORE deleting the graph image hero section in the builder (templates for san-diego-harley-rentals and motorcycle-rentals-san-diego). Chrome disconnected at that point.
- Ticker still TEST MODE (TICK_LIVE=false) awaiting Glenn's go.

## Nov 2 afternoon: Harley Service cleanup + link lesson
- Builder cleanup on Harley Service (template "Bmw gs 5k 50k service tires"): deleted 2 ServiceBrands logo strips, 3 poster heroes, 3 spacers. Backup: backups/harley-service-builder-2026-11-02.md. Card text now in code (SVC_CARDS in harleyPage).
- KEEP builder images in logo sections named TireBrands / iCarSoft / GS911: serviceLogos() keys on those file names.
- Bug found by Glenn: card "Book this service" + banner "Get a quote" pointed at the FIRST form (hidden tire form). Fixed: main form = LAST section.contact-form (footer + harleyPage).
- RULE for every page cleanup (Glenn): audit EVERY link/button/anchor on the page (cards, popups, banners, hero buttons, footer CTA) in BOTH visitor view (?inform=off) and test view, and confirm each lands on a visible target. Expect the Tires page to be the hardest.
- Google Ads: phone_call_click starred in GA4 + imported to Ads as Secondary ("Route 101 Motorsports (web) phone_call_click", ctId 7887265905).
- Harley Service forms LIVE (Nov 2, 2:46pm, pin bbec812): fill-in-the-blanks templates (Service/Tire/Diagnostics/Brake request), requireBlanks() blocks sending until every "Label:" line is answered (white card, orange left bar, black text), on send the lines are joined with " | " and "&" -> "and" (Booqable email flattens newlines and shows &amp;). Thank-you shows only on the form used (sessionStorage r101sent). Verified with TEST 4 email in Glenn's inbox.
- Nov 2 3:07pm: Harley Service builder fully cleaned + published (Glenn). TireBrands/iCarSoft builder images deleted; serviceLogos() now picks the bar from the photo heading above when no builder image (/gs-?911/, /icarsoft|ics mt|mt pro/, /tire/). Checklist "Need…?/Call…" lines, hidden headings, all hidden hero buttons (label + link cleared) and all 3 form titles + main form "Please include" text removed. Hero #1 buttons kept. Builder padding NOT yet set to Small (do at site-wide rollout).
- Builder tips: clear text inputs with click, End, shift+Home, Delete (real keys). Clear link pickers with their "clear control" x. Rich text: __clean() pattern = setContent without last char, setFocus('end'), type last char. Preview iframe sometimes stops refreshing: reload builder (drafts autosave) to verify.
- Nov 2 4pm: BMW GS Service rebuilt like Harley + LIVE (template "San diego harley service"): dead sections deleted, posters -> SVC_CARDS, checklists/photo buttons cleaned, GS911/TireBrands builder images removed, 2 new contact forms added at the BOTTOM of the builder (drag in builder sidebar doesn't work via automation) -> mainFormSec() = first form after the accordion; inlineForm moves "spare" forms (below the main form) under each r101-tight checklist without a form. Backup: backups/bmw-gs-service-builder-2026-11-02.md.
- BMW BLUE (TEST MODE, BLUE_LIVE=false, ?bmwblue=test / off, localStorage r101blue): bmwBlue() repaints every orange accent inside main to #1C69D4 with inline !important (pseudo via #id#id rules). Frame (header, top bar, footer, #r101-cta banner) stays orange. Glenn reviewing.
- Straight Talk service article: fill-in-blanks via TPL list in forms(); labels fixed; spacer + 4 extra Call buttons removed; rhythm: r101-split/r101-intro always own shade; split wrapper transparent.
- Lesson: after pushing a code commit ALWAYS pin it before testing builder changes that depend on it (missed pin of 6db26d2 once).
- Nov 2 4:55pm: Harley Brake Service rebuilt + LIVE (template "Harley brake service"): logos x2, poster, spacer deleted; EBC + Includes buttons cleared; form title/desc cleared, thank-you added. Form hosted under section.r101-checks (Includes). Brake request blanks. Brakes-only PAD spacing rules. Backup: backups/harley-brakes-builder-2026-11-02.md.
- GLENN'S BACKGROUND RULE: short pages (a handful of sections, with big photo heroes/CTAs breaking up the text) stay all beige. Long pages where white/beige sections would stack: decide case by case (alternate).
- Nov 2 5:09pm: booking ticker LIVE (TICK_LIVE=true). Homepage: dead logo section deleted (backup backups/homepage-builder-2026-11-02.md); homePad() spacing standard LIVE 5:25pm (HPAD_LIVE=true): measures content, 40px same-color / 40+40 across color changes, ticker counts as a break, photo bands 680. Builder padding settings were NOT changed (Glenn: not decided, leave).
- Parallax + zoom drift verified working on homepage, Harley, BMW, Brakes after the resizing.
- Later: delete the hidden homepage "Advance Booking Required." text section (ticker replaces it). Tires page is next.

## Nov 2: Tires page (test mode ?tpad=test, pin 7c92985)
- Builder: 7 hidden Call to action sections deleted and published (backup: backups/motorcycle-tires-builder-2026-11-02.md).
- Code (TPAD_LIVE=false): full-screen hero, brands alternate beige/white, 40px each side of every color change (80 between content), gallery->help bar 24, form top 40, Tire request blanks + "Almost there", popup prefill "Tire request: <name>".
- LIVE Nov 2 (TPAD_LIVE=true, pin 26481d3). Verified as visitor.

## Nov 2 night: phone hero fix (NOT pinned yet)
- Glenn's phone screenshot (Harley Service): hero heading hidden under sticky header/"Select rental dates" bar, Submit button under Call now. Cause: r101-hero1 is fixed height 100svh + centered; long phone text overflows top and bottom.
- Commit c01494d adds heroFix() (HFIX_LIVE=false, ?hfix=test / ?hfix=off, localStorage r101hfix): phone only, when content doesn't fit, hero height auto / min 100svh, padding-top clears header, bottom 96px.
- LIVE Nov 3 3:16am (HFIX_LIVE=true). Also trims the top bar stray trailing space. Glenn shortened the top bar text to one line.

## Nov 3 3:44am: rotating top bar LIVE (TBAR_LIVE=true)
- Builder text "Harley & BMW Motorcycle Service | Tires" <-> "Advance Booking Required. No Walk-Ins." every 5s (8s, no fade, for reduced motion). Height locked to the taller line.
- Ticker decision pending (Glenn living with the top bar first). Apply->bikes redirect shelved; dropping content shelved.

## Nov 3 ~4am: San Diego Harley Rentals (test mode ?rpad=test, pin 2ca0300)
- Builder (published): deleted hidden old-graph Hero (PricingTheProof); deleted the review-strip image in Logos (reviewRow now treats the first image-less logos section as the review row on this page). Kept the image-gallery heading section = price chart anchor. Backup: backups/harley-rentals-builder-2026-11-03.md
- Code: RPAD_LIVE=true (LIVE Nov 3 4:10am). Full-screen hero, 40px per color change / 40 total within same color, ticker margins 0, Rental request form (Dates / Bike / Number of riders) + Almost there.
- Live (not gated): "From $205" + "A same-day Harley rental", step-3 button -> /collections/harley-rentals.

## TO DO LATER: site-wide hero survey (started Nov 3, stopped by Glenn to finish BMW Rentals)
- Idea: one site-wide full-screen hero rule with exceptions, OR check pages with short heroes in case a non-hero section was added by mistake.
- Partial results at 1280x800: home hero 761/800; Straight Talk articles hero 761/800; twysted-throttle 691/800; brakes 800/800 (done). Re-run the survey (iframe through sitemap pages) when we pick this up.

## Nov 3 ~5am: BMW Adventure Bike Rentals (test mode ?bpad=test, pin 4c19f6d)
- Builder (published): deleted Collections "View Our Rental Fleet"; renamed bikes heading to "1. Select Your Bike"; ADDED Products "2. Select Your Add-Ons" (collection Dual Sport Add-Ons), Text "3. Book Your Rental!" (centered), Contact form "Prefer Email? No Problem!" (labels Full Name / Email / Tell us about your rental plan, success msg). Builder form intro text could not be saved (editor ignored input) so code replaces the default "Tell something about your company" text. Backup: backups/bmw-rentals-builder-2026-11-03.md
- Live (ungated): bmwRentalsOrder() moves add-ons + Book after the bikes; BMW Rental request form blanks (adds Pavement, dirt or both) + Almost there; Book heading size; form intro white.
- Test (BPAD_LIVE=false): full-screen hero, 40px rhythm via rentalsPad, photo band clamp(480,62vh,680).
- Builder automation note: real key typing into the builder only works sometimes (tab focus). Plain inputs: native value setter + input/change events works reliably.

## Nov 3 ~5:15am: rental hub + 3-clicks steps (test mode ?rhub=test, pin cba1a47)
- rentalHub(): Harley Rentals = Harley hub (Rent a Harley-Davidson / Harley service, brakes and tires) + code-built "San Diego Harley Rentals in 3 Clicks!" (#r101-3cb) -> /collections/harley-rentals. BMW Rentals = BMW hub (Rent a BMW GS / BMW GS service and tires) + existing 3-clicks CTA gets numbered steps; clip-art steps image section hidden (delete in builder once live).
- RHUB_LIVE=false.

## Nov 3 ~4:48-4:52am: 4-minute design outage (rolled back)
- Pinned b44747d; the design did not run anywhere (body had no r101 classes, native Booqable theme showed). Rolled back to cba1a47 within ~4 min. Re-pinned b44747d a few minutes later and it ran fine. File and syntax were OK; most likely jsDelivr/browser served a bad first copy.
- NEW RULE: warm with cache:"reload" and require status 200 + full length + the final run() call near the end of the file, THEN pin, THEN immediately load the homepage and confirm body has r101-hdr. If not, roll back at once.
- BMW reviews now move up under "3 clicks" (rhub test mode).

## Nov 3 ~5:05am: loader backup source LIVE (Glenn OK)
- Loader (763 chars) = loader-box.js. Pin workflow regex var V = <40hex> still works. Tested: normal load uses jsDelivr only; with jsDelivr broken, githack copy runs.

## Nov 3 ~5:20am: BMW GS Service rental tile (test ?svrent=test, pin b345683)
- SVC_CARDS third card "Rent a BMW GS" from $210 / day -> /pages/san-diego-bmw-adventure-bike-rentals; eyebrow "While yours is in the shop"; no See whats included. SVRENT_LIVE=false.

## Nov 3 ~5:45am: Twysted Throttle (test ?ttpad=test, pin c13c80e)
- Live: twystedPage() fixes CMSP "More Info!" and 2nd band "Check Class Availability!" (both went to "/"). Builder (published): "Courses Offered" typo; form message label now "Please provide your class date and certificate #" (no license # per Glenn). Backup: backups/twysted-throttle-builder-2026-11-03.md
- Test (TTPAD_LIVE=false): full-screen hero, bands standard size, course tiles as clean white cards (2 across), 40px rhythm via rentalsPad, form blanks Discount code request / Class date / Certificate #.
- Rhythm content list now includes .articles__item,.columns__item,.accordion__item.
- Pending Glenn "live": rhub (Harley+BMW rentals), bpad (BMW rentals), ttpad (Twysted).
- Twysted links (live, pin f73b062): MTC tile + "Trade Your Cage" band -> MTC page / sign-up CC=MTC; CMSP tile + "Be Safe" band -> /courses/1dpc/ / sign-up CC=1DPC. Sign-up keeps existing source code SC=BIGGSHD (looks like a Biggs Harley-Davidson referral code; their own pages use *FA). Asked Glenn.
- WAITING on Jeremy (Twysted owner, Glenn texted Nov 3 6am): new classroom address? which email (jeremy@ vs admin@)? Then: Locations card -> Classroom + Riding (333 S Twin Oaks Valley Rd, Lot F) with directions; also ask about a Route 101 referral code instead of BIGGSHD.

## Nov 3 6:22am: Twysted Throttle LIVE (TTPAD_LIVE=true, pin 254a248)
- Big black centered heading kept; logo centered, code-sized (clamp 72-120px), linked to twystedthrottle.com (still uses the builder image file: delete from builder only after the logo is on GitHub; Glenn to send the file). Courses offered = small orange eyebrow; Go To Website button hidden (logo + course buttons link out).
- Nov 3 6:35am: Tires: brands with no builder help text get a code-drawn help bar (section.r101-genhelp) -> Mitas now has "Dont see the tire you want?" with Call + Get a quote. Live (pin 895de30).

## Nov 3 ~7am: Privacy policy rewritten and LIVE
- Builder template privacy-policy.json: Text 1 date -> "Effective November 3, 2026"; Text 2 body replaced with content/privacy-policy-2026-11-03.html (19 numbered sections). Old version summarized in backups/privacy-policy-OLD-2026-11-03.md.
- Code: text full section width; spacing CSS for h3/lists/sub-heads (pin cfaedd4).
- Glenn confirmed (Nov 3): we do not sell; customer info can transfer in a sale; mailing address now 6351 Corte Del Abeto #107, Carlsbad, CA 92011 (published); phone + info@ correct.
- Builder automation: setContent on RedactorX + setFocus(end) + type x + BackSpace + Tab saves long rich text.
