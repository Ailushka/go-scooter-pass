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

  if (currentSlide === 0) {
    prev.classList.add("slide-arrow_disabled");
  }

  let itemWidth = sliderItems[0].clientWidth;

  const sliderItemsToShow = Math.floor(sliderContainer.clientWidth / itemWidth);

  let touchStartX = 0;
  let touchMoveX = 0;

  sliderContainer.style.transform = "translateY(0px)";

  const toggleClass = (condition, elem, className) => {
    condition
        ? elem.classList.add(className)
        : elem.classList.remove(className);
  };

  const handleSlide = (condition, slideElem, direction) => {
    if (condition) {
      currentSlide += direction;
      const translateXValue = -currentSlide * (itemWidth + slideGap);
      slideElem.style.transform = `translateX(${translateXValue}px)`;
    }
    sliderItems.forEach((e) => e.classList.remove("activeSlide"));
    sliderItems[currentSlide].classList.add("activeSlide");
    handlePrevNextBtn();
  };

  const handlePrevNextBtn = () => {
    toggleClass(currentSlide === 0, prev, "slide-arrow_disabled");
    toggleClass(currentSlide === sliderItems.length - sliderItemsToShow, next, "slide-arrow_disabled");
  };

  // Обработчики touch events для слайдера
  let touchStartClientX = null;

  const handleTouchStart = (e) => {
    touchStartClientX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!touchStartClientX) {
      return;
    }

    const touchMoveX = e.touches[0].clientX;
    const deltaX = touchMoveX - touchStartClientX;

    if (deltaX > 50) {
      // Пользователь свайпнул вправо (предыдущий слайд)
      handleSlide(currentSlide !== 0, sliderContainer, -1);
      touchStartClientX = null;
    } else if (deltaX < -50) {
      // Пользователь свайпнул влево (следующий слайд)
      handleSlide(currentSlide !== sliderItems.length - sliderItemsToShow, sliderContainer, 1);
      touchStartClientX = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartClientX = null;
  };

  // Добавляем обработчики touch events к слайдеру
  sliderContainer.addEventListener("touchstart", handleTouchStart);
  sliderContainer.addEventListener("touchmove", handleTouchMove);
  sliderContainer.addEventListener("touchend", handleTouchEnd);

  // Обработчики touch events для кнопок "Next" и "Prev"
  next.addEventListener("touchstart", (e) => {
    e.stopPropagation(); // Предотвращаем "перехват" события слайдера
    handleSlide(currentSlide !== sliderItems.length - sliderItemsToShow, sliderContainer, 1);
  });

  prev.addEventListener("touchstart", (e) => {
    e.stopPropagation(); // Предотвращаем "перехват" события слайдера
    handleSlide(currentSlide !== 0, sliderContainer, -1);
  });

  const removeTouchHandlers = () => {
    // Удаляем обработчики touch events при необходимости
    sliderContainer.removeEventListener("touchstart", handleTouchStart);
    sliderContainer.removeEventListener("touchmove", handleTouchMove);
    sliderContainer.removeEventListener("touchend", handleTouchEnd);

    next.removeEventListener("touchstart", handleTouchStart);
    prev.removeEventListener("touchstart", handleTouchStart);
  };

  sliderInstances[slider.getAttribute("id")] = {
    removeTouchHandlers,
    sliderContainer,
    next,
    prev
  };
};

const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => initSlider(slider));
