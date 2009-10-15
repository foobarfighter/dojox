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

  setMethod: function(method){
    this._method = method.toLowerCase();
  },

  exec: function(url, /*Object?*/ xhrArgs) {
    xhrArgs = xhrArgs || {};
    if (url){ xhrArgs.url = url }

    var dojoArgs = this._mapToDojo(xhrArgs);
    var xhrMethod = dojo["xhr" + dojox.rails.camelize(this.getMethod(), true)];
    if (xhrMethod){
      xhrMethod(dojoArgs);
    }else{
      dojo.xhr(this.getMethod(), dojoArgs);
    }
  },

  _mapToDojo: function(xhrArgs){
    var dojoArgs = xhrArgs, drd = dojox.rails.decorators;
    dojo.mixin(dojoArgs, drd._XhrArgMap.map(this._args));
    dojo.mixin(dojoArgs, drd._XhrCallbackMap.map(this));
    dojo.mixin(dojoArgs, xhrArgs);
    return dojoArgs;
  },

  _parseArgs: function() {
    var keys = dojox.rails.decorators._XhrArgMap.getMappingKeys();
    dojo.forEach(keys, function(key){
      var v = dojo.attr(this.domNode, "data-" + key);
      if (v){this._args[key] = v}
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

(function() {
  var drd = dojox.rails.decorators;

  drd._XhrCallbackMap = new drd.ArgMap({
    "onUninitialized":	null,
    "onLoading":				null,
    "onLoaded":					null,
    "onInteractive":		null,
    "onCreate":         null,
    "onComplete":				"handle",
    "onFailure":				"error",
    "onSuccess":				"load"
  });

  var parseTrueFalse = function(v) { return v == "true" || v == true };

  drd._XhrArgMap = new drd.ArgMap({
    "url":        "url",
    "sync":       parseTrueFalse,
    "method":	    function(v) { return v.toLowerCase(); },
    "params":		  [ "content", function(v) { return dojo.isObject(v) ? v : dojo.queryToObject(v); } ],
    "eval":	      ["evalScripts", parseTrueFalse]
  });
})();