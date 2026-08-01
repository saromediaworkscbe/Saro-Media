# Aether Studio — Media & Creative Agency Website

A production-grade, cinematic agency site built with React 19, Vite, Tailwind CSS, GSAP, Lenis and SplitType. Dark theme (`#080808` / `#FF6B00` / `#F5F5F5`), fully animated, route-split, and structured for a team.

---

## 1. Installation

```bash
# clone / unzip, then:
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run lint       # ESLint (flat config, zero warnings allowed)
npm run format     # Prettier
```

Requires Node 18+.

## 2. Dependency list

| Package | Role |
|---|---|
| `react` / `react-dom` 19 | UI runtime |
| `react-router-dom` 7 | Routing |
| `gsap` + `@gsap/react` | All scroll/cursor/timeline animation; `useGSAP` handles scoping + cleanup |
| `lenis` | Smooth scrolling, driven by GSAP's ticker |
| `split-type` | Line/word/char splitting for text reveals |
| `framer-motion` | **Only** where GSAP is the wrong tool: route mount/unmount (AnimatePresence), filter-grid layout animations, mobile menu presence |
| `lucide-react` | Icons |
| `react-hook-form` | Contact form validation |
| `react-helmet-async` | Per-page SEO tags |
| `tailwindcss` 3 + `autoprefixer` | Styling / design tokens |
| `eslint` 9 (flat) + `prettier` | Standards |

## 3. Project architecture

```
src/
  app/App.jsx            # Composition root: providers, Lenis, layout shell
  router/AppRouter.jsx   # Lazy routes + AnimatePresence + ScrollTrigger refresh
  pages/                 # One file per route; pages only COMPOSE sections
  sections/<page>/       # Page-specific sections (Hero, ProjectGrid, Faq…)
  components/
    layout/              # Navbar, Footer, Cursor, Loader, Transition
    ui/                  # Generic primitives (Button, Reveal, Marquee, cards…)
  hooks/                 # useLenis, useSplitText, useScrollTrigger, useCursor…
  animations/            # Pure GSAP modules (no React) + gsapSetup.js
  data/                  # Content as data: projects, reviews, packages, services
  api/                   # Network boundary (contact.js) — swap fakes for fetch
  utils/                 # constants, helpers, routes
  styles/                # globals / tailwind / animations css
```

**The dependency rule (top may import bottom, never the reverse):**

```
pages → sections → components/ui → hooks → animations → utils
                         ↑ data (importable from any layer)
```

Key decisions:

- **`animations/gsapSetup.js` is the only place plugins are registered.** Every file imports `gsap`/`ScrollTrigger` from there, so plugin registration can never happen twice and swapping in premium plugins later is a one-file change.
- **Animation logic lives in two tiers.** Reusable *motions* (line reveal, parallax, counter) are pure functions in `animations/` and take DOM nodes — testable, framework-free. *Orchestration* (what animates when, on which trigger) lives in components via `useGSAP`, which auto-reverts every tween and ScrollTrigger on unmount. No component contains manual `.kill()` bookkeeping.
- **Content is data.** Pages render `data/*.js`. Adding a project touches one file; swapping the data layer for a CMS touches only `data/` and `api/`.
- **Framer Motion is quarantined** to the three jobs where fighting React's lifecycle with GSAP is a known footgun: route exit animations, mobile-menu `AnimatePresence`, and `layout` animations in the filterable project grid. Everything else is GSAP, per the brief.

## 4. Routing setup

`router/AppRouter.jsx`:

- Every page is `React.lazy()` → its own chunk.
- Routes are data (`routeMap`), rendered inside `<Transition>` so each gets the ember curtain wipe.
- `AnimatePresence mode="wait"` keeps the old page mounted during exit.
- On path change: scroll to top + `ScrollTrigger.refresh()` on the next frame, because the new page's layout invalidates every trigger measurement.

`utils/routes.js` holds path constants and the `projectPath(slug)` builder — no hardcoded URLs in components.

## 5. Layout setup

`app/App.jsx` mounts once: `HelmetProvider → BrowserRouter → [Loader] Cursor Navbar main Footer`. `useLenis()` creates the single Lenis instance, pipes `lenis.raf` into `gsap.ticker`, and forwards scroll events to `ScrollTrigger.update` — the canonical integration, so smooth scroll and scroll triggers never disagree about position.

## 6. Animation architecture (what's implemented where)

