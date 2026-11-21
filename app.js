/* =================================================================
   ROYAL LUXURY DIGITAL WEDDING INVITATION – ENGLISH SCRIPT ENGINE
   Instant Smooth Native Scrolling · 3D Envelope Physics · 60FPS
   ================================================================= */

let isMusicActive = false;
let audioContextInstance = null;
let ambientSynthInterval = null;

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

const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');

// ============================================================
// 1. SOUND & AUDIO SYNTHESIZER ENGINE
// ============================================================
function getAudioContext() {
  if (audioContextInstance) return audioContextInstance;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (AudioContextClass) {
    audioContextInstance = new AudioContextClass();
  }
  return audioContextInstance;
}

function playCelebrationChimes() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const chimePitches = [523.25, 659.25, 783.99, 987.77, 1046.50];
    chimePitches.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 1.7);
    });
  } catch (err) {
    console.warn('Audio chime notice:', err);
  }
}

function startAmbientSynth() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const weddingScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
    let noteCounter = 0;

    function soundTone(frequency) {
      if (!isMusicActive || !ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    }

    soundTone(weddingScale[0]);
    ambientSynthInterval = setInterval(() => {
      if (!isMusicActive) return;
      soundTone(weddingScale[noteCounter % weddingScale.length]);
      noteCounter++;
    }, 2000);
  } catch (err) {
    console.warn('Synth notice:', err);
  }
}

function startMusic() {
  isMusicActive = true;
  musicBtn.classList.add('playing');
  bgMusic.play().catch(() => {
    startAmbientSynth();
  });
}

function stopMusic() {
  isMusicActive = false;
  musicBtn.classList.remove('playing');
  bgMusic.pause();
  if (ambientSynthInterval) {
    clearInterval(ambientSynthInterval);
    ambientSynthInterval = null;
  }
}

musicBtn.addEventListener('click', () => {
  isMusicActive ? stopMusic() : startMusic();
});

// ============================================================
// 2. 3D ENVELOPE OPENING ANIMATION (Grand Theatre Reveal)
// ============================================================
let isEnvelopeOpened = false;
waxSealBtn.addEventListener('click', triggerEnvelopeOpening);

function triggerEnvelopeOpening() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  playCelebrationChimes();
  envelopeWrapper.classList.add('illuminated');

  // Immediately ensure envelope never traps gestures
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

  // Phase 3: True 3D Physical Flap Unfolding (Clearly Visible)
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

  // Start revealing Card 1 text as envelope fades
  tl.call(revealHeroCard, null, 1.8);

  startMusic();
}

// ============================================================
// 3. COUNTDOWN TIMER ENGINE (11TH DEC 2026 19:00 PKT)
// ============================================================
const targetWeddingDate = new Date('December 11, 2026 19:00:00').getTime();

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
// 4. FLOATING GOLDEN SPARKLES CANVAS ENGINE (Ultra-Lightweight 60FPS)
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
// 5. CINEMATIC LUXURY TEXT SCROLL REVEAL (Zero Glitch / Native IO)
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
  const scrollCards = document.querySelectorAll('.card-mehndi, .card-barat, .card-walima, .card-blessings');

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-text').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Triggers as the card scrolls into view
    threshold: 0.05
  };

  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.reveal-text');
        items.forEach(el => {
          el.classList.add('is-revealed');
        });
        obs.unobserve(entry.target); // Reveal once smoothly, no re-triggering or jitter
      }
    });
  }, observerOptions);

  scrollCards.forEach(card => cardObserver.observe(card));
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}