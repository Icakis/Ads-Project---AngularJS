'use strict';

app.controller('adminAllAdsController', function ($scope, $route, $http, adsData, userData, serviceFunctions, $rootScope, adminAdsDataServices) {
    $scope.heading = 'Ads Administration - Ads';
    $scope.pagination.startPage = 1;
    $scope.isShown.isAllAdsShown = false;

    $rootScope.userSection = 'home-admin';

    $scope.isLoggedAdmin();

    $scope.filter = {
        category: '',
        town: ''
    };

    if (!$rootScope.myAdFilter) {
        $rootScope.myAdFilter = '';
    }

    $scope.isThisMyAdFilterSelected = function (selectedA) {
        //console.log(selectedA);
        return $rootScope.myAdFilter === selectedA;
    }

    $scope.changeMyAdFilter = function (filter) {
        $rootScope.myAdFilter = filter;
        //console.log($rootScope.myAdFilter);
        $scope.pagination.startPage = 1;
        //console.log($rootScope.myAdFilter);
        $scope.reloadAllads();
    }

    $scope.range = function (n) {
        return new Array(n);
    };

    $scope.reloadAllads = function () {
        adminAdsDataServices.getAllAdsByFilter($scope.filter.category, $scope.filter.town, $rootScope.myAdFilter, $scope.pagination.startPage, $scope.pagination.pageSize)
            .$promise
            .then(function (data) {
                $scope.allFilteredAdsData = data;
                $scope.paginationData = serviceFunctions.pageNumbersArray(data);
                $scope.isShown.isAllAdsShown = true;
                //console.log(data);
                //console.log($scope.paginationData);
            }, function (error) {
                $scope.isShown.isAllAdsShown = true;
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Warning!",
                    text: 'Cannot get ads (connection lost or somthing gone wrong). Try again...',
                    messageClass: 'alert-warning',
                    date: new Date()
                });
                //console.log(error);
            });
    };

    $scope.reloadAllads();

    $scope.adminApproveAd = function (id) {
        console.log(id);
        adminAdsDataServices.approveAdById(id)
            .$promise
            .then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Warning!",
                    text: 'Cannot approve Add (connection lost or somthing gone wrong). Try again...',
                    messageClass: 'alert-warning',
                    date: new Date()
                });
            });
    };
});