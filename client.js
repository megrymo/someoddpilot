(function($){

  var toggleMenu = require("./menu");
  var vertCenter = require("./vertical-center");
  var initSliders = require("./slider");
  var fixSliderHeight = require("./slider-height");
  var animateImages = require("./animate-images");

  jQuery(document).ready(function ($) {
    initSliders();
    fixSliderHeight();

    $(".nav-icon").click(function () {
    toggleMenu();
    });
    $(".nav-close-icon").click(function () {
    toggleMenu();
    });

    $(".fit-text").each(function(){
      $(this).fitText();
    });

    vertCenter();
    animateImages();

  });

  $(window).load(function() {
    vertCenter();
    fixSliderHeight();
  });

  $(window).resize(function() {
    fixSliderHeight();
    vertCenter();
  });

  $(window).scroll(function() {
    animateImages();
  });

})( jQuery );
require("angular");

angular.module("sop", []);
