'use strict';
app.controller('mainController', ['$scope', function ($scope) {
    $scope.filter = {
        category: '',
        town: ''
    };
}]);