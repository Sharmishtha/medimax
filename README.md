# Medimax Hospital website

The public website for **Medimax Hospital**, Hanumangarh — <https://medimaxhospitals.in>.

A simple, fast, static site: homepage (journey, specialties, doctors, impact,
gallery, contact) plus one page per specialty with its doctors, services and
procedures. Appointments are booked by phone or WhatsApp.

Design follows **Theme A · "Medimax logo theme"** (Nunito, Medimax blue `#0A62AE`,
magenta `#C21D69`, charcoal `#2F3540`, pill buttons, logo-colour stripe).

## Quick start

Requires **Node.js 22.18+**.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                                                   |
|---------------------|----------------------------------------------------------------|
| `npm run dev`       | Local development server                                       |
| `npm run build`     | Static export to `out/` + generates `out/_headers` (security)  |
| `npm test`          | Content and security checks (run after `build`)                |
| `npm run typecheck` | TypeScript check                                               |
| `npm run preview`   | Serve the built `out/` folder locally                          |

## Editing content

Almost everything lives in **`src/lib/content.ts`** — contact details, OPD
timings, journey, doctors, specialties (services and procedures) and gallery.
Change it there, then `npm run build && npm test`.

- Add a doctor: add an entry to `DOCTORS`, then put its key in the specialty's
  `doctors` list. Optional photo goes in `public/images/`.
- Specialties with empty `services`/`procedures` show a "details coming soon" note.
- Impact numbers only show confirmed figures; add patients served / surgeries
  once real numbers are available.

## Project layout

```
src/app/page.tsx                    Homepage
src/app/specialties/[slug]/page.tsx One page per specialty (pre-rendered)
src/components/                     Header, footer, doctor card
src/lib/content.ts                  All site content
public/                             Logo and images
scripts/security-headers.mjs        Writes out/_headers after build
tests/                              node:test checks
```

## Security

The site is a **static export**: no server code, database, login or forms, so
there is nothing on the server to break into. On top of that, every response
gets strict headers from `out/_headers` (generated at build time):

- **Content-Security-Policy** per page — scripts only from this site, and only
  the page's own inline scripts by SHA-256 hash (no `unsafe-inline`/`unsafe-eval`).
  Blocks injected scripts and limits third parties to Google Fonts.
- **HSTS** (HTTPS only), **X-Frame-Options: DENY** (no clickjacking),
  **nosniff**, strict **Referrer-Policy**, and a **Permissions-Policy** that
  turns off camera, microphone, location and payment APIs.

`npm test` fails if any of this regresses.

## SEO

- Page titles and descriptions target local searches ("hospital in Hanumangarh",
  specialty + doctor names); canonical URLs on every page.
- `sitemap.xml` and `robots.txt` are generated from `content.ts` at build time.
- Google structured data (schema.org `Hospital`, `Physician`, `MedicalWebPage`)
  with address, phone and 24×7 emergency hours — eligible for rich results.
- Open Graph / Twitter cards so links shared on WhatsApp and social show the
  building photo.

After launch: add the site to **Google Search Console** and submit
`https://medimaxhospitals.in/sitemap.xml`, and claim/update the **Google
Business Profile** with the same name, address and phone.

## Deploying to Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**,
   pick this repository.
2. Build settings: framework preset **None**, build command `npm run build`,
   output directory `out`, environment variable `NODE_VERSION=22`.
3. **Custom domains** → add `medimaxhospitals.in` (and `www.medimaxhospitals.in`).
   If the domain's DNS is on Cloudflare the records are created for you.
4. Recommended: SSL/TLS mode **Full (strict)**, **Always Use HTTPS** on.

Every push to `main` then redeploys automatically; pull requests get preview URLs.
