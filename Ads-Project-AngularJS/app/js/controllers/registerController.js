'use strict';

app.controller('registerController', ['$scope', '$location', 'adsData', 'userData', 'serviceFunctions', function ($scope, $location, adsData, userData, serviceFunctions) {
    $scope.heading = 'Ads Register';
    if (userData.getLoggedUser()) {
        $scope.deleteFirstMessageIfMaxLengthReached();
        $scope.Messages.push({
            type: "Alert! ",
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
                type: "Warning! ",
                text: "Cannot dispalay filter by Towns (Connection lost or something gone wrong).",
                messageClass: 'alert-info',
                date: new Date()
            });
        });


    $scope.register = function () {
        userData.register($scope.newUser.username, $scope.newUser.password1, $scope.newUser.password2, $scope.newUser.name, $scope.newUser.email, $scope.newUser.phone, $scope.newUser.townId)
            .then(function (response) {
                //console.log(response);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Success! ",
                    text: "You're registered!",
                    messageClass: 'alert-success',
                    date: new Date()
                });
                $location.path('/user/home');
            }, function (error) {
                //console.log(error);
                var messageText = serviceFunctions.messageServerErrors('Registration failed. ', error.data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error! ",
                    text: messageText,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    };
}
]);