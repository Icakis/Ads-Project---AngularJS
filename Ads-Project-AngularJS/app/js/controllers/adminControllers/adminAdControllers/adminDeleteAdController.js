'use strict';

app.controller('adminDeleteAdController', ['$scope', 'userData', '$location', '$routeParams', 'adminAdsDataServices', '$rootScope', function ($scope, userData, $location, $routeParams, adminAdsDataServices, $rootScope) {
    $scope.heading = 'Ads Administration - Delete Ad';
    $rootScope.userSection = '';

    //console.log(userAdsData);
    //console.log($routeParams);
    adminAdsDataServices.getAdById($routeParams.deleteAdId)
        .$promise
        .then(function (data) {
            //console.log(data);
            $scope.ad = data;
        }, function (error) {
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: "Cannot get ad for Delete",
                messageClass: 'alert-danger',
                date: new Date()
            });
        });


    $scope.deleteAd = function () {
        if ($scope.ad) {
            //console.log($routeParams.deleteAdId);
            adminAdsDataServices.deleteAdById($routeParams.deleteAdId)
                .$promise
                .then(function (data) {
                    //console.log(data);
                    $scope.deleteFirstMessageIfMaxLengthReached();
                    $scope.Messages.push({
                        type: "Success! ",
                        text: "Add was successfuly deleted.",
                        messageClass: 'alert-success',
                        date: new Date()
                    });
                    $location.path('/user/ads');
                }, function (error) {
                    //console.log(error);
                    $scope.deleteFirstMessageIfMaxLengthReached();
                    $scope.Messages.push({
                        type: "Error! ",
                        text: "Cannot delete the ad (Connection lost or somthing gone wrong)",
                        messageClass: 'alert-danger',
                        date: new Date()
                    });
                });
        } else {
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: "Cannot delete the ad (Connection lost or somthing gone wrong)",
                messageClass: 'alert-danger',
                date: new Date()
            });
        }
    };
}
]);