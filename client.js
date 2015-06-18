(function($){

  const initSliders = require("./slider");
  const fitImage = require("./fit-image");
  const SimpleFadeSlider = require("./src/simple-fade-slider");
  const sameHeightKids = require("./src/same-height-kids");

  const isTouchDevice = function(){
                          return true ===
                            ('ontouchstart' in window || window.DocumentTouch &&
                              document instanceof DocumentTouch);
                        }

  jQuery(document).ready(function () {

    if ( !isTouchDevice() ) {
      skrollr.init({forceHeight: false});
    }

    initSliders();
    sameHeightKids();

    $("[simple-slider]").map(function (index, element) {
      return new SimpleFadeSlider(
        element, {
          delay: "10"
        }
      );
    });

  });

  $(window).resize(function() {
    sameHeightKids();
  });

})(jQuery);

require("angular");
require("angular-scroll");
require("./angular-menu");
require("./deep-links");
require("./src/video-player");
require("./src/animations");
require("./src/debug");

angular.module("sop", ["duScroll", "menu", "video", "deepLinks"]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ["sop"]);
});
