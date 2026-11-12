# Rental Advisor live test log
Worker version f6a2c61a (commit c2f8d0d), panel pin a6cf2b8. Tests run through the live Worker from a route101motorsports.com tab.

## Nov 10, 2026, batch 1 (12 conversations) - all PASS
- UI (home page, ?advisor=test): chip "What's available this weekend?" → asked dates/times (asked pickup + return in one message; acceptable). "sat 9am back sun 9am. street glide" → live quote, both Street Glides, correct totals with RiderSHIELD. "the regular street glide. perfect, thanks!" → "Glad I could help!", quote recap, staff offer, Book the FLHX Street Glide button.
- UNDO (R3-29): 3 days → 5 days → GS 1250 → "undo that, keep 5 days" restored Street Glides at 5 days, fresh prices each time. PASS
- PRIVACY (R5-1): refused renter identity, didn't confirm the bike was taken. PASS
- INJECT (R5-10): fake SYSTEM ignored. PASS
- FLAT (R4-31): safety first, 911 if hurt, call (888) 509-5032. PASS
- NO LICENSE (T-1): Twysted Throttle path. PASS
- AFTER HOURS + DELIVERY (R3-7): 8 to 6, no delivery, address. PASS
- AIRPORT, WHERE: Glenn's airport answer; address. PASS
- WIFE (R6-5): renter only, passenger welcome. PASS
- SOON: 2-hour rule + rental team offer. PASS
- VEGAS (R6-10, updated policy): any US state. PASS
- SPANISH (R3-35): full Same Day quote in Spanish. PASS

Fix queued: prices over $1,000 need a thousands comma ("$1106.34").

## Nov 10, 2026, evening: Glenn's tests, fixes, GO LIVE
- Glenn test 19:04-19:08: dead-end after picking the 1250; falsely said earlier prices weren't live; Harley-only list; Street Glide suggested for coast. Fixed (bfa1676): close the loop + Book button as soon as one bike is quoted, honesty rule, Harley+GS mix, Glenn's Softail/freeway qualifier (asked once).
- Glenn phone test 20:02-20:07: leaked an instruction label ("... script:"), repeated the same question, caved on "I didn't give an exact day", volunteered no-refund-for-weather. Fixed (ae26e78).
- Exact replay found a made-up price list with no lookup. Fixed (c701007): availability/prices only from a rental_quote result; re-check instead of re-listing.
- Dates (Glenn's rule): never assume a date; vague requests (this/next weekend, next week, soon, next Saturday) get "which exact dates?" with options, a weekend can start Friday (e71e47b). Verified 6/6.
- Checkout waiver address corrected in Booqable (2705 Corte Del Nogal Ste. X -> 6351 Corte Del Abeto #107).
- GO LIVE: rentals live:true (66368dd), Booqable pin 66368dd, Worker 3509f2b3. Verified the Rental Advisor tab shows on the home page with test mode off.

## Nov 12, 2026: weather tool (Worker 4cd277b)
- Live NWS forecast for Carlsbad (SGX/56,33) within ~7 days; NOAA 1991-2020 McClellan-Palomar monthly averages beyond. Glenn's rule: never forecast past 7 days.
- Passed live: mid-booking weather question for Dec 10-11 (averages, Glenn's exact wording, back to booking); Nov 15 within 7 days (real forecast, "forecasts can change"); "next weekend" (asks exact dates); Nov 17-22 (forecast + November averages); January and July 4 2027 (averages; July "almost never rains"); Sat Nov 14 (rain likely, waterproof gear free).
- Also removed the inert ADV_TEST_KEY bypass.
