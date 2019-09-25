import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";

/**
 * Generated class for the StarterpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-starterpage',
  templateUrl: 'starterpage.html',
})
export class StarterpagePage {

    slides:any;
    userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider,public viewCtrl:ViewController) {
      this.userData = this.func.getStorageJson('User_details');
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad StarterpagePage');
      this.slides = [
          {
              title: 'Hi, '+this.userData.USER_NAME,
              imageUrl: 'img/coins.png',
              songs: 'Buy your CRT Points',
          },
          {
              title: 'Pledge',
              imageUrl: 'img/wallet.png',
              songs: 'Make a Pledge',
          },
          {
              title: 'Double Investment',
              imageUrl: 'img/incomes.png',
              songs: 'Get Double returns investment',
          },
      ];
  }

    dismiss(){
      this.viewCtrl.dismiss();
      this.userData.USER_NEWUSER = "0";
      this.func.setStorageJson('User_details',this.userData);
      console.log(this.userData);
      this.func.postData('disable_new_user','&actorid='+this.userData.USER_CODE);
    }



}
