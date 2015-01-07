'use strict';

app.controller('registerController', ['$scope', '$location', 'adsData', 'userData', function ($scope, $location, adsData, userData) {
    $scope.heading = 'Ads Register';
    if (userData.getLoggedUser()) {
        //alert('You are logged in. Please logout first.');
        $scope.deleteFirstMessageIfMaxLengthReached();
        $scope.Messages.push({
            type: "Alert",
            text: "You're logged! If you want to register, please logout first.",
            messageClass: 'alert-info',
            date: new Date()
        });

        $location.path('/user/home');
    }

    $scope.newUser = { townId: null };
    adsData.getAllTowns()
        .$promise
        .then(function (towns) {
            $scope.allTowns = towns;
        }, function (error) {
            console.log(error);
            $scope.Messages.push({
                type: "Warning",
                text: "Cannot dispalay filter by Towns (Connection lost or something gone wrong).",
                messageClass: 'alert-info',
                date: new Date()
            });
        });


    $scope.register = function () {
        //username, password, confirmPassword, name, email, phone, townId
        if ($scope.newUser.town) {
            $scope.newUser.town = parseInt($scope.newUser.town);
        }

        userData.register($scope.newUser.username, $scope.newUser.password1, $scope.newUser.password2, $scope.newUser.name, $scope.newUser.email, $scope.newUser.phone, $scope.newUser.town)
        .then(function (response) {
            //alert('Successfuly register.');
            //console.log(response);
            $scope.deleteFirstMessageIfMaxLengthReached();
            $scope.Messages.push({
                type: "Success",
                text: "You're registered!",
                messageClass: 'alert-success',
                date: new Date()
            });

            $location.path('/user/home');
        }, function (error) {
            //console.log('Error in LoginController');
            console.log(error);
            for (var errorIndex in error.data.modelState) {
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error",
                    text: error.data.modelState[errorIndex].join(' / '),
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            }
        });
    };
}
]);