dojo.provide("phonegap.phonegap");
dojo.require("phonegap.Registry");

/*=====
pgConfig = {
	// emulate: String
	//		When running your phonegap application in the browser, it determines which device to emulate
	//		"iphone" or "android" Default is "iphone"
=====*/
phonegap.config = { emulate: "iphone", debugConsole: false };
if (dojo.global["pgConfig"]){
	dojo.mixin(phonegap.config, dojo.global.pgConfig);
}

(function(pg) {
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
		pg.hostenv = pg.config.emulate;
	}
	pg.isMobile = !pg.isBrowser;
	
	pg.registry = new phonegap.Registry();
	dojo.connect(dojo.doc, "deviceready", function() {
		pg.isDeviceReady = true;
		dojo.publish("/phonegap/deviceReady", []);
	});
	
	pg.loadCSS = function() {
		//FIXME: doc write is probably bad
		if (pg.isBrowser){
			dojo.doc.write('<link rel="stylesheet" type="text/css" href="phonegap/resources/phonegap_browser.css" />');
		}else{
			dojo.doc.write('<link rel="stylesheet" type="text/css" href="phonegap/resources/phonegap_' + pg.hostenv + '.css" />');
		}
	}
})(phonegap);

phonegap.loadCSS();

//>>excludeStart("browser", !kwArgs.pgBrowser)
dojo.requireIf(phonegap.isBrowser, "phonegap._base.hostenv_browser");
//>>excludeEnd("browser")

//>>excludeStart("mobile", kwArgs.pgBrowser)
dojo.requireIf(phonegap.isMobile, "phonegap._base.hostenv_mobile");
//>>excludeEnd("mobile")

//>>excludeStart("iphone", !kwArgs.pgIPhone)
dojo.requireIf(phonegap.isIPhone,  "phonegap._base.hostenv_iphone");
//>>excludeEnd("iphone")

//>>excludeStart("android", !kwArgs.pgAndroid)
dojo.requireIf(phonegap.isAndroid, "phonegap._base.hostenv_android");
//>>excludeEnd