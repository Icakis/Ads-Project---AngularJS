'use strict';

app.controller('adminEditUserController', ['$scope', '$routeParams', '$location', 'adsData', '$rootScope', 'serviceFunctions', 'adminServices', function ($scope, $routeParams, $location, adsData, $rootScope, serviceFunctions, adminServices) {
    $scope.heading = 'Ads Administration - Edit User Profile';
    $rootScope.userSection = 'users-admin';

    $scope.user = {};
    $scope.userPasswords = {};

    adminServices.getUserById($routeParams.userId).$promise.then(function (data) {
        console.log(data);
    }, function (error) {
        console.log(error);
    });

    //userData.getUserProfile()
    //    .$promise
    //    .then(function (user) {
    //        $scope.user = user;
    //        //console.log(user);
    //    }, function (error) {
    //        //console.log(error);
    //        $scope.deleteFirstMessageIfMaxLengthReached();
    //        $scope.Messages.push({
    //            type: "Error!",
    //            text: 'Cannot get user profile to edit (connection lost or somthing gone wrong). Try again...',
    //            messageClass: 'alert-dangter',
    //            date: new Date()
    //        });
    //    });

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

    //$scope.updateUser = function () {
    //    //console.log($scope.user);
    //    adminServices.editUserByUsername($scope.user)
    //        .$promise
    //        .then(function (updatedUser) {
    //            //console.log(updatedUser);
    //            $scope.deleteFirstMessageIfMaxLengthReached();
    //            $scope.Messages.push({
    //                type: "Success!",
    //                text: "You're 'profile was updated!",
    //                messageClass: 'alert-success',
    //                date: new Date()
    //            });
    //            $location.path('/');
    //        }, function (error) {
    //            //console.log(error);
    //            $scope.deleteFirstMessageIfMaxLengthReached();
    //            $scope.Messages.push({
    //                type: "Alert!",
    //                text: 'Uneble to update your profile (Connection lost or somthing gone wrong).',
    //                messageClass: 'alert-alert',
    //                date: new Date()
    //            });
    //        });
    //};

    //$scope.changeUserPassword = function () {
    //    //console.log($scope.userPasswords);
    //    userData.changeUserPassword($scope.userPasswords.oldPassword, $scope.userPasswords.newPassword, $scope.userPasswords.confirmPassword)
    //        .$promise
    //        .then(function (data) {
    //            //console.log(data);
    //            $scope.deleteFirstMessageIfMaxLengthReached();
    //            $scope.Messages.push({
    //                type: "Success!",
    //                text: "You're password was updated!",
    //                messageClass: 'alert-success',
    //                date: new Date()
    //            });
    //            $location.path('/');
    //        }, function (error) {
    //            //console.log(error);
    //            var messageText = serviceFunctions.messageServerErrors('Uneble to cahnge your password ', error.data);
    //            $scope.deleteFirstMessageIfMaxLengthReached();
    //            $scope.Messages.push({
    //                type: "Warning!",
    //                text: messageText,
    //                messageClass: 'alert-warning',
    //                date: new Date()
    //            });
    //        });
    //};
}
]);