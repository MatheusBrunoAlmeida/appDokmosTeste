import { FlareUpService } from './flareup.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlareUp } from './flareUp';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  ILatLng,
  Marker,
  BaseArrayClass
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-flareup',
  templateUrl: './flareup.page.html',
  styleUrls: ['./flareup.page.scss'],
})
export class FlareupPage implements OnInit {

  map: GoogleMap;
  private flareUp: FlareUp;
  private loading: any;
  
  

  constructor(
    private router: Router,
    private _flareUpService: FlareUpService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private platform: Platform,
  ) { }

  async ngOnInit() {
    this.flareUp = new FlareUp();

  
    
  }

 


  voltar() {
    this.router.navigate(['/login'])
  }

  sucesso(){
    let notification = document.querySelectorAll('.sucesso')[0];
    notification.classList.remove('none')
  }
 
  fechar(){
    let notification = document.querySelectorAll('.sucesso')[0];
    notification.classList.add('none')
  }

  getForm() {
    let descricao = document.querySelectorAll('.descricao')[0];
    descricao.classList.add('none')

    let botoes = document.querySelectorAll('.bgBaixo')[0];
    botoes.classList.add('none')

    let bgForm = document.querySelectorAll('.bgFormNone')[0];
    bgForm.classList.remove('bgFormNone')
    bgForm.classList.add('bgForm')
  }

  getMap() {
    let descricao = document.querySelectorAll('.descricao')[0];
    descricao.classList.add('none')

    let botoes = document.querySelectorAll('.bgBaixo')[0];
    botoes.classList.add('none')

    let bgMap = document.querySelectorAll('.bgMapNone')[0];
    bgMap.classList.remove('bgMapNone');
    bgMap.classList.add('bgMap');
  }

  voltarBg() {
    let bgMap = document.querySelectorAll('.bgMap')[0];
    bgMap.classList.remove('bgMap')
    bgMap.classList.add('bgMapNone')

    let descricao = document.querySelectorAll('.none')[0];
    descricao.classList.remove('none')

    let botoes = document.querySelectorAll('.bgBaixo')[0];
    botoes.classList.remove('none')


  }

 async cadastrar() {
    
    await this.presentLoading();

    try {
      this._flareUpService.insert(this.flareUp).then(response => {
       this.voltaInicial()
      })

      
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      this.sucesso()
    }
  }

  voltaInicial(){
    let bgForm = document.querySelectorAll('.bgForm')[0];
    bgForm.classList.remove('bgForm')
    bgForm.classList.add('bgFormNone')

    let descricao = document.querySelectorAll('.none')[0];
    descricao.classList.remove('none')

    let botoes = document.querySelectorAll('.bgBaixo')[0];
    botoes.classList.remove('none')
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message,duration: 3000 });
    toast.present();
  }

  
}
