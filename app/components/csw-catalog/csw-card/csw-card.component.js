(function(angular) {
    'use strict';

    var cswCard = {
        bindings: {
            view: '@',
            md: '<',
            lang: '<',
            onClick: '&'
        },
        templateUrl: ['$attrs', 'CswCatalogService', function($attrs, CswCatalogService) {
            var view = 'grid';
            if ($attrs.view) {
                view = $attrs.view;
            } else if (CswCatalogService.data.params.view) {
                view = CswCatalogService.data.params.view;
            }
            return CswCatalogService.data.views[view].card_path;
        }],
        controller: 'CswCardController'
    };

    angular
        .module('components.cswCard')
        .component('cswCard', cswCard);
})(window.angular);
