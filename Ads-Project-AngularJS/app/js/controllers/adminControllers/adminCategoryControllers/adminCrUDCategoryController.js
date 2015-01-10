'use strict';

app.controller('adminCrUDCategoryController', ['$scope', 'adsData', 'adminServices', '$location', '$routeParams', 'serviceFunctions', function ($scope, adsData, adminServices, $location, $routeParams, serviceFunctions) {
    //console.log($routeParams);
    $scope.action = $routeParams.action;
    $scope.heading = 'Ads Administration - '+ $scope.action + ' Category';

    if ($routeParams.id && $routeParams.action.toLowerCase() != 'create') {
        $scope.categoryId = $routeParams.id;
        adsData.getCategoryById($routeParams.id)
            .$promise
            .then(function (categoryData) {
                //console.log(categoryData);
                $scope.categoryName = categoryData.name;
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Cannot get selected Category. ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error! ",
                    text: messageText,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    }

    $scope.categoryAction = function (action, categoryName) {
        switch (action) {
            case 'create':
                //console.log(categoryName);
                adminServices.createCategory(categoryName)
                    .$promise
                    .then(function (data) {
                        //console.log(data);
                        $scope.deleteFirstMessageIfMaxLengthReached();
                        $scope.Messages.push({
                            type: "Success! ",
                            text: data.message,
                            messageClass: 'alert-success',
                            date: new Date()
                        });
                        $location.path('/admin/categories/list');
                    }, function (error) {
                        //console.log(error);
                        var messageText = serviceFunctions.messageServerErrors('Cannot create new Category. ', error.data);
                        $scope.deleteFirstMessageIfMaxLengthReached();
                        $scope.Messages.push({
                            type: "Error! ",
                            text: messageText,
                            messageClass: 'alert-danger',
                            date: new Date()
                        });
                    });
                break;
            case 'edit':
                //console.log(categoryName);
                adminServices.editCategory($routeParams.id, categoryName)
                    .$promise
                    .then(function (data) {
                        //console.log(data);
                        $scope.deleteFirstMessageIfMaxLengthReached();
                        $scope.Messages.push({
                            type: "Success! ",
                            text: data.message,
                            messageClass: 'alert-success',
                            date: new Date()
                        });
                        $location.path('/admin/categories/list');
                    }, function (error) {
                        //console.log(error);
                        var messageText = serviceFunctions.messageServerErrors('Cannot edit the Category. ', error.data);
                        $scope.deleteFirstMessageIfMaxLengthReached();
                        $scope.Messages.push({
                            type: "Error! ",
                            text: messageText,
                            messageClass: 'alert-danger',
                            date: new Date()
                        });
                    });
                break;
            case 'delete':
                //console.log(categoryName);
                adminServices.deleteCategory($routeParams.id)
                    .$promise
                    .then(function (data) {
                        //console.log(data);
                        $scope.deleteFirstMessageIfMaxLengthReached();
                        $scope.Messages.push({
                            type: "Success! ",
                            text: data.message,
                            messageClass: 'alert-success',
                            date: new Date()
                        });
                        $location.path('/admin/categories/list');
                    }, function (error) {
                        //console.log(error);
                        var messageText = serviceFunctions.messageServerErrors('Cannot delete the Category. ', error.data);
                        $scope.deleteFirstMessageIfMaxLengthReached();
                        $scope.Messages.push({
                            type: "Error! ",
                            text: messageText,
                            messageClass: 'alert-danger',
                            date: new Date()
                        });
                    });
                break;
            default:
        }
    };
}
]);