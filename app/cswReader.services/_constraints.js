/** * [module description]
 * @param  {[type]} 'config' [description]
 * @param  {[type]} []       [description]
 * @return {[type]}          [description]
 */
// angular.module('config', []);

angular.module('cswReader.services').factory('constraintsSrv', constraintsSrv);

constraintsSrv.$inject = ['$http'];

function constraintsSrv($http) {

	var promise;
	var constraintsSrv = {
		getFile: getFile
	};

	return constraintsSrv;

	////////////////////////////////////////////////////////////////////////

	function getFile(url) {
		if (!promise) {
			promise = $http.get(url)
				.then(function(response) {
					var constraints = {};
					for (var c in response.data) {
						if (! c.startsWith('_')) {
							constraints[c] = response.data[c];
						}
					}
					return constraints;
				})
				.catch(function(reason) {
					console.log("Error in constraintsSrv.getFile service : can't get " + url + " JSON file (reason: " + reason + ").");
				});
		}
		return promise;
	}
}
