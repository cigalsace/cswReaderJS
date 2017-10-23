(function(angular) {
    'use strict';

    var appFooter = {
        bindings: {
            config: '<'
        },
        templateUrl: './app/core/app-footer/app-footer.html',
        controller: 'AppFooterController'
    };

    angular
        .module('core')
        .component('appFooter', appFooter);
})(window.angular);