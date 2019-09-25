import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
/**
 * Generated class for the CrtSelectMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crt-select-menu',
  templateUrl: 'crt-select-menu.html',
})
export class CrtSelectMenuPage {
  crt:any;
  requirements:any;
    isSpinner:Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public func:FunctionsProvider,public viewCtrl:ViewController) {
        this.crt = navParams.data.crtpoints;
  }

  ionViewDidLoad() {
    this.CheckPoints();
  }

  CheckPoints(){
    this.func.postData('get_crt_requirements','&crt_points='+this.crt).then(res=>{
        this.requirements = JSON.parse(res['_body']).data;
        this.isSpinner = true;
    }).catch(e=>{
        this.isSpinner = false;
    })
  }

    close(){
      this.viewCtrl.dismiss();
    }

    Pledge(require){
      this.viewCtrl.dismiss(require);
    }

}
