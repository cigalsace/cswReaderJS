// Filter notEmpty (string to array)
angular.module('filters.module')
    .filter('notEmpty', notEmpty);

// notEmpty.$inject = [];

function notEmpty() {
    return function(data, type) {
        type = type || 'checkArray';
        data = data || false;
        if (data && data.length) {
            isEmpty = true;
            var result = [];
            if (type == 'checkArray') {
                for (var i1 = 0; i1 < data.length; i1++) {
                    if (data[i1] != '') {
                        isEmpty = false;
                    }
                }
                return !(isEmpty);
            }
            if (type == 'checkArrayObject') {
                for (var i = 0; i < data.length; i++) {
                    for (var key in data[i]) {
                        if (data[i][key] != '') {
                            isEmpty = false;
                        }
                    }
                }
                return !(isEmpty);
            }
            if (type == 'array') {
                for (var j = 0; j < data.length; j++) {
                    if (data[j] != '') {
                        result.push(data[j]);
                    }
                }
                return result;
            }
            if (type == 'arrayObject') {
                for (var j1 = 0; j1 < data.length; j1++) {
                    var itemEmpty1 = true;
                    for (var k in data[j1]) {
                        if (data[j1][k] != '') {
                            itemEmpty1 = false;
                        }
                    }
                    if (!itemEmpty1) {
                        result.push(data[j1]);
                    }
                }
                return result;
            }
        }
        return false;
    };
}