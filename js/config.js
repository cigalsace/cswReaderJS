
// Configuration de l'application
var app = {
    title: 'cswReaderJS',        // Titre de l'application
    name: 'cswReaderJS',         // Nom de l'application
    version: '0.12',             // Version de l'application
};

// Initialisation de la variable gloable envoyée au template pour construction de la page
var config = {
    lang: 'fr',
    //currentPage: 1,
    //maxrecords: 20,
    //nb_records_visible: 0,
    //csw_list: csw_list,
    //app: app,
    csw_url: '',
    view: 'tpl-grid.html',        // Vue par défaut ('tpl-grid.html' ou 'tpl-list.html') - DESACTIVE !
    template: 'modal-view.html'  // Nom du template d'affichage des fiches de métadonnées
};

// Lien vers le serveur de récupération des flux (pb de cross domain)
var server_url = './server/index.php'; // "false" pour un accès directe à la page sans passer par le script serveur si l'application cswReader est hébergée sur le serveur du flux CSW.

// Liste des flux CSW disponibles
// Indiquer "csw: ''," pour désactiver la liste des lien et laisser uniquement le champs texte de saisie des URL
// id : Identifiant du flux
// title : titre du flux
// description : description du flux
// url : URL du flux (sans paramètre)
var csw_list = [ 
    {
        id: 0,
        title: 'CSW CIGAL - Géocatalogue',
        description: 'Flux CSW du serveur CIGAL contenant les fiches pour le Géocatalogue national.',
        url: 'https://www.cigalsace.org/geonetwork/srv/fre/csw-geocatalogue'
    }, {
        id: 1,
        title: 'CSW CIGAL - Général',
        description: 'Flux CSW du serveur CIGAL contenant l\'ensemble des fiches de métadonnées.',
        url: 'https://www.cigalsace.org/geonetwork/srv/fre/csw'
    }, {
        id: 2,
        title: 'CSW Géocatalogue national',
        description: 'Flux CSW du Géocatalogue national.',
        url: 'https://www.geocatalogue.fr/api-public/servicesRest'
    }, {
        id: 3,
        title: 'Fiches du CG67',
        description: 'Flux CSW du Conseil Général du Bas-Rhin.',
        url: 'https://www.cigalsace.org/geonetwork/srv/fre/csw-cg67'
    }, {
        id: 4,
        title: 'Liste de fichiers XML',
        description: 'Flux CSW produit avec "cswServer" à partir d\'une liste de fichier XML.',
        url: 'http://cigalsace.net/cswServer/csw/node.php'
    } 
];

var constraint_type_search_list = {
    //'Format': 'format',
    //'OrganisationName': 'Organisation',
    //'Type': 'Type',
    //'ServiceType':'Service',
    //'DistanceValue': 'Distance',
    //'ResourceLanguage': 'Langue',
    //'RevisionDate': 'Date de mise à jour',
    //'OperatesOn': 'Operate on',
    //'GeographicDescriptionCode': 'GeographicDescriptionCode',
    'AnyText': 'la fiche entière',
    //'Modified': 'Modified',
    //'PublicationDate': 'PublicationDate',
    //'ResourceIdentifier': 'ResourceIdentifier',
    //'ParentIdentifier': 'ParentIdentifier',
    //'Identifier': 'Identifier',
    //'CouplingType': 'CouplingType',
    //'TopicCategory': 'TopicCategory',
    //'OperatesOnIdentifier': 'OperatesOnIdentifier',
    //'ServiceTypeVersion': 'ServiceTypeVersion',
    //'TempExtent_end': 'TempExtent_end',
    //'Subject': 'Subject',
    //'CreationDate': 'CreationDate',
    //'OperatesOnName': 'OperatesOnName',
    'Title': 'le titre',
    //'DistanceUOM': 'DistanceUOM',
    //'Denominator': 'Denominator',
    //'AlternateTitle': 'AlternateTitle',
    //'Language': 'Language',
    //'TempExtent_begin': 'TempExtent_begin',
    //'HasSecurityConstraints': 'HasSecurityConstraints',
    //'KeywordType': 'KeywordType',
    'Abstract': 'le résumé'
};

var csw_config = {
    url: '',
    elementsetname: 'full',
    maxrecords: 20,
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
    constraint_search_type: 'AnyText',
    //constraint_search: '',
    constraint: ''
};

// Configuration par défaut de l'url du CSW
var md_config = {
    url: '',
    request: 'GetRecordById',
    service: 'CSW',
    version: '2.0.2',
    elementsetname: 'full',
    postencoding: 'XML',
    resulttype: 'results',
    outputschema: 'http://www.isotc211.org/2005/gmd',
    typenames: 'gmd:MD_Metadata',
    id: ''
};


// Get params from URL
var params = getParamsURL(window.location.search.substring(1));

// App language (only 'fr' support for now)
// Get app language: param_lang else language of browser
var param_lang = params['lang'];
if (param_lang) {
    config.userLang = param_lang;
} else {
    config.userLang = navigator.language || navigator.userLanguage;
}
// Keep only 2 first characters from language (ex.: 'fr' or 'en' or 'de')
config.userLang = config.userLang.substring(0,2);
// Use french by default
if (['fr'].indexOf(config.userLang) == -1) { 
    config.userLang = 'fr';
}

// Configuration par défaut de l'url du CSW
var param_csw = params['csw'];
if (param_csw) {
    csw_config.url = param_csw;
} else {
    csw_config.url = csw_list[0].url;
}

// Configuration du template
var param_tpl = params['tpl'];
if (param_tpl) {
    config.template = param_tpl;
}

