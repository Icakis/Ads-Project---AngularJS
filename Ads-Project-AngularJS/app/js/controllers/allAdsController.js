app.controller('AllAdsController', function ($scope, $route, $http, adsData) {
    $scope.filter = {
        category: '',
        town: ''
    };

    $scope.pagination = {
        startPage: 1,
        pageSize: 1,
    };

    //console.log(adsData);
    $scope.range = function (n) {
        return new Array(n);
    };

    $scope.reloadAllads = function () {
        adsData.getAllPublishedAdsByFilter($scope.filter.category, $scope.filter.town, $scope.pagination.startPage, $scope.pagination.pageSize)
            .$promise
            .then(function (data) {
                var pageArray = [];
                for (var i = 0; i < data.numPages; i++) {
                    pageArray[i] = i + 1;
                }

                data.numPages = pageArray;
                $scope.allAdsData = data;
                //console.log(data);
            }, function (error) {
                $log.error(error);
            });
    };

    $scope.reloadAllads();
});