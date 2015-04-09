const $ = window.jQuery;

module.exports = class Slider {
  constructor(element, options) {
    this.options = $.extend({
      activeSlideClass: "active",
      activeIndicatorClass: "active",
      slides: "[simple-slider-slide]",
      counter: "[simple-slider-counter]",
      indicators: "[simple-slider-indicator]",
      prevButton: "[simple-slider-prev]",
      nextButton: "[simple-slider-next]"
    }, options);

    this.delaySetting = $(element).data("slider-delay"),
    // 5 seconds
    this.delay = this.delaySetting === undefined ? 5 * 1000 : this.delaySetting;
    this.slides = $(element).find(this.options.slides);
    this.counter = $(element).find(this.options.counter);
    this.indicators = $(element).find(this.options.indicators);
    this.prevButton = $(element).find(this.options.prevButton);
    this.nextButton = $(element).find(this.options.nextButton);

    this.init();
  }

  init() {

    this.indicators.click(this.onClick.bind(this));
    this.goTo(0);

    this.startTimer();

    if (this.slides.length < 2) {
      this.counter.remove();
      return;
    }

    this.prevButton
      .on("click", this.goToPrev.bind(this));

    this.nextButton
      .on("click", this.goToNext.bind(this));

    this.slides
      .on("swipeleft", this.goToNext.bind(this))
      .on("swiperight", this.goToPrev.bind(this));
  }

  goToNext() {
    this.goTo(this.index + 1);

    this.pause();
  }

  goToPrev() {
    this.goTo(this.index - 1);

    this.pause();
  }

  setIndex(newIndex) {
    this.index = newIndex % this.slides.length;
  }

  update() {
    this.slides
      .removeClass(this.options.activeSlideClass)
      .eq(this.index).addClass(this.options.activeSlideClass);

    this.indicators
      .removeClass(this.options.activeIndicatorClass)
      .eq(this.index).addClass(this.options.activeIndicatorClass);
  }

  goTo(newIndex) {
    this.setIndex(newIndex);

    this.update();
  }

  tick() {
    this.goTo(this.index + 1);
    this.startTimer();
  }

  startTimer() {
    if (parseInt(this.delay, 10) > 100) {
      this.fadeTimer = setTimeout(this.tick.bind(this), this.delay);
    }
  }

  pause() {
    clearTimeout(this.fadeTimer);
  }

  onClick(event) {
    this.goTo($(event.target).index());

    this.pause();
  }
};
