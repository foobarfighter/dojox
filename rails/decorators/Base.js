dojo.provide("dojox.rails.decorators.Base");

dojo.declare("dojox.rails.decorators.Base", null, {
  domNode: null,

	constructor: function(node) {
		this.domNode = node;
	}
});