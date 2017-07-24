/**
 * [module description]
 * @param  {[type]} 'config' [description]
 * @param  {[type]} []       [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader.services')
    .factory('wfsSrv', wfsSrv);

wfsSrv.$inject = ['$http', '$location', 'AppDataSrv', 'helperSrv'];

function wfsSrv($http, $location, AppDataSrv, helperSrv) {

    var promise;
    var wfsSrv = {
        getCapabilities: getCapabilities
    };

    return wfsSrv;

    ////////////////////////////////////////////////////////////////////////

    function getCapabilities(url, callback) {
            url = new wfsjs.getcapabilities.Url(url);
            var getcapabilities_url = helperSrv.getProxyUrl(url.url);
            // Get Capabilities of WFS and check
            promise = $http.get(getcapabilities_url)
                .then(function(response) {
                    var xml = new wfsjs.getcapabilities.Xml(response.data);
                    data = xml.toJson();
                    console.log(data);
                    // AppDataSrv.capabilities = data;
                    // console.log(AppDataSrv.constraintsValues);
                    if (data.operationNames.indexOf('GetFeature') !== -1) {
                        callback(data);
                    } else {
                        AppDataSrv.capabilities.error = "Error in wfsSrv.getRecords service : 'getFeature' operation doesn't exist.";
                        console.log("Error in wfsSrv.getRecords service : 'getFeature' operation doesn't exist.");
                    }
                })
                .catch(function(reason, data) {
                    console.log(reason, data);
                    console.log("Error in wfsSrv.getCapabilities service : can't get " + getcapabilities_url + " JSON file (reason: " + reason + ").");
                });
            return promise;
    }
}
