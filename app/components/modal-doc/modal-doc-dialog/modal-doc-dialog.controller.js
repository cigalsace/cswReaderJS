(function(angular) {
    'use strict';

    function ModalDocDialogController(ModalDocDialogServices) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.close = close;
        ctrl.dismiss = dismiss;

        ////////////////////////////////////

        function onInit() {
            ctrl.contentUrl = ctrl.resolve.contentUrl;
            ctrl.title = ctrl.resolve.title;

            ModalDocDialogServices.getDoc(ctrl.contentUrl)
                .then(function(data) {
                    ctrl.content = data;
                });

        }

        function close() {
            ctrl.close("close");
        }

        function dismiss() {
            ctrl.dismiss("cancel");
        }
    }

    ModalDocDialogController.$inject = ['ModalDocDialogServices'];

    angular
        .module('components.modalDoc')
        .controller('ModalDocDialogController', ModalDocDialogController);
})(window.angular);