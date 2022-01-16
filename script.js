"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// sCROLLING
const btnScrollTo = document.querySelector(".btn--scroll-to");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log("section--1", s1coords);
  console.log("btn", e.target.getBoundingClientRect());
  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  /* window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  ); */
  /*   window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  }); */
  section1.scrollIntoView({
    behavior: "smooth",
  });
});
// /////////////////////////////
// PAGE NAVIGATION

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//     // practice purpose
//     /*   console.log(id.getBoundingClientRect());
//     const oldWay = document.querySelector(id).getBoundingClientRect();
//     console.log(oldWay);
//     console.log(oldWay.left, oldWay.top);
//     console.log("current scroll", window.scrollX, window.scrollY);
//     window.scrollTo({
//       left: oldWay.left + window.scrollX,
//       top: oldWay.top + window.scrollY,
//       behavior: "smooth",
//     }); */
//   });
// });
// 1. Add event listener to common parent element
// 2. Determine what element originate the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// ////////////////////////////////////
// TAB COMPONENT

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;
  // remove class
  tabs.forEach((el) => el.classList.remove("operations__tab--active"));
  tabsContent.forEach((el) =>
    el.classList.remove("operations__content--active")
  );
  // Activate tab
  clicked.classList.add("operations__tab--active");
  // Activated content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
// ////////////////////////////////////
// Menu fade animation

const handlerOver = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibiling = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    sibiling.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

/*
 nav.addEventListener("mouseover", function (e) {
  handlerOver(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handlerOver(e, 1);
}); 
*/
// Using bind Method
nav.addEventListener("mouseover", handlerOver.bind(0.5));
nav.addEventListener("mouseout", handlerOver.bind(1));

// ////////////////End Tabed Section////////

// ***********Sticky Navigation****************
/*
 const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener("scroll", function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}); 
*/
const callBack = function (entries) {
  /*  entries.forEach((entry) => {
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  }); */
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(callBack, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});
headerObserver.observe(header);

// *****END of Sticky Navigation*******

// *****Reaveal Section*******
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log("entry", entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);

  /*   entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
  }); */
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
// *****END of Reaveal Section*******
// *****Lazy loading*******
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
  //
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => {
  imgObserver.observe(img);
});
// *****END of Lazy loading*******

// *****Slider*******

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotsContainer = document.querySelector(".dots");
  let curSlide = 0;
  let maxSlide = slides.length - 1;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach(function (dot) {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;

      // -100px
    });
  };

  // nextSlide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);

    activateDot(curSlide);
  };
  // prevSlide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  // left && right key
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });
  // Dots funtionality
  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
// *****END of Slider*******

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");

// Creating and inserting elements

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent="We use cookied for improved functionality and analytics.";

// insertAdjacentHtml
// message.insertAdjacentHTML(
//   "beforeend",
//   "We use cookied for improved functionality and analytics. <button class='btn btn--close-cokkie'>Got it!</button>"
// );
message.innerHTML =
  "We use cookied for improved functionality and analytics. <button class='btn btn--close-cokkie'>Got it!</button>";

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector(".btn--close-cokkie")
  .addEventListener("click", function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

const h1 = document.querySelector("h1");

// Going downwards: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// Going upwards: parents

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways: sibilings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);

// Array.from(h1.parentElement.children, function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });
