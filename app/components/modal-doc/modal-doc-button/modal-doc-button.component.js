(function(angular) {
    'use strict';

    var templates = {
        'button': './app/components/modal-doc/modal-doc-button/modal-doc-button.html',
        'text': './app/components/modal-doc/modal-doc-button/modal-doc-text.html'
    };

    var modalDocButton = {
        bindings: {
            format: '@',
            text: '@',
            title: '@',
            contentUrl: '<'
        },
        templateUrl: ['$attrs', function($attrs) {
            var format = $attrs.format || 'text';
            return templates[format];
        }],
        controller: 'ModalDocButtonController'
    };

    angular
        .module('components.modalDoc')
        .component('modalDocButton', modalDocButton);
})(window.angular);