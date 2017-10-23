(function(angular) {
    'use strict';

    var mdViewContact = {
        bindings: {
            locale: '<',
            contactType: '@',
            contacts: '<'
        },
        templateUrl: './app/components/md-view/md-view-contact/md-view-contact.html'
    };

    angular
        .module('components.mdView')
        .component('mdViewContact', mdViewContact);
})(window.angular);