import { Injectable } from '@angular/core';
import { Events} from 'ionic-angular';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(public events:Events) {
   // console.log('Hello EventsProvider Provider');
  }

  /*Await has confirmed Payment*/
  AwaithasConfirmedPayment(){
      this.events.publish('event:awaithasconfirmed');
  }

  SubscribeEvent(eventType){
      return new Promise((resolve)=> {
          this.events.subscribe('event:' + eventType, () => {
            resolve();
          });
      });
  }

  HasReceivedNotification(){
      this.events.publish('event:notification');
  }

}
