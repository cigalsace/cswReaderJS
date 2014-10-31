$( document ).ready(function() {

    // Fonction pour parser fichier XML retourné par serveur CSW
    function parseXML(xml) {
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
        $(xml).find(xpaths.Data_Keyword).each(function() {
            kw = {
                Data_Keyword: $(this).text()
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
    
    function loadContent() {
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
            $('#txt_cswurl').val(href);
            csw_config.csw_url = href;
            loadContent();
        });
    }
    function on_getCSW() {
        $('.bt_onGetCSW').on('click', function(e){
            e.preventDefault();
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

