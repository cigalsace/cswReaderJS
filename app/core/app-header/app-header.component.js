(function(angular) {
    'use strict';

    var appHeader = {
        bindings: {
            config: '<'
        },
        templateUrl: './app/core/app-header/app-header.html',
        controller: 'AppHeaderController'
    };

    angular
        .module('core')
        .component('appHeader', appHeader);
})(window.angular);