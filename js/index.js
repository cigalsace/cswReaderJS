$( document ).ready(function() {

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
        var csw_url = csw_urlConstruct(csw_config);
        if (server_url) {
            var url_page = server_url;
            var data_page = {url: csw_url};
        } else {
            var url_page = csw_url;
            data_page = '';
        }
        /*
        if (mdReader_url) {
            data['mdReader_url'] = mdReader_url;
        }
        */
        data['csw_url'] = csw_config.csw_url;
        data['csw_url_complete'] = csw_url;
        
        $('#csw_url').attr('href', csw_url).html(csw_config.csw_url);
        
        $('.bt_nextPage').hide();
        $('.loading').show();
        
        console.log(url_page);
        console.log(data_page);

        $.ajax({
            type: "POST",
            url: url_page,
            data: data_page,
            dataType: "xml",
            success: function (xml) {
                data = parseCSW(xml);
                if (data.md) {
                    //console.log(data.nb_records_returned);
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
                    //console.log(data.view);
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
                
                alert('Impossible de lire l\'url demandée.');
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
                csw_config.constraint = search_type + "+LIKE+'" + encodeURIComponent('%'+txt_search+'%') + "'";
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
            var md_url = $(this).attr('href');
            var data_page = {url: md_url};
            $.ajax({
                type: "POST",
                url: url,
                data: data_page,
                dataType: "xml",
                success: function(xml) {
                    md = parseMD(xml);
                    md.md_url = md_url;
                    md.app = app;
                    if (md) {
                        //$("#modal").html(xml);
                        //alert(xml + url);
                        $.Mustache.load('./templates/'+app.template)
                            .done(function () {
                                $('#modal_mdcontent').empty().mustache('tpl_modal', md);
                            });
                        var modal = UIkit.modal("#modal_md")
                        modal.show();
                        //console.log(md);
                    }
                },
                error: function (res) {
                    alert('Impossible de lire l\'url demandée.');
                }
            });
        });
    }
    on_viewMd();

});

