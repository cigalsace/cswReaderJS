(function(angular) {
    'use strict';

    // Utilisation: <change-view views="[{name: 'grid', icon:'glyphicon-th'}, {name: 'list', icon: 'glyphicon-th-list'}]" view="$ctrl.config.app.view" on-change="vm.changeView(view)"></change-view>

    var changeView = {
        bindings: {
            view: '<',
            views: '<',
            onChange: '&'
        },
        templateUrl: './app/components/change-view/change-view.html',
        controller: 'ChangeViewController'
    };

    angular
        .module('components.changeView')
        .component('changeView', changeView);
})(window.angular);