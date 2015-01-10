'use strict';

app.controller('deleteAdController', ['$scope', 'userData', '$location', '$routeParams', 'userAdsData', '$rootScope', 'serviceFunctions', function ($scope, userData, $location, $routeParams, userAdsData, $rootScope, serviceFunctions) {
    $scope.heading = 'Ads - Delete Ad';
    $rootScope.userSection = 'myAds';

    //console.log($routeParams);
    userAdsData.getAdById($routeParams.deleteAdId)
        .$promise
        .then(function (data) {
            //console.log(data);
            $scope.ad = data;
        }, function (error) {
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: "Cannot get ad for Delete. ",
                messageClass: 'alert-danger',
                date: new Date()
            });
        });


    $scope.deleteAd = function () {
        if ($scope.ad) {
            //console.log($routeParams.deleteAdId);
            userAdsData.deleteAd($routeParams.deleteAdId)
                .$promise
                .then(function (data) {
                    //console.log(data);
                    $scope.deleteFirstMessageIfMaxLengthReached();
                    $scope.Messages.push({
                        type: "Success! ",
                        text: data.message, // "Add was successfuly deleted.",
                        messageClass: 'alert-success',
                        date: new Date()
                    });
                    $location.path('/user/ads');
                }, function (error) {
                    //console.log(error);
                    var messageText = serviceFunctions.messageServerErrors('Uneble to delete ad. ', error.data);
                    $scope.deleteFirstMessageIfMaxLengthReached();
                    $scope.Messages.push({
                        type: "Error! ",
                        text: messageText,
                        messageClass: 'alert-danger',
                        date: new Date()
                    });
                });
        } else {
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: "Cannot delete the ad (Connection lost or somthing gone wrong). ",
                messageClass: 'alert-danger',
                date: new Date()
            });
        }
    };
}
]);