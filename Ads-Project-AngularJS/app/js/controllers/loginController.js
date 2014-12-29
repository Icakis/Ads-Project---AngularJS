'use strict';

app.controller('loginController', ['$scope', '$location', 'userData', function ($scope, $location, userData) {
    $scope.isDisabledLoginButton = false;
    console.log(userData);
    if (userData.getLoggedUser()) {
        alert('You are already logged in');
        $location.path("/");
    }

    $scope.loginData = {};
    $scope.login = function () {
        $scope.isDisabledLoginButton = true;
        userData.login($scope.loginData.username, $scope.loginData.password).then(function (response) {
            alert('Successfuly logged.');
            console.log('Success in LoginController');
            console.log(response);
            $scope.isDisabledLoginButton = false;

        }, function (error) {
            console.log('Error in LoginController');
            console.log(error);
            $scope.isDisabledLoginButton = false;
        });
    };

}
]);