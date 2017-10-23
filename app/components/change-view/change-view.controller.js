(function(angular) {
    'use strict';

    function ChangeViewController() {
        var ctrl = this;
        ctrl.$onInit = onInit;
        ctrl.changeView = changeView;

        ////////////////////////////////////

        function _getNextIndex(index, max) {
            index++;
            if (index >= max) {
                return 0;
            }
            return index;
        }

        function onInit() {
            ctrl.viewIndex = 0;
            ctrl.viewNextIndex = 1;
            for (var i = 0; i < ctrl.views.length; i++) {
                if (ctrl.views[i].name == ctrl.view) {
                    ctrl.viewIndex = i;
                    ctrl.viewNextIndex = _getNextIndex(ctrl.viewIndex, ctrl.views.length);
                    break;
                }
            }
        }

        function changeView(view) {
            ctrl.viewIndex = _getNextIndex(ctrl.viewIndex, ctrl.views.length);
            ctrl.viewNextIndex = _getNextIndex(ctrl.viewIndex, ctrl.views.length);
            ctrl.view = ctrl.views[ctrl.viewIndex].name;
            ctrl.onChange({ view: ctrl.view });
        }
    }

    ChangeViewController.$inject = [];

    angular
        .module('components.changeView')
        .controller('ChangeViewController', ChangeViewController);
})(window.angular);