dojo.provide("dojox.rails.decorators.FieldObserver");
dojo.require("dojox.rails.decorators.Observer");
dojo.require("dojox.rails.listeners");

dojo.declare("dojox.rails.decorators.FieldObserver",
	dojox.rails.decorators.Observer, {

	listenerClass: function() {
		return dojox.rails.listeners.ElementChangeListener;
	},

	getValue: function() {
		this._target = this._target || dojo.byId(this._observerArgs.observed);
		return dojo.fieldToObject(this._target);
	}
});