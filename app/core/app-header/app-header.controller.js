(function(angular) {
    'use strict';

    function AppHeaderController($state, AppService, CswCatalogService, MdViewService) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.onChangeCswView = onChangeCswView;
        ctrl.onChangeMdView = onChangeMdView;
        ctrl.onChangeCsw = onChangeCsw;
        ctrl.onCswSearch = onCswSearch;

        ////////////////////////////////////

        function _getViewsList(module) {
            var views = [];
            for (var k in ctrl.config[module].views) {
                var view = {
                    name: k,
                    icon: ctrl.config[module].views[k].icon
                };
                views.push(view);
            }
            return views;
        }

        function onInit() {
            // ctrl.module = AppService.data.params.module;
            ctrl.config = AppService.data.config;
            ctrl.params = AppService.data.params;
            ctrl.locale = AppService.data.locale;
            ctrl.cswViews = _getViewsList('catalog');
            ctrl.mdViews = _getViewsList('mdview');
        }

        function onChangeCswView(view) {
            ctrl.params.view = view;
            CswCatalogService.data.params.view = view;
            CswCatalogService.data.reload = false;
            AppService.loadPage(ctrl.params.module, ctrl.params, { reload: true });
        }

        function onChangeMdView(view) {
            console.log(ctrl.params.module, view);
            ctrl.params.view = view;
            MdViewService.data.params.view = view;
            MdViewService.data.reload = false;
            AppService.loadPage(ctrl.params.module, ctrl.params, { reload: true });
        }

        function onChangeCsw(cswUrl) {
            ctrl.params.csw = cswUrl;
            MdViewService.data.csw.url = cswUrl;
            AppService.loadPage(ctrl.params.module, ctrl.params);
        }

        function onCswSearch(constraintType, constraint) {
            ctrl.params.constraint = constraint;
            ctrl.params.constraintType = constraintType;
            AppService.loadPage(ctrl.params.module, ctrl.params);
        }
    }

    AppHeaderController.$inject = ['$state', 'AppService', 'CswCatalogService', 'MdViewService'];

    angular
        .module('core')
        .controller('AppHeaderController', AppHeaderController);
})(window.angular);
