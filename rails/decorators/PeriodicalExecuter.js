dojo.provide("dojox.rails.decorators.PeriodicalExecuter");
dojo.require("dojox.rails.decorators.Updater");
dojo.require("dojox.rails.listeners");

// NOTE: This is not an observer because it doesn't observe anything.
// It DOES have a TimerListener though
dojo.declare("dojox.rails.decorators.PeriodicalExecuter",
	[dojox.rails.decorators.Updater], {

	// FIXME: This is basically "working" pseudo-code
	constructor: function(node){
		this._executerArgs = {};
		this._executerArgs.interval = parseFloat(dojo.attr(node, "data-interval")) * 1000;

		var callback = dojo.hitch(this, "onEvent");
		this._listener = new dojox.rails.listeners.TimerListener(callback, this._executerArgs.interval);
		this._listener.listen();
	},

	onEvent: function(){
		this.exec();
	}

});