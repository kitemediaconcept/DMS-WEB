const fs = require('fs');
const path = require('path');

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

const baseDir = path.join(__dirname, 'elementor-templates');
const headerDir = path.join(baseDir, '01-HEADER');
const footerDir = path.join(baseDir, '02-FOOTER');
const pagesDir = path.join(baseDir, '03-PAGES');
const sectionsDir = path.join(baseDir, '04-SECTIONS');
const downloadsDir = path.join(__dirname, 'downloads');

[baseDir, headerDir, footerDir, pagesDir, sectionsDir, downloadsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to create an Elementor HTML widget
function createHtmlWidget(title, htmlContent) {
  return {
    id: randomId(),
    elType: 'widget',
    isInner: false,
    settings: {
      html: htmlContent,
      _margin: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true },
      _padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true }
    },
    defaultEditSettings: {},
    widgetType: 'html'
  };
}

// Helper to create an Elementor Section
function createSection(widgets, customSettings = {}) {
  return {
    id: randomId(),
    elType: 'section',
    isInner: false,
    settings: {
      layout: 'full_width',
      gap: 'no',
      content_width: { unit: '%', size: 100 },
      ...customSettings
    },
    defaultEditSettings: {},
    elements: [
      {
        id: randomId(),
        elType: 'column',
        isInner: false,
        settings: {
          _column_size: 100,
          _inline_size: null,
          padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true }
        },
        defaultEditSettings: {},
        elements: widgets
      }
    ]
  };
}

// Read CSS
const mainCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

// ==========================================
// 1. STANDALONE NAVBAR / HEADER MARKUP
// ==========================================
const headerOnlyMarkup = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
${mainCss}
</style>

<div class="header-wrapper" style="position: relative; top: 0; padding: 20px 16px; margin: 0 auto; display: flex; justify-content: center;">
  <nav class="capsule-nav" style="width: 100%; max-width: 1100px;">
    <div class="nav-brand">
      <a href="/">
        <img src="assets/dms-logo-nav-original.png" alt="Diplomat Management Services" class="nav-brand-img" style="height: 38px; width: auto;">
      </a>
    </div>

    <ul class="nav-links">
      <li><a href="#capabilities" class="active">Capabilities</a></li>
      <li><a href="#positioning">Strategic Value</a></li>
      <li><a href="#story">Our Story (1984)</a></li>
      <li><a href="#accreditations">Accreditations</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>

    <div class="nav-actions">
      <a href="#contact" class="btn-contact-pill">
        <span>Book Consultation</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>
  </nav>
</div>
`;

// ==========================================
// 2. STANDALONE FOOTER MARKUP
// ==========================================
const footerOnlyMarkup = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
${mainCss}
</style>

<footer class="site-footer" style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 70px 0 30px 0;">
  <div class="container" style="max-width: 1240px; margin: 0 auto; padding: 0 24px;">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/dms-logo-original.png" alt="Diplomat Management Services Co. W.L.L." style="height: 52px; width: auto; margin-bottom: 8px;">
        <p style="font-size: 14px; color: #475569; margin-top: 16px; line-height: 1.6; max-width: 320px;">
          Strategic Business Support & Government Relations Partner in the Kingdom of Bahrain. Established 1984.
        </p>
      </div>

      <div class="footer-col">
        <h5 style="font-size: 15px; font-weight: 700; color: #090e17; margin-bottom: 20px;">Capabilities</h5>
        <ul class="footer-links" style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
          <li><a href="#capabilities">Bahrain Visas & Permits</a></li>
          <li><a href="#capabilities">Company Formation</a></li>
          <li><a href="#capabilities">Bahrain Golden Visa</a></li>
          <li><a href="#capabilities">Saudi Visa Services</a></li>
          <li><a href="#capabilities">Annual Compliance & WPS</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5 style="font-size: 15px; font-weight: 700; color: #090e17; margin-bottom: 20px;">Company</h5>
        <ul class="footer-links" style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
          <li><a href="#story">Our Story (1984)</a></li>
          <li><a href="#positioning">Strategic Value</a></li>
          <li><a href="#accreditations">Saudi Embassy Agent</a></li>
          <li><a href="#accreditations">LMRA Centre</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>

      <div class="footer-col footer-contact-info">
        <h5 style="font-size: 15px; font-weight: 700; color: #090e17; margin-bottom: 20px;">Corporate Office</h5>
        <p style="font-size: 13.5px; color: #475569; margin-bottom: 10px; line-height: 1.5;">Office No 21 & 22, Building 08, Road 1901, Block 319 Kingdom Tower, Al Hoora, Kingdom of Bahrain</p>
        <p style="font-size: 13.5px; color: #475569; margin-bottom: 8px;"><strong>Tel:</strong> +973 17290001</p>
        <p style="font-size: 13.5px; color: #475569; margin-bottom: 8px;"><strong>Mobile:</strong> +973 39694343 / +973 39694436</p>
      </div>
    </div>

    <div class="footer-bottom" style="border-top: 1px solid #f1f5f9; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #94a3b8;">
      <p>© 1984 – 2026 Diplomat Management Services Co. W.L.L. All rights reserved.</p>
      <p>Reliable · Resourceful · Responsible</p>
    </div>
  </div>
</footer>
`;

