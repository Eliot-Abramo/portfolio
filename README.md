# Eliot Abramo — Professional Portfolio

Static site built with plain HTML/CSS for lightning‑fast loads and easy GitHub Pages hosting.

## Deploy

```bash
git clone https://github.com/<your‑username>/<portfolio-repo>.git
cd <portfolio-repo>
unzip ../portfolio_site_v2.zip -d .
git add .
git commit -m "Deploy v2 portfolio"
git push origin main
```

Enable **Pages** under *Settings → Pages → Source → `main` / root*.  
Custom domain? Add a `CNAME` file pointing to your domain and configure DNS A/ALIAS or CNAME records.

## Customise

* `index.html` — edit project cards or About section.
* `style.css` — adjust colors, fonts, spacing.
* `ABRAMO_RESUME.pdf` & `THESIS_ABRAMO.pdf` — replace to update docs.

## Stack

* No JavaScript, no build step
* Responsive CSS (Flexbox) and dark theme
* Fonts via Google Fonts (Inter)
* Hosted free on GitHub Pages