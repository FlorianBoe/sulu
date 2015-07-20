define(["sulusnippet/components/snippet/main","sulusnippet/model/snippet","sulucontent/components/copy-locale-overlay/main"],function(a,b,c){"use strict";var d={localizationUrl:"/admin/api/localizations"},e=function(){return a.call(this),this};return e.prototype=Object.create(a.prototype),e.prototype.constructor=a,e.prototype.view=!0,e.prototype.layout={sidebar:!1,navigation:{collapsed:!1},content:{width:"fixed",shrinkable:!1}},e.prototype.header=function(){return{breadcrumb:this.breadcrumb,tabs:{url:"/admin/content-navigations?alias=snippet"},toolbar:{languageChanger:{url:"/admin/api/languages",preSelected:this.options.language},template:[{id:"save-button",icon:"floppy-o",iconSize:"large","class":"highlight",position:1,group:"left",disabled:!0,callback:function(){this.sandbox.emit("sulu.header.toolbar.save")}.bind(this)},{id:"template",icon:"pencil",iconSize:"large",group:"left",position:10,type:"select",title:"",hidden:!1,itemsOption:{url:"/admin/api/snippet/types",titleAttribute:"title",idAttribute:"template",translate:!1,markable:!0,callback:function(a){this.template&&this.setHeaderBar(!1),this.sandbox.emit("sulu.dropdown.template.item-clicked",a),this.template=a.template}.bind(this)}},{icon:"gear",iconSize:"large",group:"left",id:"options-button",position:30,items:[{title:this.sandbox.translate("toolbar.delete"),callback:function(){this.sandbox.emit("sulu.snippets.snippet.delete",this.data.id)}.bind(this)},{title:this.sandbox.translate("toolbar.copy-locale"),callback:function(){c.startCopyLocalesOverlay.call(this).then(function(){this.load(this.data.id,this.options.language,!0)}.bind(this))}.bind(this)}]}]}}},e.prototype.initialize=function(){this.type=this.options.id?"edit":"add",this.headerDef=this.sandbox.data.deferred(),this.dataDef=this.sandbox.data.deferred(),this.bindModelEvents(),this.bindCustomEvents(),this.loadLocalizations(),this.loadData()},e.prototype.loadLocalizations=function(){this.sandbox.util.load(d.localizationUrl).then(function(a){this.localizations=a._embedded.localizations.map(function(a){return{id:a.localization,title:a.localization}})}.bind(this))},e.prototype.bindCustomEvents=function(){this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.snippets.snippet.list")}.bind(this)),this.sandbox.on("husky.toolbar.header.initialized",function(){this.headerDef.resolve()}.bind(this)),this.sandbox.on("sulu.snippets.snippet.get-data",function(a){this.dataDef.then(function(){a(this.data)}.bind(this))}.bind(this)),this.sandbox.on("sulu.snippets.snippet.set-header-bar",function(a){this.setHeaderBar(a)}.bind(this)),this.sandbox.on("sulu.snippets.snippet.saved",function(a){this.data=a,this.setHeaderBar(!0),this.setTitle(this.data.title),this.sandbox.emit("sulu.labels.success.show","labels.success.content-save-desc","labels.success")},this),this.sandbox.on("sulu.snippets.snippet.save-error",function(){this.sandbox.emit("sulu.labels.error.show","labels.error.content-save-desc","labels.error"),this.setHeaderBar(!1)},this)},e.prototype.setHeaderBar=function(a){if(a!==this.saved){var b=this.data&&this.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,this.highlightSaveButton),this.sandbox.emit("sulu.preview.state.change",a)}this.saved=a,this.saved&&(this.contentChanged=!1)},e.prototype.loadData=function(){this.model||(this.model=new b({id:this.options.id})),void 0!==this.options.id?this.model.fullFetch(this.options.language,{success:function(a){this.render(a.toJSON()),this.dataDef.resolve()}.bind(this)}):(this.render(this.model.toJSON()),this.dataDef.resolve())},e.prototype.render=function(a){this.data=a,this.template=a.template,this.headerDef.then(function(){this.setTitle(a.title)}.bind(this))},e.prototype.setTitle=function(a){var b=[{title:"navigation.snippets"}];this.options.id&&""!==a?(this.sandbox.emit("sulu.header.set-title",this.sandbox.util.cropMiddle(a,40)),b.push({title:a}),this.sandbox.emit("sulu.header.set-breadcrumb",b)):(this.sandbox.emit("sulu.header.set-title",this.sandbox.translate("snippets.snippet.title")),this.sandbox.emit("sulu.header.set-breadcrumb",b))},new e});