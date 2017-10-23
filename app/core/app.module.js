(function(angular) {
    'use strict';

    function Run($state, HelperService, AppService, CswCatalogService, MdViewService) {
        console.log('App start');

        var configFile = 'config/config.json';
        if ([undefined, 'none'].indexOf($state.params.config) === -1) {
            configFile = $state.params.config;
        }
        HelperService.getJsonFile(configFile, 'config').then(function(data) {

            AppService.data.config = data;
            // console.log(AppService.data.params);
            AppService.data.params = {};
            AppService.data.params.config = AppService.data.config.file;

            // Get lang param
            AppService.data.params.lang = AppService.getParamLang(AppService.data.config.app.lang);

            // Get debug
            AppService.data.params.debug = AppService.getParam('debug', 0);
            // AppService.data.config.catalog.csw.url = AppService.data.params.csw;

            // Manage loading value for progressbar
            AppService.data.config.catalog.loading = CswCatalogService.data.loading;

            // Link CswCatalogService and AppService
            CswCatalogService.data.views = AppService.data.config.catalog.views;
            // CswCatalogService.data.params = AppService.data.params;
            // CswCatalogService.data.csw = AppService.data.config.catalog.csw;
            // CswCatalogService.data.proxy = AppService.data.config.app.proxy;
            // Link MdViewService and AppService
            MdViewService.data.views = AppService.data.config.mdview.views;
            // MdViewService.data.params = AppService.data.params;
            // MdViewService.data.csw = AppService.data.config.mdview.csw;
            // MdViewService.data.proxy = AppService.data.config.app.proxy;
            console.log(CswCatalogService.data.views);

            // Get locales
            AppService.getLocale(AppService.data.params.lang).then(function(data) {
                // console.log(777777777, data, AppService.data.locale);
                // Load module page
                console.log('Load module', AppService.data.params.module);
            });
        });


    }

    Run.$inject = ['$state', 'HelperService', 'AppService', 'CswCatalogService', 'MdViewService'];

    /**
     *
     * @ngdoc module
     * @name core
     *
     * @description
     *
     * This is the core module. It includes all of our components for the app feature.
     *
     **/
    angular
        .module('core', [
            'ui.router',
            'ui.bootstrap',
            'filters.module'
        ])
        .run(Run);
})(window.angular);
