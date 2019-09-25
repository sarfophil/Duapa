import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FunctionsProvider } from '../providers/functions/functions';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { EventsProvider } from '../providers/events/events';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import {OneSignal} from '@ionic-native/onesignal';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages: true
    }),
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FunctionsProvider,
    CallNumber,
    EventsProvider,
    FileTransfer,
    File,
    FilePath,
    Camera,
    PhotoViewer,
      OneSignal
  ]
})
export class AppModule {}
