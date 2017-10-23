function ModalDocDialogServices($http, $sce) {

    var modalDocDialogServices = {
        getDoc: getDoc
    };

    return modalDocDialogServices;

    /////////////////////////////////////

    function getDoc(url) {
        return $http.get(url)
            .then(function(response) {
                var extension = url.substr(url.lastIndexOf(".") + 1);
                if (['md', 'markdown', 'mkd'].indexOf(extension.toLowerCase()) !== -1) {
                    showdown.setFlavor('github');
                    var converter = new showdown.Converter({
                        tables: true
                    });
                    var html = converter.makeHtml(response.data);
                    return $sce.trustAsHtml(html);
                } else {
                    return response.data;
                }
            });
    }
}

/**
 * @ngdoc service
 * @name ContactService
 * @module components.contact
 *
 * @description Provides HTTP methods for our firebase connection.
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */

ModalDocDialogServices.$inject = ['$http', '$sce'];

angular
    .module('components.modalDoc')
    .factory('ModalDocDialogServices', ModalDocDialogServices);