(function(angular) {
    'use strict';

    var app = {
        bindings: {
            'config': '<'
        },
        templateUrl: './app/core/app.html',
        controller: 'AppController'
    };

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                redirectTo: 'catalog',
                params: {
                    config: {
                        value: 'none'
                    },
                    lang: {
                        value: 'none'
                    },
                    debug: {
                        value: 'none'
                    }
                },
                component: 'app'
            });
        $urlRouterProvider.otherwise('/app');
    }
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    angular
        .module('core')
        .component('app', app)
        .config(config);

})(window.angular);