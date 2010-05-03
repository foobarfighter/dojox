dojo.provide("dojox.phonegap._base.hostenv_mobile");
dojo.require("dojox.phonegap._base.driver");

if (!dojo.global["PhoneGap"]){ throw new Error("phonegap.js should be loaded before dojo"); }

dojo.declare("dojox.phonegap.UIPhoneGapDriver", [dojox.phonegap.UIDriver], {
	createToolBar: function(heading) {
		// Take the heading and turn it into a native iphone toolbar
	}
});

dojox.phonegap.ui = new dojox.phonegap.UIPhoneGapDriver();
