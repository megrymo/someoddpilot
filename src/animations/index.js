const ScrollMagic = require("scrollmagic");
const isSkrolled = skrollr.get();
require("./plugins/debug/");

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

(function($) {

  var slideUpController = new ScrollMagic.Controller();

  $('[slide-up], .slide-up').each(function (index, elem) {

    $(elem).parent().addClass('slide-up--' + index);

  });

  $('[slide-up], .slide-up').each(function (index, elem) {

    new ScrollMagic.Scene({
          triggerHook: 0.8,
          triggerElement: elem
        })
        .setClassToggle(elem, "slide-up--show")
        .addTo(slideUpController)
        .addIndicators();
  });

})(jQuery);
