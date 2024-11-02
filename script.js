const project_carousel = document.querySelector(".project-carousel");
const arrowBtns = document.querySelectorAll(".project-wrapper i");
const firstCardWidth = project_carousel.querySelector(".project-card").offsetWidth;
const carouselChildrens = [...project_carousel.children];
const project_wrapper = document.querySelector(".project-wrapper");

let isDragging = false, startX, startScrollLeft, autoplayInterval;

let cardPerView = Math.round(project_carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(project_card => {
  project_carousel.insertAdjacentHTML('afterbegin', project_card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(project_card => {
  project_carousel.insertAdjacentHTML('beforeend', project_card.outerHTML);
});

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    project_carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
}

const dragStop = (e) => {
  isDragging = false;
}

const infiniteScroll = () => {
  if(isDragging) return;
  else if(project_carousel.scrollLeft === 0){
    project_carousel.classList.add("no-transition");
    project_carousel.scrollLeft = project_carousel.scrollWidth - 2*project_carousel.offsetWidth;
    project_carousel.classList.remove("no-transition");
  }
  else if(Math.ceil(project_carousel.scrollLeft) === project_carousel.scrollWidth - project_carousel.offsetWidth){
    project_carousel.classList.add("no-transition");
    project_carousel.scrollLeft = project_carousel.offsetWidth;
    project_carousel.classList.remove("no-transition");
  }
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    project_carousel.scrollLeft += firstCardWidth;
  }, 3000);
}

project_wrapper.addEventListener('mouseenter', () => {
  clearInterval(autoplayInterval);
});

project_wrapper.addEventListener('mouseleave', () => {
  startAutoplay();
});

startAutoplay();
project_carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
project_carousel.addEventListener("scroll", infiniteScroll);