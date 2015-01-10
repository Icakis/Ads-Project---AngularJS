'use strict';

app.controller('adminDeleteUserController', ['$scope', '$routeParams', '$location', 'adsData', '$rootScope', 'serviceFunctions', 'adminServices', function ($scope, $routeParams, $location, adsData, $rootScope, serviceFunctions, adminServices) {
    $scope.heading = 'Ads Administration - Delete User Profile';
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
                text: 'Unable to load user for delete. Try again.',
                messageClass: 'alert-danger',
                date: new Date()
            });
        });



    $scope.deleteUser = function () {
        //console.log($scope.user);
        adminServices.deleteUserByUsername($routeParams.userId)
            .$promise
            .then(function (data) {
                //console.log(updatedUser);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Success! ",
                    text: data.message,
                    messageClass: 'alert-success',
                    date: new Date()
                });
                $location.path('/admin/users/list');
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Uneble to delete user\'s profile.', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Warning! ",
                    text: messageText,
                    messageClass: 'alert-warning',
                    date: new Date()
                });
            });
    };

}
]);