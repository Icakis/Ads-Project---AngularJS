'use strict';

app.controller('deleteAdController', ['$scope', 'userData', '$location', '$routeParams', 'userAdsData', function ($scope, userData, $location, $routeParams, userAdsData) {
    if (!userData.getLoggedUser()) {
        $location.path('/user/home');
    }

    $scope.heading = 'Ads - Delete Ad';

    //console.log(userAdsData);
    //console.log($routeParams);
    userAdsData.getAdById($routeParams.deleteAdId)
        .$promise
        .then(function (data) {
            //console.log(data);
            $scope.ad = data;
        }, function (error) {
            console.log(error);
        });


    $scope.deleteAd = function () {
        if ($scope.ad) {
            //console.log($routeParams.deleteAdId);
            userAdsData.deleteAd($routeParams.deleteAdId)
                .$promise
                .then(function (data) {
                    console.log(data);
                }, function (error) {
                    console.log(error);
                });
        } else {
            alert('Cannot get ad! Wait or try again later.');
        }
    };
}
]);