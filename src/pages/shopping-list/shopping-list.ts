import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatastoreProvider } from '../../providers/datastore/datastore'

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  list: any;
  items: any[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public datastoreProvider: DatastoreProvider, private zone: NgZone) {
    this.list = navParams.get('list');
    this.datastoreProvider.sync().subscribe(
      (data) => this.zone.run(() => this.loadItems()),
      (err) => console.log(err),
      () => {}
    );
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  loadItems() {
    this.datastoreProvider.loadActiveItems(this.list._id).then(items => {
      console.log(this.items);
      this.items = items;
    });
  }

  addItem() { 
  	 let prompt = this.alertCtrl.create({
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
  	 			handler: data=> {
             this.datastoreProvider.addItem(data.title, this.list._id)
              .then(item => {
                this.items.push(item);
              });  	 			
  	 			}
  	 		}
  	 	]
  	 });
  	 prompt.present();
  }

  removeItem(event: any, item: any) {
    this.datastoreProvider.deleteItem(item)
      .then(deletedItem => {
          let index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1);
          }
      });
  }

  updateItemChecked(event: any, item: any) {
    this.datastoreProvider.toggleItemChecked(item)
      .then(newItem => {
          let index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1, newItem);
          }
      });
  }
}
