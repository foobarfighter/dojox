dojo.provide("dojox.phonegap._base.hostenv_browser");

dojo.requireIf(dojox.phonegap.config.debugConsole, "dojox.phonegap.debug.DebugConsole");

dojo.addOnLoad(function() {
	if (dojox.phonegap.config.debugConsole){
		dojox.phonegap.debug.DebugConsole.createLayout();
	}
	
	var e = dojo.doc.createEvent("Events");
	e.initEvent("deviceready", false, true);
	dojo.doc.dispatchEvent(e);
});

dojo.declare("dojox.phonegap._UIControls", [], {
	_toolBarNode: null,
	_toolBarItems: {},
	_cachedLayoutNode: null,
	
	createToolBar: function() {
		this._toolBarNode = dojo.create("div", {"class": "pgToolBar"});
		dojo.addClass(this._toolBarNode, "pgToolBar");
		dojo.place(this._toolBarNode, this._layoutNode(), "first");
	},
	
	createToolBarItem: function(name, title, style, options) {
		var itemNode = dojo.create("div", {
			"class":     "pgToolBarItem "+ style,
			"innerHTML": "<span>"+ title +"</span>"
		});
		if (options && options.onClick){
			dojo.connect(itemNode, "click", this, options.onClick);
		}
		
		this._toolBarItems[name] = itemNode;
	},
	
	toolBarItemClicked: function(tag){},
	
	showToolBarItems: function() {
		dojo.empty(this._toolBarNode);
		for (var i=0; i<arguments.length; ++i){
			var name = arguments[i];
			dojo.place(this._toolBarItems[name], this._toolBarNode);
		}
		this._layoutToolBar(arguments);
		dojo.place('<div class="clb"></div>', this._toolBarNode);
	},
	
	_layoutToolBar: function(items) {
		var positions = this._calculateToolBarItemPositions(items);
		dojo.query(">", this._toolBarNode).forEach(function(node, i) {
			dojo.style(node, "left", positions[i].left + "px");
		});
	},
	
	_calculateToolBarItemPositions: function(items) {
		var points = null;
		var l = items.length;
		switch(l){
			case 3:
				var sum = 0;
				var widths = [];
				for (var i=0; i<l; ++i){
					var name = items[i]
					var w = dojo.coords(this._toolBarItems[name]).w;
					sum += w;
					widths.push(w);
				}
				var offset = (dojo.coords(this._toolBarNode).w - sum)/2;
				points = [{left:0}, {left: offset}, {left: offset*2}];
				break;
			default:
				throw new Error("Cannot calculate ToolBar item positions for "+ l +" number of elements")
		}
		return points;
	},
	
	_layoutNode: function() {
		if (this._cachedLayoutNode){return this._cachedLayoutNode};
		
		var ws = dijit.registry.byClass("dojox.phonegap.Layout");
		if (!ws.length){throw new Error("Cannot find dojox.phonegap.Layout");}
		this._cachedLayoutNode = ws.toArray()[0].domNode;
		return this._cachedLayoutNode;
	}
});

dojox.phonegap.uicontrols = new dojox.phonegap._UIControls();