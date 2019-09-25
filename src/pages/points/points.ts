import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
import {PaymentPage} from "../payment/payment";
import {PaymentProcessPage} from "../payment-process/payment-process";
/**
 * Generated class for the PointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {
  crt:any;
    isEmpty:Boolean = true;
    isSpinner:Boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public func:FunctionsProvider,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
   //console.log('ionViewDidLoad PointsPage');
      this.LoadCRT();
  }
    ionViewCanEnter(){
      this.func.statusbarprimary();
    }
  LoadCRT(){

    this.func.postData('Load_CRT_Points','').then(res=>{
        var status = JSON.parse(res['_body']).status;
        if(status === 5001){
            this.isEmpty = false;
            this.isSpinner = true;
        }else {
            this.crt = JSON.parse(res['_body']).data;
            this.isSpinner = true;
            if(this.crt.length == 0){
                this.isEmpty = false;
            }
        }

      // this.func.dismissLoading();
    }).catch(e=>{
        this.isSpinner = true;
    });
  }
    doRefresh(refresher) {
        this.LoadCRT();

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }


    Buy(crt){
        this.navCtrl.push('PaymentProcessPage',{'crt':crt});
    }



}
