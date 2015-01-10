'use strict';

app.controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function () {
        console.log($scope.editedAd.date);
        var str = window.JSON.stringify({ date: new Date() });
        // str == "{"myDate":"2010-12-27T11:59:18.119Z"}"
        var todayDate = window.JSON.parse(str);
        //console.log(todayDate.date);
        $scope.editedAd.date = todayDate.date;

    };

    $scope.clear = function () {
        $scope.editedAd.date = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
});