dojo.provide("dojox.dtl._HtmlTemplated");
dojo.require("dijit._Templated");
dojo.require("dojox.dtl.html");
dojo.require("dojox.dtl.render.html");
dojo.require("dojox.dtl.contrib.dijit");

dojox.dtl._HtmlTemplated = {
	prototype: {
		_dijitTemplateCompat: false,
		buildRendering: function(){
			this.domNode = this.srcNodeRef;

			if(!this._render){
				var ddcd = dojox.dtl.contrib.dijit;
				ddcd.widgetsInTemplate = this.widgetsInTemplate;
				var old = ddcd.widgetsInTemplate;
				this._template = this._getCachedTemplate(this.templatePath, this.templateString);
				this._render = new dojox.dtl.render.html.Render(this.domNode, this._template);
				ddcd.widgetsInTemplate = old;
			}

			this.render();
		},
		setTemplate: function(/*String|dojo._Url*/ template, /*dojox.dtl.Context?*/ context){
			// summary:
			//		Quickly switch between templated by location
			if(dojox.dtl.text._isTemplate(template)){
				this._template = this._getCachedTemplate(null, template);
			}else{
				this._template = this._getCachedTemplate(template);
			}
			this.render(context);
		},
		render: function(/*dojox.dtl.Context?*/ context){
			this._render.render(this._template, this._getContext(context));
		},
		_getContext: function(context){
			context = context || new dojox.dtl.Context(this);
			context.setThis(this);
			return context;
		},
		_getCachedTemplate: function(templatePath, templateString){
			if(!this._templates){
				this._templates = {};
			}
			var key = templateString || templatePath.toString();
			var tmplts = this._templates;
			if(tmplts[key]){
				return tmplts[key];
			}
			return (tmplts[key] = new dojox.dtl.HtmlTemplate(
				dijit._Templated.getCachedTemplate(
					templatePath,
					templateString,
					true
				)
			));
		}
	}
};