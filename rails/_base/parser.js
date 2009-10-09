dojo.provide("dojox.rails._base.parser");

(function() {
	var dr = dojox.rails;
	var d = dojo;
	
	dr.manager = {
		_map: {},
		
		register: function(type, obj){
			this._map[type] = this._map[type] || [];
			this._map[type].push(obj);
		},
		
		all: function(){
			var all = [];
      for (var type in this._map){
				all = all.concat(this._map[type]);
			}
			return all;
		},

    byNode: function(node){
      node = dojo.byId(node);
      if (!node) { return null }

      var decorators = this.findByType(dojo.attr(node, "data-js-type"));
      for (var i=0; i<decorators.length; i++){
        var decorator = decorators[i];
        if (node == decorator.domNode){ return decorator }
      }
      return null;
    },

    clear: function(){
      this._map = {};
    },
		
		findByType: function(type){
			return this._map[type] || [];
		}
	}
	
	dr.parse = function(){
		var nodes = d.query("*[data-js-type]");
    d.forEach(nodes, function(node){
      var tag = node.tagName.toLowerCase();
      var jsType = dojo.attr(node, "data-js-type");

      var className;
      if (tag == "script"){
        className = dr.camelize(jsType);
			} else {
				className = dr.camelize(dr.camelize(jsType + "_" + tag));
			}

      var module = "dojox.rails.decorators." + className;
      d.require(module);
      dr.manager.register(jsType, new dr.decorators[className](node));
		});
	}
	
	if (d.config.parseOnLoad) {
		d.addOnLoad(function() {
			dr.parse();
		});
	}
})();