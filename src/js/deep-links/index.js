angular.module("deepLinks", ["duScroll"])
  .controller("deepLinks", ["$window", "$document", function($window, $document){

  var urlHash = $window.location.href.split("#")[1];

  if (urlHash &&  $('#' + urlHash).length ) {
    var target = angular.element(document.getElementById(urlHash));
    $document.scrollToElementAnimated(target);
  }

}]);
