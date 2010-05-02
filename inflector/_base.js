dojo.provide("dojox.inflector._base");

(function() {
	var di = dojox.inflector;

	di.camelize = function(str, firstLetter) {
		var s="";
		var capNext = firstLetter === undefined ? true : firstLetter;

		for (var i=0; i<str.length; i++){
			var c = str.charAt(i);
			if (capNext && c != "_"){
				s += c.toUpperCase();
				capNext = false;
				continue;
			}
			if (c == "_"){
				capNext = true;
				continue;
			}
			s += c;
		}
		return s;
	}
})();