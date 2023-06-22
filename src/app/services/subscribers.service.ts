import { Injectable } from '@angular/core';
import { Sub } from '../models/sub';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(
    private fs: AngularFirestore,
  ) { }

  AddSubs(subData: Sub){
    this.fs.collection('subscribers').add
    (subData).then(()=>{
      console.log('Subscibers saved successfully!!');

    })
  }

  checkSubscribers(subEmail: string){
   return this.fs.collection('subscribers', ref => ref.where('email','==', subEmail)).get()
  }
}
