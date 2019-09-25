import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Platform} from 'ionic-angular';
import {FunctionsProvider} from "../../providers/functions/functions";
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   userData:any;
   data;
   img_upload:string="img/boy.png";
   lastImage:string = "";
    isLoad:Boolean = true;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public func:FunctionsProvider,
              public actionSheetCtrl:ActionSheetController,
              public file: File,
              public filePath: FilePath,
              public platform: Platform,
              public photoViewer: PhotoViewer,
              public camera: Camera
              ) {
     this.userData = this.func.getStorageJson('User_details');
     this.data = {};
     this.data.uname = this.userData.USER_NAME;
     this.data.mobilemoney = this.userData.USER_CONTACT;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
  }

   // Display_picture(){
   //    let current_dp = this.userData.
   // }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    upload(){
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Options',
            buttons: [
                {
                    text: 'View Photo',
                    role: 'destructive',
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Take Photo',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Upload Photo',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Remove Photo',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });

        actionSheet.present();
    }
        /*Take Picture*/
    takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetHeight: 300,
            targetWidth: 300,
            allowEdit: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            this.img_upload = imagePath.toString();
            // this.userData.CLIQ_DISPLAYPIC = imagePath.toString();

            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }

        }, (err) => {
            this.img_upload ='img/man.png';

        });
    }

    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {

            //this.img_upload = 'img/upload.png';
        });
    }

    createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = this.userData.CLIQ_USER_ID+".jpg";
        return newFileName;

    }
    update(){
        let arr_name = this.userData.USER_NAME;
        let arr_contact = this.userData.USER_CONTACT;
        let prov_name = this.data.uname;
        let prov_contact = this.data.mobilemoney;
        let actor_id = this.userData.USER_CODE;
        if(prov_name == "" || prov_contact == ""){
            this.func.showWarning("Fields cannot be empty");
        }else {
            if(arr_name == prov_name && arr_contact == prov_contact){

            }else {
                 this.isLoad = false;
                this.func.postData('update_profile','&actor_id='+actor_id+'&username='+prov_name+'&contact='+prov_contact).then(res=>{
                    var status = JSON.parse(res['_body']).status;
                    this.isLoad = true;
                    if(status === 205){
                        this.func.showWarning("Phonenumber has been taken by another user.");
                    }else {
                        this.func.showInfo("Profile Updated");
                        this.userData.USER_NAME = prov_name;
                        this.userData.USER_CONTACT = prov_contact;
                        this.data.mobilemoney = prov_contact;
                        this.data.uname = prov_name;
                        this.func.setStorageJson('User_details',this.userData);
                    }
                }).catch(e=>{
                    this.func.showError("Unable to connect");
                })
            }
        }

    }

}
