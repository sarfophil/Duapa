import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPage } from './report';
// import {PipesModule} from "../../pipes/pipes.module";
import {ShortenPipe} from "../../pipes/shorten/shorten";

@NgModule({
  declarations: [
    ReportPage,
      ShortenPipe
  ],
  imports: [
    IonicPageModule.forChild(ReportPage),
  ],
})
export class ReportPageModule {}
