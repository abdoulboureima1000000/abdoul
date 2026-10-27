/**
 * MovieAll - Showcase Website Script
 * Interactive features: 3D phone tilt, screenshot carousel, lightbox,
 * category filters, accordion, download feedback, animations.
 * 
 * Toutes les descriptions ont été méticuleusement alignées avec chaque capture d'écran réelle.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroTilt();
  initScreenshotsGallery();
  initLightbox();
  initFaqAccordion();
  initDownloadFeedback();
  initScrollAnimations();
  initMetricsCounter();
  initBackToTop();
});

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky nav change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile hamburger toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. Hero 3D Phone Tilt Effect
   ========================================================================== */
function initHeroTilt() {
  const heroVisual = document.querySelector('.hero-visual');
  const phoneMockup = document.querySelector('.phone-mockup-wrapper');

  if (!heroVisual || !phoneMockup) return;

  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);

    phoneMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  heroVisual.addEventListener('mouseleave', () => {
    phoneMockup.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   3. Screenshot Gallery & Filter (Données 100% Fidèles aux Captures)
   ========================================================================== */
const screenshotData = [
  {
    id: 1,
    img: 'assets/screenshots/screen-1.jpg',
    title: "Accueil, Reprise & Chaînes en Direct",
    category: 'home',
    categoryName: 'Accueil & TV Direct',
    desc: "Écran d'accueil complet avec bannière « À la une » (Fall 2 : Deadpoint), carrousel « Continuer à regarder » avec reprise exacte du temps restant, et accès immédiat aux Chaînes en Direct 24/7 (télévision, foot en direct, ADN TV+, Euronews en 720p)."
  },
  {
    id: 2,
    img: 'assets/screenshots/screen-2.jpg',
    title: "Catalogue French Stream (Films & Séries)",
    category: 'sources',
    categoryName: 'French Stream',
    desc: "Onglet source « French Stream » permettant de basculer entre films et séries par plateforme. Affichage en grille haute définition avec filtres Nouveautés et badges clairs VF/VOSTFR (ex. Par Tous Les Moyens, Bad Apples, Sacrifice)."
  },
  {
    id: 3,
    img: 'assets/screenshots/screen-3.jpg',
    title: "Catalogue Anime-Sama (Animés & Films)",
    category: 'sources',
    categoryName: 'Anime-Sama',
    desc: "Intégration directe de la source « Anime-Sama » avec filtres En cours, Terminés et En VF. Navigation parmi les animés cultes et nouveautés avec jaquettes haute résolution (Akane Banashi, 86 Eighty Six, A Silent Voice)."
  },
  {
    id: 4,
    img: 'assets/screenshots/screen-4.jpg',
    title: "Catalogue French-Manga (Genres & VOSTFR)",
    category: 'sources',
    categoryName: 'French-Manga',
    desc: "Source « French-Manga » avec navigation par Genres, Thèmes & Tags. Vue des derniers animes récemment mis à jour en VOSTFR et VF (Cyberpunk : Edgerunners Saison 2, Suikoden, The Laid-Off Cheat-Grant Mage)."
  },
  {
    id: 5,
    img: 'assets/screenshots/screen-5.jpg',
    title: "Fiche Détaillée & Choix VF / VOSTFR (One Piece)",
    category: 'details-scans',
    categoryName: 'Fiche & Épisodes',
    desc: "Fiche complète avec jaquette, badges (54 saisons, source Anime-Sama), bouton direct pour lancer la vidéo ou ouvrir les Scans. Découpage précis par sagas avec choix instantané entre VF et VOSTFR (East Blue, Alabasta, Île Céleste)."
  },
  {
    id: 6,
    img: 'assets/screenshots/screen-6.jpg',
    title: "Lecteur de Scans Manga Intégré (Couleur & Chapitres)",
    category: 'details-scans',
    categoryName: 'Lecteur Scans Manga',
    desc: "Liseuse de scans manga intégrée avec lecture plein écran en couleur (One Piece Chapitre 1004). Barre de contrôle inférieure avec compteur de pages (7/16), curseur de défilement rapide et navigation de chapitre à chapitre."
  },
  {
    id: 7,
    img: 'assets/screenshots/screen-7.jpg',
    title: "Gestionnaire de Téléchargements Hors-Ligne",
    category: 'downloads-settings',
    categoryName: 'Téléchargements',
    desc: "Tableau de bord hors-ligne affichant le statut en cours, la vitesse réseau, le nombre de fichiers terminés (14) et l'espace disque consommé (3.99 Go). Épisodes prêts pour la lecture hors-ligne (Ao Ashi en 1080p, Cyberpunk : Edgerunners)."
  },
  {
    id: 8,
    img: 'assets/screenshots/screen-8.jpg',
    title: "Personnalisation des Couleurs & Thèmes Exclusifs",
    category: 'downloads-settings',
    categoryName: 'Thèmes & Couleurs',
    desc: "Personnalisation complète de l'application : suivi des couleurs dynamiques système Android 12+, sélection parmi 12 palettes de couleurs d'accentuation, et thèmes exclusifs (Netflix, Crunchyroll, Midnight Tokyo, Arctic Aurora)."
  },
  {
    id: 9,
    img: 'assets/screenshots/screen-9.jpg',
    title: "Lecteur Vidéo Pro avec Saut de Générique (+85s)",
    category: 'player-search',
    categoryName: 'Lecteur Vidéo Pro',
    desc: "Lecteur vidéo haute performance (JoJo's Bizarre Adventure) avec commandes complètes : avance/recul de 30 secondes, bouton d'évitement de générique (+85s), sélection de qualité HD, réglage de la vitesse (1x), et verrouillage de l'écran."
  },
  {
    id: 10,
    img: 'assets/screenshots/screen-10.jpg',
    title: "Recherche Instantanée Multi-Saisons (Power Book)",
    category: 'player-search',
    categoryName: 'Recherche Instantanée',
    desc: "Moteur de recherche rapide avec suggestions immédiates. Résultats classés avec précision par saisons et versions audio VF (Power Book II : Ghost, Power Book III : Raising Kanan, Power Book IV : Force)."
  }
];

let currentLightboxIndex = 0;

function initScreenshotsGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!carouselTrack) return;

  // Render cards
  renderCarouselCards('all');

  // Filter click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderCarouselCards(filter);
    });
  });

  // Controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
}

