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

      var module = "dojox.rails." + className;
      d.require(module);
      dr.manager.register(jsType, new dr[className](node));
		});
	}
	
	if (d.config.parseOnLoad) {
		d.addOnLoad(function() {
			var parsedNodes = dr.parse();
			dr.delegate(parsedNodes);
		});
	}
})();