dojo.provide("dojox.rails.decorators.RemoteSubmit");
dojo.require("dojox.rails.decorators.common");
dojo.require("dojox.rails.decorators.RemoteButton");

dojo.declare("dojox.rails.decorators.RemoteSubmit",
  dojox.rails.decorators.RemoteButton, {
	_submit: function(){
		var o = dojo.formToObject(this.domNode.form);
		this.exec(null, {content: o});
	}
});