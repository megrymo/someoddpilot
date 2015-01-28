(function($){

  var toggleMenu = require("./menu");
  var vertCenter = require("./vertical-center");
  var initSliders = require("./slider");
  var animateImages = require("./animate-images");
  var fitImage = require("./fit-image");

  jQuery(document).ready(function ($) {
    initSliders();

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
    fitImage();

  });

  $(window).load(function() {
    vertCenter();
    fitImage();
  });

  $(window).resize(function() {
    vertCenter();
    fitImage();
  });

  $(window).scroll(function() {
    animateImages();
  });

})( jQuery );
require("angular");

angular.module("sop", []);
