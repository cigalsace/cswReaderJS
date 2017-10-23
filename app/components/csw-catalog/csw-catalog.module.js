(function(angular) {
    'use strict';

    /**
     *
     * @ngdoc module
     * @name components.cswCatalog
     *
     * @description
     *
     * This is the cswCatalog module. It includes all of our components for the cswCatalog feature.
     *
     **/
    angular
        .module('components.cswCatalog', ['infinite-scroll', 'components.changeCsw', 'components.cswSearch', 'components.cswCard']);
})(window.angular);