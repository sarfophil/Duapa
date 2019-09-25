import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrtSelectMenuPage } from './crt-select-menu';

@NgModule({
  declarations: [
    CrtSelectMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CrtSelectMenuPage),
  ],
})
export class CrtSelectMenuPageModule {}
