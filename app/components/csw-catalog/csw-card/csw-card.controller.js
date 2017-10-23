(function(angular) {
    'use strict';

    function CswCardController() {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.viewMd = viewMd;

        ////////////////////////////////////

        function onInit() {}


        function viewMd(mdFileIdentifier) {
            var keywords_views = {
                observatoire: 'obs',
                carte: 'map'
            };
            var view = 'data';
            for (var kw = 0; kw < ctrl.md.dataKeywords.length; kw++) {
                for (var v in keywords_views) {
                    if (ctrl.md.dataKeywords[kw].toLowerCase() == v.toLowerCase()) {
                        console.log(ctrl.md.dataKeywords[kw].toLowerCase(), v.toLowerCase());
                        view = keywords_views[v];
                    }
                }
            }
            ctrl.onClick({ mdFileIdentifier: mdFileIdentifier, view: view });
        }
    }

    angular
        .module('components.cswCard')
        .controller('CswCardController', CswCardController);
})(window.angular);