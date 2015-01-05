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

    $scope.isSelectedCategory = function (category) {
        return $scope.filter.selectedCategory === category;
    };

    $scope.changeCategoryFilter = function (slectedCategory) {
        $scope.filter.selectedCategory = slectedCategory;
        if (slectedCategory) {
            $scope.filter.category = slectedCategory.id;
        } else {
            $scope.filter.category = '';
        }

        $scope.pagination.startPage = '';
        $scope.reloadAllads();
    }

    $scope.isSelectedTown = function (town) {
        return $scope.filter.selectedTown === town;
    };

    $scope.changeTownFilter = function (selectedTown) {
        $scope.filter.selectedTown = selectedTown;
        if (selectedTown) {
            $scope.filter.town = selectedTown.id;
        } else {
            $scope.filter.town = '';
        }

        $scope.pagination.startPage = '';
        $scope.reloadAllads();
    };
});