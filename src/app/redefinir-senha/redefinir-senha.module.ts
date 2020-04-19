import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { RedefinirSenhaPage } from './redefinir-senha.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RedefinirSenhaPage
      }
    ]),
  ],
  declarations: [RedefinirSenhaPage]
})
export class RedefinirSenhaPageModule {}
