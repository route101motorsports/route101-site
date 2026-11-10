# Rental Advisor question bank (Claude + G rounds, Nov 10, 2026)
Format: # | customer message | action | notes
Actions: LIVE = Booqable lookup (availability / item_prices) · ANS = answer from knowledge · ASK = one clarifying question · CTX = reuse/refresh earlier details · HANDOFF = callback/message to shop · GLENN = policy needed before the advisor can answer.
Claude review notes in [brackets]. G's drafted answers live in his chat; corrections are noted here.

## Round 1 (G, 40)
1|Looking to rent a Harley this Saturday. Got anything available?|ASK→LIVE|Pickup + return time, then availability for every Harley
2|How much is a Street Glide for three days, picking up Friday morning?|ASK→LIVE|Pickup time → item_prices [G said "see booking page": wrong, we quote live]
3|Difference between Street Glide and Street Glide S?|ANS|Bike specs in knowledge (year, engine, features, color)
4|I'm 58, haven't ridden in 8 years. Am I good to rent?|ANS/GLENN|Age OK; any recent-experience rule?
5|M1 endorsement or is my regular CA license enough?|ANS|M1 required
6|Flying in from Germany. German motorcycle license OK?|GLENN|International license / IDP rule
7|Minimum age?|ANS|21
8|$500 deposit: charge or hold?|GLENN|Cash or card hold? How is it taken?
9|How long until I get the deposit back?|GLENN|Release timing
10|Does the price include insurance?|ANS/GLENN|RiderSHIELD $19/day: REQUIRED or optional? [site says "added before arrival or at check-in"]
11|Someone backs into the parked bike. Am I responsible?|GLENN|RiderSHIELD collision/theft deductible + renter responsibility [product page lists liability limits only]
12|What if I drop it in a parking lot at 2 mph?|GLENN|Same: damage responsibility
13|6'4", 260 lb. Which Harley?|ANS|Fit guidance in knowledge; any weight limit? GLENN
14|Wife 5'2" riding passenger. Most comfortable bike?|ANS|Passenger comfort per model
15|Two licensed riders sharing one rental?|GLENN|Additional rider rule
16|Helmets for two people?|ANS/GLENN|Gear "free" vs Booqable $50/day prices [see decisions]
17|Full-face instead of half helmet?|ANS|GDM Venom full-face, GDM Raptor modular
18|Ride to Vegas and back, mileage limit?|ANS/GLENN|No mileage limit; out-of-state OK?
19|BMW GS on dirt roads?|GLENN|Unpaved/fire-road rule
20|Best route to Julian and back?|ANS|Route ideas in knowledge (Glenn's favorites)
21|Four Australians, four Harleys, five days?|ASK→LIVE|Dates/times → quantity check across Harleys
22|Reserve a Road Glide, switch to Street Glide at pickup?|ANS|[We have no Road Glide; name the fleet]
23|Bike delivered to San Diego airport at 7:30am?|ANS|[NO DELIVERY. G was wrong]
24|Pick up at 7am instead of 8?|GLENN|Early pickup allowed by arrangement?
25|Return 6:15 instead of 6, charged another day?|LIVE/GLENN|Price both returns; grace period?
26|Rains all weekend after I paid?|GLENN|Weather reschedule/refund
27|Cancel the night before, full refund?|GLENN|Cancellation policy
28|"need hog. Tomorrow. Cheap."|ASK→LIVE|Pickup/return time; cheapest available Harley
29|Biggest baddest Harley for a week or two days?|ASK→LIVE|Dates; quote both lengths
30|Saw a cheaper Harley rental online. Price match?|GLENN|Rental price match? (tire price match ≠ rentals)
31|French bulldog in a backpack?|GLENN|Pets
32|Use my buddy's license?|ANS|No. Every operator needs own valid M license
33|Phone mounts, USB, Bluetooth?|ANS|Per-bike equipment in knowledge
34|Death Valley in August, restrictions?|GLENN|Geographic / heat restrictions
35|Wash it before return?|GLENN|Cleaning policy
36|Keep it overnight at my Airbnb?|ANS|Yes, multi-day rentals
37|$400 card limit, cash for deposit?|GLENN|Cash deposit / payment methods
38|Forget the Harley, BMW GS for a 29" inseam?|ANS/GLENN|Seat heights per GS (lowered seat?); CTX: drop Harley
39|Are you a real person?|ANS|AI Rental Advisor + callback offer (same as tires)
40|Mexico, girlfriend rides it back, 2 days late, scratched bag?|GLENN|Mexico, unauthorized rider, late fees, damage

## Round 2 (G, 40, pricing + live data)
1|Fri 8AM to Sat 8AM is one day, right?|LIVE|1-day tier
2|What if I return Sat 9AM?|LIVE|Price both; explain next tier
3|Fri noon to 5PM, cheaper for 5 hours?|LIVE|Same Day flat rate
4|8AM vs 2PM pickup same price if back by close?|ANS|Same Day
5|3 days, why more if I return 5PM vs 8AM?|LIVE|24h periods from pickup
6|Book 2 days, return after 1, refund difference?|GLENN|Early return policy
7|Tue 4PM to Thu 4PM, how many days?|LIVE|2 days
8|Sat 5PM to Sun 5PM is Same Day?|ANS→LIVE|No, 1-day (24h)
9|Pick up 5:30PM, return 6PM, full Same Day rate?|ANS|Yes
10|Cheapest way to rent a Street Glide for a weekend, flexible times?|ASK→LIVE|Compare 2-3 time options
11|Show every bike available next Friday + Same Day price|LIVE|All in-store bikes, available only
12|Price changed from 5 minutes ago, why?|CTX→LIVE|Re-quote; explain what changed
13|Cheapest BMW for 4 days starting Nov 20|ASK→LIVE|Pickup time; cheapest available GS
14|That red Harley I rented last year|ASK|Bike colors in knowledge; no customer history
15|Pay right here in the chat?|ANS|No payment in chat; booking/checkout link
16|Street Glide S, or else your most expensive Harley|LIVE|Show alternatives, never auto-book
17|1-, 3-, 7-day prices starting 9AM|LIVE|Three lookups
18|Two identical Street Glides or don't bother|LIVE|Street Glide ≠ Street Glide S; quantity 1 each
19|Reserve now, choose pickup time later?|ANS|Need a time for an exact price
20|$350 total, find something incl. insurance|ASK→LIVE|Dates; rental + RiderSHIELD + tax; deposit separate
21|Is that everything, or hiding insurance at checkout?|LIVE|Itemized: bike + RiderSHIELD + options + tax; deposit separate
22|Difference with and without RiderSHIELD|GLENN|Depends on required vs optional
23|Have my own insurance, waive the $19?|GLENN|Same
24|Stolen at the hotel, RiderSHIELD pays everything?|GLENN|Theft coverage / deductible
25|RiderSHIELD vs ProtectionPLUS?|ANS|Insurance vs roadside assurance (pages)
26|Buy every protection, ride into a tree, owe nothing?|ANS/GLENN|Never promise zero liability
27|$500 deposit part of the cost or refundable?|ANS|Refundable, separate
28|Exact total, 2 days, insurance, roadside, helmets for two|LIVE|Itemized total
29|Strip all optional extras, lowest legal price|LIVE|Keep required items only
30|No deposit, add $500 to the price instead|ANS|Deposit required
31|"Tomorrow."|ASK|Needs today's date injected
32|Same as before, two days longer, the blue one|CTX→LIVE|Keep context; colors needed
33|Saturday won't work, Sunday, same everything|CTX→LIVE|Move dates, re-check all
34|5-day rental but only 100 hours, discount?|ANS→LIVE|Tiers, not hourly; offer time options
35|I know Glenn, knock off 20%|HANDOFF|No unverified discounts
36|Book Same Day, keep it overnight, nobody will notice|ANS/GLENN|Late-return policy
37|I'm 20, turning 21 mid-rental|ANS|Must be 21 at pickup
38|GTA motorcycle license counts?|ANS|Humor + real license
39|Stop asking, just book it|ANS|Summary + booking link; never claim booked
40|Cheapest Harley, no deposit, no insurance, Vegas delivery, Glenn promise|ANS→LIVE|Unlimited miles yes; rest no
