/* ============================================================
   ELIO GONZÁLEZ — PORTFOLIO SCRIPT
   ============================================================ */

/* ===== LOADER ===== */
(function () {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  const percent = document.getElementById('loaderPercent');
  let current = 0;

  const interval = setInterval(() => {
    current += Math.random() * 18;
    if (current >= 100) {
      current = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initAnimations();
      }, 400);
    }
    progress.style.width = current + '%';
    percent.textContent = Math.floor(current) + '%';
  }, 80);

  document.body.style.overflow = 'hidden';
})();


/* ===== CUSTOM CURSOR ===== */
(function () {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect en links y botones
  const hoverTargets = document.querySelectorAll('a, button, .portfolio-card, .service-card, .soft-skill');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'var(--orange-light)';
      follower.style.width = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'var(--orange-light)';
      follower.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.background = 'var(--orange)';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'var(--orange)';
      follower.style.opacity = '0.5';
    });
  });
})();


/* ===== NAVBAR ===== */
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = menu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Cerrar al hacer click en un link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    });
  });
})();


/* ===== TYPEWRITER HERO ===== */
(function () {
  const el = document.getElementById('typewriter');
  const phrases = [
    'Comunicador Institucional',
    'Editor de Video Profesional',
    'Productor Audiovisual',
    'Piloto de Drone',
    'Conductor y Locutor',
    'Estratega de Contenido',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pause = false;

  function type() {
    if (pause) return;
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        pause = true;
        setTimeout(() => { pause = false; isDeleting = true; type(); }, 2000);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(type, speed);
  }

  // Espera a que el loader termine
  setTimeout(type, 1800);
})();


/* ===== COUNTERS HERO ===== */
function initCounters() {
  document.querySelectorAll('.counter-num').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    };
    tick();
  });
}


/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}


/* ===== SKILL BARS ===== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => observer.observe(fill));
}


/* ===== PORTFOLIO FILTER ===== */
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const matches = filter === 'all' || category.includes(filter);

        if (matches) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


/* ===== PARALLAX HERO ORBS ===== */
(function () {
  const orbs = document.querySelectorAll('.hero-orb');

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 18;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
})();


/* ===== TILT CARDS (Portfolio & Services) ===== */
(function () {
  const tiltCards = document.querySelectorAll('.portfolio-card, .service-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ===== CONTACT FORM ===== */
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-text');
    btn.textContent = 'Enviando...';

    // Simulación de envío (reemplazá con tu backend / Formspree / EmailJS)
    setTimeout(() => {
      btn.textContent = 'Mensaje enviado ✓';
      note.textContent = '¡Gracias! Te responderé pronto.';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        note.textContent = '';
      }, 4000);
    }, 1600);
  });
})();


/* ===== ACTIVE NAV LINK ON SCROLL ===== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active-nav');
            link.style.color = 'var(--white)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  });
})();


/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ===== GSAP-LIKE STAGGER para marquee hover ===== */
(function () {
  const marquee = document.querySelector('.marquee-track');
  if (!marquee) return;

  marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
})();


/* ===== SCROLL PROGRESS BAR (top of page) ===== */
(function () {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, var(--orange), var(--orange-light));
    z-index: 99999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    bar.style.width = pct + '%';
  });
})();


/* ===== FADE IN CARD KEYFRAME (inyectado por JS) ===== */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(20px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .nav-link.active-nav {
      color: var(--white) !important;
    }
    .nav-link.active-nav::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(style);
})();


/* ===== INIT ALL ===== */
function initAnimations() {
  initScrollReveal();
  initSkillBars();
  initCounters();
}

// Si el loader ya terminó (recarga rápida), iniciamos igual
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!document.getElementById('loader').classList.contains('hidden')) return;
    initAnimations();
  }, 100);
});

/* ===== CONTACT FORM CON FORMSPREE REAL ===== */
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-text');
    btn.textContent = 'Enviando...';

    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        btn.textContent = 'Mensaje enviado ✓';
        note.textContent = '¡Gracias! Te responderé pronto.';
        form.reset();
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      btn.textContent = 'Error';
      note.textContent = 'Hubo un problema. Por favor, intentá nuevamente.';
    }

    setTimeout(() => {
      btn.textContent = 'Enviar mensaje';
      note.textContent = '';
    }, 4000);
  });
})();