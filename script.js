document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile nav toggle ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navBar = document.getElementById('nav-bar');

  if (menuToggle && navBar) {
    menuToggle.addEventListener('click', function () {
      navBar.classList.toggle('open');
    });

    navBar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navBar.classList.remove('open'));
    });
  }

  /* ---------- Mark current page in nav ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------- Header shrink on scroll ---------- */
  const header = document.querySelector('header');
  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ---------- Scroll-to-top button ---------- */
  const toTop = document.createElement('button');
  toTop.id = 'toTop';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.textContent = '↑';
  document.body.appendChild(toTop);

  function handleToTopVisibility() {
    toTop.classList.toggle('visible', window.scrollY > 500);
  }
  handleToTopVisibility();
  window.addEventListener('scroll', handleToTopVisibility, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Fade-in gallery tiles as they enter view ---------- */
  const figures = document.querySelectorAll('.container figure, .teaser-card');
  if ('IntersectionObserver' in window && figures.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    figures.forEach(fig => observer.observe(fig));
  } else {
    figures.forEach(fig => fig.classList.add('in-view'));
  }

  /* ---------- Lightbox / gallery modal ---------- */
  const gallery = document.querySelectorAll('.progressive-img');
  const modal = document.getElementById('imageModal');
  if (!modal) return;

  const modalImage = document.getElementById('modalImage');
  const downloadBtn = document.getElementById('downloadBtn');
  const closeBtn = modal.querySelector('.close');
  const prevBtn = modal.querySelector('.modal-prev');
  const nextBtn = modal.querySelector('.modal-next');
  const counterEl = modal.querySelector('.modal-counter');
  const captionEl = modal.querySelector('.modal-caption');

  let currentImageSrc = '';
  let currentIndex = -1;
  const images = Array.from(gallery);

  function openModal(index) {
    currentIndex = index;
    const img = images[index];
    currentImageSrc = img.dataset.src || img.src;
    modalImage.src = currentImageSrc;
    modalImage.alt = img.alt || '';
    if (counterEl) counterEl.textContent = (index + 1) + ' / ' + images.length;
    if (captionEl) captionEl.textContent = img.alt || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalImage.src = '';
    currentImageSrc = '';
    currentIndex = -1;
  }

  function showNext(step) {
    if (currentIndex === -1) return;
    currentIndex = (currentIndex + step + images.length) % images.length;
    openModal(currentIndex);
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', () => showNext(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => showNext(1));

  document.addEventListener('keydown', function (event) {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowRight') showNext(1);
    if (event.key === 'ArrowLeft') showNext(-1);
  });

  /* Swipe support for touch devices */
  let touchStartX = 0;
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) < 40) return;
    showNext(delta < 0 ? 1 : -1);
  }, { passive: true });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      if (!currentImageSrc) return;
      const link = document.createElement('a');
      link.href = currentImageSrc;
      link.download = currentImageSrc.split('/').pop() || 'GachaGhost.jpg';
      link.click();
    });
  }
});