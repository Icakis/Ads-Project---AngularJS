app.controller('AllAdsController', function ($scope, $route, $http, adsData) {
    //adsData.getAllPublishedAds();
    adsData.getAllPublishedAdsByFilter($scope.filter.category, $scope.filter.town)
    	.$promise
    	.then(function (data) {
    	    $scope.allAdsData = data;
    	    //console.log(data);
    	}, function (error) {
    	    $log.error(error);
    	});
});