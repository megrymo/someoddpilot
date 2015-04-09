function scaleText() {

  $(".scale-text").each(function() {
    $(this).css("transform", "matrix( 1, 0, 0, 1, 0, 0)");
      var thisHeight = $(this)[0].getBoundingClientRect().height,
      thisWidth = $(this)[0].getBoundingClientRect().width,
      parentDiv = $(this).parent(),
      parentHeight = parentDiv.height(),
      parentWidth = parentDiv.width(),
      newHeightScale = parentHeight / thisHeight,
      newWidthScale = parentWidth / thisWidth;
      if (newHeightScale < newWidthScale) {
        $(this).css("transform", "matrix( " + newHeightScale + ", 0, 0," + newHeightScale + ", 0, 0)");
      } else {
        $(this).css("transform", "matrix( " + newWidthScale + ", 0, 0," + newWidthScale + ", 0, 0)");
      }
  });
}

module.exports = scaleText;
