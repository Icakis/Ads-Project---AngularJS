'use strict';

videoApp.controller('AddVideoController', ['$scope', function ($scope) {
    $scope.newVideo = {};

    //Setting first option as selected in configuration select
    $scope.newVideo.haveSubtitles = $scope.haveSubtitlesConfigs[0];

    $scope.addNewVideo = function (addVideo) {
        addVideo.haveSubtitles = addVideo.haveSubtitles.value;
        addVideo.subscribers = 0;
        addVideo.date = new Date();
        addVideo.comments = [];

        $scope.allVideos.push(addVideo);
        $scope.allCategories.push(addVideo.category);
        $scope.newVideo = {};
        //console.log($scope.allVideos);

        $scope.newVideo.haveSubtitles = $scope.haveSubtitlesConfigs[0];
    };

    $scope.reset = function () {
        $scope.newVideo = {};
        $scope.newVideo.haveSubtitles = $scope.haveSubtitlesConfigs[0];
        //$scope.addNewVideoForm.$setPristine();
    }
}]);