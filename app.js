// ==========================================================================
// DIPLOMAT MANAGEMENT SERVICES (DMS BAHRAIN) - APP INTERACTIONS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  try { initMobileMenu(); } catch(e) { console.error('Mobile menu init error:', e); }
  try { initGrandHeroSlider(); } catch(e) { console.error('Grand hero slider init error:', e); }
  try { initHeroServicesSlider(); } catch(e) { console.error('Hero slider init error:', e); }
  try { initNavbarScroll(); } catch(e) { console.error('Navbar scroll init error:', e); }
  try { initCapabilitySearch(); } catch(e) { console.error('Search init error:', e); }
  try { initServiceFilters(); } catch(e) { console.error('Filters init error:', e); }
  try { initFaqAccordion(); } catch(e) { console.error('FAQ init error:', e); }
  try { initModals(); } catch(e) { console.error('Modals init error:', e); }
});

// 1. Mobile Drawer Menu Interaction
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const categoriesTrigger = document.getElementById('mobileCategoriesTrigger');
  const categoriesItem = categoriesTrigger ? categoriesTrigger.closest('.mobile-dropdown-item') : null;
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-sublist a');

  function openMenu() {
    if (overlay) overlay.classList.add('is-open');
    if (toggleBtn) {
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (overlay) overlay.classList.remove('is-open');
    if (toggleBtn) {
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (overlay && overlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeMenu();
      }
    });
  }

  // Toggle Category accordion in mobile menu
  if (categoriesTrigger && categoriesItem) {
    categoriesTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      categoriesItem.classList.toggle('is-expanded');
    });
  }

  // Close drawer when clicking any standard navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// 2. Navbar Scroll Effect: Full-width at Top -> Floating Rounded Capsule on Scroll
