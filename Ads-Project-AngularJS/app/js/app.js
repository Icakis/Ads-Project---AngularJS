/// <reference path="../partials/userView/publishNewAdView.html" />
/// <reference path="../partials/userView/userHomeView.html" />
/// <reference path="../partials/adsView partials/loginRegisterView.html" />
/// <reference path="../partials/userView/userAdsView.html" />
'use strict';

var app = angular.module('adsApp', ['ngResource', 'ngRoute', 'ngCookies'])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './partials/adsViewPartials/homeView.html',
        controller: 'loginRegisterController'
    }).when('/login', {
        templateUrl: './partials/loginView/loginView.html',
        controller: 'loginController'
    }).when('/register', {
        templateUrl: './partials/registerView/registerView.html',
        controller: 'registerController'
    }).when('/logout', {
        templateUrl: './partials/adsViewPartials/homeView.html',
        controller: 'logoutController'
    }).when('/user/home', {
        templateUrl: './partials/userView/userHomeView.html',
        controller: 'AllAdsController'
    }).when('/user/ads', {
        templateUrl: './partials/userView/userAdsView.html',
        controller: 'userController'
    }).when('/user/ads/publish', {
        templateUrl: './partials/userView/publishNewAdView.html',
        controller: 'userController'
    }).when('/user/ads/edit/:editedAdId*', {
        templateUrl: './partials/userView/editAdView.html',
        controller: 'editAdController'
    }).otherwise({
        templateUrl: './partials/loginView/loginView.html',
        controller: 'loginController'
    });
});