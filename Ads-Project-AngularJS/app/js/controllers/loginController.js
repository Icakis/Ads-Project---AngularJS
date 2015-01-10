﻿'use strict';

app.controller('loginController', ['$scope', '$location', 'userData', 'serviceFunctions', function ($scope, $location, userData, serviceFunctions) {
    $scope.heading = 'Ads Login';
    $scope.isDisabledLoginButton = false;
    if (userData.getLoggedUser()) {
        $scope.deleteFirstMessageIfMaxLengthReached();
        $scope.Messages.push({
            type: "Alert! ",
            text: "You're logged! You cannot access login url.",
            messageClass: 'alert-info',
            date: new Date()
        });

        $location.path('/user/home');
    }

    $scope.loginData = {};
    $scope.login = function () {
        $scope.isDisabledLoginButton = true;
        userData.login($scope.loginData.username, $scope.loginData.password).then(function (data) {
            //console.log(data);
            //$scope.getLoggedUsername = $scope.loginData.username;
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Success! ",
                text: data.message, // "You're logged!",
                messageClass: 'alert-success',
                date: new Date()
            });
            $location.path('/');
        }, function (error) {
            var messageText = serviceFunctions.messageServerErrors('Uneble to cahnge your password ', error.data);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error!",
                text: messageText,
                messageClass: 'alert-danger',
                date: new Date()
            });

            //console.log(error);
            $scope.isDisabledLoginButton = false;
        });
    };

}
]);