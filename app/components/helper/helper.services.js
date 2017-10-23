function HelperService($http, $location) {

    var promises = [];
    var HelperService = {
        getJsonFile: getJsonFile,
        getBaseUrl: getBaseUrl,
        getProxyUrl: getProxyUrl,
        getUrlParameter: getUrlParameter
    };

    return HelperService;

    //////////////////////////////////////////////////

    function getJsonFile(file, cache) {
        if ((cache && !promises[cache]) || (!cache)) {
            console.log('getJsonFile', file, cache);
            return $http.get(file)
                .then(function(response) {
                    response.data.file = file;
                    return response.data;
                })
                .catch(function(reason) {
                    console.log("Error in configSrv.getFile service : can't get " + file + " JSON file (reason: " + reason + ").");
                });
        } else {
            return promises[cache];
        }
    }

    function getProxyUrl(url, proxy) {
        proxy = proxy || false;
        if (proxy) {
            return proxy + encodeURIComponent(url);
        }
        return url;
    }

    function getBaseUrl(url) {
        return url.split('?')[0];
    }

    function getUrlParameter(paramName, defaultValue) {
        defaultValue = defaultValue || 0;
        var response = defaultValue;
        var value = $location.search()[paramName];
        if (typeof value != 'undefined') {
            response = value;
            if (typeof value != 'boolean' && ['0', 'false'].indexOf(value.toLowerCase()) > -1) {
                response = 0;
            }
        }
        return response;
    }
}

HelperService.$inject = ['$http', '$location'];

/**
 * @ngdoc service
 * @name HelperService
 * @module components.helper
 *
 * @description Provides HTTP methods for our firebase connection.
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */

angular
    .module('components.helper')
    .factory('HelperService', HelperService);