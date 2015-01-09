'use strict';

var app = angular.module('adsApp', ['ngResource', 'ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './partials/adsViewPartials/homeView.html',
        controller: 'mainController'
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
        controller: 'publishNewAdController'
    }).when('/user/ads/edit/:editedAdId*', {
        templateUrl: './partials/userView/editAdView.html',
        controller: 'editAdController'
    }).when('/user/ads/delete/:deleteAdId*', {
        templateUrl: './partials/userView/deleteAdView.html',
        controller: 'deleteAdController'
    }).when('/user/profile', {
        templateUrl: './partials/userView/editUserProfileView.html',
        controller: 'editUserProfileController'
    }).when('/admin/home', {
        templateUrl: './partials/adminView/adminHomeView.html',
        controller: 'adminAllAdsController',
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    }).when('/admin/ads/delete/:deleteAdId*', {
        templateUrl: './partials/adminView/deleteAdView.html',
        controller: 'adminDeleteAdController',
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    }).when('/admin/ads/edit/:editedAdId*', {
        templateUrl: './partials/adminView/adminEditAdView.html',
        controller: 'adminEditAdController',
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    }).when('/admin/users/list', {
        templateUrl: './partials/adminView/adminUsersView.html',
        controller: 'adminUsersController',
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    }).when('/admin/users/edit/:userId', {
        templateUrl: './partials/adminView/adminEditUserView.html',
        controller: 'adminEditUserController'
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    }).when('/admin/users/delete/:userId', {
        templateUrl: './partials/adminView/adminDeleteUserView.html',
        controller: 'adminDeleteUserController'
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    }).when('/admin/categories/list', {
        templateUrl: './partials/adminView/adminCategoriesView.html',
        controller: 'adminCategoriesController',
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    }).when('/admin/towns/list', {
        templateUrl: './partials/adminView/adminTownsView.html',
        controller: 'adminTownsController',
        //resolve: { isLoggedAdmin: isLoggedAdmin }
    });

    //    .otherwise({
    //    templateUrl: './partials/adsViewPartials/homeView.html',
    //    controller: 'mainController'
    //});
});

app.constant('baseUrl', 'http://localhost:1337');