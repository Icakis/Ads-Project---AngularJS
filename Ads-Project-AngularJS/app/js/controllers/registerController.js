'use strict';

app.controller('registerController', ['$scope', '$location', 'adsData', 'userData', function ($scope, $location, adsData, userData) {
    if (userData.getLoggedUser()) {
        alert('You are logged in. Please logout first.');
        $location.path("/");
    }

    $scope.newUser = {};
    adsData.getAllTowns().then(function (towns) {
        $scope.allTowns = towns;
        if (towns.length >= 1) {
            $scope.newUser.town = towns[0];
        }
    }, function (error) {
        console.log(error);
    });


    $scope.register = function () {
        alert('Register clicked.');
        //userData.register($scope.loginData.username, $scope.loginData.password).then(function (response) {
        //    alert('Successfuly logged.');
        //    console.log('Success in LoginController');
        //    console.log(response);
        //}, function (error) {
        //    console.log('Error in LoginController');
        //    console.log(error);
        //});
    };

}
]);