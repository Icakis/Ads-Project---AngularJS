'use strict';

app.factory('adminServices', function ($resource, $http, $cookieStore, $q, baseUrl) {
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

    function getAllUsersSortedBy(startPage, pageSize, sortBy) {
        setHeaders();
        return $resource(baseUrl + '/api/admin/Users?SortBy=:sortBy&StartPage=:startPage&PageSize=:pageSize',
        {
            startPage: startPage,
            pageSize: pageSize,
            sortBy: sortBy
        }).get();
    }

    function getAllCategoriesSortedBy(startPage, pageSize, sortBy) {
        setHeaders();
        return $resource(baseUrl + '/api/admin/Categories?SortBy=:sortBy&StartPage=:startPage&PageSize=:pageSize',
        {
            startPage: startPage,
            pageSize: pageSize,
            sortBy: sortBy
        }).get();
    }

    function getAllTownsSortedBy(startPage, pageSize, sortBy) {
        setHeaders();
        return $resource(baseUrl + '/api/admin/Towns?SortBy=:sortBy&StartPage=:startPage&PageSize=:pageSize',
        {
            startPage: startPage,
            pageSize: pageSize,
            sortBy: sortBy
        }).get();
    }

    function editUserByUsername(editedUser) {
        setHeaders();
        console.log(editedUser);
        var resource = request('/api/admin/User/:username');
        var updatedUser = {
            "name": editedUser.name,
            "email": editedUser.email,
            "phoneNumber": editedUser.phoneNumber,
            "username": editedUser.username,
        };


        if (user.townId) {
            var townIdInteger = parseInt(user.townId);
            if (!isNaN(townIdInteger)) {
                updatedUser.townId = townIdInteger;
            } else {
                return reject('Invalid town.');
            }
        }

        return resource.update(updatedUser);
    }

    function getUserById(username) {
        setHeaders();
        console.log(username);
        return $resource(baseUrl + '/api/admin/User/:username',
        {
            username: username,
        }).get();
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
        })
            .$promise
            .then(function (user) {
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


        if (user.townId) {
            var townIdInteger = parseInt(user.townId);
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
        getAllUsersSortedBy: getAllUsersSortedBy,
        getAllCategoriesSortedBy: getAllCategoriesSortedBy,
        getAllTownsSortedBy: getAllTownsSortedBy,
        editUserByUsername: editUserByUsername,

        getUserById: getUserById,


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