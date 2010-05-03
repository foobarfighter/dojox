dojo.provide("dojox.phonegap");
dojo.require("dojox.phonegap._base");
dojo.require("dojox.mobile.parser");

// Tell the loader that we actually got the dojo.parser module
// so everything that relies on dojo.parser (e.g. dijit._Templated)
// thinks the parser is already here.
dojo.parser = dojox.mobile.parser;
dojo._loadedModules["dojo.parser"] = dojox.mobile.parser;

dojo.require("dojox.mobile");
dojo.requireIf(!dojo.isWebKit, "dojox.mobile.compat");
