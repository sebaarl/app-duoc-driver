import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  pasajero: any

  id: string;

  name: string;
  email: string;
  phone: string;
  capacity: number;
  price: string;
  start: string;
  end: string;

  viajes = [];

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private trips: TripService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.pasajero = user;
    })
  }

  getViajes() {
    this.trips.getTrips().subscribe(data => {
      this.viajes = [];
      data.forEach((e: any) => {
        this.viajes.push({
          id: e.id,
          ...e.payload.doc.data()
        })
      });
    })
  }

  confirmarViaje() {
  }

}

