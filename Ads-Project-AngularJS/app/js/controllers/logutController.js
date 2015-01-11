'use strict';

app.controller('logoutController', ['$scope', '$location', 'userData', '$rootScope', function ($scope, $location, userData, $rootScope) {
    userData.logout();
    $rootScope.userSection = 'home';
    $rootScope.pagination = {
        startPage: 1,
        pageSize: 2,
    };

    $scope.Messages.splice(0, $scope.Messages.length);
    $scope.Messages.push({
        type: "Success",
        text: "You're log out!",
        messageClass: 'alert-success',
        date: new Date()
    });

    //$scope.getLoggedUsername = '';
    $location.path('/');
    //console.log(userData.getLoggedUser());
}
]);