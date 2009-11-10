dojo.provide("dojox.rails.decorators.PeriodicalExecuter");
dojo.require("dojox.rails.decorators.Updater");
dojo.require("dojox.rails.listeners");

dojo.declare("dojox.rails.decorators.PeriodicalExecuter",
	[dojox.rails.decorators.Updater], {

	constructor: function(node){
		var attributes = this._parseAttributes(this.domNode);
		this._executerArgs = this._mapAttributes(attributes, dojox.rails.decorators._ExecuterArgMap);
		this.register();
	},

	register: function(){
		this._register(this._executerArgs.frequency);
	},

	onEvent: function(){
		this.exec();
	},

	getListener: function(){
		return this._listener;
	},

	_register: function(frequency){
		var callback = dojo.hitch(this, "onEvent");
		this._listener = new dojox.rails.listeners.TimerListener(callback, frequency);
		this._listener.listen();
	},

	destroy: function(){
		if (this._listener){this._listener.stop();}
	}
});

(function() {
  var drd = dojox.rails.decorators;
  var drap = dojox.rails.AttributeParser;

  drd._ExecuterArgMap = new drd.ArgMap({
		"frequency":				["frequency", function(v){return drap.Float(v)*1000}]
  });
})();