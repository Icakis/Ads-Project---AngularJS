'use strict';

app.controller('loginRegisterController', ['$scope', 'userData', function ($scope, userData) {
    if (!userData.getLoggedUser()) {
        //alert('User not logged!');

    } else {
        alert('User logged!');
    }
}
]);