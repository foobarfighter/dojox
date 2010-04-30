dojo.provide("phonegap._Widget");
dojo.require("phonegap.phonegap");
dojo.require("dijit._Widget");

dojo.declare("phonegap._Widget", [dijit._Widget], {
	_deviceReadyDispatched: false,
	_postDeviceReadyDispatched: false,
	
	constructor: function() {
		this.ui = phonegap.uicontrols;
	},
	
	buildRendering: function() {
		this.inherited(arguments);
		phonegap.registry.register(this);
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
		phonegap.registry.unregister(this);
		this.inherited(arguments);
	}
});