'use strict';
/* http://docs.angularjs.org/#!angular.service */
app.factory('userData', function ($resource, $cookieStore) {
    var baseUrl = 'http://localhost:1337';
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
        return $resource(baseUrl + '/api/user/login', {
            "username": username,
            "password": password
        }).save().success(function (user) {
            setLoggedUser(user);
        });
    }

    function register(username, password, confirmPassword, name, email, phone, townId) {
        return $resource(baseUrl + '/api/user/register', {
            "username": username,
            "password": password,
            "confirmPassword": confirmPassword,
            "name": name,
            "email": email,
            "phone": phone,
            "townId": townId
        }).save().success(function (user) {
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
        $cookieStore.put('loggedUser', null);
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