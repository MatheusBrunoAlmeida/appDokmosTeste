import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

import { User } from '../cadastrar/user';
import { AuthService } from './../login/auth.service';






@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.page.html',
  styleUrls: ['./redefinir-senha.page.scss'],
})
export class RedefinirSenhaPage implements OnInit {

  public user: User = {};
  private loading: any;


  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController) { }


  ngOnInit() {
  }

  voltar(){
    this.router.navigate(["/login"]);
  }

  async enviar(){
    await this.presentLoading();

    try {
      this.authService.sendPasswordResetEmail(this.user.email)
      this.presentToast('Enviado com sucesso para seu email');
      this.router.navigate(["/login"]);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000  });
    toast.present();
  }

}