/* =================================================================
   ROYAL LUXURY DIGITAL WEDDING INVITATION – ENGLISH SCRIPT ENGINE
   Instant Smooth Native Scrolling · 3D Envelope Physics · 60FPS
   Dynamic Ceremony Filtering · Auto Countdown · Personalized Guests
   ================================================================= */

// DOM Elements
const envelopeStage = document.getElementById('envelope-stage');
const envelopeWrapper = document.getElementById('envelope');
const flapTop = document.getElementById('flap-top');
const flapBottom = document.getElementById('flap-bottom');
const flapLeft = document.getElementById('flap-left');
const flapRight = document.getElementById('flap-right');
const waxSealBtn = document.getElementById('wax-seal-btn');
const sealRadiance = document.getElementById('seal-radiance');
const lightRays = document.getElementById('light-rays');
const volumetricGlow = document.getElementById('volumetric-glow');
const bgMusic = document.getElementById('bg-music');

// ============================================================
// 1. DYNAMIC CEREMONY FILTERING & GUEST PERSONALIZATION
// ============================================================
const urlParams = new URLSearchParams(window.location.search);
const eventsRaw = (urlParams.get('events') || urlParams.get('event') || urlParams.get('e') || 'all').toLowerCase();
const guestParam = (urlParams.get('guest') || urlParams.get('to') || urlParams.get('name') || '').trim();

// Determine ceremonies to display
const isAll = eventsRaw === 'all' || eventsRaw === '' || eventsRaw === '1';
let showMehndi = isAll || eventsRaw.includes('mehndi') || eventsRaw === 'm';
let showBarat  = isAll || eventsRaw.includes('barat')  || eventsRaw === 'b';
let showWalima = isAll || eventsRaw.includes('walima') || eventsRaw === 'w';

// Edge case: if parameter didn't match any, default to all
if (!showMehndi && !showBarat && !showWalima) {
  showMehndi = true;
  showBarat = true;
  showWalima = true;
}

// Personalized Guest Welcome Pill
const guestPill = document.getElementById('guest-pill');
const guestPillName = document.getElementById('guest-pill-name');
if (guestParam && guestPill && guestPillName) {
  guestPillName.textContent = guestParam;
  guestPill.style.display = 'inline-flex';
}

// Ceremony DOM References
const cardMehndi = document.getElementById('card-mehndi');
const cardBarat  = document.getElementById('card-barat');
const cardWalima = document.getElementById('card-walima');

const connHero   = document.getElementById('conn-hero');
const connMehndi = document.getElementById('conn-mehndi');
const connBarat  = document.getElementById('conn-barat');
const connWalima = document.getElementById('conn-walima');

// Set visibility
if (cardMehndi) cardMehndi.style.display = showMehndi ? '' : 'none';
if (cardBarat)  cardBarat.style.display  = showBarat  ? '' : 'none';
if (cardWalima) cardWalima.style.display = showWalima ? '' : 'none';

// Seamless connector flow
// Hide all connectors first
[connHero, connMehndi, connBarat, connWalima].forEach(conn => {
  if (conn) conn.style.display = 'none';
});

// Build list of active cards: [Hero, ...ceremonies, Blessings]
const activeCards = ['hero'];
if (showMehndi) activeCards.push('mehndi');
if (showBarat)  activeCards.push('barat');
if (showWalima) activeCards.push('walima');
activeCards.push('blessings');

// Turn on the appropriate connector between each adjacent pair
for (let i = 0; i < activeCards.length - 1; i++) {
  const from = activeCards[i];
  if (from === 'hero' && connHero) connHero.style.display = 'flex';
  if (from === 'mehndi' && connMehndi) connMehndi.style.display = 'flex';
  if (from === 'barat' && connBarat) connBarat.style.display = 'flex';
  if (from === 'walima' && connWalima) connWalima.style.display = 'flex';
}

// Dynamic Ceremony Badges (Bespoke Numbering)
const visibleCeremonies = [];
if (showMehndi) visibleCeremonies.push({ id: 'badge-mehndi', name: 'Mehndi' });
if (showBarat)  visibleCeremonies.push({ id: 'badge-barat', name: 'Barat' });
if (showWalima) visibleCeremonies.push({ id: 'badge-walima', name: 'Walima' });

