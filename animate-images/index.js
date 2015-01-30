function animateImages() {
  $(".animate").each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop(),
    windowHeight = $(window).height();
      if (imagePos < topOfWindow + (windowHeight * 0.8)) {
        $(this).addClass("slide-up");
      }
    });
}

module.exports = animateImages;
