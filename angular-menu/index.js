angular.module("menu", [])
  .controller("headerController", ["$scope", function($scope){

  $scope.toggleActive = function(s){
    s.active = !s.active;
  };

}]);
