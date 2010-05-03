dojo.provide("dojox.phonegap._base.Registry");

// FIXME: Is this really a good idea?  This registry ensures that onDeviceReady
// and onPostDeviceReady handlers are always called atomicly.

dojo.declare("dojox.phonegap.Registry", [], {
	_registry: {},
	_widgetsToCheck: {},
	_pollTimeout: null,
	
	constructor: function() {
		this.poll();
	},
	
	register: function(widget) {
		this._registry[widget.id] = widget;
		this._widgetsToCheck[widget.id] = widget;
	},
	
	poll: function() {
		this._check();
		this._doPoll();
	},
	
	stop: function() {
		clearTimeout(this._pollTimeout);
	},
	
	_isHashEmpty: function(hash) {
		for (var i in hash){return false;}
		return true;
	},
	
	_check: function() {
		var r = this._widgetsToCheck;
		if (!dojox.phonegap.isDeviceReady || this._isHashEmpty(r)){
			this._doPoll();
			return;
		}
		
		var pendingDeviceReady = [];
		var pendingPostDeviceReady = [];
		for (var id in r){
			var w = r[id];
			if (!w._deviceReadyDispatched){
				pendingDeviceReady.push(w);
			}
			if (!w._postDeviceReadyDispatched){
				pendingPostDeviceReady.push(w);
			}
		}
		
		if (pendingDeviceReady.length){
			this._fire(pendingDeviceReady, "_onDeviceReady");
		}
		if (pendingPostDeviceReady.length){
			this._fire(pendingPostDeviceReady, "_onPostDeviceReady");
		}
		this._doPoll();
	},
	
	_fire: function(widgets, func) {
		var r = this._widgetsToCheck;
		dojo.forEach(widgets, function(w){
			if (r[w.id]){ delete r[w.id]; }
			w[func]();
		});
	},
	
	_doPoll: function() {
		this._pollTimeout = setTimeout(dojo.hitch(this, "_check"), 100);
	},
	
	unregister: function(widget) {
		delete this._registry[widget.id];
	}
});