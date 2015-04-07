(function($){

  var vertCenter = require("./vertical-center");
  var initSliders = require("./slider");
  var fitImage = require("./fit-image");
  var simpleFadeSlider = require("./src/simple-fade-slider");
  var sameHeightKids = require("./src/same-height-kids");

  jQuery(document).ready(function ($) {
    skrollr.init({forceHeight: false});
    initSliders();
    vertCenter();
    fitImage();
    sameHeightKids();

    $("[simple-slider]").map(function (index, element) {
      console.log(element);
      return new simpleFadeSlider(
        element, {
          delay: "10"
        }
      );
    });

  });

  $(window).load(function() {
    vertCenter();
    fitImage();
  });

  $(window).resize(function() {
    vertCenter();
    fitImage();
    sameHeightKids();
  });

})(jQuery);

require("angular");
require("angular-scroll");
require("./angular-menu");
require("./src/video-player");
require("./src/animations");

angular.module("sop", ["duScroll", "menu", "video", "animations"]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ["sop"]);
});
