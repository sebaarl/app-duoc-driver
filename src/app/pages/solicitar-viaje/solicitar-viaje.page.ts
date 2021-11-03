import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage implements OnInit {

  viajes: any[] = []

  constructor(
    private trips: TripService
  ) {

  }

  ngOnInit(): void {
    this.getViajes()
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

  solicitarViaje() {
    console.log('Viaje solicitado');
  }

}
