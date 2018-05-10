import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { HomePage } from '../pages/home/home';
import { InformationPage } from '../pages/information/information';

import { SpainPage } from '../pages/countries/spain/spain';
import { EnglandPage } from '../pages/countries/england/england';
import { ItalyPage } from '../pages/countries/italy/italy';

import { TermsPage } from '../pages/terms/terms';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Camera } from '@ionic-native/camera';


export const firebaseConfig = {
  apiKey: "AIzaSyB1HWVnbXpopTqGYDIOt2pdUdhsDbYSJFE",
  authDomain: "logueomapapp.firebaseapp.com",
  databaseURL: "https://logueomapapp.firebaseio.com",
  projectId: "logueomapapp",
  storageBucket: "logueomapapp.appspot.com",
  messagingSenderId: "478439401276"
};

@NgModule({
  declarations: [
    MyApp,
    InformationPage,
    HomePage,
    TermsPage,
    SpainPage,
    EnglandPage,
    ItalyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, 
    AngularFireDatabaseModule,
    LoginPageModule,
    SignupPageModule,
    ResetPasswordPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InformationPage,
    TermsPage,
    LoginPage,
    SpainPage,
    EnglandPage,
    ItalyPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
    ]
})
export class AppModule {}
