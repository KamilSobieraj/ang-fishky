import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth} from 'firebase';
import {Observable, of} from 'rxjs';
import {resolve} from 'url';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  user: Observable<User>;

  constructor(private fireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router) {
    this.user = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of (null);
        }
      })
    );
  }

  // doFacebookLogin() {
  //   return new Promise<any>((res, rej) => {
  //     const provider = new firebase.auth.FacebookAuthProvider();
  //     this.fireAuth.auth.signInWithPopup(provider).then(res => {
  //       resolve(res);
  //     }, err => {
  //       console.log(err);
  //       rej(err);
  //     });
  //   });
  // }

  // doGoogleLogin() {
  //
  //   // return new Promise<any>((res, rej) => {
  //   //   const provider = new firebase.auth.GoogleAuthProvider();
  //   //   provider.addScope('profile');
  //   //   provider.addScope('email');
  //   //   this.fireAuth.auth.signInWithPopup(provider).then(res => {
  //   //     resolve(res);
  //   //   });
  //   // });
  // }
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
}
  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
}

  private oAuthLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updateUserData(credential.user);
    });
  }
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, {merge: true});
  }

  signOut() {
    this.fireAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }



  // get user(): User | null {
  //   return this.fireAuth.auth.currentUser;
  // }
  //
  // login({email, password}: Credentials) {
  //   return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  // }
  //
  // register({email, password}: Credentials) {
  //   return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  // }
  //
  // logout() {
  //   return this.fireAuth.auth.signOut();
  // }
}
