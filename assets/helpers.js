function SORT_ASC(a,b) {if (a < b) return -1;	else return 1;}
function SORTOBJ_ASC(a,b) {if (a.title < b.title) return -1;	else return 1;}
function SORT_DESC(a,b) {if (a > b) return -1;	else return 1;}


function in_array (needle, haystack) {
	for (key in haystack) {
		if (haystack.hasOwnProperty(key))
		if ((lc(haystack[key]).indexOf(lc(needle)) != -1) || (lc(needle).indexOf(lc(haystack[key])) != -1))
			return true; 
		}
  return false;
}

function sortFunction(a, b) {
	return b.dur - a.dur
}


function showLoader() {
    $('#loader').show();    
}

function hideLoader() {
    setTimeout(function(){
        $('#loader').hide();
    }, 1000);
}


function cap(str) {
  return str.replace( /(^|\s|\.)(.)/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

// trim whitespaces
function trim(q) {
	return q.replace(/^\s*/g, "").replace(/\s*$/, "").replace(/(\s)+/g," ");
}

function btrim(str) {
	return trim(str.replace(/\(|\)|\[|\]|\||\.|,|'|"|\-|_|\&|\+/g,' ')).toLowerCase();
}

// trim numbers
function tnum(q) {
	return q.replace(/\d+/g,'');
}

// trim brackets and its content
function tbr(q) {
	return q.replace(/(\(|\[).*(\)|\])?/gi,'');
}

// remove spaces
function nsp(q) {
	return q.replace(/ /g,'').toLowerCase();
}

// lower case
function lc(q) {
	return q.toLowerCase();
}

function cleanU(str) {
	str = str.replace(/[\u0000-\u001f]/g,'').replace(/[\u007f-\u00bf]/g,'');
	str = str.replace(/[\u00c0-\u00c6\u00e0-\u00e6]/g,'a').replace(/[\u00c8-\u00cb\u00e8-\u00eb]/g,'e');
	return str;
}

function cleanArray(w1, w2) {
	for(var k in w1)
		if (w1[k].length == 1 || shit.indexOf(w1[k]) != -1) w1.splice(k,1);
		
	for(var k in w2)
		if (w2[k].length == 1 || shit.indexOf(w2[k]) != -1) w2.splice(k,1);
}

function cleanComp(str) {
	str = str.replace(/\-/g,' ');
	str = str.replace(/&/g,' ');
	return str;
}


// cleaning arguments for VK
function cleanArgs(str) {	
	str = decodeURIComponent(str);
	str = str.replace(/'t/,'').replace(/'s/,'s');
	str = str.replace(/(&|\$)+/g,' ');
	str = str.replace(/(&|\?|:|"|'|@|\+|#)+/g,'');
	return trim(str);
}

function encURI(q) {
	q = encodeURIComponent(q);
	return q;
}

function decURI(q) {
	try {
		q = decodeURIComponent(q);
		return q;
	} catch (error) {
		return '';
	}
}

function mkTime(dur) {
	var m = parseInt(dur/60);
	var s = dur % 60;
	var duration = (m > 9 ? m : '0'+m) +':'+ (s > 9 ? s : "0"+s);
	return duration;
}

