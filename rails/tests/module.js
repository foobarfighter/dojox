dojo.provide("dojox.rails.tests.module");
try{
  dojo.require("dojox.rails.tests._base.strings");
  doh.registerUrl("dojox.rails.tests._base.parser", dojo.moduleUrl("dojox", "rails/tests/_base/test_parser.html"));
  doh.registerUrl("dojox.rails.tests.listeners", dojo.moduleUrl("dojox", "rails/tests/test_listeners.html"));
  doh.registerUrl("dojox.rails.tests.decorators.common", dojo.moduleUrl("dojox", "rails/tests/decorators/test_common.html"));
  doh.registerUrl("dojox.rails.tests.decorators.Request", dojo.moduleUrl("dojox", "rails/tests/decorators/test_Request.html"));
  doh.registerUrl("dojox.rails.tests.decorators.Updater", dojo.moduleUrl("dojox", "rails/tests/decorators/test_Updater.html"));
  doh.registerUrl("dojox.rails.tests.decorators.Observer", dojo.moduleUrl("dojox", "rails/tests/decorators/test_Observer.html"));
  doh.registerUrl("dojox.rails.tests.decorators.RemoteLink", dojo.moduleUrl("dojox", "rails/tests/decorators/test_RemoteLink.html"));
}catch(e){
	doh.debug(e);
}
