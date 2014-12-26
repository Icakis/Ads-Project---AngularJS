app.controller('AllAdsController', function($scope, $route, $http, adsData) {
    $scope.filter = {
        category: '',
        town: ''
    };
    //console.log(adsData);

    $scope.reloadAllads = function () {
        adsData.getAllPublishedAdsByFilter($scope.filter.category, $scope.filter.town)
            .$promise
            .then(function(data) {
                $scope.allAds = data.ads;
                //console.log(data);
            }, function(error) {
                $log.error(error);
            });
    };

    $scope.reloadAllads();
});