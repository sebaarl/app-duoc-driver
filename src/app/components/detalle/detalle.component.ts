import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  id: string;

  name: string;
  email: string;
  phone: string;
  capacity: number;
  price: string;
  start: string;
  end: string;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
  }
}

