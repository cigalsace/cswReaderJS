var obsjs = {};

(function(obsjs, undefined) {
    "use strict";
    jQuery.noConflict();

    // Md object
    obsjs.Abstract = function(abstract) {
        if (abstract) {
            this.abstract = abstract;
        } else {
            this.abstract = '';
        }
        return this;
    };

    var fields_name = {
        retour: 'return',
        participants: 'particpitants',
        statut: 'status',
        calendrier: 'calendar',
        budget: 'budget',
        effectifs: 'effectifs',
        objectifs: 'objectives',
        sources: 'sources',
        donnees: 'data',
        frequence_maj: 'updateFrequency',
        publi_format: 'publicationFormat',
        publi_etudes: 'publicationRessources',
        outils: 'tools',
        divers: 'other',
        contrib_region: 'contrib_region',
        utilisation: 'useLevel',
        partenaires: 'partners',
        obs_directeur: 'director',
        obs_president: 'president'
    };

    /**
     * Utilisation:
     *   obs = new obsjs.Abstract();
     *   md.obs = obs.parseAbstract(md.dataAbstract);
     */
    obsjs.Abstract.prototype.parseAbstract = function(abstract) {
        this.abstract = abstract || '';
        var data = {};
        var abstract_array = this.abstract.split('----\n');
        for (var i = 0; i < abstract_array.length; i++) {
            var regex = /([A-Z_]*): ?([\S\s]*)/gm;
            var match = regex.exec(abstract_array[i]);
            data[fields_name[match[1].toLowerCase()]] = match[2];
        }
        // console.log(abstract);
        console.log(data);
        return data;
    };

}(window.obsjs = window.obsjs || {}));
