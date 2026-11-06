/* =============================================================================
   SHASHA NEXT STEP — APP LOGIC AND RENDERING
   =============================================================================
   This file reads the data from content.js and draws the page. There is no
   wording or link data in here — if you're looking to edit text or links,
   you want content.js instead. This file loads after content.js, so it can
   use everything defined there (TRACKS, STAGES, FORM_URL, etc.) directly.
   ========================================================================== */

/* =====================================================================
   LOGIC (stage only swaps the first to-do for secondary students,
   the obstacle picks the highlighted story)
   ===================================================================== */

const QUESTIONS = [
  { key: "stage", title: "Where are you right now?" },
  { key: "goal", title: "What do you most want to do next?" },
  { key: "obstacle", title: "What is getting in your way?" }
];
const state = { screen: "intro", stage: null, goal: null, obstacle: null };
const app = document.getElementById("app");

function enabledTracks() { return TRACKS.filter(function (t) { return t.enabled; }); }
function obstaclesFor(goal) {
  return OBSTACLES.filter(function (o) { return o.goals.indexOf(goal) >= 0; })
    .map(function (o) { return { id: o.id, label: (o.labels && o.labels[goal]) || o.label }; });
}
function buildKit() {
  const stage = state.stage || "uni";
  const goal = state.goal || "study";
  const obstacle = state.obstacle || "start";
  const track = TRACKS.filter(function (t) { return t.id === goal; })[0] || TRACKS[0];
  const todos = track.todos.slice();
  if (stage === "sec" && (goal === "intern" || goal === "job" || goal === "skills")) todos[0] = SECONDARY_FIRST_TODO;
  // the second to-do swaps in an obstacle-specific tip when the track defines one (content.js, "obstacleTodo") —
  // index 1 on purpose, so it never collides with the secondary-school swap above, which always uses index 0
  if (track.obstacleTodo && track.obstacleTodo[obstacle]) todos[1] = track.obstacleTodo[obstacle];
  let picked = track.stories.findIndex(function (s) { return s.obstacle === obstacle; });
  if (picked < 0) picked = 0;
  return { track: track, todos: todos, picked: picked };
}
function groupsFor(track) {
  const stage = state.stage || "uni";
  const obstacle = state.obstacle || "start";
  const list = track.groups.filter(function (g) { return !(g.skip && g.skip.indexOf(stage) >= 0); });
  const first = list.filter(function (g) { return g.forObstacle && g.forObstacle.indexOf(obstacle) >= 0; });
  const rest = list.filter(function (g) { return !(g.forObstacle && g.forObstacle.indexOf(obstacle) >= 0); });
  return first.concat(rest);
}
function formHref() {
  if (!FORM_URL) return "";
  if (!(FORM_ENTRY.stage && FORM_ENTRY.goal && FORM_ENTRY.obstacle)) return FORM_URL;
  const kit = buildKit();
  const stageLabel = (STAGES.filter(function (s) { return s.id === (state.stage || "uni"); })[0] || {}).label || "";
  const obs = obstaclesFor(kit.track.id).filter(function (o) { return o.id === (state.obstacle || "start"); })[0];
  const params = new URLSearchParams();
  params.set("usp", "pp_url");
  params.set(FORM_ENTRY.stage, stageLabel);
  params.set(FORM_ENTRY.goal, kit.track.title);
  params.set(FORM_ENTRY.obstacle, obs ? obs.label : "Not knowing where to start");
  return FORM_URL + (FORM_URL.indexOf("?") >= 0 ? "&" : "?") + params.toString();
}

/* =====================================================================
   RENDERING
   ===================================================================== */

function h(tag, props) {
  const el = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach(function (k) {
      const v = props[k];
      if (v === false || v === null || v === undefined) return;
      if (k === "class") el.className = v;
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
  }
  for (let i = 2; i < arguments.length; i++) {
    [].concat(arguments[i]).forEach(function (kid) {
      if (kid === null || kid === undefined || kid === false) return;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    });
  }
  return el;
}
function go(screen) { state.screen = screen; render(true); }

// Section headings on the results page grow into place as you scroll down to
// them. Only applied to h2.sec (not the page-title headings, which are
// already on screen the moment a page loads and shouldn't flash invisible
// first). Skipped entirely for people who have asked their device for
// reduced motion.
const revealObserver = (window.matchMedia && matchMedia("(prefers-reduced-motion: no-preference)").matches && "IntersectionObserver" in window)
  ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 })
  : null;
