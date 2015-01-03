'use strict';

app.controller('logoutController', ['$scope', '$location', 'userData', function ($scope, $location, userData) {
    userData.logout();
    $location.path('/');
    //console.log(userData.getLoggedUser());
}
]);