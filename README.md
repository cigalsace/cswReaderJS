# cswReaderJS

cswReaderJS est un outil simple et ouvert de consultation de catalogues de métadonnées conformes au format ISO 19139 / INSPIRE (flux CSW).

La présente documentation est adressée aux personnes souhaitant installer cswReader et contribuer au projet.

Un [Guide d'utilisation de cswReader](./documentation/userGuide/cswReader_UserDocumentation.md) est également disponible.


## Fonctionnalités principales

- Consultation de flux CSW de métadonnées ISO/INSPIRE sous forme de grille et de liste
- Recherche de fiches de métadonnées ISO/INSPIRE
- Consultation de fiches de métadonnées ISO/INSPIRE


## Installation

### Prérequis

Un serveur web avec PHP (testé avec les versions 5.6 et 7.0).
Une version fonctionnant sur Python est prévue. les délais de sa mise en oeuvre dépendront des besoins et demandes exprimées.

### Procédure

cswReader ne nécessite pas d'installation particulière.
Il suffit de placer les fichiers du dépôt git ci-dessus sur un serveur web fonctionnant avec PHP (local ou distant).

Une version [desktop](https://github.com/cigalsace/cswreader/tree/master/desktop) est également prévue. Elle fonctionne grâce à un serveur web Python embarqué.


## Configuration

La configuration de cswReader se fait principalement via les fichiers contenus dans le répertoire [``config``](https://github.com/cigalsace/cswreader/tree/master/config).


## Utilisation

### Interface

L'interface a été conçue pour être simple et facilement utilisable par toute personne sans nécessité de connaissance en terme de description de données géographiques.

_[A compléter]_

### Permaliens et paramètre d'URL

Il est possible de définir plusieurs propriétés via des paramètres d'URL.
Cela permet entre autre de personnaliser l'interface de l'application en se connectant via une URL spécifique ou transmettre à une autre personne une version de l'application similaire à celle dont on dispose.

L'ensemble de ces variables sont paramétrables dans le fichier de configuration dans `config/config.json`.

Pour générer un permalien de la page, utiliser le bouton "permalien" en bas à droite de la page.

#### `lang`

Une langue spécifique peut-être utilisée en précisant le paramètre `lang` et le code de la langue sur 2 caratères (`fr` pour français, `de` pour allemand, `en` pour anglais, etc.).
Aini, pour forcer l'affichage en allemand (pour peut que cette traduction existe...), il faut ajouter dans l'URL `index.html?lang=de` ou `&lang=de`.

#### `csw_list`

Le chemin du fichier de configuration de la liste des flux CSW disponibles par défault (`config/csw_url.json`) peut être surchargé via le paramètre `csw_list`.
Ainsi, pour utiliser le fichier `config/csw_url2.json`, ajouter dans l'URL `index.html?csw_list=config/csw_url2.json` ou `&csw_list=config/csw_url2.json`

#### `csw`

Le pramètre `csw` permet de préciser l'URL d'un flux CSW à afficher par défaut.

#### `md`

Le paramètre `md` permet de préciser l'identifiant d'une fiche de métadonnée à afficher. Il s'utilise conjointement au paramètre `&view=view`.

#### `view`

Le paramètre `view` permet de préciser la vue à afficher par défaut (`grid`, `list` ou `view`).
Les vues sont définies dans le fichier `config/views/views.json`.
Ainsi si l'on souhaite utiliser la vue `list` par défaut, il faut ajouter dans l'URL `index.html?view=list` ou `&view=list`.

#### `oldView`

Le paramètre `oldView` permet de préciser la dernière vue utilisée. Il s'utilise conjointement au paramètre `&view=view` pour afficher la bonne vue lorsque l'on ferme la fiche de métadonnées.

#### `constraint`

Le paramètre `constraint` permet de préciser un terme à rechercher pour filtrer les résultats du flux CSW.

#### `constraint_type`

Le paramètre `constraint_type` permet de préciser le champ sur lequel s'applique la recherche du paramètre `constraint`. La valeur par défaut est `AnyText` qui correspond à une recherche sur l'ensemble de la fiche.
Les valeurs possibles sont:
- `AnyText`: recherche sur toute la fiche
- `Title`: recherche dasn le titre de la fiche
- `Abstract`: recherche dans le résumé

#### `header`

Le paramètre `header` permet de préciser si l'en-tête de la page (menu) doit être visible.
Attention, si l'en-tête n'est pas visible, certaines fonctionnalités comme la recherche sont inutilisables.

#### `footer`

Le paramètre `footer` permet de préciser si l'le pied de page de la page doit être visible.
Attention, si e pied de page n'est pas visible, certaines informations comme le nombre de résultats ne sont pas visible, tout comme ceraines fonctionnalités comme le changement de langue.

#### `config`

Le paramètre `config` permet de préciser et surcharger le fichier de configuration de l'application. Par défaut il correspond à `config/config.json`.


### Démo

Exemples d'URL paramétrées:

- http://localhost:8000/index.html?lang=en&csw_url=https:%2F%2Fwww.cigalsace.org%2Fgeonetwork%2Fsrv%2Ffre%2Fcsw&csw_list=config%2Fcsw_url2.json&view=list&header=1&footer=0

- http://localhost:8000/index.html?lang=en&config=config%2Fconfig2.json&header=1


## Choix techniques et développement

Les choix sont réalisés afin que:

- L'application soit moderne dans son graphisme et ses fonctionnalités
- L'application reste légère et maintenable
- L'application n'impose pas d'exigences particulières pour l'installation et l'utilisation
- L'application puisse fonctionner en mode connecté et déconnecté
- L'application ne nécessite pas d'authentification (possibilité d'ajouter une authentification HTTP côté serveur si nécessaire)

### Langages utilisés

- JS, HTML et CSS côté interface utilisateur
- PHP pour le téléchargement des fichiers XML (version web)
- Python (serveur embarqué pour usage [desktop](https://github.com/cigalsace/cswreader/tree/master/desktop))
- Markdown pour la documentation

### Frameworks et bibliothèques utilisés

- [jquery](https://jquery.com/) - version 3.1.1
- [twitter bootstrap](http://getbootstrap.com/) - version 3.3.7
- [angular js](https://angularjs.org/) - version 1.6.1
- [ui-bootstrap](https://angular-ui.github.io/bootstrap/) - version 2.5.0
- [showdown](https://github.com/showdownjs/showdown) - version 1.6.2
- [mdjs](https://github.com/cigalsace/mdjs) - version b15
- [moment](http://momentjs.com/) - version 2.12.0
- [vkbeautify](https://github.com/vkiryukhin/vkBeautify) - version 0.99.0 beta
- [bottle](http://bottlepy.org/docs/0.12/) - version 0.12.8 (serveur Python embarqué)


## Versions

### dev

- Ajout de la possibilité d'afficher une vue en fonction d'un mot-clé:
    - `observatoire`: `views-obs`
    - `carte`: `views-map`
    - sinon: `views-data`
- Renommage des variables de la lib `cswjs` et adaptation des vues grid et list
- Adapatation de md.js pour rendre l'affichage d'une vue en fonction d'un mot-clé paramétrable (cf. config.json, variable 'keywords_views')
- Regroupement de l'ensemble des fichiers de configuration dans un seul fichier `config.json`: csw-url.json, locales.json, views.json et help.json. Supression des fichiers correspondants et du paramètre d'URL csw_list.


### 0.3.0

- Ajout d'un getCapabilities au chargement du csw pour afficher le informations du flux au survol du lien en bas de page à gauche.
- Ajout d'un getDomains au chargement du csw pour pemettre à terme d'envisager l'utilisation de recherches à facettes
- Ajout d'un lien de téléchargement direct des données sir la fiche possède un lien direct vers la ressource en WFS
- Correction de la génération des permaliens


## TODO

- [ ] Mettre à jour les librairies:
    - jquery
    - bootstrap
    - angular js
    - ui-bootstrap
    - showdown
    - moment
    - vkbeautify
- [ ] Renommer AppDataSrv en AppService (dans le module app.module.js et app.services.js)
- [ ] Utiliser angular-ui-router
- [ ] Utiliser angular-loading-bar (?)
- [ ] Restructurer l'application sous forme de composants:
    - [ ] Créer un composant 'loadWfs'
    - [ ] Créer un composant 'changeLocale'
    - [ ] Créer un composant 'changeCsw'
    - [ ] Créer un composant 'changeView'
    - [ ] Créer un composant 'getPermalink'
    - [ ] Créer un composant 'cswCatalog (grid/list)'
    - [ ] Créer un composant 'mdCard (grid/list)'
    - [ ] Créer un composant 'mdView (view)'
    - [ ] Créer un composant 'dialog'
    - [ ] Créer un composant 'header'
    - [ ] Créer un composant 'footer'
    - [ ] Créer un composant 'app'
- [ ] Gérer le lien enter MDS et MDD pour le téléchargement des données via flux WFS