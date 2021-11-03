import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  phone: string;
  password: string;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async register() {
    if (this.name && this.email && this.phone && this.password) {
      const loading = await this.LoadingCtrl.create({
        message: 'Procesando...',
        spinner: 'crescent',
        showBackdrop: true,
      });

      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification();
          this.afs.collection('user').doc(data.user.uid).set({
            'userId': data.user.uid,
            'userName': this.name,
            'userEmail': this.email,
            'userPhone': this.phone,
            'createdAt': Date.now()
          })
            .then(() => {
              loading.dismiss();
              this.alert('El registro se ha realizado con exito! Por favor revisa tu email!', 'Confirmación');
              this.router.navigate(['/login']);
            })
            .catch(error => {
              loading.dismiss();
              this.alert(error.message, 'Error');
            })
        })
        .catch(error => {
          loading.dismiss();
          this.alert(error.message, 'Error');
        })
    } else {
      this.alert('Por favor completa el formulario', 'Alerta');
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
