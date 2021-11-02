import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {

  email: string;

  constructor(
    private afauth: AngularFireAuth,
    private toastr: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  async resetPassword() {

    if (this.email) {
      const loading = await this.loadingCtrl.create({
        message: 'Enviando enlace...',
        spinner: 'crescent',
        showBackdrop: true,
      });
      loading.present();

      this.afauth.sendPasswordResetEmail(this.email).then(() => {
        loading.dismiss();
        this.toast('Por favor revisa tu email!', 'success')
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toast(error.message, 'danger');
      })

    } else {
      this.toast('Por favor ingresa tu correo electronico!', 'danger')
    }
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'bottom',
      duration: 2000
    })

    toast.present();
  }

}