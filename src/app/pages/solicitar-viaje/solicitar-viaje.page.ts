import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { TripService } from 'src/app/services/trip.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage implements OnInit {

  viajes: any[] = []

  searchTerm: string;

  constructor(
    private trips: TripService,
    private modalCtrl: ModalController,
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

  async viewTrip(id, name, email, phone, capacity, price, start, end) {
    const options = {
      component: DetalleComponent,
      cssClass: 'custom-modal',
      swipeToClose: true,
      componentProps: {
        'id': id,
        'name': name,
        'email': email,
        'phone': phone,
        'capacity': capacity,
        'price': price,
        'start': start,
        'end': end
      } // ios only
    };
    const modal = await this.modalCtrl.create(options);

    return await modal.present();
  }

  solicitarViaje() {
    console.log('Viaje solicitado');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



}
