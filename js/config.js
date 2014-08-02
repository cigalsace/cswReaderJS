//$( document ).ready(function() {

    // Lien vers le serveur de récupération des flux (pb de cross domain)
    var server_url = './server/index.php'; // "false" pour un accès directe à la page sans passer par le script serveur application hébergée sur le serveur du flux CSW.

    // Liste des flux CSW disponibles
    var csw_list = {
        csw: [ {
            id: 0,
            title: 'CSW CIGAL - Géocatalogue',
            description: 'Flux CSW du serveur CIGAL contenant les fiches pour le Géocatalogue national.',
            url: 'http://www.cigalsace.org/geonetwork-private/srv/fre/csw-geocatalogue'
        }, {
            id: 1,
            title: 'CSW CIGAL - Général',
            description: 'Flux CSW du serveur CIGAL contenant l\'ensemble des fiches de métadonnées.',
            url: 'http://www.cigalsace.org/geonetwork-private/srv/fre/csw'
        }, {
            id: 2,
            title: 'CSW Géocatalogue national',
            description: 'Flux CSW du Géocatalogue national.',
            url: 'http://www.geocatalogue.fr/api-public/servicesRest'
        } ]
    };

    // Configuration de l'application
    var app = {
        title: 'scwReaderJS',
        name: 'scwReaderJS',
        version: 0.01
    };

    // Configuration par défaut de l'url du CSW
    var csw_config = {
        csw_id: 0,
        elementsetname: 'full',
        maxrecords: 10,
        startposition: 1,
        version: '2.0.2',
        service: 'CSW',
        request: 'GetRecords',
        constraintlanguage: 'CQL_TEXT',
        postencoding: 'XML',
        resulttype: 'results',
        outputschema: 'http://www.isotc211.org/2005/gmd',
        typenames: 'gmd:MD_Metadata',
        constraint_language_version: '1.0.0',
        constraint: ''
    };

    // Lien vers le lecteur de fiche de métadonnées
    var mdReader = {
        url: 'http://www.cigalsace.net/mdReaderJS/0.01',
        csw: '',
        mdID: ''
    };

    /* Ne rien modifier en dessous de cette ligne */    
    // Initialisation de la variable gloable envoyée au template pour construction de la page
    var data = {
        currentPage: 1,
        csw_list: csw_list,
        app: app,
        view: 'gridView'
    };

    /* A garder
    var csw_query_all = "?SERVICE=CSW&VERSION=2.0.2&REQUEST=GetRecords&CONSTRAINTLANGUAGE=CQL_TEXT&PostEncoding=XML&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&typeNames=gmd:MD_Metadata&ELEMENTSETNAME=full&maxrecords=1000&startposition=1&CONSTRAINT_LANGUAGE_VERSION=1.0.0";
    */

    var xpaths = {
        // Results
        'stats': 'csw\\:SearchResults, SearchResults',
        // Metadata
        'Root': 'gmd\\:MD_Metadata, MD_Metadata',
        'MD_FileIdentifier': 'gmd\\:MD_Metadata gmd\\:fileIdentifier gco\\:CharacterString, fileIdentifier CharacterString',
        // Data
        'Data_Title': 'gmd\\:MD_Metadata gmd\\:identificationInfo gmd\\:MD_DataIdentification gmd\\:citation gmd\\:CI_Citation gmd\\:title gco\\:CharacterString, MD_Metadata identificationInfo MD_DataIdentification citation CI_Citation title CharacterString',
        'Data_Abstract': 'gmd\\:MD_Metadata gmd\\:identificationInfo gmd\\:MD_DataIdentification gmd\\:abstract gco\\:CharacterString, MD_Metadata identificationInfo MD_DataIdentification abstract CharacterString',
        // Browsegraphic
        'Data_BrowseGraphics': 'gmd\\:graphicOverview gmd\\:MD_BrowseGraphic, graphicOverview MD_BrowseGraphic',
        'Data_BrowseGraphic_Name': 'gmd\\:fileName gco\\:CharacterString, fileName CharacterString',
        'Data_BrowseGraphic_Description': 'gmd\\:fileDescription gco\\:CharacterString, fileDescription CharacterString',
        'Data_BrowseGraphic_Type': 'gmd\\:fileType gco\\:CharacterString, fileType CharacterString',
        // Keywords
        'Data_Keywords': 'gmd\\:descriptiveKeywords gmd\\:MD_Keywords, descriptiveKeywords MD_Keywords',
        'Data_Keyword': 'gmd\\:keyword gco\\:CharacterString, keyword CharacterString',
        // TopicCategories
        'Data_TopicCategories': 'gmd\\:MD_Metadata gmd\\:identificationInfo gmd\\:MD_DataIdentification gmd\\:topicCategory, MD_Metadata identificationInfo MD_DataIdentification topicCategory',
        'Data_TopicCategory': 'gmd\\:MD_TopicCategoryCode, MD_TopicCategoryCode',
    };

    // Liste des valeurs des TopicCategories
    var MD_TopicCategoryCode = {
        farming: "Agriculture",
        biota: "Flore et faune", 
        boundaries: "Limites politiques et administratives", 
        climatologyMeteorologyAtmosphere: "Climatologie, météorologie", 
        economy: "Economie", 
        elevation: "Topographie", 
        environnement: "Ressources et gestion de l’environnement", 
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
    };

//});
