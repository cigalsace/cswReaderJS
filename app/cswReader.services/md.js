/**
 * [module description]
 * @param  {[type]} 'modalMd' [description]
 * @return {[type]}            [description]
 */
angular.module('cswReader.services')
    .factory('mdSrv', mdSrv);

mdSrv.$inject = ['$http', 'AppDataSrv', 'mdjsSrv', 'viewsSrv'];

function mdSrv($http, AppDataSrv, mdjsSrv, viewsSrv) {

    var mdSrv = {
        getMdUrl: getMdUrl,
        // getMdFile: getMdFile,
        viewMdFile: viewMdFile
    };

    return mdSrv;

    ////////////////////////////////////////////////////////////////////////

    function getMdUrl(md_config) {
		var url;
		var md_url = md_config.url;
		if (md_url.indexOf('?') != -1) {
			if (md_url.charAt(md_url.length-1) == '?') {
				url = md_url;
			} else {
				url = md_url + '&';
			}
		} else {
			url = md_url + '?';
		}
	    for (var item in md_config) {
	        if (item != 'url' && md_config[item] !== '') {
	            url += item + '=' + md_config[item] + '&';
	        }
	    }
		url = url.substring(0, url.length-1);
		if (AppDataSrv.config.app.proxy_server_url) {
            url = AppDataSrv.config.app.proxy_server_url + encodeURIComponent(url);
        }
	    return url;
	}

    // function getMd(lg, field) {
    function getMdFile(url) {
        return $http
            .get(url)
            .then(function(xml) {
                // data = xml.data.replace(/<\/?csw:[^>]+>/ig, '');
                // console.log(xml.data);
                mdjsSrv.toJson(xml.data);
            });
    }

    function viewMdFile(id) {
        AppDataSrv.config.md.url = AppDataSrv.config.csw.url;
        if (id) { AppDataSrv.config.md.id = id; }
        var url = getMdUrl(AppDataSrv.config.md);
        console.log(url);
        getMdFile(url);
        // viewsSrv.getView('view');
        viewsSrv.getViewLocales('view', AppDataSrv.lang, function(view, data) {
            AppDataSrv.ui.view = data.data.ui;
        });
    }
}
