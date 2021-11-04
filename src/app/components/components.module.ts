import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PiepaginaComponent } from './piepagina/piepagina.component';
import { InputComponent } from './input/input.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [PiepaginaComponent, InputComponent, DetalleComponent],
  exports: [PiepaginaComponent, InputComponent, DetalleComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule {}
