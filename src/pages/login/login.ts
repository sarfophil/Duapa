import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider) {
   this.data = {};
   this.data.contact = '';
   this.data.password = '';
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
  ionViewCanEnter(){
      this.func.loginStatusBar();
  }

  signup(){
  	this.navCtrl.push('SignupPage');
  }
  fgtpassword(){
    this.navCtrl.push('FgtPassPage');
  }
    login(){
      let phonenumber = this.data.contact;
      let password = this.data.password;
      if(phonenumber == "" || password == ""){
          this.func.showWarning('Please provide your credentials');
          return false;
      }else {
          let validate_phone = this.ValidatePhone(phonenumber);
          if(validate_phone == false || validate_phone == undefined){
              this.func.showWarning('Incorrect phonenumber format');
              return false;
          }else {
              this.func.presentLoading('Logging In...');
              this.func.postData('Login','&contact='+phonenumber+'&user_pwd='+password)
                  .then(res=>{
                      var status = JSON.parse(res['_body']).status;
                      if(status === 200){
                          var result = JSON.parse(res['_body']).data;
                          this.func.setStorageJson('User_details',result);
                          this.navCtrl.setRoot('TabsPage');
                      }else if(status === 105) {
                            this.func.showWarning('Your account has been deactivated. Contact administrator for help');
                      }else if(status === 5001){
                          this.func.showWarning('Your account has been deactivated. Contact administrator for help');
                      } else {
                          this.func.showWarning('Incorrect phonenumber or password');
                      }
                      this.func.dismissLoading();
                  }).catch(e=>{
                  this.func.dismissLoading();
              });
          }
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
