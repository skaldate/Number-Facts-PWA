import { Component, Renderer } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";
import { SwPush } from "@angular/service-worker";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  VAPID_PUBLIC_KEY = 'BEog_JMB7nLXOamGdXggg23HAp-oTOfopMssTsxaLHqdWzY8YduD8ihQlm0JNxL1fGnIho9Yck95bzcQFhK2ZfY';
  numbers=[1,2];
  hidden = [];
  globalListenFunc: Function;
  updatesAvailable:boolean = false;

  constructor(swUpdate:SwUpdate, private swPush: SwPush, private subscription: SubscriptionService){
    swUpdate.available.subscribe(update=>this.updatesAvailable = true);
    swUpdate.checkForUpdate();
  }

  addNumber(){
    //let number = Math.floor((Math.random() * 100) + 1);
    let number = this.numbers.length+1;
    this.numbers.push(number);
  }
  hide(event:number){
    let num = this.numbers.splice(this.numbers.indexOf(event),1);
    this.hidden=  this.hidden.concat(num);
  }

  subscribeToNotifications() {
    console.log("subscribing to push notification");  
    this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
        .then(sub => this.subscription.addPushSubscriber(sub).subscribe())
        .catch(err => console.error("Could not subscribe to notifications", err));
  }
}


