import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../cadastrar/user';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  public wavesPosition = 0;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    public router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    //this.slideFundo();
  }

  // slideFundo() {
  //   const body = document.querySelectorAll('.bg')[0];
  //   setTimeout(function () {
  //     body.classList.add('bg1')
  //     body.classList.remove('bg')
  //     body.classList.add('bg1');
  //   }, 2000);
  //   setTimeout(function () {
  //     body.classList.add('bg2')
  //     body.classList.remove('bg')
  //     body.classList.add('bg1');
  //   }, 5000);
  //   setTimeout(function () {
  //     body.classList.add('bg3')
  //     body.classList.remove('bg')
  //     body.classList.add('bg1');
  //   }, 8000);
  //   setTimeout(function () {
  //     this.slideFundo;
  //     body.classList.remove('bg')
  //     body.classList.add('bg1');
  //   }, 8000);
  // }

  mapa() {
    this.router.navigate(['/mapa'])
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      // tslint:disable-next-line: quotemark
      this.router.navigate(["/flareup"]);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async loginFacebook() {
    this.authService.doFacebookLogin();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message: 'Dados informados incorretos', duration: 3000 });
    toast.present();
  }

}
