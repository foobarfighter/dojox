dojo.provide("dojox.phonegap._base.loader");
dojo.require("dojox.phonegap._base.Registry");

dojox.phonegap.init = function(config) {
	config = config || {};
	var pg = dojox.phonegap;
	
	/*=====
	phonegap = {
		// isBrowser: Boolean
		//		True if the client is a web-browser
		// isMobile: Boolean
		//		True if the client is a mobile browser
		// isIPhone: Boolean
		//		True if the client is running on the iPhone
		// isAndroid: Boolean
		//		True if the client is running on the Android
	}
	=====*/
	pg.isBrowser = false;
	pg.isMobile  = false;
	pg.isIPhone  = false;
	pg.isAndroid = false;
	pg.hostenv   = null;
	
	// Detect host device
	var ua = dojo.global.navigator.userAgent;
	if (ua.match(/iPhone/)){
		pg.isIPhone = true;
		pg.hostenv = "iphone";
	}else if (ua.match(/Android/)){
		pg.isAndroid = true;
		pg.hostenv = "android";
	}else{
		pg.isBrowser = dojo.isBrowser;
		pg.hostenv = config.emulate;
	}
	pg.isMobile = !pg.isBrowser;
	
	pg.registry = new dojox.phonegap.Registry();
	dojo.connect(dojo.doc, "deviceready", function() {
		pg.isDeviceReady = true;
		dojo.publish("/phonegap/deviceReady", []);
	});
}

dojox.phonegap.configure = function(overrides) {
	var config = { emulate: "iphone", debugConsole: false, init: true };
	if (overrides){
		dojo.mixin(config, overrides);
	}
	return config;
}

dojox.phonegap.config = dojox.phonegap.configure(dojo.global["pgConfig"]);
if (dojox.phonegap.config.init){
	dojox.phonegap.init(dojox.phonegap.config);
}

//>>excludeStart("browser", !kwArgs.pgBrowser)
dojo.requireIf(dojox.phonegap.isBrowser, "dojox.phonegap._base.driver.hostenv_browser");
//>>excludeEnd("browser")

//>>excludeStart("mobile", kwArgs.pgBrowser)
dojo.requireIf(dojox.phonegap.isMobile, "dojox.phonegap._base.driver.hostenv_mobile");
//>>excludeEnd("mobile")
