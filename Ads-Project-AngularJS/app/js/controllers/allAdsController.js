app.controller('AllAdsController', function ($scope, $route, $http, adsData) {
    //adsData.getAllPublishedAds();
    adsData.getAllPublishedAdsByFilter()
    	.$promise
    	.then(function (data) {
    	    $scope.allAdsData = data;
    	    console.log(data);
    	}, function (error) {
    	    $log.error(error);
    	});

    adsData.getAllCategories()
        .$promise
        .then(function (categories) {
            console.log(categories);
            $scope.allCategories = categories;
        }, function (error) {
            $log.error(error);
        });
    $scope.reload = function () {
        $route.reload();
    }
});