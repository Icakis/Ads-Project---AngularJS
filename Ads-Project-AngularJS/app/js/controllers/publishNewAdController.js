'use strict';

app.controller('publishNewAdController', ['$scope', 'userData', '$routeParams', 'userAdsData', 'adsData', '$rootScope', function ($scope, userData, $routeParams, userAdsData, adsData, $rootScope) {
    if (!userData.getLoggedUser()) {
        $location.path('/');
    }

    $scope.heading = 'Ads - Publish New Ad';

    $rootScope.userSection = 'newAd';

}
]);