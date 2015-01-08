'use strict';

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