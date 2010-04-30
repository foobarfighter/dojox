dojo.provide("phonegap.tests.module");

try{
	// doh.registerUrl("dijit.tests.robot.Menu_mouse", dojo.moduleUrl("dijit","tests/robot/Menu_mouse.html"+userArgs)
	doh.registerUrl("phonegap.tests.browser.ToolBar", dojo.moduleUrl("phonegap","tests/browser/test_ToolBar.html"));
	
	// dojo.require("dijit.tests._base.module");
	// dojo.require("dijit.tests.infrastructure-module");
	// 
	// dojo.require("dijit.tests.general-module");
	// dojo.require("dijit.tests.tree.module");
	// dojo.require("dijit.tests.editor.module");
	// dojo.require("dijit.tests.form.module");
	// dojo.require("dijit.tests.layout.module");
}catch(e){
	doh.debug(e);
}
