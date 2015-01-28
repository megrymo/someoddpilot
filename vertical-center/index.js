function vertCenter() {
  $(".vert-center-halves").each(function(){
  var leftHeight = $(this).children(".left").height(),
  rightHeight = $(this).children(".right").height(),
  shorterOne = null,
  tallerOne = null,
  difference = 0;
  if ( leftHeight < rightHeight ) {
    shorterOne = $(this).children(".left");
    tallerOne = $(this).children(".right");
    difference = rightHeight - leftHeight;
  } else {
    shorterOne = $(this).children(".right");
    tallerOne = $(this).children(".left");
    difference = leftHeight - rightHeight;
  }
  shorterOne.css({
    "margin-top": difference * 0.5 });
  tallerOne.css({
    "margin-top": 0});
  });

  $(".vert-center").each(function(){
  var childHeight = $(this).height(),
  parentHeight = $(this).parent().height(),
  difference1 = (parentHeight - childHeight) * 0.5;

  $(this).css({
    "margin-top": difference1});
  });
}

module.exports = vertCenter;
