dojo.provide("dojox.rails.decorators.Updater");

dojo.require("dojox.rails");
dojo.require("dojox.rails.decorators.common");
dojo.require("dojox.rails.decorators.Request");

dojo.declare("dojox.rails.decorators.Updater", dojox.rails.decorators.Request, {
  _updaterArgs: {},

  constructor: function(domNode){
  },

  parseUpdaterArgs: function(){
    var drd = dojox.rails.decorators;
    var keys = drd._UpdaterArgMap.getMappingKeys();
  }

//  _parseUpdateHandlers: function(){},
//  _parsePosition: function(){},
//  _parseUpdaterArgs: function() {}
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