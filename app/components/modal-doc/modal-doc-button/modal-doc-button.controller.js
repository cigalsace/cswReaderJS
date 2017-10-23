(function(angular) {
    'use strict';

    function ModalDocButtonController($uibModal) {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.open = open;

        ////////////////////////////////////

        function onInit() {}

        function open() {
            ctrl.modalInstance = $uibModal.open({
                animation: false,
                component: "modalDocDialog",
                size: 'lg',
                resolve: {
                    contentUrl: function() {
                        return ctrl.contentUrl;
                    },
                    title: function() {
                        return ctrl.title;
                    }
                }
            });
        }

        function close() {
            ctrl.modalInstance.close();
        }

    }

    ModalDocButtonController.$inject = ['$uibModal'];

    angular
        .module('components.modalDoc')
        .controller('ModalDocButtonController', ModalDocButtonController);
})(window.angular);