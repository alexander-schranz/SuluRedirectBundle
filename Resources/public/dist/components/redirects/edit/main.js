define(["jquery","services/suluredirect/redirect-manager","services/suluredirect/redirect-router"],function(a,b,c){"use strict";return{defaults:{translations:{headline:"sulu_redirect.title",enabled:"sulu_redirect.enabled",enable:"sulu_redirect.enable",disable:"sulu_redirect.disable",status301:"sulu_redirect.status-code.301",status302:"sulu_redirect.status-code.302"}},header:function(){return{title:function(){return this.data.source?this.data.source:this.translations.headline}.bind(this),tabs:{url:"/admin/content-navigations?alias=redirect-routes",options:{data:function(){return this.sandbox.util.extend(!1,{},this.data)}.bind(this)},componentOptions:{values:this.data}},toolbar:{buttons:{save:{parent:"saveWithOptions"},enabled:{parent:this.data.enabled?"toggler-on":"toggler",options:{title:this.data.enabled?this.translations.disable:this.translations.enable}},statusCode:{parent:"template",options:{title:this.data.statusCode?this.translations["status"+this.data.statusCode]:this.translations.status301,icon:"external-link",dropdownItems:[{id:301,title:this.translations.status301},{id:302,title:this.translations.status302}],dropdownOptions:{callback:function(a){this.changeStatusCode(a.id)}.bind(this)}}},edit:{options:{dropdownItems:{"delete":{options:{disabled:!this.options.id,callback:this["delete"].bind(this)}}}}}}}}},initialize:function(){this.bindCustomEvents()},bindCustomEvents:function(){this.sandbox.on("sulu.header.back",c.toList),this.sandbox.on("sulu.toolbar.save",this.save.bind(this)),this.sandbox.on("sulu.tab.dirty",this.enableSave.bind(this)),this.sandbox.on("sulu.tab.data-changed",this.setData.bind(this)),this.sandbox.on("husky.toggler.sulu-toolbar.changed",this.changeEnabled.bind(this))},save:function(a){this.loadingSave(),this.saveTab().then(function(b){this.afterSave(a,b)}.bind(this))},setData:function(a){this.data=a},changeEnabled:function(a){this.sandbox.emit("sulu.header.toolbar.button.set","enabled",{title:a?this.translations.disable:this.translations.enable}),this.data.enabled=a,this.enableSave()},changeStatusCode:function(a){this.data.statusCode=a,this.enableSave()},saveTab:function(){var b=a.Deferred();return this.sandbox.once("sulu.tab.saved",function(a){this.setData(a),b.resolve(a)}.bind(this)),this.sandbox.emit("sulu.tab.save",this.data),b},enableSave:function(){this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1)},loadingSave:function(){this.sandbox.emit("sulu.header.toolbar.item.loading","save")},afterSave:function(a,b){this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0),this.sandbox.emit("sulu.header.saved",b),"back"===a?c.toList():"new"===a?c.toAdd():this.options.id||c.toEdit(b.id)},"delete":function(){this.sandbox.sulu.showDeleteDialog(function(a){a&&b["delete"](this.options.id).then(c.toList)}.bind(this))},loadComponentData:function(){return this.options.id?b.load(this.options.id):{enabled:!0,statusCode:301}}}});