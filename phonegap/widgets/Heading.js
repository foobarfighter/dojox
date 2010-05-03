dojo.provide("dojox.phonegap.widgets.Heading");
dojo.require("dojox.phonegap.widgets._Widget");

dojo.declare("dojox.phonegap.widgets.Heading", [dojox.phonegap.widgets._Widget], {
	back: "",
	href: "",
	moveTo: "",
	transition: "slide",
	
	buildRendering: function() {
		this.inherited(arguments);
		this.ui.prepareRendering(this);
	},
	
	onDeviceReady: function() {
		this.ui.createToolBar(this);
	},
	
	onClick: function() {
		console.debug("onClick");
	}
});
