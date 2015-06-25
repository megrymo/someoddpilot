(function($){

  const initSliders = require("./src/js/slider");
  const SimpleFadeSlider = require("./src/js/simple-fade-slider");

  const isTouchDevice = function(){
                          return true ===
                            ('ontouchstart' in window || window.DocumentTouch &&
                              document instanceof DocumentTouch);
                        };

  jQuery(document).ready(function () {

    if ( !isTouchDevice() ) {
      skrollr.init({forceHeight: false});
    }

    initSliders();

    $("[simple-slider]").map(function (index, element) {
      return new SimpleFadeSlider(
        element, {
          delay: "10"
        }
      );
    });

  });

  $('button').on('click', function() {
    this.blur();
  });

})(jQuery);

require("angular");
require("angular-scroll");
require("./src/js/angular-menu");
require("./src/js/deep-links");
require("./src/js/video-player");
require("./src/js/animations");

angular
  .module("sop", ["duScroll", "menu", "video", "deepLinks"])
  .value('duScrollDuration', 5000);

angular.element(document).ready(function() {
  angular.bootstrap(document, ["sop"]);
});
