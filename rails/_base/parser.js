dojo.provide("dojox.rails._base.parser");
dojo.require("dojox.rails.RemoteForm");

(function() {
	var dr = dojox.rails;
	var d = dojo;
	
	dr.manager = {
		_map: {},
		
		register: function(obj) {
			this._map[ob]
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
				if (node.tagName == "form")
					dr.manager.register("remote", new dr.RemoteForm(node));
				// else (node.tagName == "input" || node.tagName == "select" || node.tagName == "radio")
					// dr.manager.register("remote", new dr.RemoteForm(node));
			} else if (d.attr(node, "data-js-type") == "observe_field") {
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