import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FunctionsProvider } from '../providers/functions/functions';
import {OneSignal} from '@ionic-native/onesignal';
import {EventsProvider} from "../providers/events/events";
import {SplashPage} from "../pages/splash/splash";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  userData:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public func:FunctionsProvider,public oneSignal:OneSignal,public events:EventsProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.Appini();
      this.oneSignal_ini();
    });
  }
  Appini(){
      this.userData = this.func.getStorageJson('User_details');
      if(this.userData){
          this.func.statusbarprimary();
          this.rootPage = 'TabsPage';
      }else{
          this.func.loginStatusBar();
          this.rootPage = 'SplashPage';
      }
  }
  oneSignal_ini(){
      this.oneSignal.startInit("3ec8d69b-e5a7-4c49-af68-5ac73b6d8149", "268114151768");
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.enableSound(true);
      this.oneSignal.enableVibrate(true);
      this.oneSignal.getIds().then(id => {
          this.func.setStorage('Player_id',id.userId);

      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        this.events.HasReceivedNotification();
      });
      this.oneSignal.handleNotificationReceived().subscribe(() => {
          // do something when notification is received
          this.events.HasReceivedNotification();
      });

      this.oneSignal.endInit();
  }


}
