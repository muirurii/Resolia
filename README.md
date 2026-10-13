# Resolia Conseil — Website

**Updated multi-page site** based directly on the supplied Resolia project. The existing HTML/CSS/JavaScript architecture, brand colours, assets, team biographies, content, navigation, and interactive features are preserved. No framework, tracking service, external CSS/JS CDN, or runtime dependency was introduced.

## Quick start

Requirements: a modern browser and (for a local web server) Python 3 or any static web server. **Node.js / npm are optional** and used only for the included scripts and automated checks.

```bash
# Optional; installs no third-party packages (zero dependencies)
npm ci

# Run from the Resolia-Website directory
python3 -m http.server 8000
```

Open **http://localhost:8000**. On Windows, `py -m http.server 8000` or `python -m http.server 8000` can replace the Python command. You can also open `index.html` directly, but testing through a local HTTP server is preferable.

## Build, lint, and test

```bash
npm run lint     # JS syntax plus all-page HTML/links/contact audit
npm test         # includes DOM-mock interaction tests
npm run build    # copies deployable static files into dist/
```

The project remains dependency-free. `package.json` and `package-lock.json` are included for reproducible npm command execution, **without third-party packages**. If you do not use npm, run:

```bash
node --check script.js
python3 tests/check_site.py
node tests/test_interactions.cjs
python3 scripts/build.py
```

To deploy, upload the **contents of `dist/`** after building, or publish the top-level HTML files plus `styles.css`, `script.js`, `favicon.svg`, and the entire `assets/` folder. No server-side application or environment variables are needed.

## Pages

- `index.html` — Home
- `about.html` — Background, mission, and values
- `people.html` — The People Behind Resolia, including Akil Ebrahimjee and Makena Baariu
- `services.html` — Services and interactive service-choice explorer
- `practice-areas.html` — Practice areas
- `mediation.html`, `arbitration.html`, `conciliation.html`, `negotiation.html` — Service details
- `insights.html` — Searchable educational guidance
- `contact.html` — Contact details and email draft enquiry form

All 11 pages retain the original top navigation, footer, and shared CSS/JS.

## Confirmed contact configuration

**WhatsApp destination:** `+2547143330333`

**WhatsApp link (same on all pages and inline on Contact):**

```text
https://wa.me/2547143330333?text=Hello%20Resolia%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.
```

The pre-filled text is **“Hello Resolia, I would like to enquire about your services.”** The bottom-right floating button uses a locally stored WhatsApp brand symbol (`assets/whatsapp.svg`) with accessible text, keyboard focus styling, desktop tooltip, and motion-sensitive floating/pulse treatment. Because the link is directly present in each page's HTML, it works even if JavaScript is unavailable. On compatible devices the `wa.me` link hands off to WhatsApp or opens WhatsApp Web. The external service's availability and device-specific handoff need checking on real devices.

**Displayed call number:** `0143330333`

The number appears in every footer and on the Contact page, with a `tel:0143330333` link. This displayed call number is intentionally **not** used in the WhatsApp URL. The original `contact@resoliaconseil.com` email remains unchanged.

## Motion and accessibility

- Scroll entrance effects on content headings, cards, service rows, team profiles, and major content groups use `IntersectionObserver` when available, avoiding heavy animation libraries.
- Existing home hero entrances are retained; inner-page hero entrances, staggered card reveals, and subtle image/card/button hover treatments are refined.
- The mobile menu now fades and slides smoothly while retaining the existing open/close JS and Escape / outside-click behaviour.
- Motion relies on opacity and transforms instead of layout-affecting size changes. The WhatsApp shortcut uses safe-area-aware placement and extra footer space.
- If **Reduce Motion** is enabled, entrance/pulse motion is disabled, scrolling reverts to normal, and content is always visible. Unsupported browsers and JS-disabled visitors also get readable content.
- Form labels, skip link, keyboard focus, and relevant accessibility attributes remain available.

## Existing enquiry form: important behaviour

The Contact form is **mailto-based**: submitting a valid form prepares a draft in the visitor's own email application. **It does not send a message automatically** and is not backed by a form-submission server. A configured email client and a manual Send action are required. The direct WhatsApp link is separate from this form.

## Quality assurance and limitations

See `TEST_REPORT.md` for exact commands and results. Static HTML, reference and content tests, JavaScript syntax, contact destination checks, CSS parsing, and local HTTP checks are available. **Live WhatsApp delivery, tel application handoff, and interactive desktop/mobile browser rendering must still be checked on normal end-user devices** before production release. The preparation environment's Chromium navigation is blocked by administrator policy, so no successful browser-end-to-end test is claimed.

### Deployment notes

The existing canonical and Open Graph URLs refer to `www.resoliaconseil.com`; update them only if you deploy to a different domain. WhatsApp is a third-party service and may open the installed app or web interface depending on device settings. This source package contains no confidential credentials or `node_modules`.
