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
            username: '@userName',
            id: '@id',
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
        //console.log(user);
        setHeaders();
        var resource = request('/api/admin/User/:username');

        if (user.townId) {
            var townIdInteger = parseInt(user.townId);
            if (!isNaN(townIdInteger)) {
                user.townId = townIdInteger;
            }
        }

        return resource.update({ username: user.username }, user);
    }

    function changeUserPassword(newPassword, confirmPassword, username) {
        setHeaders();
        return request('/api/admin/SetPassword').update({
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

    function createCategory(categoryName) {
        setHeaders();
        return request('/api/admin/Categories').save({ name: categoryName });
    }

    function editCategory(id, categoryName) {
        setHeaders();
        return request('/api/admin/Categories/:id').update({ id: id, name: categoryName });
    }

    function deleteCategory(id) {
        setHeaders();
        return request('/api/admin/Categories/:id').delete({ id: id });
    }


    function createTown(townName) {
        setHeaders();
        return request('/api/admin/towns').save({ name: townName });
    }

    function editTown(id, townName) {
        setHeaders();
        return request('/api/admin/towns/:id').update({ id: id, name: townName });
    }

    function deleteTown(id) {
        setHeaders();
        return request('/api/admin/towns/:id').delete({ id: id });
    }



    function getLoggedUser() {
        return $cookieStore.get('loggedUser');
    }



    return {
        getAllUsersSortedBy: getAllUsersSortedBy,
        getAllCategoriesSortedBy: getAllCategoriesSortedBy,
        getAllTownsSortedBy: getAllTownsSortedBy,
        editUser: editUser,
        changeUserPassword: changeUserPassword,
        deleteUserByUsername: deleteUserByUsername,
        getUserById: getUserById,

        createCategory: createCategory,
        editCategory: editCategory,
        deleteCategory: deleteCategory,

        createTown: createTown,
        editTown: editTown,
        deleteTown: deleteTown
    }
});