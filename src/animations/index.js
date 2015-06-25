require('gsap/src/minified/TweenLite.min');
require('scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min');
require("scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap");

const ScrollMagic = require("scrollmagic");
const isSkrolled = skrollr.get();

(function($) {

  var animationController = new ScrollMagic.Controller();

  $('[reveal]').each(function (index, elem) {

    $(elem).addClass('reveal--' + index);

  });

  $('[reveal]').each(function (index, elem) {

    new ScrollMagic.Scene({
          triggerHook: 'onEnter',
          duration: "100%",
          triggerElement: '.' + $(elem).next().attr('class').replace(/\s/g,'.')
        })
        .setTween(elem, {
          top: '100vh',
          position: 'relative',
          ease: Linear.easeNone
        })
        .addTo(animationController)
        .addIndicators({name: "reveal " + index});
  });

  $('[pause]').each(function (index, elem) {

    var height = $(elem).height();

    new ScrollMagic.Scene({
          triggerHook: 0.5,
          duration: "30%",
          offset: (height / 2),
          triggerElement: elem
        })
        .setPin(elem)
        .addTo(animationController)
        .addIndicators({name: "pause " + index});
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

(function($) {

  var isAboutSection = $('.activate-nav').get(0);

  if ( isAboutSection ) {

    var aboutNavController = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
          triggerHook: 'onLeave',
          triggerElement: '.activate-nav'
        })
        .setClassToggle('.persistant-about-nav', 'persistant-about-nav--show')
        .addTo(aboutNavController)
        .addIndicators();

  }

})(jQuery);
