dojo.provide("dojox.rails.decorators.Request");
dojo.require("dojox.rails.decorators.Base");

dojo.declare("dojox.rails.decorators.Request",
  dojox.rails.decorators.Base, {

  _connects: [],
  _method: "GET",

	constructor: function(node) {
    this._initializeMethod();
    this._initializeCodeHandlers();
	},

  getMethod: function() {
    return this._method;
  },

  exec: function(){
  },

  onSuccess: function(request, ioArgs){
  },

  onFailure: function(request, ioArgs){
  },

  onComplete: function(request, ioArgs){
  },

  onInteractive: function(request, ioArgs){
  },

  onLoaded: function(request, ioArgs){
  },

  onLoading: function(request, ioArgs){
  },

  _initializeMethod: function() {
    var m = dojo.attr(this.domNode, "data-method") || dojo.attr(this.domNode, "method");
    if (m){this._method = m.toUpperCase()}
  },

  _initializeCodeHandlers: function() {
    var attrs = this.domNode.attributes;
    for(var i=0; i<attrs.length; i++){
      if (!attrs[i]) continue;

      var matches = attrs[i].name.match(/data-(.*)-code/);
      if (matches && matches.length > 1) {
        this._mapAndConnect(matches[1], dojo.attr(this.domNode, attrs[i].name));
      }
    }
  },

  _mapAndConnect: function(cbName, cbCode) {
    var mappedCallback = dojox.rails.decorators.Request._CallbackMap[cbName];
    if (mappedCallback){
      this._connects.push(dojo.connect(this, mappedCallback, null, this._evalCallback(cbCode)));
    }else{
      this._throwUnsupportedCallbackError(cbName);
    }
  },

  _evalCallback: function(value) {
    return eval("(" + value + ")");
  },

  _throwUnsupportedCallbackError: function(cbName) {
    throw new Error("'" + cbName + "' is an unsupported callback");
  }
});

dojox.rails.decorators.Request._CallbackMap = {
  success:      "onSuccess",
  failure:      "onFailure",
  complete:     "onComplete",
  interactive:  "onInteractive",
  loaded:       "onLoaded",
  loading:      "onLoading"
}