'use strict';
'use strict';

app.controller('adminCrUDCategoryController', ['$scope', 'adsData', 'adminServices', '$location', '$routeParams', function ($scope, adsData, adminServices, $location, $routeParams) {
    //console.log($routeParams);
    $scope.action = $routeParams.action;

    if ($routeParams.id && $routeParams.action.toLowerCase() != 'create') {
        $scope.categoryId = $routeParams.id;
        adsData.getCategoryById($routeParams.id)
            .$promise
            .then(function (categoryData) {
                //console.log(categoryData);
                $scope.category = categoryData.name;
            }, function (error) {
                console.log(error);
            });
    }

}
]);