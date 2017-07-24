/**
 * [module description]
 * @param  {[type]} 'config' [description]
 * @param  {[type]} []       [description]
 * @return {[type]}          [description]
 */
// angular.module('config', []);

angular.module('cswReader.services').factory('helperSrv', helperSrv);

helperSrv.$inject = ['$location', 'AppDataSrv'];

function helperSrv($location, AppDataSrv) {

	var helperSrv = {
		getParam: getParam,
        clearJson: clearJson,
        getProxyUrl: getProxyUrl
	};

	return helperSrv;

	////////////////////////////////////////////////////////////////////////

	function getParam(block, config) {
        var response = config;
        var value = $location.search()[block];
		if (typeof value != 'undefined') {
            response = value;
            if (typeof value!= 'boolean' && ['0', 'false'].indexOf(value.toLowerCase()) > -1 ) {
                response = 0;
            }
		}
        return response;
	}

    function clearJson(json) {
        var result = {};
        for (var j in json) {
            if (! j.startsWith('_')) {
                result[j] = json[j];
            }
        }
        return result;
    }

    function getProxyUrl(url) {
        if (AppDataSrv.config.app.proxy_server_url) {
            return AppDataSrv.config.app.proxy_server_url + encodeURIComponent(url);
        }
        return url;
    }

    function getBaseUrl(url) {
        return url.split('?')[0];
    }
}
