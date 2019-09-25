import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController,ModalController} from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
import {TabsPage} from "../tabs/tabs";
import {tryCatch} from "rxjs/util/tryCatch";


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  data:any;
    private strength: number;
    strength_detect:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider,public alertCtrl:AlertController,public modalCtrl:ModalController) {
    this.data = {};
    this.data.fullname = '';
    this.data.phonenumber = '';
    this.data.password = '';
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SignupPage');
      this.CheckSignupGate();
  }
  ionViewCanEnter(){
      this.func.statusbarprimary();
  }

  CheckSignupGate(){
      this.func.presentLoading('Please wait...');
      this.func.postData('check_signup_Gate','').then(res=>{
        var status = JSON.parse(res['_body']).status;
        if(status === 10004){
            this.navCtrl.pop();
            this.show404Page();
            this.func.dismissLoading();
        }else {
            this.func.dismissLoading();
        }

      }).catch(e=>{
          this.func.dismissLoading();
      })
  }

  show404Page(){
    let modalCtrl = this.modalCtrl.create('FourZeroPage');
    modalCtrl.present();
  }


  Signup() {
      let fullname = this.data.fullname;
      let phonenumber = this.data.phonenumber;
      let password = this.data.password;
      let phone_validate = this.ValidatePhone(phonenumber);
      if(fullname == "" || phonenumber == "" || password == ""){
          this.func.presentToast('Please provide your details','custom-toast');
          return false
      }else {
          if(phone_validate === false || phone_validate == undefined){
              this.func.presentToast('Invalid Phonenumber format','custom-toast');
              return false;
          }
          if(this.strength_detect == undefined || this.strength_detect == "too short" || this.strength_detect == "weak"){
              this.func.presentToast('Password is weak','custom-toast');
              return false;
          }
          let confirm = this.alertCtrl.create({
              title: 'Confirm',
              message: 'Are you sure to proceed?',
              buttons: [
                  {
                      text: 'Disagree',
                      handler: () => {

                      }
                  },
                  {
                      text: 'Agree',
                      handler: () => {
                          this.func.presentLoading('Creating Account...');
                          this.func.postData('signup','&fullname='+fullname+'&contact='+phonenumber+'&user_pwd='+password)
                              .then(res=>{
                                  var status = JSON.parse(res['_body']).status;
                                  if(status === 200){
                                      this.navCtrl.pop();
                                      this.func.showInfo("Congrats!, You have signed up successfully. Please login with your credentials")
                                      // var data = JSON.parse(res['_body']).details;
                                      // this.func.setStorageJson('User_details',data);
                                      // this.navCtrl.setRoot('TabsPage');
                                  }else if(status === 10004){
                                      this.func.presentToast('Sorry, you cannot sign up at the moment','custom-toast');
                                  }else {
                                      this.func.presentToast('Contact Already Exist','custom-toast');
                                  }
                                  this.func.dismissLoading();
                              }).catch(e=>{
                              this.func.dismissLoading();
                              this.func.showError('Connection lost. Please try again later');
                          });

                      }
                  }
              ]
          });
          confirm.present();

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
