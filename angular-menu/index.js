angular.module("menu", [])
  .controller("headerController", ["$scope", function($scope){

  $scope.class = "";

  $scope.toggleClass = function(){
    if ($scope.class === ""){
      $scope.class = "nav-open";
    } else {
      $scope.class = "";
    }
  };

}]);
