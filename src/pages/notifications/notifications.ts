import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
    isLoading:Boolean = false;
    userData:any;
    Alert:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider) {
      this.userData = this.func.getStorageJson('User_details');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NotificationsPage');
      this.FetchNotification();
      this.Notification();
  }

  ionViewCanEnter(){
      this.func.notificationStatusBar();
  }

  FetchNotification(){
    this.func.getStorageJson('Notifications');
    this.func.postData('Load_notification','&usercode='+this.userData.USER_CODE)
        .then(res=>{
          this.Alert = JSON.parse(res['_body']).data;
          this.func.setStorageJson('Notifications',this.Alert);
          this.isLoading = true;
        }).catch(e=>{
          this.isLoading = true;
    })
  }

  Notification(){
      this.func.postData('Update_notification','&usercode='+this.userData.USER_CODE).then(res=>{
      }).catch(e=>{
      })
  }

}
