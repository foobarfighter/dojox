dojo.provide("dojox.phonegap._base.driver.hostenv_browser");
dojo.require("dojox.phonegap._base.driver");
dojo.require("dojox.phonegap._base.driver.UIBrowserDriver");
dojo.require("dojox.mobile");

dojo.addOnLoad(function() {
	var e = dojo.doc.createEvent("Events");
	e.initEvent("deviceready", false, true);
	dojo.doc.dispatchEvent(e);
});

dojox.phonegap.ui = new dojox.phonegap.UIBrowserDriver();