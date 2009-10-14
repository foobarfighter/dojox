dojo.provide("dojox.rails.decorators.common");

dojo.declare("dojox.rails.decorators.Base", null, {
  domNode: null,

	constructor: function(node) {
		this.domNode = dojo.byId(node);
	}
});

dojo.declare("dojox.rails.decorators.ArgMap", null, {
  _mappings: null,

  constructor: function(mappings){
    this._mappings = mappings;
  },

  getMappingKeys: function(){
    var keys = [];
    for (var prop in this._mappings){
      keys.push(prop);
    }
    return keys;
  },

  map: function(args){
    var mappedArgs = {};
    for(var prop in args){
      if (!this._mappings[prop]) continue;

      var target = this._mappings[prop];
      var v = args[prop];

      if (dojo.isArray(target)){
        mappedArgs[target[0]] = target[1](v);
      }else if (dojo.isFunction(target)){
        mappedArgs[prop] = target(v);
      }else{
        mappedArgs[target.toString()] = v;
      }
    }
    return mappedArgs;
  }
});

(function() {
  var drd = dojox.rails.decorators;

  drd._XhrCallbackMap = drd.ArgMap({
    "onUninitialized":	null,
    "onLoading":				null,
    "onLoaded":					null,
    "onInteractive":		null,
    "onCreate":         null,
    "onComplete":				"handle",
    "onFailure":				"error",
    "onSuccess":				"load"
  });

  var insertionMap = {
    "top":		 "first",
    "bottom":	 "last",
    "before":	 "before",
    "after":	 "after"
  };

  drd._XhrArgMap = drd.ArgMap({
    "sync":       "sync",
    "method":	    function(v) { return v.toLowerCase(); },
    "insertion":	[ "place", function(v) { return insertionMap[v] }],
    "params":		  [ "content", function(v) { return dojo.isObject(v) ? v : dojo.queryToObject(v); } ],
    "eval":	      "evalScripts"
  });
})();