if (visibleCeremonies.length === 1) {
  const el = document.getElementById(visibleCeremonies[0].id);
  if (el) el.textContent = 'CORDIAL INVITATION';
} else if (visibleCeremonies.length === 2) {
  const el1 = document.getElementById(visibleCeremonies[0].id);
  const el2 = document.getElementById(visibleCeremonies[1].id);
  if (el1) el1.textContent = 'CEREMONY I';
  if (el2) el2.textContent = 'CEREMONY II';
} else if (visibleCeremonies.length === 3) {
  const el1 = document.getElementById('badge-mehndi');
  const el2 = document.getElementById('badge-barat');
  const el3 = document.getElementById('badge-walima');
  if (el1) el1.textContent = 'CEREMONY I';
  if (el2) el2.textContent = 'CEREMONY II';
  if (el3) el3.textContent = 'CEREMONY III';
}

// Dynamic Hero Date Range
const heroDatesLabel = document.getElementById('hero-dates-label');
if (heroDatesLabel) {
  if (showMehndi && showBarat && showWalima) {
    heroDatesLabel.textContent = '11TH — 13TH DECEMBER 2026';
  } else if (showBarat && showWalima && !showMehndi) {
    heroDatesLabel.textContent = '12TH — 13TH DECEMBER 2026';
  } else if (showMehndi && showWalima && !showBarat) {
    heroDatesLabel.textContent = '11TH & 13TH DECEMBER 2026';
  } else if (showMehndi && showBarat && !showWalima) {
    heroDatesLabel.textContent = '11TH & 12TH DECEMBER 2026';
  } else if (showWalima && !showMehndi && !showBarat) {
    heroDatesLabel.textContent = '13TH DECEMBER 2026';
  } else if (showBarat && !showMehndi && !showWalima) {
    heroDatesLabel.textContent = '12TH DECEMBER 2026';
  } else if (showMehndi && !showBarat && !showWalima) {
    heroDatesLabel.textContent = '11TH DECEMBER 2026';
  }
}

// ============================================================
// 2. AUDIO AUTOPLAY ENGINE (Teri Ore - Balanced Volume)
// ============================================================
function playBackgroundMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.50; // Normal, pleasant, balanced background volume
  bgMusic.playbackRate = 1.0; // Normal tempo

  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Browser autoplay restriction fallback: play on first subsequent user tap
      const onUserTouch = () => {
        bgMusic.play().catch(() => {});
        window.removeEventListener('click', onUserTouch);
        window.removeEventListener('touchstart', onUserTouch);
      };
      window.addEventListener('click', onUserTouch, { once: true });
      window.addEventListener('touchstart', onUserTouch, { once: true });
    });
  }
}

// ============================================================
// 3. 3D ENVELOPE OPENING ANIMATION (Grand Theatre Reveal)
// ============================================================
let isEnvelopeOpened = false;
if (waxSealBtn) {
  waxSealBtn.addEventListener('click', triggerEnvelopeOpening);
}

function triggerEnvelopeOpening() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  // Immediately start high-fidelity music on user tap
  playBackgroundMusic();

  envelopeWrapper.classList.add('illuminated');
  envelopeStage.style.pointerEvents = 'none';

  // Royal Gold Confetti Shower
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFF3CD', '#AA7A1E', '#FFFFFF', '#781926']
    });
  }

  const tl = gsap.timeline();

  // Phase 1: Radiant Light Flare & Seal Break
  tl.to(sealRadiance, {
    scale: 2.2,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  }, 0);

  tl.to(waxSealBtn, {
    scale: 1.15,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in'
  }, 0.15);

  // Phase 2: Warm Volumetric Backlight Expands (BEHIND flaps)
  tl.to(lightRays, {
    opacity: 0.9,
    scale: 1.4,
    rotation: 60,
    duration: 1.8,
    ease: 'power2.out'
  }, 0.2);

  tl.to(volumetricGlow, {
    opacity: 0.85,
    scale: 1.3,
    duration: 1.6,
    ease: 'power2.out'
  }, 0.2);

  // Phase 3: True 3D Physical Flap Unfolding
  tl.to(flapTop, { rotateX: 180, duration: 1.3, ease: 'power2.inOut' }, 0.35);
  tl.to(flapBottom, { rotateX: -140, duration: 1.2, ease: 'power2.inOut' }, 0.55);
  tl.to(flapLeft, { rotateY: -150, duration: 1.2, ease: 'power2.inOut' }, 0.65);
  tl.to(flapRight, { rotateY: 150, duration: 1.2, ease: 'power2.inOut' }, 0.65);

  // Phase 4: Envelope zooms smoothly and reveals Card 1
  tl.to(envelopeWrapper, {
    scale: 1.08,
    y: 60,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.inOut'
  }, 2.0);

  tl.to(envelopeStage, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      envelopeStage.style.display = 'none';
      revealHeroCard();
    }
  }, 2.3);

  tl.call(revealHeroCard, null, 1.8);
}

