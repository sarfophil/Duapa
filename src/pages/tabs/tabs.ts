import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MorePage} from "../more/more";
import {FunctionsProvider} from "../../providers/functions/functions";
import {EventsProvider} from "../../providers/events/events";
import {FourZeroPage} from "../404/404";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
   tab1Root = 'HomePage';
 	tab2Root = 'PointsPage';
  	tab3Root = 'ReportPage';
  	tab4Root = 'MorePage';
    @ViewChild(Content) content: Content;
    userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider,public events:EventsProvider) {
      this.userData = this.func.getStorageJson('User_details');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TabsPage');
      this.StorePlayer();
      this.CheckUserEvent();
  }

      CheckUserEvent(){
        this.events.SubscribeEvent('acc_status:inactive') .then(()=>{
            this.navCtrl.push('FourZeroPage');
        })
      }
   StorePlayer(){
        let player_id = this.func.getStorage('Player_id');
        let user_playerid = this.userData.USER_PHONE_ID;
        if(user_playerid == player_id){

        }else {
            this.func.postData('save_player_id','&player_id='+player_id+'&usercode='+this.userData.USER_CODE)
                .catch(e=>{

                })
        }

   }





}
