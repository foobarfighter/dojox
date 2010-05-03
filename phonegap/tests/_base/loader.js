dojo.provide("dojox.phonegap.tests._base.loader");
dojo.require("dojo.cache");
dojo.require("dojox.bdd.spec");
doh.globalize();

var pgConfig = { init: false };
dojo.require("dojox.phonegap._base.loader");

function init(overrides){
	dojox.phonegap.config = dojox.phonegap.configure(overrides)
	dojox.phonegap.init(dojox.phonegap.config);
}

function changeUserAgent(userAgent) {
	dojo.global = { navigator: { userAgent: userAgent } };
}

spec("hostenv", function(t) {
	var global;
	before(function() {
		global = dojo.global;
		init();
	});
	
	after(function() {
		dojo.global = global;
	});
	
	it("sets the environment flags", function(t) {
		t.t(dojox.phonegap.isBrowser);
		t.f(dojox.phonegap.isMobile);
		t.is("iphone", dojox.phonegap.hostenv);
		
		init({ emulate: "iphone" });
		t.is("iphone", dojox.phonegap.hostenv);
		
		init({ emulate: "android" });
		t.is("android", dojox.phonegap.hostenv);
		
		changeUserAgent("iPhone");
		init();
		t.f(dojox.phonegap.isBrowser);
		t.t(dojox.phonegap.isMobile);
		t.t(dojox.phonegap.isIPhone);
		t.f(dojox.phonegap.isAndroid);
		t.is("iphone", dojox.phonegap.hostenv);
		
		changeUserAgent("Android");
		init();
		t.f(dojox.phonegap.isBrowser);
		t.t(dojox.phonegap.isMobile);
		t.f(dojox.phonegap.isIPhone);
		t.t(dojox.phonegap.isAndroid);
		t.is("android", dojox.phonegap.hostenv);
	});	
});

spec("deviceready", function() {
	it("publishes the /phonegap/deviceReady topic when it receives the deviceReady event", function(t) {
		init();
		var published = false;
		dojo.subscribe("/phonegap/deviceReady", function() {
			published = true;
		});
		
		var e = dojo.doc.createEvent("Events");
		e.initEvent("deviceready", false, true);
		dojo.doc.dispatchEvent(e);
		
		t.t(published);
	});
});

spec("registry", function() {
	before(function() {
		dojox.phonegap.registry = null;
	});
	
	it("initializes a phonegap widget registry", function(t) {
		init();
		t.t(dojox.phonegap.registry.declaredClass == "dojox.phonegap.Registry");
	})
});

// spec("driver loading", function() {
// 	it("loads a driver based on the host environment", function() {
// 		
// 	});
// })

doh.spec.register();
