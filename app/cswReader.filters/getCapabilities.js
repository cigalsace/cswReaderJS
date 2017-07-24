// Filter getCapabilities (string to array)
angular.module('cswReader.filters')
    .filter('getCapabilities', getCapabilities);

// getCapabilities.$inject = [];

function getCapabilities() {
    return function(linkage, protocol, version) {
        protocols = ['wfs', 'wms', 'csw'];
        versions = ['2.0.0', '1.3.0', '2.0.2'];
        if (!protocol) {
            for (var i=0; i<protocols.length; i++) {
                if (linkage.protocol.toLowerCase().indexOf(protocols[i]) !== -1) {
                    protocol = protocols[i];
                    _version = versions[i];
                }
            }
        }
        version = version || _version;
        return linkage.url.split('?')[0] + "?SERVICE=" + protocol + "&REQUEST=GetCapabilities&VERSION=" + version;
    };
}
