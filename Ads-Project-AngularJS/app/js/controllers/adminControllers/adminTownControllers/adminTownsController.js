'use strict';

app.controller('adminTownsController', ['$scope', '$rootScope', 'adminServices', 'serviceFunctions', function ($scope, $rootScope, adminServices, serviceFunctions) {
    // use $scope.pagination if you want to remember for this section only
    //$scope.pagination = {
    //    startPage: 1,
    //    pageSize: 5,
    //};

    $scope.heading = 'Ads Administration - Towns';

    $scope.sortBy = '';
    $scope.changeSortBy = function (sortCriteria) {
        if (sortCriteria == $scope.sortBy) {
            $scope.sortBy = '-' + sortCriteria;
        } else {
            $scope.sortBy = sortCriteria;
        }

        $scope.reloadAllads();
    };

    $scope.itemsLabel = 'users';

    $scope.reloadAllads = function () {
        adminServices.getAllTownsSortedBy($scope.pagination.startPage, $scope.pagination.pageSize, $scope.sortBy)
            .$promise
            .then(function (townsData) {
                //console.log(townsData);
                $scope.allTowns = townsData.towns;
                $scope.paginationData = serviceFunctions.pageNumbersArray(townsData);
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Cannot get list of Towns (Connection lost or something gone wrong).', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error!",
                    text: messageText,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    }

    $scope.reloadAllads();
}
]);