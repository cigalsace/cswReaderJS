function CswCatalogService($http, HelperService) {

    var promises = [];
    var CswCatalogService = {
        data: {
            views: {},
            params: {},
            view: 'grid',
            reload: true,
            disableInfiniteScroll: false,
            csw: {},
            loading: {
                value: 0
            }
        },
        getCapabilities: getCapabilities,
        getDomain: getDomain,
        getRecords: getRecords,
        loadCsw: loadCsw
    };

    return CswCatalogService;

    //////////////////////////////////////////////////

    function _getCapabilities(cswUrl) {
        var getCapabilitiesUrl = HelperService.getBaseUrl(cswUrl) + '?REQUEST=GetCapabilities&SERVICE=CSW&VERSION=2.0.2';
        var url = HelperService.getProxyUrl(getCapabilitiesUrl, CswCatalogService.data.proxy);
        return $http.get(url)
            .then(function(response) {
                var xml = new cswjs.getcapabilities.Xml(response.data);
                data = xml.toJson();
                data.getRecords = false;
                if (data.operationNames.indexOf('GetRecords') !== -1) {
                    data.getRecords = true;
                }
                data.getDomain = false;
                if (data.operationNames.indexOf('GetDomain') !== -1) {
                    data.getDomain = true;
                }
                data.url = getCapabilitiesUrl;
                return data;
            })
            .catch(function(reason, data) {
                console.log("CswCatalogService.getCapabilities: can't get " + url + " URL.");
            });
    }

    function _getDomain(domain, cswUrl) {
        var getDomainUrl = HelperService.getBaseUrl(cswUrl) + '?REQUEST=GetDomain&SERVICE=CSW&VERSION=2.0.2&PROPERTYNAME=' + domain;
        var url = HelperService.getProxyUrl(getDomainUrl, CswCatalogService.data.proxy);
        return $http.get(url)
            .then(function(response) {
                var xml = new cswjs.getdomain.Xml(response.data);
                data = xml.toJson();
                return data;
            })
            .catch(function(reason, data) {
                console.log("CswCatalogService.getDomain: can't get " + getdomain_url + " URL.");
            });
    }

    function _getRecordsParams(cswConfig) {
        var url_params = [
            'elementsetname=full',
            'version=2.0.2',
            'service=CSW',
            'request=GetRecords',
            'constraintlanguage=CQL_TEXT',
            'postencoding=XML',
            'resulttype=results',
            'outputschema=http://www.isotc211.org/2005/gmd',
            'typenames=gmd:MD_Metadata',
            'constraint_language_version=1.0.0'
        ];
        var params = ['maxrecords', 'startposition'];
        // Construct CSW URL
        // Add parameters from cswConfig to url
        for (var p = 0; p < params.length; p++) {
            if (cswConfig[params[p]]) {
                url_params.push(params[p] + '=' + cswConfig[params[p]]);
            }
        }
        // contraint
        if (cswConfig.constraint) {
            var constraint = cswConfig.constraint_type + "+LIKE+'" + encodeURIComponent('*' + cswConfig.constraint + '*') + "'";
            url_params.push('constraint=' + constraint);
        }
        return url_params.join('&');
    }

    function _getRecords(cswConfig) {
        var params = _getRecordsParams(cswConfig);
        var getRecordsUrl = HelperService.getBaseUrl(cswConfig.url) + '?' + params;
        var url = HelperService.getProxyUrl(getRecordsUrl, CswCatalogService.data.proxy);
        console.log(url);
        return $http.get(url)
            .then(function(response) {
                var xml = new cswjs.getrecords.Xml(response.data);
                data = xml.toJson();
                data.getRecordsUrl = getRecordsUrl;
                return data;
            })
            .catch(function(reason, data) {
                console.log("CswCatalogService.getRecords: can't get " + getRecordsUrl + " URL.");
            });
    }

    function getCapabilities(cswUrl) {
        CswCatalogService.data.loading.value += 1;
        _getCapabilities(cswUrl).then(function(data) {
            CswCatalogService.data.csw.capabilities = data;
            console.log('getCapabilities', data);
            CswCatalogService.data.loading.value -= 1;
            console.log(CswCatalogService.data.loading.value);
        }, function() {
            CswCatalogService.data.loading.value -= 1;
            console.log('GetCapabilities error.');
        });
    }

    function getDomain(cswUrl, domain) {
        if (domain) {
            CswCatalogService.data.loading.value += 1;
            _getDomain(domain, cswUrl).then(function(data) {
                CswCatalogService.data.csw.domains[data.propertyName] = data.values;
                CswCatalogService.data.loading.value -= 1;
                console.log(CswCatalogService.data.loading.value);
            }, function() {
                CswCatalogService.data.loading.value -= 1;
                console.log('GetDomain error.');
            });
        }
    }

    function getRecords(csw) {
        CswCatalogService.data.loading.value += 1;
        console.log(CswCatalogService.data.loading.value);
        if (!CswCatalogService.data.csw.hasOwnProperty('records')) {
            CswCatalogService.data.csw.records = [];
        }
        _getRecords(csw)
            .then(function(data) {
                if (data) {
                    CswCatalogService.data.csw.records = CswCatalogService.data.csw.records.concat(data.md);
                    CswCatalogService.data.csw.getRecordsUrl = data.getRecordsUrl;
                    CswCatalogService.data.csw.startposition = data.next_record;
                    CswCatalogService.data.csw.nb_records_visible = data.nb_records_visible;
                    CswCatalogService.data.csw.nb_records_matched = data.nb_records_matched;
                    if (data.next_record >= data.nb_records_matched) {
                        CswCatalogService.data.disableInfiniteScroll = true;
                    }
                } else {
                    console.log('GetRecords return empty value. Check the CSW URL.');
                }
                CswCatalogService.data.loading.value -= 1;
                console.log(CswCatalogService.data.loading.value);
            }, function() {
                CswCatalogService.data.loading.value -= 1;
                console.log('GetRecords error.');
            });
    }

    function loadCsw(csw) {
        CswCatalogService.data.loading.value = 0;
        CswCatalogService.data.disableInfiniteScroll = false;
        // Get csw capabilities
        getCapabilities(csw.url);
        // Get csw domains
        CswCatalogService.data.csw.domains = {};
        var domains = ['Subject', 'TopicCategory', 'OrganisationName'];
        for (var d = 0; d < domains.length; d++) {
            getDomain(csw.url, domains[d]);
        }
        // GetRecords
        CswCatalogService.data.csw.records = [];
        CswCatalogService.data.csw.startposition = 0;
        getRecords(csw);
    }

}

CswCatalogService.$inject = ['$http', 'HelperService'];

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
    .module('components.cswCatalog')
    .factory('CswCatalogService', CswCatalogService);