// ==========================================
// 3. BODY SECTIONS MARKUP (HERO WITHOUT NAVBAR)
// ==========================================
const heroBodyMarkup = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
${mainCss}
</style>

<section class="hero-section" id="hero" style="min-height: auto; padding: 70px 0 80px 0;">
  <div class="hero-glow-bg"></div>
  <div class="hero-dots-bg"></div>
  <div class="container hero-content">
    <div class="hero-badge">
      <span class="sparkle">✨</span>
      <span>Reliable, Resourceful, Responsible · Established 1984</span>
    </div>

    <h1 class="hero-title">
      Strategic Business Support &<br>
      <span class="highlight-green">Government Relations</span>
      <span class="client-cluster">
        <span class="avatar-group">
          <span class="avatar-1">40+</span>
          <span class="avatar-2">BH</span>
          <span class="avatar-3">KSA</span>
        </span>
        <span class="cluster-text">1,500+ Clients</span>
      </span>
      Partner
    </h1>

    <p class="hero-subtitle">
      We simplify compliance, visa procedures, and government processes so corporate teams and entrepreneurs can focus on business growth. Four decades of trusted execution in the Kingdom of Bahrain.
    </p>

    <div class="hero-cta-group">
      <a href="#contact" class="btn-primary-pill">
        <span>Schedule Consultation</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
      <a href="#capabilities" class="btn-secondary-pill">Explore 11 Capabilities</a>
    </div>

    <div class="capability-search-box">
      <div class="search-box-header">
        <h4>What are you looking for?</h4>
      </div>
      <div class="search-bar-row">
        <div class="search-input-group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="search-input" placeholder="Search capability (e.g. Golden Visa, CR Setup, Saudi Visa)...">
        </div>
        <select class="search-select">
          <option value="all">All Categories</option>
          <option value="visa">Visa & Immigration</option>
          <option value="corporate">Corporate & CR</option>
          <option value="embassy">Saudi & Embassies</option>
          <option value="compliance">Compliance & WPS</option>
        </select>
        <select class="search-select">
          <option>Corporate / Enterprise</option>
          <option>Investor / Founder</option>
          <option>Individual / Family</option>
        </select>
        <button class="btn-search-action">Find Solution</button>
      </div>
      <div class="trending-searches">
        <span class="trending-label">Trending Solutions:</span>
        <span class="tag-pill">Bahrain Golden Visa</span>
        <span class="tag-pill">Company Formation</span>
        <span class="tag-pill">Saudi Visa</span>
        <span class="tag-pill">Document Attestation</span>
        <span class="tag-pill">WPS & LMRA Setup</span>
        <span class="tag-pill">Self-Sponsorship</span>
      </div>
    </div>
  </div>
