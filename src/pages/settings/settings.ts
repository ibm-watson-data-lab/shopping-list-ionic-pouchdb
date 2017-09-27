import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingListsPage } from '../shopping-lists/shopping-lists'
import { DatastoreProvider } from '../../providers/datastore/datastore'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  syncUrl: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public datastoreProvider: DatastoreProvider) {
  }

  ionViewDidLoad() {
    this.syncUrl = this.datastoreProvider.activeSyncUrl;
  }

  save() {
    this.datastoreProvider.updateSyncUrl(this.syncUrl);
    this.navCtrl.setRoot(ShoppingListsPage);
  }

}
