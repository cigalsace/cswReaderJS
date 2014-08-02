//$(document).ready(function() {

function urlConstruct(csw, config) {
    var url = csw.url+'?';
    for (item in config) {
        if (item != 'csw_id' && config[item] != '') {
url += item + '=' + config[item] + '&';
        }
    }
    //console.log(url.replace(/(\s+)?.$/, ''));
    //console.log(url);
    return url;
}

/* A garder
function min_max(array, type='min') {
    m = false;
    for (a in array) {
        if (m === false) { m = array[a]; }
        if (type=='max') {
            if (array[a] > m) { m = array[a]; }
        } else {
            if (array[a] < m) { m = array[a]; }
        }
    }
    return m;
}

function compare(a,b) {
    if (a.nb < b.nb)
        return 1;
    if (a.nb > b.nb)
        return -1;
    return 0;
}
*/

//});
