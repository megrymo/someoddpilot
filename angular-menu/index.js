angular.module("menu", [])
  .controller("headerController", ["$scope", function($scope){

  $scope.class = "";

  $scope.toggleClass = function(){
    var newClass = $scope.class === "nav-open" ? "" : "nav-open";
    $scope.class = newClass;
  };

}]);
