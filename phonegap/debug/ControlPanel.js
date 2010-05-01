dojo.provide("dojox.phonegap.debug.ControlPanel");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("dojox.phonegap.debug.ControlPanel", [dijit._Widget, dijit._Templated], {
	templateString: dojo.cache("dojox.phonegap.debug", "templates/ControlPanel.html")
});