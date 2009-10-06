dojo.provide("dojox.rails.tests.rhino");
dojo.require("dojox.rails");

doh.register("dojox.rails.tests.rhino", 
	[
		{
			name: "Failing Rhino Test",
			runTest: function(t) {
				//	summary: 
				//		Example failing test under rhino
				//	description:
				//		If this doesn't fail then you've got problems
				doh.t(false);
			}
		}
	]
);