</section>
`;

const trustMarkup = `
<div class="trust-bar-section" id="accreditations">
  <div class="container trust-bar-grid">
    <div class="trust-item">
      <div class="trust-badge-icon">🏛️</div>
      <div class="trust-item-content">
        <h5>Auth. Agent of Saudi Embassy</h5>
        <p>Accredited consular processing & visa facilitation</p>
      </div>
    </div>
    <div class="trust-item">
      <div class="trust-badge-icon">📋</div>
      <div class="trust-item-content">
        <h5>Auth. LMRA Registration Centre</h5>
        <p>Official Labour Market Regulatory support</p>
      </div>
    </div>
    <div class="trust-item">
      <div class="trust-badge-icon">⏳</div>
      <div class="trust-item-content">
        <h5>40+ Years in Bahrain</h5>
        <p>Continuously operating with trust since 1984</p>
      </div>
    </div>
    <div class="trust-item">
      <div class="trust-badge-icon">🤝</div>
      <div class="trust-item-content">
        <h5>1,500+ Active Clients</h5>
        <p>Corporate institutions, banks, families & investors</p>
      </div>
    </div>
  </div>
</div>
`;

const positioningMarkup = `
<section class="positioning-section" id="positioning">
  <div class="container">
    <span class="section-tag">Brand Philosophy</span>
    <h2 class="section-title">A Strategic Partner That Carries Your Function</h2>
    <p class="section-desc">Diplomat is not just a vendor you hire for a single errand. We act as an integral extension of your organization, removing regulatory friction so you can focus entirely on growth.</p>
    <div class="positioning-grid">
      <div class="positioning-card not-card">
        <span class="card-label-badge">❌ What We Are Not</span>
        <h3>A Vendor for One-off Tasks</h3>
        <ul class="positioning-list">
          <li><span class="icon">✕</span><span><strong>No generic paperwork runners:</strong> We architect compliant outcomes.</span></li>
          <li><span class="icon">✕</span><span><strong>No transactional vendor mindsets:</strong> We don't walk away when a single form is stamped.</span></li>
          <li><span class="icon">✕</span><span><strong>No confusing government bureaucracy:</strong> Free leadership from ministry queues.</span></li>
        </ul>
      </div>
      <div class="positioning-card are-card">
        <span class="card-label-badge">✓ What We Are</span>
        <h3>Your Ongoing Strategic Partner</h3>
        <ul class="positioning-list">
          <li><span class="icon">✓</span><span><strong>A dedicated function you hand over:</strong> We manage your entire government relations portfolio.</span></li>
          <li><span class="icon">✓</span><span><strong>Freed executive capacity:</strong> Leadership gains back hundreds of hours every quarter.</span></li>
          <li><span class="icon">✓</span><span><strong>Solutions, not new problems:</strong> Four decades of institutional mastery in Bahrain.</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>
