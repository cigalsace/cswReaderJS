//----------------------------------------------------------------------------// app.factories.AppDataSrv.js
// App Data Management Factory
//----------------------------------------------------------------------------

// angular.module('appData', []);

angular
    .module('cswReader.services')
    .factory('AppDataSrv', AppDataSrv);

// AppDataSrv.$inject = [];

function AppDataSrv() {
    var AppDataSrv = {
        pageLoaded: true,
        disableInfiniteScroll: false,
        config: {},
        userLanguage: '',
        locales: {},
        models: {},
        model: 1,
        view: 1,
        views: {},
        ui: {},
        md_errors: {},
        codelists: {},
        metadata: {},
    };

    return AppDataSrv;
}
