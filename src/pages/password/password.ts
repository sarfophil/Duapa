import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
    data:any;
    strength_detect:string;
    private strength: number;
    type:string = "password";
    private userData: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider,public viewCtrl:ViewController) {
    this.data = {};
    this.data.oldpassword = "";
    this.data.password = "";
        this.userData = this.func.getStorageJson('User_details');
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad PasswordPage');
  }

    reveal(){
      if(this.type == "password"){
          this.type = "text";
      }else {
        this.type = "password";
      }
    }


    proceed(){
     if(this.data.oldpassword == "" || this.data.password == ""){
       this.func.presentToast("Please provide your old and new password","custom-toast");
       return false;
     }else{
       if(this.strength_detect == undefined || this.strength_detect == 'weak' || this.strength_detect == "too short"){
           this.func.presentToast("Password is very weak","custom-toast");
       }else {
          this.func.presentLoading("Resetting Password...");
          this.func.postData('change_password','&actor_code='+this.userData.USER_CODE+'&old_pass='+this.data.oldpassword+'&newpass='+this.data.password).then(res=>{
            var status = JSON.parse(res['_body']).status;

            if(status === 200){
               this.func.showInfo("Password has been reset successfully");
                this.navCtrl.pop();
            }else {
                this.func.presentToast("Your old password is wrong","custom-toast");
                this.func.dismissLoading();
            }

          }).catch(e=>{
            this.func.dismissLoading();
              this.func.presentToast("Connection Lost","custom-toast");
          })
       }
     }
    }
    PasswordStrength(event) {
        let pass = this.data.password;

        this.strength = 0;
        if (pass.length == 0) {
            this.strength_detect = "";

            //Empty Field
        }
        if (pass.length < 6) {
            this.strength_detect = "too short";

            //Too Short
            return 'Too short'
        }

        if (pass.length > 7) this.strength += 1

        if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) this.strength += 1

        if (pass.match(/([a-zA-Z])/) && pass.match(/([0-9])/)) this.strength += 1

        if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) this.strength += 1

        if (pass.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) this.strength += 1


        if (this.strength < 2) {
            this.strength_detect = "weak";
            return 'Weak'
        } else if (this.strength == 2) {
            this.strength_detect = "good";
            return 'Good'
        } else {
            //  this.strength_detect = "strong";
            return 'Strong'
        }




    }


}
