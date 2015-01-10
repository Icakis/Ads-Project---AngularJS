'use strict';

app.controller('adminAllAdsController', function ($scope, $route, $http, adsData, userData, serviceFunctions, $rootScope, adminAdsDataServices) {
    $scope.heading = 'Ads Administration - Ads';
    $scope.pagination.startPage = 1;
    $scope.isShown.isAllAdsShown = false;

    $rootScope.userSection = 'home-admin';

    $scope.filter = {
        category: '',
        town: ''
    };

    $scope.sortBy = '';

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

    $scope.changeSortCreteria = function (sortBy) {
        $scope.sortBy = sortBy;
        $scope.reloadAllads();
    };

    $scope.range = function (n) {
        return new Array(n);
    };

    $scope.reloadAllads = function () {
        adminAdsDataServices.getAllAdsByFilter($scope.filter.category, $scope.filter.town, $rootScope.myAdFilter, $scope.pagination.startPage, $scope.pagination.pageSize, $scope.sortBy)
            .$promise
            .then(function (data) {
                $scope.allFilteredAdsData = data;
                $scope.paginationData = serviceFunctions.pageNumbersArray(data);
                $scope.isShown.isAllAdsShown = true;
                //console.log(data);
                //console.log($scope.paginationData);
            }, function (error) {
                //console.log(error);
                $scope.isShown.isAllAdsShown = true;
                var messageText = serviceFunctions.messageServerErrors('Cannot get ads. Try again... ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error! ",
                    text: messageText,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    };

    $scope.reloadAllads();

    $scope.adminApproveAd = function (id) {
        //console.log(id);
        adminAdsDataServices.approveAdById(id)
            .$promise
            .then(function (response) {
                //console.log(response);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Success! ",
                    text: response.message,// 'Ad approved. ',
                    messageClass: 'alert-success',
                    date: new Date()
                });

                $scope.reloadAllads();
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Cannot approve Add. ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Warning! ",
                    text: messageText,
                    messageClass: 'alert-warning',
                    date: new Date()
                });
            });
    };
});