# Tire Advisor question bank (Claude + G rounds, Nov 6, 2026)
Format: # | rider message | action (ANS = answer from facts, ASK = one clarifying question, FORM = quote form, Call) | missing info
Claude review notes in [brackets].

## Round 1 (G, 40)
1|need tires for my harley|ASK|Year/model
2|what rubber fits a 2020 street glide?|FORM|Fitment database, NEEDS GLENN [phase 2: WPS fitment]
3|got a 1250gs need new meats|ASK|Riding style: pavement/dirt/mixed
4|180/55/18 rear you got anything?|FORM|Size-specific inventory, NEEDS GLENN [phase 2: WPS stock]
5|don't know my tire size can u figure it out?|ASK|Year/make/model
6|want something grippy but lasts forever lol|ASK|Riding priorities
7|can i go wider on the back of my bike?|ASK|Year/make/model; compatibility, NEEDS GLENN
8|front is still good just need rear|FORM|Year/make/model and tire details
9|u guys carry michelins?|ANS|None
10|shinko tires any good or cheap junk?|ASK|Riding style; product guidance, NEEDS GLENN
11|got dunlop american elites?|FORM|Model-level inventory, NEEDS GLENN
12|pirelli or metzeler for my sportbike?|ASK|Riding priorities; comparisons, NEEDS GLENN
13|you do knobblies for adventure bikes?|ANS|None
14|got tires for a dirtbike too?|ANS|None
15|need whitewalls for my heritage|FORM|Whitewall availability, NEEDS GLENN
16|do you sell tires for little 110 pitbikes?|ANS|None (no pit bikes)
17|can you mount and balance tires there?|ANS|None
18|i already bought tires online can u install em?|ASK|Customer-supplied tire policy, NEEDS GLENN
19|got loose wheels off the bike just need tires mounted|ASK|Loose-wheel policy, NEEDS GLENN
20|do you balance dirtbike wheels?|ASK|MX balancing policy, NEEDS GLENN
21|can you fix a nail in my rear tire?|ANS|None (no flat repairs)
22|you guys do tubes too or tubeless only?|ASK|Tube service policy, NEEDS GLENN
23|can i watch while you change the tires?|ANS|Shop viewing policy, NEEDS GLENN
24|do i need to take my saddlebags off first?|ASK|Prep requirements, NEEDS GLENN
25|can i just roll up right now?|ANS|None (appointment only)
26|you guys open sundays?|ANS|None (open 7 days)
27|how long to change both tires while i wait?|ASK|Labor duration, NEEDS GLENN
28|can i get em done today if you have em?|Call|Live stock and scheduling, NEEDS GLENN
29|got somewhere to hang while you work?|ANS|None (Rider Lounge)
30|can i borrow a bike while mines getting tires?|Call|Loaner eligibility, NEEDS GLENN
31|how much for 2 tires on my road glide?|FORM|Year/model, riding style
32|what's your cheapest rear tire?|FORM|Size/bike; live prices, NEEDS GLENN
33|do you charge extra for mounting and balancing?|ASK|Labor/fee structure, NEEDS GLENN
34|is the price you quote locked in?|ANS|Quote validity, NEEDS GLENN
35|do i have to pay before you order them?|ASK|Payment policy, NEEDS GLENN
36|sent a quote request yesterday nobody replied|Call|Response time, NEEDS GLENN
37|2018 gs 50/50 tires michelin or metzeler? price installed and can i wait?|FORM|Exact model, preference, pricing; wait eligibility
38|need new shoes for my hog asap|ASK|[Claude: "shoes" = tires; ask which Harley, not what they meant]
39|tire's bald on the cords can i ride over there?|ANS|No remote safety clearance [Claude: safety rule, advise not to ride on cords, call]
40|hola necesito llantas para mi moto cuanto cuestan instaladas|FORM|Year/make/model, front/rear/both, riding style [reply in Spanish]

## Round 1b (Claude, 15)
41|my tire says MU85B16 what is that in normal size|ASK|Bike year/make/model; alpha-size conversion, NEEDS GLENN
42|tpms light came on after my last tire change|ASK|TPMS/valve stem policy, NEEDS GLENN
43|how old is too old for a tire? mine look fine but r 8 yrs old|ANS-SAFETY|Age guidance, NEEDS GLENN
44|can i run a different brand front and rear|ANS|Mixing policy, NEEDS GLENN
45|tri glide rear tire, you do trikes?|ASK|Trike policy, NEEDS GLENN
46|sand/dune paddle for my yz?|ASK|Paddle tire availability, NEEDS GLENN
47|you take my old tires?|ANS|Disposal fee/policy, NEEDS GLENN
48|how do i get the quote back, text or email?|ANS|Quote reply channel and timing, NEEDS GLENN
49|are you a real person|ANS|Say it's the Route 101 Tire Advisor, an AI assistant
50|can i talk to glenn|Call|None
51|tires|ASK|Everything (one-word message)
52|(emoji only: motorcycle + question mark)|ASK|Everything
53|I HAVE BEEN WAITING 3 DAYS FOR A CALL BACK|Call|Calm, apologize, give phone
54|do u ship tires or just install|ANS|Shipping/drop-ship policy, NEEDS GLENN
55|got 2 bikes, need both done, road king and a ktm 350|ASK|Both bikes' years; riding style per bike

