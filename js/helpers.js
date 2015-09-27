
function getParamsURL(url) {
    var variables = url.split('&');
    var params = {};
    for (var i in variables) {
        // v = variables[i].split('=');
        v = variables[i].split(/=(.+)?/);    // Split only first "=" char
        params[v[0]] = decodeURIComponent(v[1]);
        //console.log(v[0] + ' - '+ decodeURIComponent(v[1]));
    }
    return params;
}

function csw_urlConstruct(csw_config) {
    var csw_url = csw_config.url;
	if (csw_url.indexOf('?') != -1) {
		if (csw_url.charAt(csw_url.length-1) == '?') {
			var url = csw_url;
		} else {
			var url = csw_url+'&';
		}
	} else {
		var url = csw_url+'?';
	}
    /*
    for (var item in csw_config) {
        if (item != 'url' && item != 'constraint_search_type' && csw_config[item] != '') {
            url += item + '=' + csw_config[item] + '&';
        }
    }*/
    // Add paramters from csw_config to url	
	if (csw_config.elementsetname) {
	    url += 'elementsetname=' + csw_config.elementsetname + '&';
	}
	if (csw_config.maxrecords) {
	    url += 'maxrecords=' + csw_config.maxrecords + '&';
	}
	if (csw_config.startposition) {
	    url += 'startposition=' + csw_config.startposition + '&';
	}
	if (csw_config.version) {
	    url += 'version=' + csw_config.version + '&';
	}
	if (csw_config.service) {
	    url += 'service=' + csw_config.service + '&';
	}
	if (csw_config.request) {
	    url += 'request=' + csw_config.request + '&';
	}
	if (csw_config.constraintlanguage) {
	    url += 'constraintlanguage=' + csw_config.constraintlanguage + '&';
	}
	if (csw_config.postencoding) {
	    url += 'postencoding=' + csw_config.postencoding + '&';
	}
	if (csw_config.resulttype) {
	    url += 'resulttype=' + csw_config.resulttype + '&';
	}
	if (csw_config.outputschema) {
	    url += 'outputschema=' + csw_config.outputschema + '&';
	}
	if (csw_config.typenames) {
	    url += 'typenames=' + csw_config.typenames + '&';
	}
	if (csw_config.constraint_language_version) {
	    url += 'constraint_language_version=' + csw_config.constraint_language_version + '&';
	}
    // contraint
	if (csw_config.constraint) {
    	var constraint = csw_config.constraint_search_type + "+LIKE+'" + encodeURIComponent('%'+csw_config.constraint+'%') + "'";
    	url += 'constraint=' + constraint + '&';
    }
    url = url.substring(0, url.length-1);
    console.log(url);
    return url;
}

function md_urlConstruct(md_config) {
	var md_url = md_config.url;
	if (md_url.indexOf('?') != -1) {
		if (md_url.charAt(md_url.length-1) == '?') {
			var url = md_url;
		} else {
			var url = md_url+'&';
		}
	} else {
		var url = md_url+'?';
	}
    for (var item in md_config) {
        if (item != 'url' && md_config[item] != '') {
            url += item + '=' + md_config[item] + '&';
        }
    }
  	//console.log(url);
    return url;
}

