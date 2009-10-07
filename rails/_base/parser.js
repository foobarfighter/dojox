dojo.provide("dojox.rails._base.parser");
dojo.require("dojox.rails.RemoteForm");
dojo.require("dojox.rails.FieldObserver");

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
				all.concat(this._map[type]);
			}
			return all;
		},
		
		findByType: function(type){
			return this._map[type] || [];
		}
	}
	
	dr.parse = function(){
		var remotes = d.query("*[data-js-type='remote']");
		var fieldObservers = d.query("*[data-js-type='observe_field']");
		return remotes.concat(fieldObservers);
	}
	
	dr.delegate = function(nodes){
		d.forEach(nodes, function(node){
			if (d.attr(node, "data-js-type") == "remote"){
				if (node.tagName.toLowerCase() == "form") {
					dr.manager.register("remote", new dr.RemoteForm(node));
				}
			} else if (d.attr(node, "data-js-type") == "observe_field") {
				dr.manager.register("observe_field", new dr.FieldObserver(node));
			}
		});
	}
	
	if (d.config.parseOnLoad) {
		d.addOnLoad(function() {
			var parsedNodes = dr.parse();
			dr.delegate(parsedNodes);
		});
	}
})();