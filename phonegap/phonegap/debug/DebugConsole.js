dojo.provide("phonegap.debug.DebugConsole");
dojo.require("dojo.cache");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("phonegap.debug.ControlPanel");

dojo.declare("phonegap.debug.DebugConsole", [
		dijit._Widget,
		dijit._Templated
	], {
	templateString: dojo.cache("phonegap.debug", "templates/DebugConsole.html"),
	widgetsInTemplate: true,
	title: ""
});

phonegap.debug.DebugConsole.createLayout = function(srcNodeRef) {
	srcNodeRef = srcNodeRef || dojo.body();
	if (srcNodeRef != dojo.body()){return;}
	
	var consoleNode = dojo.create("div", {title: dojo.doc.title});
	dojo.attr(consoleNode, "dojoType", "phonegap.debug.DebugConsole");
	dojo.query(">", srcNodeRef).forEach(function(n) {
		dojo.place(dojo.clone(n), consoleNode);
	});
	dojo.empty(srcNodeRef);
	dojo.place(consoleNode, srcNodeRef);
}