(function(angular) {
    'use strict';

    function AppFooterController($q, HelperService, AppService, HtmlPageService, MdViewService, CswCatalogService) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.changeLocale = getLocale;

        ////////////

        function onInit() {
            // ctrl.module = AppService.data.params.module;
            ctrl.loading = AppService.data.config.catalog.loading;
            ctrl.config = AppService.data.config;
            ctrl.params = AppService.data.params;
            ctrl.locale = AppService.data.locale;
            // ctrl.config.locale = {};
            // getLocale(ctrl.config.params.lang);
        }

        function getLocale(lang) {
            console.log(lang);
            AppService.data.params.lang = lang;
            // AppService.getLocale(lang);
            // ctrl.config.params.lang = lang;
            // var promisesUrl = [
            //     HelperService.getJsonFile(ctrl.config.app.locales[lang].pages),
            //     HelperService.getJsonFile(ctrl.config.app.locales[lang].locale),
            //     HelperService.getJsonFile(ctrl.config.catalog.locales[lang]),
            //     HelperService.getJsonFile(ctrl.config.mdview.locales[lang])
            // ];
            // $q.all(promisesUrl).then(function (data) {
            //     ctrl.config.locale.pages = data[0];
            //     HtmlPageService.data.url = ctrl.config.locale.pages[ctrl.config.params.page];
            //     ctrl.config.locale.app = data[1];
            //     ctrl.config.locale.catalog = data[2];
            //     CswCatalogService.data.locale = data[2];
            //     ctrl.config.locale.mdview = data[3];
            //     MdViewService.data.locale = data[3];
            // });


            //     AppService.getLocale(lang);
            //     // Get pages
            //     HelperService.getJsonFile(ctrl.config.app.locales[lang].pages).then(function(data) {
            //     });
            //     // Get app locales
            //     HelperService.getJsonFile(ctrl.config.app.locales[lang].locale).then(function(data) {
            //     });
            //     // Get catalog locales
            //     HelperService.getJsonFile(ctrl.config.catalog.locales[lang]).then(function(data) {
            //     });
            //     // Get mdview locales
            //     HelperService.getJsonFile(ctrl.config.mdview.locales[lang]).then(function(data) {
            //     });
            //     console.log(ctrl.config.locale);
            AppService.getLocale(AppService.data.params.lang, function() {
                console.log(AppService.data.params.module, AppService.data.params);
                AppService.loadPage(AppService.data.params.module, AppService.data.params, { reload: true });
            });
        }
    }

    AppFooterController.$inject = ['$q', 'HelperService', 'AppService', 'HtmlPageService', 'MdViewService', 'CswCatalogService'];

    angular
        .module('core')
        .controller('AppFooterController', AppFooterController);
})(window.angular);