function initNavbarScroll() {
  const header = document.querySelector('.header-wrapper');
  const nav = document.querySelector('.capsule-nav');
  if (!header && !nav) return;

  function handleScroll() {
    const isScrolled = window.scrollY > 60;
    if (header) header.classList.toggle('is-scrolled', isScrolled);
    if (nav) nav.classList.toggle('scrolled', isScrolled);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger immediately on load
}

// 3. Interactive Capability Search & Trending Tags
function initCapabilitySearch() {
  const searchInput = document.getElementById('capabilitySearchInput');
  const categorySelect = document.getElementById('capabilityCategorySelect');
  const serviceCards = document.querySelectorAll('.service-card');
  const tagPills = document.querySelectorAll('.tag-pill');
  const resultsCount = document.getElementById('searchCount');

  if (!searchInput && !categorySelect) return;

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categorySelect ? categorySelect.value : 'all';
    let matchCount = 0;

    serviceCards.forEach(card => {
      const titleElem = card.querySelector('.service-title');
      const descElem = card.querySelector('.service-desc');
      const title = titleElem ? titleElem.innerText.toLowerCase() : '';
      const desc = descElem ? descElem.innerText.toLowerCase() : '';
      const category = card.getAttribute('data-category') || '';

      const matchesText = !query || title.includes(query) || desc.includes(query);
      const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);

      if (matchesText && matchesCategory) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCount) {
      resultsCount.innerText = `${matchCount} Capabilities available`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', filterCards);
  }

  // Quick Trending Tags click
  tagPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tagPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const tagText = pill.getAttribute('data-search') || pill.innerText.trim();
      if (searchInput) {
        searchInput.value = tagText;
      }
      filterCards();

      // Smooth scroll to services section
      const servicesSection = document.getElementById('capabilities');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const searchActionBtn = document.getElementById('btnSearchAction');
  if (searchActionBtn) {
    searchActionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      filterCards();
      const servicesSection = document.getElementById('capabilities');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// 4. Category Filter Tabs in Services Section
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterTabs.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 5. Interactive FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordion items for clean UX
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// 6. Consultation & Service Detail Modals
function initModals() {
  const modalOverlay = document.getElementById('consultationModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="consultation"]');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');
  const consultationForm = document.getElementById('consultationForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-name');
      if (serviceName && document.getElementById('modalServiceSelect')) {
        document.getElementById('modalServiceSelect').value = serviceName;
      }
      if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';
      if (submitBtn) {
        submitBtn.innerText = 'Transmitting Request...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        alert('Thank you for reaching out to Diplomat Management Services. An executive advisor will contact you within 24 hours.');
        consultationForm.reset();
        if (submitBtn) {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }
        if (modalOverlay) {
          modalOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 900);
    });
  }

  // Download Modal Logic
  const downloadModal = document.getElementById('downloadModal');
  const btnOpenDownloads = document.getElementById('btnOpenDownloads');
  const btnCloseDownloads = document.getElementById('btnCloseDownloads');

  if (btnOpenDownloads && downloadModal) {
    btnOpenDownloads.addEventListener('click', () => {
      downloadModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (btnCloseDownloads && downloadModal) {
    btnCloseDownloads.addEventListener('click', () => {
      downloadModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (downloadModal) {
    downloadModal.addEventListener('click', (e) => {
      if (e.target === downloadModal) {
        downloadModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// 7. Architectural Showcase Hero - Automatic 11 Categories Slider (Reference Image 1)
function initHeroServicesSlider() {
  const track = document.getElementById('heroSliderTrack');
  const cards = document.querySelectorAll('.hero-slide-card');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const currentNumElem = document.getElementById('sliderCurrentNum');
  const progressFill = document.getElementById('sliderProgressFill');

  if (!track || !cards.length) return;

  let currentIndex = 0;
  const totalSlides = cards.length;
  const slideDuration = 4000; // 4 seconds per slide auto-scroll
  let autoTimer = null;
  let progressAnim = null;
  let animStart = null;
  let isPaused = false;

  function getSlideOffset(index) {
    if (index <= 0) return 0;
    const card = cards[0];
    const cardWidth = card.getBoundingClientRect().width;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || (window.innerWidth <= 768 ? 16 : 20);
    return Math.round(index * (cardWidth + gap));
  }

  function updateSlider(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    // 1. Update active card highlight
    cards.forEach((card, i) => {
      if (i === currentIndex) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });

    // 2. Update number counter (01 to 11)
    if (currentNumElem) {
      currentNumElem.innerText = String(currentIndex + 1).padStart(2, '0');
    }

    // 3. Smoothly transform track mathematically
    const offset = getSlideOffset(currentIndex);
    track.style.transform = `translateX(-${offset}px)`;

    // 4. Reset and start progress bar
    animateProgress();
  }

  function animateProgress() {
    if (progressAnim) cancelAnimationFrame(progressAnim);
    if (!progressFill) return;
    progressFill.style.width = '0%';
    animStart = performance.now();

    function step(now) {
      if (!isPaused) {
        const elapsed = now - animStart;
        const pct = Math.min((elapsed / slideDuration) * 100, 100);
        progressFill.style.width = `${pct}%`;
      } else {
        animStart = now;
      }
      if (now - animStart < slideDuration) {
        progressAnim = requestAnimationFrame(step);
      }
    }
    progressAnim = requestAnimationFrame(step);
  }

  function next() {
    updateSlider(currentIndex + 1);
  }

  function prev() {
    updateSlider(currentIndex - 1);
  }

  function startTimer() {
    stopTimer();
    autoTimer = setInterval(() => {
      if (!isPaused) next();
    }, slideDuration);
    animateProgress();
  }

  function stopTimer() {
    if (autoTimer) clearInterval(autoTimer);
    if (progressAnim) cancelAnimationFrame(progressAnim);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      next();
      startTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prev();
      startTimer();
    });
  }

  // Click directly on any slide to make it active
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      // If user clicked the link directly, let it navigate
      if (e.target.closest('.slide-action-link')) return;
      if (i !== currentIndex) {
        updateSlider(i);
        startTimer();
      }
    });
  });

  // Pause on hover
  const sliderWrapper = document.getElementById('heroServicesSlider');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', () => { isPaused = true; });
    sliderWrapper.addEventListener('mouseleave', () => {
      isPaused = false;
      animStart = performance.now();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    sliderWrapper.addEventListener('touchstart', (e) => {
      isPaused = true;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      isPaused = false;
      const touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEndX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance > 0) next();
        else prev();
      }
      startTimer();
    }, { passive: true });
  }

  // Responsive resize handler
  window.addEventListener('resize', () => {
    const offset = getSlideOffset(currentIndex);
    track.style.transform = `translateX(-${offset}px)`;
  });

  // Start with 1st slide
  updateSlider(0);
  startTimer();
}

// 8. Grand Full-Width Hero Slider (Lulu Exchange Corporate Reference)
function initGrandHeroSlider() {
  const slides = document.querySelectorAll('.hero-grand-slide');
  const tabs = document.querySelectorAll('.hero-slide-tab-btn');
  const prevBtn = document.getElementById('grandSlidePrevBtn');
  const nextBtn = document.getElementById('grandSlideNextBtn');
  const currentNumElem = document.getElementById('grandSliderCurrentNum');
  const heroSection = document.querySelector('.hero-grand-section');

  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 5500; // 5.5s autoplay duration
  let timer = null;
  let animFrame = null;
  let animStart = null;
  let isPaused = false;

  function updateSlider(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    // 1. Update active slide class
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });

    // 2. Update active tab button class and reset all progress fills
    tabs.forEach((tab, i) => {
      const fill = tab.querySelector('.tab-progress-fill');
      if (fill) fill.style.width = '0%';

      if (i === currentIndex) {
        tab.classList.add('is-active');
      } else {
        tab.classList.remove('is-active');
      }
    });

    // 3. Update counter number (01 / 04)
    if (currentNumElem) {
      currentNumElem.innerText = String(currentIndex + 1).padStart(2, '0');
    }

    // 4. Animate the progress bar of the active tab
    startProgressBar();
  }

  function startProgressBar() {
    if (animFrame) cancelAnimationFrame(animFrame);
    const activeTab = tabs[currentIndex];
    const fill = activeTab ? activeTab.querySelector('.tab-progress-fill') : null;
    if (!fill) return;

    fill.style.width = '0%';
    animStart = performance.now();

    function step(now) {
      if (!isPaused) {
        const elapsed = now - animStart;
        const pct = Math.min((elapsed / slideDuration) * 100, 100);
        fill.style.width = `${pct}%`;
      } else {
        animStart = now;
      }

      if (now - animStart < slideDuration) {
        animFrame = requestAnimationFrame(step);
      }
    }
    animFrame = requestAnimationFrame(step);
  }

  function next() {
    updateSlider(currentIndex + 1);
  }

  function prev() {
    updateSlider(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => {
      if (!isPaused) next();
    }, slideDuration);
    startProgressBar();
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    if (animFrame) cancelAnimationFrame(animFrame);
  }

  // Next / Prev button listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      next();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prev();
      startAutoplay();
    });
  }

  // Direct tab click listeners
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      if (i !== currentIndex) {
        updateSlider(i);
        startAutoplay();
      }
    });
  });

  // Pause on hover
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => { isPaused = true; });
    heroSection.addEventListener('mouseleave', () => {
      isPaused = false;
      animStart = performance.now();
    });

    // Mobile touch swipe gestures
    let touchStartX = 0;
    heroSection.addEventListener('touchstart', (e) => {
      isPaused = true;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      isPaused = false;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) next();
        else prev();
      }
      startAutoplay();
    }, { passive: true });
  }

  // Initialize first slide and start autoplay
  updateSlider(0);
  startAutoplay();
}
