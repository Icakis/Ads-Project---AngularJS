'use strict';

app.controller('userController', ['$scope', '$rootScope', 'adsData', 'userAdsData', function ($scope, $rootScope, adsData, userAdsData) {
    //alert('YEEEEs');
    $scope.newAd = {};
    if (!$rootScope.userSection) {
        $rootScope.userSection = 'home';
    }

    adsData.getAllCategories()
        .then(function (categories) {
            if (categories.length > 0) {
                $scope.newAd.category = categories[0];
            }

            $scope.allCategories = categories;
        }, function (error) {
            $log.error(error);
        });

    adsData.getAllTowns()
        .then(function (towns) {
            if (towns.length > 0) {
                $scope.newAd.town = towns[0];
            }

            $scope.allTowns = towns;
        }, function (error) {
            $log.error(error);
        });

    //$scope.newAd.category = $scope.allCategories[0];
    $scope.isUserSectionSelected = function (selectedA) {
        //console.log(selectedA);
        return $rootScope.userSection === selectedA;
    }

    $scope.changeUserSection = function (section) {
        $rootScope.userSection = section;
        //console.log($scope.userSection);
        $scope.pagination.startPage = '';
    }

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
        userAdsData.createNewAd(sendNewAd).$promise.then(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };

    if (!$rootScope.myAdFilter) {
        $rootScope.myAdFilter = 'all';
    }

    //$scope.newAd.category = $scope.allCategories[0];
    $scope.isThisMyAdFilterSelected = function (selectedA) {
        //console.log(selectedA);
        return $rootScope.myAdFilter === selectedA;
    }

    $scope.changeMyAdFilter = function (section) {
        $rootScope.myAdFilter = section;
        //console.log($scope.userSection);
        $scope.pagination.startPage = '';
    }

    userAdsData.getAllUserAds().$promise.then(function (allUserAds) {
        $scope.allUserAds = allUserAds;
        console.log(allUserAds);
    }, function (error) {
        console.log(error);
    });
}]);