import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarViajePageRoutingModule } from './solicitar-viaje-routing.module';

import { SolicitarViajePage } from './solicitar-viaje.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarViajePageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [SolicitarViajePage, DetalleComponent]
})
export class SolicitarViajePageModule {}
