import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";

/**
 * Generated class for the ReasonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reasons',
  templateUrl: 'reasons.html',
})
export class ReasonsPage {
    reasons:any;
    data:any;
    userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public func:FunctionsProvider) {
    this.reasons = this.navParams.data;
    this.data = {};
    this.data.reasons = '';
      this.userData = this.func.getStorageJson('User_details');

  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad ReasonsPage');
  }

    close(){
      this.viewCtrl.dismiss();
    }
    Proceed(){
      if(this.data.reasons == ""){
            this.func.presentToast("Please select an option","custom-toast");
      }else {
            let userID = this.userData.USER_CODE;
            this.func.presentLoading("Deactivating your Account...");
            this.func.postData('Deactivate_Account','&usercode='+userID+'&reason='+this.data.reasons).then(res=>{
                var status = JSON.parse(res['_body']).status;
                if(status === 200){
                    localStorage.removeItem('User_details');
                    window.location.reload();
                }
            }).catch(e=>{
                this.func.dismissLoading();
                this.func.showError("Unable to connect at the moment");
            })
      }
    }

}
