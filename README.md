# Dynamic Light Routing System (KKIA)

**نظام المسارات الضوئية الديناميكية — مطار الملك خالد الدولي**

A premium, interactive **conceptual operational prototype** demonstrating how dynamic
visual guidance could support passenger-flow management at **King Khalid
International Airport (KKIA)**, Riyadh, Saudi Arabia — presented as an operational
innovation concept for **Riyadh Airports** (مطارات الرياض).

> **This application is a conceptual operational prototype developed to demonstrate
> the Dynamic Light Routing concept. It does not represent a currently deployed
> operational system at King Khalid International Airport.**

---

## Table of Contents

1. [Project Purpose](#project-purpose)
2. [The Problem](#the-problem)
3. [The Proposed Solution](#the-proposed-solution)
4. [How the System Works](#how-the-system-works)
5. [Main Features](#main-features)
6. [Bilingual Support (AR/EN)](#bilingual-support-aren)
7. [Technology Stack](#technology-stack)
8. [Project Structure](#project-structure)
9. [Install, Run & Build](#install-run--build)
10. [Deployment (GitHub Pages)](#deployment-github-pages)
11. [Replacing the Branding Placeholder](#replacing-the-branding-placeholder)
12. [Recording / Exporting the Presentation Sequence](#recording--exporting-the-presentation-sequence)
13. [Research & References](#research--references)
14. [Operational Disclaimer](#operational-disclaimer)
15. [Simulation Disclaimer](#simulation-disclaimer)

---

## Project Purpose

This prototype demonstrates, conceptually, how a passenger-flow monitoring and
**dynamic light guidance** system could help distribute passenger movement across
approved alternative routes during congestion — while never controlling
passengers, never bypassing security or safety requirements, and always keeping a
human operator in the loop.

## The Problem

Passenger density may temporarily increase at operational bottlenecks such as
security screening, passenger exits, transfer junctions, or boarding corridors.

## The Proposed Solution

Use real-time passenger-flow information and dynamic visual guidance (illuminated
floor guidance / smart directional signage) to support the distribution of
passenger movement across available **approved** routes — always subject to
safety, security, engineering, and operational approval.

**Important concept rule:** this system *guides* passengers. It does **not**
control them. The passenger always remains free to choose their own path.

## How the System Works

```
Sensors → Passenger Flow Analysis → Decision Engine → Alternative Route
Verification → Dynamic Guidance Activation → Passenger Redistribution
Support → Continuous Monitoring
```

The core operating principle enforced throughout the prototype:

> **"The system must not solve congestion in one location by creating congestion
> in another."**

This is why every "activate alternative route" decision — automatic or manual —
first checks alternative-route capacity, downstream capacity, **and** exterior
receiving-area capacity before recommending redistribution.

## Main Features

| Section | What it demonstrates |
|---|---|
| **Overview** | Live operational dashboard, KPI cards, "Start Full Demonstration" |
| **Live Airport Map** | Conceptual schematic map with animated passengers and dynamic light routing |
| **Security Simulation** | Primary demo: 18-step security-congestion → alternative-checkpoint guidance scenario, with cinematic view and Play/Pause/Restart/Step controls |
| **Arrivals Simulation** | Second primary demo: baggage-claim exit redistribution, with **live exterior-capacity blocking logic** |
| **Passenger Journey** | End-to-end departures & arrivals stage view |
| **Analytics** | Before/after dynamic guidance charts (SIMULATION ESTIMATE) |
| **Decision Engine** | Visible inputs → logic → recommendation, with Auto/Manual human-oversight toggle |
| **Sensor Monitoring** | Simulated live sensor panel (density/status per zone) |
| **Route Control** | Manual override controls, zone-level controls, live operational timeline |
| **System Architecture** | Conceptual system architecture diagram + conceptual integrations |
| **Pilot Program** | Proposed 7-phase pilot implementation plan |
| **KPIs** | KPI dashboard (all figures SIMULATION ESTIMATE) |
| **Executive Presentation** | Full-screen 16:9 story mode (Challenge → Detection → Analysis → Verification → Guidance → Redistribution → Improvement) + video-style cinematic demonstration for both scenarios |
| **About & Research** | Concept explanation + link to `RESEARCH.md` |

### Security Simulation

The **primary demonstration**. Clicking **"Simulate Security Congestion"** runs an
18-step deterministic sequence (normal flow → rising density → threshold reached →
sensors report → Decision Engine analyzes → alternative checkpoint capacity
checked → dynamic guidance activates → redistribution → flow stabilizes → normal
restored), with a cinematic schematic view, step-by-step operational messages, and
full Play / Pause / Restart / Next / Previous controls plus a progress timeline.

### Arrivals Simulation & Exterior Capacity Logic

The **second primary demonstration**. "Simulate Arrival Peak" runs a 9-step
sequence culminating in a **live capacity check**: the Decision Engine evaluates
the Exterior Receiving Capacity Panel's *current* status.

- If exterior capacity is **not** HIGH → *Exterior Capacity Verified* →
  *Alternative Route Available* → *Dynamic Guidance Activated* → passengers
  redistribute toward the Alternative Approved Exit → Main Exit congestion eases.
- If exterior capacity **is** HIGH (toggle it yourself with **"Simulate Exterior
  Congestion"** first) → **Alternative Exit Recommendation Suspended** — Reason:
  *Exterior Receiving Capacity HIGH* — the system does **not** activate the
  alternative exit, and instead waits for the peak to ease naturally.

This demonstrates the core principle in action: guidance is never activated
without checking what happens *downstream and outside* the terminal door.

### Decision Engine

A simplified, illustrative rule (displayed live on the Decision Engine page for
both the Security and Arrivals scenarios):

```
IF   primary area = HIGH
AND  alternative route = AVAILABLE
AND  alternative route capacity = ACCEPTABLE
AND  downstream capacity = ACCEPTABLE
AND  exterior receiving capacity = ACCEPTABLE
THEN RECOMMEND ALTERNATIVE ROUTE + ACTIVATE DYNAMIC GUIDANCE
ELSE MAINTAIN CURRENT GUIDANCE + ALERT OPERATIONS
```

This is explicitly a **conceptual, illustrative** model — not a specification of
any real control system.

### Human Operational Oversight

The system is never fully autonomous in this concept. **Auto Guidance Mode** and
**Manual Override** are both available (Decision Engine / Route Control pages) —
an operator can always activate or return-to-primary manually, independent of the
automated recommendation.

### Executive Presentation Mode

A dedicated full-screen, 16:9-optimized story mode (`/presentation/live`) that
hides all technical controls, auto-runs the concept narrative in sync with a live
simulation, supports both languages, includes an optional browser-based voice
narration toggle (Web Speech API — a demonstration enhancement only, never a
dependency for core functionality), and closes with Riyadh Airports branding.

### Video-Style Demonstration

The **Executive Presentation** page also embeds a deterministic, replayable
cinematic sequence for both the Security and Arrivals scenarios (`Play / Pause /
Restart / Next / Previous`, step captions, progress timeline) designed to be
screen-recorded into a 16:9, 1920×1080 MP4 — see
[Recording / Exporting the Presentation Sequence](#recording--exporting-the-presentation-sequence).

## Bilingual Support (AR/EN)

- Full English (LTR) and Arabic (RTL) translations for every screen, control,
  operational message, and toast notification.
- The `AR | EN` switcher is in the header on every page.
- RTL is applied at the document level (`dir="rtl"`), and layout uses
  logical CSS properties (`ps-*`, `pe-*`, `border-s`, `start-*`, etc.) so
  navigation, cards, and charts mirror correctly rather than visually breaking.
- The schematic airport map itself is not mirrored (a floor plan doesn't reverse
  with reading direction), but all labels, legends, and surrounding UI do.

## Technology Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** (custom navy/teal "airport operations" design system)
- **Framer Motion** for guidance-light and passenger-flow animation
- **Recharts** for analytics/KPI charts
- **lucide-react** for icons
- **react-router-dom** for navigation and the standalone Executive Presentation route
- No backend — all data is local, in-memory **simulated data**, driven by a single
  typed simulation engine (`src/state/SimulationContext.tsx`)

## Project Structure

```
src/
  components/
    common/        Shared UI: KpiCard, StatusBadge, SimBadge, ScenarioControls, ToastStack, BrandMark...
    layout/         AppLayout, Sidebar, Header, DisclaimerBar
    map/            AirportMap (SVG schematic + animated guidance/passengers)
    security/       CheckpointPanel (security lanes/queue visualization)
    arrivals/       ExitSharePanel, ExteriorCapacityPanel
    presentation/   VideoDemoPanel (cinematic replay)
  data/             initialState.ts — zones, sensors, exterior baseline (SIMULATED DATA)
  i18n/             en.ts, ar.ts, LanguageContext.tsx
  pages/            One file per navigation section (14 pages)
  state/            SimulationContext (reducer engine), scenarios.ts (step scripts),
                    decisionEngine.ts (pure decision logic), selectors.ts
  types.ts          Shared TypeScript domain types
public/branding/    Branding assets (see below)
RESEARCH.md         Full research log: verified facts, assumptions, benchmarks, sources
```

## Install, Run & Build

Requires Node.js 18+.

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check (tsc -b) and produce a production build in dist/
npm run preview   # preview the production build locally
```

## Deployment (GitHub Pages)

The app deploys automatically to **GitHub Pages** from the `main` branch via
GitHub Actions.

- **Workflow:** [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
  — on every push to `main` (or manually via "Run workflow"), it runs
  `npm ci`, `npm run build`, then publishes `dist/` using the official
  `actions/upload-pages-artifact` + `actions/deploy-pages` actions.
- **Base path:** `vite.config.ts` sets `base: '/KKIA-Dynamic-Light-Routing/'` so
  every built asset URL, and the in-app router (`basename={import.meta.env.BASE_URL}`
  in `src/main.tsx`), correctly resolve under that repository subpath. The one
  runtime image reference outside `index.html` (`BrandMark.tsx`'s logo `<img>`)
  is built from `import.meta.env.BASE_URL` rather than a hardcoded `/` path, for
  the same reason — any future `public/` asset referenced from application code
  should follow the same pattern instead of a bare `/...` path.
- **Client-side routing on Pages:** GitHub Pages has no server-side rewrite
  rules, so a hard reload or direct link to a deep route (e.g.
  `/KKIA-Dynamic-Light-Routing/security`) would 404 on a plain static host.
  This is solved with the standard
  [SPA-GitHub-Pages](https://github.com/rafgraph/spa-github-pages) redirect
  trick: `public/404.html` re-encodes the requested path into a query string
  and redirects to the app; an inline script in `index.html`'s `<head>`
  decodes it back into a real URL via `history.replaceState` before the router
  reads the location. `public/.nojekyll` disables GitHub's Jekyll processing
  so all files (including `_`-prefixed build output, if any) are served as-is.
  This was verified end-to-end against a local static-file server that
  reproduces GitHub Pages' exact behavior (serving `404.html` for any
  unmatched path) — including a hard reload on a deep route and a
  same-session client-side navigation, both landing on the correct page.

## Replacing the Branding Placeholder

An **authorized Riyadh Airports logo asset was not available** during
development (the official site blocked automated fetches, and this project does
not redraw, approximate, or source a logo from unofficial sites — see
`RESEARCH.md`). Until one is supplied:

- The app uses a clean, professional **text-based placeholder** —
  `"Riyadh Airports | مطارات الرياض"` — rendered by
  `src/components/common/BrandMark.tsx`.
- That component always loads its image from a single fixed path:

  ```
  /public/branding/riyadh-airports-logo.svg
  ```

**To go live with the official logo:** replace
`public/branding/riyadh-airports-logo.svg` with the authorized Riyadh Airports
logo file (same filename, SVG preferred; a PNG can be used by updating the one
`<img src>` reference in `BrandMark.tsx`). Every screen that shows branding —
header, sidebar, Executive Presentation Mode, video-style demonstration opening
frame, and the About page — updates automatically, since they all render through
`BrandMark`.

## Recording / Exporting the Presentation Sequence

Direct in-browser MP4 export was intentionally **not** built as a fragile
client-side video encoder. Instead, the Executive Presentation and Video-Style
Demonstration are built as a **deterministic, replayable 16:9 animation** —
reliable to capture with standard tools:

1. Open **Executive Presentation** → **Enter Executive Presentation Mode**
   (`/presentation/live`), sized for a 16:9 / 1920×1080 display.
2. Start recording your screen:
   - **Windows:** `Win + Alt + R` (Xbox Game Bar)
   - **macOS:** `Shift + Cmd + 5`
   - Or any screen recorder / OBS Studio set to capture at 1920×1080.
3. Let the 7-chapter story play through once (~45–90 seconds), then stop the
   recording.
4. Optional — normalize the output with `ffmpeg`:
   ```bash
   ffmpeg -i input.mov -vf scale=1920:1080 -r 30 output.mp4
   ```
5. Import the resulting MP4 directly into PowerPoint, Keynote, or your
   presentation deck.

The same workflow works for the **Video-Style Demonstration** panel (Security or
Arrivals tab) on the Executive Presentation page.

## Research & References

See **[`RESEARCH.md`](./RESEARCH.md)** for the full research log: verified public
facts about KKIA and Riyadh Airports, clearly separated conceptual design
assumptions, simulated-data disclosures, real-world (verifiable-only) benchmarks,
and the safety/operational principles applied throughout this prototype. A
condensed "Research & References" summary is also shown in-app on the **About &
Research** page.

## Operational Disclaimer

> Conceptual operational prototype for demonstration purposes only. Alternative
> routes and passenger-flow measures are subject to safety, security, regulatory,
> engineering, and operational approval.
>
> نموذج تشغيلي تصوري لأغراض العرض فقط. تخضع المسارات البديلة وإجراءات إدارة تدفق
> المسافرين لمتطلبات واعتمادات السلامة والأمن والجهات التنظيمية والهندسية
> والتشغيلية.

## Simulation Disclaimer

All passenger numbers, density percentages, waiting times, queue lengths, KPI
improvements, route-utilization percentages, and capacity values shown in this
application are **SIMULATED DATA** or **SIMULATION ESTIMATE**, generated locally
for demonstration purposes. **None of it represents actual King Khalid
International Airport operational data.**
