(function($){

  var toggleMenu = require("./menu");
  var vertCenter = require("./vertical-center");
  var initSliders = require("./slider");
  var animateImages = require("./animate-images");
  var fitImage = require("./fit-image");
  var fillImage = require("./fill-image");
  var scaleText = require("./scale-text");

  jQuery(document).ready(function ($) {
    initSliders();

    $(".nav-icon").click(function () {
    toggleMenu();
    });
    $(".nav-close-icon").click(function () {
    toggleMenu();
    });

    vertCenter();
    animateImages();
    fitImage();
    fillImage();
    scaleText();

  });

  $(window).load(function() {
    vertCenter();
    fitImage();
    fillImage();
  });

  $(window).resize(function() {
    vertCenter();
    fitImage();
    fillImage();
    scaleText();
  });

  $(window).scroll(function() {
    animateImages();
  });

})(jQuery);

require("angular");

angular.module("sop", []);
