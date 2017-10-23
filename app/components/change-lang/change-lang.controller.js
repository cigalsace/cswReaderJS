(function(angular) {
    'use strict';

    function ChangeLangController($scope) {
        var ctrl = this;
        ctrl.$onInit = onInit;

        ///////////////////////////////////////

        function onInit() {
            if (!Array.isArray(ctrl.locales)) {
                ctrl.locales = Object.keys(ctrl.locales);
            }
            if (typeof ctrl.locales === 'string') {
                ctrl.locales = ctrl.locales.split(',');
            }
        }

        ctrl.changeLocale = function(lang) {
            ctrl.lang = lang;
            ctrl.onChange({ lang: lang });
        };
    }

    ChangeLangController.$inject = ['$scope'];

    angular
        .module('components.changeLang')
        .controller('ChangeLangController', ChangeLangController);
})(window.angular);