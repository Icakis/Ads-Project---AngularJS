﻿'use strict';

app.controller('AllAdsController', function ($scope, $route, $http, adsData, userData, serviceFunctions, $rootScope) {
    $scope.heading = 'Ads Home';

    $scope.filter = {
        category: '',
        town: ''
    };

    if (!$rootScope.pagination) {
        $rootScope.pagination = {
            startPage: 1,
            pageSize: 1,
        };
    } else {
        $rootScope.pagination.startPage = 1;
        //console.log($rootScope.pagination.pageSize);
    }

    $scope.range = function (n) {
        return new Array(n);
    };

    $scope.reloadAllads = function () {
        adsData.getAllPublishedAdsByFilter($scope.filter.category, $scope.filter.town, $scope.pagination.startPage, $scope.pagination.pageSize)
            .$promise
            .then(function (data) {
                $scope.allAdsData = data;
                $scope.paginationData = serviceFunctions.pageNumbersArray(data);
                //console.log(data);
                //console.log($scope.paginationData);
            }, function (error) {
                $log.error(error);
            });
    };

    $scope.reloadAllads();
});