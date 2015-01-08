'use strict';

app.controller('adminEditAdController', ['$scope', 'userData', '$routeParams', 'userAdsData', 'adsData', '$rootScope', 'serviceFunctions', '$location', function ($scope, userData, $routeParams, userAdsData, adsData, $rootScope, serviceFunctions, $location) {

     
    $scope.heading = 'Ads - Edit Ad';
    $rootScope.userSection = 'myAds';

    //console.log($routeParams);
    $scope.editedAd = {};
    $scope.editedAd.ChangeImage = false;

    adsData.getAllCategories()
        .$promise
        .then(function (categories) {
            $scope.allCategories = categories;
        }, function (error) {
            //console.log(error);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Warning",
                text: "Cannot dispalay Categories to choose (Connection lost or something gone wrong).",
                messageClass: 'alert-info',
                date: new Date()
            });
        });

    adsData.getAllTowns()
        .$promise
        .then(function (towns) {
            $scope.allTowns = towns;
        }, function (error) {
            //console.log(error);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Warning",
                text: "Cannot dispalay Towns to choose (Connection lost or something gone wrong).",
                messageClass: 'alert-info',
                date: new Date()
            });
        });

    userAdsData.getAdById($routeParams.editedAdId)
        .$promise
        .then(function (data) {
            //console.log(data);
            $scope.editedAd = data;
        }, function (error) {
            console.log(error);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error",
                text: "Cannot dispalay ad to edit (Connection lost or something gone wrong).",
                messageClass: 'alert-danger',
                date: new Date()
            });
        });

    $scope.changeUploadImage = function (inputElement) {
        serviceFunctions.convertImageToBase64(inputElement, $scope.editedAd)
            .then(function (data) {
                //console.log(data);
            }, function (error) {
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Warning",
                    text: error,
                    messageClass: 'alert-info',
                    date: new Date()
                });
            });
    }

    $scope.deleteImageDataUrl = function () {
        $scope.editedAd.imageDataUrl = '';
        $scope.editedAd.ChangeImage = true;
    };

    $scope.editAd = function () {
        userAdsData.editAdById($routeParams.editedAdId, $scope.editedAd)
            .$promise
            .then(function (data) {
                //console.log(data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Success",
                    text: "Add was successfuly edited.",
                    messageClass: 'alert-success',
                    date: new Date()
                });

                $location.path('/user/ads');
            }, function (error) {
                console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error",
                    text: error.data.error_description,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    };
}
]);