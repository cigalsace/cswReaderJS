(function(angular) {
    'use strict';
    var cswSearch = {
        bindings: {
            constraintsCapabilitiesValues: '<',
            constraintsValues: '<',
            placeholderSearch: '<',
            constraintType: '<',
            constraint: '<',
            onSearch: '&'
        },
        templateUrl: './app/components/csw-catalog/csw-search/csw-search.html',
        controller: 'CswSearchController'
    };

    angular
        .module('components.cswSearch')
        .component('cswSearch', cswSearch);
})(window.angular);