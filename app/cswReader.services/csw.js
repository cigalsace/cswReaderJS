/**
 * [module description]
 * @param  {[type]} 'config' [description]
 * @param  {[type]} []       [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader.services')
    .factory('cswSrv', cswSrv);

cswSrv.$inject = ['$http', '$location', 'AppDataSrv'];

function cswSrv($http, $location, AppDataSrv) {

	var promise;
	var cswSrv = {
		getCswList: getCswList,
		getCswUrl: getCswUrl,
		// getMdUrl: getMdUrl,
		getCswJson: getCswJson
	};

	return cswSrv;

	////////////////////////////////////////////////////////////////////////

	function getCswList(url) {
		// var csw_url = $location.search().csw_list;
		// if (csw_url) {
		// 	url = csw_url;
		// }
		// AppDataSrv.config.csw.url_list = url;

		if (!promise) {
			promise = $http.get(url)
				.then(function(response) {
					return response.data;
				})
				.catch(function(reason) {
					console.log("Error in cswSrv.getCswList service : can't get " + url + " JSON file (reason: " + reason + ").");
				});
		}
		return promise;
	}

	function getCswUrl(cswList, csw_config) {
		// Init result variable
		var url = false;

		// Get base CSW URL
        if (AppDataSrv.config.csw.url) {
            csw_url = AppDataSrv.config.csw.url;
        } else {
            csw_url = cswList[0].url;
            AppDataSrv.config.csw.url = csw_url;
        }

		// Construct CSW URL
		if (csw_url) {
			if (csw_url.indexOf('?') != -1) {
				if (csw_url.charAt(csw_url.length-1) == '?') {
					url = csw_url;
				} else {
					url = csw_url+'&';
				}
			} else {
				url = csw_url+'?';
			}

			// Add paramters from csw_config to url
			if (csw_config.elementsetname) {
				url += 'elementsetname=' + csw_config.elementsetname + '&';
			}
			if (csw_config.maxrecords) {
				url += 'maxrecords=' + csw_config.maxrecords + '&';
			}
			if (csw_config.startposition) {
				url += 'startposition=' + csw_config.startposition + '&';
			}
			if (csw_config.version) {
				url += 'version=' + csw_config.version + '&';
			}
			if (csw_config.service) {
				url += 'service=' + csw_config.service + '&';
			}
			if (csw_config.request) {
				url += 'request=' + csw_config.request + '&';
			}
			if (csw_config.constraintlanguage) {
				url += 'constraintlanguage=' + csw_config.constraintlanguage + '&';
			}
			if (csw_config.postencoding) {
				url += 'postencoding=' + csw_config.postencoding + '&';
			}
			if (csw_config.resulttype) {
				url += 'resulttype=' + csw_config.resulttype + '&';
			}
			if (csw_config.outputschema) {
				url += 'outputschema=' + csw_config.outputschema + '&';
			}
			if (csw_config.typenames) {
				url += 'typenames=' + csw_config.typenames + '&';
			}
			if (csw_config.constraint_language_version) {
				url += 'constraint_language_version=' + csw_config.constraint_language_version + '&';
			}
			// contraint
			if (csw_config.constraint) {
				var constraint = csw_config.constraint_type + "+LIKE+'" + encodeURIComponent('*'+csw_config.constraint+'*') + "'";
				url += 'constraint=' + constraint + '&';
			}
			url = url.substring(0, url.length-1);
		}
		if (AppDataSrv.config.app.proxy_server_url) {
            url = AppDataSrv.config.app.proxy_server_url + encodeURIComponent(url);
        }
		return url;
	}

	function getCswJson(add) {
        add = add || false;
        if (!AppDataSrv.pageLoaded || AppDataSrv.disableInfiniteScroll) {
            return;
        }
        AppDataSrv.pageLoaded = false;
        var url = getCswUrl(AppDataSrv.csw_list, AppDataSrv.config.csw);
		promise = $http.get(url)
			.then(function(response) {
				var xml = new cswjs.Xml(response.data);
                data = xml.toJson();
                if (add) {
                    data.md = AppDataSrv.csw_json.md.concat(data.md);
                }
                AppDataSrv.config.csw.startposition = data.next_record;
                AppDataSrv.csw_json = data;
                if (data.next_record >= data.nb_records_matched) {
					AppDataSrv.disableInfiniteScroll = true;
				}
				AppDataSrv.pageLoaded = true;
			})
			.catch(function(reason, data) {
                console.log(reason, data);
				console.log("Error in cswSrv.getCswJson service : can't get " + url + " JSON file (reason: " + reason + ").");
			});
		return promise;
	}

}
