'use strict';

app.controller('AllAdsController', function ($scope, $route, $http, adsData, userData, serviceFunctions, $rootScope) {
    $scope.heading = 'Ads Home';
    $scope.pagination.startPage = 1;
    $scope.isShown.isAllAdsShown = false;
    $rootScope.userSection = 'home';

    $scope.filter = {
        category: '',
        town: ''
    };

    $scope.range = function (n) {
        return new Array(n);
    };

    $scope.reloadAllads = function () {
        adsData.getAllPublishedAdsByFilter($scope.filter.category, $scope.filter.town, $scope.pagination.startPage, $scope.pagination.pageSize)
            .$promise
            .then(function (data) {
                $scope.allAdsData = data;
                $scope.paginationData = serviceFunctions.pageNumbersArray(data);
                $scope.isShown.isAllAdsShown = true;
                //console.log(data);
                //console.log($scope.paginationData);
            }, function (error) {
                $scope.isShown.isAllAdsShown = true;
                var messageText = serviceFunctions.messageServerErrors('Uneble to load ads. ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error! ",
                    text: messageText,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
                //console.log(error);
            });
    };

    $scope.reloadAllads();
});