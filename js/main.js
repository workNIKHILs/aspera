/**
 * ASPERA — Entrepreneurship Cell | VVCE Mysuru
 * Main Website Interaction Controller
 * Navigation, Lightbox Modal, Registration Handlers & Smooth Scroll
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initStickyNav();
    initMobileNav();
    initActiveNavLinks();
    initGalleryLightbox();
    initRegistrationHandlers();
    initCommunityModal();
  });

  /* ==========================================================================
     1. STICKY NAVIGATION
     ========================================================================== */
  function initStickyNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function openMenu() {
      toggle.classList.add('is-open');
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const firstLink = menu.querySelector('.nav-link');
      if (firstLink) firstLink.focus();
    }

    function closeMenu() {
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking a link
    menu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     3. ACTIVE SECTION SCROLL SPY
     ========================================================================== */
  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach((sec) => observer.observe(sec));
  }

  /* ==========================================================================
     4. GALLERY LIGHTBOX MODAL
     ========================================================================== */
  function initGalleryLightbox() {
    const modal = document.getElementById('gallery-lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!modal || !modalImg) return;

    let triggerElement = null;
    let currentIndex = 0;
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    if (!galleryCards.length) return;

    function renderImageAtIndex(index) {
      if (index < 0) index = galleryCards.length - 1;
      if (index >= galleryCards.length) index = 0;
      currentIndex = index;

      const card = galleryCards[currentIndex];
      const img = card.querySelector('.gallery-thumb-img');
      const title = card.querySelector('.gallery-title')?.textContent.trim() || 'ASPERA Activity';
      const cat = card.querySelector('.gallery-category')?.textContent.trim() || 'E-Cell Initiative';
      const desc = card.getAttribute('data-desc') || `Highlights from ${title} conducted by ASPERA Entrepreneurship Cell at VVCE.`;

      modalImg.src = img?.getAttribute('src') || '';
      modalImg.alt = img?.getAttribute('alt') || title;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = `${cat} · ${desc}`;
      if (modalCounter) modalCounter.textContent = `${currentIndex + 1} / ${galleryCards.length}`;
    }

    function openLightbox(card) {
      triggerElement = card;
      const index = galleryCards.indexOf(card);
      renderImageAtIndex(index >= 0 ? index : 0);

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      if (triggerElement) {
        triggerElement.focus();
        triggerElement = null;
      }
    }

    function showPrev() {
      renderImageAtIndex(currentIndex - 1);
    }

    function showNext() {
      renderImageAtIndex(currentIndex + 1);
    }

    galleryCards.forEach((card) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      const title = card.querySelector('.gallery-title')?.textContent || 'image';
      card.setAttribute('aria-label', `View ${title} in full resolution`);

      card.addEventListener('click', () => openLightbox(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(card);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrev();
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNext();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    });
  }

  /* ==========================================================================
     5. REGISTRATION LINKS CONTROLLER
     ========================================================================== */
  function initRegistrationHandlers() {
    // Direct link navigation to official Google Forms (zero interference, zero preventDefault)
    const config = window.ASPERA_CONFIG?.registration;
    if (!config) return;

    const workshopLinks = document.querySelectorAll('a[data-register-type="workshop"]');
    workshopLinks.forEach((link) => {
      if (!link.getAttribute('href') && config.workshopUrl) {
        link.href = config.workshopUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });

    const speakerLinks = document.querySelectorAll('a[data-register-type="speaker"]');
    speakerLinks.forEach((link) => {
      if (!link.getAttribute('href') && config.speakerSessionUrl) {
        link.href = config.speakerSessionUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  /* ==========================================================================
     6. COMMUNITY JOIN MODAL
     ========================================================================== */
  function initCommunityModal() {
    const joinBtns = document.querySelectorAll('.js-open-join-modal');
    const joinModal = document.getElementById('community-join-modal');
    const joinClose = document.getElementById('join-modal-close');

    if (!joinModal) return;

    let triggerElement = null;

    function openJoinModal(trigger) {
      triggerElement = trigger;
      joinModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (joinClose) joinClose.focus();
    }

    function closeJoinModal() {
      joinModal.classList.remove('is-open');
      document.body.style.overflow = '';
      if (triggerElement) {
        triggerElement.focus();
        triggerElement = null;
      }
    }

    joinBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openJoinModal(btn);
      });
    });

    if (joinClose) joinClose.addEventListener('click', closeJoinModal);

    joinModal.addEventListener('click', (e) => {
      if (e.target === joinModal) closeJoinModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && joinModal.classList.contains('is-open')) {
        closeJoinModal();
      }
    });
  }

  /* ==========================================================================
     7. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #111F2C;
        border: 1px solid #00A3D9;
        color: #F8FAFC;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.7);
        z-index: 3000;
        opacity: 0;
        transform: translateY(12px);
        transition: all 0.25s ease;
        max-width: 380px;
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 4000);
  }

})();
