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

      element
        .addClass("reveal")
        .attr("data-smooth-scrolling", "off")
        .attr("data-bottom-bottom", "transform: translateY(0vh)")
        .attr("data-top-bottom", "transform: translateY(100vh)");
      skrollr.get().refresh(element);

    }
  };

});
