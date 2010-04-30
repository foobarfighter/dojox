dojo.provide("phonegap.util");

phonegap.util.camel = function(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}

phonegap.util.isEmpty = function(hash) {
	for (var i in hash){
		return false;
	}
	return true;
}