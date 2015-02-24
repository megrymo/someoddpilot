function vertCenter() {
  $(".vert-center-halves").each(function(){
  var leftHeight = $(this).find(".left").height(),
  rightHeight = $(this).find(".right").height(),
  shorterOne = null,
  tallerOne = null,
  difference = 0;
  if ( leftHeight < rightHeight ) {
    shorterOne = $(this).find(".left");
    tallerOne = $(this).find(".right");
    difference = rightHeight - leftHeight;
  } else {
    shorterOne = $(this).find(".right");
    tallerOne = $(this).find(".left");
    difference = leftHeight - rightHeight;
  }
  shorterOne.css({
    "margin-top": difference * 0.5 });
  tallerOne.css({
    "margin-top": 0});
  });

  $(".vert-center").each(function(){
  var childHeight = $(this)[0].getBoundingClientRect().height,
  parentHeight = $(this).parent().height(),
  difference = (parentHeight - childHeight) * 0.5;

  $(this).css({
    "margin-top": difference});
  });
}

module.exports = vertCenter;
