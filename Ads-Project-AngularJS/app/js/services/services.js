'use strict';
/* http://docs.angularjs.org/#!angular.service */
app.factory('userData', function ($resource, $cookieStore) {
    function login(username, password) {
        return $resource.save('http://softuni-ads.azurewebsites.net/api/user/login', {
            "username": username,
            "password": password
        }).success(function (user) {
            setLoggedUser(user);
        });
    }

    function register(username, password, confirmPassword, name, email, phone, townId) {
        return $resource.save('http://softuni-ads.azurewebsites.net/api/user/login', {
            "username": username,
            "password": password,
            "confirmPassword": confirmPassword,
            "name": name,
            "email": email,
            "phone": phone,
            "townId": townId
        }).success(function (user) {
            setLoggedUser(user);
        });
    }

    function getLoggedUser() {
        $cookieStore.get('loggedUser');
    }

    function setLoggedUser(user) {
        $cookieStore.put('loggedUser', user);
    }

    function logout() {
        $cookieStore.put('loggedUser', user);
    }

    function editUser(name, email, phoneNumber, townId) {

    }

    function deleteUser(userId) {

    }

    function getUserById(userId) {

    }

    function changeUserPassword(newPassword) {

    }

    return {
        login: login,
        register: register,
        getLoggedUser: getLoggedUser,
        logout: logout,
        editUser: editUser,
        deleteUser: deleteUser,
        getUserById: getUserById,
        changeUserPassword: changeUserPassword
    }
});

app.factory('userAdsData', function ($resource, $http, userData) {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + userData.getLoggedUser.access_token;

    var resource = $resource('http://localhost:1337/api/user/ads/:id',
		{ id: '@id' },
		{
		    update: {
		        method: 'PUT'
		    }
		});

    function getAllAds() {
        return resource.get();
    }

    function createNewAd(ad) {
        return resource.save(ad);
    }

    function getAdById(id) {
        return resource.get({ id: id });
    }

    function editAd(id, ad) {
        return resource.update({ id: id }, ad);
    }

    function deleteAd(id) {
        return resource.delete({ id: id });
    }

    return {
        getAll: getAllAds,
        create: createNewAd,
        getById: getAdById,
        edit: editAd,
        delete: deleteAd
    }
});