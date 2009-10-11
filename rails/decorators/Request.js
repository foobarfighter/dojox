dojo.provide("dojox.rails.decorators.Request");
dojo.require("dojox.rails.decorators.Base");

dojo.declare("dojox.rails.decorators.Request",
  dojox.rails.decorators.Base, {

  _cb: [],

	constructor: function(node) {
    this.initializeCodeHandlers();
	},

  initializeCodeHandlers: function() {
    var attrs = this.domNode.attributes;
    for(var i=0; i<attrs.length; i++){
      if (!attrs[i]) continue;

      var matches = attrs[i].name.match(/data-(.*)-code/);
      if (matches && matches.length > 1) {
        this._map(matches[1], dojo.attr(this.domNode, attrs[i].name));
      }
    }
  },

  _map: function(cbName, cbValue) {
    var mappedCallback = dojox.rails.decorators.Request._cbMap[cbName];
    if (mappedCallback){
      this._cb[mappedCallback] = this._evalCallback(cbValue);
    } else {
      this._cb[cbName] = this._createUnsupportedOperation(cbName);
    }
  },

  _evalCallback: function(value) {
    return eval("(" + value + ")");
  },

  _createUnsupportedOperation: function(cbName) {
    return function() {
      throw new Error(cbName + " is an unsupported operation");
    }
  }
});

dojox.rails.decorators.Request._cbMap = {
  success: "load",
  failure: "error"
}