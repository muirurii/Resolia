# Resolia website — change and testing report

## Changes made to the original source

- Preserved all **11 HTML pages**, routes, imagery, original branding and colour scheme, email-based contact form and existing features.
- Replaced the previous dynamically inserted floating email shortcut with a **static, self-hosted WhatsApp-brand floating link** on every page. Its `wa.me` URL uses the confirmed number `2547143330333` and the exact pre-filled message. Accessibility label, keyboard focus, tooltip, gentle pulse, hover and responsive/safe-area positioning are provided.
- Added visible, clickable **`0143330333`** phone links to all 11 footers and the Contact details sidebar; the Contact sidebar also offers an inline WhatsApp link to the confirmed WhatsApp destination. Existing email address and contact form remain intact.
- Extended existing CSS/JS motion with inner-page hero entrances, staggered scroll reveals, section/media fades, cards, image and button interactions, smoother mobile nav menu transitions, and reduced-motion fallback.
- Added zero-dependency `package.json`, `package-lock.json`, `scripts/build.py` for consistent build/test commands, and strengthened automated audit coverage.

## Automated checks executed

| Check | Result | Scope |
| --- | --- | --- |
| `node --check script.js` | **PASS** | Production JavaScript parses. |
| `python3 tests/check_site.py` | **PASS** | 11 pages; internal files/anchors; exact WhatsApp links and decoded message; displayed click-to-call number across footer and Contact; retained profiles. |
| `node tests/test_interactions.cjs` | **PASS** | Mobile menu state/closing, services explorer, Insights search, contact mailto drafting with DOM mocks. |
| `npm test` | **PASS** | Runs the three checks above. |
| `npm run build` | **PASS** | Produces `dist/` with 11 static HTML pages and assets. |
| `tinycss2` CSS syntax parse | **PASS** | No top-level stylesheet parse errors. |
| Local HTTP static GETs | **PASS** | HTML/CSS/JS/SVG endpoints served by Python static server. |

## Not verified / outstanding work

- **No successful Chromium interactive browser tests**: Chromium `page.goto()` returned `net::ERR_BLOCKED_BY_ADMINISTRATOR` for both localhost HTTP and local `file:` URLs. This is an environment restriction, not proof the site will or will not work in browsers.
- Therefore no automated visual confirmation of mobile/desktop animation smoothness, overflow, tooltip hover, mobile menu transitions or actual screen layout. CSS breakpoints and responsive rules were inspected in source, but **real device/browser QA remains necessary**.
- WhatsApp application/Web handoff and message delivery and `tel:` device dialer behaviour cannot be exercised from the restricted environment. Their link formats are validated, but no live delivery is claimed.
- Contact form behaviour is still `mailto:` draft creation, not backend submission. This was preserved by design and mock-tested, but no external email was sent.

## Suggested pre-publication manual smoke check

On an actual phone, tablet and desktop browser: open Home, Contact, and other pages; scroll and inspect floating icon clearance; hover/focus icon on desktop and follow the WhatsApp URL; check the pre-filled message and intended conversation; tap the contact and footer phone number; exercise mobile navigation and Escape/outside-click; test the service explorer, Insights search, biographies and contact mailto form; enable the operating system's **Reduce Motion** preference and verify all content remains visible. Use narrow screens (e.g. 320px/390px), tablet (768px) and desktop (1440px) to inspect overflow and animation readability.
