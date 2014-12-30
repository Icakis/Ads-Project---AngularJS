'use strict';

app.controller('loginRegisterController', ['$scope', 'userData', '$location', function ($scope, userData, $location) {
    if (userData.getLoggedUser()) {
        $location.path('/user/home');
    }
}
]);