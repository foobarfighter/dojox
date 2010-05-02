dojo.provide("dojox.inflector.tests._base");
dojo.require("dojox.inflector");

doh.register("dojox.inflector.tests._base", 
	[
		{
			name: "camelize",
			runTest: function(t) {
				doh.is("UnderScoreString", dojox.inflector.camelize("__under_score__string"));
				doh.is("underScoreString", dojox.inflector.camelize("under_score__string", false));
				doh.is("underScoreString", dojox.inflector.camelize("under_score_string", false));
				doh.is("UnderScoreString", dojox.inflector.camelize("under_score_string"));
			}
		}
	]
);