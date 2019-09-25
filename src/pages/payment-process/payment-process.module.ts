import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentProcessPage } from './payment-process';

@NgModule({
  declarations: [
    PaymentProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentProcessPage),
  ],
})
export class PaymentProcessPageModule {}
