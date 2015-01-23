function vertCenter() {
  $(".vert-center").each(function(){
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
}

module.exports = vertCenter;