| Brief item | Where |
|---|---|
| Loading screen (0–100 counter + curtain) | `layout/Loader.jsx` |
| Hero reveal timeline | `sections/home/Hero.jsx` |
| Split text / word / character animation | `hooks/useSplitText` + `animations/textAnimation.js`; `AnimatedHeading` (lines/chars), `Intro` (word color scrub) |
| ScrollTrigger | everywhere via `useGSAP` / `Reveal` |
| Parallax images / image scale | `animations/parallax.js` via `AnimatedImage` (`parallax`, `scale` props) |
| Horizontal scroll (pinned) | `sections/home/FeaturedProjects.jsx` (`matchMedia`, desktop only) |
| Pinned sections | `sections/home/Services.jsx` (sticky card-deck) |
| Fade up | `ui/Reveal.jsx` / `ui/FadeIn.jsx` |
| Mask reveal | `AnimatedImage` clip-path wipe; Loader panels |
| Text reveal | `AnimatedHeading`, `PageHeader` |
| Counter animation | `animations/counter.js` via `ui/Counter.jsx` |
| Magnetic buttons | `ui/Button.jsx` (pointer-follow + elastic return) |
| Cursor follower | `layout/Cursor.jsx` (`gsap.quickTo`, `data-cursor` states) |
| Image hover reveal | `ui/MediaCard.jsx` (zoom + cursor "View" morph) |
| Smooth page transition / section transition | `layout/Transition.jsx` + `animations/pageTransition.js` |
| Navbar hide/show | `layout/Navbar.jsx` (ScrollTrigger direction) |
| Footer reveal | `layout/Footer.jsx` (scrubbed translate) |
| Infinite marquee | `ui/Marquee.jsx` (CSS loop — cheaper than rAF, pauses on hover) |

**Reduced motion:** every animated module checks `prefers-reduced-motion` (helper + hook + CSS kill-switch) and renders final states instead. The custom cursor disables itself on touch and reduced motion.

## 7. Custom hooks

- `useLenis` — owns smooth scrolling and its GSAP integration.
- `useSplitText(types, onSplit)` — splits after `document.fonts.ready` (splitting before fonts load produces wrong line boxes) and reverts on unmount so React never diffs mutated DOM.
- `useScrollAnimation(cb)` — scoped `useGSAP` wrapper; anything created inside is auto-cleaned.
- `useCursor` / `cursorProps` — declarative opt-in to cursor states via `data-cursor`.
- `useMediaQuery` / `useIsDesktop` / `usePrefersReducedMotion` — `useSyncExternalStore`-based, SSR-safe.

## 8. Reusable UI components

`Button` (magnetic, polymorphic Link/a/button), `Container`, `Grid`, `SectionTitle`, `AnimatedHeading`, `PageHeader`, `Reveal`, `FadeIn`, `AnimatedImage`, `Marquee`, `Counter`, `Badge`, `Input` (RHF-compatible), `Accordion`, `Modal`, `MediaCard`, `PricingCard`, `ReviewCard`, `Seo`.

## 9. Performance

- **Route-level code splitting** (`React.lazy`) + vendor `manualChunks` (react / motion) for long-term caching.
- **Memoization where re-renders actually happen:** `MediaCard`, `PricingCard`, `ReviewCard`, `ProjectFilter` are `memo`; the filtered list in `Projects.jsx` is `useMemo`d so unchanged cards bail out during filtering.
- **Images:** `loading="lazy"` + `decoding="async"` everywhere except above-the-fold (`eager`); aspect-ratio wrappers eliminate CLS; URL builder (`img()`) centralizes size/quality so swapping to a real CDN is one function.
- **Animation cost:** transforms/opacity only; `will-change` limited to cursor/nav/panels; marquee runs on CSS, not JS; `gsap.quickTo` for the cursor instead of per-move tweens; `matchMedia` skips the horizontal-scroll pin (and its measurements) on mobile.
- **No scroll-jank double-source:** one Lenis instance drives one GSAP ticker.

## 10. Coding standards in force

Functional components only; hooks for all shared behaviour; animation *definitions* separated from *orchestration*; content separated from presentation; path aliases (`@/`) — no `../../..`; ESLint flat config with react-hooks rules at zero warnings; comments only where a decision needs justifying (font-ready splitting, FM-vs-GSAP boundaries, cleanup semantics).

## 11. Future scalability

- **CMS:** replace `data/*.js` exports with fetchers in `api/`, keep the same shapes; add TanStack Query at the page layer. Nothing else changes.
- **TypeScript:** rename to `.tsx`, type the data shapes in `data/types.ts`; the layered imports mean types flow bottom-up cleanly.
- **SSR/SSG:** the architecture ports to a Vite SSR or Next migration — `useMediaQuery` is already `useSyncExternalStore`-based and all browser APIs are inside effects.
- **Premium GSAP plugins:** `gsapSetup.js` is the single registration point for adding SplitText/ScrambleText/MorphSVG under a Club license (and replacing SplitType with GSAP SplitText is confined to `useSplitText`).
- **Testing:** pure functions in `animations/`, `utils/`, `data/` are unit-testable without a DOM; components are Testing-Library-friendly since animation is effect-driven.
- **i18n:** all copy lives in `data/` and `constants.js` — extraction into locale files is mechanical.

## 12. Replace-me checklist before going live

- Swap Unsplash URLs in `data/projects.js` + `utils/helpers.js#img` for your CDN.
- Wire `api/contact.js#submitBrief` to a real endpoint.
- Drop a Maps embed into `sections/contact/OfficeMap.jsx` (wrapper is embed-shaped).
- Add real video sources to `sections/reviews/VideoTestimonials.jsx` (open in the existing `Modal`).
- Self-host the fonts in `src/assets/fonts/` and replace the `<link>` tags for full control of `font-display`.
