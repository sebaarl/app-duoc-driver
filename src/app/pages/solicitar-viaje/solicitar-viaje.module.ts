import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarViajePageRoutingModule } from './solicitar-viaje-routing.module';

import { SolicitarViajePage } from './solicitar-viaje.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarViajePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SolicitarViajePage]
})
export class SolicitarViajePageModule {}
