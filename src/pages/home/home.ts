import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,AlertController,ModalController } from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
import {CrtSelectMenuPage} from "../crt-select-menu/crt-select-menu";
import {MorePage} from "../more/more";
import { CallNumber } from '@ionic-native/call-number';
import {EventsProvider} from "../../providers/events/events";
import {StarterpagePage} from "../starterpage/starterpage";
import { Observable } from 'rxjs/Rx';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    crt:string = '0';
    pledge:string = '0';
    isEmpty:Boolean = true;
    isSpinner:Boolean = false;
    Tasks:any;
    Pledges:any;
    isPledge:Boolean = true;
    pledge_code : string = '';
    deadline_date:string = '';
    deadline_time:string = '';
    Await:any;
    Task_status:any;
    Pending_Amt:string = undefined;
    Pending_mature_date:string = "";
    alert:string = "0";
    userData:any;
    countdown:string = "";
    deadline:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public func:FunctionsProvider,
              public alertCtrl:AlertController,
              public modalCtrl:ModalController,
              public callnumber:CallNumber,
              public event:EventsProvider) {
      this.userData= this.func.getStorageJson('User_details');


  }


  ionViewDidLoad() {

      this.AwaitHasConfirmed();
           this.LoadStatusBar();
           this.LoadTasks();
           this.CheckAwaiting();
           this.NewUser();
           this.HasReceivedNotification();
           this.store_player_id();


  }

    Timer(){
        let timer = Observable.timer(1000, 1000);
        timer.subscribe(respon => {
            if(this.Task_status == 200){
                //console.log(this.deadline);
                this.wcountd("2018-07-31 04:07:36");
            }
        })
    }

  ionViewCanEnter(){
      this.func.statusbarprimary();
  }

  AwaitHasConfirmed(){
      this.event.SubscribeEvent('awaithasconfirmed').then(()=>{
          this.LoadStatusBar();
          this.LoadTasks();
          this.CheckAwaiting();
      });
  }

  HasReceivedNotification(){
      this.event.SubscribeEvent('notification').then(()=>{
          this.LoadStatusBar();
          this.LoadTasks();
          this.CheckAwaiting();
      });
  }
    Reload(){
      this.func.presentLoading('Refreshing dashboard...');
        this.AwaitHasConfirmed();
        this.LoadStatusBar();
        this.LoadTasks();
        this.CheckAwaiting();
        this.HasReceivedNotification();
        setTimeout(()=>{
            this.func.dismissLoading();
        },4000);
    }

  LoadStatusBar(){
      let actor_id = this.userData.USER_CODE;
      // this.func.presentLoading('Checking status...');
      this.func.postData('load_stats','&actor_id='+actor_id,true).then(res=>{
            var status = JSON.parse(res['_body']).status;
            if(status === 5001){
                this.isPledge = true;
                this.crt = "0";
                this.pledge = "0";
                this.alert = "0";
            }else {
                this.crt = JSON.parse(res['_body']).crt;
                this.pledge = JSON.parse(res['_body']).pledge;
                this.alert = JSON.parse(res['_body']).notifications;
                if(this.crt == '0'){
                    this.isPledge = true;
                }else {
                    this.isPledge = false;
                }
            }

      }).catch(e=>{
          //this.func.dismissLoading();
      })

  }

    wcountd(date) {
      console.log(date);
        var countDownDate = new Date(date).getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        if (distance < 0) {
            this.countdown = "Expired";
        }
    }

  call(number:any){
      this.callnumber.callNumber(number, true)
          .then(res => {

          })
          .catch(err => {
              this.func.showError("Cannot Call this number");
          });
  }
    goToTask(){
        this.navCtrl.push('TaskPage');
    }

  LoadTasks(){
        let actor_id = this.userData.USER_CODE;
        this.isEmpty = false;
        this.func.postData('load_current_awaiting','&actor_id='+actor_id)
            .then(res=>{
                this.Task_status= JSON.parse(res['_body']).status;
                this.isSpinner = true;
                switch (this.Task_status){
                    case 200:
                        this.Pledges = JSON.parse(res['_body']).pledge;
                        this.Tasks = JSON.parse(res['_body']).data;
                        this.deadline = this.Pledges.CONFIRM_DEADLINE_TIME;
                        this.Timer();

                        // this.deadline_date = deadline.substring(0,10);
                        // this.deadline_time = deadline.substring(11);
                        this.Await = JSON.parse(res['_body']).data;
                        this.Tasks == undefined?this.isEmpty = false:this.isEmpty = true;
                        this.Timer();
                        break;
                    case 204:
                        this.pledge_code = JSON.parse(res['_body']).pledge_code;
                        this.pledge_code.length == 0?this.isEmpty = false:this.isEmpty = true;
                        break;
                    case 205:
                        this.Await = JSON.parse(res['_body']).data;
                        this.Await == ""?this.isEmpty = false:this.isEmpty = true;
                        break;
                }

            }).catch(e=>{
                 this.isSpinner = true;
            })

  }

    Pledge(){
        let confirm = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Do you want to Pledge?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        //console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.func.presentLoading('Checking CRT Points...');
                        this.CheckPoints().then(res=>{
                            var status = JSON.parse(res['_body']).status;

                             switch (status){
                                 case 200:
                                     var crtpoints = JSON.parse(res['_body']).points;
                                     if(crtpoints == 0){
                                         this.func.showWarning("Insufficient Points to Pledge");
                                     }else {
                                         //Pledge
                                         this.openCRTMenu();
                                     }
                                     break;
                                 case 206:
                                     this.func.showInfo('All Pending payments should be transferred to you before you can make another pledge');
                                     break;
                                 case 207:
                                     this.func.showInfo('Please complete your current task first');
                                     break;
                                 case 208:
                                     this.func.showInfo('Please complete your current task first.');
                                     break;
                             }

                            this.func.dismissLoading();


                        }).catch(e=>{
                            this.func.dismissLoading();
                        })

                    }
                }
            ]
        });
        confirm.present();
    }

    CheckPoints(){
      let actor_id = this.userData.USER_CODE;
        return new Promise((resolve)=> {
            this.func.postData('cehckcrt_points', '&actor_id=' + actor_id).then(res => {
                resolve(res);


            }).catch(e => {

            })
        });
    }

    openCRTMenu(){
      let modalCtrl = this.modalCtrl.create('CrtSelectMenuPage',{'crtpoints':this.crt},{cssClass:'inset-modal'});
      modalCtrl.onDidDismiss(data => {
          if(data == undefined){

          }else {
              let crtpoints = data.POINTS_QTY;
              let actorcode = this.userData.USER_CODE;
              let amt = data.POINTS_PLEDGE_REQUIREMENT;
              let crt_code = data.POINT_ID;
              let crt_amt = data.POINTS_AMT;
              this.func.presentLoading('Processing...');
              this.func.postData('Pledge','&usercode='+actorcode+'&amt='+amt+'&crt_points='+crtpoints+'&crt_amt='+crt_amt+'&code='+crt_code)
                  .then(res=>{
                    var status = JSON.parse(res['_body']).status;
                    this.func.dismissLoading();
                    this.LoadStatusBar();
                    this.LoadTasks();
                    this.CheckAwaiting();
                    switch (status){
                        case 200:
                            this.func.showInfo('Pledge Successful.See task to view your assigned user.');
                            break;
                        case 205:
                            this.func.showInfo('Pledge Successful. You will be assigned very soon');
                            break;
                        case 100:
                            this.func.showInfo('You have already made a pledge. Pledge must be fulfilled before you make a new pledge');
                            break;

                    }
                  })
                  .catch(e=>{
                      this.func.dismissLoading();
                      this.func.showError("Pledge Failed. Please try again Later");

                  })
          }

      });
      modalCtrl.present();

    }
    More(event){
        const popover = this.popoverCtrl.create('MorePage');
        popover.present({
            ev: event
        });
    }

    Cancel(){
        let confirm = this.alertCtrl.create({
            title: 'Cancel Pledge',
            message: 'Do you agree to current pledge?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => {

                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        let actor_id = this.userData.USER_CODE;
                        this.func.presentLoading('Please wait...');
                        this.func.postData('cancel_pledge','&actor_id='+actor_id,true)
                            .then(res=>{
                            var status = JSON.parse(res['body']).status;
                            if(status == 200){
                                this.func.dismissLoading();

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

    CheckAwaiting(){
      this.func.postData('check_awaiting_status','&actor_id='+this.userData.USER_CODE).then(res=>{
          var details = JSON.parse(res['_body']).data;
          this.Pending_mature_date = details.AWAITING_MATURE_DATE;
          this.Pending_Amt = details.AWAITING_AMT;
      }).catch(e=>{
            this.Pending_Amt = "";
      })
    }
    goToAwait(Await){
        this.navCtrl.push('AwaitingDetailsPage',{Await});
    }

    Confirm(value:any){
        let payee_name = value.USER_NAME;
        let pledgecode = value.PLEDGE_CODE;
        let awaiting_code = value.AWAITING_CODE;
        let confirm = this.alertCtrl.create({
            title: 'Confirm payment',
            message: 'Confirm payment to '+payee_name+'?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => {

                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        this.func.presentLoading('Confirming...');
                        this.func.postData('sender_confirm_pledge','&pledgecode='+pledgecode+'&usercodess='+this.userData.USER_CODE+'&awaiting_code='+awaiting_code).then(res=>{
                            value.CONFIRM_PAYEE_STATUS = '1';
                            this.func.showInfo("Payment confirmed successfully");
                            this.LoadTasks();
                            this.LoadStatusBar();
                            this.CheckAwaiting();
                            this.func.dismissLoading();
                        }).catch(e=>{
                            this.func.dismissLoading();
                            this.func.showError("Connection Lost");
                        })
                    }
                }
            ]
        });
        confirm.present();
    }


    NewUser(){
      let status = this.userData.USER_NEWUSER;
      if(status == "1"){
          let modalCtrl = this.modalCtrl.create('StarterpagePage',null,{cssClass:'inset-modal'});
          modalCtrl.present();
      }else {

      }
    }
    profile(){
      this.navCtrl.push('ProfilePage');
    }

    goToNotification(){
      this.navCtrl.push('NotificationsPage');
    }

    PledgeButton(){
      if(this.Pending_Amt == '0' || this.Pending_Amt == undefined || this.isEmpty == false){
           if(this.crt == '0'){
               this.isPledge = true;
           }else {
               this.isPledge = false;
           }

      }else {
          this.isPledge = true;
      }
      // this.crt == '0' || this.Pending_Amt == '0' || this.Pending_Amt == undefined || this.isEmpty == false ? this.isPledge = false : this.isPledge = true;
    }

    store_player_id(){
      let player_id = this.func.getStorage('Player_id');
      let usercode = this.userData.USER_CODE;
      this.func.postData('save_player_id','player_id='+player_id+'&usercode='+usercode)
    }






}
