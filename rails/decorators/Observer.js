dojo.provide("dojox.rails.decorators.Observer");
dojo.require("dojox.rails.decorators.Updater");

dojo.declare("dojox.rails.decorators.Observer",
  dojox.rails.decorators.Updater, {

	constructor: function(node) {
		if (!this.getValue){throw new Error("getValue: not implemented");}
		this._observerArgs = {};

		var attributes = this._parseAttributes(this.domNode);
		this._observerArgs = this._mapAttributes(attributes, dojox.rails.decorators._ObserverArgMap);

		this._connectObserverHandlers();
		if (this._observerArgs.frequency && this._observerArgs.frequency > 0){
			this.start();
		}else{
			// event
		}
	},

	onObservation: function(value){
	},

	start: function(){
		this.timer = setInterval(this._createListener(), this._observerArgs.frequency*1000);
	},

	stop: function(){
		clearInterval(this.timer);
	},

	_connectObserverHandlers: function(){
		if (this._observerArgs.observerCallback){
			this._connects.push(dojo.connect(this, "onObservation", this._observerArgs.observerCallback));
			// TODO: connect updater stuff?  should we be inheriting from an updater?
		}
	},

	_createListener: function(){
		return dojo.hitch(this, function(){
			this.onObservation(this.getValue());
		});
	}
});


(function() {
  var drd = dojox.rails.decorators;
  var drap = dojox.rails.AttributeParser;

  drd._ObserverArgMap = new drd.ArgMap({
		"observed":					"observed",
		"observer-code":		["observerCallback", drap.Code],
		"frequency":				drap.Float
  });
})();