// ============================================================
// 4. DYNAMIC COUNTDOWN TIMER (Auto-Targets Earliest Ceremony)
// ============================================================
let targetWeddingDate = new Date('December 11, 2026 19:00:00').getTime();
if (!showMehndi && showBarat) {
  targetWeddingDate = new Date('December 12, 2026 13:00:00').getTime();
} else if (!showMehndi && !showBarat && showWalima) {
  targetWeddingDate = new Date('December 13, 2026 14:00:00').getTime();
}

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');

function updateCountdown() {
  const now = new Date().getTime();
  const timeDifference = targetWeddingDate - now;

  if (timeDifference <= 0) {
    if (cdDays) cdDays.textContent = '00';
    if (cdHours) cdHours.textContent = '00';
    if (cdMins) cdMins.textContent = '00';
    if (cdSecs) cdSecs.textContent = '00';
    return;
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
  if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
  if (cdMins) cdMins.textContent = String(minutes).padStart(2, '0');
  if (cdSecs) cdSecs.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================================
// 5. FLOATING GOLDEN SPARKLES CANVAS ENGINE (Ultra-Lightweight 60FPS)
// ============================================================
const sparkleCanvas = document.getElementById('sparkle-canvas');
if (sparkleCanvas) {
  const sCtx = sparkleCanvas.getContext('2d');
  let sWidth = sparkleCanvas.width = window.innerWidth;
  let sHeight = sparkleCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    sWidth = sparkleCanvas.width = window.innerWidth;
    sHeight = sparkleCanvas.height = window.innerHeight;
  });

  const sparklesCount = 28;
  const sparkles = [];

  for (let i = 0; i < sparklesCount; i++) {
    sparkles.push({
      x: Math.random() * sWidth,
      y: Math.random() * sHeight,
      r: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01
    });
  }

  function animateSparkles() {
    sCtx.clearRect(0, 0, sWidth, sHeight);

    sparkles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

      if (p.y < 0) {
        p.y = sHeight + 10;
        p.x = Math.random() * sWidth;
      }
      if (p.x < 0) p.x = sWidth;
      if (p.x > sWidth) p.x = 0;

      const alpha = Math.max(0.1, Math.min(0.8, p.opacity));
      sCtx.beginPath();
      sCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      sCtx.fillStyle = `rgba(255, 220, 120, ${alpha})`;
      sCtx.shadowColor = '#d4af37';
      sCtx.shadowBlur = 6;
      sCtx.fill();
    });

    requestAnimationFrame(animateSparkles);
  }

  animateSparkles();
}

// ============================================================
// 6. CINEMATIC LUXURY TEXT SCROLL REVEAL (Zero Glitch / Native IO)
// ============================================================
function revealHeroCard() {
  const heroElements = document.querySelectorAll('.card-hero .reveal-text');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('is-revealed');
    }, 100 + index * 100);
  });
}

function initScrollReveal() {
  // Only observe cards that are currently visible
  const visibleCards = [];
  if (showMehndi && cardMehndi) visibleCards.push(cardMehndi);
  if (showBarat  && cardBarat)  visibleCards.push(cardBarat);
  if (showWalima && cardWalima) visibleCards.push(cardWalima);
  const cardBlessings = document.getElementById('card-blessings');
  if (cardBlessings) visibleCards.push(cardBlessings);

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-text').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  };

  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.reveal-text');
        items.forEach(el => {
          el.classList.add('is-revealed');
        });
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  visibleCards.forEach(card => cardObserver.observe(card));
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
