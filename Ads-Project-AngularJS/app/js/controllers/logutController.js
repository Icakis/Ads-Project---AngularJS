'use strict';

app.controller('logoutController', ['$scope', '$location', 'userData', '$rootScope', function ($scope, $location, userData, $rootScope) {
    userData.logout();
    $rootScope.userSection = 'home';
    $rootScope.pagination = {
        startPage: 2,
        pageSize: 2,
    };

    $scope.getLoggedUsername = '';

    $scope.Messages = [];
    $scope.Messages.push({
        type: "Success",
        text: "You're log out!",
        messageClass: 'alert-success',
        date: new Date()
    });


    $location.path('/');
    //console.log(userData.getLoggedUser());
}
]);