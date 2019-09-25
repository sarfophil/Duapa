import { Http,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {AlertController, LoadingController, Events, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/*
  Generated class for the FunctionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FunctionsProvider {
  ip:string = "http://duapa.org/";
 //ip:string = "http://localhost/";
  apiURL:string = this.ip+'duapa/mobileapi/index.php';
  loader:any;
  constructor(
  	public http: Http,
  	public alertCtrl:AlertController,
  	public loadingCtrl:LoadingController,
  	public events:Events,
    public toastCtrl:ToastController,
    public statusBar:StatusBar) {

    
  }

    statusbarprimary(){
      // this.statusBar.backgroundColorByHexString('#116d9d');
      this.statusBar.backgroundColorByHexString('#0a2d50');
    }

    loginStatusBar(){
      this.statusBar.backgroundColorByHexString('#0a2d50');
    }

    notificationStatusBar(){
      this.statusBar.backgroundColorByHexString('#D32F2F');
    }

    mtnStatusBar(){
      this.statusBar.backgroundColorByHexString('c7b30a');
    }

    presentToast(msg,cssClass,position='top') {
        let toast = this.toastCtrl.create({
            message: msg,
            showCloseButton:true,
            closeButtonText:'OK',
            cssClass:cssClass,
            position:position

        });
        toast.present();
    }

  presentLoading(msg:string){
  	this.loader = this.loadingCtrl.create({
  		content: msg,
        dismissOnPageChange:true
  	});
  	this.loader.present();
  }
  dismissLoading(){
  	this.loader.dismiss();
  }
  postData(actionget,data,err_msg = false){
      var current = this.getStorageJson('User_details');
    let headers= new Headers();
    let uuid = 'ae3049932220092';
    if(current == undefined){
        let uuid = 'ae3049932220092';
    }else {
        uuid = current.USER_CODE == undefined || current.USER_CODE == ""?'ae3049932220092':current.USER_CODE;
    }
    headers.append('Content-Type','application/x-www-form-urlencoded');
     var action = '?uuid='+uuid+'&action=' + actionget;
    return new Promise((resolve)=>{
    this.http.post(this.apiURL + action, data, {headers:headers}).subscribe(res=>{
    resolve(res);
        var status = JSON.parse(res['_body']).status;
       if(status == 5001){
           this.events.publish('acc_status:inactive');
       }
    },err=>{
      if(err_msg == true){
        this.showError("Connection Failed. Please try again later");
      }else{
        //this.dismissLoading();
      }
      });
    }); 
  }

  showWarning(message){
  	let alert = this.alertCtrl.create({
  		title:'Warning',
  		subTitle: message,
  		buttons:['OK']
  	});
  	alert.present();
  }
  showInfo(message){
  	let alert = this.alertCtrl.create({
  		title:'Information',
  		subTitle: message,
  		buttons:['OK']
  	});
  	alert.present();
  }
  showError(message){
  	let alert = this.alertCtrl.create({
  		title:'Error',
  		subTitle: message,
  		buttons:['OK']
  	});
  	alert.present();
  }
  setStorage(key,value){
  	localStorage.setItem(key,value);
  }
  setStorageJson(key,value){
  	localStorage.setItem(key,JSON.stringify(value));
  }
  getStorageJson(key) {
    var value = localStorage.getItem(key);
    if(value){
      return JSON.parse(value);
    }else{
      return undefined;
    }
  }
  getStorage(key) {
    var value = localStorage.getItem(key);
    if(value){
      return value;
    }else{
      return undefined;
    }
  }







}
