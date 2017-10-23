function AppService($state, $q, $window, HelperService, HtmlPageService, CswCatalogService, MdViewService) {

    var AppService = {
        data: {},
        loadPage: loadPage,
        updateUrl: updateUrl,
        getParam: getParam,
        getParamLang: getParamLang,
        getParamModule: getParamModule,
        getParamView: getParamView,
        getLocale: getLocale
    };

    return AppService;

    /////////////////////////////////////////////////////////////////////

    function loadPage(module, params, options) {
        params = params || {};
        options = options || {};
        console.log(module, params, options);
        // $state.transitionTo(module, params, options);
        $state.go(module, params, options);
    }

    function updateUrl() {
        $state.go('.', AppService.data.params, { notify: false });
    }

    function getParam(name, defaultValue) {
        var value = defaultValue;
        if ([undefined, 'none'].indexOf($state.params[name]) === -1) {
            value = $state.params[name];
        }
        return value;
    }

    function getParamLang(defaultValue) {
        var value;
        if (Object.keys(AppService.data.config.app.locales).indexOf($state.params.lang) !== -1) {
            value = $state.params.lang;
        } else {
            var navigatorLanguage = $window.navigator.language.substring(0, 2) || $window.navigator.userLanguage.substring(0, 2);
            if (Object.keys(AppService.data.config.app.locales).indexOf(navigatorLanguage) === -1) {
                value = navigatorLanguage;
            } else {
                value = defaultValue;
            }
        }
        return value;
    }

    function getParamModule(defaultValue, modules) {
        var module = defaultValue;
        console.log($state.current.name, modules, AppService.data.params.module);
        if (modules.indexOf($state.current.name) !== -1) {
            module = $state.current.name;
        }
        console.log($state.current.name, modules, AppService.data.params.module);
        return module;
    }

    function getParamView(module) {
        var value = Object.keys(AppService.data.config[module].views)[0];
        if (Object.keys(AppService.data.config[module].views).indexOf($state.params.view) !== -1) {
            value = $state.params.view;
        }
        return value;
    }

    function getLocale(lang, callback) {
        console.log(lang);
        callback = callback || function() {};
        AppService.data.params.lang = lang;
        AppService.data.locale = {};
        var promisesUrl = [
            HelperService.getJsonFile(AppService.data.config.app.locales[lang].pages),
            HelperService.getJsonFile(AppService.data.config.app.locales[lang].locale),
            HelperService.getJsonFile(AppService.data.config.catalog.locales[lang]),
            HelperService.getJsonFile(AppService.data.config.mdview.locales[lang])
        ];
        return $q.all(promisesUrl).then(function(data) {
            AppService.data.locale.pages = data[0];
            HtmlPageService.data.pages = data[0];
            // HtmlPageService.data.url = AppService.data.locale.pages[AppService.data.params.page];
            console.log(AppService.data.locale.pages, AppService.data.params.page);
            AppService.data.locale.app = data[1];
            AppService.data.locale.catalog = data[2];
            CswCatalogService.data.locale = data[2];
            AppService.data.locale.mdview = data[3];
            MdViewService.data.locale = data[3];
            callback();
            console.log(data);
        });
    }

}

AppService.$inject = ['$state', '$q', '$window', 'HelperService', 'HtmlPageService', 'CswCatalogService', 'MdViewService'];

/**
 * @ngdoc service
 * @name AppService
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

angular
    .module('core')
    .factory('AppService', AppService);
