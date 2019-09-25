import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FourZeroPage  } from './404';

@NgModule({
  declarations: [
      FourZeroPage,
  ],
  imports: [
    IonicPageModule.forChild(FourZeroPage ),
  ],
})
export class FourZeroPageModule {}
