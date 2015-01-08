'use strict';

app.controller('adminNavigationController', ['$scope', 'userData', '$routeParams', 'userAdsData', 'adsData', '$rootScope', function ($scope, userData, $routeParams, userAdsData, adsData, $rootScope) {
    $scope.isUserSectionSelected = function (selectedSection) {
        //console.log(selectedSection);
        return $rootScope.userSection === selectedSection;
    }

    $scope.changeUserSection = function (section) {
        $rootScope.userSection = section;
        
        //console.log($rootScope.userSection);
        $scope.pagination.startPage = '';
    }
}
]);