(function(angular) {
    'use strict';

    function CswCatalogController($state, $location, CswCatalogService, HelperService, AppService) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.viewMd = onViewMd;
        ctrl.getMoreRecords = getMoreRecords;

        ////////////////////////////////////////////////

        function onInit() {

            // TODO: remplacer AppService.data.config.catalog par CswCatalogService.data.config ou directement ctrl.catalog ???

            // Get view
            AppService.data.params.view = AppService.getParamView('catalog');

            // Get csw
            AppService.data.params.csw = AppService.getParam('csw', AppService.data.config.catalog.csw_list[0].url);
            AppService.data.config.catalog.csw.url = AppService.data.params.csw;

            // Get maxrecords
            AppService.data.params.maxRecords = AppService.getParam('maxRecords', AppService.data.config.catalog.csw.maxrecords);
            AppService.data.config.catalog.csw.maxrecords = AppService.data.params.maxRecords;

            // Get constraint
            AppService.data.params.constraint = AppService.getParam('constraint', AppService.data.config.catalog.csw.constraint);
            AppService.data.config.catalog.csw.constraint = AppService.data.params.constraint;

            // Get constraintType
            AppService.data.params.constraintType = AppService.getParam('constraintType', AppService.data.config.catalog.csw.constraint_type);
            AppService.data.config.catalog.csw.constraint_type = AppService.data.params.constraintType;

            // get md
            // AppService.data.params.md = AppService.getParam('md', false);

            // console.log(AppService.data.config.catalog.views);
            // CswCatalogService.data.views = AppService.data.config.catalog.views;
            CswCatalogService.data.params = AppService.data.params;
            CswCatalogService.data.csw = AppService.data.config.catalog.csw;
            CswCatalogService.data.proxy = AppService.data.config.app.proxy;
            // FIXME: à mettre directement dans CswCatalogService
            CswCatalogService.onViewMd = viewMd;

            AppService.updateUrl();

            ctrl.catalog = CswCatalogService;
            if (CswCatalogService.data.reload) {
                CswCatalogService.loadCsw(CswCatalogService.data.csw);
            }
        }

        // FIXME: à mettre directement dans CswCatalogService
        function viewMd(md, view) {
            AppService.data.params.module = 'mdview';
            AppService.data.params.view = view;
            AppService.data.params.md = md;
            AppService.loadPage(AppService.data.params.module, AppService.data.params);
        }

        function getMoreRecords() {
            CswCatalogService.getRecords(CswCatalogService.data.csw);
        }

        function onViewMd(mdFileIdentifier, view) {
            CswCatalogService.onViewMd(mdFileIdentifier, view);
        }
    }

    CswCatalogController.$inject = ['$state', '$location', 'CswCatalogService', 'HelperService', 'AppService'];

    angular
        .module('components.cswCatalog')
        .controller('CswCatalogController', CswCatalogController);
})(window.angular);
