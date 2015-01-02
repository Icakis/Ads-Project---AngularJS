'use strict';

app.controller('editUserProfileController', ['$scope', 'userData', '$location', 'adsData', function ($scope, userData, $location, adsData) {
    if (!userData.getLoggedUser()) {
        $location.path('/user/home');
    }

    $scope.user = {};
    userData.getUserProfile()
        .$promise
        .then(function (user) {
            $scope.user = user;
            console.log(user);
        }, function (error) {
            console.log(error);
        });

    adsData.getAllTowns()
    .then(function (towns) {
        //if (towns.length > 0) {
        //    $scope.user.town = towns[0];
        //}

        $scope.allTowns = towns;
    }, function (error) {
        $log.error(error);
    });
}
]);