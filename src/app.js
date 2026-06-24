const key = "md:memories";
const HL = 7; // half-life days
const FRESH = 3, DECAYED = 10;

const $ = s => document.querySelector(s);
const els = {
  title: $("#title"), content: $("#content"),
  saveForm: $("#saveForm"), saveState: $("#saveState"),
  results: $("#results"), count: $("#count"),
  memoryMode: $("#memoryMode"), seedDemo: $("#seedDemo"),
  clearLocal: $("#clearLocal"), canvas: $("#particles"),
};

let memories = read();

function read() {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function write() { localStorage.setItem(key, JSON.stringify(memories.slice(0, 200))); }

// Decay math
const days = ts => (Date.now() - ts) / 86400000;
const clarity = d => Math.max(0.05, Math.pow(0.5, d / HL));
const state = d => d <= FRESH ? "fresh" : d <= DECAYED ? "fading" : "decayed";

// Text corruption based on decay
function corrupt(text, d) {
  if (d <= FRESH) return text;
  const c = clarity(d);
  return text.split(/\s+/).map(w => {
    if (d > DECAYED) return Math.random() < c * 0.5 ? w : `<span class="missing">${w[0]}…</span>`;
    return Math.random() < c ? w : `<span class="missing">…</span>`;
  }).join(" ");
}

// --- Render ---
function render() {
  if (!memories.length) {
    els.results.innerHTML = `<div class="emptyState">
      <p><strong>No memories yet.</strong></p>
      <p>Save something. Come back tomorrow. Watch it age.</p>
    </div>`;
    els.count.textContent = "0 memories";
    return;
  }

  els.results.innerHTML = memories.map((m, i) => {
    const d = days(m.refreshed || m.createdAt);
    const st = state(d);
    const cl = clarity(d);
    const pct = Math.round(cl * 100);
    const label = st === "fresh" ? "clear" : `${Math.round(d)}d ${st}`;

    return `<div class="memoryCard ${st}" data-idx="${i}">
      ${st === "decayed" ? '<div class="ripple"></div>' : ""}
      <div class="cardTop">
        <h3>${esc(m.title)}</h3>
        <div class="decayMeter">
          <div class="decayLabel ${st}">${label}</div>
          <div class="decayBar"><div class="decayFill ${st}" style="width:${pct}%"></div></div>
        </div>
      </div>
      <div class="memoryContent">${corrupt(m.content, d)}</div>
      <div class="cardFoot">
        <span>${fmt(m.createdAt)}${m.refreshed && m.refreshed !== m.createdAt ? ` · refreshed ${fmt(m.refreshed)}` : ""}</span>
        <button class="btnRefresh" data-idx="${i}">
          <span class="icon">↻</span> Refresh
        </button>
      </div>
    </div>`;
  }).join("");

  els.count.textContent = `${memories.length} memories`;

  // Bind refresh buttons
  els.results.querySelectorAll(".btnRefresh").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const idx = +btn.dataset.idx;
      const card = els.results.querySelector(`[data-idx="${idx}"]`);
      memories[idx].refreshed = Date.now();
      write();
      card.classList.add("revealing");
      setTimeout(() => {
        render();
      }, 500);
    });
  });
}

function esc(v) { return String(v).replace(/[&<>'"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;" }[c])); }
function fmt(ts) { return new Date(ts).toLocaleString([], { month:"short", day:"numeric" }); }

// --- Save ---
els.saveForm.addEventListener("submit", e => {
  e.preventDefault();
  const t = els.title.value.trim(), c = els.content.value.trim();
  if (!t || !c) return;
  memories.unshift({ title: t, content: c, createdAt: Date.now() });
  write();
  render();
  els.title.value = els.content.value = "";
  els.saveState.textContent = "Stored ✓";
  setTimeout(() => els.saveState.textContent = "", 2000);
});

// --- Seed ---
els.seedDemo.addEventListener("click", () => {
  const now = Date.now();
  memories = [
    { title: "Walrus is just decentralized S3", content: "Hot take from day one. Every crypto storage project claims this. But the difference: blob encoding, erasure coding, Sui settlement layer. Let's see if I still believe this in a month.", createdAt: now - d(0.3), refreshed: now - d(0.3) },
    { title: "API key rotation schedule", content: "Production keys rotate every 30 days. Staging: 90 days. Dev: never (lol). The prod key lives in 1Password under 'API Keys'. Staging key starts with sk-stg-.", createdAt: now - d(5), refreshed: now - d(5) },
    { title: "Meeting: Q3 roadmap", content: "Priority 1: multi-tenant support. Priority 2: webhook retry with exponential backoff. Priority 3: audit logging. Timeline: P1 by Aug 15, P2 by Sep 1. Assigned: Sarah (P1), Miguel (P2).", createdAt: now - d(13), refreshed: now - d(13) },
    { title: "Grandma's sambal recipe", content: "20 red chilies, 5 bird's eye chilies, 8 shallots, 4 garlic cloves, 2 tomatoes, 1 tsp shrimp paste, salt, sugar, lime juice. Fry everything until fragrant, then grind. The secret: don't rush the frying.", createdAt: now - d(32), refreshed: now - d(32) },
    { title: "Why I left my last job", content: "Three reasons: no growth path after senior, compensation plateaued despite 2x output, and the CTO kept overriding technical decisions. Burnout was real. Took 3 months to recover.", createdAt: now - d(65), refreshed: now - d(65) },
  ];
  write();
  render();
  els.saveState.textContent = "5 demo memories loaded ✓";
  setTimeout(() => els.saveState.textContent = "", 3000);
});

function d(days) { return days * 86400000; }

// --- Clear ---
els.clearLocal.addEventListener("click", () => {
  memories = []; write(); render();
});

// --- Particle canvas ---
function particles() {
  const c = els.canvas, ctx = c.getContext("2d");
  const pts = Array.from({length: 40}, () => ({
    x: Math.random(), y: Math.random(), r: .6 + Math.random() * 1.4,
    vx: (Math.random() - .5) * .15, vy: (Math.random() - .5) * .15 - .1,
    o: .15 + Math.random() * .25,
  }));
  let raf;
  function resize() {
    const r = c.getBoundingClientRect();
    c.width = r.width * devicePixelRatio;
    c.height = r.height * devicePixelRatio;
  }
  function frame() {
    resize();
    ctx.clearRect(0, 0, c.width, c.height);
    const w = c.width / devicePixelRatio, h = c.height / devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    pts.forEach(p => {
      p.x += p.vx * .01; p.y += p.vy * .01;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37,99,235,${p.o})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
}
particles();

render();
