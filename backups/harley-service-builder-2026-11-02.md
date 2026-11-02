# Harley Service page: builder layout backup (Nov 2, 2026, before cleanup)

Builder template: "Bmw gs 5k 50k service tires" (page.bmw-gs-5k-50k-service-tires.json). The names are swapped; this template IS the Harley Service page.
Page: /pages/san-diego-harley-service

Builder sections, top to bottom (as rendered before cleanup):

| # | Builder section | Heading / content | Status |
|---|---|---|---|
| 0 | Hero | "San Diego Harley Service" + Harley photo | KEEP |
| 1 | Logos | Old "ServiceBrands" strip (image ...ServiceBrand...) | DELETE: replaced by the GitHub brand row (partsBand) |
| 2 | Hero (poster) | Harley-Spec Interval Service poster. Alt: "Harley-Spec Interval Service \| $459 \| Full Harley-spec service from 1,000 to 30,000 miles, plus a Route 101 safety inspection." Button "Schedule Harley Interval Service" -> #contact-form. Image: mo1fqglmcv51idbtjlncpxzh(2).HarleySpecServiceinCarlsbad916-...png | DELETE: card text now in code (SVC_CARDS) |
| 3 | Spacer | empty | DELETE |
| 4 | Hero (poster) | Harley Brake Service poster. Alt: "Harley Brake Service \| from $235 \| EBC H-H sintered pads and Motul DOT 4 fluid. Front $235, front & rear $299." Button "SCHEDULE HARLEY BRAKE SERVICE" -> /pages/harley-brake-service. Image: n60rmujorme6xa4dtgiaozg3(2).Route101MotorsportsHarleyEBCBrakeService-...png | DELETE |
| 5 | Spacer | empty | DELETE |
| 6 | Hero (poster) | 3-Hole Oil poster. Alt: "V-Twin 3-Hole Oil Service \| $195 \| AMSOIL synthetic engine, primary and transmission oil, plus a K&N filter and new derby gasket." Button "SCHEDULE 3-HOLE OIL SERVICE" -> #contact-form. Image: o7jujkzx85aj5ifkfep1o4xb(2)...png | DELETE |
| 7 | Hero | "Harley-Davidson Maintenance & Services" checklist (buttons + "Need/Call" lines hidden by code) | KEEP (delete its buttons) |
| 8 | Contact form | "Harley Parts \| Tires \| Service Quote" (the original form; code moves it under #7) | KEEP |
| 9 | Hero | "Harley Tire Sales, Mounting, Balancing & Installation" + photo | KEEP |
| 10 | Logos | Tire brands. Builder image "TireBrands..." is the TRIGGER for the code-drawn tire logo bar | KEEP (keep image!) |
| 11 | Hero | "Harley-Davidson Tire Services" checklist | KEEP (delete its buttons) |
| 12 | Contact form | "Harley Tire Request" | KEEP |
| 13 | Hero | "iCS MT Pro Harley Diagnostics" + photo | KEEP |
| 14 | Logos | iCarsoft. Builder image "iCarSoftMTPr..." is the TRIGGER for the code-drawn iCarsoft logo + tagline | KEEP (keep image!) |
| 15 | Hero | "iCS MT Pro Harley-Davidson Diagnostics" checklist | KEEP (delete its buttons) |
| 16 | Contact form | "Harley Diagnostics Request" | KEEP |
| 17 | Logos | Second old "ServiceBrands" strip | DELETE |
| 18 | Spacer | empty, above FAQs | DELETE |
| 19 | Accordion | "Harley Service FAQs" (also feeds the "See what's included" popups) | KEEP |

Note: builder order may differ slightly from the rendered order above (code moves the original form and logo strip).
