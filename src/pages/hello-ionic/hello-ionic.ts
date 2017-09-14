import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import PouchDB from 'pouchdb';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

   cards_of_shopping_lists: Array<{_id: string, list_title: string, sub_title: string, all_items: any}>;

   db: any;
   remote_db: any;

   getItemsCount(all_items) {
	   return Object.keys(all_items).length;
   }

   getCheckedItemsCount(all_items) {
   		var count = 0;
   		for (var key in all_items) {
	  		if (all_items.hasOwnProperty(key)) {
	  			if (all_items[key].checked === true) {
	  				count++;
	  			}
	  		}
	  	}
	  	return count;
   }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


  	this.db = new PouchDB('shopping_list_database');
  	this.remote_db = new PouchDB('https://7a6348b8-e252-4d60-a6d8-e0d61ce553df-bluemix:d2df958144dfb6089a788e8f1a501b603046e0d2fe8fd566a9e04eeb5d393105@7a6348b8-e252-4d60-a6d8-e0d61ce553df-bluemix.cloudant.com/shopping_db');

  	this.cards_of_shopping_lists = [];

  	this.db.allDocs({
  	  include_docs: true,
  	  attachments: false
  	}).then(docs => {
  		docs.rows.forEach(card_obj => {
  			this.cards_of_shopping_lists.push(card_obj.doc);
  		});

  		/* sync PouchDB with CouchDB. The live attribute indicates that the remote database should be updated 
  		   whenever a change is made in the local database */
  		this.db.sync(this.remote_db, {
  		 live:true,
  		 retry:true
  		}).on('change', function (change) {
  		
  		}).on('error', function (err) {
  		
  		})


  	}).catch( function (err) {
  		console.log(err);
  	});

  }

  listTapped(event, item_list) {
    this.navCtrl.push(ShoppingListPage, {
      item_list: item_list
    });
  }

  addList(event) {
 	 let prompt = this.alertCtrl.create({

  	 	title: 'Add new shopping list',
  	 	inputs: [{
	  	 	name: 'list_title',
	  	 	placeholder: 'Name of shopping list'
  	 			},
  	 			{
  	 		name: 'sub_title',
  	 		placeholder: 'Description of list'
  	 			}],
  	 	buttons: [
  	 		{
  	 			text: 'Cancel'
  	 		},
  	 		{
  	 			text: 'Add',
  	 			handler: data=> {
  	 				var card_ = {
  	 					_id: data.list_title.toLowerCase(),
  	 					list_title: data.list_title,
  	 					sub_title: data.sub_title,
  	 					all_items: {}
  	 				};
  	 				this.cards_of_shopping_lists.push(card_);
  	 				this.db.put(card_).then(function(response) {

  	 				}).catch(function (err) {
  	 					console.log(err);
  	 				});

  	 			}
  	 		}
  	 	]


  	 });
  	 prompt.present();
  }

  removeList(event, card_list) {

  	this.db.get(card_list._id).then(card => {

	  	let index = this.cards_of_shopping_lists.findIndex(function(curr_card, i) {
	  		return curr_card._id === card._id
	  	});

	  	if (index > -1) {
	  		this.cards_of_shopping_lists.splice(index, 1);
	  	}

  		return this.db.remove(card)
	  	}).catch(function (err) {
	  		console.log(err);
	  	});
    }


}
