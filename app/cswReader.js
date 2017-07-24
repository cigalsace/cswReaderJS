/**
 * Application Angular JS cswReaderApp
 */

angular.module('cswReader.services', []);
angular.module('cswReader.filters', []);
angular.module('cswReader.directives', []);
// Déclaration du module cswReader
// angular.module('cswReader', ['ui.bootstrap', 'cswReader.services', 'cswReader.directives', 'cswReader.filters', 'modalDoc', 'modalSetXml', 'modalGetXml']);
angular.module('cswReader', ['ui.bootstrap', 'infinite-scroll', 'cswReader.services', 'cswReader.directives', 'cswReader.filters', 'modalDoc']);

angular.module('cswReader')
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    });


// angular.module('cswReader')
    // .run(['configSrv', 'modelsSrv', 'viewsSrv', 'localesSrv', 'xmlSrv', 'AppDataSrv', 'BroadcastSrv', runApp]);
angular.module('cswReader')
    .run(['configSrv', 'cswSrv', 'AppDataSrv', 'BroadcastSrv', 'localesSrv', 'viewsSrv', 'helperSrv', 'mdSrv', runApp]);


// function runApp(configSrv, modelsSrv, viewsSrv, localesSrv, xmlSrv, AppDataSrv, BroadcastSrv) {
function runApp(configSrv, cswSrv, AppDataSrv, BroadcastSrv, localesSrv, viewsSrv, helperSrv, mdSrv) {

    // Get config file URL
    AppDataSrv.config_file = helperSrv.getParam('config', 'config/config.json');
    getConfig(AppDataSrv.config_file);

    // Get config data from config_file
    function getConfig(config_file) {
        configSrv.getFile(config_file)
            .then(function(data) {
                AppDataSrv.config = data;
                // Get URL query parameters
                AppDataSrv.display = {};
                AppDataSrv.display.header = helperSrv.getParam('header', AppDataSrv.config.app.header);
                AppDataSrv.display.advancedSearch = helperSrv.getParam('advancedSearch', AppDataSrv.config.app.advancedSearch);
                AppDataSrv.display.footer = helperSrv.getParam('footer', AppDataSrv.config.app.footer);
                AppDataSrv.lang = localesSrv.getLanguage(AppDataSrv.config.app.lang);
                AppDataSrv.view = helperSrv.getParam('view', AppDataSrv.config.app.view);
                AppDataSrv.csw_url_file = helperSrv.getParam('csw_list', AppDataSrv.config.app.csw_url_file);
                AppDataSrv.config.csw.url = helperSrv.getParam('csw', AppDataSrv.config.csw.url);
                AppDataSrv.config.csw.constraint_type = helperSrv.getParam('constraint_type', AppDataSrv.config.csw.constraint_type);
                AppDataSrv.config.csw.constraint = helperSrv.getParam('constraint', AppDataSrv.config.csw.constraint);
                AppDataSrv.oldView = helperSrv.getParam('oldView', AppDataSrv.view);

                getLocales(AppDataSrv.config.app.locales_path);
                getLocale(AppDataSrv.lang);
                getViews(AppDataSrv.lang);
				// getConstraintsSearchList(AppDataSrv.lang);

            });
    }

    // Get locales list from translate service
    function getLocales(localesPath) {
        localesSrv.getLocales(localesPath)
            .then(function(data) {
                AppDataSrv.locales = data.locales;
            });
    }

    // Get locales from translate service
    function getLocale(lang) {
        localesSrv.getLocale(AppDataSrv.config.app.locales_path, lang)
            .then(function(data) {
                AppDataSrv.ui = data.ui;
                AppDataSrv.constraints = helperSrv.clearJson(data.constraints_type);
                AppDataSrv.constraint = Object.keys(data.constraints_type)[0];
                AppDataSrv.codelists = data.codelists;
            });
    }

    // Get list of view from views service
    // Get locales from views service (get URL param or the first item of models list)
    function getViews(lang) {
        viewsSrv.getViews(AppDataSrv.config.app.views_file, function(data) {
                AppDataSrv.views = data;
            })
            .then(function() {
                viewsSrv.getViewLocales(AppDataSrv.view, lang, function(view, data) {
                    // AppDataSrv.ui.view = data.data.ui;
                    if (view == 'view') {
                        AppDataSrv.config.md.id = helperSrv.getParam('md');
                        mdSrv.viewMdFile();
                    }
                });
                getCswUrlList(AppDataSrv.csw_url_file);
            });
    }

    function getCswUrlList(csw_url_file) {
        cswSrv.getCswList(csw_url_file)
            .then(function(data) {
                AppDataSrv.csw_list = data;
                cswSrv.getRecords();
				BroadcastSrv.send('configLoaded');
            });
    }
}
