'use strict';

app.controller('editUserProfileController', ['$scope', 'userData', '$location', 'adsData', '$rootScope', function ($scope, userData, $location, adsData, $rootScope) {
    if (!userData.getLoggedUser()) {
        $location.path('/user/home');
    }

    $scope.heading = 'Ads - Edit User Profile';
    $rootScope.userSection = 'editProfile';

    $scope.user = {};
    $scope.userPasswords = {};

    userData.getUserProfile()
        .$promise
        .then(function (user) {
            $scope.user = user;
            //console.log(user);
            adsData.getAllTowns()
                .then(function (towns) {
                    if (towns.length > 0 && user.townId) {
                        for (var i = 0; i < towns.length; i++) {
                            if (towns[i].id == user.townId) {
                                $scope.user.town = towns[i];
                                break;
                            }
                        }
                    }

                    $scope.allTowns = towns;
                }, function (error) {
                    $log.error(error);
                });
        }, function (error) {
            console.log(error);
        });



    $scope.updateUser = function () {
        userData.editUser($scope.user)
            .$promise
            .then(function (updatedUser) {
                console.log(updatedUser);
            }, function (error) {
                console.log(error);
            });
    };

    $scope.changeUserPassword = function () {
        console.log($scope.userPasswords);
        userData.changeUserPassword($scope.userPasswords.oldPassword, $scope.userPasswords.newPassword, $scope.userPasswords.confirmPassword)
            .$promise
            .then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            });
    };
}
]);