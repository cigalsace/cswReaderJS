(function(angular) {
    'use strict';
    var modalDocDialog = {
        bindings: {
            resolve: '<',
            close: '&'
        },
        templateUrl: './app/components/modal-doc/modal-doc-dialog/modal-doc-dialog.html',
        controller: 'ModalDocDialogController'
    };

    angular
        .module('components.modalDoc')
        .component('modalDocDialog', modalDocDialog);
})(window.angular);