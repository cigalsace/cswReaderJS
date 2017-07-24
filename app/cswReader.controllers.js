/**
 * [module description]
 * @param  {[type]} 'cswReader' [description]
 * @return {[type]}          [description]
 */
angular.module('cswReader')
    .controller('cswReaderCtrl', cswReaderCtrl);

// cswReaderCtrl.$inject = ['AppDataSrv', '$http', '$sce', '$log', 'configSrv', 'localesSrv', 'modelsSrv', 'viewsSrv', 'mdjsSrv', 'jsonConverterSrv', 'BroadcastSrv', 'PermalinkSrv', '$window', 'modalDocSrv', 'modalSetXmlSrv', 'modalGetXmlSrv', 'xmlSrv'];
cswReaderCtrl.$inject = ['AppDataSrv', '$http', '$sce', '$window', 'BroadcastSrv', 'cswSrv', 'viewsSrv', 'mdSrv', 'PermalinkSrv', 'modalDocSrv'];

// function cswReaderCtrl(AppDataSrv, $http, $sce, $log, configSrv, localesSrv, modelsSrv, viewsSrv, mdjsSrv, jsonConverterSrv, BroadcastSrv, PermalinkSrv, $window, modalDocSrv, modalSetXmlSrv, modalGetXmlSrv, xmlSrv) {
function cswReaderCtrl(AppDataSrv, $http, $sce, $window, BroadcastSrv, cswSrv, viewsSrv, mdSrv, PermalinkSrv, modalDocSrv) {

    var vm = this;

    vm.data = AppDataSrv;

    BroadcastSrv.on('configLoaded', function() {
        loadPage();
    });

    function loadPage() {
        // console.log(vm.data);
        vm.getMore = cswSrv.getRecords;

        vm.reloadPage = function(csw_url, constraint_type) {
            vm.data.disableInfiniteScroll = false;
            if (csw_url) {
                vm.data.config.csw.url = csw_url;
            }
            if (constraint_type) {
                vm.data.config.csw.constraint_type = constraint_type;
            }
            vm.data.config.csw.startposition = 1;
            cswSrv.getRecords();
        };

        vm.clearSearch = function() {
            vm.data.config.csw.constraint = '';
            vm.reloadPage(vm.data.config.csw.url, 'AnyText');
        };

        vm.changeView = viewsSrv.getViewLocales;

        vm.viewMd = mdSrv.viewMdFile;

        vm.getPermalink = function() {
            var url = PermalinkSrv.get();
            $window.open(url, '_blank');
        };

        // Modal to show documentation
        vm.openModalDoc = modalDocSrv.openModalDoc;

    }
}
