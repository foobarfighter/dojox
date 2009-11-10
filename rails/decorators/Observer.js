dojo.provide("dojox.rails.decorators.Observer");
dojo.require("dojox.rails.decorators.Updater");
dojo.require("dojox.rails.listeners");

dojo.declare("dojox.rails.decorators.Observer",
  dojox.rails.decorators.Updater, {

	constructor: function(node) {
		this._observerArgs = {};

		var attributes = this._parseAttributes(this.domNode);
		this._observerArgs = this._mapAttributes(attributes, dojox.rails.decorators._ObserverArgMap);

		this._listener = null;
		this.register();
		this._lastValue = this.getValue();
	},

	register: function() {
		this._register(this._observerArgs.frequency, this._observerArgs.observed);
	},

	listenerClass: function(){
		this.throwUnimplemented("listenerClass");
	},

	getValue: function() {
		this.throwUnimplemented("getValue");
	},

	onObservation: function(value, lastValue){
		if (this._observerArgs.callback){									// FIXME: Add test
			this._observerArgs.callback(value, lastValue);
		}
	},

	onEvent: function(){
		var v = this.getValue();
		if (this._lastValue != v){
			this.onObservation(v, this._lastValue);
			this._lastValue = v;
		}
	},

	registerListener: function(listenerClass, arg){
		var callback = dojo.hitch(this, "onEvent");
		if (this._listener){this._listener.stop();}
		this._listener = new listenerClass(callback, arg);
		this._listener.listen();
	},

	getObserved: function(){
		return dojo.byId(this._observerArgs.observed);
	},

	getListener: function(){
		return this._listener;
	},

	//FIXME: Add tests
	destroy: function(){
		if (this._listener){this._listener.stop();}
		this._listener = null;
		this._observerArgs = null;
		this._lastValue = null;
	},

	_register: function(frequency, observed){
		if (frequency){
			this.registerListener(dojox.rails.listeners.TimerListener, frequency);
		}else{
			this.registerListener(this.listenerClass(), observed);
		}
	}
});

(function() {
  var drd = dojox.rails.decorators;
  var drap = dojox.rails.AttributeParser;

  drd._ObserverArgMap = new drd.ArgMap({
		"observed":					"observed",
		"observer-code":		["callback", drap.Code],
		"frequency":				["frequency", function(v){return drap.Float(v)*1000}]
  });
})();
