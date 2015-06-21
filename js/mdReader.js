//$( document ).ready(function() {
    // Définition de la langue pour les labels de la page.
    //var lang = 'fr';
    // Initialisation de la variable globale data
    //var data = {};
    //data['app'] = app;
    //data['md_config'] = md_config;

    // Fonction pour parser fichier XML retourné par serveur CSW
    function parseMD(xml) {
        // MD HierarchyLevel
        var MD_HierarchyLevel = $(xml).find(xpaths.MD_HierarchyLevel).attr('codeListValue');
        if (MD_HierarchyLevel == 'service') {
            var Data_Title = $(xml).find(xpaths.Service_Title).text();
            var Data_Abstract = $(xml).find(xpaths.Service_Abstract).text();
            var Data_Dates = md_getDates($(xml), 'Service_Dates');
            var Data_PointOfContacts = md_getContacts($(xml), 'Service_PointOfContacts');
            var Data_Languages = md_getLanguages($(xml), 'Service_Languages');
            var Data_MaintenanceFrequency = md_getMaintenanceFrequency($(xml), 'Service_MaintenanceFrequency');
            var Data_CharacterSet = md_getCharacterSet($(xml), 'Service_CharacterSet');
            var Data_GeographicExtents = md_getExtents($(xml), 'GeographicExtents', 'Service_Extents');
            var Data_TemporalExtents = md_getExtents($(xml), 'TemporalExtents', 'Service_Extents');
        } else {
            var Data_Title = $(xml).find(xpaths.Data_Title).text();
            var Data_Abstract = $(xml).find(xpaths.Data_Abstract).text();
            var Data_Dates = md_getDates($(xml), 'Data_Dates');
            var Data_PointOfContacts = md_getContacts($(xml), 'Data_PointOfContacts');
            var Data_Languages = md_getLanguages($(xml), 'Data_Languages');
            var Data_MaintenanceFrequency = md_getMaintenanceFrequency($(xml), 'Data_MaintenanceFrequency');
            var Data_CharacterSet = md_getCharacterSet($(xml), 'Data_CharacterSet');
            var Data_GeographicExtents = md_getExtents($(xml), 'GeographicExtents', 'Data_Extents');
            var Data_TemporalExtents = md_getExtents($(xml), 'TemporalExtents', 'Data_Extents');
        }
        // Data title
        var truncatevalue = 87;
        var short_Data_Title = Data_Title.substr(0,truncatevalue);
        if (Data_Title.length > short_Data_Title.length) {
            short_Data_Title += "...";
        }
        // Data abstract
        var truncatevalue = 397;
        var short_Data_Abstract = Data_Abstract.substr(0,truncatevalue);
        if (Data_Abstract.length > short_Data_Abstract.length) {
            short_Data_Abstract += "...";
        }
        
        var md = {
            // MD
            //MD_FileIdentifier: $(xml).find(xpaths.MD_FileIdentifier).text(),
			MD_FileIdentifier: md_getFileIdentifier($(xml)),
            MD_Contacts: md_getContacts($(xml), 'MD_Contacts'),
            // MD_Contacts: MD_Contacts,
            MD_Language: MD_LanguageCode[$(xml).find(xpaths.MD_Language).attr('codeListValue')],
            MD_CharacterSet: MD_CharacterSetCode[$(xml).find(xpaths.MD_CharacterSet).attr('codeListValue')],
            MD_HierarchyLevel: MD_ScopeCode[MD_HierarchyLevel],
            MD_DateStamp: $(xml).find(xpaths.MD_DateStamp).text(),
            MD_StandardName: $(xml).find(xpaths.MD_StandardName).text(),
            MD_StandardVersion: $(xml).find(xpaths.MD_StandardVersion).text(),
            // Data
            short_Data_Title: short_Data_Title,
            Data_Title: Data_Title,
            short_Data_Abstract: short_Data_Abstract,
            Data_ReferenceSystems: md_getReferenceSystems($(xml)),
            Data_Identifiers: md_getIdentifiers($(xml)),
            Data_Abstract: Data_Abstract,
            Data_PointOfContacts: Data_PointOfContacts,
            // Data_PointOfContacts: Data_PointOfContacts,
            Data_BrowseGraphics: md_getBrowsegraphics($(xml)),
            Data_Dates: Data_Dates,
            // Data_MaintenanceFrequency: $(xml).find(xpaths.Data_MaintenanceFrequency).text(),
            Data_MaintenanceFrequency: Data_MaintenanceFrequency,
            Data_Keywords: md_getKeywords($(xml)),
            Data_UseLimitations: md_getUseLimitations($(xml), 'Data_UseLimitations'),
            Data_Legal_UseLimitations: md_getUseLimitations($(xml), 'Data_Legal_UseLimitations'),
            Data_AccessRestrictionCodes: md_getAccessRestrictionCodes($(xml)),
            Data_AccessOtherConstraints: md_getAccessOtherConstraints($(xml)),
            Data_UseRestrictionCodes: md_getUseRestrictionCodes($(xml)),
            // Data_UseOtherConstraints: md_getUseOtherConstraints($(xml)),
            Data_Classification: MD_ClassificationCode[$(xml).find(xpaths.Data_Classification).attr('codeListValue')],
            // Data_SpatialRepresentationType: $(xml).find(xpaths.Data_SpatialRepresentationType).text(),
            Data_SpatialRepresentationType: md_getSpatialRepresentationType($(xml)),
            Data_ScaleDenominator: $(xml).find(xpaths.Data_ScaleDenominator).text(),
            Data_ScaleDistance: $(xml).find(xpaths.Data_ScaleDistance).text(),
            //Data_Languages: md_getChildren(xml, 'Data_Languages'),
            Data_Languages: Data_Languages,
            Data_CharacterSet: Data_CharacterSet,
            Data_TopicCategories: md_getTopicCategories($(xml)),
            Data_GeographicExtents: Data_GeographicExtents,
            Data_TemporalExtents: Data_TemporalExtents,
            Data_DistFormats: md_getDistFormats($(xml)),
            Data_Linkages: md_getLinkages($(xml)),
            Data_DQ_Level: MD_ScopeCode[$(xml).find(xpaths.Data_DQ_Level).attr('codeListValue')],
            Data_LI_Statement: $(xml).find(xpaths.Data_LI_Statement).text(),
            Data_DQ_Conformities: md_getConformities($(xml))
        }
        //data.md = md;
        //data.lb = lb[lang];
        return md;
    }
	function md_getFileIdentifier(xml) {
        return $(xml).find(xpaths.MD_FileIdentifier).text();
    }
	function md_getReferenceSystems(xml) {
        var data = [];
        $(xml).find(xpaths.Data_ReferenceSystems).each(function() {
            rf = {
                Data_ReferenceSystemCode: $(this).find(xpaths.Data_ReferenceSystemCode).text(),
                Data_ReferenceSystemCodespace: $(this).find(xpaths.Data_ReferenceSystemCodespace).text()
            };
            data.push(rf);
        });
        return data;
    }
    function md_getIdentifiers(xml) {
        var data = [];
        $(xml).find(xpaths.Data_Identifiers).each(function() {
            id = {
                Data_Code: $(this).find(xpaths.Data_Code).text(),
                Data_CodeSpace: $(this).find(xpaths.Data_CodeSpace).text()
            };
            data.push(id);
        });
        return data;
    }
	function md_getContacts(xml, path_contacts) {
        var contacts = [];
        $(xml).find(xpaths[path_contacts]).each(function() {		
			cnt = {
				CntName: $(this).find(xpaths.CntName).text(),
				CntFunction: $(this).find(xpaths.CntFunction).text(),
                CntOrganism: $(this).find(xpaths.CntOrganism).text(),
                CntAddress: $(this).find(xpaths.CntAddress).text(),
                CntPostalCode: $(this).find(xpaths.CntPostalCode).text(),
                CntCity: $(this).find(xpaths.CntCity).text(),
                CntPhone: $(this).find(xpaths.CntPhone).text(),
                CntEmail: $(this).find(xpaths.CntEmail).text(),
                CntRole: CI_RoleCode[$(this).find(xpaths.CntRole).attr('codeListValue')],
                CntLogo: $(this).find(xpaths.CntLogo).text(),
                CntLogo_url: $(this).find(xpaths.CntLogo).attr('src')
            };
            contacts.push(cnt);
        });
        // console.log(JSON.stringify(contacts, null, 4));
        return contacts;
    }
    function md_getBrowsegraphics(xml) {
        var data = [];
        $(xml).find(xpaths.Data_BrowseGraphics).each(function() {
            bg = {
                Data_BrowseGraphic_Name: $(this).find(xpaths.Data_BrowseGraphic_Name).text(),
                Data_BrowseGraphic_Description: $(this).find(xpaths.Data_BrowseGraphic_Description).text(),
                Data_BrowseGraphic_Type: $(this).find(xpaths.Data_BrowseGraphic_Type).text()
            }
            data.push(bg);
        });
        return data;
    }

    function md_getSpatialRepresentationType(xml) {
        var Data_SpatialRepresentationType = $(xml).find(xpaths.Data_SpatialRepresentationType).attr('codeListValue');
        //lb[lang]['Data_SpatialRepresentationType_description'] = MD_SpatialRepresentationTypeCode[Data_SpatialRepresentationType]['description'];
        return MD_SpatialRepresentationTypeCode[Data_SpatialRepresentationType]['name'];
    }
    
    function md_getMaintenanceFrequency(xml, xpath_maintenanceFrequency) {
        var Data_MaintenanceFrequency = $(xml).find(xpaths[xpath_maintenanceFrequency]).attr('codeListValue');
        return MD_MaintenanceFrequencyCode[Data_MaintenanceFrequency];
    }
    function md_getCharacterSet(xml, xpath_characterSet) {
        var Data_CharacterSet = $(xml).find(xpaths[xpath_characterSet]).attr('codeListValue');
        return MD_CharacterSetCode[Data_CharacterSet];
    }
    function md_getDates(xml, xpath_dates) {
        var data = {};
        $(xml).find(xpaths[xpath_dates]).each(function() {
            var Date = $(this).find(xpaths.Date).text();
            var DateType = $(this).find(xpaths.DateType).text();
            if (DateType == 'creation') {
                data['DateCreation'] = Date;
            } else if (DateType == 'publication') {
                data['DatePublication'] = Date;
            } else if (DateType == 'revision') {
                data['DateRevision'] = Date;
            }
        });
        return data;
    }
    function md_getKeywords(xml) {
        var data = [];
        $(xml).find(xpaths.Data_Keywords).each(function() {
            kw = {
                Data_Keyword: $(this).find(xpaths.Data_Keyword).text(),
                Data_KeywordType: $(this).find(xpaths.Data_KeywordType).attr('codeListValue'),
                Data_ThesaurusName: $(this).find(xpaths.Data_ThesaurusName).text(),
                Data_ThesaurusDates: md_getDates($(this), 'Data_ThesaurusDates'),
            }
            data.push(kw);
        });
        return data;
    }
    function md_getUseLimitations(xml, uselimitations) {
        var data = [];
        $(xml).find(xpaths[uselimitations]).each(function() {
            ul = {
                Data_UseLimitation: $(this).find(xpaths.Data_UseLimitation).text()
            }
            data.push(ul);
        });
        return data;
    }
    function md_getAccessRestrictionCodes(xml) {
        var data = [];
        $(xml).find(xpaths.Data_AccessConstraints).each(function() {
            var restriction = $(this).find(xpaths.Data_RestrictionCode).attr('codeListValue');
            if (restriction != 'otherRestrictions') {
                ac = {
                    Data_RestrictionCode: MD_RestrictionCode[restriction],
                }
                data.push(ac);
            }
        });
        return data;
    }
    function md_getAccessOtherConstraints(xml) {
        var data = [];
        $(xml).find(xpaths.Data_AccessConstraint_OtherConstraints).each(function() {
            ac = {
                Data_OtherConstraint: $(this).find(xpaths.Data_OtherConstraint).text(),
            }
            data.push(ac);
        });
        return data;
    }
    function md_getUseRestrictionCodes(xml) {
        var data = [];
        $(xml).find(xpaths.Data_UseConstraints).each(function() {
            var restriction = $(this).find(xpaths.Data_RestrictionCode).attr('codeListValue');
            if (restriction != 'otherRestrictions') {
                ac = {
                    Data_RestrictionCode: MD_RestrictionCode[restriction],
                }
                data.push(ac);
            }
        });
        return data;
    }
    
    function md_getLanguages(xml, xpath_languages) {
        var data = [];
        $(xml).find(xpaths[xpath_languages]).each(function() {
            lg = {
                Data_Language: MD_LanguageCode[$(this).find(xpaths.Data_Language).attr('codeListValue')]
            }
            data.push(lg);
        });
        return data;
    }
    function md_getExtents(xml, extentType, xpath_extents) {
        var data_geo = [];
        var data_temp = []
        $(xml).find(xpaths[xpath_extents]).each(function() {
            Data_ExtentName = $(this).find(xpaths.Data_ExtentName).text();
            Data_ExtentNorthbound = $(this).find(xpaths.Data_ExtentNorthbound).text();
            Data_ExtentSouthbound = $(this).find(xpaths.Data_ExtentSouthbound).text();
            Data_ExtentEastbound = $(this).find(xpaths.Data_ExtentEastbound).text();
            Data_ExtentWestbound = $(this).find(xpaths.Data_ExtentWestbound).text();
            Data_TemporalExtent_Begin = $(this).find(xpaths.Data_TemporalExtent_Begin).text();
            Data_TemporalExtent_End = $(this).find(xpaths.Data_TemporalExtent_End).text();
            if (Data_TemporalExtent_Begin) {
                ext = {
                    Data_ExtentName: Data_ExtentName,
                    Data_TemporalExtent_Begin: Data_TemporalExtent_Begin,
                    Data_TemporalExtent_End: Data_TemporalExtent_End
                }
                data_temp.push(ext);
            } else {
                ext = {
                    Data_ExtentName: Data_ExtentName,
                    Data_ExtentNorthbound: Data_ExtentNorthbound,
                    Data_ExtentSouthbound: Data_ExtentSouthbound,
                    Data_ExtentEastbound: Data_ExtentEastbound,
                    Data_ExtentWestbound: Data_ExtentWestbound
                }
                data_geo.push(ext);
            }
        });
        if (extentType == 'GeographicExtents') {
            return data_geo;    
        }
        return data_temp;
    }    
    function md_getTopicCategories(xml) {
        var d = [];
        $(xml).find(xpaths.Data_TopicCategories).each(function() {
            tc = {
                Data_TopicCategory: MD_TopicCategoryCode[$(this).find(xpaths.Data_TopicCategory).text()]
            }
            d.push(tc);
        });
        return d;
    }
    function md_getDistFormats(xml) {
        var data = [];
        $(xml).find(xpaths.Data_DistFormats).each(function() {
            df = {
                Data_DistFormatName: $(this).find(xpaths.Data_DistFormatName).text(),
                Data_DistFormatVersion: $(this).find(xpaths.Data_DistFormatVersion).text(),
                Data_DistFormatSpecification: $(this).find(xpaths.Data_DistFormatSpecification).text()
            }
            data.push(df);
        });
        return data;
    }
    function md_getLinkages(xml) {
        var data = [];
        $(xml).find(xpaths.Data_Linkages).each(function() {
            df = {
                Data_LinkageName: $(this).find(xpaths.Data_LinkageName).text(),
                Data_LinkageDescription: $(this).find(xpaths.Data_LinkageDescription).text(),
                Data_LinkageURL: $(this).find(xpaths.Data_LinkageURL).text()
            }
            data.push(df);
        });
        return data;
    }
    function md_getConformities(xml) {
        var data = [];
        $(xml).find(xpaths.Data_DQ_Conformities).each(function() {
            dc = {
                //Data_LinkageName: $(this).find(xpaths.Data_LinkageName).text(),
                Data_DQ_ConformityTest: $(this).find(xpaths.Data_DQ_ConformityTest).text(),
                Data_DQ_ConformityDates: md_getDates($(this), 'Data_DQ_ConformityDates'),
                Data_DQ_ConformityResult: $(this).find(xpaths.Data_DQ_ConformityResult).text(),
                Data_DQ_ConformityPass: $(this).find(xpaths.Data_DQ_ConformityPass).text()
            }
            data.push(dc);
        });
        return data;
    }

    /*
    function loadContent() {
        var md_url = md_urlConstruct(md_config);
        data['md_url'] = md_url;
        console.log(md_url);
        
        if (server_url) {
            var url_page = server_url;
            var data_page = {url: md_url};
        } else {
            var url_page = md_url;
            data_page = '';
        }
        
        $.ajax({
            type: "POST",
            url: url_page,
            data: data_page,
            dataType: "xml",
            success: function (xml) {
                console.log('xml:' + xml);
                data = parseXML(xml);
                if (data.md) {
                    //console.log('./templates/'+app.template);
                    $.Mustache.load('./templates/'+app.template)
                        .done(function () {
                            $('#content').empty().mustache('tpl_content', data);
                        });
                    $.getScript("js/lib/uikit.min.js");
                    $.getScript("js/lib/components/sticky.min.js");
                }
        
            },
            error: function (res) {
                alert('Imossible de lire l\'url demandée.');
            }
        });
    }
    loadContent();
    */
//});