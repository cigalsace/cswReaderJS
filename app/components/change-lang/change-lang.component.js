(function(angular) {
    'use strict';

    /**
     * Utilisation: <change-lang lang="$ctrl.config.app.lang" tooltip="$ctrl.config.locale.app.ui.tooltip_changelang" locales="$ctrl.config.locales.app" on-change="$ctrl.onChangeLang(lang)">
     */

    var changeLang = {
        bindings: {
            tooltip: '<',
            lang: '<',
            locales: '<',
            onChange: '&'
        },
        templateUrl: './app/components/change-lang/change-lang.html',
        controller: 'ChangeLangController'
    };

    angular
        .module('components.changeLang')
        .component('changeLang', changeLang);
})(window.angular);