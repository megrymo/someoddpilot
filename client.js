(function($){

  var vertCenter = require("./vertical-center");
  var initSliders = require("./slider");
  var fitImage = require("./fit-image");
  var scaleText = require("./scale-text");

  jQuery(document).ready(function ($) {
    initSliders();
    vertCenter();
    fitImage();
    scaleText();
    skrollr.init({forceHeight: false});
  });

  $(window).load(function() {
    vertCenter();
    fitImage();
  });

  $(window).resize(function() {
    vertCenter();
    fitImage();
    scaleText();
  });

})(jQuery);

require("angular");
require("angular-scroll");
require("./angular-menu");
require("./src/video-player");
require("./src/animations");
require("./src/scale-text");

angular.module("sop", ["duScroll", "menu", "video", "animations", "scaleTextFun"]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ["sop"]);
});
