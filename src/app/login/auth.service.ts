import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

import { User } from '../cadastrar/user';



@Injectable({
  providedIn: 'root'
})


export class AuthService {
  constructor(private afa: AngularFireAuth) { }

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afa.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }

 async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afa.auth.sendPasswordResetEmail(passwordResetEmail);
}


  getAuth() {
    return this.afa.auth;
  }

}