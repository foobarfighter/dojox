dojo.provide("dojox.phonegap.widgets._Widget");
dojo.require("dijit._Widget");

dojo.declare("dojox.phonegap.widgets._Widget", [dijit._Widget], {
	_deviceReadyDispatched: false,
	_postDeviceReadyDispatched: false,
	
	constructor: function() {
		this.ui = dojox.phonegap.ui;
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