function renderCarouselCards(filterCategory) {
  const carouselTrack = document.querySelector('.carousel-track');
  if (!carouselTrack) return;

  const filtered = filterCategory === 'all' 
    ? screenshotData 
    : screenshotData.filter(item => item.category === filterCategory);

  carouselTrack.innerHTML = '';

  filtered.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.setAttribute('data-id', item.id);
    card.innerHTML = `
      <div class="gallery-phone-frame">
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="expand-overlay">
          <div class="expand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </div>
        </div>
      </div>
      <div class="screenshot-info">
        <div class="screenshot-badge">${item.categoryName}</div>
        <div class="screenshot-title">${item.title}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(item.id - 1);
    });

    carouselTrack.appendChild(card);
  });
}

/* ==========================================================================
   4. Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!modal) return;

  closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  const modal = document.querySelector('.lightbox-modal');
  if (!modal) return;

  currentLightboxIndex = index;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + screenshotData.length) % screenshotData.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = screenshotData[currentLightboxIndex];
  const imgElem = document.querySelector('.lightbox-phone img');
  const catElem = document.querySelector('.lightbox-category');
  const titleElem = document.querySelector('.lightbox-title');
  const descElem = document.querySelector('.lightbox-description');

  if (imgElem) imgElem.src = item.img;
  if (catElem) catElem.textContent = item.categoryName;
  if (titleElem) titleElem.textContent = item.title;
  if (descElem) descElem.textContent = item.desc;
}

/* ==========================================================================
   5. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ==========================================================================
   6. Download Feedback Toast
   ========================================================================== */
function initDownloadFeedback() {
  const downloadBtns = document.querySelectorAll('.direct-download-action');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isArm64 = btn.href && btn.href.includes('arm64');
      const filename = isArm64 ? 'MovieAll-v0.1.1-arm64.apk' : 'MovieAll-v0.1.1.apk';
      const size = isArm64 ? '15 Mo' : '34 Mo';
      showToast(
        '🚀 Téléchargement démarré !',
        `Le fichier ${filename} (${size}) est en cours de téléchargement. Ouvrez-le pour installer l\'application.`
      );
    });
  });
}

function showToast(title, message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">✓</div>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 5000);
}

/* ==========================================================================
   7. Scroll Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. Metrics Counter Animation
   ========================================================================== */
function initMetricsCounter() {
  const metricValues = document.querySelectorAll('.metric-val-number');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  metricValues.forEach(el => observer.observe(el));
}

function animateCounter(element, target) {
  let count = 0;
  const duration = 1500;
  const stepTime = 20;
  const totalSteps = duration / stepTime;
  const increment = target / totalSteps;

  const timer = setInterval(() => {
    count += increment;
    if (count >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(count).toLocaleString();
    }
  }, stepTime);
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
