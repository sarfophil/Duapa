import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";
import {LoginPage} from "../login/login";

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  reasons:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public func:FunctionsProvider,
              public alertCtrl:AlertController,
              public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad MorePage');
  }

    Logout(){
        let confirm = this.alertCtrl.create({
            title: 'Logout',
            message: 'Do you want to logout?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {

                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        localStorage.removeItem('User_details');
                        window.location.reload()
                    }
                }
            ]
        });
        confirm.present();
    }

    Deactivate(){

        let confirm = this.alertCtrl.create({
            title: 'Account deactivation',
            message: 'Are you sure to deactivate your account?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {

                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.func.presentLoading("Please wait...");
                        this.func.postData('Load_deactivation_feedback','').then(res=>{
                          this.reasons = JSON.parse(res['_body']).data;
                          this.func.dismissLoading();
                          this.Reasons(this.reasons);
                        }).catch(e=>{
                          this.func.dismissLoading();
                          this.func.showError("Couldn't deactivate account. Please try again later");
                        })
                    }
                }
            ]
        });
        confirm.present();
    }

     Reasons(data:any){
          let modalCtrl = this.modalCtrl.create('ReasonsPage',data);
          modalCtrl.present();
     }

     gotoPassword(){
        this.navCtrl.push('PasswordPage');
     }

}
