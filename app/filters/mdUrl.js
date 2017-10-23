// Filter mdUrl (string to array)
angular.module('filters.module')
    .filter('mdUrl', mdUrl);

mdUrl.$inject = ['AppDataSrv', 'cswSrv'];

function mdUrl(AppDataSrv, cswSrv) {
    return function(md) {
        AppDataSrv.config.md.url = AppDataSrv.config.csw.url;
        AppDataSrv.config.md.id = md.FileIdentifier;
        return cswSrv.getMdUrl(AppDataSrv.config.md);
    };
}