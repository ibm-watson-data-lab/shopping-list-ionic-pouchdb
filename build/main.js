webpackJsonp([2],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_datastore_datastore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShoppingListPage = (function () {
    function ShoppingListPage(navCtrl, navParams, alertCtrl, datastoreProvider, zone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.datastoreProvider = datastoreProvider;
        this.zone = zone;
        this.list = navParams.get('list');
        this.datastoreProvider.sync().subscribe(function (data) { return _this.zone.run(function () { return _this.loadItems(); }); }, function (err) { return console.log(err); }, function () { });
    }
    ShoppingListPage.prototype.ionViewWillEnter = function () {
        this.loadItems();
    };
    ShoppingListPage.prototype.loadItems = function () {
        var _this = this;
        this.datastoreProvider.loadActiveItems(this.list._id).then(function (items) {
            console.log(_this.items);
            _this.items = items;
        });
    };
    ShoppingListPage.prototype.addItem = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Add Item',
            inputs: [{
                    name: 'title'
                }],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        _this.datastoreProvider.addItem(data.title, _this.list._id)
                            .then(function (item) {
                            _this.items.push(item);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    ShoppingListPage.prototype.removeItem = function (event, item) {
        var _this = this;
        this.datastoreProvider.deleteItem(item)
            .then(function (deletedItem) {
            var index = _this.items.indexOf(item);
            if (index > -1) {
                _this.items.splice(index, 1);
            }
        });
    };
    ShoppingListPage.prototype.updateItemChecked = function (event, item) {
        var _this = this;
        this.datastoreProvider.toggleItemChecked(item)
            .then(function (newItem) {
            var index = _this.items.indexOf(item);
            if (index > -1) {
                _this.items.splice(index, 1, newItem);
            }
        });
    };
    return ShoppingListPage;
}());
ShoppingListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-shopping-list',template:/*ion-inline-start:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/pages/shopping-list/shopping-list.html"*/'<ion-header>\n  <ion-navbar>\n	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{list.title}}</ion-title>\n    <ion-buttons end>\n    	<button ion-button icon-only (click)="addItem()">\n    		<ion-icon name="add"></ion-icon>\n    	</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let item of items">\n      <ion-label>{{item.title}}</ion-label>\n      <ion-checkbox color="dark" checked="{{ item.checked }}" (ionChange)=\'updateItemChecked($event, item)\'></ion-checkbox>\n      	<button ion-button outline item-end (click)="removeItem($event, item)" icon-only danger>\n      		<ion-icon name="trash"></ion-icon>\n      	</button>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/pages/shopping-list/shopping-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_datastore_datastore__["a" /* DatastoreProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], ShoppingListPage);

//# sourceMappingURL=shopping-list.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shopping_lists_shopping_lists__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_datastore_datastore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, datastoreProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datastoreProvider = datastoreProvider;
        this.syncUrl = "";
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        this.syncUrl = this.datastoreProvider.activeSyncUrl;
    };
    SettingsPage.prototype.save = function () {
        this.datastoreProvider.updateSyncUrl(this.syncUrl);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__shopping_lists_shopping_lists__["a" /* ShoppingListsPage */]);
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n  	 <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    \n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-label color="primary" stacked>Sync URL</ion-label>\n    <ion-input placeholder="Cloudant or CouchDB URL" [(ngModel)]="syncUrl"></ion-input>\n    <button ion-button full (click)="save()">Save</button>\n</ion-content>\n'/*ion-inline-end:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/pages/settings/settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_datastore_datastore__["a" /* DatastoreProvider */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/settings/settings.module": [
		299,
		1
	],
	"../pages/shopping-list/shopping-list.module": [
		298,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(233);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_shopping_lists_shopping_lists__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_shopping_list_shopping_list__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_datastore_datastore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_shopping_lists_shopping_lists__["a" /* ShoppingListsPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/shopping-list/shopping-list.module#ShoppingListPageModule', name: 'ShoppingListPage', segment: 'shopping-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_shopping_lists_shopping_lists__["a" /* ShoppingListsPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__providers_datastore_datastore__["a" /* DatastoreProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_shopping_lists_shopping_lists__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_shopping_lists_shopping_lists__["a" /* ShoppingListsPage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Shopping Lists', component: __WEBPACK_IMPORTED_MODULE_2__pages_shopping_lists_shopping_lists__["a" /* ShoppingListsPage */] },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings__["a" /* SettingsPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/app/app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatastoreProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ibm_shopping_list_model__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ibm_shopping_list_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ibm_shopping_list_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pouchdb__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_pouchdb_find__ = __webpack_require__(267);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DatastoreProvider = (function () {
    function DatastoreProvider() {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_pouchdb__["a" /* default */].plugin(__WEBPACK_IMPORTED_MODULE_4_pouchdb_find__["a" /* default */]);
        this.settingsDB = new __WEBPACK_IMPORTED_MODULE_3_pouchdb__["a" /* default */]('settings');
        this.shoppingListDB = new __WEBPACK_IMPORTED_MODULE_3_pouchdb__["a" /* default */]('shopping-list');
        this.shoppingListFactory = new __WEBPACK_IMPORTED_MODULE_2_ibm_shopping_list_model__["ShoppingListFactory"]();
        this.shoppingListRepository = new __WEBPACK_IMPORTED_MODULE_2_ibm_shopping_list_model__["ShoppingListRepositoryPouchDB"](this.shoppingListDB);
        this.shoppingListRepository.ensureIndexes();
        this.activeSyncSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.settingsDB.get('settings')
            .then(function (doc) {
            _this.settingsDoc = doc;
            if (_this.settingsDoc) {
                _this.applySyncUrl(_this.settingsDoc.syncUrl, false);
            }
        }).catch(function (err) {
            // TODO:
            console.log(err);
        });
    }
    DatastoreProvider.prototype.sync = function () {
        return this.activeSyncSubject;
    };
    DatastoreProvider.prototype.startSync = function () {
        var _this = this;
        if (this.activeSync) {
            this.activeSync.cancel();
            this.activeSync = null;
        }
        if (this.activeSyncUrl && this.activeSyncUrl.length > 0) {
            var remoteDb = new __WEBPACK_IMPORTED_MODULE_3_pouchdb__["a" /* default */](this.activeSyncUrl);
            this.activeSync = this.shoppingListDB.sync(remoteDb, {
                live: true,
                retry: true
            }).on('change', function (change) {
                if (change.direction == "pull") {
                    _this.activeSyncSubject.next(change);
                }
            }).on('error', function (err) {
                _this.activeSyncSubject.next(err);
            });
        }
    };
    DatastoreProvider.prototype.updateSyncUrl = function (syncUrl) {
        this.applySyncUrl(syncUrl, true);
    };
    DatastoreProvider.prototype.applySyncUrl = function (syncUrl, updateDB) {
        var _this = this;
        if (syncUrl != this.activeSyncUrl) {
            if (!updateDB) {
                if (this.settingsDoc == null) {
                    this.settingsDoc = {
                        _id: 'settings',
                        syncUrl: syncUrl
                    };
                }
                else {
                    this.settingsDoc["syncUrl"] = syncUrl;
                }
                this.settingsDB.put(this.settingsDoc)
                    .then(function (response) {
                    _this.activeSyncUrl = syncUrl;
                    _this.settingsDoc._id = response.id;
                    _this.settingsDoc._rev = response.rev;
                    _this.startSync();
                }).catch(function (err) {
                    // TODO:
                    console.log(err);
                });
            }
            else {
                this.activeSyncUrl = syncUrl;
                this.startSync();
            }
        }
    };
    DatastoreProvider.prototype.loadLists = function () {
        var _this = this;
        var lists = [];
        var listItemPromises = [];
        return this.shoppingListRepository.find()
            .then(function (allLists) {
            for (var _i = 0, _a = allLists.toArray(); _i < _a.length; _i++) {
                var list = _a[_i];
                lists.push({ listId: list._id, list: list, itemCount: 0, itemCheckedCount: 0, items: [] });
                listItemPromises.push(_this.shoppingListRepository.findItems({
                    selector: {
                        type: 'item',
                        list: list._id
                    }
                }));
            }
            return Promise.all(listItemPromises);
        })
            .then(function (itemLists) {
            for (var _i = 0, itemLists_1 = itemLists; _i < itemLists_1.length; _i++) {
                var itemList = itemLists_1[_i];
                var itemArray = itemList.toArray();
                for (var _a = 0, itemArray_1 = itemArray; _a < itemArray_1.length; _a++) {
                    var item = itemArray_1[_a];
                    for (var _b = 0, lists_1 = lists; _b < lists_1.length; _b++) {
                        var list = lists_1[_b];
                        if (item.list == list.listId) {
                            list.items.push(item);
                            list.itemCount = list.itemCount + 1;
                            if (item.checked) {
                                list.itemCheckedCount = list.itemCheckedCount + 1;
                            }
                            break;
                        }
                    }
                }
            }
            return lists;
        });
    };
    DatastoreProvider.prototype.addList = function (title) {
        var list = this.shoppingListFactory.newShoppingList({
            title: title
        });
        return this.shoppingListRepository.put(list);
    };
    DatastoreProvider.prototype.deleteList = function (list) {
        var _this = this;
        return this.shoppingListRepository.get(list._id)
            .then(function (list) {
            return _this.shoppingListRepository.delete(list);
        });
    };
    DatastoreProvider.prototype.loadActiveItems = function (listId) {
        return this.shoppingListRepository.findItems({
            selector: {
                type: "item",
                list: listId
            }
        })
            .then(function (items) {
            return Promise.resolve(items.toArray());
        });
    };
    DatastoreProvider.prototype.addItem = function (text, listId) {
        var _this = this;
        return this.shoppingListRepository.get(listId)
            .then(function (list) {
            var item = _this.shoppingListFactory.newShoppingListItem({ title: text }, list);
            return _this.shoppingListRepository.putItem(item);
        });
    };
    DatastoreProvider.prototype.toggleItemChecked = function (item) {
        var _this = this;
        var checked = !item.checked;
        return this.shoppingListRepository.getItem(item._id)
            .then(function (item) {
            item = item.set('checked', checked);
            return _this.shoppingListRepository.putItem(item);
        });
    };
    DatastoreProvider.prototype.deleteItem = function (item) {
        var _this = this;
        return this.shoppingListRepository.getItem(item._id)
            .then(function (item) {
            return _this.shoppingListRepository.deleteItem(item);
        });
    };
    return DatastoreProvider;
}());
DatastoreProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DatastoreProvider);

