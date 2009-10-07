dojo.provide("dojox.rails.tests.module");
try{
	dojo.requireIf(!dojo.isBrowser, "dojox.rails.tests.rhino");
	doh.registerUrl("dojox.rails.tests.RemoteForm", dojo.moduleUrl("dojox", "rails/tests/test_RemoteForm.html"));
	doh.registerUrl("dojox.rails.tests.Parser", dojo.moduleUrl("dojox", "rails/tests/test_Parser.html"));
}catch(e){
	doh.debug(e);
}

