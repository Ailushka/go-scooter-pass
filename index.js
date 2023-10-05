/* -------------------- */
/*    Carousel slider   */
/* -------------------- */

const sliderInstances = {};

const initSlider = (slider) => {
  const sliderContainer = slider.querySelector('.slider__container');
  const sliderItems = slider.querySelectorAll('.slider__item');
  const next = slider.querySelector('.slide-arrow_next');
  const prev = slider.querySelector('.slide-arrow_prev');
  const slideGap = parseInt(getComputedStyle(sliderContainer).gap, 10);
  let currentSlide = 0;

  sliderItems[currentSlide].classList.add("activeSlide");

  let itemWidth = sliderItems[0].clientWidth;

  const sliderItemsToShow = Math.floor(sliderContainer.clientWidth / itemWidth);

  let resizeTimer;

  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      currentSlide = 0;
      sliderContainer.style.transform = "translateY(0px)";
      prev.classList.add("slide-arrow_disabled");
      next.classList.remove("slide-arrow_disabled");
      itemWidth = sliderItems[0].clientWidth;
    }, 200);
  }

  sliderContainer.style.transform = "translateY(0px)";

  const toggleClass = (condition, elem, className) => {
    condition
        ? elem.classList.add(className)
        : elem.classList.remove(className);
  };

  const handlePrevNextBtn = () => {
    toggleClass(currentSlide === 0, prev, "slide-arrow_disabled");
    toggleClass(currentSlide === sliderItems.length - sliderItemsToShow, next, "slide-arrow_disabled");
  };

  handlePrevNextBtn();

  const handleSlide = (condition, slideElem, event) => {
    const slideTransformValue = slideElem.style.transform;
    const translateXValue = slideTransformValue.replace(/[^\d.]/g, "");

    if (condition && event === "next") {
      currentSlide += 1;
      slideElem.style.transform = `translateX(-${
          +translateXValue + itemWidth + slideGap
      }px)`;
    } else if (condition && event === "prev") {
      currentSlide -= 1;
      slideElem.style.transform = `translateX(-${
          +translateXValue - itemWidth - slideGap
      }px)`;
    }
    sliderItems.forEach((e) => e.classList.remove("activeSlide"));
    sliderItems[currentSlide].classList.add("activeSlide");
  };

  const handleNextClick = () => {
    handleSlide(currentSlide !== sliderItems.length - sliderItemsToShow, sliderContainer, "next");
    handlePrevNextBtn();
  };

  const handlePrevClick = () => {
    handleSlide(currentSlide !== 0, sliderContainer, "prev");
    handlePrevNextBtn();
  };

  next.addEventListener("click", handleNextClick);
  prev.addEventListener("click", handlePrevClick);

  const removeClickHandlers = () => {
    next.removeEventListener("click", handleNextClick);
    prev.removeEventListener("click", handlePrevClick);
  };

  sliderInstances[slider.getAttribute("id")] = {
    removeClickHandlers,
    sliderContainer,
    next,
    prev
  };
};

const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => initSlider(slider));

// /* -------------------- */
// /*Circular spinning text*/
// /* -------------------- */
//
// let offsetRadiusStep = 5;
// let circularTexts = document.querySelectorAll(".circular");
// circularTexts.forEach(circularText => {
//   let letters = circularText.textContent.split("");
//   let total = letters.length;
//   circularText.style.setProperty("--total", `${total}`);
//   circularText.textContent = "";
//   letters.forEach((letter, i) => {
//     let span = document.createElement("span");
//     span.textContent = letter;
//     span.style.setProperty("--i", `${i}`);
//     let offsetRadius = offsetRadiusStep * total;
//     let offsetPath = `path('M 0,${offsetRadius} a ${offsetRadius},${offsetRadius} 0 1,1 0,1 z')`;
//     span.style.setProperty("--offset-path", offsetPath);
//     circularText.append(span);
//   });
// });

