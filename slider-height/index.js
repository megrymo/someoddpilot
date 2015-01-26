function fixSliderHeight() {
  // Set fixed height based on the tallest slide
  $(".slider:not(.home-slider)").each(function(){
  if ( $(".slides .slide").length > 1) {
    var maxHeight = 0;
    $(".slide .contained").each(function(){
      if ($(this).innerHeight() > maxHeight) {
      maxHeight = $(this).innerHeight();
      }
    });
    $(this).find(".slides").height(maxHeight);
  }
  });
  $(".home-slider").each(function(){
  if ( $(".slides .slide").length > 1) {
    var maxHeight = 0;
    var theWindow = $(window).height();
    $(".slide .contained").each(function(){
      if ($(this).innerHeight() > maxHeight) {
      maxHeight = $(this).innerHeight();
      }
      if (theWindow > maxHeight) {
      maxHeight = theWindow;
      }
    });
    $(this).find(".slides").height(maxHeight);
  }
  });
}

module.exports = fixSliderHeight;
