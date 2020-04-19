import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { FlareUp } from './flareUp';

@Injectable({
  providedIn: 'root'
})
export class FlareUpService {
  private _firebase: any;
  items: Promise<any[]>;
  flareUp: Observable<any>



  constructor(
    public router: Router,
    public _angularFirestore: AngularFirestore
  ) {
    this._firebase = firebase.firestore();
  }

  insert(flareUp) {
    return new Promise((resolve, reject) => {
      const flareUpObject = { ...flareUp }
      this._firebase.collection('flareUpPendente').add(flareUpObject)
        .then((result: any) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  //   update(usuario) {
  //     return new Promise((resolve, reject) => {
  //       this._firebase.collection('usuario').update(usuario)
  //         .then((result) => {
  //           resolve(result);
  //         })
  //         .catch((error: any) => {
  //           reject(error);
  //         });
  //     });
  //   }

  listMap() {
    return new Promise((resolve, reject) => {
      this._firebase.collection('flareUp')
        .get()
        .then((querySnapshot: any) => {
          let obj: any = [];
          querySnapshot
            .forEach((item: any) => {
              let data = item.data();
              console.log(data);
              let flaraup = {
                position: { lat: -16.705274, lng: -49.273529 },
                iconData: {
                  titulo: data.nomeEscola,
                  lideres: data.nomeLider,
                  diasEHoras: 'Sexta: 9:30h, Segunda: 9:30h'
                }
              }
              obj.push(flaraup);
            });
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this._firebase.collection('flareUp')
        .get()
        .then((querySnapshot: any) => {
          let obj: any = [];
          querySnapshot
            .forEach((item: any) => {
              let data = item.data();
              let flareUpId = item.id;
              let id = flareUpId;
              console.log(id)
              obj.push({ id, ...data });
            });
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  //   edit(flareUp: FlareUp): Promise<any> {
  //     return this._firebase.collection('flareUp')
  //       .doc(flareUp.flareUpId).update(flareUp);
  //   }



  delete(id) {
    return new Promise((resolve, reject) => {
      this._firebase.collection('flareUp').doc(id).delete()
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  setFlareUp(flareUp) {
    this.flareUp = this.flareUp;
  }

  getFlareUp() {
    return this.flareUp;
  }
}