//# sourceMappingURL=datastore.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_shopping_list_shopping_list__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_datastore_datastore__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShoppingListsPage = (function () {
    function ShoppingListsPage(navCtrl, navParams, alertCtrl, datastoreProvider, zone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.datastoreProvider = datastoreProvider;
        this.zone = zone;
        this.lists = [];
        this.datastoreProvider.sync().subscribe(function (data) { return _this.zone.run(function () { return _this.loadLists(); }); }, function (err) { return console.log(err); }, function () { });
    }
    ShoppingListsPage.prototype.ionViewWillEnter = function () {
        this.loadLists();
    };
    ShoppingListsPage.prototype.loadLists = function () {
        var _this = this;
        this.datastoreProvider.loadLists().then(function (listMetas) {
            _this.lists = listMetas;
        });
    };
    ShoppingListsPage.prototype.getItemsChecked = function (list) {
        var itemsString = '';
        if (list.itemCount == 0) {
            itemsString = '0 items';
        }
        else if (list.itemCount == 1) {
            itemsString = "1 item " + (list.itemCheckedCount > 0 ? '' : 'un') + "checked.";
        }
        else {
            itemsString = list.itemCheckedCount + " of " + list.itemCount + " items checked.";
        }
        return itemsString;
    };
    ShoppingListsPage.prototype.listTapped = function (event, listMeta) {
        var list = listMeta.list;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */], {
            list: list
        });
    };
    ShoppingListsPage.prototype.addList = function (event) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Add New Shopping List',
            inputs: [{
                    name: 'title',
                    placeholder: 'Name of shopping list'
                }],
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        _this.datastoreProvider.addList(data.title).then(function (list) {
                            _this.lists.push({ listId: list._id, list: list, itemCount: 0, itemCheckedCount: 0, items: [] });
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    ShoppingListsPage.prototype.removeList = function (event, listMeta) {
        var _this = this;
        this.datastoreProvider.deleteList(listMeta.list).then(function (list) {
            var index = _this.lists.findIndex(function (lm, i) {
                return lm.list._id === list._id;
            });
            if (index > -1) {
                _this.lists.splice(index, 1);
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    return ShoppingListsPage;
}());
ShoppingListsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-shopping-lists',template:/*ion-inline-start:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/pages/shopping-lists/shopping-lists.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Shopping Lists</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addList($event)">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngFor="let list of lists" >\n    <ion-item>\n      <button ion-button icon-only item-start (click)="listTapped($event, list)">\n        <ion-icon name="cart"></ion-icon>\n      </button>\n    <ion-card-title>  \n      {{list.list.title}}\n    </ion-card-title>\n      <button ion-button outline item-end (click)="removeList($event, list)" icon-only danger>\n          <ion-icon name="trash"></ion-icon>\n        </button>\n    </ion-item>\n    <ion-card-content>\n    <p>\n      {{getItemsChecked(list)}}\n    </p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/markwatson/dev/github/ibm-cds-labs/shopping-list-ionic-pouchdb/src/pages/shopping-lists/shopping-lists.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_datastore_datastore__["a" /* DatastoreProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], ShoppingListsPage);

//# sourceMappingURL=shopping-lists.js.map

/***/ })

},[214]);
//# sourceMappingURL=main.js.map