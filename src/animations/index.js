var ScrollMagic = require("scrollmagic");
require("./plugins/debug/");
var app = angular.module("animations", []);

app
.directive("slideUp", function () {

  return {
    restrict: 'EA',
    replace: false,
    link: function (scope, element) {

      element
        .addClass("slide-up")
        .attr("data-bottom-top", "")
        .attr("data--20p-bottom-top", "");
      skrollr.get().refresh(element);

    }
  };

})
.directive("reveal", function () {

  return {
    restrict: 'EA',
    replace: false,
    link: function (scope, element) {

      // element
      //   .addClass("reveal")
      //   .attr("data-smooth-scrolling", "off")
      //   .attr("data-bottom-bottom", "transform: translateY(0vh)")
      //   .attr("data-top-bottom", "transform: translateY(100vh)");
      // skrollr.get().refresh(element);

    }
  };

});

(function($) {

  var animationController = new ScrollMagic.Controller();

  $('[reveal]').each(function (index, elem) {

    $(elem).addClass('reveal--' + index);

  });

  $('[reveal]').each(function (index, elem) {

    new ScrollMagic.Scene({
          triggerHook: 'onEnter',
          triggerElement: '.' + $(elem).next().attr('class').replace(/\s/g,'.')
        })
        .setPin(elem)
        .addTo(animationController)
        .addIndicators();
  });

})(jQuery);
