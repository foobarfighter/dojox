dojo.provide("dojox.rails.decorators.FormObserver");
dojo.require("dojox.rails.decorators.Observer");
dojo.require("dojox.rails.listeners");

dojo.declare("dojox.rails.decorators.FormObserver",
	dojox.rails.decorators.Observer, {

	listenerClass: function() {
		return dojox.rails.listeners.FormChangeListener;
	},

	getValue: function() {
		this._target = this._target || dojo.byId(this._observerArgs.observed);
		return dojo.formToObject(this._target);
	}
});