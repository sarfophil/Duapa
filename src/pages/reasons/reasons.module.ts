import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReasonsPage } from './reasons';

@NgModule({
  declarations: [
    ReasonsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReasonsPage),
  ],
})
export class ReasonsPageModule {}
