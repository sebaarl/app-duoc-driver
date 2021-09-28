import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {

  user= {
    email: ""
  }

  constructor(private alertController:AlertController) { }

  ngOnInit() {
  }

  onSubmitEmail() {
    if (this.user.email==="usuario@duocuc.cl") {
      this.errorAltert();
    }
    else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Envio exitoso',
      message: 'Se envió el código de verificación a su correo',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async errorAltert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Envio fallido',
      message: 'No se logró enviar el código',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
