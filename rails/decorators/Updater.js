dojo.provide("dojox.rails.decorators.Updater");

dojo.require("dojox.rails");
dojo.require("dojox.rails.decorators.common");
dojo.require("dojox.rails.decorators.Request");

dojo.declare("dojox.rails.decorators.Updater", dojox.rails.decorators.Request, {
  STRIP_REGEXP: new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', "img"),

  constructor: function(domNode){
    this._updaterArgs = {};

    var attributes = this._parseAttributes(this.domNode);
    var mappedArgs = this._mapAttributes(attributes, dojox.rails.decorators._UpdaterArgMap);

    dojo.mixin(this._updaterArgs, mappedArgs);

    if (this._updaterArgs.successQuery) dojo.connect(this, "onSuccess", this, "_handleSuccess");
    if (this._updaterArgs.failureQuery) dojo.connect(this, "onFailure", this, "_handleFailure");
    if (this._updaterArgs.completeQuery) dojo.connect(this, "onComplete", this, "_handleComplete");
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
    var scripts = null;
    var responseText = request.status == null ? request.toString() : request.responseText;
		var doEval = this._updaterArgs.evalScripts;

		if (doEval){scripts = this._grepScripts(responseText)}
		responseText = this._strippedContent(responseText);
    this._placeHTML(query, responseText);

    if (doEval) this._evalScripts(scripts);
  },

  _placeHTML: function(query, content){
    var nl = dojo.query(query);
    nl.forEach(function(refNode){
      dojo.place("<!-- dojo.place hack -->" + content, refNode, this._updaterArgs.place);
    }, this);
  },

  _grepScripts: function(responseText){
		var scripts = [];
		dojo.forEach(this.STRIP_REGEXP.exec(responseText), function(script, i){
			if (i > 0) scripts.push(script);
		});
		return scripts;
	},

  _strippedContent: function(responseText){
		return responseText.replace(this.STRIP_REGEXP, "");
	},

	_evalScripts: function(scripts){
		if (!scripts) return;

		dojo.forEach(scripts, function(script){
			if (script) eval(script);
		});
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