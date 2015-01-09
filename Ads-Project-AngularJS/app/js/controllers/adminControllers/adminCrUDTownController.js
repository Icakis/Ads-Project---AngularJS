'use strict';

app.controller('adminCrUDTownController', ['$scope', 'adsData', 'adminServices', '$location', '$routeParams', function ($scope, adsData, adminServices, $location, $routeParams) {
    //console.log($routeParams);
    $scope.action = $routeParams.action;

    if ($routeParams.id && $routeParams.action.toLowerCase() != 'create') {
        adsData.getTownById($routeParams.id)
            .$promise
            .then(function (townData) {
                //console.log(categoryData);
                $scope.townName = townData.name;
            }, function (error) {
                console.log(error);
            });
    }

    $scope.townAction = function (action, townName) {
        switch (action) {
            case 'create':
                //console.log(categoryName);
                adminServices.createTown(townName)
                    .$promise
                    .then(function (data) {
                        console.log(data);
                        $location.path('/admin/towns/list');
                    }, function (error) {
                        console.log(error);
                    });
                break;
            case 'edit':
                //console.log(categoryName);
                adminServices.editTown($routeParams.id, townName)
                    .$promise
                    .then(function (data) {
                        console.log(data);
                        $location.path('/admin/towns/list');
                    }, function (error) {
                        console.log(error);
                    });
                break;
            case 'delete':
                //console.log(categoryName);
                adminServices.deleteTown($routeParams.id)
                    .$promise
                    .then(function (data) {
                        console.log(data);
                        $location.path('/admin/towns/list');
                    }, function (error) {
                        console.log(error);
                    });
                break;
            default:
        }
    };
}
]);