import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';

import { SpainPage } from '../countries/spain/spain';
import { EnglandPage } from '../../pages/countries/england/england';
import { ItalyPage } from '../../pages/countries/italy/italy';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;
  menu: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuController: MenuController
  ) {
    this.menu = menuController;
    this.menu.enable(true, "MyMenu");
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Inicio');
  }

  goToSpain() {
    this.navCtrl.setRoot(SpainPage)
  }
  goToEngland() {
    this.navCtrl.setRoot(EnglandPage)
  }
  goToItaly() {
    this.navCtrl.setRoot(ItalyPage)
  }
}
