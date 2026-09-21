//  Hash-based router, guide data, view renderers

const GUIDES = [
  {
    slug: "preparing-your-home",
    title: "Preparing Your Home",
    shortDescription:
      "Set up a safe, calm space before your foster arrives, a little prep goes a long way.",
    image: "home",
    difficulty: "Beginner",
    timeCommitment: "2-3 hours setup",
    checklist: [
      "Pick a quiet room away from heavy foot traffic",
      "Remove cables, small objects, and toxic plants",
      "Set up a crate, bed, or cozy corner with a soft blanket",
      "Stock food, water bowls, and a few toys",
      "Have a vet's number saved and a carrier or leash ready"
    ],
    commonMistakes: [
      "Giving the foster the run of the whole house on day one",
      "Buying too much gear before you know the animal's needs",
      "Skipping a quiet decompression space"
    ],
    proTip:
      "Less is more on day one. A calm, small space helps your foster feel safe faster than a big, exciting house."
  },
  {
    slug: "first-48-hours",
    title: "The First 48 Hours",
    shortDescription:
      "The decompression window. Your job is mostly to be calm, present, and patient.",
    image: "clock",
    difficulty: "Beginner",
    timeCommitment: "Ongoing for 2 days",
    checklist: [
      "Keep introductions quiet and low-key",
      "Let the animal come to you, don't force contact",
      "Offer food and water, but don't stress if they don't eat yet",
      "Watch for signs of stress: pacing, hiding, panting",
      "Stick to a simple routine: feed, potty, rest, repeat"
    ],
    commonMistakes: [
      "Inviting friends over to meet the new foster",
      "Expecting instant affection or playfulness",
      "Interpreting hiding as 'they don't like me'"
    ],
    proTip:
      "The 3-3-3 rule is your friend: 3 days to decompress, 3 weeks to settle, 3 months to feel at home. Day one is just the start."
  },
  {
    slug: "feeding-and-nutrition",
    title: "Feeding & Nutrition",
    shortDescription:
      "What, when, and how much to feed; plus how to handle a picky or stressed eater.",
    image: "bowl",
    difficulty: "Beginner",
    timeCommitment: "Daily",
    checklist: [
      "Ask the shelter what the animal was already eating",
      "Transition foods gradually over 5–7 days",
      "Feed at the same times each day to build routine",
      "Keep fresh water available at all times",
      "Measure portions, free-feeding can mask problems"
    ],
    commonMistakes: [
      "Switching foods abruptly (upset stomach guaranteed)",
      "Sharing table scraps, especially onions, garlic, chocolate, grapes",
      "Leaving food out all day for dogs, it hides appetite changes"
    ],
    proTip:
      "A sudden change in appetite is one of the earliest signals something's off. Note it, and mention it to your vet or shelter contact."
  },
  {
    slug: "vet-visits",
    title: "Vet Visits & Health Checks",
    shortDescription:
      "Most fosters come with a vet plan. Here's how to make visits calm and useful.",
    image: "heart",
    difficulty: "Beginner",
    timeCommitment: "1-2 visits in the first month",
    checklist: [
      "Confirm who covers vet costs, you or the shelter",
      "Bring any paperwork the shelter gave you",
      "Note any symptoms, appetite changes, or behavior shifts",
      "Ask about vaccines, deworming, and spay/neuter timing",
      "Keep a simple log of weight and eating habits"
    ],
    commonMistakes: [
      "Waiting too long to call about a concern",
      "Forgetting to mention behavior changes, not just physical ones",
      "Not asking who to call after hours"
    ],
    proTip:
      "Take a photo of the vet's discharge instructions. You'll thank yourself at 11pm when you can't remember the dosage."
  },
  {
    slug: "behavior-and-stress",
    title: "Managing Behavior & Stress",
    shortDescription:
      "Fosters often arrive scared, not 'bad.' Reading their signals makes all the difference.",
    image: "paw",
    difficulty: "Intermediate",
    timeCommitment: "Daily, ongoing",
    checklist: [
      "Learn basic calming signals: lip licking, yawning, turning away",
      "Give the animal a safe retreat they can always access",
      "Use positive reinforcement; treats, praise, gentle play",
      "Keep sessions short; end on a win",
      "Document patterns so you can share them with the shelter"
    ],
    commonMistakes: [
      "Punishing growls or hisses; they're warnings, not aggression",
      "Forcing interaction when the animal is retreating",
      "Assuming behavior at week one is permanent"
    ],
    proTip:
      "A growl is a gift; it tells you the animal is uncomfortable before anything escalates. Never punish it. Listen to it."
  },
  {
    slug: "saying-goodbye",
    title: "Saying Goodbye (The Happy Kind)",
    shortDescription:
      "The hardest and most beautiful part of fostering: handing them over to their forever home.",
    image: "sun",
    difficulty: "Emotional",
    timeCommitment: "One day - and a lifetime of memory",
    checklist: [
      "Ask the shelter how adoption day works ahead of time",
      "Write down everything you've learned about the animal",
      "Send favorite toys or a blanket with them",
      "Take one last photo! (You'll want it)",
      "Give yourself permission to be sad and proud at once"
    ],
    commonMistakes: [
      "Not preparing emotionally for the handoff",
      "Forgetting to pass along quirks and preferences to the new family",
      "Thinking 'I'm not cut out for this' when it hurts"
    ],
    proTip:
      "Foster grief is real and it's a sign you did it right. Every goodbye makes room for the next animal who needs you."
  }
];

