dojo.provide("dojox.rails.tests.strings");
dojo.require("dojox.rails");

doh.register("dojox.rails.tests.strings", 
	[
		{
			name: "camelize",
			runTest: function(t) {
				doh.is("UnderScoreString", dojox.rails.camelize("__under_score__string"));
				doh.is("underScoreString", dojox.rails.camelize("under_score__string", false));
			}
		}
	]
);