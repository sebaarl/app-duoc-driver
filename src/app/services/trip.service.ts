import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/models';
import { Trip } from '../interfaces/models';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app'
import { LoadingController, ToastController } from '@ionic/angular';
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
  ) {

  }

  createTrip(viaje: any): Promise<any> {
    return this.afs.collection('trips').add(viaje);
  }

  getTrips(): Observable<any> {
    return this.afs.collection('trip').snapshotChanges();
  }

}
