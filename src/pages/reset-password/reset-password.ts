import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  myForm: FormGroup;
  menu: any;

  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public nav: NavController,
    public alertCtrl: AlertController,
    public menuController: MenuController
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    
    this.menu = menuController;
    this.menu.enable(false, "MyMenu");
  }

  ionViewDidLoad() {
    console.log('Hello ResetPasswordPage Page');
  }

  resetPassword(){
    console.log("Email:" + this.myForm.value.email);
    
    this.afAuth.auth.sendPasswordResetEmail(this.myForm.value.email)
    .then((user) => {
      let alert = this.alertCtrl.create({
        message: "Te enviamos un link a tu correo.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.nav.pop();
            }
          }
        ]
      });
      alert.present();
    }, (error) => {
      let errorAlert = this.alertCtrl.create({
        message: "Este correo no existe o tiene un fallo de escritura",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      errorAlert.present();
    });
  }

}