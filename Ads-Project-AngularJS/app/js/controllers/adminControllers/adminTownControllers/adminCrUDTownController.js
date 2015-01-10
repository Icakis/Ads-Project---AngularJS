'use strict';

app.controller('adminCrUDTownController', ['$scope', 'adsData', 'adminServices', '$location', '$routeParams', 'serviceFunctions', function ($scope, adsData, adminServices, $location, $routeParams, serviceFunctions) {
    //console.log($routeParams);
    $scope.action = $routeParams.action;
    $scope.heading = 'Ads Administration - ' + $scope.action + ' Town';

    if ($routeParams.id && $routeParams.action.toLowerCase() != 'create') {
        adsData.getTownById($routeParams.id)
            .$promise
            .then(function (townData) {
                //console.log(categoryData);
                $scope.townName = townData.name;
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Cannot get selected Town. ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error! ",
                    text: messageText,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    }

    $scope.townAction = function (action, townName) {
        switch (action) {
            case 'create':
                //console.log(categoryName);
                adminServices.createTown(townName)
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
                        $location.path('/admin/towns/list');
                    }, function (error) {
                        //console.log(error);
                        var messageText = serviceFunctions.messageServerErrors('Cannot create new Town. ', error.data);
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
                adminServices.editTown($routeParams.id, townName)
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
                        $location.path('/admin/towns/list');
                    }, function (error) {
                        //console.log(error);
                        var messageText = serviceFunctions.messageServerErrors('Cannot edit the Town. ', error.data);
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
                adminServices.deleteTown($routeParams.id)
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
                        $location.path('/admin/towns/list');
                    }, function (error) {
                        //console.log(error);
                        var messageText = serviceFunctions.messageServerErrors('Cannot delete the Town. ', error.data);
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