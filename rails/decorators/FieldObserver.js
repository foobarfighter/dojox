dojo.provide("dojox.rails.decorators.FieldObserver");
dojo.require("dojox.rails.decorators.Observer");
dojo.require("dojox.rails.listeners");

dojo.declare("dojox.rails.decorators.FieldObserver",
	dojox.rails.decorators.Observer, {

	listenerClass: function() {
		return dojox.rails.listeners.ElementChangeListener;
	},

	compare: function(newValue, lastValue){
		return newValue != lastValue;
	},

	onObservation: function(value, lastValue){
		if (this._observerArgs.callback){
			this._observerArgs.callback(value, lastValue);
		}else{
			var o = {};
			o[this._observerArgs.observed] = value;
			this.exec(null, { content: o });				// FIXME: this is kinda ugly.  exec should normalize arguments
		}
	},

	getValue: function() {
		this._target = this._target || dojo.byId(this._observerArgs.observed);
		return dojo.fieldToObject(this._target);
	}
});