'use strict';

app.controller('publishNewAdController', ['$scope', 'userData', 'userAdsData', 'adsData', '$rootScope', 'serviceFunctions', '$location', function ($scope, userData, userAdsData, adsData, $rootScope, serviceFunctions, $location) {
    if (!userData.getLoggedUser()) {
        $location.path('/');
    }

    $scope.heading = 'Ads - Publish New Ad';
    $rootScope.userSection = 'newAd';
    $scope.newAd = {
        categoryId: null,
        townId: null
    };

    adsData.getAllCategories()
        .$promise
        .then(function (categories) {
            $scope.allCategories = categories;
        }, function (error) {
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

    $scope.changeUploadImage = function (inputElement) {
        serviceFunctions.convertImageToBase64(inputElement, $scope.newAd)
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
        $scope.newAd.imageDataUrl = '';
        $scope.editedAd.ChangeImage = true;
    };

    $scope.publishNewAd = function () {
        userAdsData.createNewAd($scope.newAd)
            .$promise
            .then(function (data) {
                //console.log(data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: 'Success!',
                    text: data.message,
                    messageClass: 'alert-success',
                    date: new Date()
                });
                $location.path('/user/ads');
            }, function (error) {
                var messageText = serviceFunctions.messageServerErrors('Cannot creeate new Ad ', error.data);
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