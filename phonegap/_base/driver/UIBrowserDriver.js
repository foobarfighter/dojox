dojo.provide("dojox.phonegap._base.driver.UIBrowserDriver");
dojo.require("dojox.phonegap._base.driver");

dojo.declare("dojox.phonegap.UIBrowserDriver", [dojox.phonegap.UIDriver], {
	prepareRendering: function(heading) {
		// Create a new enclosing node for the original header markup
		heading.domNode = dojo.create("span");
		heading.headerNode = dojo.clone(heading.srcNodeRef);
		
		// Clean out attributes that we don't want picked up by the parser
		dojo.removeAttr(heading.headerNode, "dojoType");
		dojo.removeAttr(heading.headerNode, "id");
		
		// Attach the cloned header node to the new enclosing node
		heading.domNode.appendChild(heading.headerNode);
		
		// Keep track of the view that we were created in
		heading.view = dijit.byNode(heading.srcNodeRef.parentNode);
		
		// Replace the original header markup with the new dom node and attach it to the dom
		heading.view.domNode.replaceChild(heading.domNode, heading.srcNodeRef);
	},
	
	createToolBar: function(heading) {
		// Take the heading and turn it into a dojox.mobile widget
		var h = new dojox.mobile.Heading({
			back: heading.back,
			moveTo: heading.moveTo,
			transition: heading.transition
		}, heading.headerNode);
		
		h.view = heading.view;
		dojo.connect(h, "onClick", heading, "onClick");
	},
});
