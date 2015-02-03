angular.module("video", [])
  .controller("videoController", ["$scope", function($scope){

  $scope.class = "paused";

  $scope.toggleClass = function(){
    if ($scope.class === "paused"){
      $scope.class = "play";
    } else {
      $scope.class = "paused";
    }
  };

}]);
