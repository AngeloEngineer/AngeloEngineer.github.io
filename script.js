/* ═══════════════════════════════════════════════
   PORTFOLIO PREMIUM — SCRIPT.JS
   Loader · Lenis smooth scroll · GSAP ScrollTrigger
   WebGL (Three.js) · Navbar · Reveal · Counter
   Projets (rendu découplé) · Filters · Form · SW
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────── PRELOADER ─────────────────── */
  const loader = document.getElementById('loader');
  function hideLoader() {
    if (!loader) return;
    loader.classList.add('done');
    document.body.classList.remove('no-scroll');
  }
  document.body.classList.add('no-scroll');

  const boot = () => {
    setTimeout(hideLoader, prefersReduced ? 100 : 900);
    bootHero();
  };

  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);

  /* ─────────────────── HERO INTRO ─────────────────── */
  function bootHero() {
    document.querySelectorAll('#hero .reveal').forEach((el) => {
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
    });
  }

  /* ─────────────────── LENIS — SMOOTH SCROLL ─────────────────── */
  let lenis = null;
  if (window.Lenis && !prefersReduced) {
    try {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
      });

      function lenisRaf(time) {
        lenis.raf(time);
        requestAnimationFrame(lenisRaf);
      }
      requestAnimationFrame(lenisRaf);
    } catch (e) {
      lenis = null;
    }
  }

  // Ancres : on scroll doucement (Lenis si dispo, sinon scrollIntoView)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ─────────────────── GSAP + SCROLLTRIGGER (polish) ─────────────────── */
  if (window.gsap && window.ScrollTrigger && !prefersReduced) {
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Parallaxe sur la photo / halo
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.06;
      gsap.to(el, {
        y: () => -(speed * 160),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  /* ─────────────────── SCROLL POSITION ─────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', onScroll, { passive: true });
    if (lenis) lenis.on('scroll', onScroll);
  }

  const progressBar = document.getElementById('scroll-progress');

function onScroll() {
    const y = window.scrollY || (lenis && lenis.actualScroll) || 0;
    if (navbar) navbar.classList.toggle('scrolled', y > 50);
    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = max > 0 ? (y / max) * 100 + '%' : '0%';
    }
    updateActiveNav();
  }

  /* ─────────────────── MOBILE MENU ─────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const bars = hamburger.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.cssText = 'transform: rotate(45deg) translate(5px,5px)';
        bars[1].style.cssText = 'opacity:0';
        bars[2].style.cssText = 'transform: rotate(-45deg) translate(5px,-5px)';
      } else {
        bars.forEach((s) => (s.style.cssText = ''));
      }
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach((s) => (s.style.cssText = ''));
      });
    });
  }

  /* ─────────────────── REVEAL ON SCROLL ─────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.12 }
  );

  function observeReveal(root) {
    (root || document).querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  }
  observeReveal(document);

  /* ─────────────────── COUNTER ANIMATION ─────────────────── */
  function animateCounter(el, target, duration = 1400) {
    if (prefersReduced) {
      el.textContent = target;
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target, 10);
          if (!isNaN(target)) animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-num').forEach((el) => counterObserver.observe(el));

  /* ═══════════════════════════════════════════════
     WEBGL — FOND DE PARTICULES DORÉES (Three.js)
     Dégradation : halo CSS si la lib est absente.
  ═══════════════════════════════════════════════ */
  (function initWebGL() {
    const canvas = document.getElementById('webgl');
    if (!canvas) return;
    if (prefersReduced || window.__noThree || !window.THREE) return;

    try {
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 12;

      // Sphère wireframe décorative, très discrète
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4.4, 22, 14),
        new THREE.MeshBasicMaterial({
          color: 0x0056d2,
          wireframe: true,
          transparent: true,
          opacity: 0.08,
        })
      );
      sphere.position.set(2.4, -0.6, -6);
      scene.add(sphere);

      // Particules flottantes (points), bleu royal. Nombre réduit : plus léger que lumineux.
      const COUNT = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 9500));
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const royal = new THREE.Color(0x0056d2);
      const royalLight = new THREE.Color(0x7fb2f5);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 36;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
        const c = royal.lerp(royalLight, Math.random());
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const points = new THREE.Points(pGeo, pMat);
      scene.add(points);

      // Parallaxe à la souris
      const mouse = { x: 0, y: 0 };
      window.addEventListener(
        'pointermove',
        (e) => {
          mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
        },
        { passive: true }
      );

      let visible = true;
      document.addEventListener('visibilitychange', () => {
        visible = !document.hidden;
      });

      const clock = new THREE.Clock();
      function animate() {
        if (!visible) {
          requestAnimationFrame(animate);
          return;
        }
        const t = clock.getElapsedTime();
        sphere.rotation.x = t * 0.06;
        sphere.rotation.y = t * 0.09;
        points.rotation.y = t * 0.014;

        camera.position.x += (mouse.x * 0.9 - camera.position.x) * 0.04;
        camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    } catch (e) {
      document.getElementById('webgl-glow').style.opacity = '1';
    }
  })();

  /* ─────────────────── MARQUEE ─────────────────── */
  (function buildMarquee() {
    const track = document.getElementById('marquee');
    if (!track) return;
    const words = [
      'Python', 'SQL', 'PostgreSQL', 'Apache Airflow', 'PySpark',
      'dbt', 'BigQuery', 'Docker', 'Streamlit', 'Metabase',
      'FastAPI', 'Scikit-learn', 'ETL / ELT', 'CI / CD', 'Grafana',
    ];
    const fillRow = () => {
      const row = document.createElement('div');
      row.className = 'marquee-row';
      words.forEach((w, i) => {
        const item = document.createElement('span');
        item.className = 'marquee-item';
        item.textContent = w;
        row.appendChild(item);
        if (i < words.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'marquee-sep';
          sep.textContent = '◆';
          row.appendChild(sep);
        }
      });
      return row;
    };

    track.appendChild(fillRow());
    track.appendChild(fillRow());
  })();

  /* ─────────────────── PROJECT FILTER ─────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');

  function applyFilter(filter) {
    document.querySelectorAll('#projects-grid .project-card').forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (match) card.classList.add('visible');
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  /* ─────────────────── PROJETS — RENDU DÉCOUPLÉ ─────────────────── */
  function decodeEntities(str) {
    const doc = new DOMParser().parseFromString(`<pre>${str}</pre>`, 'text/html');
    return doc.querySelector('pre').textContent;
  }

  function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.dataset.category = project.category;

    const top = document.createElement('div');
    top.className = 'project-top';

    const icon = document.createElement('div');
    icon.className = 'project-icon';
    icon.innerHTML = `<svg width="24" height="24" aria-hidden="true"><use href="#i-${project.icon}"/></svg>`;
    top.appendChild(icon);

    (project.tags || []).forEach((tag) => {
      const tagEl = document.createElement('span');
      tagEl.className = 'ptag';
      tagEl.textContent = tag.label;
      top.appendChild(tagEl);
    });
    card.appendChild(top);

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = decodeEntities(project.title);
    card.appendChild(title);

    const desc = document.createElement('div');
    desc.className = 'project-desc';
    const track = document.createElement('div');
    track.className = 'project-desc-track';
    const seg = document.createElement('p');
    seg.className = 'project-desc-seg';
    seg.textContent = decodeEntities(project.description);
    track.appendChild(seg);
    desc.appendChild(track);
    card.appendChild(desc);

    const tech = document.createElement('div');
    tech.className = 'project-tech';
    (project.tech || []).forEach((t) => {
      const chip = document.createElement('span');
      chip.textContent = t;
      tech.appendChild(chip);
    });
    card.appendChild(tech);

    const links = document.createElement('div');
    links.className = 'project-links';
    (project.links || []).forEach((link) => {
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
    projects.forEach((p) => (p.tech || []).forEach((t) => seen.add(t)));
    [...seen].forEach((t) => {
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
      grid.innerHTML =
        '<p style="color:var(--text-muted);font-size:0.9rem">Aucun projet à afficher pour le moment.</p>';
      return;
    }

    const MAX_TILES = 9;
    const frag = document.createDocumentFragment();
    projects.slice(0, MAX_TILES).forEach((p) => frag.appendChild(createProjectCard(p)));
    for (let i = projects.length; i < MAX_TILES; i++) frag.appendChild(createEmptyTile());
    grid.appendChild(frag);

    observeReveal(grid);
    renderTechStack(projects);
    setupDescScrolls(grid);
  }

  loadProjects();

  /* ─────────────────── DESC — DÉFILEMENT VERTICAL AUTO ───────────────────
     Si la description dépasse son étiquette, on la fait défiler lentement en
     marquee vertical (contenu dupliqué). Le survol fige la lecture. */
  function setupDescScrolls(grid) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    grid.querySelectorAll('.project-desc').forEach((desc) => {
      if (desc.dataset.scrollReady || reduced) return;
      const track = desc.querySelector('.project-desc-track');
      const seg = desc.querySelector('.project-desc-seg');
      // Le texte dépasse-t-il son étagère ?
      if (seg.scrollHeight > desc.clientHeight + 10) {
        desc.classList.add('is-scroll');
        const dup = seg.cloneNode(true);
        dup.setAttribute('aria-hidden', 'true');
        track.appendChild(dup);
        // Durée proportionnelle à la longueur du texte, bornée
        const dur = Math.min(24, Math.max(9, Math.round(seg.textContent.length * 0.045)));
        track.style.animationDuration = dur + 's';
      }
      desc.dataset.scrollReady = '1';
    });
  }

  // Re-mesurer quand les polices web sont prêtes (hauteurs définitives)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setupDescScrolls(document.getElementById('projects-grid')));
  }

  /* ─────────────────── ACTIVE NAV LINK ─────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const scrollY = window.scrollY || (lenis && lenis.actualScroll) || 0;
      if (scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* ─────────────────── CONTACT FORM ─────────────────── */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Envoi en cours...</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>`;
      submitBtn.disabled = true;

      // Simulation (remplacer par Formspree / backend quand disponible)
      await new Promise((r) => setTimeout(r, 1600));

      submitBtn.innerHTML = `<span>Message envoyé</span>`;
      submitBtn.style.background = 'linear-gradient(115deg, #34d399, #059669)';

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        form.reset();
      }, 3400);
    });
  }

  /* ─────────────────── SERVICE WORKER ─────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
})();