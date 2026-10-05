const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

function closeMenu(returnFocus = false) {
  if (!menuButton || !header) return;
  menuButton.setAttribute('aria-expanded', 'false');
  header.classList.remove('menu-open');
  document.body.classList.remove('menu-active');
  const label = menuButton.querySelector('.sr-only');
  if (label) label.textContent = 'Open menu';
  if (returnFocus) menuButton.focus();
}

if (menuButton && nav && header) {
  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    header.classList.toggle('menu-open', willOpen);
    document.body.classList.toggle('menu-active', willOpen);
    const label = menuButton.querySelector('.sr-only');
    if (label) label.textContent = willOpen ? 'Close menu' : 'Open menu';
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (header.classList.contains('menu-open') && !header.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) closeMenu();
  });
}

const currentPage = document.body.dataset.page;
document.querySelectorAll('[data-nav-page]').forEach(link => {
  if (link.dataset.navPage === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

document.querySelectorAll('[data-year]').forEach(year => {
  year.textContent = new Date().getFullYear();
});

const iconPaths = {
  scales: '<path d="M12 3v18M6 6h12M5 6l-3 6h6L5 6Zm14 0-3 6h6l-3-6ZM2 12c.5 2 1.5 3 3 3s2.5-1 3-3m8 0c.5 2 1.5 3 3 3s2.5-1 3-3M7 21h10"/>',
  gavel: '<path d="m14 6 4 4M6 14l4 4M9 15l7-7M7 13l-2 2 4 4 2-2M14 5l2-2 5 5-2 2M3 21h12"/>',
  handshake: '<path d="M8 12 11 9a2 2 0 0 1 3 0l2 2M3 10l4-4 3 2M21 10l-4-4-3 2M7 14l4 4a2 2 0 0 0 3 0l4-4M5 12l-2 2 4 4 2-2M19 12l2 2-4 4-2-2"/>',
  conversation: '<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/>',
  document: '<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
  building: '<path d="M3 21h18M5 21V8l7-4 7 4v13M9 11v2M15 11v2M9 16v2M15 16v2"/>',
  shield: '<path d="M12 3 5 6v5c0 4.8 2.7 8 7 10 4.3-2 7-5.2 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  briefcase: '<path d="M4 7h16v12H4V7Z"/><path d="M9 7V4h6v3M4 12h16M10 12v2h4v-2"/>',
  people: '<path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21c0-4 2.5-7 7-7s7 3 7 7M17 4a3 3 0 0 1 0 6M18 14c2.7.7 4 3 4 6"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H4V4Zm16 0h-4a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h4V4Z"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="1"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'
};

function chooseIcon(text = '') {
  const value = text.toLowerCase();
  if (value.includes('arbitr') || value.includes('impartial')) return 'scales';
  if (value.includes('mediat') || value.includes('agreement')) return 'handshake';
  if (value.includes('concili') || value.includes('listen') || value.includes('empathy')) return 'conversation';
  if (value.includes('negoti') || value.includes('dialogue')) return 'conversation';
  if (value.includes('workplace') || value.includes('commercial') || value.includes('business')) return 'briefcase';
  if (value.includes('family') || value.includes('people') || value.includes('respect')) return 'people';
  if (value.includes('property') || value.includes('construction')) return 'building';
  if (value.includes('training') || value.includes('knowledge')) return 'book';
  if (value.includes('confidential') || value.includes('privacy')) return 'lock';
  if (value.includes('integrity') || value.includes('protect') || value.includes('prevent')) return 'shield';
  if (value.includes('outcome') || value.includes('resolve') || value.includes('vision') || value.includes('mission')) return 'target';
  if (value.includes('formal') || value.includes('legal')) return 'gavel';
  return 'document';
}

function iconMarkup(name) {
  return `<span class="legal-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${iconPaths[name] || iconPaths.document}</svg></span>`;
}

document.querySelectorAll('.service-strip article').forEach(card => {
  const title = card.querySelector('h2, h3')?.textContent || '';
  const oldIcon = card.querySelector('.round-icon');
  if (oldIcon) oldIcon.outerHTML = iconMarkup(chooseIcon(title));
});

document.querySelectorAll('.practice-card, .feature-card').forEach(card => {
  if (card.querySelector('.legal-icon')) return;
  const title = card.querySelector('h2, h3')?.textContent || '';
  card.insertAdjacentHTML('afterbegin', iconMarkup(chooseIcon(title)));
});

const whatsappMessage = 'Hello Resolia Conseil, I would like to enquire about your dispute resolution services.';
const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
const whatsappIcon = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16.04 3A12.76 12.76 0 0 0 5.1 22.34L3 29l6.86-2.02A12.76 12.76 0 1 0 16.04 3Zm0 23.22c-2.07 0-4.08-.61-5.79-1.77l-.42-.28-4.07 1.2 1.24-3.95-.3-.44a10.45 10.45 0 1 1 9.34 5.24Zm5.73-7.83c-.31-.16-1.86-.92-2.15-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.24-.68.08-1.85-.92-3.06-1.65-4.29-3.75-.32-.55.32-.51.92-1.7.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.86-.76 2.12-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.6-.37Z"/></svg>';

const floatingWhatsApp = document.createElement('a');
floatingWhatsApp.className = 'whatsapp-float';
floatingWhatsApp.href = whatsappUrl;
floatingWhatsApp.target = '_blank';
floatingWhatsApp.rel = 'noopener noreferrer';
floatingWhatsApp.setAttribute('aria-label', 'Chat with Resolia Conseil on WhatsApp');
floatingWhatsApp.dataset.tooltip = 'Chat with us';
floatingWhatsApp.innerHTML = whatsappIcon;
document.body.appendChild(floatingWhatsApp);

const footerContact = document.querySelector('.footer-col:last-child');
if (footerContact) {
  const footerWhatsApp = document.createElement('a');
  footerWhatsApp.className = 'footer-whatsapp';
  footerWhatsApp.href = whatsappUrl;
  footerWhatsApp.target = '_blank';
  footerWhatsApp.rel = 'noopener noreferrer';
  footerWhatsApp.innerHTML = `${whatsappIcon}<span>Chat with us on WhatsApp</span>`;
  footerContact.appendChild(footerWhatsApp);
}

const contactCard = document.querySelector('.contact-card');
if (contactCard) {
  const contactWhatsApp = document.createElement('a');
  contactWhatsApp.className = 'contact-whatsapp';
  contactWhatsApp.href = whatsappUrl;
  contactWhatsApp.target = '_blank';
  contactWhatsApp.rel = 'noopener noreferrer';
  contactWhatsApp.innerHTML = `${whatsappIcon}<span>Start a WhatsApp enquiry</span>`;
  contactCard.appendChild(contactWhatsApp);
}

const enquiryForm = document.querySelector('[data-enquiry-form]');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const data = new FormData(enquiryForm);
    const subject = `${data.get('service')} enquiry from ${data.get('name')}`;
    const body = [`Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Service: ${data.get('service')}`, '', data.get('message')].join('\n');
    window.location.href = `mailto:contact@resoliaconseil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('main section:not(.home-hero):not(.page-hero), .service-row, .feature-card, .practice-card, .insight-card, .process-list li, .contact-card');
revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  if (!reduceMotion) element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach(element => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -35px' });
  revealTargets.forEach(element => observer.observe(element));
}

document.querySelectorAll('img').forEach(image => {
  image.decoding = 'async';
  if (!image.closest('.home-hero, .page-hero, .brand, .footer-logo')) image.loading = 'lazy';
});

const onScroll = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
