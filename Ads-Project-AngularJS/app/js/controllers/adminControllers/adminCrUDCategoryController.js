﻿'use strict';

app.controller('adminCrUDCategoryController', ['$scope', 'adsData', 'adminServices', '$location', '$routeParams', function ($scope, adsData, adminServices, $location, $routeParams) {
    //console.log($routeParams);
    $scope.action = $routeParams.action;

    if ($routeParams.id && $routeParams.action.toLowerCase() != 'create') {
        $scope.categoryId = $routeParams.id;
        adsData.getCategoryById($routeParams.id)
            .$promise
            .then(function (categoryData) {
                //console.log(categoryData);
                $scope.categoryName = categoryData.name;
            }, function (error) {
                console.log(error);
            });
    }

    $scope.categoryAction = function (action, categoryName) {
        switch (action) {
            case 'create':
                //console.log(categoryName);
                adminServices.createCategory(categoryName)
                    .$promise
                    .then(function (data) {
                        console.log(data);
                        $location.path('/admin/categories/list');
                    }, function (error) {
                        console.log(error);
                    });
                break;
            case 'edit':
                //console.log(categoryName);
                adminServices.editCategory($routeParams.id, categoryName)
                    .$promise
                    .then(function (data) {
                        console.log(data);
                        $location.path('/admin/categories/list');
                    }, function (error) {
                        console.log(error);
                    });
                break;
            case 'delete':
                //console.log(categoryName);
                adminServices.deleteCategory($routeParams.id)
                    .$promise
                    .then(function (data) {
                        console.log(data);
                        $location.path('/admin/categories/list');
                    }, function (error) {
                        console.log(error);
                    });
                break;
            default:
        }
    };
}
]);