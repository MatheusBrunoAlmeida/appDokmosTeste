import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

import { User } from './user';
import { AuthService } from '../login/auth.service';
import { auth } from 'firebase';




@Component({
  selector: 'app-vistoria',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],

})
export class CadastrarPage implements OnInit {

  public userRegister: User = {};
  private loading: any;

  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService) {

    }

    
  ngOnInit(): void {
  }

 
  voltar(){
    this.router.navigate(["/login"]);
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
      await this.presentToast('Uusario criado com sucesso!')
      this.router.navigate(["/flareup"]);
    } catch (error) {
        console.log(error)
        this.presentToast(error);
  
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }


}