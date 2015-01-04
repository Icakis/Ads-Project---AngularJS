'use strict';

app.controller('mainController', ['$scope', '$location', '$rootScope', 'userData', function ($scope, $location, $rootScope, userData) {
    if (!userData.getLoggedUser()) {
        $location.path('/');
    } else {
        $scope.getLoggedUser = userData.getLoggedUser();
    }

    $scope.heading = 'Ads Home';
    $scope.isUserLogged = function () {
        if (userData.getLoggedUser()) {
            return true;
        }

        return false;
    }

    $rootScope.userSection = 'home';
    $scope.pagination = {
        startPage: 2,
        pageSize: 2,
    };

    $scope.Messages = [];
    $scope.deleteFirstMessageIfMaxLengthReached = function () {
        if ($scope.Messages.length > 2) {
            $scope.Messages.splice(0, 1);
        }
    };

    //[{
    //    type: "Error",
    //    text: "Hello there!",
    //    messageClass: 'alert-warning',
    //    date: new Date()
    //},
    //{
    //    type: "Success",
    //    text: "Hello there!",
    //    messageClass: 'alert-success'
    //}];

    //{
    //    type: "Error",
    //    text: "Hello there!",
    //    messageClass:'alert-success'
    //}
}]);