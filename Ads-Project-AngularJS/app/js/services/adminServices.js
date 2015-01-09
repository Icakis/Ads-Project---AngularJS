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
        {
            id: '@id',
            username: '@username',
        },
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

    function getUserById(id) {
        setHeaders();
        return $resource(baseUrl + '/api/admin/Users/:id').get({ id: id });
    }

    function editUser(user) {
        setHeaders();
        var resource = request('/api/admin/User/:username');

        if (user.townId) {
            var townIdInteger = parseInt(user.townId);
            if (!isNaN(townIdInteger)) {
                user.townId = townIdInteger;
            }
        }

        return resource.update(user);
    }

    function changeUserPassword(oldPassword, newPassword, confirmPassword, username) {
        setHeaders();
        return request('/api/admin/SetPassword').update({
            "oldPassword": oldPassword,
            "NewPassword": newPassword,
            "ConfirmPassword": confirmPassword,
            "Username": username
        });
    }

    function deleteUserByUsername(username) {
        setHeaders();
        var resource = request('/api/admin/User/:username');

        return resource.delete({ username: username });
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



    //function deleteUser(userId) {
    //    // TODO:
    //}

    //function getUserById(userId) {
    //    // TODO:
    //}




    return {
        getAllUsersSortedBy: getAllUsersSortedBy,
        getAllCategoriesSortedBy: getAllCategoriesSortedBy,
        getAllTownsSortedBy: getAllTownsSortedBy,
        editUser: editUser,
        deleteUserByUsername: deleteUserByUsername,

        getUserById: getUserById,






        login: login,
        register: register,
        getLoggedUser: getLoggedUser,
        logout: logout,
        getUserProfile: getUserProfile,

        //deleteUser: deleteUser,
        //getUserById: getUserById,
        changeUserPassword: changeUserPassword
    }
});