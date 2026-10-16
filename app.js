// ==========================================================================
// DIPLOMAT MANAGEMENT SERVICES (DMS BAHRAIN) - APP INTERACTIONS
// Outset Digital Design System Interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  try { initMobileMenu(); } catch(e) { console.error('Mobile menu init error:', e); }
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
  const navLinks = overlay ? overlay.querySelectorAll('a') : [];

  function openMenu() {
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (overlay) overlay.classList.remove('is-open');
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

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// 2. Navbar Scroll Effect: Header subtle elevation on scroll
function initNavbarScroll() {
  const header = document.querySelector('.site-header') || document.querySelector('.header-wrapper');
  if (!header) return;

  function handleScroll() {
    const isScrolled = window.scrollY > 40;
    header.classList.toggle('is-scrolled', isScrolled);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// 3. Interactive Capability Search & Trending Tags
function initCapabilitySearch() {
  const searchInput = document.getElementById('capabilitySearchInput');
  const categorySelect = document.getElementById('capabilityCategorySelect');
  const serviceCards = document.querySelectorAll('.capability-card, .service-card');
  const tagPills = document.querySelectorAll('.trending-pill-tag, .tag-pill');

  if (!searchInput && !categorySelect) return;

  function filterCards() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categorySelect ? categorySelect.value : 'all';

    serviceCards.forEach(card => {
      const titleElem = card.querySelector('.capability-title, .service-title');
      const descElem = card.querySelector('.capability-desc, .service-desc');
      const title = titleElem ? titleElem.innerText.toLowerCase() : '';
      const desc = descElem ? descElem.innerText.toLowerCase() : '';
      const category = card.getAttribute('data-category') || '';

      const matchesText = !query || title.includes(query) || desc.includes(query);
      const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);

      if (matchesText && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
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
  const filterTabs = document.querySelectorAll('.category-filter-btn, .filter-tab');
  const serviceCards = document.querySelectorAll('.capability-card, .service-card');

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

// 5. Interactive Outset Accordion
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.outset-accordion-item, .faq-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.outset-accordion-header, .faq-question');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open') || item.classList.contains('active');

      // Close other accordions
      accordionItems.forEach(other => {
        other.classList.remove('is-open');
        other.classList.remove('active');
        const toggle = other.querySelector('.outset-accordion-toggle');
        if (toggle) toggle.innerText = '+';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        item.classList.add('active');
        const toggle = item.querySelector('.outset-accordion-toggle');
        if (toggle) toggle.innerText = '−';
      }
    });
  });
}

// 6. Consultation & Service Detail Modals
function initModals() {
  const modalOverlay = document.getElementById('consultationModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="consultation"]');
  const closeModalBtns = document.querySelectorAll('.modal-close-icon, .modal-close-btn, #btnCloseModal');
  const consultationForm = document.getElementById('consultationForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-name');
      if (serviceName && document.getElementById('modalServiceSelect')) {
        document.getElementById('modalServiceSelect').value = serviceName;
      }
      if (modalOverlay) {
        modalOverlay.classList.add('is-open');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalOverlay) {
        modalOverlay.classList.remove('is-open');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('is-open');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Transmitting Request...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        alert('Thank you for reaching out to Diplomat Management Services. An executive advisor will contact you within 24 hours.');
        consultationForm.reset();
        if (submitBtn) {
          submitBtn.innerHTML = originalHtml;
          submitBtn.disabled = false;
        }
        if (modalOverlay) {
          modalOverlay.classList.remove('is-open');
          modalOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 700);
    });
  }
}

