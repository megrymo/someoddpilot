angular.module("imageResize", [])
  .directive("fillImage", function ($window) {
    return function (scope, element) {
      var resizeImage = function () {
        var imageWidth = element.width(),
            imageHeight = element.height(),
            winWidth = $window.innerWidth,
            winHeight = $window.innerHeight,
            winRatio = winWidth / winHeight,
            imageRatio = imageWidth / imageHeight,
            heightDiff = winHeight - imageHeight,
            widthDiff = winWidth - imageWidth;

        if (winRatio > imageRatio) {
          element
            .removeClass("bgheight")
            .addClass("bgwidth")
            .css({
              "margin-left": 0,
              "margin-top": (heightDiff * 0.5) + "px"
            });
        } else {
          element
            .removeClass("bgwidth")
            .addClass("bgheight")
            .css({
              "margin-left": (widthDiff * 0.5) + "px",
              "margin-top": 0
            });
        }
      };

      var windowElement = angular.element($window);
      windowElement.resize(resizeImage);

      element.bind("load", function () {
        resizeImage();
      });

    };
});
