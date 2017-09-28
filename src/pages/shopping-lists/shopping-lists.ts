import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ShoppingListPage } from '../../pages/shopping-list/shopping-list'
import { DatastoreProvider } from '../../providers/datastore/datastore'

@Component({
  selector: 'page-shopping-lists',
  templateUrl: 'shopping-lists.html'
})
export class ShoppingListsPage {

  lists: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public datastoreProvider: DatastoreProvider, private zone: NgZone) {
    this.datastoreProvider.sync().subscribe(
      (data) => this.zone.run(() => this.loadLists()),
      (err) => console.log(err),
      () => {}
    );
  }

  ionViewWillEnter() {
    this.loadLists();
  }

  loadLists() {
    this.datastoreProvider.loadLists().then(listMetas => {
      this.lists = listMetas;
    });
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
      list: list
    });
  }

  addList(event) {
    let prompt = this.alertCtrl.create({
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
          handler: data => {
            this.datastoreProvider.addList(data.title).then(list => {
              this.lists.push({ listId: list._id, list: list, itemCount: 0, itemCheckedCount: 0, items: [] });
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
    event.stopPropagation();
    this.datastoreProvider.deleteList(listMeta.list).then(list => {
      let index = this.lists.findIndex((lm, i) => {
        return lm.list._id === list._id
      });
      if (index > -1) {
        this.lists.splice(index, 1);
      }
    }).catch(function (err) {
      console.log(err);
    });
  }
}
