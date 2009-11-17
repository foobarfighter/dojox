dojo.provide("dojox.rails.decorators.RemoteForm");
dojo.require("dojox.rails.decorators.common");
dojo.require("dojox.rails.decorators.Updater");

dojo.declare("dojox.rails.decorators.RemoteForm",
  dojox.rails.decorators.Updater, {

	constructor: function(node) {
		var action = dojo.attr(this.domNode, "action");
		var method = dojo.attr(this.domNode, "method");
    if (!this._requestArgs.url && action){this._requestArgs.url = action;}
    if (method){this.setMethod(method);}

		this._connectRemoteButtonHandlers();
	},

	_connectRemoteButtonHandlers: function(){
		this._connects.push(dojo.connect(this.domNode, "onsubmit", this, "onSubmit"));
	},

	onSubmit: function(evt){
		this._submit();
    dojo.stopEvent(evt);
  },

	destroy: function(){
		dojo.forEach(this._connects, function(c){
			dojo.disconnect(c);
		});
	},

	_submit: function(){
		var o = dojo.formToObject(this.domNode);
		this.exec(null, {content: o});
	}

});