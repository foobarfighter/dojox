dojo.provide("dojox.rails.tests.module");
try{
  dojo.require("dojox.rails.tests.strings");
  doh.registerUrl("dojox.rails.tests.RemoteForm", dojo.moduleUrl("dojox", "rails/tests/test_RemoteForm.html"));
  doh.registerUrl("dojox.rails.tests.FieldObserver", dojo.moduleUrl("dojox", "rails/tests/test_FieldObserver.html"));
  doh.registerUrl("dojox.rails.tests.parser", dojo.moduleUrl("dojox", "rails/tests/test_parser.html"));
}catch(e){
	doh.debug(e);
}