function observeReveals() {
  if (!revealObserver) return;
  app.querySelectorAll("h2.sec").forEach(function (el) {
    el.setAttribute("data-reveal", "");
    revealObserver.observe(el);
  });
}

function render(moveFocus) {
  let view;
  if (state.screen === "intro") view = introView();
  else if (state.screen === "result") view = resultView();
  else view = questionView(Number(state.screen));
  document.body.setAttribute("data-screen", state.screen === "intro" ? "intro" : "app");
  app.replaceChildren(view);
  observeReveals();
  if (moveFocus) {
    window.scrollTo(0, 0);
    const f = app.querySelector("[data-focus]");
    if (f) f.focus({ preventScroll: true });
  }
}

function introView() {
  return h("section", { class: "intro" },
    h("p", { class: "label" }, "Certificate earned"),
    h("h1", { class: "big", tabindex: "-1", "data-focus": "", style: "margin-top:12px" }, "You finished Bridge. Now plan what comes next."),
    h("p", { class: "lead" }, "Answer three quick questions to get a starter pack, real stories and places to look."),
    h("div", null, h("button", { class: "btn primary start", onClick: function () { go(0); } }, "Start"))
  );
}

function questionView(i) {
  const q = QUESTIONS[i];
  let options;
  if (q.key === "stage") options = STAGES;
  else if (q.key === "goal") options = enabledTracks().map(function (t) { return { id: t.id, label: t.title }; });
  else options = obstaclesFor(state.goal || "study");

  const next = h("button", { class: "btn primary grow", disabled: !state[q.key],
    onClick: function () { if (i < 2) go(i + 1); else go("result"); } }, i === 2 ? "See my track" : "Continue");

  const buttons = options.map(function (o) {
    const b = h("button", { class: "option", role: "radio", "aria-checked": String(state[q.key] === o.id),
      onClick: function () {
        state[q.key] = o.id;
        if (q.key === "goal") {
          const valid = obstaclesFor(o.id).map(function (x) { return x.id; });
          if (valid.indexOf(state.obstacle) < 0) state.obstacle = null;
        }
        buttons.forEach(function (x) { x.setAttribute("aria-checked", String(x.dataset.id === o.id)); });
        next.disabled = false;
      } }, o.label);
    b.dataset.id = o.id;
    return b;
  });

  return h("section", { class: "qpage" },
    h("div", { class: "qhead" },
      h("div", { class: "progress", "aria-hidden": "true" }, [0, 1, 2].map(function (n) { return h("span", { class: n <= i ? "on" : "" }); })),
      h("p", { class: "label dim", style: "margin-top:24px" }, "Question " + (i + 1) + " of 3"),
      h("h1", { class: "q", id: "q-" + q.key, tabindex: "-1", "data-focus": "", style: "margin-top:4px" }, q.title)),
    h("div", { class: "qbody" },
      h("div", { class: "options", role: "radiogroup", "aria-labelledby": "q-" + q.key }, buttons),
      h("div", { class: "row", style: "margin-top:32px" },
        h("button", { class: "btn ghost", onClick: function () { go(i === 0 ? "intro" : i - 1); } }, "Back"), next))
  );
}

// A direct audio file (mp3, m4a, wav, ogg) plays inside the page. Any other link opens in a new tab.
function isAudio(u) { return /\.(mp3|m4a|wav|ogg)(\?.*)?$/i.test(u || ""); }

const ICONS = {
  study: '<svg viewBox="0 0 24 24"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M9 8h6"/></svg>',
  intern: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/></svg>',
  job: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/></svg>',
  build: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  skills: '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>'
};

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

function section(label, children) {
  return h("section", { class: "block", id: slug(label) },
    h("h2", { class: "sec", tabindex: "-1" }, label),
    h("div", { class: "body" }, children));
}

