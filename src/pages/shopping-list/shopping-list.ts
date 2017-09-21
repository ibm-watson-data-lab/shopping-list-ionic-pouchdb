import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db'

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  list: any;
  items: any[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dbProvider: DbProvider, private zone: NgZone) {
    this.list = navParams.get('list');
    this.dbProvider.sync().subscribe(
      (data) => this.zone.run(() => this.loadItems()),
      (err) => console.log(err),
      () => {}
    );
  }

  ionViewWillEnter() {
    this.loadItems();
    
  }

  loadItems() {
    this.dbProvider.loadActiveItems(this.list._id).then(items => {
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
             this.dbProvider.addItem(data.title, this.list._id)
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
    this.dbProvider.deleteItem(item)
      .then(deletedItem => {
          let index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1);
          }
      });
  }

  updateItemChecked(event: any, item: any) {
    this.dbProvider.toggleItemChecked(item)
      .then(newItem => {
          let index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1, newItem);
          }
      });
  }
}
