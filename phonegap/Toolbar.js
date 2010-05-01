dojo.provide("dojox.phonegap.Toolbar");
dojo.require("dojox.phonegap._Widget");

dojo.declare("dojox.phonegap.Toolbar", [dojox.phonegap._Widget], {
	_buttons: [],
	_deviceReadyDispatched: false,
	show: [],
	
	buildRendering: function(){
		this.inherited(arguments);
		dojo.query("div", this.domNode).forEach(function(node) {
			this._addButton(node);
		}, this);
		this._removeWidgetNodes();
	},
	
	add: function(button) {
		this._buttons.push(button);
	},
	
	onDeviceReady: function() {
		this.ui.createToolBar();
	},
	
	postDeviceReady: function() {
		this.ui.showToolBarItems.apply(this.ui, this.show);
	},
	
	_addButton: function(node) {
		var button = new dojox.phonegap.browser.ToolbarButton({
			title:      dojo.attr(node, "title"),
			name:       dojo.attr(node, "name"),
			appearance: dojo.attr(node, "appearance"),
			topic:      dojo.attr(node, "topic")
		});
		this.add(button);
	},
	
	_removeWidgetNodes: function() {
		dojo.empty(this.domNode);
		this.domNode.parentNode.removeChild(this.domNode);
	}
});

dojo.declare("dojox.phonegap.ToolbarButton", [dojox.phonegap._Widget], {
	name:       "",
	title:      "",
	appearance: "plain",
	topic:      "",
	
	onDeviceReady: function() {
		var options = { onClick: dojo.hitch(this, "_onClick") };
		this.ui.createToolBarItem(this.name, this.title, this.appearance, options);
	},
	
	onClick: function(button) {},
	
	_onClick: function() {
		if (this.topic){ dojo.publish(this.topic, [this]); }
		this.onClick(this);
	},
});