dojo.provide("dojox.rails.decorators.RemoteLink");
dojo.require("dojox.rails.decorators.common");
dojo.require("dojox.rails.decorators.Updater");

dojo.declare("dojox.rails.decorators.RemoteLink",
  dojox.rails.decorators.Updater, {

	constructor: function(node) {
    var href = dojo.attr(this.domNode, "href");
    if (!this._requestArgs.url && href){this._requestArgs.url = href;}

    this._connectRemoteHandlers();
	},

  onClick: function(evt){
		this._submit();
    evt.preventDefault();
  },

	destroy: function(){
		dojo.forEach(this._connects, function(c){
			dojo.disconnect(c);
		});
	},

	_submit: function(){
		this.exec();
	},

	_connectRemoteHandlers: function(){
    this._connects.push(dojo.connect(this.domNode, "onclick", this, "onClick"));
  }
});