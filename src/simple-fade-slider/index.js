function simpleFadeSlider() {

  $(".simple-fade-slider .prev").on("click", function() {
    var slides = $(this).closest(".simple-fade-slider").find(".simple-fade-slide"),
        activeSlide = $(this).closest(".simple-fade-slider").find(".active"),
        i = activeSlide.index();
    i--;
    slides.eq(i).addClass("active");
    activeSlide.removeClass("active");
  });

  $(".simple-fade-slider .next").on("click", function() {
    var slides = $(this).closest(".simple-fade-slider").find(".simple-fade-slide"),
        activeSlide = $(this).closest(".simple-fade-slider").find(".active"),
        numOfSlides = slides.length,
        i = activeSlide.index();
    i = (i >= numOfSlides - 1)
      ? 0
      : i + 1;
    activeSlide.removeClass("active");
    slides.eq(i).addClass("active");
  });
}

module.exports = simpleFadeSlider;
