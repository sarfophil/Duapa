import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
import {ReportDetailsPage} from "../report-details/report-details";

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  Reports:any;
  isLoading:Boolean = false;
  userData:any;
  isEmpty:Boolean = true;
  img:any;
    isLoadMore:Boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider,public modalCtrl:ModalController) {
    this.userData = this.func.getStorageJson('User_details');
  }

  ionViewDidLoad() {
    this.LoadReports();
    this.ImgDetector();
  }

    doRefresh(refresher) {
        this.LoadReports();
        setTimeout(() => {
            // console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

  LoadReports(){
    let limit = 10;
    this.func.postData('Load_reports','&actorid='+this.userData.USER_CODE+'&limit='+limit)
        .then(res=>{
          this.Reports = JSON.parse(res['_body']).data;
          console.log(this.Reports);
          this.isLoading = true;
          if(this.Reports.length < 1){
            this.isEmpty = false;
          }

        }).catch(e=>{
        this.isLoading = false;
    })
  }

  ImgDetector(){
    this.img = new Array();
    this.img[1]="img/wallet.png";
    this.img[2]="img/incomes.png";
    this.img[3]="img/wallet.png";
    this.img[4]="img/wallet.png";
    this.img[0]="img/wallet.png";
    this.img[5] = "img/exclamation.png";
    this.img[10]="img/wallet.png";
  }

    gotoDetails(report){
      let modalCtrl = this.modalCtrl.create('ReportDetailsPage',{report},{cssClass:'inset-modal'});
      modalCtrl.present();
    }
    doInfinite(infiniteScroll) {
        let limit = this.Reports.length + 5;
        this.func.postData('Load_reports','&actorid='+this.userData.USER_CODE+'&limit='+limit)
            .then(res=>{
                this.Reports = JSON.parse(res['_body']).data;

                if(this.Reports.length < 1){
                    this.isEmpty = false;
                }
            }).catch(e=>{
        });
        setTimeout(() => {

            infiniteScroll.complete();
        }, 500);
    }
    loadmore(){
      this.isLoadMore = false;
        let limit = this.Reports.length + 5;
        this.func.postData('Load_reports','&actorid='+this.userData.USER_CODE+'&limit='+limit)
            .then(res=>{
                this.Reports = JSON.parse(res['_body']).data;
                this.isLoadMore = true;
                if(this.Reports.length < 1){
                    this.isEmpty = false;
                }
            }).catch(e=>{
                this.isLoadMore = true;
        });
    }



}
