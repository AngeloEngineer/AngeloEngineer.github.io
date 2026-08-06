/* ═══════════════════════════════════════════════
   PORTFOLIO – SCRIPT.JS
   Canvas background · Navbar · Reveal · Counter
   Projects (rendu découplé depuis projects.json)
   Filter · Form · Mobile menu · Service Worker
═══════════════════════════════════════════════ */

/* ─────────────────── CANVAS PARTICLE BG ─────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const COLORS = ['#ea7c00', '#f59e0b', '#1d5fcc', '#3b82f6', '#d4930a'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15
    };
  }

  function init() {
    resize();
    particles = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < count; i++) particles.push(makeParticle());
  }

  function drawConnections() {
    const DIST = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(234,124,0,${0.08 * (1 - dist / DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    animId = requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => { cancelAnimationFrame(animId); init(); tick(); });
  init();
  tick();
})();


/* ─────────────────── NAVBAR SCROLL ─────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ─────────────────── MOBILE MENU ─────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate bars
  const bars = hamburger.querySelectorAll('span');
  if (isOpen) {
    bars[0].style.cssText = 'transform: rotate(45deg) translate(5px,5px)';
    bars[1].style.cssText = 'opacity:0';
    bars[2].style.cssText = 'transform: rotate(-45deg) translate(5px,-5px)';
  } else {
    bars[0].style.cssText = '';
    bars[1].style.cssText = '';
    bars[2].style.cssText = '';
  }
});

// Close on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});


/* ─────────────────── REVEAL ON SCROLL ─────────────────── */
const revealEls = document.querySelectorAll('.reveal');

function checkReveal() {
  const triggerBottom = window.innerHeight * 0.88;
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add('visible');
      // Trigger prof-fill bars inside the element
      el.querySelectorAll('.prof-fill').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--w') || getComputedStyle(bar).getPropertyValue('--w');
      });
    }
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate proficiency bars
      entry.target.querySelectorAll('.prof-fill').forEach(bar => {
        const w = getComputedStyle(bar).getPropertyValue('--w').trim();
        if (w) bar.style.width = w;
      });
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

function observeReveal(root) {
  (root || document).querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// Also handle proficiency bars inside expertise cards
document.querySelectorAll('.expertise-card').forEach(card => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.prof-fill').forEach(bar => {
          const w = getComputedStyle(bar).getPropertyValue('--w').trim();
          if (w) bar.style.width = w;
        });
      }
    });
  }, { threshold: 0.3 });
  observer.observe(card);
});


/* ─────────────────── COUNTER ANIMATION ─────────────────── */
function animateCounter(el, target, duration = 1600) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target, 10);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));


/* ─────────────────── PROJECT FILTER ─────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');

function applyFilter(filter) {
  document.querySelectorAll('#projects-grid .project-card').forEach(card => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !match);
    if (match) setTimeout(() => card.classList.add('visible'), 10);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});


/* ─────────────────── PROJECTS – RENDU DÉCOUPLÉ ───────────────────
   Les projets vivent dans projects.json (pattern "headless").
   Le HTML ne contient qu'une grille vide ; cette section la remplit. */
function decodeEntities(str) {
  const doc = new DOMParser().parseFromString(`<pre>${str}</pre>`, 'text/html');
  return doc.querySelector('pre').textContent;
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card' + (project.featured ? ' featured' : '') + ' reveal';
  card.dataset.category = project.category;

  if (project.featured) {
    const badge = document.createElement('span');
    badge.className = 'featured-badge';
    badge.textContent = 'Projet vedette';
    card.appendChild(badge);
  }

  const top = document.createElement('div');
  top.className = 'project-top';

  const icon = document.createElement('div');
  icon.className = `project-icon ${project.category}-icon`;
  icon.innerHTML = `<svg width="22" height="22" aria-hidden="true"><use href="#i-${project.icon}"/></svg>`;
  top.appendChild(icon);

  (project.tags || []).forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = `ptag ${tag.cls}`;
    tagEl.textContent = tag.label;
    top.appendChild(tagEl);
  });
  card.appendChild(top);

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = decodeEntities(project.title);
  card.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'project-desc';
  desc.textContent = decodeEntities(project.description);
  card.appendChild(desc);

  const tech = document.createElement('div');
  tech.className = 'project-tech';
  (project.tech || []).forEach(t => {
    const chip = document.createElement('span');
    chip.textContent = t;
    tech.appendChild(chip);
  });
  card.appendChild(tech);

  const links = document.createElement('div');
  links.className = 'project-links';
  (project.links || []).forEach(link => {
    const a = document.createElement('a');
    a.className = 'plink' + (link.demo ? ' demo' : '');
    a.href = link.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `<svg width="14" height="14" aria-hidden="true"><use href="#i-${link.icon}"/></svg>${link.label}`;
    links.appendChild(a);
  });
  card.appendChild(links);

  return card;
}

function renderTechStack(projects) {
  const host = document.querySelector('.tech-stack');
  if (!host) return;
  const seen = new Set();
  projects.forEach(p => (p.tech || []).forEach(t => seen.add(t)));
  [...seen].forEach(t => {
    const chip = document.createElement('span');
    chip.textContent = t;
    host.appendChild(chip);
  });
}

function createEmptyTile() {
  const tile = document.createElement('div');
  tile.className = 'project-card tile-empty reveal';
  tile.dataset.category = 'all';
  const inner = document.createElement('div');
  inner.className = 'tile-empty-inner';
  inner.innerHTML = `<svg width="20" height="20" aria-hidden="true"><use href="#i-plus"/></svg><span>À venir</span>`;
  tile.appendChild(inner);
  return tile;
}

function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const host = document.getElementById('projects-data');
  let projects = [];
  if (host) {
    try {
      projects = JSON.parse(host.textContent);
    } catch (e) {
      projects = [];
    }
  }

  if (!projects.length) {
    grid.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem">Aucun projet à afficher pour le moment.</p>';
    return;
  }

  const MAX_TILES = 9;
  const frag = document.createDocumentFragment();
  projects.slice(0, MAX_TILES).forEach(p => frag.appendChild(createProjectCard(p)));
  for (let i = projects.length; i < MAX_TILES; i++) frag.appendChild(createEmptyTile());
  grid.appendChild(frag);

  observeReveal(grid);
  bindTilt();
  renderTechStack(projects);
}

loadProjects();


/* ─────────────────── CONTACT FORM ─────────────────── */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Visual feedback
  const originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = `<span>Envoi en cours...</span>
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>`;
  submitBtn.disabled = true;

  // Simulate sending (replace with your backend/EmailJS/Formspree)
  await new Promise(r => setTimeout(r, 1800));

  submitBtn.innerHTML = `<span>Message envoyé</span>`;
  submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

  setTimeout(() => {
    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
    submitBtn.style.background = '';
    form.reset();
  }, 3500);
});


/* ─────────────────── SMOOTH ACTIVE NAV LINK ─────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });


/* ─────────────────── CURSOR GLOW EFFECT ─────────────────── */
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(234,124,0,0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
})();


/* ─────────────────── TILT ON EXPERTISE / PROJECT CARDS ─────────────────── */
function bindTilt() {
  document.querySelectorAll('.expertise-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
      card.style.transformOrigin = 'center center';
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    });
  });
}

bindTilt();


/* ─────────────────── TYPING EFFECT ON HERO ─────────────────── */
// Désactivé : le titre du hero est statique et l'effet écraserait
// le texte "donnée brute" du span .gradient-text.


/* ─────────────────── INIT ─────────────────── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.offsetHeight; // reflow
  document.body.style.opacity = '1';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
