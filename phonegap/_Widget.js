dojo.provide("dojox.phonegap._Widget");
dojo.require("dijit._Widget");

dojo.declare("dojox.phonegap._Widget", [dijit._Widget], {
	_deviceReadyDispatched: false,
	_postDeviceReadyDispatched: false,
	
	constructor: function() {
		this.ui = dojox.phonegap.uicontrols;
	},
	
	buildRendering: function() {
		this.inherited(arguments);
		dojox.phonegap.registry.register(this);
	},
	
	onDeviceReady: function() {},
	postDeviceReady: function() {},
	
	_onDeviceReady: function() {
		this._deviceReadyDispatched = true;
		this.onDeviceReady();
	},
	
	_onPostDeviceReady: function() {
		this._postDeviceReadyDispatched = true;
		this.postDeviceReady();
	},
	
	destroy: function() {
		dojox.phonegap.registry.unregister(this);
		this.inherited(arguments);
	}
});