`;

const servicesMarkup = `
<section class="services-section" id="capabilities">
  <div class="container">
    <div class="services-header-row">
      <div>
        <span class="section-tag">Our Capabilities</span>
        <h2 class="section-title">Core Services Driving Business Agility</h2>
        <p class="section-desc">11 Partner capabilities engineered to remove government complexity.</p>
      </div>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">01</span><h3 class="service-title">Bahrain Visa & Residence Permits</h3><p class="service-desc">Comprehensive handling of investor visas, employee work permits, and family residency coordination with LMRA and NPRA.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">LMRA & NPRA</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">02</span><h3 class="service-title">Company Formation Services</h3><p class="service-desc">End-to-end commercial registration (CR), foreign ownership setup, activity additions, and enterprise licensing with MOIC.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">MOIC Registration</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">03</span><h3 class="service-title">Bahrain Golden Visa Services</h3><p class="service-desc">Strategic qualification evaluation and precision documentation for high-net-worth individuals, property owners, and exceptional talents.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">10-Year Residency</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">04</span><h3 class="service-title">Family Joining Visa for KSA Residents</h3><p class="service-desc">Seamless Bahrain residency pathways for dependents of Saudi Iqama holders living across the Causeway or relocating to Bahrain.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">Causeway & GCC</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">05</span><h3 class="service-title">Document Attestation Services</h3><p class="service-desc">Official legalization of educational, corporate, and personal documents with Ministry of Foreign Affairs (MOFA), Notary, and foreign embassies.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">MOFA & Embassies</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">06</span><h3 class="service-title">Self-Sponsorship Visa Services</h3><p class="service-desc">Independent residence permit pathways without requiring a local corporate employer for property purchasers, retirees, and investors.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">Independent Living</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">07</span><h3 class="service-title">Global Visa Assistance</h3><p class="service-desc">Expert visa processing connecting Bahrain with the world — Schengen, UK, USA, Canada, and Asian business travel applications.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">Outbound Mobility</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">08</span><h3 class="service-title">Saudi Visa Services</h3><p class="service-desc">As an accredited Authorized Agent of the Saudi Embassy in Bahrain, we facilitate direct commercial, work visit, and family visas into KSA.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">Saudi Embassy Agent</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">09</span><h3 class="service-title">Management & Admin Consultancy</h3><p class="service-desc">Outsourced corporate administration, PRO fleet management, and business advisory services tailored for multinationals and local SMEs.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">Corporate Advisory</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">10</span><h3 class="service-title">Annual Compliance Services</h3><p class="service-desc">Total regulatory peace of mind covering Ultimate Beneficial Ownership (UBO) filings, Economic Substance (ESR), and audit report submissions.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">ESR & UBO Filings</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
      <div class="service-card">
        <div class="card-top"><span class="service-num-badge">11</span><h3 class="service-title">WPS Set Up & Support Services</h3><p class="service-desc">Complete compliance setup for Bahrain’s Wage Protection System (WPS) and authorized LMRA registrations, safeguarding legal corporate standing.</p></div>
        <div class="card-bottom"><span class="service-pill-tag">LMRA WPS Approved</span><a href="#contact" class="btn-card-learn">Inquire Capability →</a></div>
      </div>
    </div>
    <div class="compliance-banner" style="margin-top: 36px;">
      <div class="shield-icon">⚖️</div>
      <p><strong>Official Compliance Notice:</strong> Diplomat Management Services Co. W.L.L. provides strategic guidance, documentation coordination, and administrative assistance. Approval is subject to Immigration authorities based on eligibility. No guarantee of approval is implied.</p>
    </div>
  </div>
</section>
`;

const storyMarkup = `
<section class="story-section" id="story">
  <div class="container">
    <div class="story-header">
      <span class="section-tag">Four Decades of Trust</span>
      <h2 class="section-title">Built on Understanding. Grow Through Trust.</h2>
      <p class="section-desc">The narrative core of Diplomat since 1984 — listen carefully, explain clearly, and make the next step easier for the client.</p>
    </div>
    <div class="story-beats-container">
      <div class="story-beat-card">
        <span class="beat-number">Beat 01</span>
        <h4 class="beat-headline">1984 — One Man, One Conviction</h4>
        <p class="beat-body">Mohamed Al Yahya founded DMS with a simple belief: individuals and businesses seeking help with government procedures deserve clarity, patience, and practical support.</p>
      </div>
      <div class="story-beat-card">
        <span class="beat-number">Beat 02</span>
        <h4 class="beat-headline">The Founding Principle</h4>
        <p class="beat-body">Solutions, not new problems. "Listen carefully. Explain clearly. Be patient. Make the next step easier for the client." That formula remains unchanged today.</p>
      </div>
      <div class="story-beat-card">
        <span class="beat-number">Beat 03</span>
        <h4 class="beat-headline">Relationships Over Transactions</h4>
        <p class="beat-body">Rather than viewing applications as single invoices, DMS built multi-generational partnerships where companies rely on Diplomat as an organic extension of their own teams.</p>
      </div>
      <div class="story-beat-card">
        <span class="beat-number">Beat 04</span>
        <h4 class="beat-headline">Today — 40+ Years, 1,500 Clients</h4>
        <p class="beat-body">Modern systems backed by four decades of institutional memory, managing complex corporate compliance and global mobility with unmatched precision.</p>
      </div>
    </div>
  </div>
