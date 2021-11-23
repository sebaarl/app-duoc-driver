import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/models';
import { Trip } from '../interfaces/models';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app'
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  trip$: Observable<Trip>;
  trip: Trip;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController,
    private alertController: AlertController,
  ) {

  }

  createTrip(viaje: any): Promise<any> {
    return this.afs.collection('trips').add(viaje);
  }

  updateTrip(data: any, path: string, id: string) {
    const collection = this.afs.collection(path);
    return collection.doc(id).update(data);
  }

  getTrips(): Observable<any> {
    return this.afs.collection('trip', ref => ref.orderBy('created', 'desc')).snapshotChanges();
  }

  async getById(collection, id) {
    try {
      return await this.afs.collection(collection).doc(id).get();
    } catch (error) {
      this.alert('Viaje no encontrado', 'Error');
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
