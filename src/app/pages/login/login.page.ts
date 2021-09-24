import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import 'animate.css'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    email:'',
    password:'',
    name:'Peter Parker',
  }

  constructor(private alertController:AlertController, private router:Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.user.email==="usuario@duocuc.cl" && this.user.password=="1234") {
      let navextra:NavigationExtras = {
        state: {user: this.user}
      }

      this.router.navigate(['/home'], navextra);
    } 
    else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No se pudo iniciar sesión',
      message: 'Correo electrónico o contraseña incorrecto',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
