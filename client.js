(function($){

  var toggleMenu = require("./menu");
  var vertCenter = require("./vertical-center");
  var initSliders = require("./slider");
  var fixSliderHeight = require("./slider-height");

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

  });

  $(window).load(function() {
    vertCenter();
    fixSliderHeight();
  });

  $(window).resize(function() {
    fixSliderHeight();
    vertCenter();
  });

})( jQuery );
