dojo.provide("dojox.rails.listeners");

dojo.declare("dojox.rails.listeners.Listener", null, {
	constructor: function(callback, target){
		this._callback = callback;
	},

	trigger: function(){
		this._callback();
	},
	
	listen: function() {},
	stop: function(){}
});

dojo.declare("dojox.rails.listeners.TimerListener",
	dojox.rails.listeners.Listener,
{
	constructor: function(callback, period){
		this._period = period;
	},

	listen: function(){
		this._interval = setInterval(dojo.hitch(this, "trigger"), this._period);
	},

	stop: function(){
		clearInterval(this._interval);
	}
});

dojo.declare("dojox.rails.listeners.ElementChangeListener",
	dojox.rails.listeners.Listener,
{
	constructor: function(callback, element){
		this._element = dojo.byId(element);
		this._connect = null;
	},

	listen: function(){
		var el = this._element;
		var type = (el.type||"").toLowerCase();
		if (type == "") throw new Error("Invalid type for element: " + el.constructor.toString() + ".	Did you forget to specify an input type in your markup?");

		var evtType;
		switch(el.type){
			case 'checkbox': // fall through
			case 'radio':
				evtType = 'onclick';
				break;
			default:
				evtType = 'onchange';
		}
		this._connect = dojo.connect(el, evtType, this, "trigger");
	},

	stop: function(){
		dojo.disconnect(this._connect);
	}
});

dojo.declare("dojox.rails.listeners.FormChangeListener",
	dojox.rails.listeners.Listener,
{
	constructor: function(callback, form){
		this._form = dojo.byId(form);
		this._listeners = []
	},

	listen: function(){
		var cb = dojo.hitch(this, "trigger");
		dojo.forEach(this._form.elements, function(node){
			var listener = new dojox.rails.listeners.ElementChangeListener(cb, node);
			this._listeners.push(listener);
			listener.listen();
		}, this);
	},

	stop: function(){
		dojo.forEach(this._listeners, function(listener){
			listener.stop();
		});
		this._listeners = [];
	}
});