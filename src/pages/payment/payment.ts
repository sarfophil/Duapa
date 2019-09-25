import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";
import {PointStepPage} from "../point-step/point-step";

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  data:any;
  crt:any;
  userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider) {
    this.crt = this.navParams.data.crt;
    this.data = {};
      this.userData = this.func.getStorageJson('User_details');
      this.data.mobilemoney = this.userData.USER_CONTACT;
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad PaymentPage');
  }

    ionViewCanEnter(){
      this.func.mtnStatusBar();
    }

    gotoInst(){
      this.navCtrl.push('PointStepPage');
    }

    proceed(){
      let mobilemoney = this.data.mobilemoney;
      if(mobilemoney == ""){
        this.func.presentToast("Field required","custom-toast","top");
        return false;
      }else {
        if(this.ValidatePhone(mobilemoney) == false || this.ValidatePhone(mobilemoney) == undefined){
          this.func.presentToast("Please check your format","custom-toast","top");
          return false;
        }
        this.func.presentLoading("Please wait...");
        this.func.postData('Make_payment','&user_code='+this.userData.USER_CODE+'&amount='+this.crt.POINTS_AMT+'&phonenumber='+mobilemoney+'&point_id='+this.crt.POINT_ID+'&firstname='+this.userData.USER_NAME+'&package_name='+this.crt.POINT_NAME).then(res=>{
          var status = JSON.parse(res['_body']).status;
          this.func.dismissLoading();
          if(status == 205){
            this.func.showError("Unable to connect at the moment. Please try again later");
          }else {
            this.navCtrl.push('PointStepPage');
            this.func.showInfo("Request Successful..Pending payment");
          }
        }).catch(e=>{
          this.func.dismissLoading();
          this.func.showError("Unable to connect at the moment. Please try again later");
        })
      }
    }

    ValidatePhone(value){
        try{
            if(value.match(/\d/g).length===10){
                return true;
            }else{
                return false;
            }
        }catch(err){
            return undefined;
        }

    }

}
