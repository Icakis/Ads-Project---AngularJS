/// <reference path="../partials/adsView partials/loginRegisterView.html" />
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
    }).when('/#/user/home', {
        templateUrl: './partials/registerView/registerView.html',
        controller: 'registerController'
    });
});