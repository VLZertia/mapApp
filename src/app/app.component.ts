import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import { HomePage } from '../pages/home/home';
import { TermsPage } from '../pages/terms/terms';
import { InformationPage } from '../pages/information/information';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InformationPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Inicio', component: InformationPage },
      { title: 'Selector de país', component: HomePage },
      { title: 'Condiciones de uso', component: TermsPage },

    ];
  }

  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  cerrarSesion() {
    this.nav.setRoot(LoginPage);
  }

}
