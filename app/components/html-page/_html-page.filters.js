// Filter translateCode
function translateCode(MdViewService) {
    return function(code, listName) {
        var result = code;
        if (listName) {
            // MdViewService.codelists = {};
            var list = MdViewService.data.locale.codelists[listName];
            for (var option in list) {
                if (code.toLowerCase() == list[option].id.toLowerCase()) {
                    result = list[option].value;
                }
            }
        }
        return result;
    };
}

translateCode.$inject = ['MdViewService'];

angular.module('components.mdView')
    .filter('translateCode', translateCode);


///////////////////////////////////////////////////////////////////////

// Filter notEmpty (string to array)
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

notEmpty.$inject = [];

angular.module('components.mdView')
    .filter('notEmpty', notEmpty);

////////////////////////////////////////////////////////
/*# Usage in html template:
"xxx | nl2br"
<div ng-bind-html=" YourString | nl2br "></div>
or:
"xxx | nl2br:Boolean"
Boolean( true or flase or just keep null) means is xhtml  or not
if is xhtml, replace with <br/> ; if not , replace with <br>
<div ng-bind-html=" YourString | nl2br:true "></div>
-------------------------
# Example:
//==Analog data===
$scope.items = [
    {"message": "test"},
    {"message": "New\nLine"},
]
//=====
<div class="comment" ng-repeat="item in items">
    <p ng-bind-html=" item.message | nl2br "></p>
</div>
-------------------------
# Output result:
<div class="comment ng-scope" ng-repeat="item in items">
    <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
        test
    </p>
</div>
<div class="comment ng-scope" ng-repeat="item in items">
    <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
        New<br>Line
    </p>
</div>
*/

// Filter nl2br
function nl2br($sce) {
    return function(msg, is_xhtml) {
        is_xhtml = is_xhtml || true;
        breakTag = (is_xhtml) ? '<br />' : '<br>';
        msg = (msg + '')
            .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
        return $sce.trustAsHtml(msg);
    };
}

nl2br.$inject = ['$sce'];

angular.module('filters.module')
    .filter('nl2br', nl2br);