'use strict';

app.controller('editAdController', ['$scope', 'userData', '$routeParams', 'userAdsData', 'adsData', '$rootScope', 'serviceFunctions', '$location', function ($scope, userData, $routeParams, userAdsData, adsData, $rootScope, serviceFunctions, $location) {
    if (!userData.getLoggedUser()) {
        $location.path('/user/home');
    }
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
            var messageText = serviceFunctions.messageServerErrors('Uneble to dispalay Categories for choose. ', error.data);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: messageText,
                messageClass: 'alert-danger',
                date: new Date()
            });
        });

    adsData.getAllTowns()
        .$promise
        .then(function (towns) {
            $scope.allTowns = towns;
        }, function (error) {
            //console.log(error);
            var messageText = serviceFunctions.messageServerErrors('Uneble to dispalay Towns for choose. ', error.data);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: messageText,
                messageClass: 'alert-danger',
                date: new Date()
            });
        });

    userAdsData.getAdById($routeParams.editedAdId)
        .$promise
        .then(function (data) {
            //console.log(data);
            $scope.editedAd = data;
        }, function (error) {
            //console.log(error);
            var messageText = serviceFunctions.messageServerErrors('Uneble to dispalay ad to edit. ', error.data);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: messageText,
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
                    type: "Warning! ",
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
                    type: "Success! ",
                    text: data.message, //"Add was successfuly edited.",
                    messageClass: 'alert-success',
                    date: new Date()
                });

                $location.path('/user/ads');
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Uneble to edit ad. ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error! ",
                    text: messageText,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    };
}
]);