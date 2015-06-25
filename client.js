(function($){

  const initSliders = require("./slider");
  const SimpleFadeSlider = require("./src/simple-fade-slider");

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

  $('button').on('click', function() {
    this.blur();
  });

})(jQuery);

require("angular");
require("angular-scroll");
require("./angular-menu");
require("./deep-links");
require("./src/video-player");
require("./src/animations");

angular
  .module("sop", ["duScroll", "menu", "video", "deepLinks"])
  .value('duScrollDuration', 5000);

angular.element(document).ready(function() {
  angular.bootstrap(document, ["sop"]);
});
