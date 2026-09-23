# Mukund Kumar Thakur — Portfolio

A single-page portfolio built as plain HTML/CSS/JS (no framework, no build step) in the
"Midnight Engineering" visual style — dark, minimal, technical. Deployed as a static site.

## Tech stack

- Plain HTML5, CSS (custom properties / design tokens, no framework), vanilla JS (no dependencies)
- Google Fonts: Inter (UI) + JetBrains Mono (technical metadata)
- Hand-rolled inline SVG icon sprite (no icon library)
- No build tooling required — the site is the deployable output

## Project structure

```
portfolio-page/
├── public/                          # deployed as the site root
│   ├── index.html                   # entire page (all sections)
│   ├── styles.css                   # design tokens + all component/layout styles
│   ├── script.js                    # nav toggle, scroll reveal, metric/project accordions
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── 404.html
│   ├── mukund-photo.jpg             # profile photo (resized/compressed for web)
│   └── Mukund_Kumar_Thakur_Resume.pdf
├── vercel.json                      # points Vercel at /public as the output directory
└── README.md
```

## Local setup

No dependencies to install. Either:

- Open `public/index.html` directly in a browser, or
- Serve it locally (recommended, avoids any `file://` quirks):

```bash
cd public
npx serve .
# or: python -m http.server 5500
```

## Environment variables

None. The site is fully static with no API calls or secrets.

## Development

Edit `public/index.html`, `public/styles.css`, `public/script.js` directly — no compile step.
Content (experience, project case studies, metrics) lives inline in `index.html`; only figures
supported by the résumé are used, marked as placeholders otherwise.

## Build

There is no build step. `public/` is already the production output.

## Deployment (Vercel)

1. Push this folder to a Git repository.
2. Import it in Vercel. Framework preset: **Other**.
3. `vercel.json` sets `outputDirectory: "public"` so Vercel serves `public/` as the site root —
   no build command is needed.
4. The site's canonical domain is currently set to
   `https://portfolio-fab7ou69x-code-raiders.vercel.app/` across `index.html`'s
   `<link rel="canonical">`, Open Graph/Twitter tags, JSON-LD, `robots.txt`, and `sitemap.xml`.
   If a custom domain or a stable (non-hash) Vercel alias is attached later, update all of those
   to match — a per-deployment preview URL can change on some redeploys.

## Known placeholders to finish before going live

- **GitHub**: no public-repo link is wired up yet (professional work is closed-source, per the
  contact section's note). Swap the note for a real link if/when public repos exist.
- **Résumé source**: `Mukund_Kumar_Thakur_Resume.pdf` was generated from
  `Mukund_Kumar_Thakur_4Y.docx`. Re-export and replace this file whenever the résumé is updated.
