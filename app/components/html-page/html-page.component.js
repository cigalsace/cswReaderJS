(function(angular) {
    'use strict';

    var htmlPage = {
        bindings: {
            contentUrl: '<'
        },
        templateUrl: ['AppService', 'HtmlPageService', function(AppService, HtmlPageService) {
            // FIXME: voir les améliorations possibles
            AppService.data.params.home = AppService.getParam('page', AppService.data.config.app.home);
            AppService.updateUrl();
            HtmlPageService.data.url = HtmlPageService.data.pages[AppService.data.params.home];
            var contentUrl = HtmlPageService.data.url;
            return contentUrl;
        }],
        controller: 'HtmlPageController'
    };

    function config($stateProvider) {
        $stateProvider
            .state('page', {
                parent: 'app',
                url: '/page?config&lang&header&footer&page',
                params: {
                    config: {
                        value: 'none'
                    },
                    lang: {
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
                    page: {
                        value: 'none',
                        squash: true
                    }
                },
                component: 'htmlPage'
            });
    }

    config.$inject = ['$stateProvider'];

    angular
        .module('components.htmlPage')
        .component('htmlPage', htmlPage)
        .config(config);
})(window.angular);