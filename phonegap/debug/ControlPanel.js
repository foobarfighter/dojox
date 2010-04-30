dojo.provide("phonegap.debug.ControlPanel");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("phonegap.debug.ControlPanel", [dijit._Widget, dijit._Templated], {
	templateString: dojo.cache("phonegap.debug", "templates/ControlPanel.html")
});