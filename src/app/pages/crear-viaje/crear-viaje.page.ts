import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { User } from '../../interfaces/models';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  start: string;
  end: string;
  prices: number;
  capacity: number;

  idUser: string;
  nameUser: string;
  phoneUser: string;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController,
    private auth: AuthService,
    private trips: TripService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.idUser = user.userId;
      this.nameUser = user.userName;
      this.phoneUser = user.userPhone;
    })
  }

  async createTrip() {
    if (this.start && this.end && this.prices && this.capacity) {
      const loading = await this.LoadingCtrl.create({
        message: 'Procesando...',
        spinner: 'crescent',
        showBackdrop: true,
      });

      loading.present();

      const id = this.afs.createId();

      this.afs.collection('trip').doc(id).set({
        'tripId': id,
        'tripStart': this.start,
        'tripEnd': this.end,
        'tripPrice': this.prices,
        'capacity': this.capacity,
        'created': new Date(),
        'active': true,
        'userId': this.idUser,
        'userName': this.nameUser,
        'userPhone': this.phoneUser,

      }).then(() => {
        loading.dismiss();
        this.alert('El viaje ha sido generado con exito', 'Confirmación')
        this.router.navigate(['/crear-viaje']);
      })
        .catch(error => {
          loading.dismiss();
          this.alert(error.message, 'Error');
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
