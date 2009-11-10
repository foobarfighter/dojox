dojo.provide("dojox.rails.decorators.Request");
dojo.require("dojox.rails");
dojo.require("dojox.rails.decorators.common");

dojo.declare("dojox.rails.decorators.Request",
  dojox.rails.decorators.Base, {

  constructor: function(node) {
    this._connects = [];
    this._requestArgs = {};

    var attributes = this._parseAttributes(this.domNode);
    var requestCallbacks = this._mapAttributes(attributes, dojox.rails.decorators._CallbackMap);

    this._requestArgs = this._mapAttributes(attributes, dojox.rails.decorators._RequestArgMap);
    this._connectHandlers(requestCallbacks);
  },

  // Connection events
  onSuccess: function(request, ioArgs) {},
  onFailure: function(request, ioArgs) {},
  onComplete: function(request, ioArgs) {},

  getMethod: function() {
    return this._requestArgs.method || "get";
  },

  setMethod: function(method){
    this._requestArgs.method = method.toLowerCase();
  },

  exec: function(url, /*Object?*/ xhrArgs) {
    xhrArgs = xhrArgs || {};
    if (url){ xhrArgs.url = url }

    var dojoArgs = this._argsToDojo(xhrArgs);
    var xhrMethod = dojo["xhr" + dojox.rails.camelize(this.getMethod(), true)];
    if (xhrMethod){
      xhrMethod(dojoArgs);
    }else{
      dojo.xhr(this.getMethod(), dojoArgs);
    }
  },

  _parseAttributes: function(node){
    var attrs = node.attributes;
    var parsedAttrs = {};
    for (var i = 0; i < attrs.length; i++) {
      if (!attrs[i]) continue;

      var matches = attrs[i].name.match(/^data-(.*)/);
      if (matches && matches.length > 1) {
        parsedAttrs[matches[1]] = dojo.attr(node, attrs[i].name);
      }
    }
    return parsedAttrs;
  },

  _mapAttributes: function(attributes, mapper){
    return mapper.map(attributes);
  },

  _connectHandlers: function(callbacks){
    var handlers = ["onSuccess", "onFailure", "onComplete"];
    dojo.forEach(handlers, function(h){
			if (!callbacks[h]){return;}
      this._connects.push(dojo.connect(this, h, this, callbacks[h]));
    }, this);
  },

  _argsToDojo: function(xhrArgs){
    var dojoArgs = {}, drd = dojox.rails.decorators;
    var callbacks = { load: this.onSuccess, error: this.onFailure, handle: this.onComplete }
    
    dojo.mixin(dojoArgs, callbacks);
    dojo.mixin(dojoArgs, this._requestArgs);
    dojo.mixin(dojoArgs, xhrArgs);

    return dojoArgs;
  }
});

(function() {
  var drd = dojox.rails.decorators;
  var drap = dojox.rails.AttributeParser;

  drd._CallbackMap = new drd.ArgMap({
    "uninitialized-code":	drap.ThrowUnsupported,
    "loading-code":				drap.ThrowUnsupported,
    "loaded-code":				drap.ThrowUnsupported,
    "interactive-code":		drap.ThrowUnsupported,
    "create-code":        drap.ThrowUnsupported,
    "complete-code":			["onComplete", drap.Code],
    "failure-code":				["onFailure", drap.Code],
    "success-code":				["onSuccess", drap.Code]
  });

  drd._RequestArgMap = new drd.ArgMap({
    "url":                "url",
    "method":	            function(v) { return v.toLowerCase(); },
    "params":		          [ "content", function(v) { return dojo.isObject(v) ? v : dojo.queryToObject(v); } ],
    "sync":               drap.TrueFalse,
    "eval":	              ["evalScripts", drap.TrueFalse]
  });
})();