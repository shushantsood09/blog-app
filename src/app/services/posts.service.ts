import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private fs: AngularFirestore
  ) { }

  loadFeatured() {
    return this.fs
      .collection('posts', ref=> ref.where('isFeatured','==', true).limit(4))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          console.log(actions);
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { data, id };
          });
        })
      );
  }

  loadLatest() {
    return this.fs
      .collection('posts', ref=> ref.orderBy('createdAt'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          console.log(actions);
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { data, id };
          });
        })
    );
  }

  loadCategoryPost(categoryId: string){
    return this.fs
    .collection('posts', ref=> ref.where('category.categoryId','==', categoryId).limit(4))
    .snapshotChanges()
    .pipe(
      map((actions) => {
        console.log(actions);
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { data, id };
        });
      })
    );
  }

  loadOnePost(postId: string){
   return this.fs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilarCategoryPost(catId: string){
    return this.fs
    .collection('posts', ref=> ref.where('category.categoryId','==', catId).limit(4))
    .snapshotChanges()
    .pipe(
      map((actions) => {
        console.log(actions);
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { data, id };
        });
      })
    );
  }

  updateCountViews( postId: string){
   const viewsCount = {
    views: firebase.default.firestore.FieldValue.increment(1),
   }
   this.fs.doc(`posts/${postId}`).update(viewsCount).then(()=>{
    console.log('view Count Updated!');

   })
  }
}
