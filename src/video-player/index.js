var app = angular.module("video", []);

app.config(['$sceProvider', function ($sceProvider) {
  $sceProvider.enabled(false);
}])
.controller("getUrls", ["$scope", function (){

  this.getVideoUrl = function(path, ext) {
    return "/assets/video/" + path + "." + ext;
  };

  this.getImageUrl = function(path, ext) {
    return "/assets/images/" + path + "." + ext;
  };

}])
.directive("player", function () {

  return {
    restrict: 'EA',
    replace: false,
    scope: {
      location: "@"
    },
    templateUrl: "/video-player/templates/video-template.html",
    controller: "getUrls",
    controllerAs: "player",
    link: function (scope, element) {

      scope.isPlaying = false;

      element.on('click', function(event) {
        scope.isPlaying = !scope.isPlaying;
        scope.$apply();
      });

      }
  };

})
.directive("playervideo", function () {

  return {
    restrict: 'EA',
    link: function (scope, element, attrs) {

      var player = element[0];

      scope.$watch('isPlaying', function(){
        if(!scope.isPlaying){
          player.pause();
        } else {
          player.play();
        }
      });

      player.addEventListener("ended", function(){
        var originalSrc = player.currentSrc;
        scope.isPlaying = !scope.isPlaying;
        scope.$apply();
        // bring back the poster
        player.src = originalSrc;
      });

    }
  };

});
