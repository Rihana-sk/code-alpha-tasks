const images = document.querySelectorAll('.image-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterButtons = document.querySelectorAll('.filters button');

let currentIndex = 0;
let filteredImages = [];

function openLightbox(index) {
  lightbox.style.display = 'flex';
  lightboxImg.src = filteredImages[index].src;
  currentIndex = index;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function showNext() {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  lightboxImg.src = filteredImages[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  lightboxImg.src = filteredImages[currentIndex].src;
}

// Click on image to open lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    filteredImages = Array.from(document.querySelectorAll('.image-card:not(.hidden) img'));
    const actualIndex = filteredImages.indexOf(img);
    openLightbox(actualIndex);
  });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filters .active').classList.remove('active');
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.image-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});
