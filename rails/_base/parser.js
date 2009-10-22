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
      var className = dr._resolveClassName(tag, jsType);
      
      d.require("dojox.rails.decorators." + className);
      dr.manager.register(jsType, new dr.decorators[className](node));
		});
	}

  dr._resolveClassName = function(tag, jsType){
      var className;
      if (tag == "script"){
        className = dr.camelize(jsType);
      } else {
        var tagMap = {'a': 'Link'};
				className = dr.camelize(dr.camelize(jsType + "_" + (tagMap[tag] || tag)));
			}
      return className;
  }
	
	if (d.config.parseOnLoad) {
		d.addOnLoad(function() {
			dr.parse();
		});
	}

  dr.AttributeParser = {
    TrueFalse:        function(v) { return v == "true" || v == true },
    ThrowUnsupported: function(v) { throw new Error("'data-" + v + "' is unsupported") },
    Code:             function(v) { return eval("(" + v + ")"); }
  };
})();