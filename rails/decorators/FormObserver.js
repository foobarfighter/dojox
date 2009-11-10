dojo.provide("dojox.rails.decorators.FormObserver");
dojo.require("dojox.rails.decorators.Observer");
dojo.require("dojox.rails.listeners");

dojo.declare("dojox.rails.decorators.FormObserver",
	dojox.rails.decorators.Observer, {

	listenerClass: function() {
		return dojox.rails.listeners.FormChangeListener;
	},

	// TODO: Need to add tests!!!!!!!
	compare: function(newValue, oldValue){
		if (dojo.isString(newValue)){
			if (!dojo.isString(oldValue)){return true;}
			return newValue != oldValue;
		}

		if (dojo.isArray(newValue)){
			if(!dojo.isArray(oldValue) || newValue.length != oldValue.length){return true;}

			for (var i=0; i<newValue.length; ++i){
				if (this.compare(newValue[i], oldValue[i])){return true;}
			}
			return false;
		}

		if (dojo.isObject(newValue)){
			if (!dojo.isObject(oldValue)) {return true;}

			var keys = [];
			for(var prop in newValue){
				keys.push(prop);
				if (this.compare(newValue[prop], oldValue[prop])){ return true;}
			}
			for (var i=0; i<keys.length; ++i){
				var key = keys[i];
				if (oldValue[key] === undefined){return true};
			}
			return false;
		}

		return newValue != oldValue;
	},

	onObservation: function(value, lastValue){
		if (this._observerArgs.callback){
			this._observerArgs.callback(value, lastValue);
		}else{
			this.exec(null, { content: value });				// FIXME: this is kinda ugly.  exec should normalize arguments
		}
	},

	getValue: function() {
		this._target = this._target || dojo.byId(this._observerArgs.observed);
		return dojo.formToObject(this._target);
	}
});