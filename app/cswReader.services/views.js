/**
 * [module description]
 * @param  {[type]} 'views' [description]
 * @param  {[type]} []      [description]
 * @return {[type]}         [description]
 */
// angular.module('views', []);

angular.module('cswReader.services')
    .factory('viewsSrv', viewsSrv);

viewsSrv.$inject = ['$http', '$location', 'AppDataSrv'];

function viewsSrv($http, $location, AppDataSrv) {

    var promise;

    var viewsSrv = {
        getViews: getViews,
        getViewLocales: getViewLocales,
        getView: getView
    };

    return viewsSrv;

    ////////////////////////////////////////////////////////////////////////


    function getViews(views_file, callback) {
        if (!promise) {
            promise = $http.get(views_file)
                .then(function(response) {
                    data = response.data.list;
                    callback(data);
                })
                .catch(function(data, status) {
                    console.log("Error: can't get " + views_file + " file (status: " + status + ").");
                });
            return promise;
        }
    }
    /*
    function getViews(views_file, callback) {
        return $http.get(views_file)
            .success(function(data) {
                data = data.list;
                callback(data);
            })
            .error(function(data, status) {
                console.log("Error: can't get " + views_file + " file (status: " + status + ").");
            });
    }
    */

    function getViewLocales(viewId, lang, callback) {
        lang = lang || AppDataSrv.lang;
        callback = callback || false;
        var view = getView(viewId);
        viewLocales = AppDataSrv.views[view].locales[lang];
        $http.get(viewLocales)
            .then(function(data) {
                AppDataSrv.ui.view = data.data.ui;
                if (callback) {
                    callback(view, data);
                }
            })
            .catch(function(data, status) {
                console.log(data, status);
                console.log("Error: can't get " + viewLocales + " file (status: " + status + ").");
            });
    }

    function getView(view) {
        if (AppDataSrv.view != view) {
            AppDataSrv.oldView = AppDataSrv.view;
        }
        AppDataSrv.view = view;
        AppDataSrv.template_url = AppDataSrv.views[view].path;
        return view;
    }
}
