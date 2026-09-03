/* Site chrome + project rendering. Depends on PROJECTS from projects.js. */

(function () {
  'use strict';

  // Project copy contains things like "ap_fixed<16,4>" and "< 1 µs / byte",
  // so everything interpolated into markup has to be escaped.
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const NAV = [
    ['index.html', 'Index'],
    ['work.html', 'Work'],
    ['about.html', 'About'],
    ['contact.html', 'Contact'],
    ['ABRAMO_ELIOT_CV.pdf', 'CV']
  ];

  const here = location.pathname.split('/').pop() || 'index.html';

  /* ------------------------------------------------------------ chrome -- */

  function chrome() {
    const nav = NAV.map(([href, label]) => {
      const current = href === here ? ' aria-current="page"' : '';
      const ext = href.endsWith('.pdf') ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${href}"${current}${ext}>${label}</a>`;
    }).join('');

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      `<div class="wrap">
         <a class="brand" href="index.html">Eliot Abramo</a>
         <nav>${nav}</nav>
       </div>`;
    document.body.prepend(header);

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      `<div class="wrap">
         <nav>
           <a href="https://github.com/Eliot-Abramo" target="_blank" rel="noopener">GitHub</a>
           <a href="https://www.linkedin.com/in/eliot-abramo-757592189" target="_blank" rel="noopener">LinkedIn</a>
           <a href="mailto:eliot.abramo@epfl.ch">eliot.abramo@epfl.ch</a>
           <a href="ABRAMO_ELIOT_CV.pdf" target="_blank" rel="noopener">CV</a>
         </nav>
         <span class="colophon">Lausanne · ${new Date().getFullYear()}</span>
       </div>`;
    document.body.append(footer);
  }

  /* ------------------------------------------------------- work index -- */

  function indexRow(p, n) {
    const num = String(n).padStart(2, '0');
    const meta = esc(p.years || '');
    const tech = (p.tech || []).map(esc).join(' · ');
    const stub = !p.study;

    const inner =
      `<span class="index-num">${num}</span>
       <div>
         <h3 class="index-title">${esc(p.title)}</h3>
         <p class="index-summary">${esc(p.summary)}</p>
       </div>
       <span class="index-tech">${tech}</span>
       <span class="index-meta">${meta}${stub ? '' : ' <span class="arrow">&rarr;</span>'}</span>`;

    if (stub) {
      const div = document.createElement('div');
      div.className = 'index-row stub';
      div.innerHTML = inner;
      // Say plainly that it is not written up yet rather than linking nowhere.
      if (p.note) {
        div.querySelector('.index-summary').insertAdjacentHTML(
          'beforeend', ` <span style="opacity:.65">(${esc(p.note)})</span>`
        );
      }
      return div;
    }

    const a = document.createElement('a');
    a.className = 'index-row';
    a.href = 'project.html?p=' + encodeURIComponent(p.slug);
    a.innerHTML = inner;
    return a;
  }

  function renderIndex(mount, list) {
    const frag = document.createDocumentFragment();
    list.forEach((p, i) => frag.append(indexRow(p, i + 1)));
    mount.append(frag);
  }

  /* ------------------------------------------------------- case study -- */

  function block(label, html) {
    if (!html) return '';
    return `<section class="block">
              <h2>${esc(label)}</h2>
              <div class="body">${html}</div>
            </section>`;
  }

  const list = (items) =>
    items && items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';

  function figures(figs) {
    if (!figs || !figs.length) return '';
    return figs.map((f, i) => {
      const n = `<span class="fig-num">Fig. ${i + 1}</span>`;
      if (f.gap) {
        // A figure we know is missing. Stated, not faked.
        return `<figure>
                  <div class="fig-gap">Figure not yet published</div>
                  <figcaption>${n} — ${esc(f.gap)}</figcaption>
                </figure>`;
      }
      return `<figure>
                <img src="${esc(f.src)}" alt="${esc(f.caption)}" loading="lazy">
                <figcaption>${n} — ${esc(f.caption)}</figcaption>
              </figure>`;
    }).join('');
  }

  function specs(rows) {
    if (!rows || !rows.length) return '';
    return `<table class="specs"><tbody>${rows.map(
      ([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`
    ).join('')}</tbody></table>`;
  }

  function renderStudy(mount) {
    const slug = new URLSearchParams(location.search).get('p');
    const p = PROJECTS.find((x) => x.slug === slug);

    if (!p || !p.study) {
      document.title = 'Not found — Eliot Abramo';
      mount.innerHTML =
        `<div class="wrap study-header">
           <h1>No such project</h1>
           <p class="deck">That project either does not exist or does not have a write-up yet.</p>
           <p style="margin-top:2rem"><a class="link" href="work.html">All work &rarr;</a></p>
         </div>`;
      return;
    }

    const s = p.study;
    document.title = p.title + ' — Eliot Abramo';

    const meta = [
      ['Role', p.role],
      ['Organisation', p.org],
      ['Years', p.years],
      ['Stack', (p.tech || []).join(', ')]
    ].filter(([, v]) => v)
     .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

    const links = []
      .concat(p.repo ? [{ label: 'Source on GitHub', href: p.repo }] : [])
      .concat(p.links || [])
      .map((l) => {
        const ext = /^https?:|\.pdf$/.test(l.href) ? ' target="_blank" rel="noopener"' : '';
        return `<a class="link" href="${esc(l.href)}"${ext}>${esc(l.label)} &rarr;</a>`;
      }).join('');

    mount.innerHTML =
      `<div class="wrap">
         <div class="study-header">
           <p class="eyebrow">${esc(p.org || 'Project')} · ${esc(p.years || '')}</p>
           <h1>${esc(p.title)}</h1>
           <p class="deck">${esc(p.summary)}</p>
         </div>
         <dl class="meta-strip">${meta}</dl>
         ${block('The problem', s.problem ? `<p>${esc(s.problem)}</p>` : '')}
         ${block('Constraints', list(s.constraints))}
         ${block('What I built', list(s.build))}
         ${block('Numbers', specs(s.specs))}
         ${block('Figures', figures(s.figures))}
         ${block('Outcome', s.outcome ? `<p>${esc(s.outcome)}</p>` : '')}
         <section class="block">
           <h2>Links</h2>
           <div class="body">
             <div class="link-row">${links}<a class="link" href="work.html">All work &rarr;</a></div>
           </div>
         </section>
       </div>`;
  }

  /* ---------------------------------------------------------- runaway -- */

  // The call button declines to be clicked. Desktop pointers only, and it
  // stands still for anyone who asked for reduced motion.
  function runaway() {
    const btn = document.getElementById('runaway');
    if (!btn) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let dodges = 0;
    document.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = r.left + r.width / 2 - e.clientX;
      const dy = r.top + r.height / 2 - e.clientY;
      const d = Math.hypot(dx, dy);
      if (d > 110) return;

      // Nudge it away along the approach vector, clamped so it stays on screen.
      const cur = { x: parseFloat(btn.style.left) || 0, y: parseFloat(btn.style.top) || 0 };
      const lim = 130;
      btn.style.left = Math.max(-lim, Math.min(lim, cur.x + (dx / d) * 60)) + 'px';
      btn.style.top = Math.max(-60, Math.min(60, cur.y + (dy / d) * 40)) + 'px';

      // It relents eventually — the joke shouldn't cost someone the contact link.
      if (++dodges >= 6) {
        btn.style.left = btn.style.top = '0px';
        btn.textContent = 'Fine — book a call →';
        btn.href = 'contact.html';
      }
    });
  }

  /* ------------------------------------------------------------- init -- */

  document.addEventListener('DOMContentLoaded', () => {
    chrome();

    const all = document.querySelector('[data-projects="all"]');
    if (all) renderIndex(all, PROJECTS);

    const featured = document.querySelector('[data-projects="featured"]');
    if (featured) renderIndex(featured, PROJECTS.filter((p) => p.featured));

    const study = document.querySelector('[data-study]');
    if (study) renderStudy(study);

    runaway();
  });
})();
