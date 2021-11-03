import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import 'animate.css'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private toastr: ToastController,
    public alertController: AlertController

  ) { }

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.auth.signIn(this.email, this.password);
    } else {
      this.alert('Por favor ingresa tus credenciales!', 'Alerta');
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
