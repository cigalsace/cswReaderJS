var changeLocalesTemplateUrl = './app/cswReader.directives/changeLocales';
/**
 * [module description]
 * @param  {[type]} 'cswReader' [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader.directives')
    .value('changeLocalesTemplateurl',
        /**
         * [function description]
         * @param  {[type]} element [description]
         * @param  {[type]} attrs   [description]
         * @return {[type]}         [description]
         */
        function(element, attrs) {
            var templateUrl = attrs.changeLocalesTemplateurl;
            return templateUrl !== undefined ? templateUrl : changeLocalesTemplateUrl + '/changeLocales.html';
        });

/**
 * [dataTitleDirective description]
 * @param  {[type]} mdchangeLocalesTemplateurl [description]
 * @return {[type]}                            [description]
 */
function changeLocalesDirective(AppDataSrv, changeLocalesTemplateurl, localesSrv, viewsSrv, helperSrv) {
    return {
        restrict: 'EA',
        templateUrl: changeLocalesTemplateurl,
        replace: true,
        link: link,
        controller: 'cswReaderCtrl',
        controllerAs: 'vm',
        bindToController: true,
        scope: {}
    };

    /**
     * [link description]
     * @param  {[type]} scope   [description]
     * @param  {[type]} element [description]
     * @param  {[type]} attrs   [description]
     * @return {[type]}         [description]
     */
    function link(scope, element, attrs, vm) {
        scope.first = true;
        scope.$watch('vm.data.lang', function() {
            if (scope.first) {
                init();
                scope.first = false;
            }
        });

        function init() {
            scope.locales = vm.data.locales;
            scope.lang = vm.data.lang;
            scope.changeLocale = function(lang) {
                localesSrv.getLocale(AppDataSrv.config.app.locales_path, lang)
                    .then(function(data) {
                        vm.data.ui = data.ui;
                        vm.data.codelists = data.codelists;
                        vm.data.constraints = helperSrv.clearJson(data.constraints_type);
                        vm.data.constraint = Object.keys(data.constraints_type)[0];
                    });
                viewsSrv.getViewLocales(AppDataSrv.view, lang, function(view, data) {
                    vm.data.ui.view = AppDataSrv.ui.view;
                    vm.data.lang = lang;
                });
            };
        }
    }
}

/**
 * [module description]
 * @param  {[type]} 'cswReader' [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader.directives')
    .directive('changeLocales', changeLocalesDirective);

changeLocalesDirective.$inject = ['AppDataSrv', 'changeLocalesTemplateurl', 'localesSrv', 'viewsSrv', 'helperSrv'];
