dojo.provide("phonegap.Layout");

dojo.require("phonegap.phonegap");
dojo.require("phonegap._Widget");
dojo.require("phonegap.util");

dojo.declare("phonegap.Layout", [phonegap._Widget], {
	_connect: [],
	
	constructor: function() {
		this._connect.push(dojo.connect(this.ui, "createToolBar", dojo.hitch(this, "onToolBarCreated")));
		this._connect.push(dojo.connect(this.ui, "createTabBar", dojo.hitch(this, "onTabBarCreated")));
	},
	
	startup: function() {
		dojo.addClass(this.domNode, "pgLayout");
		dojo.addClass(this.domNode, "pg"+ phonegap.util.camel(phonegap.hostenv));
	},
	
	onDeviceReady: function() {
		console.debug("layout ondeviceready");
	},
	
	postDeviceReady: function() {
		console.debug("layout postDeviceReady");
	},
	
	onToolBarCreated: function() {
		this._adjustForToolBar();
	},
	
	onTabBarCreated: function() {
	},
	
	_adjustForToolBar: function() {
		// dojo.query(, this.domNode)
	}
});