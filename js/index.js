/*
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
                        $('#md_grid').addClass('hidden');
                        $('#md_list').removeClass('visible-xs-block');
                        $('#bt_gridView').addClass('hidden');
                        $('#bt_listView').removeClass('hidden');
                    } else {
                        $('#md_grid').removeClass('hidden');
                        $('#md_list').addClass('visible-xs-block');
                        $('#bt_gridView').removeClass('hidden');
                        $('#bt_listView').addClass('hidden');
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
            $('#md_grid').toggleClass('hidden');
            $('#md_list').toggleClass('visible-xs-block');
            $('.bt_onChangeView').toggleClass('hidden');
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
*/



//"use strict";

/**
 * Déclaration de l'application Angular JS mdEditApp
 */
var cswReaderApp = angular.module('cswReaderApp', [
    // Dépendance
    'ui.bootstrap',
    'cswReader'
]);

// Déclaration du module mdEdit
var cswReader = angular.module('cswReader',[]);

// Contrôleur de l'application mdReader
cswReader.controller('cswReaderCtrl', ['$scope', '$http', '$sce',  '$modal', '$log', function ($scope, $http, $sce,  $modal, $log) {
    $scope.app = app;
    $scope.server = server_url;
    $scope.config = config;
    $scope.constraint_type_search_list = constraint_type_search_list;
    $scope.csw_list = csw_list;
    $scope.csw_config = csw_config;
    $scope.md_config = md_config;
    $scope.data = {};
    $scope.data.md = [];
    $scope.status = { nextPage: false };

    function getData(add) {
        add = add || false;
        var csw_url = csw_urlConstruct($scope.csw_config);
        if (server_url) {
            var url_page = server_url;
            var params_page = csw_url;
        } else {
            var url_page = csw_url;
            params_page = '';
        }
        $http.get(url_page +'?url=' + encodeURIComponent(params_page)).success(function(xml) {
            var data = parseCSW(xml);
            if (data.md) {
                if (add) {
                    data.md = $scope.data.md.concat(data.md);
                }
                $scope.data = data;
            }
            /*
            if ($scope.data.nb_records_matched - $scope.data.nb_records_visible != 0) {
                $scope.status.nextPage = true;
            } else {
                $scope.status.nextPage = false;
            }*/
            if ($scope.data.nb_records_returned < $scope.csw_config.maxrecords) {
                $scope.status.nextPage = false;
            } else {
                $scope.status.nextPage = true;
            }
        });
    }
    getData();
  
    $scope.moreMetadata = function() {
        $scope.csw_config.startposition = $scope.data.next_record;
        getData(true);
    };
    
    $scope.reloadPage = function(csw_url, constraint_search_type) {
        if (csw_url) {
            $scope.csw_config.url = csw_url;
        }
        if (constraint_search_type) {
            $scope.csw_config.constraint_search_type = constraint_search_type;
        }
        $scope.csw_config.startposition = 1;
        getData();
    };
    
    $scope.clearSearch = function() {
        $scope.csw_config.constraint = '';
        //$scope.reloadPage();
        $scope.csw_config.startposition = 1;
        getData();
    };
    
    $scope.modalDoc = function(doc_url) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/modal-doc.html',
            controller: 'modalDocCtrl',
            size: 'lg',
            windowClass: 'modal-doc',
            resolve: {
                doc_url: function () {
                    return doc_url;
                },
                scopeParent: function () {
                    return $scope;
                }
            }
        });
    };
    
    $scope.modalMdReader = function(md_url) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/modal-mdreader.html',
            controller: 'modalMdReaderCtrl',
            size: 'lg',
            windowClass: 'modal-mdreader',
            resolve: {
                md_url: function () {
                    return md_url;
                },
                scopeParent: function () {
                    return $scope;
                }
            }
        });
    };
}]);

cswReader.controller('modalDocCtrl', function ($sce, $scope, $modalInstance, scopeParent, doc_url) {
    $scope.scopeParent = scopeParent;
    $scope.doc_url = doc_url;
    
    $scope.close = function() {
        // Appel à la fonction d'annulation.
        $modalInstance.dismiss('cancel');
    };
});

cswReader.controller('modalMdReaderCtrl', function ($http, $sce, $scope, $modalInstance, scopeParent, md_url) {
    $scope.scopeParent = scopeParent;
    $scope.md_url = md_url;
    
    console.log(md_url);
    
    $http.get(scopeParent.server +'?url=' + encodeURIComponent(md_url))
        .success(function(xml) {
            var md = parseMD(xml);
            md.md_url = md_url;
            md.app = $scope.scopeParent.app;
            if (md) {
                $scope.md = md;
            }
        })
        .error(function(xml) {
            alert("Impossible de charger l'URL.");
        });
    
    
    $scope.close = function() {
        // Appel à la fonction d'annulation.
        $modalInstance.dismiss('cancel');
    };
});

