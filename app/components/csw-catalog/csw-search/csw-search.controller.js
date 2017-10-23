(function(angular) {
    'use strict';

    function CswSearchController(CswCatalogService) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.onCswSearch = onCswSearch;
        ctrl.clearSearch = clearSearch;

        ////////////////////////////////////

        function onInit() {}

        function onCswSearch(data) {
            data = data || {};
            ctrl.constraintType = data.constraint_type || ctrl.constraintType;
            ctrl.constraint = data.constraint_search || ctrl.constraint;
            data = { constraint_type: ctrl.constraintType, constraint_search: ctrl.constraint };
            CswCatalogService.data.csw.records = [];
            CswCatalogService.data.csw.startposition = 0;
            CswCatalogService.data.csw.constraint = ctrl.constraint;
            CswCatalogService.data.params.constraint = ctrl.constraint;
            CswCatalogService.data.csw.constraint_type = ctrl.constraintType;
            CswCatalogService.data.params.constraintType = ctrl.constraintType;
            CswCatalogService.getRecords(CswCatalogService.data.csw);
            ctrl.onSearch(data);
        }

        // TODO: voir pour réutiliser reloadPage() pour clearSearch
        function clearSearch() {
            ctrl.constraintType = 'AnyText';
            ctrl.constraint = '';
            var data = { constraint_type: ctrl.constraintType, constraint_search: ctrl.constraint };
            onCswSearch(data);
        }
    }

    CswSearchController.$inject = ['CswCatalogService'];

    angular
        .module('components.cswSearch')
        .controller('CswSearchController', CswSearchController);
})(window.angular);