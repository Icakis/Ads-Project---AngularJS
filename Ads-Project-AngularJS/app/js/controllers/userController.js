'use strict';

app.controller('userController', ['$scope', '$rootScope', 'adsData', 'userAdsData', 'serviceFunctions', '$location', 'userData', function ($scope, $rootScope, adsData, userAdsData, serviceFunctions, $location, userData) {
    $scope.heading = 'Ads - My Ads';
    $rootScope.userSection = 'myAds';
    $scope.isLoggedAdmin();
    $scope.newAd = {};
    $scope.pagination.startPage = 1;

    adsData.getAllCategories()
        .$promise
        .then(function (categories) {
            if (categories.length > 0) {
                $scope.newAd.category = categories[0];
            }

            $scope.allCategories = categories;
        }, function (error) {
            $log.error(error);
        });

    adsData.getAllTowns()
        .$promise
        .then(function (towns) {
            if (towns.length > 0) {
                $scope.newAd.town = towns[0];
            }

            $scope.allTowns = towns;
        }, function (error) {
            $log.error(error);
        });

    $scope.changeUploadImage = function (element) {
        console.log(element.value);

        var photofile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.$apply(function () {
                var pattern = /^data:image\/.*$/;
                if (pattern.test(e.target.result)) {
                    $scope.newAd.imageDataUrl = e.target.result;
                } else {
                    alert('Invalid Image file type');
                }
            });
        };
        reader.readAsDataURL(photofile);
    };

    $scope.deleteImageDataUrl = function () {
        $scope.newAd.imageDataUrl = '';
    };

    $scope.publishNewAd = function () {
        var sendNewAd = $scope.newAd;
        sendNewAd.categoryId = parseInt(sendNewAd.category.id);
        sendNewAd.townId = parseInt(sendNewAd.town.id);
        userAdsData.createNewAd(sendNewAd)
            .$promise
            .then(function (data) {
                //console.log(data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push(
                    {
                        type: "Success",
                        text: "Advertisement created and submitted for approval!",
                        messageClass: 'alert-success',
                        date: new Date()
                    }
                );
                $location.path('/user/ads');
            }, function (error) {
                //console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push(
                {
                    type: "Error",
                    text: "Your ad cannot be created (Connection lost or somthing gone wrong). Try again!",
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
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
        $scope.reloadAllads();
    }

    $scope.deactivateAd = function (id) {
        //console.log(id);
        userAdsData.deactivateAd(id)
            .$promise
            .then(function (data) {
                //console.log(data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push(
                    {
                        type: "Success",
                        text: "Advertisement deactivated.",
                        messageClass: 'alert-success',
                        date: new Date()
                    }
                );
                $scope.reloadAllads();
            }, function (error) {
                //console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push(
                {
                    type: "Error",
                    text: "Your ad was not deactivated. (Connection lost or somthing gone wrong)!",
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    };

    $scope.publishAdAgain = function (id) {
        //console.log(id);
        userAdsData.publishAdAgain(id)
            .$promise
            .then(function (data) {
                //console.log(data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push(
                {
                    type: "Success",
                    text: "Advertisement submitted for approval!",
                    messageClass: 'alert-success',
                    date: new Date()
                });
                $scope.reloadAllads();
            }, function (error) {
                //console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push(
                {
                    type: "Error",
                    text: "Your ad was not publish. (Connection lost or somthing gone wrong)!",
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    };

    $scope.reloadAllads = function () {
        userAdsData.getAllUserAds($scope.pagination.startPage, $scope.pagination.pageSize, $rootScope.myAdFilter)
            .$promise
            .then(function (allUserAds) {
                $scope.allUserAds = allUserAds;
                $scope.paginationData = serviceFunctions.pageNumbersArray(allUserAds);
                //console.log(allUserAds);
                //console.log($scope.paginationData);
            }, function (error) {
                console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push(
                {
                    type: "Error",
                    text: "Cannot load ads. (Connection lost or somthing gone wrong) Try again!",
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    }

    $scope.reloadAllads();
}]);