dojo.provide("dojox.rails.decorators.Observer");
dojo.require("dojox.rails.decorators.Updater");

dojo.declare("dojox.rails.decorators.Observer",
  dojox.rails.decorators.Updater, {

	constructor: function(node) {
		this._observerArgs = {};

		var attributes = this._parseAttributes(this.domNode);
		this._observerArgs = this._mapAttributes(attributes, dojox.rails.decorators._ObserverArgMap);

		this._targets = [];
		this.register();
		this._lastValue = this.getValue();
	},

	register: function() {
		this.throwUnimplemented("register");
	},

	getValue: function() {
		this.throwUnimplemented("getValue");
	},

	onObservation: function(value, lastValue){
		this._observerArgs.callback(value, lastValue);
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
		this._targets.push(new listenerClass(callback, arg));
	},

	getTargets: function(){
		return this._targets;
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



/**

 PeriodicalExecuter()
 ElementListener()


 class Observer {
 	_listeners

 	abstract -- register;
 	abstract -- getValue;

 	constructor: function(node){
 		parseAttributes
 		mapAttributes
 		register
 	}

 	onObservation:function(v){
 		this._observerArgs.callback(v);
 	}

 	registerTimedListener: function(interval){
 		_listeners.push(new PeriodicalExecuter(interval, onEvent))
  }

 	registerElementChangeListener: function(field){
 		_listeners.push(new ElementChangeListener(field, onEvent));
 	}

 	onEvent: function(){
 		if (lastValue != (v = getValue())){
 			this.onObservation(v)
 			lastValue = v;
 		}
 	}
 }

 class FormObserver {
 	register: function() {
		if interval
			registerTimedListener(interval)
 		else
 			foreach field {
 				registerElementChangeListener(field)
 			}
  }

 	getValue: function() {
 		return formValue;
 	}
 }

 ******

 class FieldObserver {
 	register: function(node) {
		if interval
			_registerTimedListener(interval)
 		else
 		  _registerElementChangeListener(field)
  }

 	getValue: function(){
 		return fieldValue
 	}
 }

 */