/* ------------------------------------------------------------
   2. VIEW HELPERS
   ------------------------------------------------------------ */

/**
 * Inline SVG placeholders - keyed by the guide's `image` field.
 * Swap these for real <img> tags later when you have photos.
 */
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
    paw:`<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Paw illustration">
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

/** Escape user/database-supplied strings before injecting into HTML. */
function esc(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/* ------------------------------------------------------------
   3. VIEWS (each returns an HTML string)
   ------------------------------------------------------------ */

function renderHome() {
  const cards = GUIDES.map(
    (g) => `
      <a href="#/guides/${esc(g.slug)}" class="guide-card" aria-label="Read guide: ${esc(g.title)}">
        <div class="guide-card__image">${placeholderSVG(g.image)}</div>
        <h3 class="guide-card__title">${esc(g.title)}</h3>
        <p class="guide-card__desc">${esc(g.shortDescription)}</p>
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
  const mistakes  = guide.commonMistakes.map((item) => `<li>${esc(item)}</li>`).join("");

  return `
    <article class="detail">
      <a href="#/" class="detail__back">← Back to all guides</a>

      <div class="detail__image">${placeholderSVG(guide.image)}</div>

      <h2 class="detail__title">${esc(guide.title)}</h2>
      <p>${esc(guide.shortDescription)}</p>

      <div class="detail__meta">
        <span class="detail__badge">${esc(guide.difficulty)}</span>
        <span class="detail__badge detail__badge--time">${esc(guide.timeCommitment)}</span>
      </div>

      <h3> <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#259d04"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> Checklist</h3>
      <ul>${checklist}</ul>

      <h3><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#da9d0d"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm330.5-51.5Q520-263 520-280t-11.5-28.5Q497-320 480-320t-28.5 11.5Q440-297 440-280t11.5 28.5Q463-240 480-240t28.5-11.5ZM440-360h80v-200h-80v200Zm40-100Z"/></svg> Common Mistakes</h3>
      <ul>${mistakes}</ul>

      <div class="pro-tip">
        <strong>Pro tip:</strong> ${esc(guide.proTip)}
      </div>
    </article>
  `;
}

function renderNotFound(path) {
  return `
    <section class="not-found">
      <h2>🐾 Oops... no guide here</h2>
      <p>We couldn't find anything at <code>${esc(path)}</code>.</p>
      <p>That page may have moved, or the link might have a typo.</p>
      <p><a href="#/" role="button">Back to all guides</a></p>
    </section>
  `;
}

/* ------------------------------------------------------------
   4. ROUTER
   Hash format:  #/               → home
                 #/guides/:slug   → detail
                 anything else    → 404
   ------------------------------------------------------------ */

function router() {
  const app = document.getElementById("app");
  const hash = window.location.hash || "#/";

  // Strip leading "#/" and any trailing slash → e.g. "guides/vet-visits"
  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");

  // Home
  if (path === "") {
    app.innerHTML = renderHome();
    document.title = "Foster Paws: A First-Time Foster Parent's Guide";
    return;
  }

  // Detail: guides/:slug
  const match = path.match(/^guides\/([^/]+)$/);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    const guide = GUIDES.find((g) => g.slug === slug);

    if (guide) {
      app.innerHTML = renderDetail(guide);
      document.title = `${guide.title} - Foster Paws`;
      window.scrollTo(0, 0);
      return;
    }
  }

  // 404
  app.innerHTML = renderNotFound(path);
  document.title = "Not Found - Foster Paws";
}

/* ------------------------------------------------------------
   5. BOOT
   ------------------------------------------------------------ */

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);