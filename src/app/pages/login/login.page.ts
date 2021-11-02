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

    ) { }

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.auth.signIn(this.email, this.password);
    } else {
      this.toast('Por favor ingresa tus credenciales!', 'warning');
    }
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'bottom',
      duration: 2000
    });

    toast.present();
  }

}
