(function(angular) {
    'use strict';

    var cswCatalog = {
        bindings: {
            config: '<'
        },
        templateUrl: ['CswCatalogService', function(CswCatalogService) {
            var view = CswCatalogService.data.params.view || 'grid';
            return CswCatalogService.data.views[view].path;
        }],
        controller: 'CswCatalogController'
    };

    function config($stateProvider) {
        $stateProvider
            .state('catalog', {
                parent: 'app',
                url: '/catalog?config&view&lang&csw&maxRecords&constraint&constraintType&header&footer',
                params: {
                    view: {
                        value: 'none',
                        dynamic: true
                    },
                    lang: {
                        value: 'none',
                        dynamic: true
                    },
                    config: {
                        value: 'none',
                        dynamic: true
                    },
                    csw: {
                        value: 'none',
                        dynamic: true
                    },
                    maxRecords: {
                        value: 'none',
                        dynamic: true
                    },
                    constraint: {
                        value: '',
                        dynamic: true
                    },
                    constraintType: {
                        value: 'none',
                        dynamic: true
                    },
                    header: {
                        value: 'none',
                        dynamic: true
                    },
                    footer: {
                        value: 'none',
                        dynamic: true
                    }
                },
                component: 'cswCatalog'
            });
    }

    config.$inject = ['$stateProvider'];

    angular
        .module('components.cswCatalog')
        .component('cswCatalog', cswCatalog)
        .config(config);
})(window.angular);
