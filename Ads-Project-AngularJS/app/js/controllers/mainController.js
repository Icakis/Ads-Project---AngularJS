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
}]);