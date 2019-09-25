import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OfflinePaymentPage} from "../offline-payment/offline-payment";

/**
 * Generated class for the PaymentProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-process',
  templateUrl: 'payment-process.html',
})
export class PaymentProcessPage {
    private crt: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.crt = this.navParams.data.crt;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentProcessPage');
  }

    OnlinePayment(){
        this.navCtrl.push('PaymentPage',{'crt':this.crt});
    }

    OfflinePayment(){
      this.navCtrl.push('OfflinePaymentPage',{'crt':this.crt});
    }

}
