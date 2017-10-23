(function(angular) {
    'use strict';

    var mdView = {
        bindings: {
            config: '<'
        },
        templateUrl: ['$state', 'MdViewService', 'AppService', function($state, MdViewService, AppService) {
            console.log($state.params.view, MdViewService.data.params.view, AppService.data.params.view);
            // var view = MdViewService.data.params.view || 'data';
            var view = $state.params.view || 'data';
            return MdViewService.data.views[view].path;
        }],
        controller: 'MdViewController'
    };

    function config($stateProvider) {
        $stateProvider
            .state('mdview', {
                parent: 'app',
                url: '/mdview?config&view&lang&csw&md&maxRecords&constraint&constraintType&header&footer&debug',
                params: {
                    config: {
                        value: 'none'
                    },
                    view: {
                        value: 'none',
                        squash: true
                    },
                    lang: {
                        value: 'none',
                        squash: true
                    },
                    csw: {
                        value: 'none',
                        squash: true
                    },
                    md: {
                        value: 'none',
                        squash: true
                    },
                    maxRecords: {
                        value: 'none',
                        squash: true
                    },
                    constraint: {
                        value: 'none',
                        squash: true
                    },
                    constraintType: {
                        value: 'none',
                        squash: true
                    },
                    header: {
                        value: 'none',
                        squash: true
                    },
                    footer: {
                        value: 'none',
                        squash: true
                    },
                    debug: {
                        value: 'none'
                    }
                },
                component: 'mdView'
            });
    }

    config.$inject = ['$stateProvider'];

    angular
        .module('components.mdView')
        .component('mdView', mdView)
        .config(config);
})(window.angular);
