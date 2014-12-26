/// <reference path="../partials/adsView partials/loginRegisterView.html" />
'use strict';

var app = angular.module('adsApp', ['ngResource', 'ngRoute', 'ngCookies'])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './partials/adsViewPartials/addView.html',
        controller: 'loginRegisterController'
    });


    //$routeProvider.when('/ads', {
    //    templateUrl: 'templates/allAds.html',
    //    controller: 'AllAdsController'
    //});
    //$routeProvider.when('/ads/:adId', {
    //    test: 'Pesho',
    //    templateUrl: 'templates/adDetails.html',
    //    controller: 'AdDetailsController'
    //});
});