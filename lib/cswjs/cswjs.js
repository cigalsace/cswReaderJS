var cswjs = {};


(function(cswjs, undefined) {
    "use strict";

    jQuery.noConflict();
    cswjs.xpaths = {
        stats: 'csw\\:SearchResults, SearchResults',
        Root: 'gmd\\:MD_Metadata, MD_Metadata',
        MD_FileIdentifier: 'gmd\\:fileIdentifier>gco\\:CharacterString, fileIdentifier>CharacterString',
        MD_HierarchyLevel: 'gmd\\:hierarchyLevel>gmd\\:MD_ScopeCode, hierarchyLevel>MD_ScopeCode',
        Data_Title: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, identificationInfo>MD_DataIdentification>citation>CI_Citation>title>CharacterString',
        Service_Title: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, identificationInfo>SV_ServiceIdentification>citation>CI_Citation>title>CharacterString',
        Data_Abstract: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:abstract>gco\\:CharacterString, identificationInfo>MD_DataIdentification>abstract>CharacterString',
        Service_Abstract: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:abstract>gco\\:CharacterString, identificationInfo>SV_ServiceIdentification>abstract>CharacterString',
        // Browsegraphic
        Data_BrowseGraphics: 'gmd\\:graphicOverview>gmd\\:MD_BrowseGraphic, graphicOverview>MD_BrowseGraphic',
        Data_BrowseGraphic_Name: 'gmd\\:fileName>gco\\:CharacterString, fileName>CharacterString',
        Data_BrowseGraphic_Description: 'gmd\\:fileDescription>gco\\:CharacterString, fileDescription>CharacterString',
        Data_BrowseGraphic_Type: 'gmd\\:fileType>gco\\:CharacterString, fileType>CharacterString',
        // Keywords
        Data_Keywords: 'gmd\\:descriptiveKeywords>gmd\\:MD_Keywords, descriptiveKeywords>MD_Keywords',
        Data_Keyword: 'gmd\\:keyword>gco\\:CharacterString, keyword>CharacterString',
        // Linkages
        Data_Linkages: 'gmd\\:distributionInfo>gmd\\:MD_Distribution>gmd\\:transferOptions>gmd\\:MD_DigitalTransferOptions>gmd\\:onLine>gmd\\:CI_OnlineResource, distributionInfo>MD_Distribution>transferOptions>MD_DigitalTransferOptions>onLine>CI_OnlineResource',
        Data_LinkageName: 'gmd\\:name>gco\\:CharacterString, name>CharacterString, gmd\\:name>gmx\\:MimeFileType, name>MimeFileType',
        Data_LinkageDescription: 'gmd\\:description>gco\\:CharacterString, description>CharacterString',
        Data_LinkageURL: 'gmd\\:linkage>gmd\\:URL, linkage>URL',
        Data_LinkageProtocol: 'gmd\\:protocol>gco\\:CharacterString, protocol>CharacterString',
        // TopicCategories
        Data_TopicCategories: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:topicCategory, identificationInfo>MD_DataIdentification>topicCategory',
        Service_TopicCategories: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:topicCategory, identificationInfo>SV_ServiceIdentification>topicCategory',
        Data_TopicCategory: 'gmd\\:MD_TopicCategoryCode, MD_TopicCategoryCode'
    };


    cswjs.codes = {
        // Liste des protocoles
        'MD_LinkageProtocolCode': {
            'OGC:WMS' : 'WMS',
            'OGC:WFS' : 'WFS'
        },
        // Liste des valeurs des TopicCategories
        'MD_TopicCategoryCode': {
            farming: "Agriculture",
            biota: "Flore et faune",
            boundaries: "Limites politiques et administratives",
            climatologyMeteorologyAtmosphere: "Climatologie, météorologie",
            economy: "Economie",
            elevation: "Topographie",
            environment: "Ressources et gestion de l’environnement",
            geoscientificInformation: "Géosciences",
            health: "Santé",
            imageryBaseMapsEarthCover: "Carte de référence de la couverture terrestre",
            intelligenceMilitary: "Infrastructures militaires",
            inlandWaters: "Hydrographie",
            location: "Localisant",
            oceans: "Océans",
            planningCadastre: "Planification et aménagement du territoire",
            society: "Société",
            structure: "Aménagements urbains",
            transportation: "Infrastructures de transport",
            utilitiesCommunication: "Réseaux de télécommunication, d’énergie"
        }
    };

    cswjs.Xml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    cswjs.Xml.prototype.setXml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    // Fonction pour parser fichier XML retourné par serveur CSW
    cswjs.Xml.prototype.toJson = function(xml) {
        var self = this;
        if (xml) {
            self.xml = xml;
        }
        var data = {};
        data.nb_records_matched = parseInt(jQuery(self.xml).find(cswjs.xpaths.stats).attr('numberOfRecordsMatched'));
        data.nb_records_returned = parseInt(jQuery(self.xml).find(cswjs.xpaths.stats).attr('numberOfRecordsReturned'));
        data.next_record = parseInt(jQuery(self.xml).find(cswjs.xpaths.stats).attr('nextRecord'));
        if (data.next_record === 0) {
            data.next_record = data.nb_records_matched + 1;
        }
        data.element_set = jQuery(self.xml).find(cswjs.xpaths.stats).attr('elementSet');
        data.nb_records_visible = data.next_record - 1;
        if (data.nb_records_visible < 0) {
            data.nb_records_visible = data.nb_records_returned;
        }

        var mds = [];
        jQuery(self.xml).find(cswjs.xpaths.Root).each(function() {
            var MD_HierarchyLevel = jQuery(this).find(cswjs.xpaths.MD_HierarchyLevel).attr('codeListValue');
            var Data_Title;
            var Data_Abstract;
            //console.log(MD_HierarchyLevel);
            if (MD_HierarchyLevel == 'service') {
                Data_Title = jQuery(this).find(cswjs.xpaths.Service_Title).text();
                Data_Abstract = jQuery(this).find(cswjs.xpaths.Service_Abstract).text();
            } else {
                Data_Title = jQuery(this).find(cswjs.xpaths.Data_Title).text();
                Data_Abstract = jQuery(this).find(cswjs.xpaths.Data_Abstract).text();
            }

            // MD fileIdentifier
            var MD_FileIdentifier = jQuery(this).find(cswjs.xpaths.MD_FileIdentifier).text();

            // MD URL
            // md_config.url = csw_config.url;
            // md_config.id = MD_FileIdentifier;
            // var MD_URL = md_urlConstruct(md_config);

            // Data title
            var truncatevalue_title = 60;
            var short_Data_Title = Data_Title.substr(0, truncatevalue_title);
            if (Data_Title.length > short_Data_Title.length) {
                short_Data_Title += "...";
            }

            // Data abstract
            var truncatevalue_abstract = 397;
            var short_Data_Abstract = Data_Abstract.substr(0, truncatevalue_abstract);
            if (Data_Abstract.length > short_Data_Abstract.length) {
                short_Data_Abstract += "...";
            }

            // Linkage protocols
            var LinkageProtocols = self._csw_getLinkageProtocols(jQuery(this));

            // Keywords
            var Keywords = self._csw_getKeywords(jQuery(this));

            var md = {
                MD_FileIdentifier: MD_FileIdentifier,
                //MD_FileName: MD_FileName,
                Data_Title: Data_Title,
                Data_Abstract: Data_Abstract,
                Data_shortTitle: short_Data_Title,
                Data_shortAbstract: short_Data_Abstract,
                Data_BrowseGraphics: self._csw_getFirstBrowsegraphics(jQuery(this)),
                Data_Keywords: Keywords.keywords,
                Data_listKeywords: Keywords.keywords.join(', '),
                Data_TopicCategories: self._csw_getTopicCategories(jQuery(this)),
                Data_listTopicCategories: self._csw_getTopicCategories(jQuery(this)).join(', '),
                Data_WMS: LinkageProtocols.wms,
                Data_WFS: LinkageProtocols.wfs,
                Data_OD: Keywords.opendata
                // MD_URL: MD_URL
            };
            mds.push(md);
        });
        data.md = mds;
        return data;
    };

    cswjs.Xml.prototype._csw_getFirstBrowsegraphics = function(xml) {
        var random = (Date.now()).toString();
        var first_bg = jQuery(xml).find(cswjs.xpaths.Data_BrowseGraphics + ':first');
        var bg = {
            Data_BrowseGraphic_Name: first_bg.find(cswjs.xpaths.Data_BrowseGraphic_Name).text() + "?cb=" + random,
            Data_BrowseGraphic_Description: first_bg.find(cswjs.xpaths.Data_BrowseGraphic_Description).text(),
            Data_BrowseGraphic_Type: first_bg.find(cswjs.xpaths.Data_BrowseGraphic_Type).text()
        };
        return bg;
    };

    cswjs.Xml.prototype._csw_getKeywords = function(xml) {
        var d = {
            keywords: [],
            opendata: false
        };
        jQuery(xml).find(cswjs.xpaths.Data_Keywords).each(function() {
            var kw = jQuery(this).find(cswjs.xpaths.Data_Keyword).text();
            if (kw.toLowerCase() == 'données ouvertes'.toLowerCase()) {
                d.opendata = true;
            }
            d.keywords.push(kw);
        });
        return d;
    };

    cswjs.Xml.prototype._csw_getTopicCategories = function(xml) {
        var d = [];
        jQuery(xml).find(cswjs.xpaths.Data_TopicCategories).each(function() {
            var tc = cswjs.codes.MD_TopicCategoryCode[jQuery(this).find(cswjs.xpaths.Data_TopicCategory).text()];
            d.push(tc);
        });
        return d;
    };

    cswjs.Xml.prototype._csw_getLinkageProtocols = function(xml) {
        var d = [];
        d.wms = false;
        d.wfs = false;
        jQuery(xml).find(cswjs.xpaths.Data_Linkages).each(function() {
            var Data_LinkageProtocol = cswjs.codes.MD_LinkageProtocolCode[jQuery(this).find(cswjs.xpaths.Data_LinkageProtocol).text()];
            if (Data_LinkageProtocol == "WMS") {
                d.wms = true;
            } else if (Data_LinkageProtocol == "WFS") {
                d.wfs = true;
            }
        });
        return d;
    };



}(window.cswjs = window.cswjs || {}));
