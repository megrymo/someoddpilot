function sameHeightKids(){

  var elem = $(".same-height-kids"),
      kids = $(".same-height-kids > div");

  elem.each(function(){

    var maxHeight = 0;

    kids.each(function(){
      $(this).height("auto");
       if ($(this).height() > maxHeight) {
        maxHeight = $(this).height();
      }
    });

    elem.height(maxHeight);
    kids.height(maxHeight);
  });
}

module.exports = sameHeightKids;
