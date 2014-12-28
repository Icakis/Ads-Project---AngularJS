'use strict';
/* http://docs.angularjs.org/#!angular.service */

app.constant('baseUrl', 'http://localhost:1337');

app.factory('userData', function ($resource, $http, $cookieStore, $q, baseUrl) {
    function request(url, accessToken) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

        var resource = $resource(baseUrl + url,
            { id: '@id' },
            {
                update: {
                    method: 'PUT'
                }
            });
        return resource;
    }

    function login(username, password) {
        return $resource(baseUrl + '/api/user/Login').save({
            "username": username,
            "password": password
        }).$promise.then(function (user) {
            console.log('Set logged user');
            setLoggedUser(user);
            return user.$promise;
        }, function (error) {
            console.log('Error in service');
            console.log(error);
            return $q.reject(error);
        });
    }

    function register(username, password, confirmPassword, name, email, phone, townId) {
        return $resource(baseUrl + '/api/user/register').save({
            "username": username,
            "password": password,
            "confirmPassword": confirmPassword,
            "name": name,
            "email": email,
            "phone": phone,
            "townId": townId
        }).$promise.then(function (user) {
            console.log('Set logged user in registration');
            setLoggedUser(user);
            return user.$promise;
        }, function (error) {
            console.log('Error in register service');
            console.log(error);
            return $q.reject(error);
        });
    }

    function getLoggedUser() {
        return $cookieStore.get('loggedUser');
    }

    function setLoggedUser(user) {
        $cookieStore.put('loggedUser', user);
    }

    function logout() {
        $cookieStore.remove('loggedUser');
    }

    function editUser(name, email, phoneNumber, townId) {
        var resource = request('/api/user/profile', getLoggedUser().access_token);
        var updatedUser = {
            "username": username,
            "name": name,
            "email": email,
            "phone": phone,
            "townId": townId
        };

        resource.update({ id: id }, updatedUser).success(function (user) {
            var loggedUser = getLoggedUser();
            var updatedLoggedUser = {
                "username": user.username,
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "townId": user.townId,

                "access_token": loggedUser.access_token,
                "token_type": "bearer",
                "expires_in": parseInt(getLoggedUser().expires_in),
                ".issued": getLoggedUser()[".issued"],
                ".expires": getLoggedUser()[".expires"]
            };

            setLoggedUser(updatedLoggedUser);
        });
    }

    //function deleteUser(userId) {
    //    // TODO:
    //}

    //function getUserById(userId) {
    //    // TODO:
    //}

    function changeUserPassword(oldPassword, newPassword, confirmPassword) {
        var resource = request('/api/user/changePassword', getLoggedUser().access_token);
        resource.update({
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
        });
    }

    return {
        login: login,
        register: register,
        getLoggedUser: getLoggedUser,
        logout: logout,
        editUser: editUser,
        //deleteUser: deleteUser,
        //getUserById: getUserById,
        changeUserPassword: changeUserPassword
    }
});

app.factory('userAdsData', function ($resource, baseUrl, userData) {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + userData.getLoggedUser.access_token;

    var resource = $resource(baseUrl + '/api/user/ads/:id',
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

app.factory('adsData', function ($resource, baseUrl) {

    function getAllPublishedAdsByFilter(categoryId, townId, startPage, pageSize) {
        return $resource(baseUrl + '/api/Ads?CategoryId=:categoryId&TownId=:townId&StartPage=:startPage&PageSize=:pageSize',
        {
            categoryId: categoryId,
            townId: townId,
            startPage: startPage,
            pageSize: pageSize
        }).get();
    }

    function getAllCategories() {
        return $resource(baseUrl + '/api/Categories').query().$promise;
    }

    function getAllTowns() {
        return $resource(baseUrl + '/api/Towns').query().$promise;
    }

    return {
        getAllPublishedAdsByFilter: getAllPublishedAdsByFilter,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns,
    };
});