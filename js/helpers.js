
function getParamsURL(url) {
    var variables = url.split('&');
    var params = {};
    for (i in variables) {
        v = variables[i].split('=');
        params[v[0]] = decodeURIComponent(v[1]);
        //console.log(v[0] + ' - '+ decodeURIComponent(v[1]));
    }
    return params;
}

function urlConstruct(csw_url, config) {
	if (csw_url.indexOf('?') != -1) {
		if (csw_url.charAt(csw_url.length-1) == '?') {
			var url = csw_url;
		} else {
			var url = csw_url+'&';
		}
	} else {
		var url = csw_url+'?';
	}
    for (item in config) {
        if (item != 'csw_id' && item != 'csw_url' && config[item] != '') {
            url += item + '=' + config[item] + '&';
        }
    }
    console.log(url);
    return url;
}
