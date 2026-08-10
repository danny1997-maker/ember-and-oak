// HEADER SECTION

const navLinks = document.querySelector(".navLinks");
const hamburger = document.querySelector(".hamburger");
const header = document.querySelector(".header");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

updateHeader();

window.addEventListener("scroll", function () {
  updateHeader();
});

// TESTIMONIAL SECTION

const testimonialTrack = document.querySelector(".testimonialTrack");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dots = document.querySelectorAll(".dots");
const testimonialCard = document.querySelectorAll(".testimonialCard");
const testimonialCards = document.querySelector(".testimonialCards");

let currentSlide = 0;
let timer;
let startX;
let endX;

const nextSlide = () => {
  currentSlide++;
  if (currentSlide > testimonialCard.length - 1) {
    currentSlide = 0;
  }
  showSlide();
};

const prevSlide = () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = testimonialCard.length - 1;
  }
  showSlide();
};

function showSlide() {
  testimonialTrack.style.transform = `translateX(${currentSlide * -100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[currentSlide].classList.add("active");
}

const startAutoPlay = () => {
  timer = setInterval(nextSlide, 5000);
};

const stopAutoPlay = () => {
  clearInterval(timer);
};

startAutoPlay();

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide();
  });
});

testimonialCards.addEventListener("mouseenter", stopAutoPlay);
testimonialCards.addEventListener("mouseleave", startAutoPlay);

testimonialTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;;
});

testimonialTrack.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;;
  if (startX > endX) {
    nextSlide();
  }
  if (startX < endX) {
    prevSlide();
  }
});

