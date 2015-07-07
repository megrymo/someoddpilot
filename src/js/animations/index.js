const TweenLite = require('gsap/src/minified/TweenLite.min');

require('scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min');
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');

const ScrollMagic = require('scrollmagic');

(function($) {

  var animationController = new ScrollMagic.Controller();

  $('[reveal]').each(function (index) {

    $(this).addClass('reveal--' + index);

  });

  // $('[reveal]').each(function () {

  //   new ScrollMagic.Scene({
  //         triggerHook: 'onEnter',
  //         duration: '100%',
  //         triggerElement: '.' + $(this).next().attr('class').replace(/\s/g,'.')
  //       })
  //       .setTween(this, {
  //         top: '100vh',
  //         position: 'relative',
  //         ease: Linear.easeNone
  //       })
  //       .addTo(animationController)
  //       .addIndicators({name: 'reveal '});
  // });

  $('[reveal]').each(function () {

    new ScrollMagic.Scene({
          triggerHook: 'onEnter',
          duration: '100%',
          triggerElement: '.' + $(this).next().attr('class').replace(/\s/g,'.')
        })
        .setTween(this, {
          y: $(window).height(),
          ease: Linear.easeNone
        })
        .addTo(animationController)
        .addIndicators({name: 'reveal '});
  });

  $('[pause]').each(function () {

    var height = $(this).height();

    new ScrollMagic.Scene({
          triggerHook: 0.5,
          duration: '80%',
          offset: (height / 2),
          triggerElement: this
        })
        .setPin(this)
        .addTo(animationController)
        .addIndicators({name: 'pause '});
  });

})(jQuery);

(function($) {

  var slideUpController = new ScrollMagic.Controller();

  $('[slide-up], .slide-up').each(function (index) {

    TweenLite.set(this, { className:'+=slide-up--animate' });

    var target = $(this).data('anchor-target') || this;

    new ScrollMagic.Scene({
          triggerHook: 0.9,
          triggerElement: target
        })
        .setClassToggle(this, 'slide-up--show')
        .addTo(slideUpController)
        .addIndicators({name: 'slideup  ' + index});
  });

})(jQuery);

(function($) {

  var showUpController = new ScrollMagic.Controller();

  $('[show-up], .show-up').each(function (index) {

    TweenLite.set(this, { className:'+=show-up--animate' });

    new ScrollMagic.Scene({
          triggerHook: 0.9,
          triggerElement: this
        })
        .setClassToggle(this, 'show-up--show')
        .addTo(showUpController)
        .addIndicators({name: 'show  ' + index});
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

(function($) {

  var drawController = new ScrollMagic.Controller();

  $('.draw').each(function () {

    console.log(this);

    var length = $(this).attr('stroke-dasharray'),
        dimensions = this.getBoundingClientRect(),
        target = $(this).data('anchor-target') || this,
        drawDuration = $(this).data('duration') || dimensions.height;

        console.log(target);

    $(this).attr('stroke-dashoffset', length);

    new ScrollMagic.Scene({
          triggerHook: 0.9,
          duration: drawDuration,
          triggerElement: target
        })
        .setTween(this, {
          strokeDashoffset: 0,
          ease: Linear.easeNone
        })
        .addTo(drawController)
        .addIndicators({name: 'draw '});
  });

})(jQuery);

(function($) {
  var aboutControllerIndex = new ScrollMagic.Controller();

  var illustration = '.space-illustration .illustration',
      container = '.space-illustration';

  TweenLite.set(container, { backgroundPosition: '-50px -50%' });
  TweenLite.set(illustration, { top: '40%' });

  new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: '200%',
        triggerElement: container
      })
      .setTween(container, {
        backgroundPosition: '50px 50%'
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: '200%',
        triggerElement: container
      })
      .setTween(illustration, {
        top: '60%'
      })
      .addTo(aboutControllerIndex);

  var header = 'header',
      logo = '.header-logo',
      leader = '.about-leader',
      leaderContainer = '.about-leader .black-container',
      leaderText = '.about-leader p:first-child',
      leaderText2 = '.about-leader p:nth-child(2)',
      toc = '.toc',
      truthVision = '.truth-vision',
      baseDuration = $(window).height();

  TweenLite.set(logo, { className: '+=header-logo--hide' });
  TweenLite.set(leaderText, { opacity: 1 });
  TweenLite.set(leaderText2, { opacity: 0 });
  TweenLite.set(toc, { opacity: 0, scale: 0 });
  TweenLite.set(truthVision + ' .left', {
        rotationX: 90,
        opacity: 0
    });

  new ScrollMagic.Scene({
        duration: 0,
        triggerElement: 'body',
        triggerHook: "onEnter"
      })
      .setTween(leaderContainer, {
        scale: 1
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 2.2,
        triggerHook: "onEnter"
      })
      .setPin(leader)
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 2.2,
        triggerHook: "onEnter"
      })
      .setPin(header)
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 0.1,
        offset: baseDuration * 0.5,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderText, {
        opacity: 0
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'p '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.1,
        offset: baseDuration * 0.5,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderText2, {
        opacity: 1
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'p2 '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.1,
        offset: baseDuration * 1.1,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderText2, {
        opacity: 0
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'p3 '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.2,
        offset: baseDuration * 1.2,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(toc, {
        opacity: 1,
        scale: 1
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'toc '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.5,
        offset: baseDuration * 1.7,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderContainer, {
        y: '-150%'
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'leaderContainer '});

  new ScrollMagic.Scene({
        duration: 0,
        offset: baseDuration * 1.8,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setClassToggle(logo, 'header-logo--show')
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'leaderContainer '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.7,
        triggerElement: truthVision,
        triggerHook: 'onLeave'
      })
      .setPin(truthVision)
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 0.5,
        offset: baseDuration * 0.5,
        triggerElement: truthVision,
        triggerHook: 'onEnter'
      })
      .setTween(truthVision + ' .left', {
        rotationX: 0,
        opacity: 1
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 0.5,
        triggerElement: truthVision,
        triggerHook: 'onLeave'
      })
      .setTween(truthVision + ' .left', {
        left: '33%'
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 0.5,
        triggerElement: truthVision,
        triggerHook: 'onLeave'
      })
      .setTween(truthVision + ' .right', {
        left: '66%',
        opacity: 1
      })
      .addTo(aboutControllerIndex);

})(jQuery);
