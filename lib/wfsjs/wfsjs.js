var wfsjs = {};

(function(wfsjs, undefined) {
    "use strict";
    jQuery.noConflict();

    // GetCapabilities operation
    wfsjs.getcapabilities = {};

    wfsjs.getcapabilities.xpaths = {
        title: "ows\\:ServiceIdentification>ows\\:Title, ServiceIdentification>Title",
        abstract: "ows\\:ServiceIdentification>ows\\:Abstract, ServiceIdentification>Abstract",
        keywords: "ows\\:ServiceIdentification>ows\\:Keywords>ows\\:Keyword, ServiceIdentification>Keywords>Keyword",
        serviceType: "ows\\:ServiceIdentification>ows\\:ServiceType, ServiceIdentification>ServiceType",
        serviceVersion: "ows\\:ServiceIdentification>ows\\:ServiceTypeVersion, ServiceIdentification>ServiceTypeVersion",
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
        _constraintsValues: "ows\\:OperationsMetadata>ows\\:Operation[name='GetRecords']>ows\\:Constraint[name='SupportedISOQueryables']>ows\\:Value, OperationsMetadata>Operation[name='GetRecords']>Constraint[name='SupportedISOQueryables']>Value",
        getFeatureOutputFormats: "ows\\:OperationsMetadata>ows\\:Operation[name='GetFeature']>ows\\:Parameter[name='outputFormat']>ows\\:AllowedValues>ows\\:Value, OperationsMetadata>Operation[name='GetFeature']>Parameter[name='outputFormat']>AllowedValues>Value"
    };

    // Url object
    wfsjs.getcapabilities.Url = function(url) {
        if (url) {
            this.url = url.split('?')[0] + "?service=WFS&version=2.0.0&request=GetCapabilities";
        } else {
            this.url = '';
        }
        return this;
    };

    wfsjs.getcapabilities.Url.prototype.setUrl = function(url) {
        if (url) {
            this.url = url.split('?')[0] + "?service=WFS&version=2.0.0&request=GetCapabilities";
        } else {
            this.url = '';
        }
        return this;
    };


    // Xml object
    wfsjs.getcapabilities.Xml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    wfsjs.getcapabilities.Xml.prototype.setXml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    // Fonction pour parser fichier getcapabilities retourné par serveur WFS
    wfsjs.getcapabilities.Xml.prototype.toJson = function(xml) {
        var self = this;
        if (xml) {
            self.xml = xml;
        }
        var data = {
            title: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.title).text(),
            abstract: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.abstract).text(),
            keywords: self._capabilities_getValues(jQuery(self.xml), 'keywords'),
            // keywords: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.keywords).text(),
            serviceType: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.serviceType).text(),
            serviceVersion: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.serviceVersion).text(),
            fees: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.fees).text(),
            accessConstraints: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.accessConstraints).text(),
            providerName: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.providerName).text(),
            providerSite: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.providerSite).attr('xlink:href'),
            individualName: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.individualName).text(),
            positionName: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.positionName).text(),
            phoneVoice: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.phoneVoice).text(),
            address: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.address).text(),
            city: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.city).text(),
            area: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.area).text(),
            postalCode: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.postalCode).text(),
            country: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.country).text(),
            email: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.email).text(),
            hours: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.hours).text(),
            instructions: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.instructions).text(),
            role: jQuery(self.xml).find(wfsjs.getcapabilities.xpaths.role).text(),
            operationNames: self._capabilities_getOperationNames(jQuery(self.xml)),
            // constraintsValues: self._capabilities_getValues(jQuery(self.xml), 'constraintsValues')
            getFeatureOutputFormats: self._capabilities_getValues(jQuery(self.xml), 'getFeatureOutputFormats')
        };
        return data;
    };

    wfsjs.getcapabilities.Xml.prototype._capabilities_getOperationNames = function(xml) {
        var names = [];
        jQuery(xml).find(wfsjs.getcapabilities.xpaths.operationNames).each(function() {
            var name = jQuery(this).attr('name');
            names.push(name);
        });
        return names;
    };

    wfsjs.getcapabilities.Xml.prototype._capabilities_getValues = function(xml, xpath) {
        var values = [];
        jQuery(xml).find(wfsjs.getcapabilities.xpaths[xpath]).each(function() {
            var value = jQuery(this).text();
            values.push(value);
        });
        return values;
    };

    /*
    // GetDomain operation
    wfsjs.getdomain = {};

    wfsjs.getdomain.xpaths = {
        propertyName: "csw\\:DomainValues>csw\\:PropertyName, DomainValues>PropertyName",
        values: "csw\\:DomainValues>csw\\:ListOfValues>csw\\:Value, DomainValues>ListOfValues>Value"
    };

    wfsjs.getdomain.Xml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    wfsjs.getdomain.Xml.prototype.setXml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    // Fonction pour parser fichier getcapabilities retourné par serveur CSW
    wfsjs.getdomain.Xml.prototype.toJson = function(xml) {
        var self = this;
        if (xml) {
            self.xml = xml;
        }
        var data = {
            propertyName: jQuery(self.xml).find(wfsjs.getdomain.xpaths.propertyName).text(),
            // values: jQuery(self.xml).find(wfsjs.getdomain.xpaths.values).text()
            values: self._domain_getValues(jQuery(self.xml), 'values')
        };
        return data;
    };

    wfsjs.getdomain.Xml.prototype._domain_getValues = function(xml, xpath) {
        var values = [];
        jQuery(xml).find(wfsjs.getdomain.xpaths[xpath]).each(function() {
            var value = jQuery(this).text();
            values.push(value);
        });
        return values;
    };
    */

    /*
    // Get Records operation
    wfsjs.getrecords = {};

    wfsjs.getrecords.xpaths = {
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


    wfsjs.codes = {
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

    wfsjs.getrecords.Xml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    wfsjs.getrecords.Xml.prototype.setXml = function(xml) {
        if (xml) {
            this.xml = xml;
        } else {
            this.xml = '';
        }
        return this;
    };

    // Fonction pour parser fichier XML retourné par serveur CSW
    wfsjs.getrecords.Xml.prototype.toJson = function(xml) {
        var self = this;
        if (xml) {
            self.xml = xml;
        }
        var data = {};
        data.nb_records_matched = parseInt(jQuery(self.xml).find(wfsjs.getrecords.xpaths.stats).attr('numberOfRecordsMatched'));
        data.nb_records_returned = parseInt(jQuery(self.xml).find(wfsjs.getrecords.xpaths.stats).attr('numberOfRecordsReturned'));
        data.next_record = parseInt(jQuery(self.xml).find(wfsjs.getrecords.xpaths.stats).attr('nextRecord'));
        if (data.next_record === 0) {
            data.next_record = data.nb_records_matched + 1;
        }
        data.element_set = jQuery(self.xml).find(wfsjs.getrecords.xpaths.stats).attr('elementSet');
        data.nb_records_visible = data.next_record - 1;
        if (data.nb_records_visible < 0) {
            data.nb_records_visible = data.nb_records_returned;
        }

        var mds = [];
        jQuery(self.xml).find(wfsjs.getrecords.xpaths.Root).each(function() {
            var MD_HierarchyLevel = jQuery(this).find(wfsjs.getrecords.xpaths.MD_HierarchyLevel).attr('codeListValue');
            var Data_Title;
            var Data_Abstract;
            //console.log(MD_HierarchyLevel);
            if (MD_HierarchyLevel == 'service') {
                Data_Title = jQuery(this).find(wfsjs.getrecords.xpaths.Service_Title).text();
                Data_Abstract = jQuery(this).find(wfsjs.getrecords.xpaths.Service_Abstract).text();
            } else {
                Data_Title = jQuery(this).find(wfsjs.getrecords.xpaths.Data_Title).text();
                Data_Abstract = jQuery(this).find(wfsjs.getrecords.xpaths.Data_Abstract).text();
            }

            // MD fileIdentifier
            var MD_FileIdentifier = jQuery(this).find(wfsjs.getrecords.xpaths.MD_FileIdentifier).text();

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

    wfsjs.getrecords.Xml.prototype._csw_getFirstBrowsegraphics = function(xml) {
        var random = (Date.now()).toString();
        var first_bg = jQuery(xml).find(wfsjs.getrecords.xpaths.Data_BrowseGraphics + ':first');
        var bg = {
            Data_BrowseGraphic_Name: first_bg.find(wfsjs.getrecords.xpaths.Data_BrowseGraphic_Name).text() + "?cb=" + random,
            Data_BrowseGraphic_Description: first_bg.find(wfsjs.getrecords.xpaths.Data_BrowseGraphic_Description).text(),
            Data_BrowseGraphic_Type: first_bg.find(wfsjs.getrecords.xpaths.Data_BrowseGraphic_Type).text()
        };
        return bg;
    };

    wfsjs.getrecords.Xml.prototype._csw_getKeywords = function(xml) {
        var d = {
            keywords: [],
            opendata: false
        };
        jQuery(xml).find(wfsjs.getrecords.xpaths.Data_Keywords).each(function() {
            var kw = jQuery(this).find(wfsjs.getrecords.xpaths.Data_Keyword).text();
            if (kw.toLowerCase() == 'données ouvertes'.toLowerCase()) {
                d.opendata = true;
            }
            d.keywords.push(kw);
        });
        return d;
    };

    wfsjs.getrecords.Xml.prototype._csw_getTopicCategories = function(xml) {
        var d = [];
        jQuery(xml).find(wfsjs.getrecords.xpaths.Data_TopicCategories).each(function() {
            var tc = wfsjs.codes.MD_TopicCategoryCode[jQuery(this).find(wfsjs.getrecords.xpaths.Data_TopicCategory).text()];
            d.push(tc);
        });
        return d;
    };

    wfsjs.getrecords.Xml.prototype._csw_getLinkageProtocols = function(xml) {
        var d = [];
        d.wms = false;
        d.wfs = false;
        jQuery(xml).find(wfsjs.getrecords.xpaths.Data_Linkages).each(function() {
            var Data_LinkageProtocol = wfsjs.codes.MD_LinkageProtocolCode[jQuery(this).find(wfsjs.getrecords.xpaths.Data_LinkageProtocol).text()];
            if (Data_LinkageProtocol == "WMS") {
                d.wms = true;
            } else if (Data_LinkageProtocol == "WFS") {
                d.wfs = true;
            }
        });
        return d;
    };
    */


}(window.wfsjs = window.wfsjs || {}));
