dojo.provide("dojox.phonegap.tests.module");

// alert(dojo.moduleUrl("dojox.phonegap.tests","browser/test_ToolBar.html"));

try{
	dojo.require("dojox.phonegap.tests._base.loader");
	doh.registerUrl("dojox.phonegap.tests.driver.browser",
		dojo.moduleUrl("dojox.phonegap.tests._base.driver","test-hostenv_browser.html"));
}catch(e){
	doh.debug(e);
}
