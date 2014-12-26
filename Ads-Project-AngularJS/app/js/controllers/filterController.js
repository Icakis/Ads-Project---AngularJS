app.controller('FilterController', function ($scope, $route, $rootScope, adsData) {
    adsData.getAllCategories()
        .$promise
        .then(function (categories) {
            $scope.allCategories = categories;
        }, function (error) {
            $log.error(error);
        });

    adsData.getAllTowns()
        .$promise
        .then(function (towns) {
            $scope.allTowns = towns;
        }, function (error) {
            $log.error(error);
        });


    $scope.changeCategoryFilter = function (id) {
        $scope.filter.category = id;
        $scope.reloadAllads();
        //console.log(id);
    }

    $scope.changeTownFilter = function (id) {
        $scope.filter.town = id;
        $scope.reloadAllads();
        //$route.reload();
    };
});