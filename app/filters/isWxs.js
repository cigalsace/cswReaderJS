// Filter isWxs (string to array)
angular.module('filters.module')
    .filter('isWxs', isWxs);

// isWxs.$inject = [];

function isWxs() {
    return function(linkage, protocol) {
        if (linkage.protocol) {
            protocols = ['wfs', 'wms'];
            if (protocol) {
                return linkage.protocol.toLowerCase().indexOf(protocol) !== -1;
            } else {
                protocol = false;
                for (var i = 0; i < protocols.length; i++) {
                    if (linkage.protocol.toLowerCase().indexOf(protocols[i]) !== -1) {
                        protocol = true;
                    }
                }
                return protocol;
            }
        }
        return false;
    };
}