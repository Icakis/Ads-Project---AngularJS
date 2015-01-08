'use strict';

app.factory('adminAdsDataServices', function ($resource, $http, baseUrl, userData) {

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

    function getAllAdsByFilter(categoryId, townId, status, startPage, pageSize, sortBy) {
        setHeaders();
        return $resource(baseUrl + '/api/admin/Ads?CategoryId=:categoryId&TownId=:townId&StartPage=:startPage&PageSize=:pageSize&status=:status&SortBy=:sortBy',
        {
            categoryId: categoryId,
            townId: townId,
            startPage: startPage,
            pageSize: pageSize,
            status: status,
            sortBy: sortBy
        }).get();
    }

    function approveAdById(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/admin/Ads/Approve/:id').update({ id: id });
    }

    function getAdById(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/admin/Ads/:id').get({ id: id });
    }

    function deleteAdById(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/admin/Ads/:id').delete({ id: id });
        //return resource.delete({ id: id });
    }

    function editAdById(id, ad) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/admin/Ads/:id').update({ id: id }, ad);
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





    function deleteAd(id) {
        setHeaders();
        return generateResourceByUrl(baseUrl + '/api/user/ads/:id').delete({ id: id });
        //return resource.delete({ id: id });
    }



    return {
        getAllAdsByFilter: getAllAdsByFilter,
        approveAdById: approveAdById,
        getAdById: getAdById,
        deleteAdById:deleteAdById,


        getAll: getAllAds,
        createNewAd: createNewAd,
        getAllUserAds: getAllUserAds,
        deactivateAd: deactivateAd,
        publishAdAgain: publishAdAgain,

        editAdById: editAdById,
        deleteAd: deleteAd
    }
});