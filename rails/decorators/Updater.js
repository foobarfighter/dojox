dojo.provide("dojox.rails.decorators.Updater");

dojo.require("dojox.rails");
dojo.require("dojox.rails.decorators.common");
dojo.require("dojox.rails.decorators.Request");

dojo.declare("dojox.rails.decorators.Updater", dojox.rails.decorators.Request, {
  _updaterArgs: {},

  constructor: function(domNode){
    var attributes = this._parseAttributes(this.domNode);
    var mappedArgs = this._mapAttributes(attributes, dojox.rails.decorators._UpdaterArgMap);

    dojo.mixin(this._updaterArgs, mappedArgs);
    dojo.connect(this, "onSuccess", this, "_handleSuccess");
    dojo.connect(this, "onFailure", this, "_handleFailure");
    dojo.connect(this, "onComplete", this, "_handleComplete");
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
  
  _handleSuccess: function(request, ioArgs){
    this._handle(request, ioArgs, this._updaterArgs.successQuery);
  },

  _handleFailure: function(request, ioArgs){
    this._handle(request, ioArgs, this._updaterArgs.failureQuery);
  },

  _handleComplete: function(request, ioArgs){
    this._handle(request, ioArgs, this._updaterArgs.completeQuery);
  },

  _handle: function(request, ioArgs, query){
    var nl = dojo.query(query);
    nl.place(request.responseText, this._updaterArgs.place);
  }
});


(function() {
  var drd = dojox.rails.decorators;

  var insertionMap = {
    "top":		 "first",
    "bottom":	 "last",
    "before":	 "before",
    "after":	 "after"
  };

  var parseTrueFalse = function(v) { return v == "true" || v == true };

  drd._UpdaterArgMap = new drd.ArgMap({
    "position": 	      [ "place", function(v) { return insertionMap[v] }],
    "update-success": 	"successQuery",
    "update-failure": 	"failureQuery",
    "update-complete": 	"completeQuery",
    "eval":	            ["evalScripts", parseTrueFalse]
  });
})();