## Round 2 (G, 40): sizing, wheels/tubes, care/safety, odd vehicles, messy humans, logistics, trust
56|my front says MT90-16 can u get that?|FORM|Year/make/model; conversion, NEEDS GLENN
57|130/90B16 and 130/90-16 same thing?|ASK|Construction compatibility, NEEDS GLENN
58|whats the diff between radial and bias ply|ANS|Technical explanation, NEEDS GLENN [Claude: general tire education?]
59|73H on my tire whats that mean|ANS|Rating definitions, NEEDS GLENN [general education?]
60|tire says 180 65 16 81H can i use 180 60 16 instead|ASK|Fitment verification, NEEDS GLENN
61|120/70zr19 is that front or rear?|ASK|Bike/model and application, NEEDS GLENN
62|got wire spokes do i need tubes?|ASK|Wheel type and sealing system, NEEDS GLENN
63|my gs has cast wheels can u do tubeless?|ANS|Specific wheel compatibility, NEEDS GLENN
64|got some heavy duty tubes already can u use em|ASK|Customer-supplied tube policy, NEEDS GLENN
65|rear mx wheel has 2 rim locks is that a problem|ASK|Rim-lock capability, NEEDS GLENN
66|tubliss system on my dirtbike can u install tires with that|ASK|TUbliss policy, NEEDS GLENN
67|rim has a little dent can u still mount a tire|Call|Inspection/repair policy, NEEDS GLENN
68|do new tires come with new valve stems?|ASK|Valve stem inclusion/charges, NEEDS GLENN
69|how much tread is too little on motorcycle tires|ANS|Tread-depth safety guidance, NEEDS GLENN [general education?]
70|front tire is cupping bad is that normal?|ASK|Condition; no diagnosis, NEEDS GLENN
71|rear is flat in the middle but sides look new|ANS|Wear explanation/replacement criteria, NEEDS GLENN
72|got little cracks all around the sidewall still ok?|Call|No remote safety clearance
73|DOT 3422 on the side what year is that|ANS|DOT decoding, NEEDS GLENN [general education?]
74|what psi should i run in my road glide with passenger|ASK|OEM spec, NEEDS GLENN
75|just got new tires can i lean it over hard right away?|ANS|Break-in guidance, NEEDS GLENN
76|tire is losing air overnight but no nail anywhere|Call|Leak source unknown; no riding clearance
77|do u change scooter tires like a vespa 300|ASK|Scooter policy, NEEDS GLENN
78|need fat tires for my sur ron|ASK|Electric moto policy, NEEDS GLENN
79|got a rzr need 4 tires mounted|ASK|UTV policy, NEEDS GLENN
80|can u mount tires on golf cart wheels?|ASK|Golf cart policy, NEEDS GLENN
81|1974 cb750 original spoke rims need new rubber|FORM|Size, tubes, wheel condition
82|23 inch front wheel on my custom bagger got options?|FORM|Exact size, wheel specs, supply, NEEDS GLENN
83|got a sidecar on my ural need all three tires|ASK|Sidecar policy, NEEDS GLENN
84|need new rims on my bike the rubber things not wheels|ASK|Year/make/model ("rims" = tires)
85|i got the big black harley with the bags and the radio|ASK|Year/model
86|hey siri tell tire shop i got 2019 road king need 2 tires uh michelin or dunlop and can i get them done friday after work|FORM|Riding style; Friday after-work timing
87|me need tyre back bmw gs 1200 road mostly sometimes dirt price with job|FORM|Model year
88|dude i already told u the bike why keep asking me|ASK|Only genuinely missing detail; keep prior info
89|where exactly are u and is there trailer parking|Call|Address (known), trailer parking, NEEDS GLENN
90|can i drop my bike off at 8 and pick up after work|Call|Drop-off/pickup policy, NEEDS GLENN
91|bringing bike on trailer what do i need to bring with it|ASK|Drop-off checklist, NEEDS GLENN
92|take apple pay or credit card?|ASK|Payment methods, NEEDS GLENN
93|military discount? also doing both tires|FORM|Discount policy, NEEDS GLENN
94|cycle gear charges less to mount why should i come to you|ANS|Route 101 differentiators only, no competitor pricing
95|do your tires have road hazard warranty or just manufacturer warranty?|ASK|Warranty/road hazard, NEEDS GLENN
