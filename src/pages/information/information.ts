import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {

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
    console.log('ionViewDidLoad InformationPage');
  }

}