</section>
`;

const faqMarkup = `
<section class="faq-section" id="faq">
  <div class="container faq-grid">
    <div class="faq-sidebar">
      <span class="section-tag">Common Inquiries</span>
      <h3>Clear Answers to Regulatory Questions</h3>
      <p class="section-desc">Everything you need to know about partnering with Diplomat Management Services in Bahrain.</p>
      <div class="faq-support-box">
        <h5>Free Document Delivery</h5>
        <p>We provide complimentary pickup and delivery of sensitive official paperwork across Bahrain.</p>
        <a href="#contact" class="btn-primary-pill" style="padding: 10px 20px; font-size: 13.5px; display: inline-block;">Request Document Pickup</a>
      </div>
    </div>
    <div class="faq-list">
      <div class="faq-item active">
        <div class="faq-question"><span>Who is Diplomat Management Services (DMS) Bahrain?</span></div>
        <div class="faq-answer" style="max-height: none; padding-bottom: 20px;"><p>DMS is a Bahrain-based strategic consultancy with over 40 years of experience providing GRO, visa services, company formation, and corporate administration to enterprises and families.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-question"><span>What visa services does DMS offer?</span></div>
        <div class="faq-answer" style="max-height: none; padding-bottom: 20px;"><p>We manage Bahrain visit visas, Golden Visas, Self-Sponsorship residence permits, Family Joining visas for KSA Iqama holders, Saudi visas (as an authorized Saudi Embassy agent), and global outbound visas.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-question"><span>Do you provide company formation and CR renewal services?</span></div>
        <div class="faq-answer" style="max-height: none; padding-bottom: 20px;"><p>Yes. We manage end-to-end commercial registrations (CR), annual CR renewals, business activity amendments, commercial address updates, and equity ownership transfers with MOIC.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-question"><span>Does DMS handle mandatory annual compliance filings?</span></div>
        <div class="faq-answer" style="max-height: none; padding-bottom: 20px;"><p>Yes, including Ultimate Beneficial Ownership (UBO) declarations, Economic Substance Requirements (ESR) filings, and corporate annual audit report submissions.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-question"><span>Is there a document collection and delivery service?</span></div>
        <div class="faq-answer" style="max-height: none; padding-bottom: 20px;"><p>Yes. We provide safe, verified, and free pickup & delivery of confidential passports and corporate documentation directly across Bahrain.</p></div>
      </div>
    </div>
  </div>
</section>
`;

const contactMarkup = `
<section class="cta-banner-section" id="contact" style="background: #0f172a; padding: 80px 0;">
  <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 38px; font-weight: 800; color: white; margin-bottom: 14px;">Schedule an Advisory Consultation</h2>
    <p style="font-size: 16px; color: #cbd5e1; margin-bottom: 34px;">Connect with our senior government relations advisors for tailored compliance and visa execution.</p>
    <div style="background: white; border-radius: 20px; padding: 36px; text-align: left; box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
      <form action="#" method="POST">
        <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" required placeholder="e.g. Mohammed Al Khalifa"></div>
        <div class="form-group"><label class="form-label">Corporate Email or Phone</label><input type="text" class="form-input" required placeholder="name@company.com or +973 3969XXXX"></div>
        <div class="form-group"><label class="form-label">Interested Capability</label>
          <select class="form-select">
            <option>Bahrain Visa & Residence Permits</option>
            <option>Company Formation Services (CR)</option>
            <option>Bahrain Golden Visa (10 Years)</option>
            <option>Saudi Visa Services (Embassy Agent)</option>
            <option>Document Attestation Services</option>
            <option>WPS Set Up & Support (LMRA)</option>
          </select>
        </div>
        <div class="form-group"><label class="form-label">Specific Details / Requirement</label><textarea class="form-textarea" rows="3" placeholder="Briefly describe your requirements..."></textarea></div>
        <button type="submit" class="btn-primary-pill" style="width: 100%; justify-content: center; background: #00A859;">Submit Consultation Request</button>
      </form>
    </div>
  </div>
