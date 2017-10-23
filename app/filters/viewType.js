// Filter viewType
angular.module('filters.module')
    .filter('viewType', viewType);

// array2string.$inject = ['$sce'];

function viewType() {
    return function(view) {
        // view = view || '';
        if (view.indexOf('view') !== -1) {
            return 'view';
        }
        return false;
    };
}