import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import PouchDB from 'pouchdb';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shopping_items: any;
  db: any;
  remote_db: any;
  shopping_list: any;

  private updateListInDB() {
  	return this.db.put({
		  	 	 _id: this.shopping_list._id,
		  	 	 _rev: this.shopping_list._rev,
 				 list_title: this.shopping_list.list_title,
 				 sub_title: this.shopping_list.sub_title,
 				 all_items: this.shopping_list.all_items
 				}).then(response => {
 					this.shopping_list._rev = response.rev;
 				}).catch(err => {
 					console.log(err);
 				});
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  	this.shopping_list = navParams.get('item_list');
  	var list_id = this.shopping_list._id;

  	this.shopping_items = [];

  	this.db = new PouchDB('shopping_list_database');
  	this.remote_db = new PouchDB('https://7a6348b8-e252-4d60-a6d8-e0d61ce553df-bluemix:d2df958144dfb6089a788e8f1a501b603046e0d2fe8fd566a9e04eeb5d393105@7a6348b8-e252-4d60-a6d8-e0d61ce553df-bluemix.cloudant.com/shopping_db');

  	
  	this.db.get(list_id).then(doc => {
								  // handle doc
								  doc.all_items.forEach(item => {
								  	this.shopping_items.push(item.name)
								  });

								  /* sync PouchDB with CouchDB. The live attribute indicates that the remote database should be updated 
							  		 whenever a change is made in the local database */
							  	   this.db.sync(this.remote_db, {
							  		 live:true,
							  		 retry:true
							  		}).on('change', function (change) {
							  		
							  		}).on('error', function (err) {
							  			console.log(err);
							  		})

							  }).catch(function (err) {
								  console.log(err);
							  });

  	

  }

  addItem() { 
  	 let prompt = this.alertCtrl.create({

  	 	title: 'Add Grocery Item',
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
  	 				var item_ = {
  	 					_id: data.title.toLowerCase(),
  	 					name: data.title
  	 				};
  	 				this.shopping_items.push(data.title);
  	 				this.shopping_list.all_items.push(item_)
  	 				
  	 				this.updateListInDB();		  	 			
  	 			}
  	 		}
  	 	]


  	 });
  	 prompt.present();
  }

  removeItem(item) {

 	let index = this.shopping_items.indexOf(item);
  	if (index > -1) {
		this.shopping_items.splice(index, 1);
	 }

	this.shopping_list.all_items = this.shopping_items;
	this.updateListInDB();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

}
