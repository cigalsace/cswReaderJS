var cswjs = {};

(function(cswjs, undefined) {
    "use strict";
    jQuery.noConflict();

    // Get Records operation
    cswjs.getrecords = {};

    cswjs.getrecords.xpaths = {
        stats: 'csw\\:SearchResults, SearchResults',
        root: 'gmd\\:MD_Metadata, MD_Metadata',
        mdFileIdentifier: 'gmd\\:fileIdentifier>gco\\:CharacterString, fileIdentifier>CharacterString',
        mdHierarchyLevel: 'gmd\\:hierarchyLevel>gmd\\:MD_ScopeCode, hierarchyLevel>MD_ScopeCode',
        dataTitle: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, identificationInfo>MD_DataIdentification>citation>CI_Citation>title>CharacterString',
        srvTitle: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:citation>gmd\\:CI_Citation>gmd\\:title>gco\\:CharacterString, identificationInfo>SV_ServiceIdentification>citation>CI_Citation>title>CharacterString',
        dataAbstract: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:abstract>gco\\:CharacterString, identificationInfo>MD_DataIdentification>abstract>CharacterString',
        srvAbstract: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:abstract>gco\\:CharacterString, identificationInfo>SV_ServiceIdentification>abstract>CharacterString',
        // Browsegraphic
        dataBrowseGraphics: 'gmd\\:graphicOverview>gmd\\:MD_BrowseGraphic, graphicOverview>MD_BrowseGraphic',
        dataBrowseGraphicName: 'gmd\\:fileName>gco\\:CharacterString, fileName>CharacterString',
        dataBrowseGraphicDescription: 'gmd\\:fileDescription>gco\\:CharacterString, fileDescription>CharacterString',
        dataBrowseGraphicType: 'gmd\\:fileType>gco\\:CharacterString, fileType>CharacterString',
        // Keywords
        dataKeywords: 'gmd\\:descriptiveKeywords>gmd\\:MD_Keywords, descriptiveKeywords>MD_Keywords',
        dataKeyword: 'gmd\\:keyword>gco\\:CharacterString, keyword>CharacterString',
        // Linkages
        dataLinkages: 'gmd\\:distributionInfo>gmd\\:MD_Distribution>gmd\\:transferOptions>gmd\\:MD_DigitalTransferOptions>gmd\\:onLine>gmd\\:CI_OnlineResource, distributionInfo>MD_Distribution>transferOptions>MD_DigitalTransferOptions>onLine>CI_OnlineResource',
        dataLinkageName: 'gmd\\:name>gco\\:CharacterString, name>CharacterString, gmd\\:name>gmx\\:MimeFileType, name>MimeFileType',
        dataLinkageDescription: 'gmd\\:description>gco\\:CharacterString, description>CharacterString',
        dataLinkageURL: 'gmd\\:linkage>gmd\\:URL, linkage>URL',
        dataLinkageProtocol: 'gmd\\:protocol>gco\\:CharacterString, protocol>CharacterString',
        // TopicCategories
        dataTopicCategories: 'gmd\\:identificationInfo>gmd\\:MD_DataIdentification>gmd\\:topicCategory, identificationInfo>MD_DataIdentification>topicCategory',
        srvTopicCategories: 'gmd\\:identificationInfo>srv\\:SV_ServiceIdentification>gmd\\:topicCategory, identificationInfo>SV_ServiceIdentification>topicCategory',
        dataTopicCategory: 'gmd\\:MD_TopicCategoryCode, MD_TopicCategoryCode'
    };


    cswjs.codes = {
        // Liste des protocoles
        'MD_LinkageProtocolCode': {
            'OGC:WMS': 'WMS',
            'OGC:WFS': 'WFS'
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

    cswjs.getrecords.Xml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    cswjs.getrecords.Xml.prototype.setXml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    // Fonction pour parser fichier XML retourné par serveur CSW
    cswjs.getrecords.Xml.prototype.toJson = function(xml) {
        var self = this;
        if (xml) {
            self.xml = xml;
        }
        var data = {};
        data.nb_records_matched = parseInt(jQuery(self.xml).find(cswjs.getrecords.xpaths.stats).attr('numberOfRecordsMatched'));
        data.nb_records_returned = parseInt(jQuery(self.xml).find(cswjs.getrecords.xpaths.stats).attr('numberOfRecordsReturned'));
        data.next_record = parseInt(jQuery(self.xml).find(cswjs.getrecords.xpaths.stats).attr('nextRecord'));
        if (data.next_record === 0) {
            data.next_record = data.nb_records_matched + 1;
        }
        data.element_set = jQuery(self.xml).find(cswjs.getrecords.xpaths.stats).attr('elementSet');
        data.nb_records_visible = data.next_record - 1;
        if (data.nb_records_visible < 0) {
            data.nb_records_visible = data.nb_records_returned;
        }

        var mds = [];
        jQuery(self.xml).find(cswjs.getrecords.xpaths.root).each(function() {
            var mdHierarchyLevel = jQuery(this).find(cswjs.getrecords.xpaths.mdHierarchyLevel).attr('codeListValue');
            var dataTitle;
            var dataAbstract;
            //console.log(mdHierarchyLevel);
            if (mdHierarchyLevel == 'service') {
                dataTitle = jQuery(this).find(cswjs.getrecords.xpaths.srvTitle).text();
                dataAbstract = jQuery(this).find(cswjs.getrecords.xpaths.srvAbstract).text();
            } else {
                dataTitle = jQuery(this).find(cswjs.getrecords.xpaths.dataTitle).text();
                dataAbstract = jQuery(this).find(cswjs.getrecords.xpaths.dataAbstract).text();
            }

            // MD fileIdentifier
            var mdFileIdentifier = jQuery(this).find(cswjs.getrecords.xpaths.mdFileIdentifier).text();

            // MD URL
            // md_config.url = csw_config.url;
            // md_config.id = MD_FileIdentifier;
            // var mdURL = md_urlConstruct(md_config);

            // Data title
            var truncatevalue_title = 60;
            var shortDataTitle = dataTitle.substr(0, truncatevalue_title);
            if (dataTitle.length > shortDataTitle.length) {
                shortDataTitle += "...";
            }

            // Data abstract
            var truncatevalue_abstract = 397;
            var shortDataAbstract = dataAbstract.substr(0, truncatevalue_abstract);
            if (dataAbstract.length > shortDataAbstract.length) {
                shortDataAbstract += "...";
            }

            // Linkage protocols
            var dataLinkageProtocols = self._csw_getLinkageProtocols(jQuery(this));

            // Keywords
            var dataKeywords = self._csw_getKeywords(jQuery(this));
            var dataTopicCategories = self._csw_getTopicCategories(jQuery(this));

            var md = {
                mdFileIdentifier: mdFileIdentifier,
                //mdFileName: mdFileName,
                dataTitle: dataTitle,
                dataAbstract: dataAbstract,
                dataShortTitle: shortDataTitle,
                dataShortAbstract: shortDataAbstract,
                dataBrowseGraphics: self._csw_getFirstBrowsegraphics(jQuery(this)),
                dataKeywords: dataKeywords.keywords,
                dataListKeywords: dataKeywords.keywords.join(', '),
                dataTopicCategories: dataTopicCategories,
                dataListTopicCategories: dataTopicCategories.join(', '),
                dataWMS: dataLinkageProtocols.wms,
                dataWFS: dataLinkageProtocols.wfs,
                dataOD: dataKeywords.opendata
            };
            mds.push(md);
        });
        data.md = mds;
        return data;
    };

    cswjs.getrecords.Xml.prototype._csw_getFirstBrowsegraphics = function(xml) {
        var random = (Date.now()).toString();
        var first_bg = jQuery(xml).find(cswjs.getrecords.xpaths.dataBrowseGraphics + ':first');
        var bg = {
            dataBrowseGraphicName: first_bg.find(cswjs.getrecords.xpaths.dataBrowseGraphicName).text() + "?cb=" + random,
            dataBrowseGraphicDescription: first_bg.find(cswjs.getrecords.xpaths.dataBrowseGraphicDescription).text(),
            dataBrowseGraphicType: first_bg.find(cswjs.getrecords.xpaths.dataBrowseGraphicType).text()
        };
        return bg;
    };

    cswjs.getrecords.Xml.prototype._csw_getKeywords = function(xml) {
        var d = {
            keywords: [],
            opendata: false
        };
        jQuery(xml).find(cswjs.getrecords.xpaths.dataKeywords).each(function() {
            var kw = jQuery(this).find(cswjs.getrecords.xpaths.dataKeyword).text();
            if (kw.toLowerCase() == 'données ouvertes'.toLowerCase()) {
                d.opendata = true;
            }
            d.keywords.push(kw);
        });
        return d;
    };

    cswjs.getrecords.Xml.prototype._csw_getTopicCategories = function(xml) {
        var d = [];
        jQuery(xml).find(cswjs.getrecords.xpaths.dataTopicCategories).each(function() {
            var tc = cswjs.codes.MD_TopicCategoryCode[jQuery(this).find(cswjs.getrecords.xpaths.dataTopicCategory).text()];
            d.push(tc);
        });
        return d;
    };

    cswjs.getrecords.Xml.prototype._csw_getLinkageProtocols = function(xml) {
        var d = [];
        d.wms = false;
        d.wfs = false;
        jQuery(xml).find(cswjs.getrecords.xpaths.dataLinkages).each(function() {
            var dataLinkageProtocol = cswjs.codes.MD_LinkageProtocolCode[jQuery(this).find(cswjs.getrecords.xpaths.dataLinkageProtocol).text()];
            if (dataLinkageProtocol == "WMS") {
                d.wms = true;
            } else if (dataLinkageProtocol == "WFS") {
                d.wfs = true;
            }
        });
        return d;
    };

    // GetCapabilities operation
    cswjs.getcapabilities = {};

    cswjs.getcapabilities.xpaths = {
        title: "ows\\:ServiceIdentification>ows\\:Title, ServiceIdentification>Title",
        abstract: "ows\\:ServiceIdentification>ows\\:Abstract, ServiceIdentification>Abstract",
        keywords: "ows\\:ServiceIdentification>ows\\:Keywords>ows\\:Keyword, ServiceIdentification>Keywords>Keyword",
        srvType: "ows\\:ServiceIdentification>ows\\:ServiceType, ServiceIdentification>ServiceType",
        srvVersion: "ows\\:ServiceIdentification>ows\\:ServiceTypeVersion, ServiceIdentification>ServiceTypeVersion",
        fees: "ows\\:ServiceIdentification>ows\\:Fees, ServiceIdentification>Fees",
        accessConstraints: "ows\\:ServiceIdentification>ows\\:AccessConstraints, ServiceIdentification>AccessConstraints",
        providerName: "ows\\:ServiceProvider>ows\\:ProviderName, ServiceProvider>ProviderName",
        providerSite: "ows\\:ServiceProvider>ows\\:ProviderSite, ServiceProvider>ProviderSite",
        individualName: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:IndividualName, ServiceProvider>ServiceContact>IndividualName",
        positionName: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:PositionName, ServiceProvider>ServiceContact>PositionName",
        phoneVoice: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:Phone>ows\\:Voice, ServiceProvider>ServiceContact>ContactInfo>Phone>Voice",
        address: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:Address>ows\\:DeliveryPoint, ServiceProvider>ServiceContact>ContactInfo>Address>DeliveryPoint",
        city: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:Address>ows\\:City, ServiceProvider>ServiceContact>ContactInfo>Address>City",
        area: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:Address>ows\\:AdministrativeArea, ServiceProvider>ServiceContact>ContactInfo>Address>AdministrativeArea",
        postalCode: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:Address>ows\\:PostalCode, ServiceProvider>ServiceContact>ContactInfo>Address>PostalCode",
        country: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:Address>ows\\:Country, ServiceProvider>ServiceContact>ContactInfo>Address>Country",
        email: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:Address>ows\\:ElectronicMailAddress, ServiceProvider>ServiceContact>ContactInfo>Address>ElectronicMailAddress",
        hours: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:HoursOfService, ServiceProvider>ServiceContact>ContactInfo>HoursOfService",
        instructions: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:ContactInfo>ows\\:ContactInstructions, ServiceProvider>ServiceContact>ContactInfo>ContactInstructions",
        role: "ows\\:ServiceProvider>ows\\:ServiceContact>ows\\:Role, ServiceProvider>ServiceContact>Role",
        operationNames: 'ows\\:OperationsMetadata>ows\\:Operation, OperationsMetadata>Operation',
        constraintsValues: "ows\\:OperationsMetadata>ows\\:Operation[name='GetRecords']>ows\\:Constraint[name='SupportedISOQueryables']>ows\\:Value, OperationsMetadata>Operation[name='GetRecords']>Constraint[name='SupportedISOQueryables']>Value"
    };

    cswjs.getcapabilities.Xml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    cswjs.getcapabilities.Xml.prototype.setXml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    // Fonction pour parser fichier getcapabilities retourné par serveur CSW
    cswjs.getcapabilities.Xml.prototype.toJson = function(xml) {
        var self = this;
        if (xml) {
            self.xml = xml;
        }
        var data = {
            title: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.title).text(),
            abstract: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.abstract).text(),
            keywords: self._capabilities_getValues(jQuery(self.xml), 'keywords'),
            // keywords: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.keywords).text(),
            srvType: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.srvType).text(),
            srvVersion: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.srvVersion).text(),
            fees: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.fees).text(),
            accessConstraints: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.accessConstraints).text(),
            providerName: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.providerName).text(),
            providerSite: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.providerSite).attr('xlink:href'),
            individualName: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.individualName).text(),
            positionName: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.positionName).text(),
            phoneVoice: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.phoneVoice).text(),
            address: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.address).text(),
            city: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.city).text(),
            area: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.area).text(),
            postalCode: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.postalCode).text(),
            country: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.country).text(),
            email: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.email).text(),
            hours: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.hours).text(),
            instructions: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.instructions).text(),
            role: jQuery(self.xml).find(cswjs.getcapabilities.xpaths.role).text(),
            operationNames: self._capabilities_getOperationNames(jQuery(self.xml)),
            constraintsValues: self._capabilities_getValues(jQuery(self.xml), 'constraintsValues')
        };
        return data;
    };

    cswjs.getcapabilities.Xml.prototype._capabilities_getOperationNames = function(xml) {
        var names = [];
        jQuery(xml).find(cswjs.getcapabilities.xpaths.operationNames).each(function() {
            var name = jQuery(this).attr('name');
            names.push(name);
        });
        return names;
    };

    cswjs.getcapabilities.Xml.prototype._capabilities_getValues = function(xml, xpath) {
        var values = [];
        jQuery(xml).find(cswjs.getcapabilities.xpaths[xpath]).each(function() {
            var value = jQuery(this).text();
            values.push(value);
        });
        return values;
    };

    // GetCapabilities operation
    cswjs.getdomain = {};

    cswjs.getdomain.xpaths = {
        propertyName: "csw\\:DomainValues>csw\\:PropertyName, DomainValues>PropertyName",
        values: "csw\\:DomainValues>csw\\:ListOfValues>csw\\:Value, DomainValues>ListOfValues>Value"
    };

    cswjs.getdomain.Xml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    cswjs.getdomain.Xml.prototype.setXml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    // Fonction pour parser fichier getcapabilities retourné par serveur CSW
    cswjs.getdomain.Xml.prototype.toJson = function(xml) {
        var self = this;
        if (xml) {
            self.xml = xml;
        }
        var data = {
            propertyName: jQuery(self.xml).find(cswjs.getdomain.xpaths.propertyName).text(),
            // values: jQuery(self.xml).find(cswjs.getdomain.xpaths.values).text()
            values: self._domain_getValues(jQuery(self.xml), 'values')
        };
        return data;
    };

    cswjs.getdomain.Xml.prototype._domain_getValues = function(xml, xpath) {
        var values = [];
        jQuery(xml).find(cswjs.getdomain.xpaths[xpath]).each(function() {
            var value = jQuery(this).text();
            values.push(value);
        });
        return values;
    };

}(window.cswjs = window.cswjs || {}));