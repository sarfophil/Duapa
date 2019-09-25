import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";

/**
 * Generated class for the FgtPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fgt-pass',
  templateUrl: 'fgt-pass.html',
})
export class FgtPassPage {
  userData:any;
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider) {
      this.userData = this.func.getStorageJson('User_details');
      this.data = {};
      this.data.phone = "";
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad FgtPassPage');
  }
    ionViewCanEnter(){
        this.func.statusbarprimary();
    }

    fgtpassword(){
      if(this.data.phonenumber === ""){
          this.func.showInfo("Field Required");
          return false;
      }
      if(this.ValidatePhone(this.data.phone) == false || this.ValidatePhone(this.data.phone) == undefined){
        this.func.showWarning("Invalid Format");
        return false
      }
      this.func.presentLoading("Please wait...");
      this.func.postData('forgotPassword','&contact='+this.data.phone).then(res=>{
        var status = JSON.parse(res['_body']).status;
        if(status === 100){
            this.func.showInfo("Contact doesn't exist");
            this.func.dismissLoading();
        }else {
            this.navCtrl.pop();
        }

      }).catch(e=>{
        this.func.showError("Unable to connect");
        this.func.dismissLoading();
      });
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
