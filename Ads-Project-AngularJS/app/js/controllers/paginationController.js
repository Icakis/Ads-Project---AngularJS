'use strict';

app.controller('paginationController', ['$scope', 'userData', function ($scope, userData) {
    // add to outerScope next line. Where data is response array for paging
    // $scope.paginationData = data; 
    //console.log($scope.paginationData);
    //console.log($scope.pagination.pageSize);

    $scope.changePageSize = function () {
        //console.log($scope.pagination.pageSize);
        $scope.pagination.startPage = 1;
        $scope.reloadAllads();
    }

    $scope.changePage = function (goToPageNum) {
        //console.log(goToPageNum);
        $scope.pagination.startPage = goToPageNum;
        //console.log($scope.pagination.startPage);
        $scope.reloadAllads();
    };
}
]);