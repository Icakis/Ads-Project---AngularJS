'use strict';

app.controller('adminEditAdController', ['$scope', 'userData', '$routeParams', 'adminAdsDataServices', 'adsData', '$rootScope', 'serviceFunctions', '$location', function ($scope, userData, $routeParams, adminAdsDataServices, adsData, $rootScope, serviceFunctions, $location) {
    $scope.heading = 'Ads Administration - Edit Ad';
    $rootScope.userSection = 'home-admin';

    //console.log($routeParams);
    $scope.editedAd = {};
    $scope.editedAd.ChangeImage = false;

    // Change Date event
    $scope.changeDate = function (date) {
        var newDate = Date.parse(date);
        if (!isNaN(newDate)) {
            $scope.filter.fromDateValue = new Date(newDate);
        } else {
            $scope.filter.fromDateValue = '';
        }
    };

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

    adminAdsDataServices.getAdById($routeParams.editedAdId)
        .$promise
        .then(function (data) {
            //console.log(data);
            $scope.editedAd = data;
            $scope.dt = data.date;
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
        var str = window.JSON.stringify({ date: $scope.editedAd.date });
        // str == "{"myDate":"2010-12-27T11:59:18.119Z"}"
        var todayDate = window.JSON.parse(str);
        //console.log(todayDate);

        if (todayDate.date) {
            $scope.editedAd.date = todayDate.date;
            adminAdsDataServices.editAdById($routeParams.editedAdId, $scope.editedAd)
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

                    $location.path('/admin/home');
                }, function (error) {
                    console.log(error);
                    var messageText = serviceFunctions.messageServerErrors('Uneble to edit Ad ', error.data);
                    $scope.deleteFirstMessageIfMaxLengthReached();
                    $scope.Messages.push({
                        type: "Error!",
                        text: messageText,
                        messageClass: 'alert-danger',
                        date: new Date()
                    });
                });
        } else {
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Alert! ",
                text: "Invalid date. Try to choose another one.",
                messageClass: 'alert-warning',
                date: new Date()
            });
        }
    };
}
]);