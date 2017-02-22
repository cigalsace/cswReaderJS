/**
 * [module description]
 * @param  {[type]} 'mdjs' [description]
 * @param  {[type]} []     [description]
 * @return {[type]}        [description]
 */
// angular.module('mdjs', []);

angular.module('cswReader.services')
    .factory('mdjsSrv', mdjsSrv);

mdjsSrv.$inject = ['AppDataSrv', 'jsonConverterSrv'];

function mdjsSrv(AppDataSrv, jsonConverterSrv) {

    var mdjsSrv = {
        toXml: toXml,
        toJson: toJson
    };

    return mdjsSrv;

    ////////////////////////////////////////////////////////////////////////

    function toXml(json) {

        var metadata = new mdjs.Metadata();

        return metadata.toXmlString({
            beautifier: true
        }, json);
    }

    function toJson(xml_str) {
        jQuery.noConflict();
        xml = jQuery.parseXML(xml_str);
        var metadata = new mdjs.Metadata();
        metadata.setXml(xml);
        var md = metadata.toJson();
        console.log(md);
        AppDataSrv.metadata = jsonConverterSrv.mdjsToForm(md);
    }
}
