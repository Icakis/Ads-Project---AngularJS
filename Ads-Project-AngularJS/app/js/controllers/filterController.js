app.controller('FilterController', function ($scope, $route, $rootScope, adsData) {
    $scope.isShown.isAllCategoriesShown = false;
    $scope.isShown.isAllTownsShown = false;

    adsData.getAllCategories()
        .$promise
        .then(function (categories) {
            $scope.allCategories = categories;
            $scope.isShown.isAllCategoriesShown = true;
        }, function (error) {
            $scope.isShown.isAllCategoriesShown = true;
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Warning!",
                text: 'Cannot get Category filter (connection lost or somthing gone wrong). Try again...',
                messageClass: 'alert-warning',
                date: new Date()
            });
            //console.log(error);
        });

    adsData.getAllTowns()
        .$promise
        .then(function (towns) {
            $scope.allTowns = towns;
            $scope.isShown.isAllTownsShown = true;
        }, function (error) {
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Warning!",
                text: 'Cannot get Town filter (connection lost or somthing gone wrong). Try again...',
                messageClass: 'alert-warning',
                date: new Date()
            });
            $scope.isShown.isAllTownsShown = true;
            //console.log(error);
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