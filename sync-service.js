/**
 * DIPLOMAT MANAGEMENT SERVICES (DMS BAHRAIN)
 * REAL-TIME AUTO-SYNCHRONIZATION SERVICE
 * Automatically mirrors code changes into Elementor .json & .zip templates
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function extractBlock(html, startToken, endToken) {
  const s = html.indexOf(startToken);
  if (s === -1) return '';
  const e = html.indexOf(endToken, s);
  if (e === -1) return '';
  return html.substring(s, e + endToken.length);
}

function extractMain(html) {
  return extractBlock(html, '<main>', '</main>');
}

function rebuildAll() {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] [Elementor Sync] Regenerating Elementor templates...`);

  const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const aboutHtml = fs.readFileSync(path.join(__dirname, 'about-us.html'), 'utf8');
  const catHtml = fs.readFileSync(path.join(__dirname, 'categories.html'), 'utf8');
  const blogsHtml = fs.readFileSync(path.join(__dirname, 'blogs.html'), 'utf8');
  const faqHtml = fs.readFileSync(path.join(__dirname, 'faq.html'), 'utf8');
  const contactHtml = fs.readFileSync(path.join(__dirname, 'contact-us.html'), 'utf8');

  // Extract components
  const headerBlock = extractBlock(indexHtml, '<header class="header-wrapper">', '</header>');
  const footerBlock = extractBlock(indexHtml, '<footer class="site-footer">', '</footer>');
  
  const scopedHeader = `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"><style>${css}</style>\n${headerBlock}`;
  const scopedFooter = `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"><style>${css}</style>\n${footerBlock}`;

  // 1. Separate Header Templates
  const headerUniversal = {
    version: '0.4',
    title: 'DMS - Floating Capsule Header (Universal Import)',
    type: 'section',
    page_settings: {},
    content: [ createSection([ createHtmlWidget('DMS Floating Header', scopedHeader) ]) ]
  };
  fs.writeFileSync(path.join(headerDir, 'dms-header-universal.json'), JSON.stringify(headerUniversal, null, 2));
  fs.writeFileSync(path.join(headerDir, 'dms-header-section.json'), JSON.stringify(headerUniversal, null, 2));
  fs.copyFileSync(path.join(headerDir, 'dms-header-universal.json'), path.join(downloadsDir, 'dms-header-universal.json'));
  fs.copyFileSync(path.join(headerDir, 'dms-header-section.json'), path.join(downloadsDir, 'dms-header-section.json'));

  const headerThemeBuilder = {
    version: '0.4',
    title: 'DMS - Floating Capsule Header (Theme Builder)',
    type: 'header',
    page_settings: {},
    content: [ createSection([ createHtmlWidget('DMS Floating Header', scopedHeader) ]) ]
  };
  fs.writeFileSync(path.join(headerDir, 'dms-header-themebuilder.json'), JSON.stringify(headerThemeBuilder, null, 2));
  fs.copyFileSync(path.join(headerDir, 'dms-header-themebuilder.json'), path.join(downloadsDir, 'dms-header-themebuilder.json'));

  // 2. Separate Footer Templates
  const footerUniversal = {
    version: '0.4',
    title: 'DMS - Executive Footer (Universal Import)',
    type: 'section',
    page_settings: {},
    content: [ createSection([ createHtmlWidget('DMS Executive Footer', scopedFooter) ]) ]
  };
  fs.writeFileSync(path.join(footerDir, 'dms-footer-universal.json'), JSON.stringify(footerUniversal, null, 2));
  fs.writeFileSync(path.join(footerDir, 'dms-footer-section.json'), JSON.stringify(footerUniversal, null, 2));
  fs.copyFileSync(path.join(footerDir, 'dms-footer-universal.json'), path.join(downloadsDir, 'dms-footer-universal.json'));
  fs.copyFileSync(path.join(footerDir, 'dms-footer-section.json'), path.join(downloadsDir, 'dms-footer-section.json'));

  const footerThemeBuilder = {
    version: '0.4',
    title: 'DMS - Executive Footer (Theme Builder)',
    type: 'footer',
    page_settings: {},
    content: [ createSection([ createHtmlWidget('DMS Executive Footer', scopedFooter) ]) ]
  };
  fs.writeFileSync(path.join(footerDir, 'dms-footer-themebuilder.json'), JSON.stringify(footerThemeBuilder, null, 2));
  fs.copyFileSync(path.join(footerDir, 'dms-footer-themebuilder.json'), path.join(downloadsDir, 'dms-footer-themebuilder.json'));

  // 3. Separate Page Templates (No duplicate header/footer)
  const fontLink = `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"><style>${css}</style>`;

  const pages = [
    { filename: 'dms-homepage-body.json', title: 'DMS - Homepage Body Only', html: extractMain(indexHtml) },
    { filename: 'dms-about-us-page.json', title: 'DMS - About Us Page Body', html: extractMain(aboutHtml) },
    { filename: 'dms-categories-page.json', title: 'DMS - 11 Service Categories Page', html: extractMain(catHtml) },
    { filename: 'dms-blogs-page.json', title: 'DMS - Blogs & Insights Page', html: extractMain(blogsHtml) },
    { filename: 'dms-faq-page.json', title: 'DMS - FAQ Page Body', html: extractMain(faqHtml) },
    { filename: 'dms-contact-us-page.json', title: 'DMS - Contact Us Page Body', html: extractMain(contactHtml) }
  ];

  pages.forEach(p => {
    const scopedMarkup = `${fontLink}\n${p.html}`;
    const pageObj = {
      version: '0.4',
      title: p.title,
      type: 'page',
      page_settings: {},
      content: [ createSection([ createHtmlWidget(p.title, scopedMarkup) ]) ]
    };
    fs.writeFileSync(path.join(pagesDir, p.filename), JSON.stringify(pageObj, null, 2));
    fs.copyFileSync(path.join(pagesDir, p.filename), path.join(downloadsDir, p.filename));
  });

  // 4. Section Templates
  const heroBlock = extractBlock(indexHtml, '<section class="hero-section" id="hero">', '</section>');
  const trustBlock = extractBlock(indexHtml, '<section class="trust-bar-section" id="accreditations">', '</section>');
  const positioningBlock = extractBlock(indexHtml, '<section class="positioning-section" id="positioning">', '</section>');
  const servicesBlock = extractBlock(indexHtml, '<section class="services-section" id="capabilities">', '</section>');
  const storyBlock = extractBlock(indexHtml, '<section class="story-section" id="story">', '</section>');
  const faqBlock = extractBlock(indexHtml, '<section class="faq-section" id="faq">', '</section>');
  const ctaBlock = extractBlock(indexHtml, '<section class="cta-banner-section">', '</section>');

  const sections = [
    { name: 'dms-hero-search-section.json', title: 'DMS - Hero Section with Capability Search', markup: heroBlock },
    { name: 'dms-11-services-grid.json', title: 'DMS - 11 Core Capabilities Grid', markup: servicesBlock },
    { name: 'dms-brand-positioning.json', title: 'DMS - Brand Positioning (Strategic Partner)', markup: positioningBlock },
    { name: 'dms-story-beats-timeline.json', title: 'DMS - 4 Story Beats Timeline', markup: storyBlock },
    { name: 'dms-accreditations-bar.json', title: 'DMS - Accreditations Bar (Saudi & LMRA)', markup: trustBlock },
    { name: 'dms-faq-accordion.json', title: 'DMS - FAQ Accordion', markup: faqBlock },
    { name: 'dms-consultation-form.json', title: 'DMS - Advisory Consultation Form', markup: ctaBlock }
  ];

  sections.forEach(s => {
    const scoped = `${fontLink}\n${s.markup}`;
    const obj = {
      version: '0.4',
      title: s.title,
      type: 'section',
      page_settings: {},
      content: [ createSection([ createHtmlWidget(s.title, scoped) ]) ]
    };
    fs.writeFileSync(path.join(sectionsDir, s.name), JSON.stringify(obj, null, 2));
    fs.copyFileSync(path.join(sectionsDir, s.name), path.join(downloadsDir, s.name));
  });

  // 5. ZIP Packaging
  try {
    execSync('powershell.exe -NoProfile -Command "Compress-Archive -Path @(\'elementor-templates\\01-HEADER\\*\', \'elementor-templates\\02-FOOTER\\*\') -DestinationPath \'dms-header-and-footer.zip\' -Force; Copy-Item \'dms-header-and-footer.zip\' -Destination \'downloads\\dms-header-and-footer.zip\' -Force"', { cwd: __dirname });
    execSync('powershell.exe -NoProfile -Command "Compress-Archive -Path \'elementor-templates\\*\' -DestinationPath \'dms-elementor-templates.zip\' -Force; Copy-Item \'dms-elementor-templates.zip\' -Destination \'downloads\\dms-elementor-templates.zip\' -Force"', { cwd: __dirname });
  } catch (err) {
    console.warn('[Elementor Sync] Zip packaging:', err.message);
  }

  console.log(`[${timestamp}] [Elementor Sync] SUCCESS: All updated separate pages, header, footer & zips built!`);
}

rebuildAll();

if (process.argv.includes('--watch') || process.argv.includes('-w')) {
  console.log('[Elementor Sync] Watching all HTML, CSS, and JS files for changes...');
  let debounceTimer = null;
  const filesToWatch = ['index.html', 'about-us.html', 'categories.html', 'blogs.html', 'faq.html', 'contact-us.html', 'styles.css', 'app.js'];

  filesToWatch.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      fs.watch(filePath, (eventType) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          console.log(`[Elementor Sync] Detected modification in: ${file}`);
          rebuildAll();
        }, 400);
      });
    }
  });
}
