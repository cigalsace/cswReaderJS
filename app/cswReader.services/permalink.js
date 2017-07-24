//----------------------------------------------------------------------------
// app.factories.broadcast.js
// App Data Management Factory
//----------------------------------------------------------------------------

// angular.module('appData', []);

angular
    .module('cswReader.services')
    .factory('PermalinkSrv', PermalinkSrv);

PermalinkSrv.$inject = ['AppDataSrv'];

function PermalinkSrv(AppDataSrv) {
    var PermalinkSrv = {
        get: get
    };

    return PermalinkSrv;

    ////////////////////////////////////////////////////////////////////////

    function get() {
        var url = 'index.html?';
        var params = [];
        params.push('config=' + AppDataSrv.config_file);
        params.push('lang=' + AppDataSrv.userLanguage);
        params.push('view=' + AppDataSrv.view);
        params.push('csw=' + AppDataSrv.config.csw.url);
        params.push('csw_list=' + AppDataSrv.config.app.csw_url_file);
        if (AppDataSrv.view == 'view') {
            params.push('md=' + AppDataSrv.config.md.id);
            params.push('oldView=' + AppDataSrv.oldView);
        }
        params.push('header=' + AppDataSrv.display.header);
        params.push('footer=' + AppDataSrv.display.footer);
        params.push('constraint_type=' + AppDataSrv.config.csw.constraint_type);
        params.push('constraint=' + AppDataSrv.config.csw.constraint);
        return url + params.join('&');
    }

}
