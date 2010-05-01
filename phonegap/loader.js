dojo.provide("dojox.phonegap.loader");
// dojo.require("dojox.phonegap.Registry");

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
	
	// pg.registry = new dojox.phonegap.Registry();
	dojo.connect(dojo.doc, "deviceready", function() {
		pg.isDeviceReady = true;
		dojo.publish("/phonegap/deviceReady", []);
	});
	
	pg.loadCSS = function() {
		//FIXME: doc write is probably bad
		if (pg.isBrowser){
			// dojo.doc.write('<link rel="stylesheet" type="text/css" href="phonegap/resources/phonegap_browser.css" />');
		}else{
			// dojo.doc.write('<link rel="stylesheet" type="text/css" href="phonegap/resources/phonegap_' + pg.hostenv + '.css" />');
		}
	}
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

// dojox.phonegap.loadCSS();

//>>excludeStart("browser", !kwArgs.pgBrowser)
dojo.requireIf(dojox.phonegap.isBrowser, "dojox.phonegap._base.hostenv_browser");
//>>excludeEnd("browser")

//>>excludeStart("mobile", kwArgs.pgBrowser)
dojo.requireIf(dojox.phonegap.isMobile, "dojox.phonegap._base.hostenv_mobile");
//>>excludeEnd("mobile")

//>>excludeStart("iphone", !kwArgs.pgIPhone)
// dojo.requireIf(dojox.phonegap.isIPhone,  "dojox.phonegap._base.hostenv_iphone");
//>>excludeEnd("iphone")

//>>excludeStart("android", !kwArgs.pgAndroid)
// dojo.requireIf(dojox.phonegap.isAndroid, "dojox.phonegap._base.hostenv_android");
//>>excludeEnd