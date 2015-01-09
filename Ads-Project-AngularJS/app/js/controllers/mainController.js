'use strict';

app.controller('mainController', ['$scope', '$location', '$rootScope', 'userData', '$q', function ($scope, $location, $rootScope, userData, $q) {
    //if (!userData.getLoggedUser()) {
    //    $location.path('/');
    //} else {
    //    $scope.getLoggedUsername = userData.getLoggedUser().username;
    //    $location.path('/user/home');
    //}

    $scope.heading = 'Ads Home';
    $scope.isUserLogged = function () {
        if (userData.getLoggedUser()) {
            return true;
        }

        return false;
    }

    $scope.isLoggedAdmin = function () {
        var deferred = $q.defer();
        //console.log(userData.getLoggedUser());
        if ($scope.isUserLogged()) {
            if (userData.getLoggedUser().isAdmin === 'true') {
                deferred.resolve();
                $location.path('/admin/home');
            } else {
                deferred.reject();
                $location.path('/user/home');
            }

            $scope.getLoggedUsername = userData.getLoggedUser().username;
        } else {
            deferred.reject();
            $location.path('/');
        }
        return deferred.promise;
    }

    $scope.isLoggedAdmin();

    $scope.isAdmin = function () {
        if ($scope.isUserLogged()) {
            if (userData.getLoggedUser().isAdmin === 'true') {
                return true;
            }
        };

        return false;
    }

    $rootScope.userSection = 'home';
    $rootScope.adminSection = 'home-admin';
    $scope.pagination = {
        startPage: 2,
        pageSize: 2,
    };
    $scope.itemsLabel = 'ads';

    $scope.Messages = [];
    $scope.deleteFirstMessageIfMaxLengthReached = function () {
        if ($scope.Messages.length > 2) {
            $scope.Messages.splice(0, 1);
        }
    };

    $scope.removeMessage = function (deleteMessage) {
        //console.log(deleteMessage);
        for (var message in $scope.Messages) {
            if ($scope.Messages[message].$$hashKey === deleteMessage.$$hashKey) {
                $scope.Messages.splice(message, 1);
                break;
            }
        }
    };

    //[{
    //    type: "Error",
    //    text: "Hello there!",
    //    messageClass: 'alert-warning',
    //    date: new Date()
    //},
    //{
    //    type: "Success",
    //    text: "Hello there!",
    //    messageClass: 'alert-success'
    //}];

    //{
    //    type: "Error",
    //    text: "Hello there!",
    //    messageClass:'alert-success'
    //}

    $scope.isShown = {
        isAllAdsShown: false,
        isAllTownsShown: false,
        isAllCategoriesShown: false,
    };
}]);