'use strict';

app.controller('editAdController', ['$scope', 'userData', '$routeParams', 'userAdsData', 'adsData', '$rootScope', function ($scope, userData, $routeParams, userAdsData, adsData, $rootScope) {
    if (!userData.getLoggedUser()) {
        $location.path('/user/home');
    }

    $scope.heading = 'Ads - Edit Ad';
    $rootScope.userSection = 'myAds';

    //console.log($routeParams);
    $scope.editedAd = {};
    $scope.editedAd.ChangeImage = false;

    userAdsData.getAdById($routeParams.editedAdId)
        .$promise
        .then(function (data) {
            console.log(data);
            $scope.editedAd = data;

            adsData.getAllCategories()
                .$promise
             .then(function (categories) {
                 //console.log(categories);
                 for (var categoryIndex in categories) {
                     if (categories[categoryIndex].id == data.categoryId && categories[categoryIndex].name == data.categoryName) {
                         //console.log(categories[categoryIndex]);
                         $scope.editedAd.category = categories[categoryIndex];
                         break;
                     }
                 }

                 $scope.allCategories = categories;
             }, function (error) {
                 $log.error(error);
             });

            adsData.getAllTowns()
                .$promise
                .then(function (towns) {
                    for (var townIndex in towns) {
                        //console.log(towns[townIndex].id);
                        if (towns[townIndex].id == data.townId && towns[townIndex].name == data.townName) {
                            $scope.editedAd.town = towns[townIndex];
                            break;
                        }
                    }

                    $scope.allTowns = towns;
                }, function (error) {
                    console.log(error);
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
        console.log($scope.editedAd);
        if ($scope.editedAd.category) {
            $scope.editedAd.categoryId = $scope.editedAd.category.id;
        }

        if ($scope.editedAd.town) {
            $scope.editedAd.townId = $scope.editedAd.town.id;
        }

        userAdsData.editAdById($routeParams.editedAdId, $scope.editedAd)
            .$promise
            .then(function (data) {
                //console.log(data);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Success",
                    text: "Add was successfuly edited.",
                    messageClass: 'alert-success',
                    date: new Date()
                });
            }, function (error) {
                console.log(error);
                $scope.deleteFirstMessageIfMaxLengthReached();
                $scope.Messages.push({
                    type: "Error",
                    text: error.data.error_description,
                    messageClass: 'alert-danger',
                    date: new Date()
                });
            });
    };
}
]);