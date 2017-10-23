(function(angular) {
    'use strict';

    function MdViewController($state, MdViewService, AppService) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.goBack = goBack;

        ////////////

        function onInit() {
            // Get view
            AppService.data.params.view = AppService.getParamView('mdview');

            // Get csw
            AppService.data.params.csw = AppService.getParam('csw', AppService.data.config.catalog.csw_list[0].url);
            AppService.data.config.catalog.csw.url = AppService.data.params.csw;
            AppService.data.config.mdview.csw.url = AppService.data.params.csw;

            // Get maxrecords
            // FIXME: utile pour mdview?
            AppService.data.params.maxRecords = AppService.getParam('maxRecords', AppService.data.config.catalog.csw.maxrecords);
            AppService.data.config.catalog.csw.maxrecords = AppService.data.params.maxRecords;

            // Get constraint
            // FIXME: utile pour mdview?
            AppService.data.params.constraint = AppService.getParam('constraint', AppService.data.config.catalog.csw.constraint);
            AppService.data.config.catalog.csw.constraint = AppService.data.params.constraint;

            // Get constraintType
            // FIXME: utile pour mdview?
            AppService.data.params.constraintType = AppService.getParam('constraintType', AppService.data.config.catalog.csw.constraint_type);
            AppService.data.config.catalog.csw.constraint_type = AppService.data.params.constraintType;

            // get md
            AppService.data.params.md = AppService.getParam('md', false);

            // MdViewService.data.views = AppService.data.config.mdview.views;
            MdViewService.data.params = AppService.data.params;
            MdViewService.data.csw = AppService.data.config.mdview.csw;
            MdViewService.data.proxy = AppService.data.config.app.proxy;
            // FIXME: à mettre directement dans MdViewService
            MdViewService.goBack = goToModule;

            MdViewService.data.csw.id = MdViewService.data.params.md;

            MdViewService.data.loading.value += 1;
            MdViewService.getRecord(MdViewService.data.csw, MdViewService.data.proxy)
                .then(function(data) {
                    var view = 'data';
                    for (var kw = 0; kw < data.dataKeywords.length; kw++) {
                        var keywords = data.dataKeywords[kw].keywords.join(', ');
                        for (var v in AppService.data.config.mdview.views) {
                            for (var k in AppService.data.config.mdview.views[v].keywords) {
                                if (keywords.toLowerCase().indexOf(AppService.data.config.mdview.views[v].keywords[k]) !== -1) {
                                    view = v;
                                }
                            }
                        }
                        if (view == 'obs') {
                            var obs = new obsjs.Abstract();
                            data.obs = obs.parseAbstract(data.dataAbstract);
                        }
                    }
                    ctrl.md = data;
                    console.log(ctrl.md);
                    // FIXME: 2 lignes utiles? doublon?
                    $state.params.view = view;
                    AppService.data.params.view = view;
                    MdViewService.data.params.view = view;
                    MdViewService.data.loading.value -= 1;
                    console.log(MdViewService.data.loading.value);
                }, function() {
                    MdViewService.data.loading.value -= 1;
                    console.log('GetRecord error.');
                });

            AppService.updateUrl();

            ctrl.locale = MdViewService.data.locale;
            ctrl.app = {
                name: AppService.data.config.app.name,
                version: AppService.data.config.app.version,
                copyrights: AppService.data.config.app.copyrights
            };

        }

        // FIXME: à mettre directement dans MdViewService
        function goToModule(module) {
            module = module || 'catalog';
            AppService.data.params.module = module;
            AppService.data.params.view = Object.keys(AppService.data.config[module].views)[0];
            AppService.loadPage(AppService.data.params.module, AppService.data.params);
        }

        function goBack() {
            MdViewService.goBack('catalog');
        }
    }

    MdViewController.$inject = ['$state', 'MdViewService', 'AppService'];
    angular
        .module('components.mdView')
        .controller('MdViewController', MdViewController);
})(window.angular);
