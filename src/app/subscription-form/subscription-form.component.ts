import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent implements OnInit {
  isEmailError: boolean = false;
  isSubscribed: boolean =false;
  constructor(private subservice: SubscribersService) {}
  ngOnInit(): void {}
  onSubmit(formVal: any) {
    console.log(formVal);
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email,
    };

    this.subservice.checkSubscribers(subData.email).subscribe((val) => {
      console.log(val);

      if (val.empty) {
        this.subservice.AddSubs(subData);
        this.isSubscribed = true;
      }
      else{
        console.log('Email address already in use!');
        this.isEmailError = true;

      }
    });
  }
}
