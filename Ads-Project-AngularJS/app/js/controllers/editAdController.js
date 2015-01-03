'use strict';

app.controller('editAdController', ['$scope', 'userData', '$routeParams', 'userAdsData', 'adsData', function ($scope, userData, $routeParams, userAdsData, adsData) {
    if (!userData.getLoggedUser()) {
        $location.path('/user/home');
    }

    $scope.heading = 'Ads - Edit Ad';

    //console.log($routeParams);
    $scope.editedAd = {};
    $scope.editedAd.ChangeImage = false;

    userAdsData.getAdById($routeParams.editedAdId).$promise.then(function (data) {
        console.log(data);
        $scope.editedAd = data;

        adsData.getAllCategories()
         .then(function (categories) {
             //console.log(categories);
             for (var i = 0; i < categories.length; i++) {
                 if (categories[i].id == data.categoryId && categories[i].name == data.categoryName) {
                     $scope.editedAd.category = categories[i];
                     break;
                 }
             }

             $scope.allCategories = categories;
         }, function (error) {
             $log.error(error);
         });

        adsData.getAllTowns()
            .then(function (towns) {
                console.log(towns);
                for (var i = 0; i < towns.length; i++) {
                    if (towns[i].id == data.townId && towns[i].name == data.townName) {
                        $scope.editedAd.town = towns[i];
                        break;
                    }
                }

                $scope.allTowns = towns;
            }, function (error) {
                $log.error(error);
            });

    }, function (error) {
        console.log(error);
    });

    $scope.changeUploadImage = function (element) {
        console.log(element.value);

        var photofile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.$apply(function () {
                var pattern = /^data:image\/.*$/;
                if (pattern.test(e.target.result)) {
                    $scope.editedAd.imageDataUrl = e.target.result;
                    $scope.editedAd.ChangeImage = true;
                } else {
                    alert('Invalid Image file type');
                }
            });
        };
        reader.readAsDataURL(photofile);
    };

    $scope.deleteImageDataUrl = function () {
        $scope.editedAd.imageDataUrl = '';
    };

    $scope.editAd = function () {
        userAdsData.editAdById($routeParams.editedAdId, $scope.editedAd)
            .$promise
            .then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            });
    };
}
]);