// chips in the rail that jump straight to a section, so students on a long page
// can see right away that stories/resources/mistakes exist below, not just scroll into them by accident
const JUMP_SECTIONS = ["Your starter pack", "Stories for this track", "Where to look", "Mistakes to avoid"];
function jumpTo(label) {
  const el = document.getElementById(slug(label));
  if (!el) return;
  const reduceMotion = !(window.matchMedia && matchMedia("(prefers-reduced-motion: no-preference)").matches);
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  const heading = el.querySelector("h2.sec");
  if (heading) heading.focus({ preventScroll: true });
}

function resultView() {
  const kit = buildKit();
  const t = kit.track;

  const chips = enabledTracks().map(function (tr) {
    return h("button", { class: "chip", "aria-pressed": String(tr.id === t.id),
      onClick: function () { state.goal = tr.id; render(true); } }, tr.title);
  });

  const todos = h("ol", { class: "todo" }, kit.todos.map(function (x, idx) {
    return h("li", { class: "card" },
      h("span", { class: "n", "aria-hidden": "true" }, String(idx + 1)),
      h("span", null, x.text,
        x.url ? h("a", { class: "ext", href: x.url, target: "_blank", rel: "noopener noreferrer" }, (x.label || "Open") + " →") : null));
  }));

  const stories = h("ul", { class: "list storylist" }, t.stories.map(function (s, idx) {
    const picked = idx === kit.picked;
    const ready = !!(s.link || s.audio);
    const audioEl = isAudio(s.audio) ? h("audio", { controls: true, preload: "none", src: s.audio }) : null;
    // the orange circle actually plays/pauses the <audio> above — only shown when there is real inline audio to control
    let playBtn = null;
    if (audioEl) {
      playBtn = h("button", { class: "play", type: "button", "aria-label": "Play this story",
        onClick: function () { if (audioEl.paused) audioEl.play(); else audioEl.pause(); } });
      audioEl.addEventListener("play", function () { playBtn.classList.add("is-playing"); playBtn.setAttribute("aria-label", "Pause this story"); });
      audioEl.addEventListener("pause", function () { playBtn.classList.remove("is-playing"); playBtn.setAttribute("aria-label", "Play this story"); });
      audioEl.addEventListener("ended", function () { playBtn.classList.remove("is-playing"); playBtn.setAttribute("aria-label", "Play this story"); });
    }
    return h("li", { class: "story" + (picked ? " picked" : "") },
      h("div", { class: "kind" }, h("span", { class: "label" }, s.tag), picked ? h("span", { class: "pill" }, "Picked for you") : null, playBtn),
      h("h3", null, s.title),
      ready
        ? h("div", { class: "go" },
            audioEl,
            s.link ? h("a", { href: s.link, target: "_blank", rel: "noopener noreferrer" }, "Listen or watch →") : null,
            (s.audio && !isAudio(s.audio)) ? h("a", { href: s.audio, target: "_blank", rel: "noopener noreferrer" }, "Audio only") : null)
        : h("p", { class: "soon" }, "Coming soon"));
  }));

  const dirWrap = h("div", { class: "directory" });
  const dirGroups = groupsFor(t);
  // default to just the first category when a tab has several, so the long combined list never shows until asked for
  function defaultSubFilter(g) { return g.subs.length > 1 ? g.subs[0].label : "all"; }
  let dirCurrent = 0;
  let subFilter = defaultSubFilter(dirGroups[0]);
  function drawDir() {
    const g = dirGroups[dirCurrent];
    // when a tab has several categories, a dropdown lets students narrow it instead of scrolling one long table
    const visibleSubs = (subFilter === "all") ? g.subs : g.subs.filter(function (sub) { return sub.label === subFilter; });
    const narrow = g.subs.length > 1
      ? (function () {
          // categories come first since one of them is the default; "all" is listed last as a deliberate "see everything" choice, not the suggested one
          const sel = h("select", { class: "subfilter-select", "aria-label": "Category",
            onChange: function (e) { subFilter = e.target.value; drawDir(); } },
            g.subs.map(function (sub) { return h("option", { value: sub.label }, sub.label + " (" + sub.items.length + ")"); }),
            h("option", { value: "all" }, "All categories (" + g.subs.reduce(function (n, s) { return n + s.items.length; }, 0) + " links)"));
          sel.value = subFilter;
          const subIndex = g.subs.findIndex(function (sub) { return sub.label === subFilter; });
          const hint = subFilter === "all" ? "showing all " + g.subs.length : "showing " + (subIndex + 1) + " of " + g.subs.length;
          return h("div", { class: "subfilter" },
            h("label", { class: "label dim" }, "Category"), sel,
            h("span", { class: "subfilter-hint" }, hint));
        })()
      : null;
    // native replaceChildren stringifies null/undefined into a literal "null"/"undefined" text node — h() filters those, this doesn't, so filter manually here
    dirWrap.replaceChildren.apply(dirWrap, [
      h("div", { class: "tabs", role: "tablist" }, dirGroups.map(function (gr, i) {
        return h("button", { class: "tab", role: "tab", "aria-selected": String(i === dirCurrent),
          onClick: function () { dirCurrent = i; subFilter = defaultSubFilter(dirGroups[i]); drawDir(); } }, gr.title);
      })),
      narrow,
      h("div", { class: "tablewrap" },
        h("table", { class: "dir" },
          h("thead", null, h("tr", null, h("th", { scope: "col" }, "Name"), h("th", { scope: "col" }, "Best for"))),
          visibleSubs.map(function (sub) {
            return h("tbody", null,
              h("tr", { class: "subhead" }, h("th", { colspan: "2", scope: "colgroup" }, sub.label)),
              sub.items.map(function (w) {
                return h("tr", null,
                  h("td", null, h("a", { href: w.url, target: "_blank", rel: "noopener noreferrer" }, w.name)),
                  h("td", null, w.tag));
              }));
          })))
    ].filter(Boolean));
  }
  drawDir();
  const placesEl = h("div", null, dirWrap,
    h("p", { class: "fine" }, "Check eligibility and deadlines on each page before you apply."));

  const mistakes = h("ul", { class: "list mistakes" }, t.mistakes.map(function (m) { return h("li", null, m); }));

  const href = formHref();
  const feedback = h("section", { class: "feedback no-print" },
    h("h2", { style: "font-size:26px" }, "Help Shasha improve this page"),
    h("p", null, "Share what you picked and what was useful. It takes about a minute and is optional."),
    href
      ? h("a", { class: "btn primary", href: href, target: "_blank", rel: "noopener noreferrer" }, "Share your answers")
      : h("p", { style: "margin-top:12px;font-size:14px;color:var(--subtle)" }, "Form link coming soon."));

  const iconEl = h("span", { class: "ticon", "aria-hidden": "true" });
  iconEl.innerHTML = ICONS[t.id] || "";
  return h("article", { class: "result" },
    h("aside", { class: "rail" },
      iconEl,
      h("h1", { class: "big", tabindex: "-1", "data-focus": "", style: "margin-top:16px" }, t.title),
      h("div", { class: "no-print", style: "margin-top:20px" },
        h("p", { class: "label dim" }, "Explore other tracks"),
        h("div", { class: "chips" }, chips)),
      h("div", { class: "no-print", style: "margin-top:20px" },
        h("p", { class: "label dim" }, "Jump to"),
        h("div", { class: "chips" }, JUMP_SECTIONS.map(function (label) {
          return h("button", { class: "chip", onClick: function () { jumpTo(label); } }, label);
        })))),
    h("div", { class: "main" },
    section("Your starter pack", todos),
    section("Stories for this track", stories),
    section("Where to look", placesEl),
    section("Mistakes to avoid", mistakes),
    feedback,
    h("footer", { class: "end" },
      h("p", null, "Have feedback or a resource we should add? Email ",
        h("a", { href: "mailto:" + SITE.contact }, SITE.contact)),
      h("div", { class: "btns no-print" },
        h("button", { class: "btn ghost", onClick: function () { state.stage = null; state.goal = null; state.obstacle = null; go(0); } }, "Retake the questions"),
        h("button", { class: "btn ghost", onClick: function () { state.stage = null; state.goal = null; state.obstacle = null; go("intro"); } }, "Done — back to start")))
    )
  );
}

render(false);
