/**
 * ASPERA — Entrepreneurship Cell | VVCE Mysuru
 * Futuristic 3D Wireframe Globe & Connected Network Particles Canvas
 * High performance Vanilla Canvas implementation (Zero external dependencies)
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isReducedMotion = motionQuery.matches;

  let width = 0;
  let height = 0;
  let animId = null;
  let isVisible = true;

  // Globe parameters
  const GLOBE_RADIUS_RATIO = 0.32; // relative to canvas min dimension
  let globeRadius = 180;
  let globeCenter = { x: 0, y: 0 };
  let globeAngleX = 0.25;
  let globeAngleY = 0;
  const ROTATION_SPEED = 0.0035;

  // 3D Globe Points (Latitude & Longitude grid)
  const globePoints = [];
  const LAT_STEPS = 12;
  const LON_STEPS = 20;

  function initGlobePoints() {
    globePoints.length = 0;
    for (let i = 0; i <= LAT_STEPS; i++) {
      const lat = (Math.PI * i) / LAT_STEPS - Math.PI / 2;
      const r = Math.cos(lat);
      const y = Math.sin(lat);

      for (let j = 0; j < LON_STEPS; j++) {
        const lon = (2 * Math.PI * j) / LON_STEPS;
        const x = r * Math.sin(lon);
        const z = r * Math.cos(lon);

        globePoints.push({
          x0: x,
          y0: y,
          z0: z,
          latIndex: i,
          lonIndex: j
        });
      }
    }
  }

  // Floating Network Nodes (Free particles with proximity connecting lines)
  const PARTICLE_COUNT = 45;
  const particles = [];

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
        isCyan: Math.random() > 0.35 // 65% cyan (#00A3D9), 35% blue (#008FFF)
      });
    }
  }

  function resize() {
    const parent = canvas.parentElement || document.body;
    width = parent.clientWidth || window.innerWidth;
    height = parent.clientHeight || window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Reset transform matrix to identity before applying scale to prevent accumulated scaling
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Responsive globe placement:
    // Desktop: Anchor firmly in the right column behind the institutional card (never overlapping headline/description)
    if (width > 991) {
      const containerWidth = Math.min(width, 1240);
      const rightColCenter = (width / 2) + (containerWidth * 0.22);
      globeCenter = { x: rightColCenter, y: height * 0.50 };
      globeRadius = Math.min(width * 0.18, height * 0.30, 210);
    } else {
      // Mobile / Tablet: Lower visual placement behind cards with balanced radius
      globeCenter = { x: width * 0.50, y: Math.max(height * 0.70, 520) };
      globeRadius = Math.min(width * 0.28, 135);
    }

    if (particles.length === 0) {
      initParticles();
    }
  }

  function rotate3D(x, y, z, ax, ay) {
    // Rotate around X
    const cosX = Math.cos(ax);
    const sinX = Math.sin(ax);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    // Rotate around Y
    const cosY = Math.cos(ay);
    const sinY = Math.sin(ay);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    return { x: x2, y: y1, z: z2 };
  }

  function render(time) {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    if (!isReducedMotion) {
      globeAngleY += ROTATION_SPEED;
    }

    // 1. Draw 3D Wireframe Globe
    const projected = [];
    for (let i = 0; i < globePoints.length; i++) {
      const p = globePoints[i];
      const rot = rotate3D(p.x0, p.y0, p.z0, globeAngleX, globeAngleY);

      // Perspective projection
      const fov = 400;
      const scale = fov / (fov + rot.z * globeRadius * 0.5);
      const px = globeCenter.x + rot.x * globeRadius * scale;
      const py = globeCenter.y + rot.y * globeRadius * scale;

      projected.push({
        x: px,
        y: py,
        z: rot.z,
        lat: p.latIndex,
        lon: p.lonIndex
      });
    }

    // Draw Longitude Lines
    for (let j = 0; j < LON_STEPS; j++) {
      ctx.beginPath();
      let first = true;
      for (let i = 0; i <= LAT_STEPS; i++) {
        const idx = i * LON_STEPS + j;
        const pt = projected[idx];
        if (!pt) continue;

        if (first) {
          ctx.moveTo(pt.x, pt.y);
          first = false;
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.strokeStyle = 'rgba(0, 163, 217, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw Latitude Rings
    for (let i = 1; i < LAT_STEPS; i++) {
      ctx.beginPath();
      for (let j = 0; j <= LON_STEPS; j++) {
        const jMod = j % LON_STEPS;
        const idx = i * LON_STEPS + jMod;
        const pt = projected[idx];
        if (!pt) continue;

        if (j === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.strokeStyle = (i === Math.floor(LAT_STEPS / 2)) 
        ? 'rgba(0, 143, 255, 0.28)'  // Equator line stands out slightly
        : 'rgba(0, 163, 217, 0.10)';
      ctx.lineWidth = (i === Math.floor(LAT_STEPS / 2)) ? 1.4 : 0.8;
      ctx.stroke();
    }

    // Draw Globe Surface Nodes (Front-facing highlighted points)
    for (let i = 0; i < projected.length; i++) {
      const pt = projected[i];
      if (pt.z > 0.05) { // Visible on front hemisphere
        const alpha = Math.min(0.85, (pt.z - 0.05) * 1.5);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.8 * (pt.z + 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 163, 217, ${alpha * 0.75})`;
        ctx.fill();

        // Selective glowing nodes
        if ((i % 7 === 0) && pt.z > 0.4) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 143, 255, ${alpha * 0.3})`;
          ctx.fill();
        }
      }
    }

    // 2. Draw Floating Network Particles & Connecting Lines
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (!isReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Connecting lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const MAX_DIST = 130;
        if (dist < MAX_DIST) {
          const lineAlpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p.isCyan
            ? `rgba(0, 163, 217, ${lineAlpha})`
            : `rgba(0, 143, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      // Draw particle dot with subtle pulse
      const pulse = Math.sin((time * 0.002) + p.pulseOffset) * 0.4 + 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = p.isCyan
        ? 'rgba(0, 163, 217, 0.75)'
        : 'rgba(0, 143, 255, 0.75)';
      ctx.fill();
    }

    if (!isReducedMotion) {
      animId = requestAnimationFrame(render);
    }
  }

  // Setup Lifecycle & Visibility
  initGlobePoints();
  resize();
  let resizeTimer = null;
  function onWindowResize() {
    if (resizeTimer) cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(() => {
      resize();
      if (isReducedMotion) {
        render(0);
      }
    });
  }
  window.addEventListener('resize', onWindowResize, { passive: true });

  // Mouse interaction: subtle tilt of globe based on pointer
  window.addEventListener('mousemove', (e) => {
    if (isReducedMotion) return;
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;
    globeAngleX = 0.25 + normY * 0.2;
  }, { passive: true });

  // IntersectionObserver to pause rendering when hero is scrolled past
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !isReducedMotion && !animId) {
        animId = requestAnimationFrame(render);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    });
  }, { threshold: 0.05 });

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    observer.observe(heroSection);
  }

  // Page Visibility handling
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isVisible = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else {
      isVisible = true;
      if (!isReducedMotion && !animId) {
        animId = requestAnimationFrame(render);
      }
    }
  });

  // Start animation
  if (!isReducedMotion) {
    animId = requestAnimationFrame(render);
  } else {
    render(0);
  }
})();
