/**
 * [module description]
 * @param  {[type]} 'config' [description]
 * @param  {[type]} []       [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader.services')
    .factory('cswSrv', cswSrv);

cswSrv.$inject = ['$http', '$location', 'AppDataSrv', 'helperSrv'];

function cswSrv($http, $location, AppDataSrv, helperSrv) {

    var promise;
    var cswSrv = {
        getCswList: getCswList,
        getCapabilities: getCapabilities,
        getRecords: getRecords
    };

    return cswSrv;

    ////////////////////////////////////////////////////////////////////////

    function getCswList(url) {
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

    function _getUrl() {
        // Init result variable
        var url = false;
        // Get base CSW URL
        if (AppDataSrv.config.csw.url) {
            csw_url = AppDataSrv.config.csw.url;
        } else {
            csw_url = AppDataSrv.csw_list[0].url;
            AppDataSrv.config.csw.url = csw_url;
        }
        // Construct CSW base URL
        if (csw_url) {
            if (csw_url.indexOf('?') != -1) {
                if (csw_url.charAt(csw_url.length - 1) == '?') {
                    url = csw_url;
                } else {
                    url = csw_url + '&';
                }
            } else {
                url = csw_url + '?';
            }
        }
        return url;
    }

    function _getRecordsParams() {
        var params = '';

        // Construct CSW URL
        // Add parameters from csw_config to url
        if (AppDataSrv.config.csw.elementsetname) {
            params += 'elementsetname=' + AppDataSrv.config.csw.elementsetname + '&';
        }
        if (AppDataSrv.config.csw.maxrecords) {
            params += 'maxrecords=' + AppDataSrv.config.csw.maxrecords + '&';
        }
        if (AppDataSrv.config.csw.startposition) {
            params += 'startposition=' + AppDataSrv.config.csw.startposition + '&';
        }
        if (AppDataSrv.config.csw.version) {
            params += 'version=' + AppDataSrv.config.csw.version + '&';
        }
        if (AppDataSrv.config.csw.service) {
            params += 'service=' + AppDataSrv.config.csw.service + '&';
        }
        if (AppDataSrv.config.csw.request) {
            params += 'request=' + AppDataSrv.config.csw.request + '&';
        }
        if (AppDataSrv.config.csw.constraintlanguage) {
            params += 'constraintlanguage=' + AppDataSrv.config.csw.constraintlanguage + '&';
        }
        if (AppDataSrv.config.csw.postencoding) {
            params += 'postencoding=' + AppDataSrv.config.csw.postencoding + '&';
        }
        if (AppDataSrv.config.csw.resulttype) {
            params += 'resulttype=' + AppDataSrv.config.csw.resulttype + '&';
        }
        if (AppDataSrv.config.csw.outputschema) {
            params += 'outputschema=' + AppDataSrv.config.csw.outputschema + '&';
        }
        if (AppDataSrv.config.csw.typenames) {
            params += 'typenames=' + AppDataSrv.config.csw.typenames + '&';
        }
        if (AppDataSrv.config.csw.constraint_language_version) {
            params += 'constraint_language_version=' + AppDataSrv.config.csw.constraint_language_version + '&';
        }
        // contraint
        if (AppDataSrv.config.csw.constraint) {
            var constraint = AppDataSrv.config.csw.constraint_type + "+LIKE+'" + encodeURIComponent('*' + AppDataSrv.config.csw.constraint + '*') + "'";
            params += 'constraint=' + constraint + '&';
        }
        params = params.substring(0, params.length - 1);

        return params;
    }

    function getCapabilities(add, callback) {
        if (!add) {
            var params = 'REQUEST=GetCapabilities&SERVICE=CSW&VERSION=2.0.2';
            AppDataSrv.getcapabilities_url = _getUrl() + params;
            var getcapabilities_url = helperSrv.getProxyUrl(AppDataSrv.getcapabilities_url);
            // Get Capabilities of CSW and check
            promise = $http.get(getcapabilities_url)
                .then(function(response) {
                    var xml = new cswjs.getcapabilities.Xml(response.data);
                    data = xml.toJson();
                    console.log(data);
                    AppDataSrv.capabilities = data;
                    // console.log(AppDataSrv.constraintsValues);
                    if (data.operationNames.indexOf('GetRecords') !== -1) {
                        callback();
                    } else {
                        AppDataSrv.capabilities.error = "Error in cswSrv.getRecords service : 'getRecords' operation doesn't exist.";
                        console.log("Error in cswSrv.getRecords service : 'getRecords' operation doesn't exist.");
                    }
                    if (data.operationNames.indexOf('GetDomain') !== -1) {
                        _getDomain(['Subject', 'TopicCategory', 'OrganisationName']);
                    } else {
                        console.log("Error in cswSrv.getDomain service : 'getDomain' operation doesn't exist.");
                    }
                })
                .catch(function(reason, data) {
                    console.log(reason, data);
                    console.log("Error in cswSrv.getCapabilities service : can't get " + getcapabilities_url + " JSON file (reason: " + reason + ").");
                });
            return promise;
        } else {
            // Juste callback (call getRecords request)
            callback();
        }
    }

    function _getDomain(domains) {
        var params = "REQUEST=GetDomain&SERVICE=CSW&VERSION=2.0.2&PROPERTYNAME=";
        AppDataSrv.domains = {};
        angular.forEach(domains, function(domain) {
            var getdomain_url = helperSrv.getProxyUrl(_getUrl() + params + domain);
            $http.get(getdomain_url)
                .then(function(response) {
                    var xml = new cswjs.getdomain.Xml(response.data);
                    data = xml.toJson();
                    AppDataSrv.domains[data.propertyName] = data.values;
                })
                .catch(function(reason, data) {
                    console.log(reason, data);
                    console.log("Error in cswSrv.getCswJson service : can't get " + getdomain_url + " JSON file (reason: " + reason + ").");
                });
        });
        console.log(AppDataSrv.domains);
    }

    function getRecords(add) {
        add = add || false;
        if (!AppDataSrv.pageLoaded || AppDataSrv.disableInfiniteScroll) {
            return;
        }
        AppDataSrv.pageLoaded = false;
        var params = _getRecordsParams();
        AppDataSrv.getrecords_url = _getUrl() + params;
        var getrecords_url = helperSrv.getProxyUrl(AppDataSrv.getrecords_url);

        getCapabilities(add, function() {
            $http.get(getrecords_url)
                .then(function(response) {
                    var xml = new cswjs.getrecords.Xml(response.data);
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
                    console.log("Error in cswSrv.getCswJson service : can't get " + getrecords_url + " JSON file (reason: " + reason + ").");
                });
        });
    }

}
