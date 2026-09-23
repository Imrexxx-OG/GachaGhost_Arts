document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile nav toggle ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navBar = document.getElementById('nav-bar');

  if (menuToggle && navBar) {
    menuToggle.addEventListener('click', function () {
      navBar.classList.toggle('open');
    });

    // Close menu when a link is tapped
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

  /* ---------- Lightbox / gallery modal ---------- */
  const gallery = document.querySelectorAll('.progressive-img');
  const modal = document.getElementById('imageModal');
  if (!modal) return;

  const modalImage = document.getElementById('modalImage');
  const downloadBtn = document.getElementById('downloadBtn');
  const closeBtn = modal.querySelector('.close');
  let currentImageSrc = '';
  let currentIndex = -1;
  const images = Array.from(gallery);

  function openModal(index) {
    currentIndex = index;
    const img = images[index];
    currentImageSrc = img.dataset.src || img.src;
    modalImage.src = currentImageSrc;
    modalImage.alt = img.alt || '';
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

  document.addEventListener('keydown', function (event) {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowRight') showNext(1);
    if (event.key === 'ArrowLeft') showNext(-1);
  });

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