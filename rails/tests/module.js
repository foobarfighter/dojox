dojo.provide("dojox.rails.tests.module");
try{
  dojo.require("dojox.rails.tests.strings");
  doh.registerUrl("dojox.rails.tests.parser", dojo.moduleUrl("dojox", "rails/tests/test_parser.html"));
  doh.registerUrl("dojox.rails.tests.decorators.common", dojo.moduleUrl("dojox", "rails/tests/decorators/test_common.html"));
  doh.registerUrl("dojox.rails.tests.decorators.Request", dojo.moduleUrl("dojox", "rails/tests/decorators/test_Request.html"));
  doh.registerUrl("dojox.rails.tests.decorators.RemoteForm", dojo.moduleUrl("dojox", "rails/tests/decorators/test_RemoteForm.html"));
  doh.registerUrl("dojox.rails.tests.decorators.FieldObserver", dojo.moduleUrl("dojox", "rails/tests/decorators/test_FieldObserver.html"));
}catch(e){
	doh.debug(e);
}

