$( document ).ready(function() {
    // Fonction pour parser fichier XML retourné par serveur CSW
    function parseXML(xml) {
        //console.log(csw_list);
        data.itemsOnPage = csw_config.maxrecords;
        data.nb_records_matched = $(xml).find(xpaths.stats).attr('numberOfRecordsMatched');
        data.nb_records_returned = $(xml).find(xpaths.stats).attr('numberOfRecordsReturned');
        data.next_record = $(xml).find(xpaths.stats).attr('nextRecord');
        data.element_set = $(xml).find(xpaths.stats).attr('elementSet');

        var mds = [];
        $(xml).find(xpaths.Root).each(function() {
            // Data title
            var Data_Title = $(this).find(xpaths.Data_Title).text();
            var truncatevalue = 87;
            var short_Data_Title = Data_Title.substr(0,truncatevalue);
            if (Data_Title.length > short_Data_Title.length) {
        short_Data_Title += "...";
            }
            // Data abstract
            var Data_Abstract = $(this).find(xpaths.Data_Abstract).text();
            var truncatevalue = 397;
            var short_Data_Abstract = Data_Abstract.substr(0,truncatevalue);
            if (Data_Abstract.length > short_Data_Abstract.length) {
        short_Data_Abstract += "...";
            }
            
            md = {
        MD_FileIdentifier: $(this).find(xpaths.MD_FileIdentifier).text(),
        Data_Title: short_Data_Title,
        Data_Abstract: short_Data_Abstract,
        Data_BrowseGraphics: getFirstBrowsegraphics($(this)),
        Data_Keywords: getKeywords($(this)),
        Data_TopicCategories: getTopicCategories($(this))
            }
            mds.push(md);
        });
        data.md = mds;
        //alert(JSON.stringify(data, null, 4));
        return data;
    }
    
    /*
    // A garder!
    function getBrowsegraphics(xml) {
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
    */
    function getFirstBrowsegraphics(xml) {
        var first_bg = $(xml).find(xpaths.Data_BrowseGraphics+':first');
        var bg = {
            Data_BrowseGraphic_Name: first_bg.find(xpaths.Data_BrowseGraphic_Name).text(),
            Data_BrowseGraphic_Description: first_bg.find(xpaths.Data_BrowseGraphic_Description).text(),
            Data_BrowseGraphic_Type: first_bg.find(xpaths.Data_BrowseGraphic_Type).text()
        }
        return bg;
    }
    function getKeywords(xml) {
        var d = [];
        $(xml).find(xpaths.Data_Keywords).each(function() {
            kw = {
        Data_Keyword: $(this).find(xpaths.Data_Keyword).text()
            }
            d.push(kw);
        });
        return d;
    }
    function getTopicCategories(xml) {
        var d = [];
        $(xml).find(xpaths.Data_TopicCategories).each(function() {
            tc = {
        Data_TopicCategory: MD_TopicCategoryCode[$(this).find(xpaths.Data_TopicCategory).text()]
            }
            d.push(tc);
        });
        return d;
    }
    /* A garder
    function parseKeywords(xml) {
        var data = {
            nb_records_matched: $(xml).find(xpaths.stats).attr('numberOfRecordsMatched'),
            nb_records_returned: $(xml).find(xpaths.stats).attr('numberOfRecordsReturned'),
            next_record: $(xml).find(xpaths.stats).attr('nextRecord'),
            element_set: $(xml).find(xpaths.stats).attr('elementSet'),
            kws: []
        }
        
        // Générer la liste des mots-clés
        var kws1 = {};
        var kws_list = [];
        $(xml).find(xpaths.Data_Keywords).each(function() {
            kw = $(this).find(xpaths.Data_Keyword).text();
            // Traiter les kw en double
            if ($.inArray(kw, kws_list) == -1) {
        kws_list.push(kw);
        kws1[kw] = 1;
            } else {
        kws1[kw] = kws1[kw]+1;
            }
        });
        
        // A mettre dans fichier helpers
        
        // Trier la liste des mots-clés
        var kws2 = [];
        var em1 = 1; // taille mini en em
        var em2 = 2; // taille maxi en em
        var em = 0;
        for (k in kws1) {
            em = (kws1[k] - min_max(kws1, 'max')) * ((em1 - em2)/(min_max(kws1, 'min') - min_max(kws1, 'max'))) + em2;
            kws2.push({ name: k, nb: kws1[k], size: em.toFixed(1) })
        }

        kws2.sort(compare);
        
        // Limiter le nombre de résultats
        var kws3 = [];
        i = 0;
        for (k in kws2) {
            if (i < 10) {
        kws3.push(kws2[k]);
            }
            i += 1;
        }
        
        //alert(JSON.stringify(kws3, null, 4));
        //alert(min_max(kws1, 'min') + ' - ' + min_max(kws1, 'max'));
        data['kws'] = kws3;
        return data;
    }
    */
    
    function loadContent() {
        /*
        if (csw_config.csw_url == '') {
            var cswurl = csw_list.csw[csw_config.csw_id].url;
        } else {
            var cswurl = csw_config.csw_url;
        }
        var csw_url = urlConstruct(cswurl, csw_config);
        */
        if (param_csw) {
            csw_config.csw_url = param_csw;
            $('#txt_cswurl').val(param_csw);
        }
        var csw_url = urlConstruct(csw_config.csw_url, csw_config);
        
        if (server_url) {
            var url_page = server_url;
            var data_page = {url: csw_url};
        } else {
            var url_page = csw_url;
            data_page = '';
        }
        
        if (mdReader.url) {
            data['mdReader_url'] = mdReader.url;
        }
        data['csw_url'] = csw_config.csw_url;
        data['csw_url_complete'] = csw_url;
        
        $.ajax({
            type: "POST",
            url: url_page,
            data: data_page,
            dataType: "xml",
            success: function (xml) {
                data = parseXML(xml);
                if (data.md) {
                    $.Mustache.load('./templates/content.html')
                        .done(function () {
                            $('#content').empty().mustache('tpl_content', data);
                            if (data.view == 'listView') {
                                $('.switchView').toggleClass('uk-hidden');
                                $('.bt_onChangeView').toggleClass('uk-hidden');
                            }
                            on_changePage();
                            on_search();
                            on_changeCSW();
                            on_getCSW();
                            on_changeItemsOnPage();
                            on_changeView();
                        });
                }
                
            },
            error: function (res) {
                alert('Imossible de lire l\'url demandée.');
            }
        });
    }
    loadContent();
    
    function on_changePage() {
        $('#pagination').on('uk-select-page', function(e, pageIndex){
            data.currentPage = pageIndex+1;
            csw_config.startposition = (csw_config.maxrecords * pageIndex) + 1;
            loadContent();
        });
    }
    function on_search() {
        $('.bt_onSearch').on('click', function(e){
            e.preventDefault();
            var txt_search = $('#txt_search').val();
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
    function on_changeCSW() {
        $('.bt_onChangeCSW').on('click', function(e){
            e.preventDefault();
            var href = $(this).attr('href');
            //csw_config.csw_id = href;
            //$('#txt_cswurl').val(csw_list.csw[csw_config.csw_id].url);
            $('#txt_cswurl').val(href);
            csw_config.csw_url = href;
            loadContent();
        });
    }
    function on_getCSW() {
        $('.bt_onGetCSW').on('click', function(e){
            e.preventDefault();
            //var cswurl = $('#txt_cswurl').val();
            //csw_config.csw_id = '';
            csw_config.csw_url = $('#txt_cswurl').val();
            loadContent();
        });
    }
    function on_changeItemsOnPage() {
        $('.bt_onChangeItemsOnPage').on('click', function(e){
            e.preventDefault()
            var itemsOnPage = $(this).attr('href');
            csw_config.maxrecords = itemsOnPage;
            data.currentPage = 1;
            csw_config.startposition = 1;
            loadContent();
        });
    }
    function on_changeView() {
        $('.bt_onChangeView').on('click', function(e){
            e.preventDefault()
            var view = $(this).attr('href');
            data.view = view;
            $('.switchView').toggleClass('uk-hidden');
            $('.bt_onChangeView').toggleClass('uk-hidden');
        });
    }
});

