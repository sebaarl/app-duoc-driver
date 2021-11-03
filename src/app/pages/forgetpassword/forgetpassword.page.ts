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
    public alertController: AlertController
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
        this.alert('Por favor revisa tu email!', 'Envio exitoso')
        this.router.navigate(['/login']);
      })
        .catch((error) => {
          this.alert(error.message, 'Error');
        })

    } else {
      this.alert('Por favor ingresa tu correo electronico!', 'Alerta')
    }
  }

  async alert(message, header) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}