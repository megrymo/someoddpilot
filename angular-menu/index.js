angular.module("menu", [])
  .controller("headerController", ["$scope", function($scope){

  $scope.active = false;

  $scope.toggleClass = function(){
    $scope.active = !$scope.active;
  };

}]);
