function initSliders() {
  $(".slider").each(function(){

    var slides = ".slides",
        slide = ".slide",
        firstSlide = slide + ":first-child",
        lastSlide = slide + ":last-child",
        slideCount = $(slide).length,
        counter = 0;

    function updateCount() {
      $(".counter").html((counter + 1) + "&nbsp;<em>of</em>&nbsp;" + slideCount);
    }

    function moveRight() {
      $(lastSlide)
        .removeClass("slide-left slide-left-force")
        .addClass("slide-right");
      $(firstSlide)
        .removeClass("slide-right")
        .addClass("slide-left-force")
        .appendTo(slides);
      counter = ((counter > 0) ? counter - 1 : slideCount - 1);
      updateCount();
    }

    function moveLeft() {
      counter = ((counter < slideCount - 1 ) ? counter + 1 : 0);
      updateCount();
      $(lastSlide).prependTo(slides);
      $(slide).removeClass("slide-right slide-left slide-left-force");
      $(lastSlide).addClass("slide-left");
    }

    function doSlide(){
      timer = setInterval(function(){
      moveLeft();
      }, 8000);
    }

    if (slideCount > 1) {
      $(this).append([
        "<div class='pager'>",
        "<a class='prev icon-arrow-left'>",
        "<span class='sr'>Previous",
        "</span></a>",
        "<a class='next icon-arrow-right'>",
        "<span class='sr'>Next",
        "</span></a>",
        "</div>"]
        .join(""))
        .append("<div class='contained counter'></div>")
        .addClass("slider-activated");

      $(slides).append(
        $(slides).find(slide).get().reverse()
      );

      updateCount();

      if (slideCount === 2) {
        $(slide).clone().appendTo(slides);
      }

      var finalSlideCount = $(slide).length;

      $(slides).css({width: (100 * finalSlideCount) + "%"});
      $(slide).css({
        width: (100 / finalSlideCount) + "%",
        "margin-left": (-100 / finalSlideCount) + "%"
      });

      $(firstSlide).addClass("slide-left-force").appendTo(slides);
      doSlide();

      $(".prev").click(function () {
        moveRight();
      });

      $(".next").click(function () {
        moveLeft();
      });

      $(this).hover(function(){
        clearInterval(timer);
      });
      $(this).mouseleave(function(){
        doSlide();
      });
    }

  });
}

module.exports = initSliders;
