(function(angular) {
    'use strict';

    var modules = ['page', 'catalog', 'mdview'];

    function AppController($window, $state, $q, AppService, CswCatalogService, MdViewService) {
        var ctrl = this;
        ctrl.$onInit = onInit;

        ////////////////////////////////////

        function onInit() {
            console.log('Run AppController');

            // Get debug param
            AppService.data.params.debug = AppService.getParam('debug', false);
            // Get header param
            AppService.data.params.header = AppService.getParam('header', AppService.data.config.app.header);
            // Get footer param
            AppService.data.params.footer = AppService.getParam('footer', AppService.data.config.app.footer);
            // Get module
            var modules = ['page', 'catalog', 'mdview'];
            AppService.data.params.module = AppService.getParamModule(AppService.data.config.app.module, modules);

            console.log(AppService.data);

            // CswCatalogService.onViewMd = viewMd;
            // MdViewService.goBack = goToModule;


            // // var params = {};
            // AppService.data.config = ctrl.config;
            // // console.log(AppService.data.params);
            // AppService.data.params = {};
            // AppService.data.params.config = AppService.data.config.file;

            // // Get debug param
            // AppService.data.params.debug = AppService.getParam('debug', false);

            // // Get header param
            // AppService.data.params.header = AppService.getParam('header', AppService.data.config.app.header);
            // // Get footer param

            // AppService.data.params.footer = AppService.getParam('footer', AppService.data.config.app.footer);

            // // Get lang param
            // AppService.data.params.lang = AppService.getParamLang(AppService.data.config.app.lang);

            // // Get page param
            // AppService.data.params.footer = AppService.getParam('page', AppService.data.config.app.home);

            // // Get module
            // AppService.data.config.module = AppService.getParam('module', AppService.data.config.app.module);

            // // Get views
            // AppService.data.params.view = AppService.getParamView(AppService.data.config.module, ['catalog', 'mdview'], '');

            // // Get csw
            // AppService.data.params.csw = AppService.getParam('csw', AppService.data.config.catalog.csw_list[0].url);
            // AppService.data.config.catalog.csw.url = AppService.data.params.csw;
            // AppService.data.config.mdview.csw.url = AppService.data.params.csw;

            // // Get maxrecords
            // AppService.data.params.maxrecords = AppService.getParam('maxrecords', AppService.data.config.catalog.csw.maxrecords);
            // AppService.data.config.catalog.csw.maxrecords = AppService.data.params.maxRecords;

            // // Get constraint
            // AppService.data.params.constraint = AppService.getParam('constraint', AppService.data.config.catalog.csw.constraint);
            // AppService.data.config.catalog.csw.constraint = AppService.data.params.constraint;

            // // Get constraintType
            // AppService.data.params.constraintType = AppService.getParam('constraintType', AppService.data.config.catalog.csw.constraint_type);
            // AppService.data.config.catalog.csw.constraint_type = AppService.data.params.constraintType;

            // // get md
            // AppService.data.params.md = AppService.getParam('md', false);

            // // console.log(AppService.data.config.catalog.views);
            // CswCatalogService.data.views = AppService.data.config.catalog.views;
            // CswCatalogService.data.params = AppService.data.params;
            // CswCatalogService.data.csw = AppService.data.config.catalog.csw;
            // CswCatalogService.data.proxy = AppService.data.config.app.proxy;
            // CswCatalogService.onViewMd = viewMd;

            // MdViewService.data.views = AppService.data.config.mdview.views;
            // MdViewService.data.params = AppService.data.params;
            // MdViewService.data.csw = AppService.data.config.mdview.csw;
            // MdViewService.data.proxy = AppService.data.config.app.proxy;
            // MdViewService.goBack = goToModule;

            // // Manage loading value for progressbar
            // AppService.data.config.catalog.loading = CswCatalogService.data.loading;

            // // Get locales
            // AppService.getLocale(AppService.data.params.lang).then(function(data) {
            //     console.log(777777777, data, AppService.data.locale);
            //     // Load module page
            //     console.log('Load module', AppService.data.config.module);
            // });
            AppService.loadPage(AppService.data.params.module, AppService.data.params);
        }

    }

    AppController.$inject = ['$window', '$state', '$q', 'AppService', 'CswCatalogService', 'MdViewService'];

    angular
        .module('core')
        .controller('AppController', AppController);
})(window.angular);
