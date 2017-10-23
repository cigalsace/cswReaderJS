(function(angular) {
    'use strict';
    var changeCsw = {
        bindings: {
            button: '<',
            placeholder: '<',
            cswList: '<',
            cswUrl: '<',
            onChange: '&'
        },
        templateUrl: './app/components/csw-catalog/change-csw/change-csw.html',
        controller: 'ChangeCswController'
    };

    angular
        .module('components.changeCsw')
        .component('changeCsw', changeCsw);
})(window.angular);