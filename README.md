
# Portfolio Revamp – July 2025

This archive contains **only the new and changed files** that complement your existing portfolio project.

## Files

| Path | Purpose |
|------|---------|
| `contact.html` | New contact page with responsive contact form wired to `mailto:`. |
| `style_extra.css` | Drop-in stylesheet with hover‑expansion, language bars, and contact‑form styles. |
| `script_extra.js` | Adds card‑expansion, GitHub language‑bar fetch, and contact‑form handler. |

## How to integrate

1. **Copy** all three files into the root of your portfolio project (alongside `index.html`).  
2. In **every** HTML file that loads your base stylesheet (`<link rel="stylesheet" href="style.css">`), add a second line just below:  
   ```html
   <link rel="stylesheet" href="style_extra.css">
   ```
3. Similarly, right before the closing `</body>` tag, load the extra script **after** your existing `script.js`:  
   ```html
   <script src="script.js"></script>
   <script src="script_extra.js"></script>
   ```
4. Add a **Contact** link to your `<nav>` element, e.g.:  
   ```html
   <li><a href="contact.html">Contact</a></li>
   ```
5. For each `.project-card`, add a `data-repo="username/repo"` attribute so the GitHub language bars know which repo to query.

That’s it—push the changes and enjoy your shiny new polish! ✨
