(function(angular) {
    'use strict';

    function HtmlPageController($state, HtmlPageService, AppService) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.goToUrl = goToUrl;

        ////////////////////////////////////

        function onInit() {
            ctrl.csw_list = AppService.data.config.catalog.csw_list;
        }

        function goToUrl(state, params) {
            for (var p in params) {
                AppService.data.params[p] = params[p];
            }
            // AppService.data.params = params;
            AppService.data.params.module = state;
            console.log(AppService.data.params.module, AppService.data.params);
            AppService.loadPage(AppService.data.params.module, AppService.data.params);
        }

    }

    HtmlPageController.$inject = ['$state', 'HtmlPageService', 'AppService'];

    angular
        .module('components.htmlPage')
        .controller('HtmlPageController', HtmlPageController);
})(window.angular);
