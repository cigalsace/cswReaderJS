(function(angular) {
    'use strict';

    function ChangeCswController(CswCatalogService) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.changeCsw = changeCsw;

        ////////////////////////////////////

        function onInit() {}

        function changeCsw(cswUrl) {
            ctrl.cswUrl = cswUrl;
            CswCatalogService.data.csw.url = cswUrl;
            CswCatalogService.loadCsw(CswCatalogService.data.csw);
            ctrl.onChange({ cswUrl: cswUrl });
        }
    }

    ChangeCswController.$inject = ['CswCatalogService'];

    angular
        .module('components.changeCsw')
        .controller('ChangeCswController', ChangeCswController);
})(window.angular);