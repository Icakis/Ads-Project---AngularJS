'use strict';

app.controller('paginationController', ['$scope', 'userData', function ($scope, userData) {
        $scope.changePage = function(goToPageNum) {
            //console.log(goToPageNum);
            $scope.pagination.startPage = goToPageNum;
            $scope.reloadAllads();
        };
    }
]);