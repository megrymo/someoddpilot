var app = angular.module("scaleTextFun", []);

app.directive("scaletextparent", ["$window", function ($window) {

  return {
    restrict: 'EA',
    replace: false,
    link: function (scope, element) {

      scope.getWindowDimensions = function () {
        scope.parentHeight = element.height();
        scope.parentWidth = element.width();
      };

      scope.$watch(function(){
        return $window.innerWidth;
      }, function(value) {
        scope.getWindowDimensions();
        console.log("angulars " + value);
        console.log("parent " + scope.parentHeight);
      });

      scope.getWindowDimensions();

      var win = angular.element($window);
      win.bind("resize",function(event){
        scope.getWindowDimensions();
        scope.$apply();
      });

    }
  };

}])
.directive("scaletext", function () {

  return {
    restrict: 'EA',
    replace: false,
    link: function (scope, element) {

      scope.thisHeight = element[0].getBoundingClientRect().height;
      scope.thisWidth = element[0].getBoundingClientRect().width;
      scope.newHeightScale = scope.parentHeight / scope.thisHeight;
      scope.newWidthScale = scope.parentWidth / scope.thisWidth;

      scope.$watch("getWindowDimensions", function(){
        console.log("watch2");
        element.css("transform", "matrix( 1, 0, 0, 1, 0, 0)");
        if (scope.newHeightScale < scope.newWidthScale) {
          element.css("transform", "matrix( " + scope.newHeightScale + ", 0, 0," + scope.newHeightScale + ", 0, 0)");
        } else {
          element.css("transform", "matrix( " + scope.newWidthScale + ", 0, 0," + scope.newWidthScale + ", 0, 0)");
        }
        console.log("change");

      });

    }
  };

});
