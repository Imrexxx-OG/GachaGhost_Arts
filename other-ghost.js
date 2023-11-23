document.addEventListener('DOMContentLoaded', function () {
  const progressiveImages = document.querySelectorAll('.progressive-img');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const downloadBtn = document.getElementById('downloadBtn');
  let currentImageSrc = ''; // Variable to store the high-quality source

  progressiveImages.forEach(image => {
    image.addEventListener('click', function () {
      const lowQualitySrc = this.src;
      currentImageSrc = this.dataset.src; // Store the high-quality source
      modalImage.src = currentImageSrc; // Use the high-quality source for preview
      modal.style.display = 'block';
    });
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none';
  });

  downloadBtn.addEventListener('click', function () {
    if (currentImageSrc) {
      const downloadLink = document.createElement('a');
      downloadLink.href = currentImageSrc;
      downloadLink.download = 'Gacha_Ghost.jpg';
      downloadLink.click();
    }

    // Reset modal state
    modal.style.display = 'none';
    modalImage.src = '';
    currentImageSrc = ''; // Reset the high-quality source
  });
});
