dojo.provide("dojox.rails.decorators.common");

dojo.declare("dojox.rails.decorators.Base", null, {
	constructor: function(node) {
		this.domNode = dojo.byId(node);
	},

	throwUnimplemented: function(feature){
		throw new Error(feature + ": not implemented");
	}
});

dojo.declare("dojox.rails.decorators.ArgMap", null, {
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