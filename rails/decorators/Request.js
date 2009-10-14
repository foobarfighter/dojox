dojo.provide("dojox.rails.decorators.Request");
dojo.require("dojox.rails.decorators.common");

dojo.declare("dojox.rails.decorators.Request",
  dojox.rails.decorators.Base, {

  _connects: [],
  _method: "get",
  _args: {},

  constructor: function(node) {
    this._parseMethod();
    this._parseArgs();
    this._parseCodeHandlers();
  },

  // Connection events
  onSuccess: function(request, ioArgs) {},
  onFailure: function(request, ioArgs) {},
  onComplete: function(request, ioArgs) {},
  onInteractive: function(request, ioArgs) {},
  onLoaded: function(request, ioArgs) {},
  onLoading: function(request, ioArgs) {},

  getMethod: function() {
    return this._method;
  },

  exec: function(url, /*Object?*/ xhrArgs) {
    var dojoArgs = this._mapToDojo(xhrArgs);
    var xhrMethod = dojo["xhr" + dojox.rails.camelize(this.getMethod(), true)];
    if (xhrMethod){
      xhrMethod(dojoArgs);
    }else{
      dojo.xhr(this.getMethod(), dojoArgs);
    }
  },

  _mapToDojo: function(xhrArgs){
    return {};
  },

  _parseArgs: function() {
    var keys = dojox.rails.decorators._XhrArgMap.getMappingsKeys
    dojo.forEach(keys, function(key){
      this._args[key] = dojo.attr(this.domNode, "data-" + key);
    }, this);
  },

  _parseMethod: function() {
    var m = dojo.attr(this.domNode, "data-method") || dojo.attr(this.domNode, "method");
    if (m) {
      this._method = m.toLowerCase()
    }
  },

  _parseCodeHandlers: function() {
    var attrs = this.domNode.attributes;
    for (var i = 0; i < attrs.length; i++) {
      if (!attrs[i]) continue;

      var matches = attrs[i].name.match(/data-(.*)-code/);
      if (matches && matches.length > 1) {
        this._mapAndConnect(matches[1], dojo.attr(this.domNode, attrs[i].name));
      }
    }
  },

  _mapAndConnect: function(cbName, cbCode) {
    var mappedCallback = "on" + dojox.rails.camelize(cbName, true);
    if (this[mappedCallback]) {
      this._connects.push(dojo.connect(this, mappedCallback, null, this._evalCallback(cbCode)));
    } else {
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
