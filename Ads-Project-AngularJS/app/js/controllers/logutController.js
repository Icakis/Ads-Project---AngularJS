'use strict';

app.controller('logoutController', ['$scope', 'userData', function ($scope, userData) {
    userData.logout();
    console.log(userData.getLoggedUser());
}
]);