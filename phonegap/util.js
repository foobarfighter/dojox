dojo.provide("dojox.phonegap.util");

dojox.phonegap.util.camel = function(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}

dojox.phonegap.util.isEmpty = function(hash) {
	for (var i in hash){
		return false;
	}
	return true;
}