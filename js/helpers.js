
function getParamsURL(url) {
    var variables = url.split('&');
    var params = {};
    for (i in variables) {
        // v = variables[i].split('=');
        v = variables[i].split(/=(.+)?/);    // Split only first "=" char
        params[v[0]] = decodeURIComponent(v[1]);
        //console.log(v[0] + ' - '+ decodeURIComponent(v[1]));
    }
    return params;
}

function csw_urlConstruct(csw_config) {
    var csw_url = csw_config.csw_url;
	if (csw_url.indexOf('?') != -1) {
		if (csw_url.charAt(csw_url.length-1) == '?') {
			var url = csw_url;
		} else {
			var url = csw_url+'&';
		}
	} else {
		var url = csw_url+'?';
	}
    for (item in csw_config) {
        if (item != 'csw_id' && item != 'csw_url' && csw_config[item] != '') {
            url += item + '=' + csw_config[item] + '&';
        }
    }
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
    for (item in md_config) {
        if (item != 'url' && md_config[item] != '') {
            url += item + '=' + md_config[item] + '&';
        }
    }
  	//console.log(url);
    return url;
}

