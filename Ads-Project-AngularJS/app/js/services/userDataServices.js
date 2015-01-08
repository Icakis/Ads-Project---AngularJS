'use strict';

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