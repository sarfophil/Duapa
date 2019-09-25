import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
import { CallNumber } from '@ionic-native/call-number';
import {EventsProvider} from "../../providers/events/events";
/**
 * Generated class for the AwaitingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-awaiting-details',
  templateUrl: 'awaiting-details.html',
})
export class AwaitingDetailsPage {
  Await:any;
  userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider,public callNumber:CallNumber,public alertCtrl:AlertController,public event:EventsProvider) {
    this.Await = this.navParams.data.Await;
    this.userData = this.func.getStorageJson('User_details');

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AwaitingDetailsPage');
  }

    call(){
        this.callNumber.callNumber(this.Await.USER_CONTACT, true)
            .then(res => {

            })
            .catch(err => {
              this.func.showError("Cannot Call "+this.Await.USER_NAME);
            });
    }

    confirm(Value:any){
        let amt = Value.CONFIRM_AMT;
        let sender_name = Value.USER_NAME;
        let pledgecode = Value.PLEDGE_CODE;
        let confirm = this.alertCtrl.create({
            title: 'Confirm payment',
            message: 'Have you received GHS '+amt+' from '+sender_name+'?' ,
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
                      this.func.postData('await_can_confirm','&pledgecode='+pledgecode).then(res=>{
                          var status = JSON.parse(res['_body']).status;
                          if(status === 205){
                              this.func.showWarning("Sorry, "+sender_name+" should confirm payment before you can proceed");
                              this.func.dismissLoading();
                          }else {
                          this.event.AwaithasConfirmedPayment();
                          this.navCtrl.pop();
                          this.func.showInfo("Payment has been confirmed successfully");
                          }

                      }).catch(e=>{
                        this.func.dismissLoading();
                      })
                    }
                }
            ]
        });
        confirm.present();
    }

}
