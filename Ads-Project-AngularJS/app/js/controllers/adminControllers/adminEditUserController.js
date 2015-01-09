'use strict';

app.controller('adminEditUserController', ['$scope', '$routeParams', '$location', 'adsData', '$rootScope', 'serviceFunctions', 'adminServices', function ($scope, $routeParams, $location, adsData, $rootScope, serviceFunctions, adminServices) {
    $scope.heading = 'Ads Administration - Edit User Profile';
    $rootScope.userSection = 'users-admin';

    $scope.user = {};
    $scope.userPasswords = {};

    adminServices.getAllUsersSortedBy()
        .$promise
        .then(function (data) {
            //console.log(data);
            var userFound = false;
            for (var i = 0; i < data.users.length; i++) {
                if (data.users[i].username === $routeParams.userId) {
                    //console.log(data.users[i]);
                    $scope.user = data.users[i];
                    userFound = true;
                    break;
                }
            }

            if (!userFound) {
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error! ",
                    text: 'No such user.',
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            }

        }, function (error) {
            console.log(error);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Error! ",
                text: 'Unable to load user for edit. Try again.',
                messageClass: 'alert-danger',
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
                type: "Warning!",
                text: 'Cannot get Towns to choose (connection lost or somthing gone wrong). Try again...',
                messageClass: 'alert-warning',
                date: new Date()
            });
        });

    $scope.updateUser = function () {
        //console.log($scope.user);
        adminServices.editUser($scope.user)
            .$promise
            .then(function (updatedUser) {
                //console.log(updatedUser);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Success!",
                    text: "User's profile was updated!",
                    messageClass: 'alert-success',
                    date: new Date()
                });
                $location.path('/');
            }, function (error) {
                //console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Alert!",
                    text: "Uneble to update user's profile (Connection lost or somthing gone wrong).",
                    messageClass: 'alert-warning',
                    date: new Date()
                });
            });
    };

    $scope.changeUserPassword = function () {
        //console.log($scope.userPasswords);
        adminServices.changeUserPassword($scope.userPasswords.oldPassword, $scope.userPasswords.newPassword, $scope.userPasswords.confirmPassword, $routeParams.userId)
            .$promise
            .then(function (data) {
                //console.log(data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Success!",
                    text: "You're password was updated!",
                    messageClass: 'alert-success',
                    date: new Date()
                });
                $location.path('/');
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Uneble to cahnge your password ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Warning!",
                    text: messageText,
                    messageClass: 'alert-warning',
                    date: new Date()
                });
            });
    };
}
]);