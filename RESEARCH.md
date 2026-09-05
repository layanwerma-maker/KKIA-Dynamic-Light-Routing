# Research & Validation — Dynamic Light Routing System (KKIA)

This document records the research and fact-checking performed before building
the prototype, per the project's research-and-validation requirement. It
separates information into four categories:

- **VERIFIED PUBLIC INFORMATION** — confirmed via public web search during this session (Sept 2026).
- **CONCEPTUAL DESIGN ASSUMPTIONS** — reasonable, clearly-labeled assumptions used to design the concept.
- **SIMULATED DATA** — numbers invented purely for the interactive demo, never claimed as real.
- **PROPOSED FUTURE CAPABILITIES** — capabilities this concept proposes, not anything deployed today.

No statement in this document or in the application should be read as confirmation
that KKIA currently operates a "Dynamic Light Routing System." It does not.

---

## 1. VERIFIED PUBLIC INFORMATION

| Fact | Detail | Source |
|---|---|---|
| Airport identity | King Khalid International Airport (KKIA), Riyadh, Saudi Arabia. IATA: RUH, ICAO: OERK. Arabic: مطار الملك خالد الدولي | [Wikipedia](https://en.wikipedia.org/wiki/King_Khalid_International_Airport), [Wikidata](https://www.wikidata.org/wiki/Q47157) |
| Operator | Riyadh Airports Company (RAC), established 2016 as part of Saudi aviation-sector privatization; operates KKIA. Arabic: مطارات الرياض | [Wikipedia — Riyadh Airports Company](https://en.wikipedia.org/wiki/Riyadh_Airports_Company), [riyadhairports.com](https://www.riyadhairports.com/en) |
| Rebrand | Riyadh Airports Company adopted a new corporate visual identity in May 2017 | Wikipedia — Riyadh Airports Company |
| Terminals | KKIA has five passenger terminals; Terminal 5 (opened 2016) is a major hub designed for 12M+ passengers/year | [Airport Technology](https://www.airport-technology.com/projects/king-khaled/), [KKIA official site](https://www.kkia.sa/en) |
| Operations Control Centre | Riyadh Airports Company launched an advanced Airport Operations Control Centre in July 2022 | Airport Technology / news search |
| Terminal 3 refurbishment | Terminal 3 reopened after refurbishment in November 2022 | Airport Technology |
| Silent Airport initiative | KKIA began phased reduction of PA announcements in Terminal 5 arrivals/departures halls, shifting passenger notifications to digital channels (screens, app, WhatsApp) | [The Saudi Times](https://thesauditimes.net/en/king-khalid-international-airport-launches-first-phase-of-silent-airport-project-to-enhance-digital-passenger-experience) |
| General wayfinding technology | LED-based indoor guidance and visible-light-communication systems are an active research/industry area for airport navigation | [PMC research article](https://pmc.ncbi.nlm.nih.gov/articles/PMC11360684/) |

**Not independently verified (excluded from factual claims):** third-party vendor
blog claims such as "22% faster navigation" or "32% congestion reduction" from LED
wayfinding deployments appeared in marketing/industry blog search results
(Mappedin, RoveIQ, HX Tech). These are vendor-reported figures without a primary
source we could confirm, so **they are not used anywhere in this application**
as facts, benchmarks, or projected results.

**Not accessible during this session:** the official `riyadhairports.com` and
`kkia.sa` sites returned HTTP 403 to automated fetches (bot protection), so their
exact current logo files, brand color codes, and page copy could not be directly
inspected or extracted. No logo asset was downloaded or approximated as a result —
see Section 4 of the README for how to add the authorized logo once available.

## 2. CONCEPTUAL DESIGN ASSUMPTIONS

These are the prototype's own design choices, not facts about KKIA:

- Zone names (Check-in, Security Screening, Departure Hall, Boarding Gates,
  Transfer Area, Arrivals Corridor, Baggage Claim, Main/Alternative Exit,
  Exterior Receiving Area, Pickup Zone) are **generic airport-operations
  terminology**, not a reproduction of KKIA's actual floor plan, signage, or
  restricted operational layout.
- The schematic "Live Airport Map" is a **conceptual diagram**, deliberately
  simplified and non-geographic, so it cannot be mistaken for real facility
  planning or security infrastructure.
- Sensor IDs (e.g. `SEC-01`, `ARR-01`, `EXT-01`) and their positions are
  invented for demonstration and do not correspond to real KKIA equipment.
- "Alternative Approved Exit" is a conceptual placeholder for a
  operationally-designated alternative passenger route — the prototype never
  identifies it as, or treats it as interchangeable with, an emergency
  egress route. See the Decision Engine and Arrivals Simulation disclaimers.
- The Decision Engine's logic (density + queue + downstream + exterior
  capacity → recommend/maintain) is a **simplified illustrative model** for
  demonstration, not an engineering specification of a real control system.

## 3. SIMULATED DATA

All of the following, wherever shown in the app, are labeled **SIMULATED DATA**
or **SIMULATION ESTIMATE** in the UI and must never be read as real KKIA
operational statistics:

- Passenger counts, densities, queue lengths, wait times
- Sensor readings and their status transitions
- Exterior receiving capacity, pickup congestion, pedestrian density
- Before/after route-utilization percentages
- All KPI "improvement" figures (queue reduction %, redistribution %, etc.)

## 4. REAL-WORLD BENCHMARKS (verifiable only)

| Airport / Org | Technology | Use case | Source | Relevance |
|---|---|---|---|---|
| King Khalid International Airport (T5) | Digital-first passenger notifications (Silent Airport) | Reducing PA announcements, moving info to screens/app | The Saudi Times (above) | Shows KKIA is already investing in digital passenger-information channels — a natural foundation for on-floor dynamic guidance |
| Riyadh Airports Company | Airport Operations Control Centre (2022) | Centralized operational monitoring | Airport Technology | Precedent for a central "Decision Engine" style operations view, as modeled conceptually in this prototype |
| Research literature (general) | Visible-light communication / LED indoor wayfinding | Real-time indoor navigation assistance | PMC (NCBI) research article | Establishes LED-based dynamic guidance as an active, credible research direction — used here only as directional support for the concept, not as evidence it is deployed anywhere specific |

No named airport is credited in this project with an operational "queue
reduction %" or similar measured result, because no such verifiable figure was
found. Any percentage shown in the app is simulation data for this prototype only.

## 5. SAFETY & OPERATIONAL PRINCIPLES APPLIED

Based on general, publicly known airport-operations principles (not KKIA-specific
non-public procedures), the prototype enforces these rules in its design and copy:

- The system **guides**, it never **controls** passengers — terminology
  throughout is "recommendation," "guidance," "redistribution support."
- Emergency egress is never depicted as being repurposed for routine flow
  management; any alternative exit is labeled "Alternative Approved Exit —
  Subject to Operational, Safety, Security, Engineering and Regulatory Approval."
- Restricted/security-controlled areas are not depicted as passenger-accessible.
- All automated recommendations pass through a visible "Operational Approval /
  Human Oversight" concept (Auto Guidance vs. Manual Override), reflecting the
  standard aviation principle that automation supports, but does not replace,
  authorized operational decision-making.
- Alternative routing is only shown as viable when downstream and exterior
  capacity checks pass — reflecting the project's core principle that "the
  system must not solve congestion in one location by creating congestion in
  another."

## 6. ITEMS EXPLICITLY NOT VERIFIABLE / NOT CLAIMED

- Whether KKIA has any camera-based density analytics, LED floor guidance, or
  dynamic wayfinding deployed today — **not found in public sources**, and this
  prototype does not claim it exists. It is presented as a **conceptual /
  proposed** innovation.
- Exact current brand colors and logo artwork of Riyadh Airports — could not be
  extracted from the (blocked) official site during this session. The
  application uses a neutral, professional placeholder brand block until an
  authorized logo asset is supplied (see README).
- Any KKIA-specific security procedure, checkpoint count, staffing model, or
  emergency-response protocol — intentionally out of scope and never
  represented in this prototype.

## 7. Design Decisions Driven by This Research

- Terminal 5-scale references ("12M+ passengers/year design capacity" type
  language) are used only as generic scale-setting context in the About
  section, explicitly marked as background context, not live data.
- The "Operations Control Centre" concept in System Architecture reflects the
  real, verified existence of a central airport operations function at KKIA,
  giving the Decision Engine a plausible real-world anchor without claiming
  the specific software shown is deployed there.
- Because the official logo could not be safely obtained, all branding
  surfaces (header, login/opening screen, Executive Presentation, About) use
  a single shared `<BrandMark />` component reading from
  `/public/branding/riyadh-airports-logo.svg` — dropping in the authorized
  file automatically updates every surface at once.
