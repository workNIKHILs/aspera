/**
 * ASPERA — Student Entrepreneurship Club | VVCE Mysore
 * Background Engine & Dropdown Navigation Controller
 * 
 * Manages:
 * 1. Automatic 3.0-second soft holographic glitch cycle
 * 2. ASPERA logo click dropdown menu ("About Us", "Team", "Events", "Vision")
 * 3. Outside click & Escape key detection
 * 4. Desktop subtle mouse parallax
 * 5. Reduced-motion accessibility
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. ASPERA LOGO DROPDOWN CONTROLLER
     ========================================================================== */
  const dropdownContainer = document.getElementById('aspera-dropdown-container');
  const logoTrigger = document.getElementById('aspera-logo-trigger');
  const dropdownMenu = document.getElementById('aspera-dropdown-menu');

  if (logoTrigger && dropdownContainer) {
    // Toggle dropdown on click
    logoTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownContainer.classList.toggle('is-open');
      logoTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContainer.classList.remove('is-open');
        logoTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdownContainer.classList.contains('is-open')) {
        dropdownContainer.classList.remove('is-open');
        logoTrigger.setAttribute('aria-expanded', 'false');
        logoTrigger.focus();
      }
    });

    // Close when a dropdown link is clicked
    const links = dropdownContainer.querySelectorAll('.dropdown-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        dropdownContainer.classList.remove('is-open');
        logoTrigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     2. OCCASIONAL SUBTLE WATERMARK GLITCH CONTROLLER
     ========================================================================== */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let systemReducedMotion = motionQuery.matches;

  const watermarkStage = document.getElementById('watermark-stage');
  const holoWrap = document.getElementById('hologram-watermark');
  const holoSlice1 = document.querySelector('.holo-slice-1');
  const holoSlice2 = document.querySelector('.holo-slice-2');

  if (!holoWrap) return;

  // Disable static CSS fallback in favor of timed burst
  holoWrap.classList.remove('css-animated');

  let glitchInterval = null;
  let isGlitching = false;

  function isMotionAllowed() {
    return !systemReducedMotion;
  }

  /**
   * Randomize horizontal displacement slices for restrained tracking displacement
   */
  function applyRandomSlices() {
    if (!holoSlice1 || !holoSlice2) return;

    // Slice 1: Upper section
    const s1Y1 = Math.floor(Math.random() * 20) + 16;
    const s1Y2 = s1Y1 + Math.floor(Math.random() * 18) + 10;
    holoSlice1.style.clipPath = `polygon(0 ${s1Y1}%, 100% ${s1Y1}%, 100% ${s1Y2}%, 0 ${s1Y2}%)`;

    // Slice 2: Lower section
    const s2Y1 = Math.floor(Math.random() * 20) + 50;
    const s2Y2 = s2Y1 + Math.floor(Math.random() * 18) + 10;
    holoSlice2.style.clipPath = `polygon(0 ${s2Y1}%, 100% ${s2Y1}%, 100% ${s2Y2}%, 0 ${s2Y2}%)`;
  }

  /**
   * Fire a restrained, subtle holographic micro-burst (~180ms)
   */
  function triggerHoloBurst() {
    if (!isMotionAllowed() || isGlitching) return;

    isGlitching = true;
    applyRandomSlices();
    holoWrap.classList.add('is-glitching');

    // Quick subtle slice update at mid-point
    const midPulse = setTimeout(() => {
      applyRandomSlices();
    }, 80);

    // End pulse smoothly and restore calm state
    setTimeout(() => {
      clearTimeout(midPulse);
      holoWrap.classList.remove('is-glitching');
      if (holoSlice1) holoSlice1.style.clipPath = '';
      if (holoSlice2) holoSlice2.style.clipPath = '';
      isGlitching = false;
    }, 180);
  }

  /**
   * Start occasional subtle glitch cycle (~3.8s)
   */
  function startGlitchTimer() {
    if (!isMotionAllowed()) return;
    if (glitchInterval) clearInterval(glitchInterval);

    setTimeout(triggerHoloBurst, 1800);
    glitchInterval = setInterval(triggerHoloBurst, 3800);
  }

  function stopGlitchTimer() {
    if (glitchInterval) {
      clearInterval(glitchInterval);
      glitchInterval = null;
    }
    holoWrap.classList.remove('is-glitching');
  }

  motionQuery.addEventListener('change', (e) => {
    systemReducedMotion = e.matches;
    if (isMotionAllowed()) {
      startGlitchTimer();
    } else {
      stopGlitchTimer();
    }
  });

  /* ==========================================================================
     3. RESTRAINED AMBIENT PARALLAX (Subtle depth, no distortion)
     ========================================================================== */
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function updateParallax() {
    if (!isMotionAllowed()) {
      if (watermarkStage) watermarkStage.style.transform = 'translate(-50%, -49%)';
      return;
    }

    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;

    if (watermarkStage && !isGlitching) {
      watermarkStage.style.transform = `translate(calc(-50% + ${currentX}px), calc(-49% + ${currentY}px))`;
    }

    rafId = requestAnimationFrame(updateParallax);
  }

  function onMouseMove(e) {
    if (!isMotionAllowed()) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    targetX = ((e.clientX - centerX) / centerX) * 4; // Max 4px subtle shift
    targetY = ((e.clientY - centerY) / centerY) * 3; // Max 3px subtle shift
  }

  // Initialize
  if (isMotionAllowed()) {
    startGlitchTimer();
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);
  }

  // Page visibility handling
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopGlitchTimer();
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    } else if (isMotionAllowed()) {
      startGlitchTimer();
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    }
  });

})();
