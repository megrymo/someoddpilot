function initSliders() {
  $(".slider").each(function(){

    var slideCount = $(".slides .slide").length;
    var counter = 0;

    function updateCount() {
      $(".counter").html((counter + 1) + "&nbsp;<em>of</em>&nbsp;" + slideCount);
    }

    function moveRight() {
      $(".slides .slide:last-child").removeClass("slide-left slide-left-force").addClass("slide-right");
      $(".slides .slide:first-child").removeClass("slide-right").addClass("slide-left-force").appendTo(".slides");
      counter = ((counter > 0) ? counter - 1 : slideCount - 1);
      updateCount();
    }

    function moveLeft() {
      counter = ((counter < slideCount - 1 ) ? counter + 1 : 0);
      updateCount();
      $(".slides .slide:last-child").prependTo(".slides");
      $(".slide").removeClass("slide-right slide-left slide-right-force slide-left-force");
      $(".slides .slide:last-child").addClass("slide-left");
    }

    function doSlide(){
      timer = setInterval(function(){
      moveLeft();
      }, 8000);
    }

    if (slideCount > 1) {
      $(this).append("<div class='pager'><a class='prev'><img src='/assets/images/arrow-left.svg' /></a><a class='next'><img src='/assets/images/arrow-right.svg' /></a></div>");
      $(this).append("<div class='contained counter'></div>");
      updateCount();
      if (slideCount === 2) {
        $(".slide").clone().appendTo(".slides");
      }

      $(".slides .slide:first-child").addClass("slide-left-force").appendTo(".slides");
          doSlide();

      $(".prev").click(function () {
        moveRight();
      });

      $(".next").click(function () {
        moveLeft();
      });

      $(".slider").hover(function(){
        clearInterval(timer);
      });
      $(".slider").mouseleave(function(){
        doSlide();
      });
    }

  });
}

module.exports = initSliders;
