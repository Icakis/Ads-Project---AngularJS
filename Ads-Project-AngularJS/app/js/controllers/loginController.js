'use strict';

app.controller('loginController', ['$scope', '$location', 'userData', function ($scope, $location, userData) {
    $scope.heading = 'Ads Login';
    $scope.isDisabledLoginButton = false;
    //console.log(userData);
    if (userData.getLoggedUser()) {
        //alert('You are already logged in');
        $scope.deleteFirstMessageIfMaxLengthReached();
        $scope.Messages.push({
            type: "Alert",
            text: "You're logged! You cannot access login url.",
            messageClass: 'alert-info',
            date: new Date()
        });

        $location.path('/user/home');
    }

    $scope.loginData = {};
    $scope.login = function () {
        $scope.isDisabledLoginButton = true;
        userData.login($scope.loginData.username, $scope.loginData.password).then(function (response) {
            //alert('Successfuly logged.');
            //console.log('Success in LoginController');
            //console.log(response);
            //$scope.isDisabledLoginButton = false;

            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Success",
                text: "You're logged!",
                messageClass: 'alert-success',
                date: new Date()
            });

            $location.path('/user/home');

        }, function (error) {
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error",
                text: error.data.error_description,
                messageClass: 'alert-danger',
                date: new Date()
            });

            //console.log('Error in LoginController');
            //console.log(error);
            $scope.isDisabledLoginButton = false;
        });
    };

}
]);