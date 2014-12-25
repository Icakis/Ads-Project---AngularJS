
videoApp.controller('mainController', ['$scope', function ($scope) {
    //Configuration
    $scope.haveSubtitlesConfigs = [
                               {
                                   'name': 'No',
                                   'value': false
                               },
                               {
                                   'name': 'Yes',
                                   'value': true
                               }
    ];

    $scope.sortCriteriaArray = ['Title', 'Length', 'Date', 'Likes'];
    $scope.orderCriteriaArray = ['Ascending', 'Descending'];
    $scope.sortCriteriaObj = {};
    $scope.sortOrderFunction = function () {
        //alert('yese');
        //console.log($scope.sortCriteriaObj.sortCriteria);
        //console.log($scope.sortCriteriaObj.orderCriteria);        
        //console.log(videoA);
        //console.log(videoB);

        var orderCoeff = '';
        if ($scope.sortCriteriaObj.orderCriteria == $scope.orderCriteriaArray[1]) {
            orderCoeff = '-';
        }

        if (!$scope.sortCriteriaObj.sortCriteria) {
            return '';
        }

        var sortProp = orderCoeff + $scope.sortCriteriaObj.sortCriteria.toLowerCase();;
        //console.log(orderCoeff);
        console.log(sortProp);

        return [sortProp];
        //console.log(videoB);
        //if (!$scope.sortCriteriaObj.sortCriteria || !videoA ) {
        //    return 0;
        //}

        //var sortProp = $scope.sortCriteriaObj.sortCriteria.toLowerCase();
        //console.log(sortProp);
        //if (sortProp == String.valueOf('Likes').toLowerCase()) {
        //    console.log(sortProp + 'in LIKES');
        //    return orderCoeff + 'video.comments.likes';
        //} else {
        //    console.log(sortProp + 'in OTHER');
        //    //return (videoA[sortProp] - videoB[sortProp]) * orderCoeff ? 1 : -1;
        //}
    };

    $scope.filter = {};
    $scope.filterCategoryFunction = function (video) {
        if ($scope.filter.filterCategory == null) {
            return true;
        };

        return $scope.filter.filterCategory == video.category;
    }

    $scope.filterHaveSubtitlesFunction = function (video) {
        if ($scope.filter.haveSubtitles == null) {
            return true;
        };

        return $scope.filter.haveSubtitles.value == video.haveSubtitles;
    }

    $scope.filter.fromDateValue = '';
    $scope.filter.toDateValue = '';
    $scope.changeFromDate = function (date) {
        var newDate = Date.parse(date);
        if (!isNaN(newDate)) {
            $scope.filter.fromDateValue = new Date(newDate);
        } else {
            $scope.filter.fromDateValue = '';
        }
    };

    $scope.changeToDate = function (date) {
        var newDate = Date.parse(date);
        if (!isNaN(newDate)) {
            $scope.filter.toDateValue = new Date(newDate);
        } else {
            $scope.filter.toDateValue = '';
        }
    };

    $scope.filterDateFunction = function (video) {
        if ((!$scope.filter.fromDateValue && !$scope.filter.toDateValue)) {
            return true;
        }

        //console.log($scope.filter.fromDateValue.valueOf());
        //console.log($scope.filter.toDateValue.valueOf());
        var firstFilterDate = (new Date($scope.filter.fromDateValue));
        var secondFilterDate = (new Date($scope.filter.toDateValue));
        if ((isNaN(firstFilterDate) || firstFilterDate.setHours(0, 0, 0, 0).valueOf() <= video.date.setHours(0, 0, 0, 0).valueOf()) &&
           (isNaN(secondFilterDate) || secondFilterDate.setHours(0, 0, 0, 0).valueOf() >= video.date.setHours(0, 0, 0, 0).valueOf())) {
            return true;
        } else {
            return false;
        }
    }

    var videoExample = {
        title: 'Course introduction',
        pictureUrl: 'http://www.vialattea.it/Portals/0/SkiArea/01video1.png',
        length: '3:32',
        category: 'IT',
        subscribers: 3,
        date: new Date(2014, 12, 15),
        haveSubtitles: false,
        comments: [
            {
                username: 'Pesho Peshev',
                content: 'Congratulations Nakov',
                date: new Date(2014, 12, 15, 23, 30, 0),
                likes: 3,
                websiteUrl: 'http://pesho.com/'
            },
            {
                username: 'Ivan Ivanov',
                content: 'Woow Bai Ivan is awsome!',
                date: new Date(2014, 12, 17, 12, 30, 0),
                likes: 1,
                websiteUrl: 'http://ivan.com/'
            }
        ]
    };

    var videoExample2 = {
        title: 'Zai4enceto bqlo',
        pictureUrl: 'http://www.iconsdb.com/icons/preview/black/video-marketing-3-xxl.png',
        length: '123:32',
        category: 'Song',
        subscribers: 88312,
        date: new Date(1950, 11, 15),
        haveSubtitles: true,
        comments: [
            {
                username: 'Bai Georgi',
                content: 'The best song EVER!!',
                date: new Date(2013, 12, 15, 1, 30, 0),
                likes: 3,
                websiteUrl: 'http://joro.com/'
            },
            {
                username: 'Minka Minkova',
                content: 'Woow beat is awsome!',
                date: new Date(2012, 1, 7, 22, 30, 0),
                likes: 21,
                websiteUrl: 'http://minka.com/'
            }
        ]
    };

    var allVideos = [];
    allVideos.push(videoExample);
    allVideos.push(videoExample2);

    $scope.allVideos = allVideos;


    var allCategories = [];
    $scope.allVideos.forEach(function (video) {
        if (allCategories.indexOf(video.category) == -1) {
            allCategories.push(video.category);
            return true;
        };

        return false;
    });

    $scope.allCategories = allCategories;
}]);