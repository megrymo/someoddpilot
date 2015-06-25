(function($){

  const initSliders = require('./slider');
  const SimpleFadeSlider = require('./simple-fade-slider');

  const isTouchDevice = function(){
                          return true ===
                            ('ontouchstart' in window || window.DocumentTouch &&
                              document instanceof DocumentTouch);
                        };

  jQuery(document).ready(function () {

    if ( !isTouchDevice() ) {
      skrollr.init({forceHeight: false});
    }

    initSliders();

    $('[simple-slider]').map(function (index, element) {
      return new SimpleFadeSlider(
        element, {
          delay: '10'
        }
      );
    });

  });

  $('button').on('click', function() {
    this.blur();
  });

})(jQuery);

require('angular');
require('angular-scroll');
require('./angular-menu');
require('./deep-links');
require('./video-player');
require('./animations');

angular
  .module('sop', ['duScroll', 'menu', 'video', 'deepLinks'])
  .value('duScrollDuration', 5000);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['sop']);
});
