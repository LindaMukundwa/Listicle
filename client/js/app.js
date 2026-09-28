/* ============================================================
   Hash-based router. Fetches guide data from /api/guides
   guidesCache holds the fetched array. Null until first fetch.
   guidesPromise dedupes concurrent fetches (e.g., two route
   handlers racing on cold start).
   ------------------------------------------------------------ */

let guidesCache = null;
let guidesPromise = null;

/**
 * Fetch all guides once. Subsequent calls reuse the cache
 * or the in-flight promise.
 */

async function ensureGuides() {
  if (guidesCache) return guidesCache;
  if (guidesPromise) return guidesPromise;

  guidesPromise = fetch("/api/guides")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      guidesCache = data;
      guidesPromise = null;
      return data;
    })
    .catch((err) => {
      guidesPromise = null;
      throw err;
    });

  return guidesPromise;
}

/* ------------------------------------------------------------
   VIEW HELPERS
   ------------------------------------------------------------ */

/** Inline SVG placeholders */
function placeholderSVG(key) {
  const svgs = {
    home: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Home illustration">
      <rect width="200" height="150" fill="#F3EADF"/>
      <path d="M60 80 L100 50 L140 80 L140 115 L60 115 Z" fill="#C96A4B"/>
      <rect x="90" y="92" width="20" height="23" fill="#FBF6EF"/>
      <circle cx="100" cy="40" r="8" fill="#8FA98A"/>
    </svg>`,
    clock: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clock illustration">
      <rect width="200" height="150" fill="#F3EADF"/>
      <circle cx="100" cy="75" r="40" fill="#FBF6EF" stroke="#C96A4B" stroke-width="4"/>
      <line x1="100" y1="75" x2="100" y2="50" stroke="#C96A4B" stroke-width="4" stroke-linecap="round"/>
      <line x1="100" y1="75" x2="118" y2="85" stroke="#8FA98A" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
    bowl: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Food bowl illustration">
      <rect width="200" height="150" fill="#F3EADF"/>
      <path d="M60 75 Q100 130 140 75 Z" fill="#C96A4B"/>
      <ellipse cx="100" cy="75" rx="40" ry="8" fill="#8FA98A"/>
      <circle cx="90" cy="72" r="3" fill="#FBF6EF"/>
      <circle cx="105" cy="70" r="3" fill="#FBF6EF"/>
      <circle cx="115" cy="74" r="3" fill="#FBF6EF"/>
    </svg>`,
    heart: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Heart illustration">
      <rect width="200" height="150" fill="#F3EADF"/>
      <path d="M100 110 C60 85 55 55 75 50 C88 47 98 58 100 65 C102 58 112 47 125 50 C145 55 140 85 100 110 Z" fill="#C96A4B"/>
      <circle cx="100" cy="75" r="6" fill="#FBF6EF"/>
    </svg>`,
    paw: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Paw illustration">
      <rect width="200" height="150" fill="#F3EADF"/>
      <ellipse cx="100" cy="90" rx="22" ry="18" fill="#8FA98A"/>
      <circle cx="78" cy="65" r="9" fill="#C96A4B"/>
      <circle cx="94" cy="55" r="9" fill="#C96A4B"/>
      <circle cx="112" cy="55" r="9" fill="#C96A4B"/>
      <circle cx="126" cy="66" r="9" fill="#C96A4B"/>
    </svg>`,
    sun: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sun illustration">
      <rect width="200" height="150" fill="#F3EADF"/>
      <circle cx="100" cy="75" r="28" fill="#C96A4B"/>
      <g stroke="#8FA98A" stroke-width="4" stroke-linecap="round">
        <line x1="100" y1="30" x2="100" y2="40"/>
        <line x1="100" y1="110" x2="100" y2="120"/>
        <line x1="55" y1="75" x2="65" y2="75"/>
        <line x1="135" y1="75" x2="145" y2="75"/>
        <line x1="68" y1="43" x2="75" y2="50"/>
        <line x1="125" y1="100" x2="132" y2="107"/>
        <line x1="132" y1="43" x2="125" y2="50"/>
        <line x1="75" y1="100" x2="68" y2="107"/>
      </g>
    </svg>`
  };
  return svgs[key] || svgs.paw;
}

/** Escape strings before injecting into HTML. */
function esc(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/* ------------------------------------------------------------
   VIEWS (each returns an HTML string)
   ------------------------------------------------------------ */

function renderHome(guides) {
  const cards = guides.map(
    (g) => `
      <a href="#/guides/${esc(g.slug)}" class="guide-card" aria-label="Read guide: ${esc(g.title)}">
        <div class="guide-card__image">${placeholderSVG(g.image)}</div>
        <h3 class="guide-card__title">${esc(g.title)}</h3>
        <p class="guide-card__desc">${esc(g.short_description)}</p>
      </a>
    `
  ).join("");

  return `
    <section aria-labelledby="guides-heading">
      <h2 id="guides-heading" class="visually-hidden">Guides</h2>
      <div class="guide-grid">${cards}</div>
    </section>
  `;
}

function renderDetail(guide) {
  const checklist = guide.checklist.map((item) => `<li>${esc(item)}</li>`).join("");
  const mistakes  = guide.common_mistakes.map((item) => `<li>${esc(item)}</li>`).join("");

  return `
    <article class="detail">
      <a href="#/" class="detail__back">← Back to all guides</a>

      <div class="detail__image">${placeholderSVG(guide.image)}</div>

      <h2 class="detail__title">${esc(guide.title)}</h2>
      <p>${esc(guide.short_description)}</p>

      <div class="detail__meta">
        <span class="detail__badge">${esc(guide.difficulty)}</span>
        <span class="detail__badge detail__badge--time">${esc(guide.time_commitment)}</span>
      </div>

      <h3>Checklist</h3>
      <ul>${checklist}</ul>

      <h3>Common Mistakes</h3>
      <ul>${mistakes}</ul>

      <div class="pro-tip">
        <strong>Pro tip:</strong> ${esc(guide.pro_tip)}
      </div>
    </article>
  `;
}

function renderNotFound(path) {
  return `
    <section class="not-found">
      <h2>🐾 Oops, there's no guide here</h2>
      <p>We couldn't find anything at <code>${esc(path)}</code>.</p>
      <p>That page may have moved, or the link might have a typo.</p>
      <p><a href="#/" role="button">Back to all guides</a></p>
    </section>
  `;
}

function renderError(message) {
  return `
    <section class="not-found">
      <h2>🐾  We couldn't load the guides</h2>
      <p>${esc(message)}</p>
      <p>Try refreshing the page. If it keeps happening, the server may be down.</p>
      <p><a href="#/" role="button">Try again</a></p>
    </section>
  `;
}

function renderLoading() {
  return `
    <section class="not-found">
      <p>🐾 Loading guides…</p>
    </section>
  `;
}

/* ------------------------------------------------------------
   ROUTER (async)
   ------------------------------------------------------------ */

async function router() {
  const app = document.getElementById("app");
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");

  // Show a loading state immediately so the page isn't blank
  // while the fetch is in flight.
  app.innerHTML = renderLoading();

  let guides;
  try {
    guides = await ensureGuides();
  } catch (err) {
    app.innerHTML = renderError(
      "The server didn't respond, or the guide data isn't available."
    );
    document.title = "Error. Foster Paws";
    return;
  }

  // Home
  if (path === "") {
    app.innerHTML = renderHome(guides);
    document.title = "Foster Paws: A First-Time Foster Parent's Guide";
    return;
  }

  // Detail: guides/:slug
  const match = path.match(/^guides\/([^/]+)$/);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    const guide = guides.find((g) => g.slug === slug);

    if (guide) {
      app.innerHTML = renderDetail(guide);
      document.title = `${guide.title} : Foster Paws`;
      window.scrollTo(0, 0);
      return;
    }
  }

  // 404
  app.innerHTML = renderNotFound(path);
  document.title = "Not Found. Foster Paws";
}

/* ------------------------------------------------------------
   BOOT
   ------------------------------------------------------------ */

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);