# cswReaderJS

Application javascript de lecture et recherche de métadonnées dans un flux CSW.
Cette application constitue l'un des modules du projet mdViewer.

## Projet mdViewer

Le projet "mdViewer" vise à proposer une solution simple de consultation de fiches de métadonnées issues de services web (CSW) ou de fichiers XML stockés en ligne (Iso 19139) en utilisant une logique client/serveur.
Il n'a pas pour objectif de remplacer des solutions complètes tel que [GéoSources][1] ou [GéoNetwork][2].

L'application se compose de 3 modules indépendants:

* [cswReaderJS][3] : permet de lire un flux afficher la liste des fiches de métadonnées de façon synthétique.
* [mdReaderJS][4] : permet de lire une fiche de métadonnées et l'afficher de façon complète selon le profil CIGAL.
* [xml2csw][5] : permet de simuler un serveur csw minimaliste à partir d'une liste de fichiers XML pour pouvoir les consulter via cswReaderJS et mdReaderJS.

Cette application s'inspire des travaux réalisé pour le sviewer développé par [Géobretagne][6].

L'affichage a été optimisé pour permettre sont utilisation sur les terminaux mobiles.

## Technologie:

Le module cswReaderJS est développé principalement via du JavaScript, du HTML, du CSS 3. Il s'apuie notamment sur les bibliothèques suivantes:

* [JQuery][7] pour l'interaction javacript
* [Mustache][8] et Mustache.js comme système de template pour la mise en forme des pages HTML
* [Uikit][9] pour la présentation des pages et le rendu

Un script PHP est utilisé pour appeler les pages distantes et permettre de réaliser des requêtes AJAX "cross-domain".
Il peut être facilement remplacé par un script dans un autre langage comme Python, Java ou autre (développement à prévoir).

## Principe

A partir d'une URL vers un serveur CSW transmise en paramètre, le module génère une requête de type GetRecords et affiche les métadonnées envoyées en retour.

## Installation:

* Télécharger le fichier zip contenant les sources.
* Dézipper le fichier téléchargé sur le serveur
* L'application est fonctionnelle.

## Pramétrage:

Les paramétrages s'affectuent dans le fichier js/config.js.

## Utilisation:

L'application se veut simple et intuitive...

## Démonstration:

http://www.cigalsace.net/cswReaderJS/0.10/

---
[1]: http://www.geosource.fr/ "GéoSources"
[2]: http://geonetwork-opensource.org/ "GéoNetwork"
[3]: https://github.com/cigalsace/cswReaderJS
[4]: https://github.com/cigalsace/mdReaderJS
[5]: https://github.com/cigalsace/xml2csw
[6]: http://geobretagne.fr/
[7]: http://jquery.com/
[8]: http://mustache.github.io/
[9]: http://getuikit.com/
  
