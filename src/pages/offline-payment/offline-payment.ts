import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";

/**
 * Generated class for the OfflinePaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline-payment',
  templateUrl: 'offline-payment.html',
})
export class OfflinePaymentPage {
    private crt: any;
    private userData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public func:FunctionsProvider) {
      this.crt = this.navParams.data.crt;
      this.userData = this.func.getStorageJson('User_details');

  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad OfflinePaymentPage');
  }

  Confirm(){
      let prompt = this.alertCtrl.create({
          title: 'Confirm Payment',
          message: "After the transfer,you received an SMS containing the details of the transaction.Please enter the Transaction ID and submit",
          inputs: [
              {
                  name: 'transaction_id',
                  placeholder: 'Transaction ID'
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
                  handler: data => {
                    //  console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Submit',
                  handler: data => {
                        if(data.transaction_id != ''){
                            this.func.presentLoading('Please wait...');
                            this.func.postData('Confirm_offline_payment','&transactioncode='+data.transaction_id+'&usercode='+this.userData.USER_CODE+'&packagename='+this.crt.POINT_NAME).then(res=>{
                                var status = JSON.parse(res['_body']).status;
                                if(status == 200){
                                    this.func.showInfo("Your Code has been sent to our admin. Your CRT Points will sent shortly");
                                }else{
                                    this.func.presentToast('This code has been sent already.',"custom-toast");

                                }
                                this.func.dismissLoading();
                            }).catch(e=>{
                                this.func.dismissLoading();
                                this.func.presentToast('Connection Lost',"custom-toast");
                            })
                        }else {
                            return false;
                        }

                  }
              }
          ]
      });
      prompt.present();
  }

}
