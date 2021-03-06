﻿'use strict';

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
        return $resource(baseUrl + '/api/Categories').query();
    }

    function getAllTowns() {
        return $resource(baseUrl + '/api/Towns').query();
    }

    function getCategoryById(id) {
        //console.log(id);
        return $resource(baseUrl + '/api/Categories/:id').get({id:id});
    }

    function getTownById(id) {
        return $resource(baseUrl + '/api/towns/:id').get({ id: id });
    }

    return {
        getAllPublishedAdsByFilter: getAllPublishedAdsByFilter,
        getAllCategories: getAllCategories,
        getAllTowns: getAllTowns,
        getCategoryById: getCategoryById,
        getTownById: getTownById,
    };
});