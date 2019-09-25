import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwaitingDetailsPage } from './awaiting-details';

@NgModule({
  declarations: [
    AwaitingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AwaitingDetailsPage),
  ],
})
export class AwaitingDetailsPageModule {}
