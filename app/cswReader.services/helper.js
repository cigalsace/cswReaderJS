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

	var promise;
	var helperSrv = {
		getParam: getParam,
        clearJson: clearJson
	};

	return helperSrv;

	////////////////////////////////////////////////////////////////////////

	function getParam(block, config) {
        var response = config;
        var value = $location.search()[block];
		if (typeof value != 'undefined') {
            response = value;
            if (['0', 'false'].indexOf(value.toLowerCase()) > -1 ) {
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
}
