import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflinePaymentPage } from './offline-payment';

@NgModule({
  declarations: [
    OfflinePaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflinePaymentPage),
  ],
})
export class OfflinePaymentPageModule {}
