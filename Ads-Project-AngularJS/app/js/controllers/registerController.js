'use strict';

app.controller('registerController', ['$scope', '$location', 'adsData', 'userData', function ($scope, $location, adsData, userData) {
    if (userData.getLoggedUser()) {
        alert('You are logged in. Please logout first.');
        $location.path('/user/home');
    }

    $scope.newUser = {};
    adsData.getAllTowns().then(function (towns) {
        $scope.allTowns = towns;
        //if (towns.length >= 1) {
        //    $scope.newUser.town = towns[0];
        //}
    }, function (error) {
        console.log(error);
    });


    $scope.register = function () {
        //username, password, confirmPassword, name, email, phone, townId
        if ($scope.newUser.town) {
            $scope.newUser.town = parseInt($scope.newUser.town);
        }

        userData.register($scope.newUser.username, $scope.newUser.password1, $scope.newUser.password2, $scope.newUser.name, $scope.newUser.email, $scope.newUser.phone, $scope.newUser.town)
        .then(function (response) {
            alert('Successfuly register.');
            console.log(response);
            $location.path('/user/home');
        }, function (error) {
            console.log('Error in LoginController');
            console.log(error);
        });
    };

}
]);