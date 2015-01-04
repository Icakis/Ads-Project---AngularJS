'use strict';
/* http://docs.angularjs.org/#!angular.service */

app.constant('baseUrl', 'http://localhost:1337');

app.factory('userData', function ($resource, $http, $cookieStore, $q, baseUrl) {
    function setHeaders() {
        //console.log(getLoggedUser().access_token);
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + getLoggedUser().access_token;
    }

    function request(url) {
        //$http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        setHeaders();
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
        })
            .$promise
            .then(function (user) {
                //console.log('Set logged user');
                setLoggedUser(user);
                return user.$promise;
            }, function (error) {
                //console.log('Error in service');
                //console.log(error);
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
        return $cookieStore.remove('loggedUser');
    }

    function getUserProfile() {
        setHeaders();
        return $resource(baseUrl + '/api/user/profile').get();
    }

    function editUser(user) {
        setHeaders();
        var resource = request('/api/user/profile');
        var updatedUser = {
            "name": user.name,
            "email": user.email,
            "phoneNumber": user.phoneNumber,
        };


        if (user.town) {
            var townIdInteger = parseInt(user.town.id);
            if (!isNaN(townIdInteger)) {
                updatedUser.townId = townIdInteger;
            }
        }

        return resource.update(updatedUser);
    }

    //function deleteUser(userId) {
    //    // TODO:
    //}

    //function getUserById(userId) {
    //    // TODO:
    //}


    function changeUserPassword(oldPassword, newPassword, confirmPassword) {
        setHeaders();
        return request('/api/user/changePassword').update({
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
        getUserProfile: getUserProfile,
        editUser: editUser,
        //deleteUser: deleteUser,
        //getUserById: getUserById,
        changeUserPassword: changeUserPassword
    }
});

app.factory('userAdsData', function ($resource, $http, baseUrl, userData) {

    function generateResourceByUrl(url) {
        return $resource(url,
            { id: '@id' },
            {
                update: {
                    method: 'PUT'
                }
            });
    }

    function setHeaders() {
        //console.log(userData.getLoggedUser().access_token);
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + userData.getLoggedUser().access_token;
    }

    function getAllAds() {
        return generateResourceByUrl(baseUrl + '/api/ads').get();
    }

    function createNewAd(ad) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/user/ads').save(ad);
    }

    function getAllUserAds(startPage, pageSize, status) {
        setHeaders();
        return $resource(baseUrl + '/api/user/ads',
        {
            status: status,
            startPage: startPage,
            pageSize: pageSize
        }).get();
    }

    function deactivateAd(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/user/ads/deactivate/:id').update({ id: id });
    }

    function publishAdAgain(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/user/ads/publishagain/:id').update({ id: id });
    }

    function getAdById(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/user/ads/:id').get({ id: id });
    }

    function editAdById(id, ad) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/user/ads/:id').update({ id: id }, ad);
    }

    function deleteAd(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/user/ads/:id').delete({ id: id });
        //return resource.delete({ id: id });
    }



    return {
        getAll: getAllAds,
        createNewAd: createNewAd,
        getAllUserAds: getAllUserAds,
        deactivateAd: deactivateAd,
        publishAdAgain: publishAdAgain,
        getAdById: getAdById,
        editAdById: editAdById,
        deleteAd: deleteAd
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

app.factory('serviceFunctions', function ($resource, baseUrl) {

    function pageNumbersArray(data) {
        var pageArray = [];
        for (var i = 0; i < data.numPages; i++) {
            pageArray[i] = i + 1;
        }

        return pageArray;
    }

    return {
        pageNumbersArray: pageNumbersArray,
    };
});