import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { ShoppingListFactory, ShoppingListRepositoryPouchDB } from 'ibm-shopping-list-model'
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

@Component({
  selector: 'page-shopping-lists',
  templateUrl: 'shopping-lists.html'
})
export class ShoppingListsPage {

   shopping_lists: any[] = [];

   db: any;
   remote_db: any;
   shoppingListFactory: any;
   shoppingListRepository: any;

   constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

	PouchDB.plugin(PouchDBFind);
	this.db = new PouchDB('shopping-list');
  	this.remote_db = new PouchDB('http://admin:pass@192.168.1.70:35984/shopping-list-ionic');
  	this.shoppingListFactory = new ShoppingListFactory(); 
	this.shoppingListRepository = new ShoppingListRepositoryPouchDB(this.db);
	
	let listItemPromises = [];
	this.shoppingListRepository.find()
	.then((allLists) => {
		for (let list of allLists.toArray()) {
			this.shopping_lists.push({listId: list._id, list: list, itemCount: 0, itemCheckedCount: 0, items: []});
			listItemPromises.push(this.shoppingListRepository.findItems({
				selector: {
					type: 'item',
					list: list._id
				}
			}));
		}
		return Promise.all(listItemPromises);
	})
	.then((itemLists) => {
		for (let itemList of itemLists) {
			const itemArray = itemList.toArray();
			for (let item of itemArray) {
				for (let list of this.shopping_lists) {
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
	}).catch( function (err) {
		console.log(err);
	});
	  
	// this.db.sync(this.remote_db, {
	// 	live:true,
	// 	retry:true
	// }).on('change', function (change) {
	// }).on('error', function (err) {
	// });
  }

  getItemsChecked(list) {
	let itemsString = '';
    if (list.itemCount == 0) {
      itemsString = '0 items';
    }
    else if (list.itemCount == 1) {
      itemsString = `1 item ${list.itemCheckedCount > 0 ? '' : 'un'}checked.`;
    }
    else {
      itemsString = `${list.itemCheckedCount} of ${list.itemCount} items checked.`;
	}
	return itemsString;
  }

  listTapped(event, listMeta) {
	let list = listMeta.list;
	this.navCtrl.push(ShoppingListPage, {
      item_list: list
    });
  }

  addList(event) {
 	 let prompt = this.alertCtrl.create({
  	 	title: 'Add New Shopping List',
  	 	inputs: [{
	  	 	name: 'list_title',
	  	 	placeholder: 'Name of shopping list'
		}],
  	 	buttons: [
  	 		{
  	 			text: 'Cancel'
  	 		},
  	 		{
  	 			text: 'Add',
  	 			handler: data=> {
					let list = this.shoppingListFactory.newShoppingList({
						title: data.list_title
					});
					this.shoppingListRepository.put(list).then(list => {
						this.shopping_lists.push({listId: list._id, list: list, itemCount: 0, itemCheckedCount: 0, items: []});
  	 				}).catch(err => {
  	 					console.log(err);
  	 				});
  	 			}
  	 		}
  	 	]
  	 });
  	 prompt.present();
  }

	removeList(event, listMeta) {
		let list = listMeta.list;
		this.shoppingListRepository.get(list._id).then(list => {
		return this.shoppingListRepository.delete(list);
		}).then(list => {
			let index = this.shopping_lists.findIndex((lm, i) => {
				return lm.list._id === list._id
			});
			if (index > -1) {
				this.shopping_lists.splice(index, 1);
			}
		}).catch(function (err) {
			console.log(err);
		});
	}
}
