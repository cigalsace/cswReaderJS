var templateUrl = './app/cswReader.directives/wfsDownload';
/**
 * [module description]
 * @param  {[type]} 'cswReader' [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader.directives')
    .value('templateUrl',
        /**
         * [function description]
         * @param  {[type]} element [description]
         * @param  {[type]} attrs   [description]
         * @return {[type]}         [description]
         */
        function(element, attrs) {
            var template = attrs.templateUrl;
            return template !== undefined ? templateUrl : templateUrl + '/wfsDownload.html';
        });

/**
 * [dataTitleDirective description]
 * @param  {[type]} mdwfsDownloadTemplateurl [description]
 * @return {[type]}                            [description]
 */
function wfsDownloadDirective($http, templateUrl, wfsSrv) {
    return {
        restrict: 'EA',
        templateUrl: templateUrl,
        replace: true,
        link: link,
        controller: 'cswReaderCtrl',
        scope: {
            linkage: '=',
        }
    };

    /**
     * [link description]
     * @param  {[type]} scope   [description]
     * @param  {[type]} element [description]
     * @param  {[type]} attrs   [description]
     * @return {[type]}         [description]
     */
    function link(scope, element, attrs) {
        // scope.linkage = attrs.linkage;
        // console.log(scope.linkage);
        if (scope.linkage.protocol && scope.linkage.protocol.toLowerCase().indexOf('wfs') !== -1) {
            scope.linkage.wfs_url = [];
            var formats = {
                'CSV': ['CSV'],
                'GML 2': ['GML2', 'text/xml; subtype=gml/2.1.2'],
                'GML 3.1': ['GML3', 'text/xml; subtype=gml/3.1.1'],
                'GML 3.2': ['GML32', 'text/xml; subtype=gml/3.2', 'application/gml+xml; version=3.2'],
                'KML': ['KML', 'application/vnd.google-earth.kml xml', 'application/vnd.google-earth.kml+xml'],
                'GeoJson': ['JSON', 'application/json'],
                'SHP': ['SHAPE-ZIP']
            };
            wfsSrv.getCapabilities(scope.linkage.url, function(data) {
                if (data.getFeatureOutputFormats.length) {
                    for (var format in formats) {
                        var formatExist = false;
                        for (var f=0; f<formats[format].length; f++) {
                            if (data.getFeatureOutputFormats.indexOf(formats[format][f]) > -1 && !formatExist) {
                                var url = scope.linkage.url.split('?')[0] + "?service=WFS&version=2.0.0&request=GetFeature&maxFeatures=50000" + "&typeName=" + scope.linkage.name + "&outputFormat=" + formats[format][f];
                                scope.linkage.wfs_url.push({
                                    format: format,
                                    url:  url
                                });
                                formatExist = true;
                            }
                        }
                    }
                }
            });
        }
    }
}

/**
 * [module description]
 * @param  {[type]} 'cswReader' [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader.directives')
    .directive('wfsDownload', wfsDownloadDirective);

wfsDownloadDirective.$inject = ['$http', 'templateUrl', 'wfsSrv'];
