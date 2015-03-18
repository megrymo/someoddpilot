function sameHeightKids(){

  var elem = $(".same-height-kids");

  elem.each(function(){

    var kids = $(this).find("> div"),
        maxHeight = 0;

    kids.each(function(){
      $(this).height("auto");
       if ($(this).height() > maxHeight) {
        maxHeight = $(this).height();
      }
    });

    $(this).height(maxHeight);
    kids.height(maxHeight);
    skrollr.get().refresh($(this));
    skrollr.get().refresh(kids);

  });

}

module.exports = sameHeightKids;
