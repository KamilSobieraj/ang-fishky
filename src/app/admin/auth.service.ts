import {Injectable, NgZone} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {auth} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  userData: any;
  currentUserID$ = new Subject<string>();

  constructor(public fireAuth: AngularFireAuth,
              public firestore: AngularFirestore,
              public router: Router,
              public ngZone: NgZone // * NgZone service to remove outside scope warning
   ) {
    this.userLocalStorageHandler();
  }

  userLocalStorageHandler() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  getCurrentUserID(): Observable<string> {
    this.currentUserID$.next(JSON.parse(localStorage.getItem('user')).uid);
    return this.currentUserID$.asObservable();
}

  emailRegister(email: string, password: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.sendVerificationEmail();
        this.setUserData(res.user);
      }).catch(err => window.alert(err.message));
  }

  sendVerificationEmail() {
    return this.fireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/verify-email']);
      });
  }

  resetPassword(passwordResetEmail) {
    return this.fireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email was sent - check your inbox');
      })
      .catch(err => window.alert(err.message));
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  emailLogin(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(res.user);
        this.fireAuth.authState.subscribe(resID => {
            if (resID !== null) {
              this.currentUserID$.next(resID.uid);
            }
          }
        );
      }).catch(err => window.alert(err.message));
  }

  googleLogin() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  facebookLogin() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  authLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider)
      .then(res => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(res.user);
        this.fireAuth.authState.subscribe(resID => console.log(resID.uid));
      }).catch((err) => {
        window.alert(err.message);
      });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    this.currentUserID$.next(user.id);
    return userRef.set(userData, {merge: true});
  }

  logout() {
    this.fireAuth.authState.subscribe(res => this.currentUserID$.next(''));
    return this.fireAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      });
  }
}
