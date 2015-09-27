
    // Fonction pour parser fichier XML retourné par serveur CSW
    function parseCSW(xml) {
        var data = {};
        //data.itemsOnPage = csw_config.maxrecords;
        data.nb_records_matched = $(xml).find(xpaths.stats).attr('numberOfRecordsMatched');
        data.nb_records_returned = $(xml).find(xpaths.stats).attr('numberOfRecordsReturned');
        //console.log(data.nb_records_returned);
        data.next_record = $(xml).find(xpaths.stats).attr('nextRecord');
        data.element_set = $(xml).find(xpaths.stats).attr('elementSet');
        data.nb_records_visible = parseInt(data.next_record) - 1;
        if (data.nb_records_visible < 0) {
            data.nb_records_visible = data.nb_records_returned;
        }
        //console.log(data.nb_records_returned);
        
        var mds = [];
        $(xml).find(xpaths.Root).each(function() {
            var MD_HierarchyLevel = $(this).find(xpaths.MD_HierarchyLevel).attr('codeListValue');
            //console.log(MD_HierarchyLevel);
            if (MD_HierarchyLevel == 'service') {
                var Data_Title = $(this).find(xpaths.Service_Title).text();
                var Data_Abstract = $(this).find(xpaths.Service_Abstract).text();
            } else {
                var Data_Title = $(this).find(xpaths.Data_Title).text();
                var Data_Abstract = $(this).find(xpaths.Data_Abstract).text();
            }
          
            // MD fileIdentifier
            var MD_FileIdentifier = $(this).find(xpaths.MD_FileIdentifier).text();
            //console.log(MD_FileIdentifier);
            
            // MD fileName
            /*
            var MD_FileName = $(this).find(xpaths.MD_FileName).text();
            if (MD_FileName == '') {
                MD_FileName = MD_FileIdentifier;
            }
            //console.log(MD_FileName);
            */
            
            // MD URL
            md_config.url = csw_config.url;
            //md_config.id = MD_FileName;
            md_config.id = MD_FileIdentifier;
            var MD_URL = md_urlConstruct(md_config);
        
            // Data title
            //var Data_Title = $(this).find(xpaths.Data_Title).text();
            var truncatevalue = 60;
            var short_Data_Title = Data_Title.substr(0,truncatevalue);
            if (Data_Title.length > short_Data_Title.length) {
                short_Data_Title += "...";
            }
            // Data abstract
            //var Data_Abstract = $(this).find(xpaths.Data_Abstract).text();
            var truncatevalue = 397;
            var short_Data_Abstract = Data_Abstract.substr(0,truncatevalue);
            if (Data_Abstract.length > short_Data_Abstract.length) {
                short_Data_Abstract += "...";
            }
            // Linkage protocols
            var LinkageProtocols = csw_getLinkagesProtocols($(this));
            // Keywords
            var Keywords = csw_getKeywords($(this));
            
            md = {
                MD_FileIdentifier: MD_FileIdentifier,
                //MD_FileName: MD_FileName,
                Data_Title: Data_Title,
                Data_Abstract: Data_Abstract,
                Data_shortTitle: short_Data_Title,
                Data_shortAbstract: short_Data_Abstract,
                Data_BrowseGraphics: csw_getFirstBrowsegraphics($(this)),
                Data_Keywords: Keywords['keywords'],
                Data_listKeywords: Keywords['keywords'].join(', '),
                Data_TopicCategories: csw_getTopicCategories($(this)),
                Data_listTopicCategories: csw_getTopicCategories($(this)).join(', '),
                Data_WMS: LinkageProtocols['wms'],
                Data_WFS: LinkageProtocols['wfs'],
                Data_OD: Keywords['opendata'],
                MD_URL: MD_URL
            }
            mds.push(md);
        });
        data.md = mds;
        //alert(JSON.stringify(data, null, 4));
        return data;
    }
    
    function csw_getFirstBrowsegraphics(xml) {
        var first_bg = $(xml).find(xpaths.Data_BrowseGraphics+':first');
        var bg = {
            Data_BrowseGraphic_Name: first_bg.find(xpaths.Data_BrowseGraphic_Name).text(),
            Data_BrowseGraphic_Description: first_bg.find(xpaths.Data_BrowseGraphic_Description).text(),
            Data_BrowseGraphic_Type: first_bg.find(xpaths.Data_BrowseGraphic_Type).text()
        }
        return bg;
    }
    function csw_getKeywords(xml) {
        var d = {keywords: [], opendata: false};
        $(xml).find(xpaths.Data_Keywords).each(function() {
            kw = $(this).find(xpaths.Data_Keyword).text();
            if (kw.toLowerCase() == 'données ouvertes'.toLowerCase()) {
                d.opendata = true;
            }
            d.keywords.push(kw);
        });
        return d;
    }
    function csw_getTopicCategories(xml) {
        var d = [];
        $(xml).find(xpaths.Data_TopicCategories).each(function() {
            tc = MD_TopicCategoryCode[$(this).find(xpaths.Data_TopicCategory).text()];
            d.push(tc);
        });
        return d;
    }
    function csw_getLinkagesProtocols(xml) {
        var d = [];
        d['wms'] = false;
        d['wfs'] = false;
        $(xml).find(xpaths.Data_Linkages).each(function() {
            Data_LinkageProtocol = MD_LinkageProtocolCode[$(this).find(xpaths.Data_LinkageProtocol).text()];
            if (Data_LinkageProtocol == "WMS") {
                d['wms'] = true;
            } else if (Data_LinkageProtocol == "WFS") {
                d['wfs'] = true;
            }
        });
        return d;
    }
    
    
    /*
    // Charger page principale (template 'content.html')
    function loadContent() {
        csw_config.startposition = 1;
        data.nb_records_visible = 0;
        $.Mustache.load('./templates/content.html')
            .done(function () {
                $('#content').empty().mustache('tpl_content', data);
                $('.bt_nextPage').hide();
                $('.loading').hide();
                loadPage();
            });
    }
    loadContent();
    
    // Charger page de resultats (templates 'list_page.html' et 'page_grid.html')
    function loadPage() {
        var csw_url = urlConstruct(csw_config);
        if (server_url) {
            var url_page = server_url;
            var data_page = {url: csw_url};
        } else {
            var url_page = csw_url;
            data_page = '';
        }
        if (mdReader_url) {
            data['mdReader_url'] = mdReader_url;
        }
        data['csw_url'] = csw_config.csw_url;
        data['csw_url_complete'] = csw_url;
        
        $('#csw_url').attr('href', csw_url).html(csw_config.csw_url);
        
        $('.bt_nextPage').hide();
        $('.loading').show();

        $.ajax({
            type: "POST",
            url: url_page,
            data: data_page,
            dataType: "xml",
            success: function (xml) {
                data = parseXML(xml);
                if (data.md) {
                    console.log(data.nb_records_returned);
                    $('#nb_records_visible').html(data.nb_records_visible);
                    $('#nb_records_matched').html(data.nb_records_matched);
                    $.Mustache.load('./templates/grid_page.html')
                        .done(function () {
                            $('#md_grid').mustache('tpl_gridPage', data);
                        });
                   $.Mustache.load('./templates/list_page.html')
                        .done(function () {
                            $('#md_list').mustache('tpl_listPage', data);
                        });
                    $('.loading').hide();
                    if (data.nb_records_visible < data.nb_records_matched) {
                        $('.bt_nextPage').show();
                    } else {
                        $('.bt_nextPage').hide();
                    }
                    console.log(data.view);
                    if (data.view == 'listView') {
                        $('#md_grid').addClass('uk-hidden');
                        $('#md_list').removeClass('uk-visible-small');
                        $('#bt_gridView').addClass('uk-hidden');
                        $('#bt_listView').removeClass('uk-hidden');
                    } else {
                        $('#md_grid').removeClass('uk-hidden');
                        $('#md_list').addClass('uk-visible-small');
                        $('#bt_gridView').removeClass('uk-hidden');
                        $('#bt_listView').addClass('uk-hidden');
                    }
                }
            },
            error: function (res) {
                alert('Imossible de lire l\'url demandée.');
            }
        });
    }

    function on_nextPage() {
        $(document).on('click', '.bt_nextPage', function(e) {
            e.preventDefault();
            if (data.nb_records_visible<data.nb_records_matched) {
                data.currentPage += 1;
                csw_config.startposition = data.nb_records_visible + 1;
                loadPage();
            }
        });
    }
    on_nextPage();

    function on_search() {
        $(document).on('click', '.bt_onSearch', function(e) {
            e.preventDefault();
            var txt_search = $(this).parent('form').children('input.txt_search').val();
            data.txt_search = txt_search;
            if (txt_search) {
                search_type = 'anyText';
                csw_config.constraint = search_type + "+LIKE+'*" + encodeURIComponent(txt_search) + "*'";
            } else {
                csw_config.constraint = '';
            }
            // Réinitialisation des pages (se replacer sur la première page)
            data.currentPage = 1;
            csw_config.startposition = 1;
            loadContent();
        });
    }
    on_search();
    
    function on_changeCSW() {
        $(document).on('click', '.bt_onChangeCSW', function(e) {
            e.preventDefault();
            var href = $(this).attr('href');
            $('#txt_cswurl').val(href);
            csw_config.csw_url = href;
            loadContent();
        });
    }
    on_changeCSW();
    
    function on_getCSW() {
        $(document).on('click', '.bt_onGetCSW', function(e) {
            e.preventDefault();
            csw_config.csw_url = $('#txt_cswurl').val();
            loadContent();
        });
    }
    on_getCSW();

    function on_changeView() {
        $(document).on('click', '.bt_onChangeView', function(e) {
            e.preventDefault()
            var view = $(this).attr('href');
            data.view = view;
            console.log(view);
            $('#md_grid').toggleClass('uk-hidden');
            $('#md_list').toggleClass('uk-visible-small');
            $('.bt_onChangeView').toggleClass('uk-hidden');
        });
    }
    on_changeView();
    
    function on_viewMd() {
        $(document).on('click', '.bt_onViewMd', function(e) {
            e.preventDefault()
            var url = server_url;
            var data_page = {url: $(this).attr('href')};
            $.ajax({
                type: "POST",
                url: url,
                data: data_page,
                dataType: "html",
                success: function (html) {
                    $("#modal").html(html);
                    var modal = UIkit.modal("#modal")
                    modal.show();
                },
                error: function (res) {
                    alert('Imossible de lire l\'url demandée.');
                }
            });
            //console.log(url);
            //$('#md_grid').toggleClass('uk-hidden');
            //$('#md_list').toggleClass('uk-visible-small');
            //$('.bt_onChangeView').toggleClass('uk-hidden');
        });
    }
    on_viewMd();
    */