</section>
`;

// ==========================================
// GENERATE SEPARATE HEADER JSON FILES
// ==========================================
// 1. Theme Builder Header (type: "header")
const headerThemeBuilder = {
  version: '0.4',
  title: 'DMS - Floating Capsule Header (Theme Builder)',
  type: 'header',
  content: [ createSection([ createHtmlWidget('DMS Floating Header', headerOnlyMarkup) ]) ]
};
fs.writeFileSync(path.join(headerDir, 'dms-header-themebuilder.json'), JSON.stringify(headerThemeBuilder, null, 2), 'utf8');

// 2. Section Header (type: "section" for Free Elementor users)
const headerSection = {
  version: '0.4',
  title: 'DMS - Floating Capsule Header (Section Import)',
  type: 'section',
  content: [ createSection([ createHtmlWidget('DMS Floating Header', headerOnlyMarkup) ]) ]
};
fs.writeFileSync(path.join(headerDir, 'dms-header-section.json'), JSON.stringify(headerSection, null, 2), 'utf8');

// Also copy directly into downloads/
fs.copyFileSync(path.join(headerDir, 'dms-header-themebuilder.json'), path.join(downloadsDir, 'dms-header-themebuilder.json'));
fs.copyFileSync(path.join(headerDir, 'dms-header-section.json'), path.join(downloadsDir, 'dms-header-section.json'));

// ==========================================
// GENERATE SEPARATE FOOTER JSON FILES
// ==========================================
// 1. Theme Builder Footer (type: "footer")
const footerThemeBuilder = {
  version: '0.4',
  title: 'DMS - Executive Footer (Theme Builder)',
  type: 'footer',
  content: [ createSection([ createHtmlWidget('DMS Executive Footer', footerOnlyMarkup) ]) ]
};
fs.writeFileSync(path.join(footerDir, 'dms-footer-themebuilder.json'), JSON.stringify(footerThemeBuilder, null, 2), 'utf8');

// 2. Section Footer (type: "section" for Free Elementor users)
const footerSection = {
  version: '0.4',
  title: 'DMS - Executive Footer (Section Import)',
  type: 'section',
  content: [ createSection([ createHtmlWidget('DMS Executive Footer', footerOnlyMarkup) ]) ]
};
fs.writeFileSync(path.join(footerDir, 'dms-footer-section.json'), JSON.stringify(footerSection, null, 2), 'utf8');

// Also copy directly into downloads/
fs.copyFileSync(path.join(footerDir, 'dms-footer-themebuilder.json'), path.join(downloadsDir, 'dms-footer-themebuilder.json'));
fs.copyFileSync(path.join(footerDir, 'dms-footer-section.json'), path.join(downloadsDir, 'dms-footer-section.json'));

// ==========================================
// GENERATE CLEAN PAGE BODIES (NO DUPLICATE HEADER/FOOTER)
// ==========================================
const homeBodyContent = [heroBodyMarkup, trustMarkup, positioningMarkup, servicesMarkup, storyMarkup, faqMarkup, contactMarkup].join('\n');
const homePageClean = {
  version: '0.4',
  title: 'DMS - Homepage (Body Only - No Header/Footer)',
  type: 'page',
  content: [ createSection([ createHtmlWidget('DMS Homepage Body', homeBodyContent) ]) ]
};
fs.writeFileSync(path.join(pagesDir, 'dms-homepage-body.json'), JSON.stringify(homePageClean, null, 2), 'utf8');
fs.copyFileSync(path.join(pagesDir, 'dms-homepage-body.json'), path.join(downloadsDir, 'dms-homepage-body.json'));

// All-in-One Home Page (including Header & Footer for single page test)
const homeAllInOne = {
  version: '0.4',
  title: 'DMS - Homepage (All-In-One with Header & Footer)',
  type: 'page',
  content: [ createSection([ createHtmlWidget('DMS Homepage All In One', [headerOnlyMarkup, homeBodyContent, footerOnlyMarkup].join('\n')) ]) ]
};
fs.writeFileSync(path.join(pagesDir, 'dms-homepage-all-in-one.json'), JSON.stringify(homeAllInOne, null, 2), 'utf8');
fs.copyFileSync(path.join(pagesDir, 'dms-homepage-all-in-one.json'), path.join(downloadsDir, 'dms-homepage-all-in-one.json'));

// Services Page
const servicesPageClean = {
  version: '0.4',
  title: 'DMS - 11 Core Capabilities Page',
  type: 'page',
  content: [ createSection([ createHtmlWidget('DMS Services Page', [heroBodyMarkup, servicesMarkup, trustMarkup, contactMarkup].join('\n')) ]) ]
};
fs.writeFileSync(path.join(pagesDir, 'dms-services-page.json'), JSON.stringify(servicesPageClean, null, 2), 'utf8');
fs.copyFileSync(path.join(pagesDir, 'dms-services-page.json'), path.join(downloadsDir, 'dms-services-page.json'));

// About Page
const aboutPageClean = {
  version: '0.4',
  title: 'DMS - About Us & 1984 Story Page',
  type: 'page',
  content: [ createSection([ createHtmlWidget('DMS About Page', [heroBodyMarkup, storyMarkup, positioningMarkup, trustMarkup].join('\n')) ]) ]
};
fs.writeFileSync(path.join(pagesDir, 'dms-about-page.json'), JSON.stringify(aboutPageClean, null, 2), 'utf8');
fs.copyFileSync(path.join(pagesDir, 'dms-about-page.json'), path.join(downloadsDir, 'dms-about-page.json'));

// Contact Page
const contactPageClean = {
  version: '0.4',
  title: 'DMS - Contact Us Page',
  type: 'page',
  content: [ createSection([ createHtmlWidget('DMS Contact Page', [heroBodyMarkup, contactMarkup, trustMarkup, faqMarkup].join('\n')) ]) ]
};
fs.writeFileSync(path.join(pagesDir, 'dms-contact-page.json'), JSON.stringify(contactPageClean, null, 2), 'utf8');
fs.copyFileSync(path.join(pagesDir, 'dms-contact-page.json'), path.join(downloadsDir, 'dms-contact-page.json'));

// ==========================================
// SECTIONS DIRECTORY
// ==========================================
const sections = [
  { name: 'dms-hero-search-section.json', title: 'DMS - Hero Section with Capability Search', markup: heroBodyMarkup },
  { name: 'dms-11-services-grid.json', title: 'DMS - 11 Core Capabilities Grid', markup: servicesMarkup },
  { name: 'dms-brand-positioning.json', title: 'DMS - Brand Positioning (Strategic Partner)', markup: positioningMarkup },
  { name: 'dms-story-beats-timeline.json', title: 'DMS - 4 Story Beats Timeline', markup: storyMarkup },
  { name: 'dms-accreditations-bar.json', title: 'DMS - Accreditations Bar (Saudi & LMRA)', markup: trustMarkup },
  { name: 'dms-faq-accordion.json', title: 'DMS - FAQ Accordion', markup: faqMarkup },
  { name: 'dms-consultation-form.json', title: 'DMS - Advisory Consultation Form', markup: contactMarkup }
];

sections.forEach(s => {
  const sectionObj = {
    version: '0.4',
    title: s.title,
    type: 'section',
    content: [ createSection([ createHtmlWidget(s.title, s.markup) ]) ]
  };
  fs.writeFileSync(path.join(sectionsDir, s.name), JSON.stringify(sectionObj, null, 2), 'utf8');
  fs.copyFileSync(path.join(sectionsDir, s.name), path.join(downloadsDir, s.name));
});

console.log('Successfully generated clean separated Header, Footer, Page, and Section JSON templates!');
