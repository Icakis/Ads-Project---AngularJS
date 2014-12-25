'use strict';

videoApp.controller('filterController', ['$scope', function ($scope) {

    //$scope.dataInputValidateion = function (dateElement) {
    //    var date = dateElement.$viewValue;
    //    //var regPattern = /(\d\d\d\d-\d\d-\d\d$)/;
    //    //var isValidDate = regPattern.test(date);
    //    //console.log(dateElement);
    //    console.log(date);
    //    if (isNaN(Date.parse(date))) {
    //        console.log('Invalid date');
    //        dateElement.$invalid = true;
    //    } else {
    //        dateElement.$invalid = false;
    //        //dateElement.$setPristine();
    //    }
    //};

    $scope.reset = function () {
        $scope.filter.fromDateValue = '';
        $scope.filter.toDateValue = '';
        //console.log($scope.fromDateError);
    };
}]);