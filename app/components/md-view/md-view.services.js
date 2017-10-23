function MdViewService($http, HelperService) {

    var promises = [];
    var MdViewService = {
        data: {
            views: {},
            params: {},
            view: 'data',
            reload: true,
            csw: {},
            loading: {
                value: 0
            }
        },
        getRecord: getRecord,
        toJson: toJson
    };

    return MdViewService;

    //////////////////////////////////////////////////

    function _getRecordParams(mdConfig) {
        // Construct CSW URL
        var url_params = [
            'request=GetRecordById',
            'service=CSW',
            'version=2.0.2',
            'elementsetname=full',
            'postencoding=XML',
            'resulttype=results',
            'outputschema=http://www.isotc211.org/2005/gmd',
            'typenames=gmd:MD_Metadata'
        ];
        // Metadata id
        if (mdConfig.id) {
            url_params.push('id=' + mdConfig.id);
        }
        // contraint
        if (mdConfig.constraint) {
            var constraint = mdConfig.constraint_type + "+LIKE+'" + encodeURIComponent('*' + mdConfig.constraint + '*') + "'";
            url_params.push('constraint=' + constraint);
        }
        return url_params.join('&');
    }

    function getRecord(mdConfig, proxy) {
        pageLoaded = false;
        var params = _getRecordParams(mdConfig);
        var getRecordsUrl = HelperService.getBaseUrl(mdConfig.url) + '?' + params;
        var url = HelperService.getProxyUrl(getRecordsUrl, proxy);
        return $http.get(url)
            .then(function(response) {
                jQuery.noConflict();
                xml = jQuery.parseXML(response.data);
                var metadata = new mdjs.Metadata();
                metadata.setXml(xml);
                var md = metadata.toJson();
                return md;
            })
            .catch(function(reason, data) {
                console.log(reason, data);
                console.log("Error in cswSrv.getCswJson service : can't get " + getRecordsUrl + " JSON file (reason: " + reason + ").");
            });
    }

    function toJson(xml_str) {
        jQuery.noConflict();
        xml = jQuery.parseXML(xml_str);
        var metadata = new mdjs.Metadata();
        metadata.setXml(xml);
        var md = metadata.toJson();
        AppDataSrv.metadata = jsonConverterSrv.mdjsToForm(md);
    }

}

MdViewService.$inject = ['$http', 'HelperService'];

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
    .module('components.mdView')
    .factory('MdViewService', MdViewService);